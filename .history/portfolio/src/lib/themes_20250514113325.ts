import { ThemeType } from '../contexts/';

// Interface for theme configuration
export interface ThemeConfig {
  name: string;
  description: string;
  icon: string; // SVG or emoji reference
  mainColors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
  };
  fontFamily: {
    heading: string;
    body: string;
  };
  uiElements: {
    borderRadius: string;
    buttonStyle: string;
    hoverEffect: string;
  };
}

// The theme configurations
const themeConfigs: Record<ThemeType, ThemeConfig> = {
  terminal: {
    name: 'Terminal',
    description: 'A retro command-line interface',
    icon: '💻',
    mainColors: {
      background: 'bg-terminal-bg',
      text: 'text-terminal-text',
      primary: 'text-terminal-green',
      secondary: 'bg-terminal-highlight',
    },
    fontFamily: {
      heading: 'font-mono',
      body: 'font-mono',
    },
    uiElements: {
      borderRadius: 'rounded-none',
      buttonStyle: 'border border-terminal-green',
      hoverEffect: 'hover:bg-terminal-highlight',
    },
  },
  
  linkedin: {
    name: 'LinkedIn',
    description: 'Professional networking interface',
    icon: '🔗',
    mainColors: {
      background: 'bg-linkedin-bg',
      text: 'text-linkedin-text',
      primary: 'text-linkedin-primary',
      secondary: 'text-linkedin-secondary',
    },
    fontFamily: {
      heading: 'font-sans font-bold',
      body: 'font-sans',
    },
    uiElements: {
      borderRadius: 'rounded-md',
      buttonStyle: 'bg-linkedin-primary text-white',
      hoverEffect: 'hover:bg-opacity-90',
    },
  },
  
  messaging: {
    name: 'Messaging',
    description: 'Modern chat interface',
    icon: '💬',
    mainColors: {
      background: 'bg-messaging-bg',
      text: 'text-messaging-text',
      primary: 'bg-messaging-primary',
      secondary: 'bg-messaging-secondary',
    },
    fontFamily: {
      heading: 'font-sans font-medium',
      body: 'font-sans',
    },
    uiElements: {
      borderRadius: 'rounded-2xl',
      buttonStyle: 'bg-messaging-primary text-white',
      hoverEffect: 'hover:shadow-md',
    },
  },
  
  game: {
    name: 'Game',
    description: 'Retro arcade game interface',
    icon: '🎮',
    mainColors: {
      background: 'bg-game-bg',
      text: 'text-game-text',
      primary: 'text-game-primary',
      secondary: 'text-game-secondary',
    },
    fontFamily: {
      heading: 'font-sans font-black uppercase',
      body: 'font-sans',
    },
    uiElements: {
      borderRadius: 'rounded-lg',
      buttonStyle: 'bg-game-primary text-white font-bold',
      hoverEffect: 'hover:scale-105 transition-transform',
    },
  },
};

export default themeConfigs; 