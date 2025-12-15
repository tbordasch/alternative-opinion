# Opinion Rotation Guide

## How the Rotation System Works

The website automatically rotates opinions on **Tuesday, Friday, and Sunday**. Here's exactly how it works:

### The Algorithm

1. **Fetch all active opinions** from the database (`is_active = true`)
2. **Order them by `published_at`** (oldest first)
3. **Use the oldest opinion's `published_at`** as the starting reference point
4. **Count rotation days** (Tuesday, Friday, Sunday) that have occurred since that start date
5. **Calculate which opinion to show** using: `(rotationCount - 1) % totalOpinions`
6. **Cycle through opinions** automatically based on the current date

### Example Timeline

Let's say you have 3 opinions:
- Opinion A: `published_at` = Tuesday, Dec 17, 2024
- Opinion B: `published_at` = Friday, Dec 20, 2024  
- Opinion C: `published_at` = Sunday, Dec 22, 2024

**What happens:**
- **Dec 17-19** (Tue-Thu): Shows Opinion A (first rotation day)
- **Dec 20-21** (Fri-Sat): Shows Opinion B (second rotation day)
- **Dec 22-23** (Sun-Mon): Shows Opinion C (third rotation day)
- **Dec 24-26** (Tue-Thu): Shows Opinion A again (fourth rotation day, cycles back)
- And so on...

## Adding Opinions

### For Initial Setup

Use the SQL script `add_opinions_with_dates.sql` to add your first batch of opinions. Make sure:
- Each opinion has a unique `published_at` date
- Dates align with Tuesday, Friday, or Sunday
- Dates are in chronological order

### For Future Opinions

**You have two options:**

#### Option 1: Add with Future Dates (Recommended)

When you want to add a new opinion:

1. **Check your last opinion's date:**
   ```sql
   SELECT published_at FROM opinions 
   WHERE is_active = true 
   ORDER BY published_at DESC 
   LIMIT 1;
   ```

2. **Calculate the next rotation day** (Tuesday, Friday, or Sunday) after that date

3. **Add the new opinion:**
   ```sql
   INSERT INTO opinions (content, published_at, is_active)
   VALUES (
     'Your new opinion text here',
     '2025-01-14 00:00:00+00',  -- Next Tuesday after your last opinion
     true
   );
   ```

**The system will automatically include it in the rotation** when it reaches that date in the cycle.

#### Option 2: Add with Current Date

If you add an opinion with today's date (or a past date):
- It will be inserted into the rotation based on when it "should have" first appeared
- The system will continue cycling through all opinions in order

### Important Notes

✅ **DO:**
- Set unique `published_at` dates for each opinion
- Use dates that fall on Tuesday, Friday, or Sunday
- Keep opinions in chronological order by `published_at`
- Use UTC timezone (`+00`) for consistency

❌ **DON'T:**
- Give all opinions the same `published_at` date (breaks rotation)
- Use random dates that don't align with rotation days
- Forget to set `is_active = true` for opinions you want to show

## Common Questions

### Q: Do I need to manually change which opinion is shown?

**A:** No! The system automatically calculates which opinion to show based on the current date and rotation schedule.

### Q: What if I add an opinion with a date far in the future?

**A:** That's fine! The system will cycle through all opinions in order. When it reaches that date in the rotation cycle, it will show that opinion.

### Q: Can I skip rotation days?

**A:** Yes, but it's not recommended. If you skip days, the rotation will still work, but the timing might feel off. It's better to have consecutive rotation days.

### Q: What if I want to remove an opinion temporarily?

**A:** Set `is_active = false` instead of deleting it. This hides it from the rotation without losing the data.

### Q: How do I reorder opinions?

**A:** Change their `published_at` dates. The system orders by `published_at`, so changing the dates will change the order.

## Quick Reference

**Rotation Days:** Tuesday, Friday, Sunday

**Date Format:** `'YYYY-MM-DD HH:MM:SS+00'` (UTC)

**Example Dates:**
- Tuesday: `'2024-12-17 00:00:00+00'`
- Friday: `'2024-12-20 00:00:00+00'`
- Sunday: `'2024-12-22 00:00:00+00'`

**Check Next Rotation Day:**
The website shows a countdown to the next rotation day at the top of the page.

