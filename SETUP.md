# Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be ready (takes a few minutes)

## Step 2: Set Up Database Schema

1. In your Supabase project, open the **SQL Editor** (left sidebar)
2. Click "New query"
3. Open the file `supabase/schema.sql` from this project
4. Copy the entire contents
5. Paste it into the SQL Editor in Supabase
6. Click "Run" or press Ctrl+Enter
7. Verify that the tables `opinions`, `comments`, and `likes` were created (check Table Editor)

## Step 3: Get Your Supabase Credentials

1. In Supabase, go to **Project Settings** (gear icon) → **API**
2. Find these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (a long JWT token)

## Step 4: Create Environment Variables File

This step creates a file that stores your Supabase connection details. The file is called `.env.local` and should be in the root folder of your project (same folder as `package.json`).

### How to create the file:

**Option A: Using VS Code / Cursor**
1. In your editor, right-click in the root folder (where `package.json` is)
2. Click "New File"
3. Name it exactly: `.env.local` (including the dot at the beginning)
4. Copy the contents from `.env.local.example` and paste them
5. Replace the placeholder values with your actual Supabase credentials

**Option B: Using File Explorer (Windows)**
1. Open File Explorer and navigate to your project folder
2. Right-click → New → Text Document
3. Name it `.env.local` (you might need to enable "Show file extensions" in View settings)
4. Open it with Notepad or any text editor
5. Copy this content and paste it:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

6. Replace `your_supabase_project_url_here` with your actual Project URL from Step 3
7. Replace `your_supabase_anon_key_here` with your actual anon key from Step 3
8. Save the file

**Example of what it should look like:**
```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI4MCwiZXhwIjoxOTU0NTQzMjgwfQ.abcdefghijklmnopqrstuvwxyz1234567890
```

**Important:** 
- The file must be named exactly `.env.local` (with the dot at the start)
- Never share this file or commit it to git (it contains your secret keys)
- After creating/updating this file, restart your dev server

## Step 5: Install Dependencies

```bash
npm install
```

## Step 6: Add Your First Opinion

You can add a test opinion in two ways:

### Option A: Using Supabase Table Editor
1. Go to **Table Editor** → `opinions`
2. Click **Insert** → **Insert row**
3. Fill in:
   - `content`: "This is a test opinion. It encourages reflection."
   - `published_at`: Click the calendar icon and select current date/time
   - `is_active`: Check the box (true)
4. Click **Save**

### Option B: Using SQL
1. Go to **SQL Editor**
2. Run this query:

```sql
INSERT INTO opinions (content, published_at, is_active)
VALUES (
  'This is a test opinion. It encourages reflection.',
  NOW(),
  true
);
```

## Step 7: Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you should see your opinion!

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists in the project root (same folder as `package.json`)
- Check that the file name is exactly `.env.local` (not `env.local` or `.env.local.txt`)
- Check that the variable names are exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (no spaces, correct spelling)
- Restart the dev server after creating/updating `.env.local`

### No opinion displayed
- Make sure `is_active = true` in the database
- Make sure `published_at` is set
- Check the browser console for errors

### Comments not working
- Verify the RLS (Row Level Security) policies were created (check in Supabase: Authentication → Policies)
- Make sure you ran the complete `schema.sql` file

### Database connection errors
- Double-check your Supabase URL and anon key in `.env.local`
- Make sure there are no extra spaces or quotes around the values
- Make sure your Supabase project is active (not paused)

## Next Steps

Once everything is working:
- Add more opinions directly in Supabase
- Test the comment functionality
- Test the like functionality
- Check the archive page

## How Opinion Rotation Works

The website automatically rotates opinions on **Tuesday, Friday, and Sunday**. Here's how it works:

### How Opinions Are Selected

1. **All active opinions** (`is_active = true`) are fetched from the database
2. They are **ordered by `published_at`** (oldest first)
3. The system uses the **oldest opinion's `published_at` date** as the starting reference point
4. It counts how many rotation days (Tuesday, Friday, Sunday) have passed since that start date
5. Based on that count, it cycles through the opinions in order

### Important: Setting `published_at` Correctly

**⚠️ CRITICAL:** Each opinion must have a **unique `published_at` date** that corresponds to when it should first appear. If all opinions have the same `published_at` date, the rotation will not work correctly!

**How to add opinions for rotation:**

1. **First opinion**: Set `published_at` to the date of the next Tuesday, Friday, or Sunday (whichever comes first)
2. **Second opinion**: Set `published_at` to the date of the next rotation day after the first one
3. **Third opinion**: Set `published_at` to the date of the next rotation day after the second one
4. And so on...

**Example:**
- If today is Monday, December 16, 2024:
  - Opinion 1: `published_at` = Tuesday, December 17, 2024
  - Opinion 2: `published_at` = Friday, December 20, 2024
  - Opinion 3: `published_at` = Sunday, December 22, 2024
  - Opinion 4: `published_at` = Tuesday, December 24, 2024
  - etc.

**Quick SQL to add opinions with correct dates:**

```sql
-- Add opinions with rotation dates starting from next Tuesday
INSERT INTO opinions (content, published_at, is_active)
VALUES 
  ('Your first opinion text here', '2024-12-17 00:00:00+00', true),  -- Tuesday
  ('Your second opinion text here', '2024-12-20 00:00:00+00', true), -- Friday
  ('Your third opinion text here', '2024-12-22 00:00:00+00', true), -- Sunday
  ('Your fourth opinion text here', '2024-12-24 00:00:00+00', true); -- Tuesday
```

**Note:** Adjust the dates to match your desired rotation schedule. The system will automatically cycle through them based on the rotation days (Tuesday, Friday, Sunday).

## Tips

- **Adding new opinions**: Insert a new row in the `opinions` table with a `published_at` date that matches your rotation schedule
- **Viewing comments**: All comments are visible in the `comments` table
- **Viewing likes**: All likes are visible in the `likes` table
- **Session management**: Each browser gets a unique anonymous session ID stored in localStorage
