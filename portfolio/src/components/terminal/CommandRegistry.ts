import { getAllProjects } from '../../lib/projects';
import { getAllSkillCategories } from '../../lib/skills';
import personalData from '../../data/personal.json';

export type CommandResult = {
  output: string | React.ReactNode;
  isHTML?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  handler?: () => void;
};

export type CommandHandler = (args: string[]) => CommandResult | Promise<CommandResult>;

// Helper function to generate ASCII skill bars
const generateSkillBar = (level: number, maxLength = 20) => {
  const filledLength = Math.floor((level / 100) * maxLength);
  const emptyLength = maxLength - filledLength;
  return `[${'▓'.repeat(filledLength)}${'░'.repeat(emptyLength)}] ${level}%`;
};

// Helper function to add typing effect to HTML output
const addTypingClass = (text: string) => {
  return `<span class="typing-effect">${text}</span>`;
};

// Helper function to generate a glitch effect
const addGlitchEffect = (text: string) => {
  return `<span class="glitch-text">${text}</span>`;
};

// The registry of all available commands
const commands: Record<string, CommandHandler> = {
  help: () => ({
    output: `
${addTypingClass('Available commands:')}
  help              - Display this help message
  clear             - Clear the terminal
  projects          - List all projects
  project [name]    - View details of a specific project
  skills [--graph]  - List all skills (--graph for visualization, --sound for effects)
  contact           - Display contact information
  about [--full]    - About me (--full for detailed info)
  experience        - Browse professional experience as RPG quests
  education         - View education history
  languages         - Show language proficiency
  testimonials      - View testimonials from colleagues
  boss [--fight]    - Engage the legendary bug in combat
  
  ls                - List "files" in the current directory
  cd [directory]    - Navigate to a directory
  cat [file]        - View the contents of a file
  whoami            - Who am I?
  sudo              - Don't even try
  exit              - "Exit" the terminal (not really)
  matrix            - Activate Matrix effect
  hack [target]     - Simulate "hacking" a target system
  boot              - Replay terminal boot sequence
  
<span class="text-terminal-yellow">Fun easter eggs:</span>
  sudo make coffee  - Attempt to brew coffee
  rm -rf /          - Don't worry, it's safe!
  --darkmode        - Toggle CRT visual effects
  
Use arrow keys to navigate command history.
Press Tab for auto-completion.
`,
    isHTML: true
  }),

  clear: () => ({
    output: '',
  }),

  projects: () => {
    const projects = getAllProjects();
    return {
      output: `
${addTypingClass(`PROJECTS DATABASE // ACCESS GRANTED`)}\n
${addGlitchEffect(`Found ${projects.length} projects in secure storage:`)}
${projects.map((project, index) => `\n${index + 1}. <span class="text-cyan-400">${project.title}</span> - ${project.summary}`).join('')}

Use 'project [name]' for detailed intel.
`,
      isHTML: true
    };
  },

  project: (args) => {
    if (args.length === 0) {
      return {
        output: 'Usage: project [name]',
        isError: true,
      };
    }

    const projectName = args.join(' ').toLowerCase();
    const projects = getAllProjects();
    const project = projects.find(
      (p) => p.title.toLowerCase().includes(projectName) || p.slug.toLowerCase().includes(projectName)
    );

    if (!project) {
      return {
        output: `Project "${args.join(' ')}" not found. Try 'projects' to list all projects.`,
        isError: true,
      };
    }

    return {
      output: `
${addGlitchEffect(`PROJECT FILE: ${project.title.toUpperCase()}`)}
${'-'.repeat(project.title.length + 13)}
<span class="text-emerald-300">[TAGS]</span> ${project.tags.join(', ')}

<span class="text-emerald-300">[DESCRIPTION]</span>
${project.description}

<span class="text-emerald-300">[DEVELOPMENT PHASES]</span>
${project.process.map((phase, i) => `<span class="text-yellow-300">[${i+1}]</span> ${phase.phase} (${phase.duration}): ${phase.description}`).join('\n')}

<span class="text-emerald-300">[NETWORK ENDPOINTS]</span>
<span class="text-cyan-400">Demo:</span> ${project.demoUrl}
<span class="text-cyan-400">GitHub:</span> ${project.githubUrl}
`,
      isHTML: true
    };
  },

  skills: (args) => {
    const hasGraph = args.includes('--graph');
    const hasSound = args.includes('--sound');
    
    // Extract skills from personal data
    const mainSkills = personalData.skills.main;
    const familiarSkills = personalData.skills.familiar;
    
    // Function to generate random skill levels that are consistent
    const getSkillLevel = (skill: string, isPrimary: boolean) => {
      // Use a hash function to generate consistent levels based on skill name
      let hash = 0;
      for (let i = 0; i < skill.length; i++) {
        hash = ((hash << 5) - hash) + skill.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }
      
      // Generate level between 75-95 for main skills, 50-75 for familiar
      const minLevel = isPrimary ? 75 : 50;
      const maxLevel = isPrimary ? 95 : 75;
      const range = maxLevel - minLevel;
      
      // Use hash to get a consistent but seemingly random value
      return minLevel + Math.abs(hash % range);
    };
    
    const renderSkills = (skills: string[], isPrimary: boolean) => {
      if (hasGraph) {
        return skills.map(skill => {
          const level = getSkillLevel(skill, isPrimary);
          const levelClass = level >= 90 ? 'text-green-400' : level >= 75 ? 'text-cyan-300' : 'text-yellow-300';
          
          return `
  <div class="mb-2 skill-item">
    <div class="flex justify-between mb-1">
      <span class="text-cyan-300">${skill}</span>
      <span class="${levelClass}">${level}%</span>
    </div>
    <div class="bg-gray-900 h-2 rounded-full overflow-hidden relative">
      <div class="progress-bar-fill h-full rounded-full" style="width: ${level}%"></div>
      <div class="skill-tooltip">
        <div class="p-1 bg-terminal-highlight rounded text-xs">
          <div class="font-bold mb-1">${skill}</div>
          <div>Proficiency: ${level}%</div>
          <div>Level: ${level >= 90 ? 'Master' : level >= 80 ? 'Expert' : level >= 70 ? 'Advanced' : 'Intermediate'}</div>
          ${isPrimary ? '<div class="text-xs text-emerald-300">Primary Skill</div>' : ''}
        </div>
      </div>
    </div>
  </div>`;
        }).join('');
      } else {
        return skills.map(skill => `  - ${skill}`).join('\n');
      }
    };

    const soundScript = hasSound ? `
<script>
  // This is just for representation - actual sound implementation would use the Web Audio API
  // and would be properly implemented in a React component
  document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const audio = new Audio('/sounds/hover.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.error('Audio play failed:', e));
    });
  });
