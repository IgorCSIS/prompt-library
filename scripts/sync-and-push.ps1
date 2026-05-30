<#
.SYNOPSIS
  Weekly sync workflow: parse PROMPT_SCRAPE.md, update scraped.json, commit & push.

.DESCRIPTION
  Runs the Python parser, shows the diff, and (if non-empty) commits and pushes
  to GitHub. Safe to re-run: idempotent via content-hashed stable IDs.

.EXAMPLE
  # From the portfolio-site directory:
  .\scripts\sync-and-push.ps1

.EXAMPLE
  # Dry run (parse + diff only, no commit/push):
  .\scripts\sync-and-push.ps1 -DryRun
#>
[CmdletBinding()]
param(
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

# Resolve paths. The git repo IS the portfolio-site directory (it contains .git).
# PROMPT_SCRAPE.md sits one level up, outside the repo, but the Python parser
# reads it relatively so we don't need to cd up.
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$SiteDir = Split-Path -Parent $ScriptDir

# Sanity check: the site dir must contain .git or we're confused about layout
if (-not (Test-Path (Join-Path $SiteDir ".git"))) {
    Write-Host "ERROR: $SiteDir is not a git repository. Expected .git directory there." -ForegroundColor Red
    exit 1
}

Set-Location $SiteDir

Write-Host "=== Weekly PROMPT_SCRAPE sync ===" -ForegroundColor Cyan
Write-Host "Repo: $SiteDir"
Write-Host ""

# 1. Verify Python is available
try {
    $pyVer = python --version 2>&1
    Write-Host "Python: $pyVer"
} catch {
    Write-Host "ERROR: Python not found in PATH. Install Python 3 or add it to PATH." -ForegroundColor Red
    exit 1
}

# 2. Verify PROMPT_SCRAPE.md exists (it's one level up from the repo)
$ScrapeMd = Join-Path (Split-Path -Parent $SiteDir) "PROMPT_SCRAPE.md"
if (-not (Test-Path $ScrapeMd)) {
    Write-Host "ERROR: $ScrapeMd not found." -ForegroundColor Red
    exit 1
}

# 3. Run the parser
Write-Host ""
Write-Host "--- Running parser ---" -ForegroundColor Cyan
python "$ScriptDir\sync_scraped.py"
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: parser exited with code $LASTEXITCODE. Not committing." -ForegroundColor Red
    exit $LASTEXITCODE
}

# 4. Check git status for scraped.json (we are now inside the repo)
$ScrapedRel = "data/scraped.json"
$status = git status --porcelain -- $ScrapedRel 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: git status failed:`n$status" -ForegroundColor Red
    exit 1
}

if (-not $status) {
    Write-Host ""
    Write-Host "No changes to scraped.json. Feed is already up to date." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "--- Diff preview ---" -ForegroundColor Cyan
git --no-pager diff --stat -- $ScrapedRel
Write-Host ""
git --no-pager diff -- $ScrapedRel | Select-Object -First 30

if ($DryRun) {
    Write-Host ""
    Write-Host "DRY RUN: not committing. Re-run without -DryRun to push." -ForegroundColor Yellow
    exit 0
}

# 5. Commit & push
Write-Host ""
Write-Host "--- Committing & pushing ---" -ForegroundColor Cyan
$timestamp = Get-Date -Format "yyyy-MM-dd"
git add -- $ScrapedRel
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: git add failed." -ForegroundColor Red
    exit $LASTEXITCODE
}

git commit -m "feed: weekly scraped-prompts sync ($timestamp)"
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: commit failed." -ForegroundColor Red
    exit $LASTEXITCODE
}

git push
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: push failed. Run 'git push' manually after fixing." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host ""
Write-Host "Done. GitHub Actions will rebuild and redeploy." -ForegroundColor Green
Write-Host "Live: https://IgorCSIS.github.io/prompt-library/scraped/" -ForegroundColor Green
