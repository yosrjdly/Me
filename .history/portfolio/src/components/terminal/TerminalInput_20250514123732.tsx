'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TerminalInputProps {
  onSubmit: (command: string) => void;
  onHistoryNavigation: (direction: 'up' | 'down', currentInput: string) => string;
}

export default function TerminalInput({ onSubmit, onHistoryNavigation }: TerminalInputProps) {
  const [input, setInput] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input on mount and when user clicks on terminal
  useEffect(() => {
    inputRef.current?.focus();
    
    // Handle click on terminal to focus input
    const handleClick = () => {
      inputRef.current?.focus();
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  
  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newInput = onHistoryNavigation('up', input);
      setInput(newInput);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newInput = onHistoryNavigation('down', input);
      setInput(newInput);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion for demonstration
      const commands = [
        'help', 'clear', 'projects', 'project', 'skills', 
        'contact', 'about', 'ls', 'cat', 'whoami', 'sudo', 'exit'
      ];
      
      if (input) {
        const matchingCommands = commands.filter(cmd => cmd.startsWith(input));
        if (matchingCommands.length === 1) {
          setInput(matchingCommands[0]);
        } else if (matchingCommands.length > 1) {
          // Show available completions
          console.log('Available completions:', matchingCommands.join(', '));
        }
      }
    }
  };
  
  return (
    <div className="flex items-center text-terminal-text">
      <div className="text-terminal-green mr-2 select-none">user@portfolio:~$</div>
      <form onSubmit={handleSubmit} className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent outline-none text-terminal-text caret-transparent"
          autoComplete="off"
          spellCheck="false"
          aria-label="Terminal input"
        />
        {/* Custom cursor */}
        <span 
          className={`absolute h-5 w-2 bg-terminal-green top-0 ${cursorVisible ? 'opacity-70' : 'opacity-0'}`} 
          style={{ left: `${input.length * 0.6}ch` }}
        ></span>
      </form>
    </div>
  );
} 