</script>
` : '';

    const output = `
${addGlitchEffect(`SKILL MATRIX // ${personalData.basics.name.toUpperCase()}`)}

${hasGraph ? '<div class="mb-4 text-sm text-terminal-yellow">Hover over skills for details. ' + (hasSound ? 'Sound effects enabled.' : 'Use --sound flag for audio feedback.') + '</div>' : ''}

<div class="mb-4">
  <div class="text-emerald-400 font-bold mb-2">PRIMARY SKILLS:</div>
  ${renderSkills(mainSkills, true)}
</div>

<div>
  <div class="text-emerald-400 font-bold mb-2">SECONDARY SKILLS:</div>
  ${renderSkills(familiarSkills, false)}
</div>

${hasGraph ? '' : "<div class='text-terminal-cyan mt-4'>Use 'skills --graph' for detailed skill visualization</div>"}
${hasSound ? soundScript : ''}
`;

    return {
      output,
      isHTML: true,
    };
  },

  contact: () => {
    const currentDate = new Date().toUTCString();
    const randomMessageId = `${Math.random().toString(36).substring(2, 15)}@portfolio.terminal`;
    
    return {
      output: `
${addGlitchEffect("ESTABLISHING SECURE CONNECTION...")}

<div class="smtp-simulation p-2 font-mono text-xs border border-terminal-cyan rounded bg-terminal-highlight bg-opacity-10">
  <div class="text-emerald-300 mb-3 text-center">INITIATING SMTP CONNECTION TO CONTACT SERVER</div>
  
  <div class="smtp-line">250 ${personalData.basics.email} Hello ${personalData.basics.name.split(' ')[0].toLowerCase()}.portfolio.terminal</div>
  <div class="smtp-line">MAIL FROM: &lt;visitor@portfolio.terminal&gt;</div>
  <div class="smtp-line">250 2.1.0 Sender OK</div>
  <div class="smtp-line">RCPT TO: &lt;${personalData.basics.email}&gt;</div>
  <div class="smtp-line">250 2.1.5 Recipient OK</div>
  <div class="smtp-line">DATA</div>
  <div class="smtp-line">354 Start mail input; end with &lt;CRLF&gt;.&lt;CRLF&gt;</div>
  <div class="smtp-line">From: Visitor &lt;visitor@portfolio.terminal&gt;</div>
  <div class="smtp-line">To: ${personalData.basics.name} &lt;${personalData.basics.email}&gt;</div>
  <div class="smtp-line">Subject: Inquiry from Portfolio Terminal</div>
  <div class="smtp-line">Date: ${currentDate}</div>
  <div class="smtp-line">Message-ID: &lt;${randomMessageId}&gt;</div>
  <div class="smtp-line">X-Mailer: Portfolio Terminal v1.0</div>
  <div class="smtp-line"></div>
  <div class="smtp-line">Hello ${personalData.basics.name},</div>
  <div class="smtp-line"></div>
  <div class="smtp-line">I found your portfolio terminal and wanted to reach out.</div>
  <div class="smtp-line">Let's connect!</div>
  <div class="smtp-line"></div>
  <div class="smtp-line">Best regards,</div>
  <div class="smtp-line">A Potential Connection</div>
  <div class="smtp-line">.</div>
  <div class="smtp-line">250 2.0.0 Message accepted for delivery</div>
  <div class="smtp-line">QUIT</div>
  <div class="smtp-line">221 2.0.0 Closing connection</div>
