# Scripts: weekly scraped-prompts pipeline

Two files, one workflow:

- `sync_scraped.py` parses `../../PROMPT_SCRAPE.md`, writes `../data/scraped.json`.
- `sync-and-push.ps1` runs the parser, shows the diff, commits, and pushes.

## How to use it manually

From PowerShell, in the `portfolio-site` directory:

```powershell
.\scripts\sync-and-push.ps1
```

Add `-DryRun` to parse and preview without committing.

## How the scheduled task uses it

A weekly Claude scheduled task is configured to ping you on Monday mornings.
That task opens a fresh Claude conversation, runs the parser, reports what
changed, and gives you the push command to run. You stay in control of the
actual push.

## Why this is OneDrive-safe

The Write tool (and any IDE save) can race with OneDrive sync and produce a
truncated or null-padded file. The parser avoids that with three rules:

1. Atomic write: writes a `.tmp` file in the same directory, fsyncs, validates
   the JSON parses back from the temp file, then `os.replace()`s it into the
   final path. Either the new file lands fully, or nothing changes.
2. Idempotent IDs: each prompt's ID is a hash of `title + prompt body`. Running
   the parser N times produces the same result as running it once. No
   duplicates if the source markdown is unchanged.
3. Refuses to corrupt: if `scraped.json` is already malformed, the script aborts
   and tells you so. It never silently overwrites broken JSON.

## When you edit PROMPT_SCRAPE.md by hand

Just add a new entry under the right `## Category` heading using the format:

```markdown
### Title of the prompt
` ` `
The actual prompt body, fenced.
Can be multiple lines.
` ` `
**Why:** One-sentence justification.
**Use when:** The trigger condition.
**Source:** [Author or article](https://url) (optional)
```

(remove the spaces inside the backticks above when copying)

Re-run `sync-and-push.ps1`. The new entry will be picked up, given a stable ID,
and pushed.

## Editing or removing a prompt

- Edit: change the body in PROMPT_SCRAPE.md, re-run the script. Because the ID
  is content-hashed, an edit produces a new ID and the old entry stays in
  `scraped.json` until you delete it.
- Remove: delete the entry from `data/scraped.json` manually, OR delete it from
  PROMPT_SCRAPE.md and then delete the corresponding entry from `scraped.json`.
  The parser doesn't auto-prune so that you can edit the source MD freely
  without losing curated entries.
