# Full Stack Portfolio Website with Admin Dashboard

A modern, production-ready portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Supabase. Features a beautiful public portfolio and a comprehensive admin dashboard for content management.

[![GitHub release](https://img.shields.io/github/v/release/cs21b001/Portfolio)](https://github.com/cs21b001/Portfolio/releases)
[![GitHub stars](https://img.shields.io/github/stars/cs21b001/Portfolio)](https://github.com/cs21b001/Portfolio/stargazers)
[![GitHub license](https://img.shields.io/github/license/cs21b001/Portfolio)](https://github.com/cs21b001/Portfolio/blob/main/LICENSE)

## 🚀 Features

### Public Portfolio```bash

- **Responsive Design**: Fully responsive across all devicesnpm run dev

- **Dark Mode**: Toggle between light and dark themes# or

- **Hero Section**: Eye-catching introduction with CTAsyarn dev

- **About Page**: Detailed bio with skills showcase# or

- **Projects Portfolio**: Grid layout with filtering by technologypnpm dev

- **Project Details**: Individual pages for each project with images and links# or

- **Work Experience**: Timeline view of professional experiencebun dev

- **Contact Form**: Functional contact form with validation```

- **Social Links**: Display social media profiles

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Admin Dashboard

- **Secure Authentication**: Supabase Auth with protected routesYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- **Dashboard Overview**: Statistics and quick actions

- **Content Management**:This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

  - About section editor

  - Skills management with proficiency levels## Learn More

  - Projects CRUD with image uploads

  - Work experience managementTo learn more about Next.js, take a look at the following resources:

  - Social links editor

  - Contact form messages inbox- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- **File Uploads**: Support for images (projects, profile) and documents (resume, PDFs)- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

- **Responsive Admin UI**: Mobile-friendly dashboard

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🛠️ Tech Stack

## Deploy on Vercel

- **Framework**: Next.js 14 (App Router)

- **Language**: TypeScriptThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

- **Styling**: Tailwind CSS

- **Database**: Supabase (PostgreSQL)Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Supabase account ([sign up here](https://supabase.com))
- Git installed

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/cs21b001/Portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the project to be fully set up

#### Run Database Setup

1. In your Supabase project dashboard, go to the SQL Editor
2. Copy the contents of `setup.sql` from the project root
3. Paste and run the SQL script
4. This will create all necessary tables and set up Row Level Security policies

#### Create Storage Buckets

1. Go to **Storage** in your Supabase dashboard
2. Create the following buckets:

   - `profile-images`
   - `project-images`
   - `documents`

3. For each bucket, set the following policies:
   - **Public Access for Reading**: Enable public access for `SELECT` operations
   - **Authenticated Access for Uploads**: Require authentication for `INSERT` operations

To set policies, click on each bucket → Policies → New Policy:

**For public read access:**

```sql
-- Policy for public SELECT
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'bucket-name-here');

-- Policy for authenticated INSERT
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'bucket-name-here' AND auth.role() = 'authenticated');
```

Replace `bucket-name-here` with `profile-images`, `project-images`, or `documents`.

#### Create Admin User

1. Go to **Authentication** → **Users** in Supabase
2. Click "Add user" → "Create new user"
3. Enter your email and password
4. This will be your admin login

### 4. Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.local.example .env.local
```

2. Fill in your Supabase credentials in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Finding your Supabase credentials:**

- Go to your Supabase project settings → API
- **Project URL**: Copy this to `NEXT_PUBLIC_SUPABASE_URL`
- **anon/public key**: Copy to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role key**: Copy to `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

### 6. Access the Admin Dashboard

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Log in with the admin user credentials you created in Supabase
3. Start managing your portfolio content!

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── (public)/                # Public routes
│   │   ├── layout.tsx           # Public layout with header/footer
│   │   ├── page.tsx             # Home page
│   │   ├── about/               # About page
│   │   ├── projects/            # Projects listing & detail pages
│   │   ├── experience/          # Work experience page
│   │   └── contact/             # Contact form page
│   │
│   ├── admin/                   # Admin routes (protected)
│   │   ├── layout.tsx           # Admin layout with sidebar
│   │   ├── page.tsx             # Dashboard
│   │   ├── login/               # Login page
│   │   └── projects/            # Manage projects (example)
│   │
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── about/               # About API
│   │   ├── skills/              # Skills API
│   │   ├── projects/            # Projects API
│   │   ├── experience/          # Experience API
│   │   ├── social/              # Social links API
│   │   ├── contact/             # Contact form submission
│   │   ├── messages/            # Messages management
│   │   └── upload/              # File upload endpoints
│   │
│   └── globals.css              # Global styles
│
├── components/
│   ├── public/                  # Public-facing components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── ExperienceTimeline.tsx
│   │   └── ContactForm.tsx
│   │
│   └── admin/                   # Admin components
│       ├── AdminSidebar.tsx
│       ├── AdminHeader.tsx
│       ├── DashboardStats.tsx
│       ├── DataTable.tsx
│       ├── ImageUpload.tsx
│       └── FileUpload.tsx
│
├── lib/
│   ├── supabase/               # Supabase clients
│   │   ├── client.ts           # Browser client
│   │   ├── server.ts           # Server client
│   │   └── middleware.ts       # Middleware client
│   ├── auth.ts                 # Auth helper functions
│   ├── api.ts                  # API helper functions
│   └── utils.ts                # Utility functions
│
├── types/
│   └── index.ts                # TypeScript type definitions
│
├── middleware.ts               # Route protection middleware
├── setup.sql                   # Database setup script
├── .env.local.example          # Environment variables template
└── README.md                   # This file
```

## 🔐 Authentication & Security

- **Protected Routes**: All `/admin/*` routes (except login) require authentication
- **Row Level Security**: Database policies ensure data security
- **Server-Side Rendering**: Sensitive operations happen server-side
- **Secure File Uploads**: Authenticated users only for uploads

## 📝 Usage Guide

### Managing Content

#### Update About Section

1. Go to **Admin → About**
2. Edit your bio and title
3. Upload a profile image (optional)
4. Upload your resume PDF (optional)
5. Click "Save Changes"

#### Add Skills

1. Go to **Admin → Skills → Add New**
2. Enter skill name and select category
3. Set proficiency level (0-100)
4. Add an emoji icon (optional)
5. Set display order for sorting
6. Click "Save"

#### Add Projects

1. Go to **Admin → Projects → Add New**
2. Fill in project details
3. Upload project image
4. Add technologies (comma-separated or tags)
5. Add demo and GitHub URLs
6. Upload project PDF (optional)
7. Mark as featured to show on homepage
8. Click "Save"

#### Add Work Experience

1. Go to **Admin → Experience → Add New**
2. Enter company, position, and description
3. Set start date (and end date if not current)
4. Check "Currently working here" if applicable
5. Add location (optional)
6. Click "Save"

#### Manage Social Links

1. Go to **Admin → Social**
2. Add platform name, URL, and emoji icon
3. Toggle visibility on/off
4. Click "Save"

#### View Messages

1. Go to **Admin → Messages**
2. View all contact form submissions
3. Mark as read/unread
4. Delete messages as needed

## 🚢 Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cs21b001/Portfolio)

### Manual Deployment

### 1. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure your project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (or adjust if needed)
5. Add Environment Variables:

   - Click "Environment Variables"
   - Add all variables from your `.env.local`:
     ```
     NEXT_PUBLIC_SUPABASE_URL
     NEXT_PUBLIC_SUPABASE_ANON_KEY
     SUPABASE_SERVICE_ROLE_KEY
     NEXT_PUBLIC_SITE_URL (use your Vercel domain)
     ```

6. Click "Deploy"

### 3. Update Supabase Settings

After deployment, update your Supabase project:

1. Go to **Authentication → URL Configuration**
2. Add your Vercel domain to **Site URL** and **Redirect URLs**

### 4. Update Environment Variables

After first deployment, update `NEXT_PUBLIC_SITE_URL` in Vercel:

1. Go to your project settings in Vercel
2. Navigate to **Environment Variables**
3. Update `NEXT_PUBLIC_SITE_URL` with your Vercel domain (e.g., `https://your-portfolio.vercel.app`)
4. Redeploy

## 🎨 Customization

### Updating Colors

Edit `tailwind.config.ts` to customize the color scheme.

### Adding Custom Fonts

1. Add fonts to `app/layout.tsx`
2. Update Tailwind config with font family

### Modifying Layout

- Edit components in `components/public/` for public site
- Edit components in `components/admin/` for admin dashboard

## 🐛 Troubleshooting

### Authentication Issues

- Verify Supabase credentials in `.env.local`
- Check that the admin user exists in Supabase Auth
- Clear browser cache and cookies

### Database Errors

- Ensure `setup.sql` ran successfully
- Check RLS policies in Supabase
- Verify table structures match the schema

### Upload Failures

- Confirm storage buckets exist in Supabase
- Check bucket policies allow authenticated uploads
- Verify file size limits (5MB for images, 10MB for PDFs)

### Build Errors

- Run `npm install` to ensure all dependencies are installed
- Delete `.next` folder and rebuild: `rm -rf .next && npm run build`

## 📚 API Reference

### Public Endpoints

- `GET /api/about` - Get about information
- `GET /api/skills` - Get all skills
- `GET /api/projects` - Get all projects (add `?featured=true` for featured only)
- `GET /api/projects/[id]` - Get single project
- `GET /api/experience` - Get all work experiences
- `GET /api/social` - Get visible social links
- `POST /api/contact` - Submit contact form

### Protected Endpoints (Admin Only)

All CRUD operations on resources require authentication.

## 🤝 Contributing

This is a template project. Feel free to:

- Fork and customize for your own portfolio
- Submit issues for bugs
- Suggest new features

## 🌐 Live Demo

- **Portfolio**: Coming soon (Deploy to see your live site!)
- **GitHub Repository**: [https://github.com/cs21b001/Portfolio](https://github.com/cs21b001/Portfolio)

## 📊 Version History

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history and [VERSION.md](./VERSION.md) for release notes.

**Current Version**: v1.0.0

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Backend by [Supabase](https://supabase.com/)
- Deployed on [Vercel](https://vercel.com/)

---

**Happy Building! 🚀**

For questions or support, please open an issue on GitHub.
