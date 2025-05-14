'use client';

import React, { useState, useRef, useEffect } from 'react';
import { executeCommand, CommandResult } from './CommandRegistry';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import TerminalLoading from './TerminalLoading';

type HistoryItem = {
  command: string;
  result: CommandResult;
  id: number;
};

export default function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [bootSequenceComplete, setBootSequenceComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Boot sequence
  useEffect(() => {
    const bootMessages = [
      { message: 'Initializing system...', delay: 300 },
      { message: 'Loading portfolio modules...', delay: 500 },
      { message: 'Mounting filesystem...', delay: 400 },
      { message: 'Establishing connection to projects database...', delay: 600 },
      { message: 'Calibrating user interface...', delay: 300 },
      { message: 'Setting up cyberpunk theme...', delay: 200 },
      { message: 'Starting terminal service...', delay: 400 },
      { message: 'System ready!', delay: 300 },
      { message: 'Type "help" for a list of available commands.', delay: 200 },
    ];

    const bootSequence = async () => {
      let newHistory: HistoryItem[] = [];
      let idCounter = 0;
      
      for (const boot of bootMessages) {
        await new Promise(resolve => setTimeout(resolve, boot.delay));
        newHistory = [
          ...newHistory, 
          { 
            command: '', 
            result: { output: boot.message, isHTML: false }, 
            id: idCounter++ 
          }
        ];
        setHistory(newHistory);
      }
      
      setBootSequenceComplete(true);
    };

    bootSequence();
  }, []);
  
  // Auto-scroll to bottom of terminal when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);
  
  // Handle command execution
  const handleCommand = async (command: string) => {
    if (!command.trim()) return;
    
    // Add command to history
    setCommandHistory(prev => [...prev, command]);
    setCurrentCommandIndex(-1);
    
    // Add command to display history
    const commandHistoryItem: HistoryItem = {
      command,
      result: { output: '' },
      id: history.length,
    };
    
    setHistory(prev => [...prev, commandHistoryItem]);
    
    // Special case for 'clear'
    if (command.trim() === 'clear') {
      setHistory([]);
      return;
    }
    
    // Show loading indicator
    setLoading(true);
    
    try {
      // Execute command
      const result = await executeCommand(command);
      
      // If loading is specified in result, show loading animation
      if (result.isLoading) {
        // Wait for a bit to show loading animation
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      // Add result to history
      setHistory(prev => 
        prev.map(item => 
          item.id === commandHistoryItem.id 
            ? { ...item, result } 
            : item
        )
      );
      
      // If there's a handler, execute it after a delay
      if (result.handler) {
        setTimeout(() => {
          result.handler?.();
        }, 500);
      }
    } catch (error) {
      // Handle errors
      setHistory(prev => 
        prev.map(item => 
          item.id === commandHistoryItem.id 
            ? { 
                ...item, 
                result: { 
                  output: `Error: ${error}`, 
                  isError: true 
                } 
              } 
            : item
        )
      );
    } finally {
      setLoading(false);
    }
  };
  
  // Handle keyboard navigation through command history
  const handleHistoryNavigation = (direction: 'up' | 'down', currentInput: string) => {
    if (commandHistory.length === 0) return currentInput;
    
    if (direction === 'up') {
      // First time pressing up, save current input
      if (currentCommandIndex === -1 && currentInput) {
        setCommandHistory(prev => [...prev.slice(0, -1), currentInput, prev[prev.length - 1]]);
      }
      
      const newIndex = Math.min(currentCommandIndex + 1, commandHistory.length - 1);
      setCurrentCommandIndex(newIndex);
      return commandHistory[commandHistory.length - 1 - newIndex];
    } else {
      const newIndex = Math.max(currentCommandIndex - 1, -1);
      setCurrentCommandIndex(newIndex);
      return newIndex === -1 ? '' : commandHistory[commandHistory.length - 1 - newIndex];
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-terminal-bg text-terminal-text font-mono rounded-lg border border-terminal-green shadow-lg overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center justify-between p-2 border-b border-terminal-green bg-[#0A0A0A]">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-center text-xs text-terminal-green">portfolio@terminal:~</div>
        <div className="text-xs opacity-60">v1.0.0</div>
      </div>
      
      {/* Terminal content */}
      <div 
        ref={terminalRef} 
        className="flex-1 p-4 overflow-y-auto font-mono text-sm leading-5"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Command history */}
        {history.map((item, index) => (
          <div key={item.id} className="mb-3">
            {item.command && (
              <div className="flex">
                <span className="text-terminal-green mr-2">user@portfolio:~$</span>
                <span>{item.command}</span>
              </div>
            )}
            <TerminalOutput result={item.result} />
          </div>
        ))}
        
        {/* Loading indicator */}
        {loading && <TerminalLoading />}
        
        {/* Command input */}
        {bootSequenceComplete && !loading && (
          <TerminalInput 
            onSubmit={handleCommand} 
            onHistoryNavigation={handleHistoryNavigation} 
          />
        )}
      </div>
    </div>
  );
} 