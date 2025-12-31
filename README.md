# Retro Resume

An interactive personal brand journey presented as a retro-themed resume experience. Built with React, TypeScript, and Express, featuring arcade-style gameplay elements and a vibrant NFT-inspired aesthetic.

## Features

- **Interactive Chapters**: 8 rhombus-shaped chapters showcasing technology adoption journey
- **Retro Gaming Aesthetic**: Terminal-style interface with neon glow effects
- **Pong Game Integration**: Classic Pong game with AI opponent to unlock contact information
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern Tech Stack**: React 18, TypeScript, Vite, Express, Drizzle ORM
- **Animated UI**: Framer Motion for smooth transitions and interactions

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with shadcn/ui components
- **TanStack Query** for server state management
- **Framer Motion** for animations
- **Wouter** for lightweight routing

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **Drizzle ORM** for database operations
- **PostgreSQL** database support

## Prerequisites

- Node.js 20.x or higher
- PostgreSQL 16 (for production database)
- npm or pnpm

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Retro-Resume
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Required for production database
DATABASE_URL=postgresql://user:password@host:port/database

# Development or production
NODE_ENV=development

# Server port (default: 5000)
PORT=5000

# Session secret (generate a secure random string)
SESSION_SECRET=your-secret-key-here
```

### 4. Run in development mode

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
Retro-Resume/
├── client/               # Frontend React application
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── lib/         # Utility functions
│   └── index.html       # HTML entry point
├── server/              # Backend Express application
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   ├── storage.ts       # Data storage layer
│   └── vite.ts          # Vite dev server setup
├── shared/              # Shared code between client/server
│   └── schema.ts        # Database schema
├── attached_assets/     # Project assets (images, etc.)
└── migrations/          # Database migrations
```

## Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run check` - Run TypeScript type checking

### Building
- `npm run build` - Build both client and server for production
- `npm run build:client` - Build client only
- `npm run build:server` - Build server only
- `npm run clean` - Remove build artifacts

### Production
- `npm start` - Start production server (requires build first)

### Database
- `npm run db:push` - Push schema changes to database
- `npm run db:generate` - Generate migration files
- `npm run db:migrate` - Run migrations

## Development

### Code Style

This project follows specific naming conventions:

- **Components**: PascalCase (e.g., `PongGame`, `ChapterRhombus`)
- **Files**: kebab-case (e.g., `pong-game.tsx`, `contact-info.tsx`)
- **Props**: `[ComponentName]Props` pattern
- **State**: camelCase descriptive names
- **Constants**: SCREAMING_SNAKE_CASE

See `NAMING_CONVENTION.md` for complete guidelines.

### Database Setup

For local development, you can use PostgreSQL or run without a database (in-memory storage):

1. Install PostgreSQL locally or use a service like [Neon](https://neon.tech)
2. Create a database
3. Add the connection string to `.env`
4. Run migrations: `npm run db:push`

## Building for Production

1. Ensure all environment variables are set in `.env`
2. Build the application:
   ```bash
   npm run build
   ```
3. Start the production server:
   ```bash
   npm start
   ```

The build process:
- Bundles the React frontend with Vite (output: `dist/public/`)
- Bundles the Express server with esbuild (output: `dist/index.js`)
- Serves static files from the production build

## Deployment

This application can be deployed to any Node.js hosting platform:

- **Vercel/Netlify**: Configure as a Node.js application with the build command
- **Railway/Render**: Use the provided Dockerfile or buildpack
- **VPS**: Deploy with PM2 or similar process manager

Make sure to:
1. Set environment variables on your hosting platform
2. Provision a PostgreSQL database
3. Run database migrations before starting the server

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Production | - |
| `NODE_ENV` | Environment mode | No | development |
| `PORT` | Server port | No | 5000 |
| `SESSION_SECRET` | Session encryption key | Production | - |

## Features Deep Dive

### Interactive Chapters

Each chapter is displayed as a rhombus-shaped card featuring:
- Title and description
- Representative image
- Status indicator
- External links to related content (LinkedIn, Medium, etc.)

### Pong Game

Classic Pong game implementation with:
- AI opponent with adjustable difficulty
- Progressive phone number reveal (unlocked by paddle hits)
- Touch controls for mobile devices
- Retro pixel art styling

### Responsive Design

The application adapts to different screen sizes:
- Desktop: Full layout with side-by-side content
- Tablet: Adjusted spacing and component sizing
- Mobile: Stacked layout with touch-friendly controls

## License

MIT

## Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

## Credits

Built by Josh Renfro - [LinkedIn](https://www.linkedin.com/in/joshuarenfro/)
