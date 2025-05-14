'use client';

import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeSwitcher from '../components/shared/ThemeSwitcher';
import themeConfigs from '../../lib/themes';
import Link from 'next/link';
import Image from 'next/image';
import { getBasicInfo } from '../../lib/personal';
import './styles.css';

export default function Home() {
  const { theme } = useTheme();
  const currentTheme = themeConfigs[theme];
  const personalInfo = getBasicInfo();

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
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Animated cyberpunk background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-teal-900/20"></div>
      </div>
      
      <div className="relative z-10 container mx-auto text-center max-w-4xl">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 glitch-text" data-text={personalInfo.name}>
          {personalInfo.name}
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
          {personalInfo.title}
        </p>
        
        <div className="relative w-full h-96 mb-10 overflow-hidden rounded-xl border-2 border-terminal-green shadow-2xl">
          <div className="absolute inset-0 bg-terminal-bg flex items-center justify-center">
            <div className="text-center">
              <div className="terminal-ascii text-terminal-green mb-4">
            ██╗   ██╗ ██████╗ ███████╗██████╗         ██╗ █████╗ ██████╗ ██╗  ██╗   ██╗
            ╚██╗ ██╔╝██╔═══██╗██╔════╝██╔══██╗        ██║██╔══██╗██╔══██╗██║  ╚██╗ ██╔╝
             ╚████╔╝ ██║   ██║███████╗██████╔╝        ██║███████║██║  ██║██║   ╚████╔╝ 
              ╚██╔╝  ██║   ██║╚════██║██╔══██╗   ██   ██║██╔══██║██║  ██║██║    ╚██╔╝  
               ██║   ╚██████╔╝███████║██║  ██║██╗╚█████╔╝██║  ██║██████╔╝███████╗██║   
               ╚═╝    ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝ ╚════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝   
              </div>
              <div className="flex justify-center items-center mb-4">
                <div className="text-terminal-cyan font-bold mr-2">
                  <span className="text-terminal-purple">yosr</span>
                  <span className="text-terminal-cyan">@</span>
                  <span className="text-terminal-green">portfolio</span>
                  <span className="text-terminal-cyan"> $</span>
                </div>
                <div className="typing-effect terminal-typing">
                  Interactive Terminal Experience
                </div>
              </div>
              <div className="mt-6">
                <Link href="/themes/terminal" className="inline-block px-6 py-3 bg-terminal-green text-black font-bold rounded-md hover:bg-terminal-green/80 transition-all duration-300 shadow-glow">
                  {'>'}START TERMINAL SESSION
                </Link>
              </div>
            </div>
          </div>
          
          {/* Scanline effect */}
          <div className="absolute inset-0 terminal-scanlines pointer-events-none"></div>
          
          {/* CRT edges effect */}
          <div className="absolute inset-0 terminal-crt pointer-events-none"></div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-gray-100">Experience My Portfolio In Different UI Metaphors</h2>
          <p className="text-gray-400 mb-6">
            Choose how you want to explore my work and skills through these unique interactive experiences
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/themes/terminal" className="theme-card p-5 rounded-lg bg-black/50 border-2 border-terminal-green hover:bg-terminal-green/10 transition-all duration-300">
              <h3 className="text-xl font-bold mb-2 text-terminal-green">Terminal</h3>
              <p className="text-gray-400 mb-2">Command-line interface with cyberpunk styling and interactive commands</p>
              <div className="text-terminal-green text-sm">cd /themes/terminal</div>
            </Link>
            
            <Link href="/themes/linkedin" className="theme-card p-5 rounded-lg bg-black/50 border-2 border-blue-600 hover:bg-blue-600/10 transition-all duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-600">LinkedIn</h3>
              <p className="text-gray-400 mb-2">Professional portfolio styled like a LinkedIn profile</p>
              <div className="text-blue-600 text-sm">View professional profile</div>
            </Link>

            <div className="theme-card p-5 rounded-lg bg-black/50 border-2 border-gray-600 transition-all duration-300 opacity-60">
              <h3 className="text-xl font-bold mb-2 text-gray-400">More coming soon...</h3>
              <p className="text-gray-500 mb-2">Messaging and Game themes under development</p>
              <div className="text-gray-400 text-sm">Stay tuned!</div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="relative z-10 w-full text-center p-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} {personalInfo.name} | Interactive Multi-theme Portfolio
      </footer>
    </main>
  );
} 