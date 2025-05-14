'use client';

import React, { useState } from 'react';
import { useTheme, ThemeType } from '../../contexts/ThemeContext';
import themeConfigs from '../../lib/themes';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  // Get current theme config
  const currentTheme = themeConfigs[theme];

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center space-x-2 px-4 py-2 ${currentTheme.uiElements.borderRadius} ${currentTheme.uiElements.buttonStyle} ${currentTheme.uiElements.hoverEffect}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{currentTheme.icon}</span>
        <span className={currentTheme.mainColors.text}>
          {currentTheme.name} Theme
        </span>
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 ${theme === 'terminal' ? 'bg-terminal-bg border border-terminal-green' : 'bg-white'}`}>
          <div className="py-1" role="menu" aria-orientation="vertical">
            {Object.entries(themeConfigs).map(([themeKey, config]) => (
              <button
                key={themeKey}
                onClick={() => handleThemeChange(themeKey as ThemeType)}
                className={`w-full text-left px-4 py-2 ${theme === themeKey ? 'bg-gray-100' : ''} ${theme === 'terminal' && themeKey === theme ? 'bg-terminal-highlight' : ''}`}
                role="menuitem"
              >
                <div className="flex items-center">
                  <span className="mr-2">{config.icon}</span>
                  <div>
                    <p className={`font-medium ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-900'}`}>{config.name}</p>
                    <p className={`text-xs ${theme === 'terminal' ? 'text-terminal-green' : 'text-gray-500'}`}>{config.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 