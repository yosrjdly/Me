'use client';

import React, { useState, useRef, useEffect } from 'react';
import { executeCommand, CommandResult } from './CommandRegistry';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import TerminalLoading from './TerminalLoading';
import { getBasicInfo } from '../../../lib/personal';

type HistoryItem = {
  command: string;
  result: CommandResult;
  id: number;
  isNew?: boolean;
};

export default function Terminal() {
  const personalInfo = getBasicInfo();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [bootSequenceComplete, setBootSequenceComplete] = useState(false);
  const [username, setUsername] = useState(personalInfo.name.toLowerCase().replace(/\s+/g, ''));
  const [currentDir, setCurrentDir] = useState('~');
  const [cpuUsage, setCpuUsage] = useState(12); // Mock system metrics
  const [memUsage, setMemUsage] = useState(34);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [diskUsage, setDiskUsage] = useState(42);
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [showHexEffect, setShowHexEffect] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Update system metrics and time periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 5);
      setMemUsage(Math.floor(Math.random() * 40) + 20);
      setDiskUsage(Math.floor(Math.random() * 20) + 30);
      setBatteryLevel(prev => Math.max(prev - Math.floor(Math.random() * 3), 10));
      setCurrentTime(new Date().toLocaleTimeString());
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Boot sequence with enhanced cyberpunk styling
  useEffect(() => {
    const bootMessages = [
      { message: '<span class="text-terminal-cyan">BIOS POST Check...</span>', delay: 300, isHTML: true },
      { message: 'CPU: AMD Ryzen 3900X @ 3.8GHz... <span class="text-terminal-green">OK</span>', delay: 500, isHTML: true },
      { message: 'Memory: 64GB DDR4-3200... <span class="text-terminal-green">OK</span>', delay: 400, isHTML: true },
      { message: 'Storage: 2TB NVMe SSD... <span class="text-terminal-green">OK</span>', delay: 300, isHTML: true },
      { message: '<span class="text-terminal-cyan">Loading kernel...</span>', delay: 600, isHTML: true },
      { message: '<span class="terminal-glitch" data-text="Initializing matrix routines...">Initializing matrix routines...</span>', delay: 500, isHTML: true },
      { message: 'Mounting filesystems... <span class="text-terminal-green">DONE</span>', delay: 400, isHTML: true },
      { message: 'Starting network services... <span class="text-terminal-green">CONNECTED</span>', delay: 300, isHTML: true },
      { message: '<span class="text-terminal-purple">Securing connection with quantum encryption...</span>', delay: 400, isHTML: true },
      { message: '<span class="text-terminal-yellow">Initializing AI personality matrix... <span class="terminal-blink">▓</span></span>', delay: 700, isHTML: true },
      { message: '<span class="text-terminal-cyan">Loading cybernetic enhancements...</span>', delay: 400, isHTML: true },
      { message: '<span class="text-terminal-red">WARNING: System overclocked by 42%</span>', delay: 600, isHTML: true },
      { message: 'Bypassing security protocols... <span class="text-terminal-green">SUCCESS</span>', delay: 500, isHTML: true },
      { message: 'Loading portfolio modules... <span class="text-terminal-green">LOADED</span>', delay: 500, isHTML: true },
      { message: 'System modules check... <span class="text-terminal-green">100%</span>', delay: 400, isHTML: true },
      { message: `<div class="terminal-ascii">\n  __  __  ___  ___ ____       ___   _   ____  _  __   __  \n \\ \\/ / / _ \\/ __| _ \\ |    |_ _| /_\\ |  _ \\| |/ /  \\ \\ \n  \\  / | (_) \\__ \\   / |__   | | / _ \\| | | | ' <    | |\n  /_/   \\___/|___/_|_\\____|_|___/_/ \\_\\_| |_|_|\\_\\  /_/ \n                                                       \n</div>`, delay: 700, isHTML: true },
      { message: '\n<span class="text-terminal-cyan">Portfolio Linux v2.0.1 (tty1)</span>', delay: 400, isHTML: true },
      { message: `\n<span class="text-terminal-green terminal-blink">portfolio login:</span> ${username}`, delay: 600, isHTML: true },
      { message: '<span class="text-terminal-cyan">Password:</span> <span class="text-terminal-purple password-animation">********</span>', delay: 800, isHTML: true },
      { message: '<span class="text-terminal-red">Access denied: Invalid credentials</span>', delay: 500, isHTML: true },
      { message: '<span class="text-terminal-cyan">Password:</span> <span class="text-terminal-purple password-animation">************</span>', delay: 800, isHTML: true },
      { message: '<span class="text-terminal-red">Access denied: Too many special characters</span>', delay: 500, isHTML: true },
      { message: '<span class="text-terminal-cyan">Password:</span> <span class="text-terminal-purple password-animation">**********</span>', delay: 800, isHTML: true },
      { message: '<span class="text-terminal-green">Access granted: Bypassing security...</span>', delay: 500, isHTML: true },
      { message: '<span class="text-terminal-yellow terminal-blink">Initializing biometric scan...</span>', delay: 600, isHTML: true },
      { message: '<span class="scan-animation">Scanning visitor identity...</span>', delay: 1000, isHTML: true },
      { message: '<span class="access-granted">VISITOR IDENTIFIED - ACCESS GRANTED</span>', delay: 800, isHTML: true },
      { message: '\n<span class="text-terminal-yellow">Last login: ' + new Date().toLocaleString() + ' from 192.168.1.42</span>', delay: 300, isHTML: true },
      { message: `<div class="terminal-typing">Welcome to Yosr Jadly's Portfolio Terminal! Press any key to skip...</div>`, delay: 500, isHTML: true },
      { message: 'Type "<span class="text-terminal-green">help</span>" for available commands.', delay: 300, isHTML: true },
    ];

    let mounted = true;
    const bootSequence = async () => {
      let newHistory: HistoryItem[] = [];
      let idCounter = 0;
      
      // Show hex dump effect during boot
      setShowHexEffect(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowHexEffect(false);
      
      for (const boot of bootMessages) {
        if (!mounted) return;
        await new Promise(resolve => setTimeout(resolve, boot.delay));
        newHistory = [
          ...newHistory, 
          { 
            command: '', 
            result: { output: boot.message, isHTML: boot.isHTML || false }, 
            id: idCounter++,
            isNew: true
          }
        ];
        setHistory(newHistory);
      }
      
      if (mounted) {
        setBootSequenceComplete(true);
      }
    };

    bootSequence();
    
    return () => {
      mounted = false;
    };
  }, [username]);
  
  // Auto-scroll to bottom of terminal when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, loading]);
  
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
      isNew: true
    };
    
    setHistory(prev => [...prev, commandHistoryItem]);
    
    // Special case for 'clear'
    if (command.trim() === 'clear') {
      setHistory([]);
      return;
    }
    
    // Special case for 'cd'
    if (command.trim().startsWith('cd ')) {
      const dir = command.trim().split(' ')[1];
      setCurrentDir(dir === '~' || dir === '/' ? dir : `~/${dir}`);
    }
    
    // Show loading indicator
    setLoading(true);
    
    try {
      // Execute command
      const result = await executeCommand(command);
      
      // Show hex dump effect for certain commands
      if (result.isHexDump) {
        setShowHexEffect(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setShowHexEffect(false);
      }
      
      // If loading is specified in result, show loading animation
      if (result.isLoading) {
        // Wait for a bit to show loading animation
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      // Add result to history
      setHistory(prev => 
        prev.map(item => 
          item.id === commandHistoryItem.id 
            ? { ...item, result, isNew: true } 
            : { ...item, isNew: false }
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
                },
                isNew: true
              } 
            : { ...item, isNew: false }
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
  
  // Hex dump background effect (simulates data processing)
  const renderHexEffect = () => {
    if (!showHexEffect) return null;
    
    return (
      <div className="absolute inset-0 bg-black bg-opacity-80 z-20 flex items-center justify-center">
        <div className="terminal-hexdump w-full max-w-xl">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="terminal-hexdump-line">
              <span className="terminal-hexdump-addr">{(0x1000 + i * 0x10).toString(16).padStart(8, '0')}</span>
              <span className="terminal-hexdump-hex">
                {Array.from({ length: 16 }).map((_, j) => 
                  <span key={j}>
                    {Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}{' '}
                  </span>
                )}
              </span>
              <span className="terminal-hexdump-ascii">
                {Array.from({ length: 16 }).map((_, j) => 
                  String.fromCharCode(Math.floor(Math.random() * 26) + 97)
                ).join('')}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="terminal-container relative">
      <div className="terminal-crt terminal-scanlines flex flex-col h-full bg-terminal-bg text-terminal-green font-mono rounded-lg border border-terminal-green shadow-lg overflow-hidden max-w-terminal mx-auto">
        {/* Terminal header with enhanced system status */}
        <div className="terminal-header">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-terminal-cyan font-medium">{username}@portfolio:</span>
            <span className="text-terminal-green ml-1">{currentDir}</span>
          </div>
          <div className="terminal-status">
            <div className="terminal-status-item">
              <span className="text-xs">CPU:</span>
              <span className={`ml-1 text-xs ${cpuUsage > 70 ? 'text-terminal-red' : cpuUsage > 40 ? 'text-terminal-yellow' : 'text-terminal-green'}`}>
                {cpuUsage}%
              </span>
            </div>
            <div className="terminal-status-item">
              <span className="text-xs">MEM:</span>
              <span className={`ml-1 text-xs ${memUsage > 80 ? 'text-terminal-red' : memUsage > 60 ? 'text-terminal-yellow' : 'text-terminal-green'}`}>
                {memUsage}%
              </span>
            </div>
            <div className="terminal-status-item">
              <span className="text-xs">DISK:</span>
              <span className={`ml-1 text-xs ${diskUsage > 80 ? 'text-terminal-red' : diskUsage > 60 ? 'text-terminal-yellow' : 'text-terminal-green'}`}>
                {diskUsage}%
              </span>
            </div>
            <div className="terminal-status-item">
              <span className="text-xs">BAT:</span>
              <span className={`ml-1 text-xs ${batteryLevel < 20 ? 'text-terminal-red' : batteryLevel < 40 ? 'text-terminal-yellow' : 'text-terminal-green'}`}>
                {batteryLevel}%
              </span>
            </div>
            <div className="terminal-status-item">
              <span className="text-xs text-terminal-cyan">{currentTime}</span>
            </div>
          </div>
        </div>
        
        {/* Terminal content */}
        <div 
          ref={terminalRef} 
          className="flex-1 p-5 overflow-y-auto font-mono text-sm leading-6 bg-terminal-bg text-terminal-green relative"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Command history */}
          {history.map((item, index) => (
            <div key={item.id} className={`mb-4 ${item.isNew ? 'new-entry' : ''}`}>
              {item.command && (
                <div className="flex">
                  <span className="text-terminal-purple mr-2 glow-blue">{username}@portfolio {currentDir} $</span>
                  <span className="text-terminal-green">{item.command}</span>
                </div>
              )}
              <TerminalOutput result={item.result} />
            </div>
          ))}
          
          {/* Loading indicator */}
          {loading && (
            <TerminalLoading 
              type={Math.random() > 0.5 ? 'hex' : Math.random() > 0.5 ? 'spinner' : 'pacman'} 
              message={`Processing command...`} 
            />
          )}
          
          {/* Command input */}
          {bootSequenceComplete && !loading && (
            <div className="terminal-prompt flex bg-opacity-20 bg-black p-2 rounded-md">
              <span className="text-terminal-purple whitespace-nowrap mr-2 glow-blue">{username}@portfolio {currentDir} $</span>
              <div className="flex-1">
                <TerminalInput 
                  onSubmit={handleCommand} 
                  onHistoryNavigation={handleHistoryNavigation}
                  prompt={`${username}@portfolio ${currentDir} $`}
                />
              </div>
            </div>
          )}
          
          {/* Hex data processing overlay */}
          {renderHexEffect()}
        </div>
      </div>
    </div>
  );
} 