"""
sync_scraped.py
Parses PROMPT_SCRAPE.md and updates portfolio-site/data/scraped.json.

OneDrive-safe: atomic writes (temp + os.replace), JSON validation before commit,
content-hashed stable IDs (so re-runs are idempotent), no destructive ops if
parsing fails.

Run: python portfolio-site/scripts/sync_scraped.py
"""

from __future__ import annotations
import hashlib
import json
import os
import re
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

# -----------------------------------------------------------------------------
# Paths
# -----------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
SITE_DIR = SCRIPT_DIR.parent              # portfolio-site/
REPO_DIR = SITE_DIR.parent                # CSIS275/
SCRAPE_MD = REPO_DIR / "PROMPT_SCRAPE.md"
SCRAPED_JSON = SITE_DIR / "data" / "scraped.json"

SKIP_SECTIONS = {"run log", "table of contents", "how this doc is maintained"}

# The website has a no-em-dash style rule (em dashes signal AI-generated text).
# Sanitize derived metadata fields: title, notes, source_name, attribution.
# DO NOT touch the prompt body â prompts are quoted verbatim from sources.
def strip_dashes(text):
    """Replace em/en dashes with a comma. Collapse the surrounding spaces
    so ' , ' or ' ,  ' become ', '. Idempotent."""
    if not text:
        return text
    import re
    out = text.replace(chr(0x2014), ",").replace(chr(0x2013), ",")
    # Normalize: any whitespace around a comma collapses to ', '
    out = re.sub(r"\s*,\s*", ", ", out)
    # But don't break list-like commas that had no spaces (preserve compact CSV)
    # Heuristic: only normalize when there was a space adjacent originally,
    # which is captured by the sub above. Trim ends.
    return out.strip(" ,")

# -----------------------------------------------------------------------------
# Parser
# -----------------------------------------------------------------------------
HEADING_H2 = re.compile(r"^##\s+(.+?)\s*$")
HEADING_H3 = re.compile(r"^###\s+(.+?)\s*$")
FENCE = re.compile(r"^```")
META_LINE = re.compile(r"^\*\*([A-Za-z][\w \-/]*)\:\*\*\s*(.+?)\s*$")
MD_LINK = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")


def stable_id(title: str, prompt: str) -> str:
    """Content-hashed ID. Same title + prompt always produces same ID,
    so re-runs are idempotent (no duplicate entries)."""
    h = hashlib.sha256()
    h.update(title.strip().lower().encode("utf-8"))
    h.update(b"\x00")
    h.update(prompt.strip().encode("utf-8"))
    return "scraped-" + h.hexdigest()[:12]


def parse_scrape_md(md_path: Path) -> list[dict]:
    """Walk the markdown, emit one dict per ### prompt entry under a ## category.
    Excludes meta sections like Run Log."""
    if not md_path.exists():
        raise FileNotFoundError(f"Source markdown not found: {md_path}")

    lines = md_path.read_text(encoding="utf-8").splitlines()
    entries: list[dict] = []

    current_category: str | None = None
    in_skip_section = False

    i = 0
    while i < len(lines):
        line = lines[i]

        # Section change
        h2 = HEADING_H2.match(line)
        if h2:
            current_category = h2.group(1).strip()
            in_skip_section = current_category.lower() in SKIP_SECTIONS
            i += 1
            continue

        # Prompt entry start
        h3 = HEADING_H3.match(line)
        if h3 and not in_skip_section and current_category:
            title = h3.group(1).strip()
            # Collect lines until next ### or ## (the entry block)
            block: list[str] = []
            j = i + 1
            while j < len(lines):
                nxt = lines[j]
                if HEADING_H2.match(nxt) or HEADING_H3.match(nxt):
                    break
                block.append(nxt)
                j += 1

            parsed = parse_entry_block(title, current_category, block)
            if parsed:
                entries.append(parsed)
            i = j
            continue

        i += 1

    return entries


def parse_entry_block(title: str, category: str, block: list[str]) -> dict | None:
    """Extract prompt body (first fenced block) and meta fields."""
    # Find the first fenced code block
    prompt_lines: list[str] = []
    in_fence = False
    fence_started = False
    meta_start_idx = 0

    for idx, line in enumerate(block):
        if FENCE.match(line.strip()):
            if not fence_started:
                in_fence = True
                fence_started = True
                continue
            else:
                in_fence = False
                meta_start_idx = idx + 1
                break
        if in_fence:
            prompt_lines.append(line)

    if not fence_started or not prompt_lines:
        # No prompt body, skip
        return None

    prompt_text = "\n".join(prompt_lines).strip()

    # Parse meta fields after the fence
    meta = {}
    for line in block[meta_start_idx:]:
        m = META_LINE.match(line)
        if m:
            key = m.group(1).strip().lower()
            val = m.group(2).strip()
            meta[key] = val

    why = meta.get("why", "")
    use_when = meta.get("use when", "")
    source_raw = meta.get("source", "")

    # Combine why + use_when into notes (the field on ScrapedPrompt)
    notes_parts: list[str] = []
    if why:
        notes_parts.append(f"Why: {why}")
    if use_when:
        notes_parts.append(f"Use when: {use_when}")
    notes = " | ".join(notes_parts)

    # Parse source links: first [name](url) pair becomes primary
    source_name = "PROMPT_SCRAPE.md"
    source_url = ""
    attribution = ""
    if source_raw:
        links = MD_LINK.findall(source_raw)
        if links:
            source_name = links[0][0].strip()
            source_url = links[0][1].strip()
            if len(links) > 1:
                attribution = "; also: " + ", ".join(
                    f"{n.strip()} ({u.strip()})" for n, u in links[1:]
                )

    return {
        "id": stable_id(title, prompt_text),
        "title": strip_dashes(title),
        "source_url": source_url,
        "source_name": strip_dashes(source_name),
        "scraped_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "category": strip_dashes(category),
        "prompt": strip_dashes(prompt_text),
        "attribution": strip_dashes(attribution),
        "notes": strip_dashes(notes),
    }


