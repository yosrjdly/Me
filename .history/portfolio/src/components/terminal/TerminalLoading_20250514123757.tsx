'use client';

import React, { useState, useEffect } from 'react';

type LoadingAnimationType = 'dots' | 'progress' | 'processing';

interface TerminalLoadingProps {
  type?: LoadingAnimationType;
  message?: string;
}

export default function TerminalLoading({ 
  type = 'dots', 
  message = 'Processing' 
}: TerminalLoadingProps) {
  const [frame, setFrame] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % getMaxFrames(type));
    }, 200);
    
    return () => clearInterval(interval);
  }, [type]);
  
  const getMaxFrames = (type: LoadingAnimationType): number => {
    switch (type) {
      case 'dots':
        return 4;
      case 'progress':
        return 20;
      case 'processing':
        return 8;
      default:
        return 4;
    }
  };
  
  const renderAnimation = () => {
    switch (type) {
      case 'dots':
        const dots = '.'.repeat(frame);
        return `${message}${dots.padEnd(3)}`;
        
      case 'progress':
        const width = 20;
        const filled = Math.floor((frame / getMaxFrames(type)) * width);
        const bar = `[${'#'.repeat(filled)}${'-'.repeat(width - filled)}] ${Math.floor((frame / getMaxFrames(type)) * 100)}%`;
        return `${message} ${bar}`;
        
      case 'processing':
        const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧'][frame];
        return `${spinner} ${message}`;
        
      default:
        return `${message}...`;
    }
  };
  
  return (
    <div className="text-terminal-green pl-4">
      {renderAnimation()}
    </div>
  );
} 