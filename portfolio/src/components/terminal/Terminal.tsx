'use client';

import React, { useState, useRef, useEffect } from 'react';
import { executeCommand, CommandResult } from './CommandRegistry';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import TerminalLoading from './TerminalLoading';
import personalData from '../../data/personal.json';

type HistoryItem = {
  command: string;
  result: CommandResult;
  id: number;
};

type BootPhase = 'logo' | 'initial' | 'diagnostics' | 'login' | 'ready';

export default function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [bootSequenceComplete, setBootSequenceComplete] = useState(false);
  const [bootPhase, setBootPhase] = useState<BootPhase>('logo');
  const terminalRef = useRef<HTMLDivElement>(null);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  
  // Mock hardware specs - more cyberpunk-themed
  const hardwareSpecs = {
    cpu: 'NeuroCortex i9-14900K @ 6.2GHz',
    memory: '128GB Quantum RAM',
    storage: '4TB NVMe Holographic SSD',
    gpu: 'RTX 5090 Ti NightCity Edition',
    network: 'Neural-Link Optical 100Tbps'
  };

  // Current year for ASCII art
  const currentYear = new Date().getFullYear();
  
  // ASCII Art Logo with YOSR JADLY
  const asciiLogo = `
<pre class="text-terminal-green text-sm">
__   __  _______  _______  ______      ___  _______  ______   ___      __   __   
|  | |  ||       ||       ||    _ |    |   ||   _   ||      | |   |    |  | |  |  
|  |_|  ||   _   ||  _____||   | ||    |   ||  |_|  ||  _    ||   |    |  |_|  |  
|       ||  | |  || |_____ |   |_||_   |   ||       || | |   ||   |    |       |  
|_     _||  |_|  ||_____  ||    __  |  |   ||       || |_|   ||   |___ |_     _|  
  |   |  |       | _____| ||   |  | |  |   ||   _   ||       ||       |  |   |    
  |___|  |_______||_______||___|  |_|  |___||__| |__||______| |_______|  |___|    

<span class="text-terminal-cyan">VERSION ${currentYear}.1.0</span> - <span class="text-terminal-yellow">NEURAL-LINK ESTABLISHED</span>
<span class="text-terminal-purple blink">SYSTEM BOOTUP INITIALIZED...</span>
</pre>
`;

  // Cyberpunk header ASCII art for terminal
  const cyberpunkHeader = `
<pre class="text-xs sm:text-sm text-terminal-purple glow-blue mt-2 mb-4">
    ____     ___    ______  ____    __  _______  __  ___    _____ ______  ___    ___ ___ _  __    _    __ 
   / __ \\   / / |  / / __ )/ __ \\  / / / / ___/ /  |/  /   / ___//_  __/ / _ \\  / _ < __/ |/ /___| |/|/ / 
  / /_/ /  / /| | / / __  / /_/ / / /_/ / /    / /|_/ /   / /__   / /   / , _/ / , _/ _/|   /___/|    /  
 / ____/  / / | |/ / /_/ / ____/ / __  / /___ / /  / /   / ___/  / /   / /_| |/ /_  /_//   |   /    /   
/_/      /_/  |___/_____/_/     /_/ /_/\\____//_/  /_/   /_/     /_/    \\____/ \\___/___/_/|_|  /_/|_/    
                                                                                                      
<span class="text-terminal-cyan text-xs">-- HACKER TERMINAL v${currentYear}.${Math.floor(Math.random() * 9) + 1}.${Math.floor(Math.random() * 99) + 1} --</span>
</pre>
`;

  // Matrix-like effect sequence for boot animation
  const matrixSequence = `
<div class="matrix-effect text-sm leading-tight">
01010111 01100101 01101100 01100011 01101111 01101101 01100101
10101010 10101010 10101010 10101010 10101010 10101010 10101010
01001110 01100101 01110101 01110010 01100001 01101100 00100000
10110100 01100101 01100011 01101000 00100000 01001111 01010011
01000011 01111001 01100010 01100101 01110010 01000100 01100101
10001001 01001011 00100000 01000001 01110111 01100001 01101011
00101011 01100101 01101110 01101001 01101110 01100111 00101110
01010011 01111001 01110011 01110100 01100101 01101101 00100000
10001111 01101110 01101100 01101001 01101110 01100101 00100000
</div>
`;

  // ASCII animation frames for special commands
  const hackingAnimation = [
    `<pre class="text-terminal-green text-xs">
  _   _    _    ____ _  ___ _   _  ____   ____  _   _ ____ _____ _____ __  __ 
 | | | |  / \\  / ___| |/ / | \\ | |/ ___| / ___|| | | / ___|_   _| ____|  \\/  |
 | |_| | / _ \\| |   | ' /  |  \\| | |  _  \\___ \\| |_| \\___ \\ | | |  _| | |\\/| |
 |  _  |/ ___ \\ |___| . \\  | |\\  | |_| |  ___) |  _  |___) || | | |___| |  | |
 |_| |_/_/   \\_\\____|_|\\_\\ |_| \\_|\\____| |____/|_| |_|____/ |_| |_____|_|  |_|
                                                                           
    </pre>`,
    `<pre class="text-terminal-green text-xs">
  _   _    _    ____ _  ___ _   _  ____   ____  _   _ ____ _____ _____ __  __  .
 | | | |  / \\  / ___| |/ / | \\ | |/ ___| / ___|| | | / ___|_   _| ____|  \\/  | .
 | |_| | / _ \\| |   | ' /  |  \\| | |  _  \\___ \\| |_| \\___ \\ | | |  _| | |\\/| | .
 |  _  |/ ___ \\ |___| . \\  | |\\  | |_| |  ___) |  _  |___) || | | |___| |  | | .
 |_| |_/_/   \\_\\____|_|\\_\\ |_| \\_|\\____| |____/|_| |_|____/ |_| |_____|_|  |_| .
                                                                           
    </pre>`,
    `<pre class="text-terminal-green text-xs">
  _   _    _    ____ _  ___ _   _  ____   ____  _   _ ____ _____ _____ __  __  ..
 | | | |  / \\  / ___| |/ / | \\ | |/ ___| / ___|| | | / ___|_   _| ____|  \\/  | ..
 | |_| | / _ \\| |   | ' /  |  \\| | |  _  \\___ \\| |_| \\___ \\ | | |  _| | |\\/| | ..
 |  _  |/ ___ \\ |___| . \\  | |\\  | |_| |  ___) |  _  |___) || | | |___| |  | | ..
 |_| |_/_/   \\_\\____|_|\\_\\ |_| \\_|\\____| |____/|_| |_|____/ |_| |_____|_|  |_| ..
                                                                           
    </pre>`,
    `<pre class="text-terminal-green text-xs">
  _   _    _    ____ _  ___ _   _  ____   ____  _   _ ____ _____ _____ __  __  ...
 | | | |  / \\  / ___| |/ / | \\ | |/ ___| / ___|| | | / ___|_   _| ____|  \\/  | ...
 | |_| | / _ \\| |   | ' /  |  \\| | |  _  \\___ \\| |_| \\___ \\ | | |  _| | |\\/| | ...
 |  _  |/ ___ \\ |___| . \\  | |\\  | |_| |  ___) |  _  |___) || | | |___| |  | | ...
 |_| |_/_/   \\_\\____|_|\\_\\ |_| \\_|\\____| |____/|_| |_|____/ |_| |_____|_|  |_| ...
                                                                           
    </pre>`
  ];
  
  // ASCII art for "access granted" animation
  const accessGrantedArt = `<pre class="text-terminal-green text-xs">
   _    ____ ____ _____ ____ ____    ____ ____    _    _   _ _____ _____ ____  
  / \\  / ___/ ___|_   _/ ___/ ___|  / ___|  _ \\  / \\  | \\ | |_   _| ____|  _ \\ 
 / _ \\| |  | |     | | \\___ \\___ \\  | |  _| |_) |/ _ \\ |  \\| | | | |  _| | | | |
/ ___ \\ |__| |___  | |  ___) |__) | | |_| |  _ </ ___ \\| |\\  | | | | |___| |_| |
\\_/  \\_\\____\\____| |_| |____/____/   \\____|_| \\_\\_/  \\_\\_| \\_| |_| |_____|____/ 
                                                                            
  </pre>`;
  
  // Get date for boot sequence
  const getBootDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit'
    });
  };
  
  // Logo and initial animation phase
  useEffect(() => {
    if (bootPhase === 'logo') {
      let idCounter = 0;
      let skipBootSequence = false;
      
      // First show the ASCII logo with glitch effect
      setHistory([{ 
        command: '', 
        result: { 
          output: asciiLogo + '<div class="text-center text-xs text-terminal-cyan mt-2 blink">PRESS ANY KEY TO SKIP</div>',
          isHTML: true 
        }, 
        id: idCounter++ 
      }]);
      
      // Event listener for skipping boot sequence
      const handleKeyDown = () => {
        skipBootSequence = true;
        setBootPhase('login');
        document.removeEventListener('keydown', handleKeyDown);
      };
      
      document.addEventListener('keydown', handleKeyDown);
      
      // After a delay, show matrix-like sequence
      const matrixTimeout = setTimeout(() => {
        if (skipBootSequence) return;
        
        setHistory(prev => [
          ...prev,
          { 
            command: '', 
            result: { 
              output: matrixSequence,
              isHTML: true 
            }, 
            id: idCounter++ 
          }
        ]);
        
        // After matrix effect, transition to initial boot phase
        const bootTimeout = setTimeout(() => {
          if (skipBootSequence) return;
          setBootPhase('initial');
        }, 2000);
        
        return () => clearTimeout(bootTimeout);
      }, 2000);
      
      return () => {
        clearTimeout(matrixTimeout);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [bootPhase]);
  
  // Initial boot sequence
  useEffect(() => {
    if (bootPhase === 'initial') {
      const initialBootMessages = [
        { message: '<span class="text-cyan-300 text-lg font-bold">CYBERDECK OS v4.3.7 - NIGHTCITY EDITION</span>', delay: 500 },
        { message: `<span class="text-emerald-300">Boot Date:</span> <span class="text-yellow-300">${getBootDate()}</span>`, delay: 400 },
        { message: '<span class="text-emerald-300">Initializing kernel modules...</span>', delay: 500 },
        { message: '<span class="text-emerald-300">Loading biometric interfaces...</span>', delay: 300 },
        { message: '<span class="text-yellow-300">Starting quantum-encryption protocols...</span>', delay: 400 },
        { message: '<span class="glitch-text">INITIATING SYSTEM DIAGNOSTICS SEQUENCE</span>', delay: 600 },
      ];

      let mounted = true;
      const bootSequence = async () => {
        let currentHistory = [...history];
        let idCounter = history.length;
        
        for (const boot of initialBootMessages) {
          if (!mounted) return;
          await new Promise(resolve => setTimeout(resolve, boot.delay));
          currentHistory = [
            ...currentHistory, 
            { 
              command: '', 
              result: { output: boot.message, isHTML: true }, 
              id: idCounter++ 
            }
          ];
          setHistory(currentHistory);
        }
        
        if (mounted) {
          setBootPhase('diagnostics');
        }
      };

      bootSequence();
      
      return () => {
        mounted = false;
      };
    }
  }, [bootPhase, history]);
  
  // Diagnostics boot phase with visualization
  useEffect(() => {
    if (bootPhase === 'diagnostics') {
      const diagnosticsMessages = [
        { 
          message: `<div class="bg-terminal-highlight p-2 rounded mb-2 text-sm">
            <div class="text-emerald-300 font-bold mb-1">SYSTEM DIAGNOSTICS REPORT</div>
            <div class="text-emerald-300">Checking hardware configuration...</div>
          </div>`, 
          delay: 500 
        },
        { 
          message: `<div class="flex items-center">
            <span class="text-cyan-300 w-24">CPU:</span> 
            <div class="flex-1 bg-gray-900 h-2 rounded-full overflow-hidden">
              <div class="bg-emerald-400 h-full rounded-full" style="width: 92%; animation: loadBar 1.2s ease-in-out;"></div>
            </div>
            <span class="text-emerald-400 ml-2">[${hardwareSpecs.cpu}]</span>
          </div>`, 
          delay: 600 
        },
        { 
          message: `<div class="flex items-center">
            <span class="text-cyan-300 w-24">Memory:</span> 
            <div class="flex-1 bg-gray-900 h-2 rounded-full overflow-hidden">
              <div class="bg-emerald-400 h-full rounded-full" style="width: 87%; animation: loadBar 1.5s ease-in-out;"></div>
            </div>
            <span class="text-emerald-400 ml-2">[${hardwareSpecs.memory}]</span>
          </div>`, 
          delay: 600 
        },
        { 
          message: `<div class="flex items-center">
            <span class="text-cyan-300 w-24">Storage:</span> 
            <div class="flex-1 bg-gray-900 h-2 rounded-full overflow-hidden">
              <div class="bg-emerald-400 h-full rounded-full" style="width: 95%; animation: loadBar 1.3s ease-in-out;"></div>
            </div>
            <span class="text-emerald-400 ml-2">[${hardwareSpecs.storage}]</span>
          </div>`, 
          delay: 600 
        },
        { 
          message: `<div class="flex items-center">
            <span class="text-cyan-300 w-24">GPU:</span> 
            <div class="flex-1 bg-gray-900 h-2 rounded-full overflow-hidden">
              <div class="bg-emerald-400 h-full rounded-full" style="width: 98%; animation: loadBar 1.1s ease-in-out;"></div>
            </div>
            <span class="text-emerald-400 ml-2">[${hardwareSpecs.gpu}]</span>
          </div>`, 
          delay: 600 
        },
        { 
          message: `<div class="flex items-center">
            <span class="text-cyan-300 w-24">Network:</span> 
            <div class="flex-1 bg-gray-900 h-2 rounded-full overflow-hidden">
              <div class="bg-emerald-400 h-full rounded-full" style="width: 90%; animation: loadBar 1.4s ease-in-out;"></div>
            </div>
            <span class="text-emerald-400 ml-2">[${hardwareSpecs.network}]</span>
          </div>`, 
          delay: 600 
        },
        { 
          message: `<div class="mt-2 p-1 border border-emerald-400 rounded text-center text-emerald-400">
            ALL HARDWARE SYSTEMS OPERATIONAL
          </div>`, 
          delay: 400 
        },
        { message: '<span class="text-yellow-300">Loading portfolio data modules...</span>', delay: 500 },
        { 
          message: `<div class="flex items-center">
            <span class="text-yellow-300 mr-2">Mounting virtual filesystem</span>
            <div class="loader-dots">
              <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            </div>
            <span class="text-emerald-400 ml-2">[COMPLETE]</span>
          </div>`, 
          delay: 400 
        },
        { 
          message: `<div class="flex items-center">
            <span class="text-yellow-300 mr-2">Connecting to projects database</span>
            <div class="loader-dots">
              <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            </div>
            <span class="text-emerald-400 ml-2">[SYNCED]</span>
          </div>`, 
          delay: 600 
        },
        { 
          message: `<div class="flex items-center">
            <span class="text-yellow-300 mr-2">Calibrating neural interface</span>
            <div class="loader-dots">
              <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            </div>
            <span class="text-emerald-400 ml-2">[OPTIMIZED]</span>
          </div>`, 
          delay: 400 
        },
        { 
          message: `<div class="glitch-container">
            <span class="glitch-text text-lg">CYBERNETIC OS BOOT COMPLETE</span>
          </div>`,
          delay: 500 
        },
        { 
          message: '<span class="glitch-text text-lg">INITIATING AUTHENTICATION PROTOCOL</span>', 
          delay: 600 
        },
      ];

      let mounted = true;
      const diagnosticsSequence = async () => {
        let currentHistory = [...history];
        let idCounter = history.length;
        
        for (const diagnostic of diagnosticsMessages) {
          if (!mounted) return;
          await new Promise(resolve => setTimeout(resolve, diagnostic.delay));
          currentHistory = [
            ...currentHistory, 
            { 
              command: '', 
              result: { output: diagnostic.message, isHTML: true }, 
              id: idCounter++ 
            }
          ];
          setHistory(currentHistory);
        }
        
        if (mounted) {
          setBootPhase('login');
        }
      };

      diagnosticsSequence();
      
      return () => {
        mounted = false;
      };
    }
  }, [bootPhase, history, hardwareSpecs]);
  
  // Login phase with enhanced visualization
  useEffect(() => {
    if (bootPhase === 'login') {
      const loginMessages = [
        { 
          message: `<div class="border-b border-terminal-cyan py-2 my-4">
            <div class="text-cyan-300 text-xl login-prompt text-center">IDENTITY VERIFICATION REQUIRED</div>
            <div class="text-xs text-center text-yellow-300">SECURE CONNECTION ESTABLISHED · ENCRYPTION ACTIVE</div>
          </div>`, 
          delay: 800 
        },
        { 
          message: `<div class="login-screen p-2 border border-dashed border-terminal-cyan rounded">
            <div class="mb-4 text-center"><span class="text-terminal-yellow">⚠</span> AUTHORIZED ACCESS ONLY <span class="text-terminal-yellow">⚠</span></div>
            <div class="flex items-center mb-3">
              <span class="text-emerald-300 w-24">Username:</span>
              <span class="typing-effect bg-terminal-highlight px-2 py-1 rounded">guest</span>
            </div>
          </div>`, 
          delay: 1000 
        },
      ];

      // Fun failure messages for incorrect passwords
      const failureMessages = [
        "Nice try! But my security is tighter than my coding deadline.",
        "ERROR: Password authenticity not found. Just like my bugs.",
        "ACCESS DENIED: That's what my code reviewer says too.",
        "INCORRECT: Not even close. Like my estimations in sprint planning.",
        "NOPE! My security is like my coffee - strong and uncompromising.",
        "That password is as wrong as using 'var' in 2025.",
        "PASSWORD REJECTED: Even Stack Overflow can't help you now.",
        "Try again! My password isn't 'password123'. I'm not that developer."
      ];

      let mounted = true;
      const loginSequence = async () => {
        let currentHistory = [...history];
        let idCounter = history.length;
        
        for (const login of loginMessages) {
          if (!mounted) return;
          await new Promise(resolve => setTimeout(resolve, login.delay));
          currentHistory = [
            ...currentHistory, 
            { 
              command: '', 
              result: { output: login.message, isHTML: true }, 
              id: idCounter++ 
            }
          ];
          setHistory(currentHistory);
        }
        
        if (mounted) {
          setLoginUsername('guest');
          
          // Simulate failed login attempt first
          if (loginAttempts === 0) {
            setTimeout(() => {
              const passwordMsg = `<div class="login-screen p-2 border border-dashed border-terminal-cyan rounded">
                <div class="mb-4 text-center"><span class="text-terminal-yellow">⚠</span> AUTHORIZED ACCESS ONLY <span class="text-terminal-yellow">⚠</span></div>
                <div class="flex items-center mb-3">
                  <span class="text-emerald-300 w-24">Username:</span>
                  <span class="bg-terminal-highlight px-2 py-1 rounded">guest</span>
                </div>
                <div class="flex items-center">
                  <span class="text-emerald-300 w-24">Password:</span>
                  <span class="password-animation bg-terminal-highlight px-2 py-1 rounded">********</span>
                </div>
              </div>`;
              
              setHistory(prev => [
                ...prev,
                {
                  command: '',
                  result: { output: passwordMsg, isHTML: true },
                  id: idCounter++
                }
              ]);
              
              setLoginPassword('********');
              
              // Show failure message
              setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * failureMessages.length);
                const failureMsg = `<div class="p-2 text-center">
                  <span class="text-red-500 glitch-text">${failureMessages[randomIndex]}</span>
                  <div class="text-xs text-terminal-cyan mt-2">Hint: Just press Enter to continue</div>
                </div>`;
                
                setHistory(prev => [
                  ...prev,
                  {
                    command: '',
                    result: { output: failureMsg, isHTML: true },
                    id: idCounter++
                  }
                ]);
                
                // Auto-proceed to successful login
                setTimeout(() => {
                  setLoginAttempts(1);
                  
                  // Try again with password animation
                  const retryPasswordMsg = `<div class="login-screen p-2 border border-dashed border-terminal-cyan rounded">
                    <div class="mb-4 text-center"><span class="text-terminal-yellow">⚠</span> AUTHORIZED ACCESS ONLY <span class="text-terminal-yellow">⚠</span></div>
                    <div class="flex items-center mb-3">
                      <span class="text-emerald-300 w-24">Username:</span>
                      <span class="bg-terminal-highlight px-2 py-1 rounded">guest</span>
                    </div>
                    <div class="flex items-center">
                      <span class="text-emerald-300 w-24">Password:</span>
                      <span class="password-animation bg-terminal-highlight px-2 py-1 rounded">********</span>
                    </div>
                  </div>`;
                  
                  setHistory(prev => [
                    ...prev,
                    {
                      command: '',
                      result: { output: retryPasswordMsg, isHTML: true },
                      id: idCounter++
                    }
                  ]);
                
                  proceedWithLogin(idCounter);
                }, 2000);
              }, 1500);
            }, 1000);
          } else {
            // Skip failed attempt for subsequent boots
            setTimeout(() => {
              const passwordMsg = `<div class="login-screen p-2 border border-dashed border-terminal-cyan rounded">
                <div class="mb-4 text-center"><span class="text-terminal-yellow">⚠</span> AUTHORIZED ACCESS ONLY <span class="text-terminal-yellow">⚠</span></div>
                <div class="flex items-center mb-3">
                  <span class="text-emerald-300 w-24">Username:</span>
                  <span class="bg-terminal-highlight px-2 py-1 rounded">guest</span>
                </div>
                <div class="flex items-center">
                  <span class="text-emerald-300 w-24">Password:</span>
                  <span class="password-animation bg-terminal-highlight px-2 py-1 rounded">********</span>
                </div>
              </div>`;
              
              setHistory(prev => [
                ...prev,
                {
                  command: '',
                  result: { output: passwordMsg, isHTML: true },
                  id: idCounter++
                }
              ]);
              
              setLoginPassword('********');
              proceedWithLogin(idCounter);
            }, 1000);
          }
        }
      };
      
      // Function to proceed with successful login
      const proceedWithLogin = (counter: number) => {
        // Biometric scan animation
        setTimeout(() => {
          const scanningMsg = `<div class="biometric-scan p-3 text-center">
            <div class="scan-animation"></div>
            <p class="mt-2 text-terminal-cyan">Scanning biometric data...</p>
          </div>`;
          
          // Add to history
          setHistory(prev => [
            ...prev,
            {
              id: Date.now(),
              command: '',
              result: { output: scanningMsg, isHTML: true },
              isNew: true
            }
          ]);
        
          // Complete the login after a delay
          setTimeout(() => {
            const successMsg = `<div class="access-granted p-3 text-center">
              <div class="text-terminal-green text-xl">ACCESS GRANTED</div>
              <div class="mt-2">Welcome, user. Terminal access initialized.</div>
            </div>`;
            
            setHistory(prev => [
              ...prev,
              {
                id: Date.now(),
                command: '',
                result: { output: successMsg, isHTML: true },
                isNew: true
              }
            ]);
            
            // Complete boot sequence
            setBootSequenceComplete(true);
          }, 2000);
        }, 1000);
      };

      loginSequence();
      
      return () => {
        mounted = false;
      };
    }
  }, [bootPhase, history, personalData.basics, loginAttempts]);
  
  // Auto-scroll to bottom of terminal when history changes
  useEffect(() => {
    if (terminalRef.current) {
      const scrollContainer = terminalRef.current.querySelector('.scrollbar-terminal');
      if (scrollContainer) {
        // Use a small timeout to ensure content is rendered before scrolling
        setTimeout(() => {
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: 'smooth'
          });
        }, 50);
      }
    }
  }, [history, loading]);
  
  // Track scroll position to show/hide scroll-to-bottom button
  useEffect(() => {
    if (terminalRef.current) {
      const scrollContainer = terminalRef.current.querySelector('.scrollbar-terminal');
      if (scrollContainer) {
        const handleScroll = () => {
          const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
          const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
          setIsScrolledUp(!isAtBottom);
        };
        
        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
      }
    }
  }, []);
  
  // Scroll to the bottom of the terminal
  const scrollToBottom = () => {
    if (terminalRef.current) {
      const scrollContainer = terminalRef.current.querySelector('.scrollbar-terminal');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  };
  
  // Function to show ASCII animation in terminal
  const showAsciiAnimation = async (frames: string[], delay: number = 300) => {
    const animationId = history.length;
    setLoading(true);
    
    // Add initial frame
    setHistory(prev => [...prev, { 
      command: '', 
      result: { output: frames[0], isHTML: true }, 
      id: animationId
    }]);
    
    // Animate through frames
    for (let i = 1; i < frames.length; i++) {
      await new Promise(resolve => setTimeout(resolve, delay));
      setHistory(prev => 
        prev.map(item => 
          item.id === animationId 
            ? { ...item, result: { output: frames[i], isHTML: true } } 
            : item
        )
      );
    }
    
    // Final animation frame - access granted after 500ms delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setHistory(prev => [...prev, { 
      command: '', 
      result: { output: accessGrantedArt, isHTML: true }, 
      id: animationId + 1
    }]);
    
    setLoading(false);
  };
  
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
    
    // Special case for 'hack'
    if (command.trim().startsWith('hack')) {
      // Show hacking animation before regular command
      await showAsciiAnimation(hackingAnimation);
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
    <div className="terminal-container bg-terminal-bg border-terminal-green terminal-crt terminal-scanlines p-4 rounded-lg text-sm md:text-base relative" ref={terminalRef}>
      <div className="h-full overflow-y-auto pb-20 scrollbar-terminal" style={{ scrollBehavior: 'smooth', maxHeight: '80vh' }}>
        {/* Cyberpunk ASCII Art Header */}
        {bootSequenceComplete && (
          <div 
            className="text-center border-b border-terminal-green border-opacity-30 pb-3 mb-4"
            dangerouslySetInnerHTML={{ __html: cyberpunkHeader }}
          />
        )}
        
        {/* Boot sequence screen - shown before terminal is ready */}
        {!bootSequenceComplete && (
          <div className="terminal-boot-sequence">
            {bootPhase === 'login' && (
              <div className="login-screen p-4 text-terminal-green">
                <div className="login-prompt mb-4">
                  {loginAttempts === 0 ? (
                    <>
                      <p className="text-terminal-cyan mb-2">Enter your credentials to continue:</p>
                      <div className="mb-3">
                        <span className="text-terminal-yellow mr-2">Username:</span>
                        <input 
                          type="text" 
                          value={loginUsername} 
                          onChange={(e) => setLoginUsername(e.target.value)} 
                          className="bg-transparent border-b border-terminal-green outline-none text-terminal-green w-40"
                          autoFocus
                        />
                      </div>
                      <div>
                        <span className="text-terminal-yellow mr-2">Password:</span>
                        <input 
                          type="password" 
                          value={loginPassword} 
                          onChange={(e) => setLoginPassword(e.target.value)} 
                          className="bg-transparent border-b border-terminal-green outline-none text-terminal-green w-40"
                        />
                        <button 
                          onClick={() => proceedWithLogin(0)} 
                          className="ml-4 px-3 py-1 border border-terminal-green text-terminal-green hover:bg-terminal-green hover:bg-opacity-20"
                        >
                          Login
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-terminal-red mb-2 terminal-error">Access Denied. Invalid credentials.</p>
                      <p className="text-terminal-cyan mb-4">Authentication system bypassed. Access granted.</p>
                      <div className="biometric-scan mb-6">
                        <div className="access-granted text-terminal-green">ACCESS GRANTED</div>
                      </div>
                      <button 
                        onClick={() => setBootSequenceComplete(true)} 
                        className="px-4 py-2 border border-terminal-green text-terminal-green hover:bg-terminal-green hover:bg-opacity-20"
                      >
                        Continue to Terminal
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Main terminal content - shown after boot sequence */}
        {bootSequenceComplete && (
          <>
            {/* Output history */}
            <div className="mb-4">
              {history.map((item) => (
                <div key={item.id} className="mb-4">
                  {/* Command input */}
                  {item.command && (
                    <div className="flex mb-1">
                      <div className="text-terminal-cyan font-bold mr-2">
                        <span className="text-terminal-purple">yosr</span>
                        <span className="text-terminal-cyan">@</span>
                        <span className="text-terminal-green">portfolio</span>
                        <span className="text-terminal-cyan"> $</span>
                      </div>
                      <div className="text-terminal-text">{item.command}</div>
                    </div>
                  )}
                  
                  {/* Command output */}
                  <TerminalOutput output={item.result.output} isHTML={item.result.isHTML} />
                </div>
              ))}
            </div>
            
            {/* Loading indicator */}
            {loading && <TerminalLoading />}
          </>
        )}
        
        {/* Scroll to bottom button */}
        {isScrolledUp && (
          <button 
            onClick={scrollToBottom}
            className="fixed bottom-24 right-8 z-10 bg-terminal-bg border border-terminal-cyan rounded-full p-2 text-terminal-cyan hover:bg-terminal-cyan hover:bg-opacity-20 transition-all shadow-glow"
            title="Scroll to bottom"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Command input - fixed at bottom */}
      {bootSequenceComplete && !loading && (
        <div className="absolute bottom-0 left-0 right-0 bg-terminal-bg bg-opacity-90 backdrop-blur-sm py-2 px-4 border-t border-terminal-green border-opacity-30 z-20 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.3)] flex items-center">
          <TerminalInput 
            onSubmit={handleCommand} 
            onHistoryNavigation={handleHistoryNavigation}
            prompt="yosrjdly@portfolio $"
          />
        </div>
      )}
    </div>
  );
} 