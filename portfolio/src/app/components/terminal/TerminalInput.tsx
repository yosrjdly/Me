'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TerminalInputProps {
  onSubmit: (command: string) => void;
  onHistoryNavigation: (direction: 'up' | 'down', currentInput: string) => string;
  prompt?: string;
}

// Common terminal commands
const COMMON_COMMANDS = [
  'help', 'clear', 'ls', 'cd', 'cat', 'mkdir', 'touch', 'rm',
  'sudo', 'grep', 'find', 'echo', 'pwd', 'whoami', 'man',
  'projects', 'project', 'skills', 'contact', 'about', 'exit',
  'ping', 'vim', 'nano', 'ssh', 'git', 'view'
];

export default function TerminalInput({ 
  onSubmit, 
  onHistoryNavigation,
  prompt 
}: TerminalInputProps) {
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Update cursor position when input changes
  useEffect(() => {
    setCursorPosition(input.length);
  }, [input]);
  
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
  
  // Find auto-suggestion based on input
  useEffect(() => {
    if (input) {
      const matchingCommand = COMMON_COMMANDS.find(cmd => cmd.startsWith(input.split(' ')[0]));
      if (matchingCommand && matchingCommand !== input.split(' ')[0]) {
        setSuggestion(matchingCommand.substring(input.split(' ')[0].length));
      } else {
        setSuggestion('');
      }
    } else {
      setSuggestion('');
    }
  }, [input]);
  
  // Blinking cursor effect with Linux terminal style (steps animation)
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim()) {
      onSubmit(input);
      setInput('');
      setSuggestion('');
    }
  };
  
  // Handle keyboard navigation and tab completion
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
      
      // Auto-complete based on suggestion
      if (suggestion) {
        // Only complete the first word
        const inputParts = input.split(' ');
        const firstWord = inputParts[0] + suggestion;
        
        if (inputParts.length > 1) {
          setInput(firstWord + ' ' + inputParts.slice(1).join(' '));
        } else {
          setInput(firstWord);
        }
      } else {
        // Find matching commands
        const currentWord = input.split(' ').pop() || '';
        const matchingCommands = COMMON_COMMANDS.filter(cmd => 
          cmd.startsWith(currentWord)
        );
        
        if (matchingCommands.length === 1) {
          // Replace just the last word
          const inputWords = input.split(' ');
          inputWords[inputWords.length - 1] = matchingCommands[0];
          setInput(inputWords.join(' '));
        } else if (matchingCommands.length > 1) {
          // Show available completions by logging to terminal in future enhancement
          console.log('Available completions:', matchingCommands.join(', '));
        }
      }
    }
  };
  
  // Simulate typing delay (makes it look like an old terminal)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInput(newValue);
  };
  
  return (
    <div className="flex items-center text-terminal-green relative w-full">
      <form onSubmit={handleSubmit} className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="terminal-input text-terminal-green w-full"
          autoComplete="off"
          spellCheck="false"
          aria-label="Terminal input"
        />
        
        {/* Auto-suggestion */}
        {suggestion && (
          <span className="terminal-suggestion">
            {suggestion}
          </span>
        )}
        
        {/* Custom cursor that mimics Linux terminal */}
        <span 
          className="terminal-cursor"
          style={{ 
            left: `${cursorPosition * 0.61}ch`,
            opacity: cursorVisible ? 1 : 0
          }} 
        ></span>
      </form>
    </div>
  );
} 