# -----------------------------------------------------------------------------
# Merge + atomic write
# -----------------------------------------------------------------------------
def load_existing(path: Path) -> dict:
    if not path.exists():
        return {
            "schema_version": "1.0",
            "last_updated": None,
            "sources": [],
            "prompts": [],
        }
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        raise SystemExit(f"ERROR: {path} is malformed JSON: {e}. Refusing to overwrite. Fix or delete the file first.")


def merge(existing: dict, parsed: list[dict]) -> tuple[dict, int, int]:
    """Returns (merged_dict, added_count, kept_count). Idempotent via stable IDs.
    Preserves scraped_at from existing entries (so 'when first seen' is durable)."""
    existing_by_id = {p["id"]: p for p in existing.get("prompts", [])}
    added = 0
    for p in parsed:
        if p["id"] in existing_by_id:
            # Keep the original scraped_at timestamp (first-seen),
            # but refresh everything else in case the source MD was edited
            p["scraped_at"] = existing_by_id[p["id"]].get("scraped_at", p["scraped_at"])
            existing_by_id[p["id"]] = p
        else:
            existing_by_id[p["id"]] = p
            added += 1

    # Sort: newest scraped_at first
    merged_prompts = sorted(
        existing_by_id.values(),
        key=lambda x: x.get("scraped_at", ""),
        reverse=True,
    )

    # Collect distinct source_names (excluding placeholder)
    sources = sorted({p["source_name"] for p in merged_prompts if p.get("source_name") and p["source_name"] != "PROMPT_SCRAPE.md"})

    out = {
        "schema_version": "1.0",
        "last_updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "sources": sources,
        "prompts": merged_prompts,
    }
    return out, added, len(merged_prompts) - added


def atomic_write_json(path: Path, data: dict) -> None:
    """Write JSON to a temp file in the same directory, validate it parses,
    then os.replace into final position. Survives OneDrive sync mid-write
    because the final file is never partially written."""
    payload = json.dumps(data, indent=2, ensure_ascii=False) + "\n"
    # Validate by parsing the payload back before touching disk
    json.loads(payload)

    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp_path = tempfile.mkstemp(
        prefix=path.name + ".",
        suffix=".tmp",
        dir=str(path.parent),
    )
    try:
        with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as f:
            f.write(payload)
            f.flush()
            os.fsync(f.fileno())
        # Re-read and re-validate before swap
        with open(tmp_path, "r", encoding="utf-8") as f:
            json.loads(f.read())
        os.replace(tmp_path, path)
    except Exception:
        # Clean up tmp on any error; never leave a partial main file
        try:
            os.unlink(tmp_path)
        except FileNotFoundError:
            pass
        raise


# -----------------------------------------------------------------------------
# Entry point
# -----------------------------------------------------------------------------
def main() -> int:
    print(f"Reading: {SCRAPE_MD}")
    print(f"Writing: {SCRAPED_JSON}")

    try:
        parsed = parse_scrape_md(SCRAPE_MD)
    except FileNotFoundError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1
    except Exception as e:
        print(f"ERROR: parsing PROMPT_SCRAPE.md failed: {e}", file=sys.stderr)
        return 2

    print(f"Parsed {len(parsed)} prompt entries from PROMPT_SCRAPE.md")
    if not parsed:
        print("No entries found. Check your markdown formatting (### Title + ```fence``` + **Why:** / **Use when:**).")
        return 0

    existing = load_existing(SCRAPED_JSON)
    merged, added, kept = merge(existing, parsed)

    try:
        atomic_write_json(SCRAPED_JSON, merged)
    except Exception as e:
        print(f"ERROR: failed to write scraped.json safely: {e}", file=sys.stderr)
        return 3

    print(f"OK. Total in feed: {len(merged['prompts'])} ({added} new, {kept} unchanged)")
    print(f"Categories present: {sorted({p['category'] for p in merged['prompts']})}")
    print(f"last_updated: {merged['last_updated']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
