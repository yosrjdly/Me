# Multi-Theme Portfolio

A creative developer portfolio that features radical UI metaphor switching, with four distinct themes that completely change the layout and interactions.

## Tech Stack

- Next.js 15.3.2 (App Router)
- TypeScript
- Tailwind CSS v4
- Context API for theme management

## Features Implemented

- **Theme Context System**: A flexible context API for theme switching between Terminal, LinkedIn, Messaging, and Game UI metaphors.
- **Theme Persistence**: Themes are saved to localStorage for persistence between sessions.
- **Base Layout & Structure**: Foundational layout with theme-aware styling.
- **Theme Switcher Component**: An interactive UI element to switch between different themes.
- **Responsive Design**: Works across all device sizes.
- **Sample Data**: Project and skill data with utility functions for accessing data.
- **Animation Utilities**: Theme-specific animation presets ready to use.
- **Terminal Theme**: Cyberpunk-inspired terminal interface with interactive commands, command history, and special effects.

## Themes

### 1. Terminal Theme (Implemented)

A retro command-line interface with a cyberpunk twist—dark backgrounds, neon green text, and monospace fonts.

**Key Features:**
- Interactive command line with history navigation (up/down arrows)
- Command auto-completion with Tab key
- Authentic terminal boot sequence
- File system simulation (ls, cat)
- Project and skills viewing through commands
- Loading animations and typing effects
- Easter eggs and hidden commands (try `sudo rm -rf /`)
- Glitch effects and CRT screen simulation

**Commands:**
- `help` - Display available commands
- `clear` - Clear the terminal
- `projects` - List all projects
- `project [name]` - View project details
- `skills` - List skills by category
- `ls [-l] [-a]` - List "files" with optional flags
- `cat [file]` - View file contents
- `contact` - Show contact info
- `/crash`, `/matrix`, `/glitch` - Special effects

### 2. LinkedIn Theme (Planned)

Professional layout inspired by LinkedIn with cards and professional styling.

### 3. Messaging Theme (Planned)

Modern chat-inspired interface with message bubbles and conversational UI.

### 4. Game Theme (Planned)

Retro arcade game interface with vibrant colors and playful interactions.

## Project Structure

The project follows a feature-based architecture with theme-specific components organized into separate directories:

```
📂 src/
├── 📂 app/                # Next.js 13+ App Router
│   ├── 📂 (main)/         # Default layout group
│   │   ├── layout.tsx     # Shared base layout with theme provider
│   │   └── page.tsx       # Homepage with theme selector
│   ├── 📂 themes/         # Theme-specific pages
│       ├── terminal/      # Terminal theme implementation
│       └── ...            # Other themes (to be implemented)
│
├── 📂 components/         # Reusable UI components
│   ├── 📂 shared/         # Theme-agnostic components
│   │   └── ThemeSwitcher.tsx # Global theme selector
│   ├── 📂 terminal/       # Terminal-specific components
│   │   ├── Terminal.tsx   # Main terminal container
│   │   ├── TerminalInput.tsx # Command input with history
│   │   ├── TerminalOutput.tsx # Command output display
│   │   ├── TerminalLoading.tsx # Loading animations
│   │   └── CommandRegistry.ts # Command definitions
│   └── 📂 [other themes]  # Other theme components (to be added)
│
├── 📂 contexts/           # State management
│   └── ThemeContext.tsx   # Theme state and switching logic
│
├── 📂 lib/                # Utilities
│   ├── themes.ts          # Theme configurations
│   ├── projects.ts        # Project data utilities
│   ├── skills.ts          # Skills data utilities
│   └── animations.ts      # Animation presets
│
├── 📂 styles/             # CSS/SCSS
│   ├── globals.css        # Global styles and theme classes
│   └── themes/            # Theme-specific styles
│       └── terminal.css   # Terminal theme special effects
│
└── 📂 data/               # Static data
    ├── projects.json      # Project data
    └── skills.json        # Skills data
```

## Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio in action.

## Next Steps

- Implement LinkedIn theme with professional styling and skill endorsements
- Develop Messaging theme with chat bubbles and conversation-like flow
- Create Game theme with pixel art and game mechanics
- Add more micro-interactions and animations for each theme
- Enhance project showcase with interactive case studies

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
