'use client';

import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeSwitcher from '../../components/shared/ThemeSwitcher';
import themeConfigs from '../../lib/themes';
import Link from 'next/link';

export default function HomePage() {
  const { theme } = useTheme();
  const currentTheme = themeConfigs[theme];

  // The themes available in the portfolio
  const availableThemes = [
    {
      name: 'Terminal',
      description: 'A cyberpunk terminal interface with retro vibes',
      icon: '💻',
      path: '/themes/terminal',
      gradient: 'from-terminal-green to-cyan-500',
    },
    {
      name: 'LinkedIn',
      description: 'Professional LinkedIn-inspired layout',
      icon: '🔗',
      path: '/themes/linkedin',
      gradient: 'from-linkedin-primary to-blue-400',
    },
    {
      name: 'Messaging',
      description: 'Modern chat-style interface',
      icon: '💬',
      path: '/themes/messaging',
      gradient: 'from-messaging-primary to-blue-300',
    },
    {
      name: 'Game',
      description: 'Retro arcade game-inspired design',
      icon: '🎮',
      path: '/themes/game',
      gradient: 'from-game-primary to-purple-500',
    }
  ];

  return (
    <main className={`min-h-screen ${currentTheme.mainColors.background}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center">
          <div className="absolute top-4 right-4">
            <ThemeSwitcher />
          </div>
          
          <section className="mt-16 text-center">
            <h1 className={`text-5xl ${currentTheme.fontFamily.heading} ${currentTheme.mainColors.primary} mb-8`}>
              {theme === 'terminal' 
                ? '> Welcome to my Portfolio' 
                : theme === 'linkedin'
                ? 'Professional Portfolio'
                : theme === 'messaging'
                ? 'Hey there! 👋'
                : 'GAME ON: Portfolio Quest'}
            </h1>
            
            <p className={`text-lg ${currentTheme.fontFamily.body} ${currentTheme.mainColors.text} max-w-2xl mx-auto`}>
              {theme === 'terminal'
                ? 'Type "help" to see available commands or use the menu to navigate.'
                : theme === 'linkedin'
                ? 'Full-stack developer with expertise in modern web technologies.'
                : theme === 'messaging'
                ? 'I\'m a developer who loves creating beautiful, interactive experiences. Swipe through my projects!'
                : 'Select a project to begin your adventure through my coding universe. Each project is a new level!'}
            </p>
          </section>
          
          {/* Theme Selector Section */}
          <section className="mt-16 w-full max-w-4xl">
            <h2 className={`text-2xl ${currentTheme.fontFamily.heading} ${currentTheme.mainColors.primary} mb-6 text-center`}>
              {theme === 'terminal' 
                ? '> select_theme' 
                : 'Choose a Theme Experience'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {availableThemes.map((themeOption) => (
                <Link 
                  key={themeOption.name} 
                  href={themeOption.path}
                  className={`p-6 ${currentTheme.uiElements.borderRadius} ${currentTheme.uiElements.hoverEffect} cursor-pointer transition-all duration-300 ${
                    theme === 'terminal'
                      ? 'border border-terminal-green hover:bg-terminal-highlight'
                      : 'shadow-lg hover:shadow-xl'
                  }`}
                >
                  <div className={`h-12 w-12 rounded-full mb-4 flex items-center justify-center text-white text-2xl bg-gradient-to-r ${themeOption.gradient}`}>
                    {themeOption.icon}
                  </div>
                  <h3 className={`text-xl ${currentTheme.fontFamily.heading} ${currentTheme.mainColors.primary} mb-2`}>
                    {theme === 'terminal' ? `> ${themeOption.name.toLowerCase()}` : themeOption.name}
                  </h3>
                  <p className={`${currentTheme.fontFamily.body} ${currentTheme.mainColors.text}`}>
                    {themeOption.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
          
          <section className="mt-16 w-full max-w-4xl">
            <h2 className={`text-2xl ${currentTheme.fontFamily.heading} ${currentTheme.mainColors.primary} mb-6 text-center`}>
              {theme === 'terminal' 
                ? '> quick_navigation' 
                : 'Quick Navigation'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <div
                  key={item}
                  className={`p-6 ${currentTheme.uiElements.borderRadius} ${currentTheme.uiElements.hoverEffect} cursor-pointer ${
                    theme === 'terminal'
                      ? 'border border-terminal-green'
                      : theme === 'linkedin'
                      ? 'bg-white shadow-md'
                      : theme === 'messaging'
                      ? 'bg-messaging-secondary'
                      : 'bg-game-secondary bg-opacity-20 border-2 border-game-primary'
                  }`}
                >
                  <h2 className={`text-xl ${currentTheme.fontFamily.heading} ${currentTheme.mainColors.primary} mb-2`}>
                    {theme === 'terminal' ? `> ${item.toLowerCase()}` : item}
                  </h2>
                  <p className={`${currentTheme.fontFamily.body} ${currentTheme.mainColors.text}`}>
                    {`${
                      theme === 'terminal'
                        ? 'Execute this command to view '
                        : theme === 'linkedin'
                        ? 'Click to view professional '
                        : theme === 'messaging'
                        ? 'Tap to open a conversation about '
                        : 'Start quest to discover '
                    }${item.toLowerCase()}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 