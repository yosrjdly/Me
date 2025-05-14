# Multi-Theme Portfolio

A creative developer portfolio that features radical UI metaphor switching, with four distinct themes that completely change the layout and interactions.

## Recent Updates

- Enhanced cyberpunk terminal theme with neon blue/purple/teal color scheme (#00aaff, #a855f7, #06b6d4)
- Implemented custom-styled terminal prompt with colored username, directory, and symbol components
- Added pulsing glow effects and improved terminal visuals with enhanced shadows
- Improved terminal container sizing (80vh height, 1000px max-width) with rounded corners
- Added personal.json for centralized user information management
- Personalized terminal experience using the portfolio owner's data
- Enhanced the terminal theme with advanced cyberpunk animations and effects
- Components have been moved to the src/app/components directory for better organization
- CSS imports have been fixed to ensure all styles load properly

## Tech Stack

- Next.js 15.3.2 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Context API for theme management

## Features Implemented

- **Theme Context System**: A flexible context API for theme switching between Terminal, LinkedIn, Messaging, and Game UI metaphors.
- **Theme Persistence**: Themes are saved to localStorage for persistence between sessions.
- **Base Layout & Structure**: Foundational layout with theme-aware styling.
- **Theme Switcher Component**: An interactive UI element to switch between different themes.
- **Responsive Design**: Works across all device sizes.
- **Centralized Data Management**: Project, skill, and personal data with utility functions for accessing data.
- **Animation Utilities**: Theme-specific animation presets ready to use.

### Terminal Theme
- Interactive command-line interface with cyberpunk styling
- Enhanced cyberpunk color scheme with neon blue/purple/teal palette (#00aaff, #a855f7, #06b6d4)
- Custom-styled terminal prompt with colored username, directory, and symbol components
- Command history and navigation (up/down arrows)
- Tab completion for commands
- Custom command registry with various portfolio commands
- Dynamic boot sequence with ASCII art and animations
- "Press any key to skip" feature for quick access
- Playful login simulation with password failure messages
- RPG-style experience display with quest levels and XP rewards
- Skill visualization with interactive progress bars
- Animated ASCII art logo personalized with name
- Simulated boss battle mini-game with commands
- SMTP-style contact simulation with animated output
- Testimonials displayed as corrupted logs with decode functionality
- Various visual effects (glitch, typing, scanning)
- Easter eggs like "sudo make coffee" and "rm -rf /"
- Dark mode toggle with enhanced CRT effects
- Scrollable terminal interface with custom-styled scrollbar
- "Scroll to bottom" button that appears when scrolled up
- Fixed command input with backdrop blur effect
- Automatic scrolling to the latest command output
- Pulsing glow effect with glow-blue animation
- Improved terminal container sizing (80vh height, 1000px max-width)
- Rounded corners (12px border-radius) and enhanced shadows

### LinkedIn Theme
- Professional portfolio layout with modern design
- Sleek color scheme with deep blue (#3D5A80) and coral accent (#EE6C4D)
- Responsive sidebar with profile information, skills, and languages
- Timeline-style experience and education sections
- Grid-based project layouts with featured projects showcase
- Skills display with animated progress bars
- Modern card components with subtle hover animations
- Clean typography with excellent readability
- Consistent UI components (buttons, badges, cards)
- Smooth scroll and fade animations
- Social media links with interactive icons
- Available for hire badge with pulsing animation
- Mobile-optimized layout with responsive grid
- Proper spacing and visual hierarchy

## Themes

1. **Terminal Theme**: A cyberpunk command-line interface with neon colors, retro CRT effects, glitch animations, and RPG-style interactions.
2. **LinkedIn Theme**: Professional layout inspired by LinkedIn with cards and professional styling.
3. **Messaging Theme**: Modern chat-inspired interface with message bubbles and conversational UI.
4. **Game Theme**: Retro arcade game interface with vibrant colors and playful interactions.

## Project Structure

The project follows a feature-based architecture with theme-specific components organized into separate directories:

```
📂 src/
├── 📂 app/                # Next.js 13+ App Router
│   ├── 📂 (main)/         # Default layout group
│   │   ├── layout.tsx     # Shared base layout with theme provider
│   │   └── page.tsx       # Homepage with theme selector
│   ├── 📂 themes/         # Theme-specific pages
│   │   ├── terminal/      # Terminal theme implementation
│   │   └── ...            # Other themes (to be implemented)
│   └── 📂 components/     # UI components
│       ├── 📂 shared/     # Theme-agnostic components 
│       │   └── ThemeSwitcher.tsx # Global theme selector
│       ├── 📂 terminal/   # Terminal-specific components
│       │   ├── Terminal.tsx   # Main terminal container
│       │   ├── TerminalInput.tsx # Command input with history
│       │   ├── TerminalOutput.tsx # Command output display
│       │   ├── TerminalLoading.tsx # Loading animations
│       │   └── CommandRegistry.ts # Command definitions
│       └── 📂 linkedin/   # LinkedIn-specific components
│           ├── Profile.tsx # LinkedIn profile component
│           ├── Projects.tsx # Projects display component
│           └── SkillBar.tsx # Skill visualization component
│
├── 📂 contexts/           # State management
│   └── ThemeContext.tsx   # Theme state and switching logic
│
├── 📂 lib/                # Utilities
│   ├── themes.ts          # Theme configurations
│   ├── projects.ts        # Project data utilities
│   ├── skills.ts          # Skills data utilities
│   ├── personal.ts        # Personal data utilities
│   └── animations.ts      # Animation presets
│
├── 📂 styles/             # CSS/SCSS
│   ├── globals.css        # Global styles and theme classes
│   └── themes/            # Theme-specific styles
│       └── terminal.css   # Terminal theme special effects
│
└── 📂 data/               # Static data
    ├── projects.json      # Project data
    ├── skills.json        # Skills data
    └── personal.json      # Portfolio owner personal data
```

## Customizing Your Information

To personalize the portfolio with your information:

1. Edit `src/data/personal.json` with your details (name, bio, experience, education, etc.)
2. Update `src/data/skills.json` with your technical skills
3. Modify `src/data/projects.json` with your projects

The data will automatically populate across all themes, providing a consistent experience while maintaining the unique theme interfaces.

## Running Locally

First, run the development server:

```bash
# For bash/zsh users
npm run dev
# or
yarn dev
```

For PowerShell users:
```powershell
# Navigate to the project directory
cd portfolio
# Run the development server
npm run dev
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

## Terminal Theme Commands

The terminal theme offers a rich set of commands to interact with the portfolio:

### Basic Commands
- `help` - Display available commands
- `clear` - Clear the terminal
- `whoami` - Display user information
- `ls` - List virtual "files" and directories
- `cd [directory]` - Navigate to virtual directories
- `cat [file]` - View file contents

### Portfolio Commands
- `about [--full]` - Display basic or detailed information
- `projects` - List all projects
- `project [name]` - View details about a specific project
- `skills [--graph]` - View skills with optional ASCII graph
- `experience` - Browse professional experience
- `education` - View education details
- `languages` - Show language proficiency

### Fun Commands
- `matrix` - Activate Matrix effect
- `hack [target]` - Simulate hacking a system
- `boot` - Restart the terminal boot sequence

### Hidden Commands
Try using `cat .secret` to discover hidden commands!

## Configuration Notes

- **Tailwind CSS v4**: Uses the new CSS variable system and utility-first approach.
- **Next.js 15**: Configured with app router and server components.
- **React 19**: Updated useEffect patterns with proper cleanup functions.
- **TypeScript**: Full type safety across the entire codebase.

## Future Enhancements

- Projects section with case studies showcasing workflow
- Advanced animations for scroll-triggered effects
- Interactive diagrams for process explanation
- Theme-specific micro-interactions
- Messaging theme implementation
- Game theme implementation

## Getting Started

```bash
cd portfolio
npm run dev
```

Visit http://localhost:3000 to see the portfolio in action.
