'use client';

import React from 'react';
import Terminal from '../../../components/terminal/Terminal';
import { ThemeType, useTheme } from '../../../contexts/ThemeContext';

export default function TerminalThemePage() {
  const { theme, setTheme } = useTheme();

  // Auto-set theme to terminal when visiting this page
  React.useEffect(() => {
    if (theme !== 'terminal') {
      setTheme('terminal');
    }
  }, [theme, setTheme]);

  return (
    <main className="min-h-screen bg-terminal-bg p-4 sm:p-8">
      <div className="container mx-auto">
        <div className="flex flex-col h-[80vh] sm:h-[85vh]">
          {/* Top navigation bar */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2 items-center">
              <button 
                onClick={() => window.history.back()}
                className="text-terminal-green hover:text-white border border-terminal-green hover:bg-terminal-highlight px-3 py-1 rounded-sm text-sm"
              >
                cd ..
              </button>
              <span className="text-terminal-green text-xs">/home/user/portfolio</span>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-terminal-green hover:text-white border border-terminal-green hover:bg-terminal-highlight px-3 py-1 rounded-sm text-sm"
              >
                Home
              </button>
              <button 
                onClick={() => {}} // Will be implemented for theme switching
                className="text-terminal-green hover:text-white border border-terminal-green hover:bg-terminal-highlight px-3 py-1 rounded-sm text-sm"
              >
                Change Theme
              </button>
            </div>
          </div>
          
          {/* Terminal */}
          <Terminal />
          
          {/* Footer */}
          <div className="mt-4 text-terminal-green text-xs opacity-70 text-center">
            <p>Type 'help' to see available commands. Try 'sudo rm -rf /' for a surprise.</p>
            <p className="mt-1">© {new Date().getFullYear()} | Portfolio v1.0.0 | Cyberpunk Terminal Theme</p>
          </div>
        </div>
      </div>
    </main>
  );
} 