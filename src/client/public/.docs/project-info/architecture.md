# CV Website - Project Architecture

## Overview

- **Project**: CV Website
- **Version**: `0.1.0`
- **Type**: Next.js frontend application
- **Purpose**: Personal portfolio and blog site for Andrei Zubrytski
- **Architecture**: App Router-based React application with server-rendered routes and client-side interactivity

## Technology Stack

- **Framework**: Next.js `15.5.18`
- **UI**: React `19.0.0`
- **Language**: TypeScript with strict mode enabled
- **Styling**: Material UI `6.4.1`, Emotion, SCSS
- **Routing**: Next.js App Router
- **Build**: Next.js build pipeline
- **Testing**: Jest and React Testing Library

## Application Structure

The application lives in `src/client/src` and is organized by responsibility:

```text
src/
├── app/                 # App Router entry points and route layouts
├── components/          # Reusable UI sections and widgets
├── lib/                 # Blog content loading and markdown rendering helpers
├── models/              # TypeScript models and mock data
├── services/            # Data access helpers for portfolio sections
├── styles/              # Shared styling helpers and SCSS files
├── themes/              # Light and dark MUI theme definitions
├── views/               # Route-level page compositions
├── shared/              # Shared static assets
└── utils/               # General utility helpers
```

### Route Map

- `/` - portfolio home page
- `/blog` - blog index with topic list
- `/blog/[slug]` - individual markdown article page
- `/beats` - beats page

## Rendering Model

### Root Layout

- `src/app/layout.tsx` defines the global document structure
- Global CSS and SCSS files are loaded here
- `Providers` wraps the app with theme and layout context

### Providers

- `src/app/providers.tsx` manages dark/light mode state
- It selects between `darkTheme` and `lightTheme`
- It also renders the shared navigation bar
- Page content is wrapped in a centered `Container`

### Page Composition

- `src/app/page.tsx` renders the main portfolio grid
- `src/app/blog/page.tsx` loads blog posts and renders the blog index
- `src/app/blog/[slug]/page.tsx` loads a single post and renders the article page
- Route files remain thin and delegate UI to `views/`

## Blog Architecture

The blog is file-based and markdown-driven.

### Content Storage

- Blog posts live in `src/client/content/blog`
- Each post is a `.md` file with YAML-like frontmatter
- Posts are grouped by skill category in subfolders
- Planned posts and published posts share the same format

### Models

- `src/models/Post.ts` defines the blog data contract
- `Post` contains:
  - `topic`
  - `tags`
  - `content`
- `BlogPost` extends that base shape with route and display metadata
- `BlogPostStatus` tracks `published` or `planned`

### Loaders

- `src/lib/blog.tsx` reads markdown files from disk
- It parses frontmatter and extracts:
  - slug
  - topic
  - tags
  - status
  - summary
  - category metadata
- It exposes:
  - `getBlogPosts()`
  - `getBlogPostBySlug()`
  - `groupBlogPosts()`

### Markdown Rendering

- `src/lib/markdown.tsx` renders markdown to React nodes
- Supported formatting includes:
  - headings
  - paragraphs
  - ordered and unordered lists
  - blockquotes
  - code blocks
  - inline code
  - bold text
  - links
- Rendering adapts to the active theme mode for code and quote styling

### Blog Views

- `src/views/Blog.tsx` renders the blog index as a flat list of topics
- `src/views/BlogArticle.tsx` renders the article page
- The index and article page both use theme-aware glass surfaces
- Planned posts are visually de-emphasized with subtle blur/opacity treatment

## Theme System

The project uses a dual-theme system with MUI and SCSS variables.

### Dark Theme

- Neon green accents
- Dark surfaces and gradients
- Strong glow/shadow treatments
- Used for both app chrome and blog surfaces

### Light Theme

- Blue-based accents
- Soft light surfaces
- More subtle shadows and gradients

### Theme Switching

- Theme state is managed in `Providers`
- The same theme drives:
  - MUI component colors
  - global body/background classes
  - glass surface helpers
  - blog markdown rendering

### Shared Surface Helpers

- `src/styles/glass.styles.ts` centralizes glass-card styling
- This helper is used by:
  - avatar/profile surfaces
  - blog list rows
  - article content containers

## Data Architecture

### Portfolio Content

- Portfolio sections use local TypeScript mock data
- `portfolio.service.ts` exposes read helpers
- Models exist for:
  - contact
  - experience
  - education
  - projects
  - skills

### Blog Content

- Blog content is separate from portfolio data
- Markdown files are the source of truth
- The loader returns typed objects for rendering and routing

## UI Architecture

### Main Portfolio Page

- `PortfolioGrid` is the primary section layout for the home page
- It composes:
  - header
  - about
  - skills
  - experience
  - education

### Header / Avatar

- `src/components/Header.tsx` renders the profile card
- The avatar image is stored in `src/shared/img/profile-photo.jpeg`
- The avatar is loaded through `models/Contact.ts`

### Navigation

- `Navbar.tsx` provides routing between home, blog, and beats
- It also exposes the theme toggle button

## Assets and Styling

### Global Styles

- `src/index.css` contains baseline reset styles
- `src/styles/global.scss` defines theme classes and reusable global utility styles
- `src/styles/Navbar.scss` and `src/styles/FlipCard.scss` contain component-specific SCSS

### Static Assets

- Shared images live under `src/shared/img`
- The current profile photo is a JPG asset used by the header avatar

## State Management

- Local component state is used for theme toggling and small UI interactions
- There is no Redux, Zustand, or external global state library
- The blog route data is resolved server-side in the route files

## Performance and Delivery

- Blog routes are statically generated through `generateStaticParams`
- Markdown content is loaded at build/runtime on the server side
- Route-level components stay thin for cleaner code splitting
- Static assets are bundled with the site for simple deployment

## Development Workflow

- Run the app from `src/client`
- Use `npm run dev` for local development
- Use `npm run build` to verify production output
- The build includes type checking and static page generation

## Notes on Current Direction

- The project is currently frontend-only
- The blog is now a real content system instead of a placeholder page
- The design favors glassy surfaces, strong typography, and a dark/light theme that stays consistent across the whole app