</div>

<div class="cyber-banner p-2 mt-3 bg-emerald-900 bg-opacity-30 border-l-4 border-terminal-green rounded">
  <div class="text-sm text-yellow-300">CONTACT INFORMATION</div>
  <div class="grid grid-cols-2 gap-2 mt-2">
    <div>
      <div class="text-emerald-300 text-xs">Email:</div>
      <div class="text-terminal-cyan">${personalData.basics.email}</div>
    </div>
    <div>
      <div class="text-emerald-300 text-xs">Phone:</div>
      <div class="text-terminal-cyan">${personalData.basics.phone || 'N/A'}</div>
    </div>
    <div>
      <div class="text-emerald-300 text-xs">Location:</div>
      <div class="text-terminal-cyan">${personalData.basics.location.city}, ${personalData.basics.location.country}</div>
    </div>
    <div>
      <div class="text-emerald-300 text-xs">Website:</div>
      <div class="text-terminal-cyan">${personalData.basics.website || 'N/A'}</div>
    </div>
  </div>
  
  <div class="mt-3">
    <div class="text-emerald-300 text-xs mb-1">Social Networks:</div>
    <div class="flex flex-wrap gap-2">
      ${personalData.social.map(s => `<a href="${s.url}" target="_blank" class="text-terminal-cyan underline text-sm">${s.network}</a>`).join(' · ')}
    </div>
  </div>
</div>

