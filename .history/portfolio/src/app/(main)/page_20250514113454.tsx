'use client';

import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeSwitcher from '../../components/shared/ThemeSwitcher';
import themeConfigs from '../../lib/';

export default function HomePage() {
  const { theme } = useTheme();
  const currentTheme = themeConfigs[theme];

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
          
          <section className="mt-16 w-full max-w-4xl">
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