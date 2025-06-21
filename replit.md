# The Story of a Toolkit - Personal Brand Journey

## Overview
This is a full-stack web application showcasing a personal brand journey through an interactive storytelling experience. The application presents 8 chapters of technology adoption through rhombus-shaped visual elements on a colorful NFT-style background. Built as a modern web application using React frontend with Express backend, featuring a clean design system and responsive layout.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Animations**: Framer Motion for smooth transitions and interactions
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: TSX for TypeScript execution in development
- **Production**: ESBuild for server bundling

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Management**: Drizzle Kit for migrations
- **Development Storage**: In-memory storage implementation
- **Production Ready**: Configured for PostgreSQL with Neon Database integration

## Key Components

### Frontend Components
1. **Interactive Chapters**: Rhombus-shaped components displaying technology journey chapters
2. **Background Decorations**: Animated floating elements for visual appeal
3. **Header/Footer**: Clean navigation and call-to-action sections
4. **Design System**: Comprehensive UI component library using shadcn/ui

### Backend Components
1. **Storage Interface**: Abstracted storage layer supporting both memory and database implementations
2. **Route Registration**: Modular route organization with API prefix
3. **Development Server**: Vite integration for hot reloading in development
4. **Error Handling**: Centralized error handling middleware

### Shared Components
1. **Schema Definitions**: Drizzle ORM schemas with Zod validation
2. **Type Safety**: Shared TypeScript types between frontend and backend

## Data Flow
1. Frontend makes API requests to `/api/*` endpoints
2. Backend processes requests through Express middleware chain
3. Storage layer handles data operations (currently in-memory, ready for database)
4. Responses are formatted as JSON and sent back to frontend
5. TanStack Query manages caching and state synchronization on frontend

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/***: Headless UI components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and development server
- **tsx**: TypeScript execution
- **esbuild**: JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20, PostgreSQL 16 modules
- **Port Configuration**: Local port 5000, external port 80
- **Hot Reload**: Vite development server with HMR
- **Database**: PostgreSQL instance provisioned through Replit

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Deployment Target**: Autoscale deployment on Replit
- **Environment**: Production Node.js runtime

### Build Process
1. `npm run build` triggers both frontend and backend builds
2. Frontend assets are optimized and bundled
3. Backend is bundled with external packages excluded
4. Static files are served from Express in production

## User Preferences
Preferred communication style: Simple, everyday language.

## Changelog
Changelog:
- June 14, 2025. Initial setup
- June 20, 2025. Added laser defense game integration
  - Created interactive laser defense game component
  - Users must win game to unlock contact information
  - Integrated with existing Galaga battleship theme
  - Added contact information display component
  - Maintains arcade aesthetic with pixel art styling
- June 21, 2025. Replaced space invaders with Pong game
  - Implemented classic Pong gameplay with AI opponent
  - Added progressive email reveal feature (joshua@renfro.dev)
  - Each paddle hit reveals next letter of email address
  - First to 5 points wins to unlock contact information
  - Enhanced terminal aesthetic with glowing effects