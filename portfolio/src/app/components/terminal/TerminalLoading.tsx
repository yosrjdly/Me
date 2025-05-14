'use client';

import React, { useEffect, useState } from 'react';

export interface TerminalLoadingProps {
  text?: string;
  duration?: number;
  onComplete?: () => void;
  type?: 'hex' | 'spinner' | 'pacman';
  message?: string;
}

export default function TerminalLoading({ 
  text = 'Loading', 
  duration = 2000,
  onComplete,
  type = 'hex',
  message
}: TerminalLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(message || text);
  const [dots, setDots] = useState('');
  const [glitchEffect, setGlitchEffect] = useState(false);
  
  // Cyberpunk-style fake processes
  const processList = [
    'Initializing neural interface',
    'Compiling quantum algorithms',
    'Bypassing security protocols',
    'Decrypting encrypted data',
    'Scanning network for vulnerabilities',
    'Loading cybernetic enhancements',
    'Connecting to satellite uplink',
    'Initializing holographic display',
    'Calibrating biometric scanners',
    'Establishing secure connection'
  ];
  
  useEffect(() => {
    let mounted = true;
    let start = Date.now();
    let frame: number;
    
    // Update loading animation at 60fps
    const animate = () => {
      if (!mounted) return;
      
      const elapsed = Date.now() - start;
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      
      setProgress(newProgress);
      
      // Update dots for loading animation
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
      
      // Randomly change loading text for immersion
      if (elapsed % 500 < 50 && Math.random() > 0.7) {
        const randomProcessIndex = Math.floor(Math.random() * processList.length);
        setLoadingText(message || processList[randomProcessIndex]);
      }
      
      // Random glitch effect
      if (Math.random() > 0.95) {
        setGlitchEffect(true);
        setTimeout(() => {
          if (mounted) setGlitchEffect(false);
        }, 150);
      }
      
      if (newProgress < 100) {
        frame = requestAnimationFrame(animate);
      } else if (onComplete) {
        setTimeout(onComplete, 200);
      }
    };
    
    frame = requestAnimationFrame(animate);
    
    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
    };
  }, [duration, onComplete, message]);
  
  // Generate random "bytes"
  const generateHexCode = () => {
    return Array.from({ length: 8 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  };
  
  // For simulating process activity
  const generateActivityData = () => {
    const cpuUsage = Math.floor(Math.random() * 100);
    const memoryUsage = Math.floor(Math.random() * 100);
    return `CPU: ${cpuUsage}% | MEM: ${memoryUsage}%`;
  };
  
  const statusIndicator = progress < 70 
    ? <span className="text-terminal-yellow terminal-blink">⚠</span> 
    : <span className="text-terminal-green">✓</span>;
  
  return (
    <div className={`terminal-loading ${glitchEffect ? 'terminal-glitch' : ''}`}>
      <div className="terminal-loading-header">
        <span className="text-terminal-cyan">SYS</span>
        <span className="text-terminal-purple">::</span>
        <span className="text-terminal-green">PROCESS</span>
        <span className="text-terminal-purple">(</span>
        <span className="text-terminal-yellow">0x{generateHexCode()}</span>
        <span className="text-terminal-purple">)</span>
      </div>
      
      <div className="terminal-loading-content">
        <div className="flex items-center">
          <span className={`terminal-loading-text ${glitchEffect ? 'text-terminal-red' : 'text-terminal-green'}`}>{loadingText}{dots}</span>
          <span className="ml-2">{statusIndicator}</span>
        </div>
        
        <div className="terminal-loading-bar-container">
          <div 
            className="terminal-loading-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="terminal-loading-stats">
          <div className="text-xs text-terminal-yellow">
            {generateActivityData()}
          </div>
          <div className="text-xs text-terminal-cyan">
            {Math.floor(progress)}% complete
          </div>
        </div>
      </div>
      
      <div className="terminal-loading-logs">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="terminal-loading-log">
            <span className="text-terminal-purple">[</span>
            <span className="text-terminal-cyan">{new Date().toLocaleTimeString()}</span>
            <span className="text-terminal-purple">]</span>
            <span className="text-terminal-green ml-2">0x{generateHexCode()}</span>
            <span className="text-terminal-yellow ml-2">{processList[Math.floor(Math.random() * processList.length)]}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 