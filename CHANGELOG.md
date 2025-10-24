# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-24

### Added

- Initial release of fullstack portfolio website
- Public portfolio with Hero, About, Skills, Projects, Experience, and Contact sections
- Complete admin dashboard for content management
- Supabase authentication system
- File upload functionality (images and PDFs)
- Dark mode toggle with localStorage persistence
- Responsive design for all screen sizes
- RESTful API endpoints for all entities
- Row Level Security (RLS) policies
- Toast notifications for user feedback
- Form validation across all forms
- TypeScript for type safety
- Tailwind CSS for styling
- Next.js 14 with App Router
- Server Components and Server Actions
- Database schema with 7 tables
- Storage buckets for images and documents
- Middleware for route protection
- Environment variable configuration
- Vercel deployment configuration
- Comprehensive README with setup instructions

### Tech Stack

- Next.js 14.3+
- TypeScript 5
- Tailwind CSS 3.4
- Supabase (PostgreSQL, Auth, Storage)
- React 19
- React Hot Toast 2.4
- Date-fns 3.3

### Database Tables

- about
- skills
- projects
- experiences
- social_links
- contact_messages
- site_settings

### Storage Buckets

- profile-images (5MB limit, JPEG/PNG/WebP)
- project-images (5MB limit, JPEG/PNG/WebP)
- documents (10MB limit, PDF)

### Pages

**Public:**

- Home (/)
- About (/about)
- Projects (/projects, /projects/[id])
- Experience (/experience)
- Contact (/contact)

**Admin:**

- Dashboard (/admin)
- Login (/admin/login)
- About Management (/admin/about)
- Skills Management (/admin/skills)
- Projects Management (/admin/projects)
- Experience Management (/admin/experience)
- Social Links Management (/admin/social)
- Messages Inbox (/admin/messages)

### API Endpoints

**Public (GET):**

- /api/about
- /api/skills
- /api/projects
- /api/projects/[id]
- /api/experience
- /api/social

**Public (POST):**

- /api/contact

**Auth:**

- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/session

**Protected (Admin only):**

- All POST, PUT, DELETE operations on entities
- /api/upload/image
- /api/upload/resume
- /api/upload/document
- GET /api/messages
- DELETE /api/messages/[id]

### Security

- Supabase RLS policies
- Protected admin routes
- Secure file upload validation
- Environment variables for secrets
- CORS configuration

### Future Enhancements

See VERSION.md for v2.0.0 roadmap

---

## Version Format

- **Major (X.0.0)**: Breaking changes, major feature additions
- **Minor (1.X.0)**: New features, non-breaking changes
- **Patch (1.0.X)**: Bug fixes, minor improvements

[1.0.0]: https://github.com/cs21b001/Portfolio/releases/tag/v1.0.0