<style>
  .smtp-line {
    opacity: 0;
    animation: smtp-reveal 0.1s forwards;
    animation-delay: calc(var(--index, 0) * 0.1s);
  }
  
  @keyframes smtp-reveal {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .smtp-simulation .smtp-line:nth-child(1) { --index: 1; }
  .smtp-simulation .smtp-line:nth-child(2) { --index: 2; }
  .smtp-simulation .smtp-line:nth-child(3) { --index: 3; }
  .smtp-simulation .smtp-line:nth-child(4) { --index: 4; }
  .smtp-simulation .smtp-line:nth-child(5) { --index: 5; }
  .smtp-simulation .smtp-line:nth-child(6) { --index: 6; }
  .smtp-simulation .smtp-line:nth-child(7) { --index: 7; }
  .smtp-simulation .smtp-line:nth-child(8) { --index: 8; }
  .smtp-simulation .smtp-line:nth-child(9) { --index: 9; }
  .smtp-simulation .smtp-line:nth-child(10) { --index: 10; }
  .smtp-simulation .smtp-line:nth-child(11) { --index: 11; }
  .smtp-simulation .smtp-line:nth-child(12) { --index: 12; }
  .smtp-simulation .smtp-line:nth-child(13) { --index: 13; }
  .smtp-simulation .smtp-line:nth-child(14) { --index: 14; }
  .smtp-simulation .smtp-line:nth-child(15) { --index: 15; }
  .smtp-simulation .smtp-line:nth-child(16) { --index: 16; }
  .smtp-simulation .smtp-line:nth-child(17) { --index: 17; }
  .smtp-simulation .smtp-line:nth-child(18) { --index: 18; }
  .smtp-simulation .smtp-line:nth-child(19) { --index: 19; }
  .smtp-simulation .smtp-line:nth-child(20) { --index: 20; }
  .smtp-simulation .smtp-line:nth-child(21) { --index: 21; }
  .smtp-simulation .smtp-line:nth-child(22) { --index: 22; }
  .smtp-simulation .smtp-line:nth-child(23) { --index: 23; }
</style>
`,
      isHTML: true,
      isLoading: true,
      handler: () => {
        // This would open an email client in a real implementation
        setTimeout(() => {
          window.location.href = `mailto:${personalData.basics.email}`;
        }, 3000); // Wait for animation to complete
      },
    };
  },

  about: (args) => {
    const showFull = args.includes('--full') || args.includes('-f');

    const output = `
${addGlitchEffect(`IDENTITY SCAN // ${personalData.basics.name.toUpperCase()}`)}

<span class="text-emerald-300">Name:</span> ${personalData.basics.name}
<span class="text-emerald-300">Title:</span> ${personalData.basics.title}
<span class="text-emerald-300">Location:</span> ${personalData.basics.location.city}, ${personalData.basics.location.country}
<span class="text-emerald-300">Status:</span> ${personalData.basics.available ? '<span class="text-green-400">AVAILABLE FOR HIRE</span>' : '<span class="text-red-400">CURRENTLY ENGAGED</span>'}

<span class="text-emerald-300">Bio:</span>
${showFull ? personalData.bio.long : personalData.bio.short}

${!showFull ? "Use 'about --full' for complete profile data." : ''}
${showFull ? `
<span class="text-emerald-300">Interests:</span>
${personalData.interests.map(interest => `  - ${interest}`).join('\n')}

<span class="text-emerald-300">Preferred Tech:</span>
${personalData.skills.main.slice(0, 5).join(', ')}
` : ''}
`;

    return {
      output,
      isHTML: true,
    };
  },

  ls: (args) => {
    // Simulate a cyberpunk directory structure
    const files = [
      { name: 'about.txt', type: 'file', size: '2.4K' },
      { name: 'projects', type: 'directory', size: '4.0K' },
      { name: 'skills.json', type: 'file', size: '8.2K' },
      { name: 'contact.sh', type: 'executable', size: '1.2K' },
      { name: 'experience', type: 'directory', size: '3.7K' },
      { name: 'education', type: 'directory', size: '2.1K' },
      { name: 'languages.dat', type: 'file', size: '1.6K' },
      { name: 'interests.log', type: 'file', size: '0.9K' },
      { name: '.matrix', type: 'hidden', size: '13.4K' },
      { name: '.secret', type: 'hidden', size: '0.1K' },
    ];

    const formatDate = () => {
      const date = new Date();
      const month = date.toLocaleString('default', { month: 'short' });
      const day = date.getDate();
      const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      return `${month} ${day} ${time}`;
    };

    const hasFlag = (flag: string) => args.includes(flag);
    const showHidden = hasFlag('-a') || hasFlag('--all');
    const showDetails = hasFlag('-l');

    const visibleFiles = showHidden 
      ? files 
      : files.filter(file => !file.name.startsWith('.'));

    if (showDetails) {
      const formattedDate = formatDate();
      const output = visibleFiles.map(file => {
        const permissions = file.type === 'directory' 
          ? 'drwxr-xr-x' 
          : file.type === 'executable' 
            ? '-rwxr-xr-x' 
            : '-rw-r--r--';
        
        const color = file.type === 'directory' 
          ? 'text-cyan-300' 
          : file.type === 'executable' 
            ? 'text-emerald-300' 
            : file.type === 'hidden'
              ? 'text-gray-500'
              : '';
        
        return `${permissions} user user ${file.size.padStart(4)} ${formattedDate} <span class="${color}">${file.name}</span>`;
      }).join('\n');
      
      return {
        output,
        isHTML: true,
      };
    }

    const output = visibleFiles.map(file => {
      const className = file.type === 'directory' 
        ? 'text-cyan-300' 
        : file.type === 'executable' 
          ? 'text-emerald-300' 
          : file.type === 'hidden'
            ? 'text-gray-500'
            : '';
      
      return `<span class="${className}">${file.name}</span>`;
    }).join('  ');

    return {
      output: `${addTypingClass('DIRECTORY LISTING')}:\n\n${output}`,
      isHTML: true,
    };
  },

  cd: (args) => {
    if (args.length === 0) {
      return {
        output: 'home/user',
      };
    }

    const dir = args[0];
    const validDirs = ['projects', 'experience', 'education'];
    
    if (validDirs.includes(dir)) {
      return {
        output: `Changed directory to /${dir}`,
      };
    } else if (dir === '..') {
      return {
        output: 'Returned to home directory',
      };
    } else {
      return {
        output: `cd: ${dir}: No such directory`,
        isError: true,
      };
    }
  },

  cat: (args) => {
    if (args.length === 0) {
      return {
        output: 'Usage: cat [file]',
        isError: true,
      };
    }

    const fileName = args[0];
    
    // Simulated file contents using personal data
    const fileContents: Record<string, string> = {
      'about.txt': `${personalData.bio.long}`,
      
      'skills.json': `{
  "languages": [${personalData.skills.main.filter(s => ['JavaScript', 'TypeScript', 'HTML', 'CSS'].includes(s)).map(s => `"${s}"`).join(', ')}],
  "frameworks": [${personalData.skills.main.filter(s => ['React', 'Next.js', 'Node.js', 'Express.js'].includes(s)).map(s => `"${s}"`).join(', ')}],
  "styling": ["Tailwind CSS"],
  "other": [${personalData.skills.familiar.map(s => `"${s}"`).join(', ')}]
}`,
      
      'contact.sh': `#!/bin/bash
echo "Initializing contact protocol..."
sleep 1
echo "Establishing secure connection..."
sleep 1
echo "Connection established!"
echo "Email: ${personalData.basics.email}"
${personalData.social.map(s => `echo "${s.network}: ${s.url}"`).join('\n')}
open mailto:${personalData.basics.email}`,

      'languages.dat': personalData.languages.map(l => 
        `${l.language.padEnd(10)}: ${l.fluency.padEnd(10)} ${l.fluency === 'Native' ? '■■■■■' : l.fluency === 'Fluent' ? '■■■■□' : '■■□□□'}`
      ).join('\n'),
      
      'interests.log': personalData.interests.map(i => `- ${i}`).join('\n'),
      
      '.matrix': `0010111011100011010101000010101010111001101010011101
1011001101010101001011101010011101010100110101010101
0101010001101010101000010101010111010101100110101010
0110101010101011001101010101010110101010100110010110
0101010101010010101010101110011010101010110101010101
1010110101110101010101010100110101010101011001101010

Matrix protocol ready. Use 'matrix' command to activate.`,
      
      '.secret': `Congratulations ${personalData.basics.name}! You found the hidden file.
Special debug commands:
/crash - Trigger a fake terminal crash
/matrix - Start Matrix effect
/glitch - Add glitch effects to terminal
/hack - Initiate fake hacking sequence`
    };

    if (fileName in fileContents) {
      return {
        output: fileContents[fileName],
      };
    } else {
      return {
        output: `cat: ${fileName}: No such file or directory`,
        isError: true,
      };
    }
  },

  whoami: () => ({
    output: `
<span class="text-cyan-300 text-xl">${personalData.basics.name}</span>
<span class="text-emerald-400">${personalData.basics.title}</span>

User authenticated with level 5 access privileges.
Location: ${personalData.basics.location.city}, ${personalData.basics.location.country}
System: Web Browser / ${navigator.userAgent.includes('Windows') ? 'Windows' : navigator.userAgent.includes('Mac') ? 'MacOS' : 'Linux'} / ${navigator.language}

<span class="text-yellow-300">Current Status: ${personalData.basics.available ? 'Available for new opportunities' : 'Engaged in active missions'}</span>
`,
    isHTML: true,
  }),

  sudo: () => ({
    output: `
<span class="blink text-red-500">ACCESS DENIED: Nice try, but you don't have sudo privileges in this terminal.</span>
`,
    isHTML: true,
  }),

  exit: () => ({
    output: `
${addGlitchEffect('Attempting to exit terminal...')}

<span class="text-red-500">ERROR: Cannot exit system. This terminal is permanent.</span>
<span class="text-yellow-300">Try switching to a different theme instead.</span>
`,
    isHTML: true,
  }),
  
  experience: () => {
    const exp = personalData.experience;
    
    const getQuestLevel = (startDate: string, endDate: string | null) => {
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : new Date();
      const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
      // Map months to levels: 0-6 months = Level 1, 7-12 = Level 2, etc.
      return Math.max(1, Math.ceil(months / 6));
    };
    
    const getXpReward = (level: number) => {
      return level * 1500; // Base XP reward increases with level
    };
    
    const getDifficultyBadge = (level: number) => {
      if (level <= 2) return '<span class="text-green-400">⦿ NOVICE</span>';
      if (level <= 4) return '<span class="text-blue-400">⦿⦿ ADEPT</span>';
      if (level <= 6) return '<span class="text-purple-400">⦿⦿⦿ EXPERT</span>';
      return '<span class="text-red-400">⦿⦿⦿⦿ MASTER</span>';
    };
    
    // Calculate total XP
    const totalXP = exp.reduce((sum, job) => {
      const level = getQuestLevel(job.startDate, job.endDate);
      return sum + getXpReward(level);
    }, 0);
    
    const output = `
${addGlitchEffect('QUEST LOG // EXPERIENCE TRACKER')}

<div class="text-yellow-300 mb-4">TOTAL XP: ${totalXP} · CHARACTER LEVEL: ${Math.floor(totalXP / 5000) + 1}</div>

${exp.map((job, i) => {
  const level = getQuestLevel(job.startDate, job.endDate);
  const xpReward = getXpReward(level);
  
  return `
<div class="border border-terminal-cyan bg-terminal-highlight bg-opacity-10 rounded p-2 mb-4">
  <div class="flex justify-between items-center mb-2">
    <span class="text-cyan-300 text-lg">[QUEST ${i+1}] ${job.position}</span>
    <span class="text-xs">${getDifficultyBadge(level)}</span>
  </div>
  
  <div class="cyber-grid mb-1 text-sm">
    <div class="text-emerald-300">Location:</div>
    <div class="text-terminal-text">${job.company} · ${job.location}</div>
  </div>
  
  <div class="cyber-grid mb-1 text-sm">
    <div class="text-emerald-300">Timeline:</div>
    <div class="text-terminal-text">${job.startDate.substring(0, 10)} → ${job.endDate ? job.endDate.substring(0, 10) : 'PRESENT'}</div>
  </div>
  
  <div class="cyber-grid mb-1 text-sm">
    <div class="text-emerald-300">Status:</div>
    <div>${job.current ? '<span class="text-green-400">ACTIVE</span>' : '<span class="text-gray-400">COMPLETED</span>'}</div>
  </div>
  
  <div class="mt-2 mb-3 text-xs text-yellow-200">QUEST LEVEL: ${level} · XP REWARD: +${xpReward}</div>
  
  <div class="text-sm mb-2">${job.description}</div>
  
  <div class="mt-2 text-sm">
    <div class="text-emerald-300 mb-1">Skills Acquired:</div>
    <div class="flex flex-wrap gap-1">
      ${job.technologies.map(tech => `<span class="bg-terminal-highlight px-1 py-0.5 rounded text-xs">${tech}</span>`).join(' ')}
    </div>
  </div>
</div>
`;
}).join('')}
`;

    return {
      output,
      isHTML: true
    };
  },
  
  education: () => {
    const edu = personalData.education;
    
    const output = `
${addGlitchEffect('EDUCATION RECORDS // ACCESS GRANTED')}

${edu.map((school, i) => `
<span class="text-yellow-300">[EDU.${i+1}]</span> <span class="text-cyan-300">${school.institution}</span>
<span class="text-emerald-300">Degree:</span> ${school.degree}
<span class="text-emerald-300">Timeline:</span> ${school.startDate.substring(0, 10)} → ${school.endDate ? school.endDate.substring(0, 10) : 'PRESENT'}
<span class="text-emerald-300">Location:</span> ${school.location}

<span class="text-emerald-300">Description:</span>
${school.description}
`).join('\n')}
`;

    return {
      output,
      isHTML: true
    };
  },

  languages: () => {
    const langs = personalData.languages;
    
    const generateBar = (fluency: string) => {
      switch(fluency) {
        case 'Native': return '■■■■■';
        case 'Fluent': return '■■■■□';
        case 'Beginner': return '■■□□□';
        default: return '■■■□□';
      }
    };
    
    const output = `
${addGlitchEffect('LANGUAGE PROFICIENCY SCAN')}

${langs.map(l => `<span class="text-cyan-300">${l.language.padEnd(10)}</span>: ${l.fluency.padEnd(10)} ${generateBar(l.fluency)}`).join('\n')}
`;

    return {
      output,
      isHTML: true
    };
  },
  
  interests: () => {
    const output = `
${addGlitchEffect('INTEREST VECTORS // PERSONALITY PROFILE')}

${personalData.interests.map((interest, i) => 
  `<span class="text-yellow-300">[${i+1}]</span> <span class="text-cyan-300">${interest}</span>`
).join('\n')}
`;

    return {
      output,
      isHTML: true
    };
  },
  
  matrix: () => {
    return {
      output: `
<span class="text-green-400 matrix-effect">
Initiating Matrix protocol...
System override in progress...
0010111011100011010101000010101010111001101010011101
1011001101010101001011101010011101010100110101010101
0101010001101010101000010101010111010101100110101010
0110101010101011001101010101010110101010100110010110
0101010101010010101010101110011010101010110101010101
1010110101110101010101010100110101010101011001101010

Wake up, ${personalData.basics.name.split(' ')[0]}...
The Matrix has you...
Follow the white rabbit...

Knock, knock.
</span>
`,
      isHTML: true
    };
  },
  
  hack: (args) => {
    let target = 'mainframe';
    if (args.length > 0) {
      target = args[0];
    }
    
    return {
      output: `
${addGlitchEffect(`INITIATING HACK SEQUENCE: ${target.toUpperCase()}`)}

<span class="text-yellow-300">Establishing connection...</span>
<span class="text-yellow-300">Bypassing firewall...</span>
<span class="text-yellow-300">Cracking encryption...</span>
<span class="text-yellow-300">Intercepting data packets...</span>
<span class="text-green-400">Access granted! You're in.</span>

<span class="text-red-500 blink">WARNING: THIS IS A SIMULATION</span>
<span class="text-gray-400">No actual hacking occurred. This is just a fun terminal feature.</span>
`,
      isHTML: true
    };
  },
  
  boot: () => {
    return {
      output: `Initiating boot sequence...`,
      handler: () => {
        // This will be handled by the Terminal component to restart the boot sequence
        window.location.reload();
      }
    };
  },

  testimonials: () => {
    // Mock testimonials
    const testimonials = [
      {
        name: "Jane Doe",
        title: "Senior Engineering Manager",
        company: "TechCorp Global",
        text: "Working with this developer was incredible. Their attention to detail and problem-solving skills were exceptional. They delivered beyond expectations."
      },
      {
        name: "John Smith",
        title: "Product Lead",
        company: "Startup Innovations",
        text: "Absolutely brilliant work! They understood our requirements perfectly and implemented the solution flawlessly. Would definitely work with them again."
      },
      {
        name: "Sarah Johnson",
        title: "CTO",
        company: "Digital Solutions",
        text: "An exceptional talent who brought creativity and technical excellence to our project. Their code quality and documentation were exemplary."
      }
    ];
    
    // Function to corrupt text for glitch effect
    const corruptText = (text: string) => {
      // Randomly corrupt some characters
      const corrupted = text.split('').map(char => {
        if (Math.random() < 0.05) {
          // Replace with a random special character
          const glitchChars = '!@#$%^&*<>/\\|[]{}';
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        return char;
      }).join('');
      
      return corrupted;
    };
    
    const testimonialOutput = testimonials.map((t, i) => `
<div class="corrupted-log mb-4 p-3 border border-terminal-yellow bg-terminal-highlight bg-opacity-10 rounded relative overflow-hidden">
  <div class="glitch-text-container">
    <div class="text-yellow-300 mb-1">TESTIMONIAL_${i+1}.log</div>
    <div class="text-terminal-text corrupted-text">"${corruptText(t.text)}"</div>
    <div class="text-terminal-text mt-2 authentic-text" style="display: none;">"${t.text}"</div>
  </div>
  
  <div class="mt-3 text-right">
    <div class="text-cyan-300">${t.name}</div>
    <div class="text-xs text-terminal-text">${t.title}, ${t.company}</div>
  </div>
  
  <div class="absolute top-0 left-0 w-full h-full pointer-events-none glitch-overlay"></div>
  <div class="text-xs text-terminal-cyan absolute bottom-1 right-2 cursor-pointer decode-btn" 
       onclick="decodeTestimonial(this.parentNode)">DECODE</div>
</div>
`).join('');

    return {
      output: `
${addGlitchEffect("TESTIMONIAL DATABASE // CORRUPTED ACCESS")}

<div class="mb-3 text-terminal-red text-xs">WARNING: These files appear to be corrupted. Use DECODE to restore original content.</div>

${testimonialOutput}

<script>
  function decodeTestimonial(container) {
    const corruptedText = container.querySelector('.corrupted-text');
    const authenticText = container.querySelector('.authentic-text');
    const decodeBtn = container.querySelector('.decode-btn');
    
    if (corruptedText && authenticText) {
      corruptedText.style.display = 'none';
      authenticText.style.display = 'block';
      if (decodeBtn) {
        decodeBtn.textContent = 'ENCODED';
        decodeBtn.onclick = () => encodeTestimonial(container);
      }
    }
  }
  
  function encodeTestimonial(container) {
    const corruptedText = container.querySelector('.corrupted-text');
    const authenticText = container.querySelector('.authentic-text');
    const decodeBtn = container.querySelector('.decode-btn');
    
    if (corruptedText && authenticText) {
      corruptedText.style.display = 'block';
      authenticText.style.display = 'none';
      if (decodeBtn) {
        decodeBtn.textContent = 'DECODE';
        decodeBtn.onclick = () => decodeTestimonial(container);
      }
    }
  }
</script>

<style>
  .glitch-overlay {
    background: linear-gradient(180deg, 
      rgba(255,255,255,0) 0%, 
      rgba(255,255,255,0.03) 50%, 
      rgba(255,255,255,0) 100%);
    animation: scan-line 2s linear infinite;
  }
  
  @keyframes scan-line {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  
  .corrupted-text {
    animation: text-corrupt 0.5s infinite;
  }
  
  @keyframes text-corrupt {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.95; }
    25%, 75% { opacity: 0.98; transform: translateX(1px); }
  }
</style>
`,
      isHTML: true
    };
  },
  
  // Fun Easter egg commands
  
  'sudo make coffee': () => {
    return {
      output: `
<div class="coffee-animation p-3 text-center">
  <div class="text-yellow-300 mb-2">BREWING COFFEE...</div>
  <pre class="text-center text-terminal-cyan">
      ( (
       ) )
    ._______.
    |       |]
    \\       /
     \`-----'
  </pre>
  <div class="text-terminal-yellow mt-2">Error: Coffee module not found</div>
  <div class="text-terminal-text mt-1 text-sm">I'm a terminal, not a coffee machine! But maybe we should take a coffee break?</div>
</div>
`,
      isHTML: true
    };
  },
  
  'rm -rf /': () => {
    return {
      output: `
<div class="danger-animation p-3">
  <div class="text-red-500 text-xl mb-2 glitch-text text-center">⚠ CRITICAL SYSTEM WARNING ⚠</div>
  <div class="text-center mb-3">Attempting to delete all system files...</div>
  <div class="bg-terminal-highlight p-2 text-red-400 text-sm border border-red-500 rounded">
    Error: Operation not permitted. Nice try though!
  </div>
  <div class="text-xs text-terminal-text mt-2">For safety reasons, destructive commands are simulated. Your portfolio is safe!</div>
</div>
`,
      isHTML: true
    };
  },
  
  '--darkmode': (args) => {
    return {
      output: `
<div class="p-3">
  <div class="text-cyan-300 mb-2">TOGGLING TERMINAL DISPLAY MODE...</div>
  <div class="text-terminal-text">Terminal display preferences updated.</div>
  <div class="text-terminal-text text-sm mt-2">In a real implementation, this would toggle between different visual modes with enhanced CRT effects.</div>
</div>

<script>
  // This would be properly implemented in React
  // This is just for demonstration
  document.body.classList.toggle('enhanced-crt-mode');
  
  // Add the style if it doesn't exist
  if (!document.getElementById('enhanced-crt-style')) {
    const style = document.createElement('style');
    style.id = 'enhanced-crt-style';
    style.textContent = \`
      body.enhanced-crt-mode .terminal-crt:after {
        opacity: 0.3;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                    linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
        background-size: 100% 2px, 3px 100%;
        animation: flicker 0.15s infinite, scan-stronger 7s linear infinite;
      }
      
      @keyframes scan-stronger {
        0% { 
          background-position: 0 0, 0 0;
          filter: hue-rotate(0deg);
        }
        100% { 
          background-position: 0 100%, 0 0; 
          filter: hue-rotate(360deg);
        }
      }
    \`;
    document.head.appendChild(style);
  }
</script>
`,
      isHTML: true
    };
  }
};

// Command execution function
export const executeCommand = async (commandText: string): Promise<CommandResult> => {
  const parts = commandText.trim().split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  // Special case for empty command
  if (command === '') {
    return { output: '' };
  }
  
  // Special case for easter egg commands
  if (command.startsWith('/')) {
    if (command === '/crash') {
      return {
        output: `
<span class="text-red-500 glitch-text">FATAL ERROR: System crash detected</span>
<span class="text-red-500">ERROR CODE: 0xC000021A</span>
<span class="text-yellow-300">Attempting recovery...</span>
<span class="text-yellow-300">...</span>
<span class="text-green-400">Recovery successful!</span>
`,
        isHTML: true
      };
    } else if (command === '/matrix') {
      return commands.matrix(args);
    } else if (command === '/glitch') {
      return {
        output: `<span class="glitch-text text-xl">GLITCH EFFECT ACTIVATED</span>`,
        isHTML: true
      };
    } else if (command === '/hack') {
      return commands.hack(args);
    }
  }
  
  // Check if command exists
  if (command in commands) {
    return commands[command](args);
  } else {
    return {
      output: `Command not found: ${command}. Type 'help' for available commands.`,
      isError: true
    };
  }
}; 