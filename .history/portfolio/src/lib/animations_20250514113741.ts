'use client';

// This file will contain animation presets for different themes
// Implemented as basic CSS classes for now, but can be extended
// with GSAP or Framer Motion

import { ThemeType } from '@/contexts/ThemeContext';

// Animation variants by theme
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const staggerChildrenVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Theme-specific animations
export const getThemeAnimations = (theme: ThemeType) => {
  switch (theme) {
    case 'terminal':
      return {
        container: 'animate-terminal-boot',
        item: 'animate-terminal-type',
        button: 'hover:animate-terminal-blink',
        link: 'hover:animate-terminal-highlight',
      };
      
    case 'linkedin':
      return {
        container: 'animate-fade-in',
        item: 'animate-slide-up',
        button: 'hover:scale-105 transition-transform',
        link: 'hover:text-linkedin-primary transition-colors',
      };
      
    case 'messaging':
      return {
        container: 'animate-fade-in',
        item: 'animate-message-pop',
        button: 'active:scale-95 transition-transform',
        link: 'hover:underline transition-all',
      };
      
    case 'game':
      return {
        container: 'animate-game-start',
        item: 'animate-bounce-in',
        button: 'hover:animate-pulse hover:shadow-glow',
        link: 'hover:animate-game-hover',
      };
      
    default:
      return {
        container: 'animate-fade-in',
        item: 'animate-slide-up',
        button: 'hover:scale-105 transition-transform',
        link: 'hover:underline transition-colors',
      };
  }
};

// CSS classes for animations
export const animationClasses = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  slideLeft: 'animate-slide-left',
  slideRight: 'animate-slide-right',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  spin: 'animate-spin',
  pingOnce: 'animate-ping-once',
};

// Helper for creating staggered animations
export const getStaggerDelay = (index: number, baseDelay: number = 0.1) => {
  return { animationDelay: `${index * baseDelay}s` };
}; 