'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme, ThemeType } from '../contexts/ThemeContext';

// Theme card interface
interface ThemeCard {
  id: string;
  name: string;
  description: string;
  bgGradient: string;
  textColor: string;
  borderColor: string;
  icon: string;
  available: boolean;
}

export default function ThemeSelectorPage() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Start animation after page load
  useEffect(() => {
    setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
  }, []);
  
  // Available themes
  const themes: ThemeCard[] = [
    {
      id: 'terminal',
      name: 'Terminal',
      description: 'Experience a cyberpunk terminal interface with command-line interactions and hacker aesthetics.',
      bgGradient: 'from-black to-emerald-950',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500',
      icon: '/icons/terminal.svg',
      available: true
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'View my portfolio in a familiar professional networking layout with skills, experience and recommendations.',
      bgGradient: 'from-blue-950 to-blue-900',
      textColor: 'text-blue-300',
      borderColor: 'border-blue-500',
      icon: '/icons/linkedin.svg',
      available: true
    },
    {
      id: 'messaging',
      name: 'Messaging',
      description: 'Chat with a virtual assistant to learn about my skills and projects through a conversational interface.',
      bgGradient: 'from-purple-950 to-purple-900',
      textColor: 'text-purple-300',
      borderColor: 'border-purple-500',
      icon: '/icons/chat.svg',
      available: false
    },
    {
      id: 'game',
      name: 'Game',
      description: 'Explore my portfolio as a retro-styled game. Complete quests, earn XP, and discover hidden achievements!',
      bgGradient: 'from-green-950 to-green-900',
      textColor: 'text-green-300',
      borderColor: 'border-green-500',
      icon: '/icons/game.svg',
      available: false
    }
  ];
  
  // Handle theme selection
  const selectTheme = (themeId: string) => {
    // Find the selected theme
    const selectedTheme = themes.find(theme => theme.id === themeId);
    
    // Check if the theme is available
    if (selectedTheme && !selectedTheme.available) {
      alert('This theme is coming soon! Check back later.');
      return;
    }
    
    // Set active theme for animation
    setActiveTheme(themeId);
    
    // Short delay for animation before navigation
    setTimeout(() => {
      // Set the theme in context
      setTheme(themeId as ThemeType);
      
      // Navigate to the selected theme
      router.push(`/themes/${themeId}`);
    }, 800);
  };
  
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-indigo-950 to-black text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent opacity-60"></div>
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-purple-600/10 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-6 py-16">
        {/* Welcome section with animation */}
        <section className={`mb-20 transition-all duration-1000 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-6 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur opacity-75 animate-pulse"></div>
              <div className="relative px-6 py-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm">
                <span className="text-sm font-medium text-gray-200">Welcome to my multi-theme portfolio</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
                Choose Your Experience
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
              I've built my portfolio with <span className="text-cyan-400">multiple UI metaphors</span> so you can explore my work in the way you find most engaging.
            </p>
            
            <div className="w-16 h-16 mx-auto animate-bounce mt-12 opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>
        
        {/* Theme selection section */}
        <section className="mb-16">
          <h2 className={`text-2xl md:text-3xl font-semibold mb-12 text-center transition-all duration-1000 delay-300 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Select a <span className="text-cyan-400">UI metaphor</span> that resonates with you
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {themes.map((theme, index) => (
              <div 
                key={theme.id}
                className={`theme-card group relative transition-all duration-700 delay-${(index+1)*100} ${
                  animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                } ${activeTheme && activeTheme !== theme.id ? 'scale-95 opacity-50' : ''} 
                ${activeTheme === theme.id ? 'scale-105 z-10' : ''}
                ${theme.available ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onClick={() => theme.available && selectTheme(theme.id)}
              >
                {/* Card inner content with animated border */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-border-shine"></div>
                </div>
                
                <div className={`relative rounded-xl overflow-hidden transition-all duration-500 
                  border border-${theme.id === 'terminal' ? 'emerald' : theme.id === 'linkedin' ? 'blue' : theme.id === 'messaging' ? 'purple' : 'green'}-500/30
                  hover:border-${theme.id === 'terminal' ? 'emerald' : theme.id === 'linkedin' ? 'blue' : theme.id === 'messaging' ? 'purple' : 'green'}-400/70 
                  group-hover:shadow-lg group-hover:shadow-${theme.id === 'terminal' ? 'emerald' : theme.id === 'linkedin' ? 'blue' : theme.id === 'messaging' ? 'purple' : 'green'}-900/20
                  ${theme.available ? '' : 'opacity-70'}`}
                >
                  <div className={`h-full bg-gradient-to-br ${theme.bgGradient} px-6 py-8 flex flex-col`}>
                    {/* Theme header */}
                    <div className="flex items-center mb-6">
                      <div className={`w-14 h-14 flex items-center justify-center rounded-full mr-4
                        bg-gradient-to-br ${theme.id === 'terminal' ? 'from-emerald-900/40 to-emerald-700/20' : 
                        theme.id === 'linkedin' ? 'from-blue-900/40 to-blue-700/20' : 
                        theme.id === 'messaging' ? 'from-purple-900/40 to-purple-700/20' : 
                        'from-green-900/40 to-green-700/20'} 
                        group-hover:scale-110 transition-transform duration-300`}
                      >
                        <img 
                          src={theme.icon} 
                          alt={`${theme.name} icon`} 
                          width={24} 
                          height={24} 
                          className="w-7 h-7 group-hover:animate-pulse"
                        />
                      </div>
                      <h3 className={`text-2xl font-bold ${theme.textColor} transition-all duration-300 
                        group-hover:text-${theme.id === 'terminal' ? 'emerald' : theme.id === 'linkedin' ? 'blue' : theme.id === 'messaging' ? 'purple' : 'green'}-300`}>
                        {theme.name}
                      </h3>
                    </div>
                    
                    {/* Theme description */}
                    <p className="text-gray-300 mb-6 flex-grow">{theme.description}</p>
                    
                    {/* Theme footer */}
                    <div className="mt-auto flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-sm ${theme.available ? 
                        `bg-${theme.id === 'terminal' ? 'emerald' : theme.id === 'linkedin' ? 'blue' : theme.id === 'messaging' ? 'purple' : 'green'}-900/60 
                        text-${theme.id === 'terminal' ? 'emerald' : theme.id === 'linkedin' ? 'blue' : theme.id === 'messaging' ? 'purple' : 'green'}-200` : 
                        'bg-gray-800 text-gray-400'}`}
                      >
                        {theme.available ? 'Available Now' : 'Coming Soon'}
                      </span>
                      
                      <div className={`flex items-center ${theme.textColor} transform transition-transform group-hover:translate-x-1`}>
                        <span>Explore</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Footer section */}
        <footer className={`mt-20 text-center text-sm text-gray-400 transition-all duration-1000 delay-700 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="mb-2">Your theme selection will be remembered for future visits.</p>
          <p className="mb-4">Built with Next.js, React 19, TypeScript, and Tailwind CSS</p>
          <p>© {new Date().getFullYear()} | <span className="text-cyan-400">Portfolio Experience</span></p>
        </footer>
      </div>
    </main>
  );
} 