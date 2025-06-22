# Naming Convention Guide

## Overview
This document establishes clear naming conventions for all components, pages, and elements in the personal brand journey application.

## File Naming Convention

### Pages
- **Format**: `kebab-case.tsx`
- **Location**: `client/src/pages/`
- **Examples**:
  - `home.tsx` → Main landing page with workflow journey
  - `not-found.tsx` → 404 error page

### Components
- **Format**: `kebab-case.tsx`
- **Location**: `client/src/components/`
- **Categories**:
  - **Layout Components**: `header.tsx`, `footer.tsx`, `background-decorations.tsx`
  - **Interactive Components**: `pong-game.tsx`, `chapter-rhombus.tsx`
  - **UI Components**: `contact-info.tsx`, `report-modal.tsx`
  - **Game Components**: Prefix with `game-` → `game-pong.tsx`

### UI Library Components
- **Format**: `kebab-case.tsx`
- **Location**: `client/src/components/ui/`
- **Standard shadcn/ui naming**: `button.tsx`, `dialog.tsx`, `toast.tsx`

## Component Naming Convention

### React Component Names
- **Format**: PascalCase
- **Pattern**: `[Purpose][Type]`
- **Examples**:
  - `HomePage` → Main landing page component
  - `PongGame` → Interactive Pong game component
  - `ChapterRhombus` → Workflow chapter display component
  - `BackgroundDecorations` → Animated background elements
  - `ContactInfo` → Contact information display
  - `ReportModal` → Modal for workflow reports

### Props Interfaces
- **Format**: `[ComponentName]Props`
- **Examples**:
  - `PongGameProps`
  - `ChapterRhombusProps`
  - `ContactInfoProps`

## State and Function Naming

### State Variables
- **Format**: camelCase with descriptive names
- **Pattern**: `[subject][State]` or `is[Condition]`
- **Examples**:
  - `gameState` → Current game state (playing, won, lost)
  - `emailLettersRevealed` → Number of email letters shown
  - `contactUnlocked` → Boolean for contact access
  - `workflowsVisible` → Boolean for workflow visibility
  - `buttonReady` → Boolean for button activation state

### Event Handlers
- **Format**: `handle[Action]` or `on[Event]`
- **Examples**:
  - `handleKeyDown` → Keyboard input handler
  - `onGameWin` → Game victory callback
  - `onModalClose` → Modal close handler

### Utility Functions
- **Format**: Descriptive verb phrases
- **Examples**:
  - `resetBall` → Reset Pong ball position
  - `generateDots` → Create border animation dots
  - `shootLaser` → Create laser projectile (if used)

## CSS Class Naming

### Custom Classes
- **Format**: `kebab-case`
- **BEM methodology where appropriate**
- **Examples**:
  - `.terminal-glow` → Terminal-style glow effect
  - `.pixel-font` → Pixelated font rendering
  - `.drop-shadow-glow` → Text glow effect
  - `.pac-dot` → Pac-Man style border dots
  - `.retro-border-container` → Container for animated borders

### Component-Specific Classes
- **Pattern**: `[component-name]__[element]--[modifier]`
- **Examples**:
  - `.pong-game__paddle` → Paddle element in Pong game
  - `.chapter-rhombus__content--complete` → Completed chapter state
  - `.contact-info__button--unlocked` → Unlocked contact button

## Data Structure Naming

### Interfaces
- **Format**: PascalCase with descriptive names
- **Examples**:
  - `Ball` → Pong ball properties
  - `WorkflowChapter` → Chapter data structure
  - `GameState` → Game state enumeration

### Constants
- **Format**: SCREAMING_SNAKE_CASE
- **Examples**:
  - `GAME_WIDTH` → Pong game area width
  - `PADDLE_SPEED` → Paddle movement speed
  - `EMAIL_ADDRESS` → Email to be revealed
  - `WIN_SCORE` → Score needed to win

## Content and Text Naming

### Button Labels
- **Clear action-oriented language**:
  - `"Engage battleships."` → Main game activation
  - `"Try Again"` → Game restart option
  - `"contact information unlocked"` → Success state

### Game States
- **Descriptive state names**:
  - `'playing'` → Active gameplay
  - `'won'` → Player victory
  - `'lost'` → Player defeat

### Animation States
- **Clear state indicators**:
  - `workflowsVisible` → Workflow chapters are shown
  - `buttonFlashing` → Button in flashing state
  - `contactUnlocked` → Contact info is accessible

## Directory Structure Context

```
client/src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── game-pong.tsx      # Game-specific components
│   ├── chapter-rhombus.tsx # Content display components
│   ├── contact-info.tsx   # Information components
│   └── background-decorations.tsx # Visual effects
├── pages/
│   ├── home.tsx           # Main application page
│   └── not-found.tsx      # Error pages
├── hooks/
│   └── use-*.tsx          # Custom React hooks
└── lib/
    ├── utils.ts           # Utility functions
    └── queryClient.ts     # API client setup
```

## Benefits of This Convention

1. **Clarity**: Every file and component has a clear, descriptive name
2. **Consistency**: Similar patterns across all code
3. **Maintainability**: Easy to locate and modify specific elements
4. **Scalability**: Pattern supports adding new features
5. **Team Communication**: Clear references in discussions and documentation

## Implementation Notes

- All existing components already follow most of these conventions
- Any new components should strictly follow this guide
- Consider refactoring if adding major new features
- Update this document when adding new component categories