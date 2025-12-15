# Alternative Opinion

A Next.js 14 application for sharing thoughtful opinions with a calm, readable design.

## Features

- ⚡ Next.js 14 with App Router
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 🌙 Dark mode support
- 📱 Responsive design
- 💬 Anonymous comment function (1x per opinion, max. 500 characters)
- ❤️ Anonymous LIKE button (1x per comment)
- 📚 Archive page for past opinions
- 🔌 Supabase integration

## What I've Prepared

I've created all the code structure and database schema files. However, **you still need to set up your own Supabase account** and connect it.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase project
3. Copy and paste the contents of `supabase/schema.sql` into the SQL Editor
4. Run the SQL to create the database tables
5. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in Supabase: Project Settings → API

### 3. Add Your First Opinion

In Supabase, go to Table Editor → `opinions` and click "Insert row", or use SQL:

```sql
INSERT INTO opinions (content, published_at, is_active)
VALUES (
  'This is a test opinion. It encourages reflection.',
  NOW(),
  true
);
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Structure

The database has three tables:

- **opinions**: Stores the opinions
  - `content`: The opinion text
  - `published_at`: Publication date
  - `is_active`: Whether the opinion is active

- **comments**: Stores comments
  - `opinion_id`: Reference to the opinion
  - `content`: Comment text (max. 500 characters)
  - `session_id`: Anonymous session ID (1 comment per opinion per session)

- **likes**: Stores likes
  - `comment_id`: Reference to the comment
  - `session_id`: Anonymous session ID (1 like per comment per session)

## Adding New Opinions

Add new opinions directly in the Supabase database:

1. Go to Table Editor → `opinions`
2. Click "Insert row"
3. Fill in:
   - `content`: Your opinion text
   - `published_at`: Current date/time
   - `is_active`: true

The most recent active opinion will automatically appear on the homepage.

## Project Structure

```
.
├── app/
│   ├── api/              # API Routes
│   ├── archive/          # Archive page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── CommentsSection.tsx    # Comment section
│   └── ArchiveOpinionCard.tsx # Archive card
├── lib/
│   ├── db.ts            # Database functions
│   ├── supabase.ts      # Supabase client
│   └── types.ts         # TypeScript types
├── supabase/
│   └── schema.sql       # Database schema
└── package.json
```

## Features

### Comments
- Anyone can comment anonymously
- 1 comment per opinion per session
- Max. 500 characters
- Filtering: Newest first / Most popular first

### Likes
- Anonymous LIKE button for comments
- 1 like per comment per session
- Most popular comments appear at the top

### Archive
- All past opinions
- Comments for each opinion
- Expandable/collapsible comments

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
