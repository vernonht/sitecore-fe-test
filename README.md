# Mini Instagram

A lightweight Instagram-like social media application built with modern web technologies for a frontend interview assignment.

## Overview

Mini Instagram is a full-featured social media platform that allows users to create, view, and interact with posts. The application supports image sharing, commenting, liking, and customizable user preferences.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15.1.7
- **React**: 19.0.0 with TypeScript
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) 5.0.11
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query) 5.62.7
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.4.1
- **Date Handling**: [date-fns](https://date-fns.org/) 4.1.0
- **Icons**: [Lucide React](https://lucide.dev/) 0.468.0
- **Linting**: ESLint with Next.js configuration
- **Code Formatting**: Prettier with Tailwind plugin

## Project Structure

```
mini-instagram/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers and navbar
│   ├── page.tsx           # Home page (post feed)
│   ├── create/
│   │   └── page.tsx       # Create new post page
│   ├── post/[id]/
│   │   └── page.tsx       # Single post detail page
│   └── settings/
│       └── page.tsx       # User settings page
├── components/            # React components
│   ├── Navbar.tsx         # Navigation bar
│   ├── PostFeed.tsx       # Post feed with pagination
│   ├── PostCard.tsx       # Individual post card
│   ├── CreatePostForm.tsx # Form for creating posts
│   ├── CommentList.tsx    # Comments display component
│   ├── SettingsForm.tsx   # User settings form
│   └── ui/
│       └── Avatar.tsx     # User avatar component
├── lib/                   # Utility functions and helpers
│   ├── api.ts            # API client functions
│   ├── helpers.tsx       # Helper utilities
│   └── providers.tsx     # React context providers
├── store/                # State management
│   └── useUserStore.ts  # Zustand user preferences store
├── tests/               # Jest test files
│   └── helpers.test.tsx # Unit tests for helper utilities
├── types/               # TypeScript type definitions
│   └── index.ts        # Global types (Post, Comment, etc.)
├── public/             # Static assets
├── jest.config.js      # Jest configuration for Next.js
├── jest.setup.js       # Jest setup file
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── next.config.ts      # Next.js configuration
```

## Features

### Core Features
- **Post Feed**: Browse infinite scroll post feed with pagination
- **Create Posts**: Upload images and add captions
- **View Posts**: View detailed post information with comments
- **Comments**: Read and interact with post comments
- **Likes**: Like and unlike posts
- **User Profiles**: Display user avatars and information

### User Preferences
- **Date Format**: Customize date display format (stored with Zustand)
- **Posts Per Row**: Adjust grid layout to show 1-4 posts per row
- **Settings Page**: Manage user preferences

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Production server
npm start

# Linting
npm run lint

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Code formatting
npm run format

# Check formatting
npm run format:check
```

## Environment Variables

The application requires the following environment variables:

```env
NEXT_PUBLIC_API_BASE=<your-api-base-url>
NEXT_PUBLIC_API_KEY=<your-api-key>
```

These should be set in a `.env.local` file for local development.

## API Integration

The application communicates with a backend API for:

- **Posts**: Fetch paginated posts, get post details, create posts
- **Comments**: Fetch comments for a post, create comments
- **Likes**: Like/unlike posts

All API requests include authentication via `x-api-key` header.

## Data Types

### Post
```typescript
interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  author: string;
  likes: number;
  createdAt: string;
}
```

### Comment
```typescript
interface Comment {
  id: string;
  postId: string;
  author: string;
  text: string;
  createdAt: string;
}
```

### User Store
- **dateFormat**: Date format string (default: "MMM dd, yyyy")
- **postPerRow**: Posts per row in grid (default: 3)

## State Management

User preferences are managed with Zustand in `store/useUserStore.ts`:
- Persistent settings for date format and post layout
- Global access throughout the application

## Getting Started

### Try the Live Demo
Visit the deployed application: [https://sitecore-fe-test.vercel.app/](https://sitecore-fe-test.vercel.app/)

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Update with your API base URL and key

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Development

### Testing
- Jest configured with Next.js via `next/jest`
- Test environment: `jest-environment-jsdom`
- Test setup: `jest.setup.js` with `@testing-library/jest-dom`
- Current tests live in `tests/helpers.test.tsx`

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for consistent code formatting

### Styling
- Tailwind CSS for utility-first styling
- Mobile-responsive design
- Custom UI components

## Performance Optimizations

- Server-side rendering with Next.js
- React Query for efficient data fetching and caching
- Image optimization with Next.js Image component
- Code splitting and lazy loading

## License

This project is a frontend interview assignment.
