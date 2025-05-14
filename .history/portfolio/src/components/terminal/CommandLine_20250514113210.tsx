'use client';

import React, { useState, useRef, useEffect } from 'react';

interface CommandLineProps {
  onCommand: (command: string) => void;
  prompt?: string;
  initialCommands?: string[];
}

export default function CommandLine({ 
  onCommand, 
  prompt = '>', 
  initialCommands = [] 
}: CommandLineProps) {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>(initialCommands);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (command.trim()) {
      // Add command to history
      setHistory([...history, command]);
      
      // Call the onCommand prop
      onCommand(command);
      
      // Reset command and history index
      setCommand('');
      setHistoryIndex(-1);
    }
  };
  
  // Handle keyboard navigation through history
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      
      // Navigate up through history
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      
      // Navigate down through history
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        // Clear command when at bottom of history
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };
  
  return (
    <div className="font-mono">
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-terminal-green mr-2">{prompt}</span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent border-none outline-none text-terminal-text caret-terminal-green focus:ring-0"
          autoComplete="off"
          spellCheck="false"
          aria-label="Terminal command input"
        />
      </form>
      
      {/* Command history (optional UI element) */}
      {history.length > 0 && (
        <div className="mt-4 max-h-64 overflow-y-auto">
          {history.map((cmd, index) => (
            <div key={index} className="flex text-sm opacity-70 mb-1">
              <span className="text-terminal-green mr-2">{prompt}</span>
              <span className="text-terminal-text">{cmd}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 