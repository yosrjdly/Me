'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Terminal from '../../components/terminal/Terminal';
import { ThemeType, useTheme } from '../../../contexts/ThemeContext';
import '../../../styles/themes/terminal.css';
import './terminal-styles.css';

// Enhanced Matrix Rain background effect with purple/teal colors
const MatrixRain = () => {
  const [columns, setColumns] = useState<{char: string, y: number, speed: number, opacity: number, color: string}[]>([]);
  
  useEffect(() => {
    // Number of columns based on screen width
    const charWidth = 14; // Approximate width of a character in px
    const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const numColumns = Math.floor(containerWidth / charWidth);
    
    // Color options in our theme palette
    const colors = ['#5eead4', '#9be1ff', '#c084fc', '#f4c467'];
    
    // Initialize matrix rain
    const newColumns = Array.from({ length: numColumns }, () => ({
      char: String.fromCharCode(Math.floor(Math.random() * 93) + 33),
      y: Math.floor(Math.random() * -100),
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setColumns(newColumns);
    
    // Update matrix animation
    const intervalId = setInterval(() => {
      setColumns(prevColumns => 
        prevColumns.map(col => {
          const y = col.y + col.speed;
          
          // Reset when it reaches the bottom
          if (y > window.innerHeight / charWidth) {
            return {
              char: String.fromCharCode(Math.floor(Math.random() * 93) + 33),
              y: Math.floor(Math.random() * -20),
              speed: Math.random() * 2 + 1,
              opacity: Math.random() * 0.5 + 0.1,
              color: colors[Math.floor(Math.random() * colors.length)]
            };
          }
          
          // Randomly change characters sometimes
          if (Math.random() > 0.9) {
            return {
              ...col,
              char: String.fromCharCode(Math.floor(Math.random() * 93) + 33),
              y
            };
          }
          
          return { ...col, y };
        })
      );
    }, 100);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="matrix-background fixed inset-0 z-[-1]">
      {columns.map((col, i) => (
        <div 
          key={i}
          className="absolute"
          style={{
            left: `${i * 14}px`,
            top: `${col.y * 16}px`,
            opacity: col.opacity,
            color: col.color,
            textShadow: `0 0 5px ${col.color}`,
            transform: `scale(${0.8 + Math.random() * 0.4})`,
            transition: 'all 0.1s ease'
          }}
        >
          {col.char}
        </div>
      ))}
    </div>
  );
};

export default function TerminalThemePage() {
  const { theme, setTheme } = useTheme();
  const [clockTime, setClockTime] = useState(new Date().toLocaleTimeString());
  const [showOverlay, setShowOverlay] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [skipEnabled, setSkipEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  // Handle key press to skip boot sequence
  const handleSkip = useCallback(() => {
    if (skipEnabled) {
      setShowOverlay(false);
    }
  }, [skipEnabled]);
  
  // Auto-set theme to terminal when visiting this page
  useEffect(() => {
    if (theme !== 'terminal') {
      setTheme('terminal');
    }
    
    // Set document background to dark purple-black
    document.body.style.backgroundColor = '#0f0920';
    document.body.classList.add('terminal-page');
    
    // Update clock
    const clockInterval = setInterval(() => {
      setClockTime(new Date().toLocaleTimeString());
    }, 1000);
    
    // Boot sequence animation
    let bootInterval: NodeJS.Timeout;
    if (showOverlay) {
      bootInterval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(bootInterval);
            setTimeout(() => {
              setShowOverlay(false);
            }, 500);
            return 100;
          }
          return prev + 1;
        });
        
        // Enable skip option after 20% progress
        if (bootProgress > 20 && !skipEnabled) {
          setSkipEnabled(true);
        }
      }, 30);
    }
    
    // Add keyboard event listener to skip boot
    const handleKeyDown = (e: KeyboardEvent) => handleSkip();
    if (showOverlay) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    // Clean up on unmount
    return () => {
      document.body.style.backgroundColor = '';
      document.body.classList.remove('terminal-page');
      clearInterval(clockInterval);
      if (bootInterval) clearInterval(bootInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [theme, setTheme, showOverlay, bootProgress, skipEnabled, handleSkip]);
  
  // Toggle dark mode effect
  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
    document.body.classList.toggle('darkmode-enabled');
  };
  
  return (
    <main className={`min-h-screen bg-terminal-bg py-6 px-4 sm:px-6 md:px-8 lg:py-10 relative ${darkModeEnabled ? 'darkmode-enabled' : ''}`}>
      {/* Boot overlay */}
      {showOverlay && (
        <div 
          className="fixed inset-0 bg-[#0f0920] z-50 flex items-center justify-center transition-opacity duration-500" 
          style={{ opacity: showOverlay ? 1 : 0 }}
          onClick={handleSkip}
        >
          <div className="text-terminal-green text-xl max-w-2xl w-full">
            <div className="text-center mb-4 terminal-glitch" data-text="INITIALIZING SYSTEM">
              INITIALIZING SYSTEM
            </div>
            
            <div className="ascii-art text-center mb-6">
              ██╗   ██╗ ██████╗ ███████╗██████╗ 
              ╚██╗ ██╔╝██╔═══██╗██╔════╝██╔══██╗
               ╚████╔╝ ██║   ██║███████╗██████╔╝
                ╚██╔╝  ██║   ██║╚════██║██╔══██╗
                 ██║   ╚██████╔╝███████║██║  ██║
                 ╚═╝    ╚═════╝ ╚══════╝╚═╝  ╚═╝
            </div>
            
            <div className="terminal-progress w-full h-2 bg-terminal-green bg-opacity-30 rounded-full mb-4">
              <div 
                className="h-full bg-terminal-green rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${bootProgress}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs px-1">
              <div>status: <span className="text-terminal-yellow">loading_kernel</span></div>
              <div>progress: <span className="text-terminal-cyan">{bootProgress}%</span></div>
            </div>
            
            <div className="mt-4 cyber-grid p-4 border border-terminal-green border-opacity-30 bg-black bg-opacity-70 rounded-sm">
              <div className="text-xs text-terminal-green mb-2">BOOT SEQUENCE LOGS:</div>
              <div className="text-terminal-cyan text-xs">
                {Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}
              </div>
              <div className="text-terminal-yellow text-xs">
                Loading system modules: <span className="text-terminal-green">networking.sys</span>, <span className="text-terminal-green">memory.sys</span>, <span className="text-terminal-green">graphics.sys</span>
              </div>
              <div className="text-terminal-red text-xs">
                WARNING: System overclocked by {Math.floor(Math.random() * 40) + 10}%
              </div>
            </div>
            
            {skipEnabled && (
              <div className="skip-prompt absolute bottom-4 right-4 text-terminal-green text-sm">
                Press any key to skip...
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Matrix animation background */}
      <MatrixRain />
      
      <div className="container mx-auto">
        {/* Navigation bar with system status */}
        <nav className="flex justify-between items-center mb-6 text-terminal-cyan bg-black bg-opacity-70 p-3 rounded-lg border border-terminal-green border-opacity-30">
          <div className="flex space-x-4 items-center">
            <button 
              onClick={() => window.history.back()}
              className="terminal-button px-3 py-1.5 hover:bg-terminal-green hover:bg-opacity-20 rounded transition-colors"
            >
              cd ..
            </button>
            <span className="hidden sm:block text-xs opacity-80">/home/$USER/portfolio</span>
          </div>
          
          <div className="text-xs text-terminal-green">
            <span className="mr-4">UPTIME: {Math.floor(Math.random() * 24)}h {Math.floor(Math.random() * 60)}m</span>
            <span className="terminal-blink">█</span> {clockTime}
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={toggleDarkMode}
              className="terminal-button px-3 py-1.5 hover:bg-terminal-green hover:bg-opacity-20 rounded transition-colors"
              title="Toggle CRT Effects"
            >
              --darkmode
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="terminal-button px-3 py-1.5 hover:bg-terminal-green hover:bg-opacity-20 rounded transition-colors"
            >
              cd ~
            </button>
          </div>
        </nav>
        
        {/* Main Terminal */}
        <Terminal />
        
        {/* Footer with enhanced styling */}
        <div className="mt-6 text-terminal-green text-xs opacity-80 text-center p-4 bg-black bg-opacity-50 rounded-lg border border-terminal-green border-opacity-20">
          <p className="text-terminal-cyan mb-1">Type <span className="text-terminal-green">'help'</span> to see available commands. Try <span className="text-terminal-yellow">'skills --graph'</span> or <span className="text-terminal-purple">'experience'</span> for rich visualizations.</p>
          <p className="terminal-glitch" data-text={`© ${new Date().getFullYear()} | Portfolio Terminal v1.0.0 | ${Math.floor(Math.random() * 1000)} packages, ${Math.floor(Math.random() * 100)} updates available`}>
            © {new Date().getFullYear()} | Portfolio Terminal v1.0.0 | {Math.floor(Math.random() * 1000)} packages, {Math.floor(Math.random() * 100)} updates available
          </p>
        </div>
      </div>
    </main>
  );
} 