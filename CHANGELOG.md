# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-10-26

### Added

- **Glassmorphism Design System**

  - Custom glass utilities (.glass, .glass-strong) with matte finish
  - Backdrop blur with saturation filters for enhanced colors
  - Gradient animated backgrounds throughout the site
  - Glass noise texture overlay for depth
  - Responsive glass hover effects with transforms
  - Dark mode optimized glass effects

- **Dynamic Code Background Animation**

  - Canvas-based typing/erasing code animation
  - Multi-language code snippets (JS, Python, CSS, SQL, Git, etc.)
  - Horizontal typing effect (not falling Matrix-style)
  - Optimized code density (fewer lines, better spacing)
  - Light mode: subtle slate-gray text
  - Dark mode: colorful syntax highlighting (purple, blue, green, red)
  - Blinking cursor animation during typing
  - Clean erasing with clearRect (no traces)
  - Responsive distribution across all screen sizes

- **Interactive Typing Name Animation**

  - TypingText component with customizable text array
  - Smooth character-by-character typing
  - Clean backspace-style erasing
  - Blinking cursor effect
  - Gradient text support
  - Fully responsive with reserved minimum height

- **Mobile-First Admin Navigation**
  - Instagram/WhatsApp style bottom navbar
  - 5-icon navigation bar with "More" menu
  - Slide-up bottom sheet for additional options
  - Large tap targets for better mobile UX
  - Smooth animations (slide-up effect)
  - Backdrop overlay with tap-to-close
  - Safe area support for notched devices
  - Desktop sidebar unchanged

### Changed

- **Complete UI/UX Transformation**

  - All pages now use glassmorphism design
  - Floating glass orbs for depth and visual interest
  - Gradient text for headings (blue-to-purple)
  - Enhanced shadows and lighting effects
  - Improved card hover states with lift effect
  - Better text contrast and readability

- **Layout Improvements**

  - Removed old solid backgrounds
  - Added CodeBackground to all sections
  - Proper padding management for mobile nav
  - Responsive text sizing (4xl → 7xl)
  - Two-line hero layout for better mobile display

- **Component Enhancements**
  - Header: Glass navbar with gradient logo
  - Footer: Glass footer with gradient accents
  - ProjectCard: Glass cards with image zoom on hover
  - ExperienceTimeline: Glass timeline with gradient dots
  - SkillsSection: Glass skill cards with gradient progress bars
  - ContactForm: Glass input fields with smooth focus states
  - AboutSection: Glass content panels with gradient borders

### Technical

- Added custom Tailwind animations (float, glow, slide-up)
- Extended Tailwind with backdrop-blur-xs
- Created reusable animation keyframes
- Implemented safe-area-inset for mobile devices
- Added CSS custom scrollbar styling
- Optimized canvas rendering performance
- Reduced animation opacity for better performance

### Performance

- Code animation optimized: ~60% fewer lines
- Doubled line spacing (60px → 120px)
- Reduced base opacity (0.2 → 0.15)
- Lower canvas opacity (light: 0.6, dark: 0.7)
- Frame-based rendering instead of time-based

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
