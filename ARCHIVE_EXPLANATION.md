# How the Archive System Works

## Overview

**There is NO automatic archiving process.** Opinions are not moved to an "archive" state. Instead, the archive page simply **filters opinions based on their `published_at` date**.

## How It Works

### Archive Page Logic

1. **Fetches all active opinions** (`is_active = true`)
2. **Filters by date**: Only shows opinions where `published_at < today`
3. **Excludes current opinion**: The opinion currently shown on the homepage is not shown in the archive
4. **Orders by date**: Shows most recent past opinions first

### What Gets Archived?

- ✅ Opinions with `published_at` in the past (before today)
- ✅ Opinions that are not currently displayed on the homepage
- ❌ Opinions with `published_at` in the future (not shown)
- ❌ The current opinion (excluded from archive)

### Example Timeline

**Today: December 14, 2025 (Sunday)**

**Opinions in database:**
- Opinion A: `published_at = 2025-12-14` (today) → **Shown on homepage, NOT in archive**
- Opinion B: `published_at = 2025-12-11` (past) → **Shown in archive**
- Opinion C: `published_at = 2025-12-16` (future) → **NOT shown in archive**

**Tomorrow (December 15, 2025):**
- Opinion A: `published_at = 2025-12-14` (past) → **Moved to archive** (if not current)
- Opinion B: `published_at = 2025-12-11` (past) → **Still in archive**
- Opinion C: `published_at = 2025-12-16` (future) → **Still NOT in archive**

## Key Points

1. **No manual archiving needed**: Opinions automatically appear/disappear from archive based on date
2. **Current opinion is excluded**: The opinion shown on homepage is never in the archive
3. **Future opinions are hidden**: Opinions with future dates don't appear anywhere until their date arrives
4. **All opinions stay active**: Setting `is_active = false` hides them everywhere (homepage and archive)

## Database Structure

The `opinions` table has:
- `published_at`: Date when the opinion should first appear
- `is_active`: Boolean flag to show/hide opinions

**There is NO separate "archive" table or "archived" status field.**

## How to "Archive" an Opinion

You don't need to do anything! Opinions automatically:
- Appear in archive when their `published_at` date is in the past
- Disappear from archive when they become the current opinion
- Never appear if their `published_at` is in the future

## How to Hide an Opinion

If you want to hide an opinion from both homepage and archive:
```sql
UPDATE opinions 
SET is_active = false 
WHERE id = 'your-opinion-id';
```

## How to Show a Hidden Opinion

```sql
UPDATE opinions 
SET is_active = true 
WHERE id = 'your-opinion-id';
```

