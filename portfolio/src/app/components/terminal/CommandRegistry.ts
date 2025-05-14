import { getAllProjects } from '../../../lib/projects';
import { getAllSkillCategories } from '../../../lib/skills';
import { getPersonalInfo, getBasicInfo, getSocialProfiles, formatDateRange, calculateDuration } from '../../../lib/personal';

export type CommandResult = {
  output: string | React.ReactNode;
  isHTML?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  handler?: () => void;
  // Special command effects
  isHexDump?: boolean;
  isVim?: boolean;
  isConfetti?: boolean;
  isRPG?: boolean;
  isSkillBars?: boolean;
  isTypingAnimation?: boolean;
};

export type CommandHandler = (args: string[]) => CommandResult | Promise<CommandResult>;

// File system simulation
interface FileEntry {
  name: string;
  type: 'file' | 'directory' | 'executable' | 'hidden' | 'link';
  size: string;
  perms: string;
  content?: string;
  owner?: string;
  color?: string;
}

// Simulated file system
const fileSystem: Record<string, FileEntry[]> = {
  '/': [
    { name: 'home', type: 'directory', size: '4.0K', perms: 'drwxr-xr-x', owner: 'root' },
    { name: 'bin', type: 'directory', size: '4.0K', perms: 'drwxr-xr-x', owner: 'root' },
    { name: 'dev', type: 'directory', size: '4.0K', perms: 'drwxr-xr-x', owner: 'root' },
    { name: 'etc', type: 'directory', size: '4.0K', perms: 'drwxr-xr-x', owner: 'root' },
    { name: 'usr', type: 'directory', size: '4.0K', perms: 'drwxr-xr-x', owner: 'root' },
    { name: 'var', type: 'directory', size: '4.0K', perms: 'drwxr-xr-x', owner: 'root' },
  ],
  '/home': [
    { name: 'user', type: 'directory', size: '4.0K', perms: 'drwxr-xr-x', owner: 'user' },
  ],
  '~': [
    { name: 'about.txt', type: 'file', size: '2.4K', perms: '-rw-r--r--', owner: 'user', content: 'Hi, I\'m a full-stack developer with a passion for creating elegant, efficient solutions to complex problems. With a strong foundation in web technologies and an eye for design, I bring a holistic approach to development that balances technical excellence with user-focused design.\n\nI specialize in React, TypeScript, Next.js, and Node.js, with experience across the entire development lifecycle from concept to deployment.' },
    { name: 'projects', type: 'directory', size: '4.0K', perms: 'drwxr-xr-x', owner: 'user' },
    { name: 'skills.json', type: 'file', size: '8.2K', perms: '-rw-r--r--', owner: 'user', content: '{\n  "languages": ["JavaScript", "TypeScript", "Python", "HTML", "CSS"],\n  "frameworks": ["React", "Next.js", "Express", "TailwindCSS"],\n  "tools": ["Git", "Docker", "AWS", "Figma"],\n  "databases": ["MongoDB", "PostgreSQL", "Redis"],\n  "other": ["RESTful APIs", "GraphQL", "CI/CD", "Agile Methodologies"]\n}' },
    { name: 'contact.sh', type: 'executable', size: '1.2K', perms: '-rwxr-xr-x', owner: 'user', content: '#!/bin/bash\necho "Initializing contact protocol..."\nsleep 1\necho "Establishing secure connection..."\nsleep 1\necho "Connection established!"\necho "Email: dev@example.com"\necho "GitHub: github.com/username"\necho "LinkedIn: linkedin.com/in/username"\nopen mailto:dev@example.com' },
    { name: '.config', type: 'directory', size: '4.0K', perms: 'drwxr-xr-x', owner: 'user' },
    { name: '.secret', type: 'hidden', size: '0.1K', perms: '-rw-------', owner: 'user', content: 'Congratulations! You found the hidden file.\nSpecial debug commands:\n/crash - Trigger a fake terminal crash\n/matrix - Start Matrix effect\n/glitch - Add glitch effects to terminal' },
  ],
  '~/projects': [
    { name: 'ecommerce', type: 'directory', size: '4.0K', perms: 'drwxr-xr-x', owner: 'user' },
    { name: 'ai-tool', type: 'directory', size: '4.0K', perms: 'drwxr-xr-x', owner: 'user' },
    { name: 'mobile-app', type: 'directory', size: '4.0K', perms: 'drwxr-xr-x', owner: 'user' },
    { name: 'README.md', type: 'file', size: '1.8K', perms: '-rw-r--r--', owner: 'user', content: '# Projects\n\nThis directory contains all my major projects. Run `ls` in each project directory to learn more.' },
  ],
  '~/projects/ecommerce': [
    { name: 'README.md', type: 'file', size: '1.2K', perms: '-rw-r--r--', owner: 'user', content: '# E-commerce Platform\n\n- **Tech Stack**: Next.js, TypeScript, Tailwind CSS, Stripe\n- **Features**: Product catalog, cart, checkout, payment processing\n- **Live Demo**: https://ecommerce-example.com\n- **GitHub**: https://github.com/username/ecommerce\n' },
    { name: 'demo.sh', type: 'executable', size: '0.5K', perms: '-rwxr-xr-x', owner: 'user', content: '#!/bin/bash\necho "Launching e-commerce demo..."\necho "Opening browser window"\n# This would launch the demo in a real app' },
  ],
  '~/projects/ai-tool': [
    { name: 'README.md', type: 'file', size: '1.0K', perms: '-rw-r--r--', owner: 'user', content: '# AI Tool\n\n- **Tech Stack**: Python, TensorFlow, Flask, React\n- **Features**: Image recognition, natural language processing\n- **Live Demo**: https://ai-tool-example.com\n- **GitHub**: https://github.com/username/ai-tool\n' },
  ],
  '~/projects/mobile-app': [
    { name: 'README.md', type: 'file', size: '0.9K', perms: '-rw-r--r--', owner: 'user', content: '# Mobile App\n\n- **Tech Stack**: React Native, TypeScript, Firebase\n- **Features**: Authentication, push notifications, offline support\n- **GitHub**: https://github.com/username/mobile-app\n' },
  ],
  '~/.config': [
    { name: 'settings.json', type: 'file', size: '0.5K', perms: '-rw-r--r--', owner: 'user', content: '{\n  "theme": "cyberpunk",\n  "animation": "enabled",\n  "prompt": "user@portfolio:~$ ",\n  "showHiddenFiles": false\n}' },
  ],
};

// Man page content
const manPages: Record<string, string> = {
  help: `NAME
    help - display help for available commands

SYNOPSIS
    help [command]

DESCRIPTION
    Displays help information for terminal commands.
    When invoked without arguments, it lists all available commands.
    
OPTIONS
    command  Display help for the specified command.`,

  ls: `NAME
    ls - list directory contents

SYNOPSIS
    ls [OPTIONS] [DIRECTORY]

DESCRIPTION
    List information about files and directories.
    
OPTIONS
    -l  use a long listing format with permissions and sizes
    -a  do not ignore entries starting with .
    
EXAMPLES
    ls            List files in the current directory
    ls -l         List files with details
    ls -la        List all files (including hidden) with details
    ls projects   List contents of the projects directory`,

  cat: `NAME
    cat - concatenate files and print on the standard output

SYNOPSIS
    cat [FILE]...

DESCRIPTION
    Concatenate FILE(s) to standard output.
    
EXAMPLES
    cat about.txt       Display the contents of about.txt
    cat skills.json     Display the contents of skills.json`,

  cd: `NAME
    cd - change the working directory

SYNOPSIS
    cd [DIRECTORY]

DESCRIPTION
    Change the current directory to DIRECTORY.
    If no directory is specified, changes to the home directory.
    
EXAMPLES
    cd            Change to home directory
    cd projects   Change to the projects directory
    cd ..         Change to the parent directory`,

  projects: `NAME
    projects - list portfolio projects

SYNOPSIS
    projects [name]

DESCRIPTION
    Lists all projects or shows details for a specific project.
    
OPTIONS
    name   Display detailed information about the specified project.
    
EXAMPLES
    projects         List all projects
    projects ecommerce   Show details about the ecommerce project`,

  skills: `NAME
    skills - display developer skills

SYNOPSIS
    skills

DESCRIPTION
    Shows a comprehensive list of technical skills categorized by type.`,
};

// RPG-style skill visualization helper
const generateSkillBar = (skill: string, level: number) => {
  const maxBars = 10;
  const filledBars = Math.floor((level / 100) * maxBars);
  const emptyBars = maxBars - filledBars;
  
  return `[ ${skill.padEnd(12)} ${'█'.repeat(filledBars)}${'░'.repeat(emptyBars)} ${level}% ]`;
};

// The registry of all available commands
const commands: Record<string, CommandHandler> = {
  help: () => ({
    output: `
Available commands:
  help              - Display this help message
  man [command]     - Display manual page for a command
  clear             - Clear the terminal
  projects          - List all projects
  project [name]    - View details of a specific project
  about [--full]    - About me (use --full for detailed info)
  contact [--me]    - Display contact information
  experience        - Show work history
  education         - Show educational background
  skills [--graph]  - List skills by category with visualization
  ls [-la] [dir]    - List directory contents
  cd [directory]    - Change directory
  cat [file]        - View file contents
  pwd               - Print working directory
  whoami            - Display current user
  vim [file]        - Edit a file (simulated)
  find              - Search for files
  echo [text]       - Display a line of text
  sudo [command]    - Execute command as superuser
  
Use arrow keys to navigate command history.
Press Tab for auto-completion.
`,
  }),

  man: (args) => {
    if (args.length === 0) {
      return {
        output: `
Usage: man [command]
Example: man ls

Available manual pages:
${Object.keys(manPages).sort().join(', ')}
`,
      };
    }

    const command = args[0];
    if (manPages[command]) {
      return {
        output: `<div class="terminal-man-page">
          <div class="terminal-man-header">${command.toUpperCase()}(1)</div>
          <pre>${manPages[command]}</pre>
        </div>`,
        isHTML: true,
      };
    } else {
      return {
        output: `No manual entry for ${command}`,
        isError: true,
      };
    }
  },

  clear: () => ({
    output: '',
  }),

  projects: () => {
    const projects = getAllProjects();
    return {
      output: `
Found ${projects.length} projects:
${projects.map((project, index) => `\n${index + 1}. ${project.title} - ${project.summary}`).join('')}

Use 'project [name]' for details or 'cd ~/projects' to explore project files.
`,
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
${project.title} (${project.tags.join(', ')})
${'-'.repeat(project.title.length)}
${project.description}

Process:
${project.process.map((phase) => `- ${phase.phase} (${phase.duration}): ${phase.description}`).join('\n')}

Links:
- Demo: ${project.demoUrl}
- GitHub: ${project.githubUrl}

Run 'cd ~/projects/${project.slug}' to view project files.
`,
    };
  },

  skills: (args) => {
    const hasGraph = args.includes('--graph');
    const hasSound = args.includes('--sound');
    
    const skillCategories = getAllSkillCategories();
    
    if (hasGraph) {
      let output = `<div class="terminal-skills-graph">
        <h3 class="text-terminal-cyan mb-4">// SKILL PROFICIENCY ANALYSIS //</h3>`;
      
      skillCategories.forEach(category => {
        output += `<div class="mb-6">
          <h4 class="text-terminal-green text-lg mb-2">${category.category}</h4>
          <div class="space-y-3">`;
          
        category.skills.forEach(skill => {
          const percent = skill.level;
          output += `
            <div class="skill-bar-container" ${hasSound ? 'data-sound="true"' : ''}>
              <div class="flex justify-between mb-1">
                <span class="text-terminal-green">${skill.name}</span>
                <span class="text-terminal-yellow">${skill.experience}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-bar-fill" style="width: ${percent}%; animation-delay: 0.${skill.level}s" data-percent="${percent}"></div>
              </div>
              <div class="hover-tooltip">
                <div class="tooltip-content text-terminal-green">
                  <div>${skill.name} - ${percent}%</div>
                  <div class="text-xs">${skill.experience}</div>
                  <div class="text-xs mt-1 text-terminal-yellow">Specialization: ${skill.icon}</div>
                </div>
              </div>
            </div>`;
        });
        
        output += `</div></div>`;
      });
      
      output += `</div>
      <div class="mt-4 text-terminal-cyan">
        ${hasSound ? 'Sound effects enabled. Hover over bars to play.' : 'Use --sound to enable audio feedback.'}
      </div>`;
      
      return {
        output,
        isHTML: true,
        isSkillBars: true,
      };
    }
    
    // Plain text version
    let output = '🔮 TECHNICAL SKILLS INVENTORY 🔮\n\n';
    
    skillCategories.forEach(category => {
      output += `\n======== ${category.category.toUpperCase()} ========\n`;
      
      category.skills.forEach(skill => {
        output += generateSkillBar(skill.name, skill.level) + `   ${skill.icon}  ${skill.experience}\n`;
      });
    });
    
    output += '\nTip: Use "skills --graph" for visual representation.';
    
    return { output };
  },

  about: (args) => {
    const personal = getPersonalInfo();
    const isFullMode = args.includes('--full');
    
    if (isFullMode) {
      // RPG-style detailed about output
      const interestsLine = personal.interests.join(' | ');
      const availabilityStatus = personal.basics.available 
        ? '<span class="text-terminal-green animate-pulse">✅ Open to opportunities</span>' 
        : '<span class="text-terminal-red animate-pulse">⛔ Busy</span>';
      
      const languages = personal.languages.map(lang => 
        `<span class="text-terminal-cyan">${lang.language}</span> <span class="text-terminal-yellow">(${lang.fluency})</span>`
      ).join(' | ');
      
      return {
        output: `<div class="terminal-man-page">
          <div class="terminal-man-header">[ ABOUT ${personal.basics.name.toUpperCase()} ]</div>
          
          <div class="my-4 terminal-glitch" data-text="${personal.bio.long}">
            ${personal.bio.long}
          </div>
          
          <div class="mb-3">
            <div class="terminal-man-title">[ LANGUAGES ]</div>
            <div class="my-2">▸ ${languages}</div>
          </div>
          
          <div class="mb-3">
            <div class="terminal-man-title">[ INTERESTS ]</div>
            <div class="my-2 terminal-typing" style="animation-duration: 10s;">▸ ${interestsLine}</div>
          </div>
          
          <div class="mb-3">
            <div class="terminal-man-title">[ AVAILABILITY ]</div>
            <div class="my-2">▸ ${availabilityStatus}</div>
          </div>
        </div>`,
        isHTML: true,
        isTypingAnimation: true,
      };
    }
    
    // Standard about output
    return {
      output: `<div class="terminal-ascii my-2">
  ───────────────────────────────────────────
    ${personal.basics.name.toUpperCase()} @ {${personal.basics.location.city}, ${personal.basics.location.country}}
    ${personal.basics.title.toUpperCase()}
    "${personal.bio.short}"
  ───────────────────────────────────────────
      </div>
      <div class="text-xs text-terminal-cyan mt-2">Use 'about --full' for more details</div>`,
      isHTML: true,
    };
  },

  contact: (args) => {
    const isMe = args.includes('--me');
    const personalInfo = getBasicInfo();
    
    if (isMe) {
      // SMTP-style animation for sending a message
      return {
        output: `<div class="smtp-animation">
          <div class="smtp-header">
            <div class="text-terminal-green">INITIALIZING SMTP CONNECTION...</div>
            <div class="smtp-server">smtp.portfolio-server.net [192.168.0.1]</div>
          </div>
          
          <div class="smtp-log">
            <div class="log-line"><span class="log-time">00:00:01</span> <span class="log-status success">CONNECTED</span> to mail server</div>
            <div class="log-line"><span class="log-time">00:00:02</span> <span class="log-arrow">&gt;</span> HELO visitor</div>
            <div class="log-line"><span class="log-time">00:00:03</span> <span class="log-arrow">&lt;</span> 250 Hello visitor, pleased to meet you</div>
            <div class="log-line"><span class="log-time">00:00:04</span> <span class="log-arrow">&gt;</span> MAIL FROM: &lt;visitor@portfolio.com&gt;</div>
            <div class="log-line"><span class="log-time">00:00:05</span> <span class="log-arrow">&lt;</span> 250 OK</div>
            <div class="log-line"><span class="log-time">00:00:06</span> <span class="log-arrow">&gt;</span> RCPT TO: &lt;${personalInfo.email}&gt;</div>
            <div class="log-line"><span class="log-time">00:00:07</span> <span class="log-arrow">&lt;</span> 250 Accepted</div>
            <div class="log-line"><span class="log-time">00:00:08</span> <span class="log-arrow">&gt;</span> DATA</div>
            <div class="log-line"><span class="log-time">00:00:09</span> <span class="log-arrow">&lt;</span> 354 Start mail input; end with <CRLF>.<CRLF></div>
            <div class="log-line"><span class="log-time">00:00:10</span> <span class="log-arrow">&gt;</span> Subject: New Contact from Portfolio Terminal</div>
            <div class="log-line"><span class="log-time">00:00:11</span> <span class="log-arrow">&gt;</span> From: Visitor &lt;visitor@portfolio.com&gt;</div>
            <div class="log-line"><span class="log-time">00:00:12</span> <span class="log-arrow">&gt;</span> To: Yosr Jadly &lt;${personalInfo.email}&gt;</div>
            <div class="log-line"><span class="log-time">00:00:13</span> <span class="log-arrow">&gt;</span> </div>
            <div class="log-line"><span class="log-time">00:00:14</span> <span class="log-arrow">&gt;</span> Hello Yosr,</div>
            <div class="log-line"><span class="log-time">00:00:15</span> <span class="log-arrow">&gt;</span> I'm reaching out after viewing your impressive portfolio.</div>
            <div class="log-line"><span class="log-time">00:00:16</span> <span class="log-arrow">&gt;</span> Let's connect to discuss potential opportunities.</div>
            <div class="log-line"><span class="log-time">00:00:17</span> <span class="log-arrow">&gt;</span> </div>
            <div class="log-line"><span class="log-time">00:00:18</span> <span class="log-arrow">&gt;</span> Best regards,</div>
            <div class="log-line"><span class="log-time">00:00:19</span> <span class="log-arrow">&gt;</span> Visitor</div>
            <div class="log-line"><span class="log-time">00:00:20</span> <span class="log-arrow">&gt;</span> .</div>
            <div class="log-line"><span class="log-time">00:00:21</span> <span class="log-arrow">&lt;</span> <span class="log-status success">250 OK id=1hF9tn-0006Q1-Ul</span></div>
            <div class="log-line"><span class="log-time">00:00:22</span> <span class="log-arrow">&gt;</span> QUIT</div>
            <div class="log-line"><span class="log-time">00:00:23</span> <span class="log-arrow">&lt;</span> 221 Mail server closing connection</div>
          </div>
          
          <div class="smtp-footer">
            <div class="text-terminal-green terminal-typing">Message sent successfully!</div>
            
            <div class="mt-4 text-terminal-yellow">
              Actually want to send a real message? Use these contact details:
            </div>
            
            <div class="mt-2 grid grid-cols-2 gap-2">
              <div><span class="text-terminal-cyan">Email:</span> <a href="mailto:${personalInfo.email}" class="text-terminal-green hover:underline">${personalInfo.email}</a></div>
              <div><span class="text-terminal-cyan">Phone:</span> <span class="text-terminal-green">${personalInfo.phone}</span></div>
              <div><span class="text-terminal-cyan">Website:</span> <a href="${personalInfo.website}" target="_blank" class="text-terminal-green hover:underline">${personalInfo.website}</a></div>
              <div><span class="text-terminal-cyan">Location:</span> <span class="text-terminal-green">${personalInfo.location.city}, ${personalInfo.location.country}</span></div>
            </div>
          </div>
        </div>`,
        isHTML: true,
        isTypingAnimation: true
      };
    }
    
    // Regular contact info
    return {
      output: `
📬 CONTACT INFORMATION 📬

Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
Website: ${personalInfo.website}
Location: ${personalInfo.location.city}, ${personalInfo.location.country}

Use "contact --me" to send a simulated message.
`
    };
  },

  experience: () => {
    const experience = getPersonalInfo().experience;
    
    let output = `<div class="terminal-rpg">
      <div class="pixel-art-banner mb-4">
        =====[ CAREER QUEST LOG ]=====
      </div>`;
    
    experience.forEach((exp, index) => {
      const duration = calculateDuration(exp.startDate, exp.endDate);
      const xpPoints = Math.floor(Math.random() * 10000) + 5000;
      const level = Math.floor(Math.random() * 20) + 10;
      const items = exp.technologies.map(tech => `[${tech}]`).join(', ');
      
      output += `
      <div class="rpg-quest ${index === 0 ? 'current-quest' : ''}">
        <div class="quest-header">
          <div class="quest-title">
            <span class="quest-level">Lv.${level}</span>
            <span class="quest-name">${exp.position} @ ${exp.company}</span>
          </div>
          <div class="quest-duration">${formatDateRange(exp.startDate, exp.endDate)}</div>
        </div>
        
        <div class="quest-description">
          ${exp.description}
        </div>
        
        <div class="quest-rewards">
          <div><span class="text-terminal-yellow">⭐ XP Gained:</span> ${xpPoints.toLocaleString()}</div>
          <div><span class="text-terminal-cyan">🔧 Skills Used:</span> ${items}</div>
          <div><span class="text-terminal-green">📍 Location:</span> ${exp.location}</div>
          <div><span class="text-terminal-purple">⏳ Campaign Duration:</span> ${duration}</div>
        </div>
      </div>`;
    });
    
    output += `
      <div class="rpg-stats mt-4">
        <div class="stats-header">CHARACTER STATS</div>
        <div class="stats-content">
          <div><span class="stat-label">DEV LEVEL:</span> ${Math.floor(Math.random() * 30) + 20}</div>
          <div><span class="stat-label">TOTAL XP:</span> ${(Math.floor(Math.random() * 100) + 50).toLocaleString()}K</div>
          <div><span class="stat-label">QUESTS COMPLETED:</span> ${experience.length}</div>
          <div><span class="stat-label">NEXT QUEST:</span> <span class="text-terminal-yellow">Searching...</span></div>
        </div>
      </div>
    </div>`;
    
    return {
      output,
      isHTML: true,
      isRPG: true,
    };
  },

  education: () => {
    const personal = getPersonalInfo();
    
    const educationList = personal.education.map(edu => {
      const dateRange = formatDateRange(edu.startDate, edu.endDate);
      
      return `
        <div class="mb-4">
          <div class="flex justify-between">
            <span class="text-terminal-cyan font-bold">${edu.degree}</span>
            <span class="text-terminal-yellow">${dateRange}</span>
          </div>
          <div class="text-terminal-green">${edu.institution} - ${edu.location}</div>
          <div class="mt-1">${edu.description}</div>
        </div>
      `;
    }).join('');
    
    return {
      output: `
        <div class="terminal-man-page">
          <div class="terminal-man-header">EDUCATION</div>
          ${educationList}
        </div>
      `,
      isHTML: true,
    };
  },

  whoami: () => {
    const personal = getBasicInfo();
    return {
      output: personal.name,
    };
  },

  ls: (args) => {
    // Default is home directory
    let targetDir = '~';
    let showHidden = false;
    let showDetails = false;
    
    // Parse arguments
    for (const arg of args) {
      if (arg.startsWith('-')) {
        // It's a flag
        if (arg.includes('a')) showHidden = true;
        if (arg.includes('l')) showDetails = true;
      } else {
        // It's a directory
        targetDir = arg.startsWith('~') || arg.startsWith('/') ? arg : `~/${arg}`;
      }
    }
    
    // Check if directory exists
    if (!fileSystem[targetDir]) {
      return {
        output: `ls: cannot access '${targetDir}': No such file or directory`,
        isError: true,
      };
    }
    
    // Get files
    let files = fileSystem[targetDir];
    
    // Filter hidden files unless -a flag
    if (!showHidden) {
      files = files.filter(file => !file.name.startsWith('.') && file.type !== 'hidden');
    }
    
    if (showDetails) {
      // Long format (ls -l)
      const date = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
      const output = files.map(file => {
        const color = file.type === 'directory' ? 'text-terminal-cyan' : 
                      file.type === 'executable' ? 'text-terminal-green' : 
                      file.type === 'link' ? 'text-terminal-purple' : '';
        
        return `${file.perms} ${file.owner?.padEnd(8)} ${file.size.padStart(5)} ${date} <span class="${color}">${file.name}</span>`;
      }).join('\n');
      
      return {
        output: `total ${files.length}\n${output}`,
        isHTML: true,
      };
    } else {
      // Grid display
      return {
        output: `<div class="terminal-file-list">
          ${files.map(file => {
            const iconClass = file.type === 'directory' ? 'text-terminal-cyan' : 
                             file.type === 'executable' ? 'text-terminal-green' : 
                             file.type === 'link' ? 'text-terminal-purple' : 'text-terminal-text';
            
            const icon = file.type === 'directory' ? '📁' : 
                        file.type === 'executable' ? '⚙️' : 
                        file.type === 'link' ? '🔗' : '📄';
            
            return `<div class="terminal-file">
              <div class="terminal-file-icon ${iconClass}">${icon}</div>
              <div class="terminal-file-name ${iconClass}">${file.name}</div>
            </div>`;
          }).join('')}
        </div>`,
        isHTML: true,
      };
    }
  },

  cd: (args) => {
    // This is just a simulation - the actual state is managed in Terminal.tsx
    const dir = args[0] || '~';
    
    // Special case for .. (parent directory)
    if (dir === '..') {
      return {
        output: '',
      };
    }
    
    // Check if directory exists in our simulated filesystem
    const targetDir = dir.startsWith('~') || dir.startsWith('/') ? dir : `~/${dir}`;
    
    if (!fileSystem[targetDir]) {
      return {
        output: `cd: ${dir}: No such file or directory`,
        isError: true,
      };
    }
    
    // Check if it's a directory
    const isDir = fileSystem[targetDir] || fileSystem[targetDir.replace('~', '/home/user')];
    
    if (!isDir) {
      return {
        output: `cd: ${dir}: Not a directory`,
        isError: true,
      };
    }
    
    return {
      output: '', // cd doesn't output anything on success
    };
  },

  cat: (args) => {
    const personal = getPersonalInfo();
    
    if (args.length === 0) {
      return {
        output: 'Usage: cat [file]',
        isError: true,
      };
    }

    const fileName = args[0];
    
    // Special handling for RPG-style readme files
    if (fileName.endsWith('README.md')) {
      const companyName = fileName.split('/')[0].replace('-', ' ');
      const exp = personal.experience.find(e => 
        e.company.toLowerCase().includes(companyName.toLowerCase())
      );
      
      if (exp) {
        const techStack = exp.technologies.join(' ');
        
        return {
          output: `<div class="terminal-ascii">
  ───────────────────────────────────────────
    ROLE: ${exp.position}
    TECH: ${techStack}
    QUEST: ${exp.description}
    REWARD: +100 XP in ${exp.technologies[0]} & Leadership
  ───────────────────────────────────────────
          </div>`,
          isHTML: true,
          isRPG: true,
        };
      }
    }
    
    // Fall back to regular cat command
    const dir = '~'; // Assume home directory
    const files = fileSystem[dir];
    const file = files?.find(f => f.name === fileName);
    
    if (!file) {
      return {
        output: `cat: ${fileName}: No such file or directory`,
        isError: true,
      };
    }
    
    if (file.type === 'directory') {
      return {
        output: `cat: ${fileName}: Is a directory`,
        isError: true,
      };
    }
    
    // Format based on file extension
    let output = file.content || '';
    
    if (fileName.endsWith('.json')) {
      try {
        // Pretty print JSON
        const json = JSON.parse(output);
        output = JSON.stringify(json, null, 2);
        return {
          output: `<pre class="text-terminal-green">${output}</pre>`,
          isHTML: true,
        };
      } catch (e) {
        // If it's not valid JSON, just display as is
      }
    }
    
    return {
      output,
    };
  },

  pwd: () => ({
    output: '/home/user',
  }),

  vim: (args) => {
    const fileName = args[0] || '';
    
    return {
      output: `<div class="text-terminal-cyan">Opening ${fileName || 'new file'} in vim editor...</div>`,
      isVim: true, // Signal to show VIM modal
    };
  },
  
  sudo: (args) => {
    if (args.join(' ') === 'make coffee') {
      return {
        output: `
☕ BREWING COFFEE FOR USER ☕

[██████████] 100% complete

Error: Coffee module not found.
Please insert a coffee machine into the nearest USB port.
`,
      };
    }
    
    if (args[0] === '!!') {
      return {
        output: 'Even with sudo, I cannot alter the fabric of reality.',
      };
    }
    
    return {
      output: 'Permission denied: Nice try, but you\'re not the root user!',
      isError: true,
    };
  },

  echo: (args) => ({
    output: args.join(' '),
  }),
  
  find: (args) => {
    if (args.length === 0) {
      return {
        output: 'Usage: find [path] [expression]',
        isError: true,
      };
    }
    
    // Simple simulation of find command
    const results = [
      './projects/ecommerce/README.md',
      './projects/ai-tool/README.md',
      './projects/mobile-app/README.md',
      './about.txt',
      './skills.json',
    ];
    
    return {
      output: results.join('\n'),
    };
  },

  // Easter eggs and hidden commands
  '/crash': () => ({
    output: `
Segmentation fault (core dumped)
kernel panic: attempt to kill init!
CPU: 0 PID: 1 Comm: portfolio Not tainted 5.15.0-48-generic #54
Hardware name: Portfolio v1.0
[<0000000000000000>] __dump_stack lib/dump_stack.c:88
[<0000000000000000>] panic+0x10c/0x2d7 kernel/panic.c:591
[<0000000000000000>] do_exit+0xb28/0xb28 kernel/exit.c:878
[<0000000000000000>] do_group_exit+0x49/0xb0 kernel/exit.c:956
[<0000000000000000>] get_signal+0x2ac/0x7e0 kernel/signal.c:2648
...just kidding! Reloading terminal...
`,
  }),

  '/matrix': () => ({
    output: 'Initializing Matrix effect...',
    handler: () => {
      // This would trigger a Matrix effect animation in a real implementation
      console.log('Matrix effect triggered');
    },
  }),

  '/glitch': () => ({
    output: 'A̶d̵d̶i̵n̸g̵ ̵g̷l̶i̴t̸c̵h̵ ̸e̴f̸f̵e̷c̵t̵s̴ ̸t̷o̵ ̴t̴e̸r̵m̷i̷n̸a̸l̴.̵.̷.̷',
    handler: () => {
      // This would add glitch effects to the terminal in a real implementation
      console.log('Glitch effect triggered');
    },
  }),

  // Boot sequence command (hidden)
  boot: () => {
    const personal = getPersonalInfo();
    
    return {
      output: `<div class="terminal-boot-sequence my-2">
        <div class="text-terminal-cyan">[➤] Booting ${personal.basics.name.replace(/\s+/g, '_').toUpperCase()}_DEV_PORTFOLIO v2.3...</div>
        <div class="text-terminal-green">[✓] Memory allocated (8.0GB/8.0GB)</div>
        <div class="text-terminal-green">[✓] Loading MERN_stack_modules...</div>
        <div class="text-terminal-yellow">[!] WARNING: Creativity levels exceeding limits...</div>
        <div class="terminal-ascii mt-2">
  ───────────────────────────────────────────
    ${personal.basics.name.toUpperCase()} @ {${personal.basics.location.city}, ${personal.basics.location.country}}
    ${personal.basics.title.toUpperCase()}
    "${personal.bio.short}"
  ───────────────────────────────────────────
        </div>
      </div>`,
      isHTML: true,
      isTypingAnimation: true,
    };
  },

  login: () => {
    const personal = getPersonalInfo();
    const github = personal.social.find(s => s.network === 'GitHub');
    const username = github?.username || 'user';
    
    return {
      output: `<div class="terminal-login-sequence my-2">
        <div class="mb-1">login: <span class="text-terminal-green">${username}</span></div>
        <div class="mb-2">password: <span class="text-terminal-purple">**********</span></div>
        <div class="text-terminal-green mb-1">[✓] Authentication successful.</div>
        <div class="text-terminal-yellow">[!] Alert: New message from GitHub → 5 repos updated.</div>
      </div>`,
      isHTML: true,
      isTypingAnimation: true,
    };
  },

  boss: (args) => {
    const isFight = args.includes('--fight');
    
    if (!isFight) {
      return {
        output: `
🔶 BOSS BATTLE SIMULATION 🔶

You've discovered a hidden feature! 
The terminal can simulate a boss battle using your portfolio skills.

Type "boss --fight" to engage in battle.

⚠️ WARNING: This will initiate an interactive sequence.
`
      };
    }
    
    // Boss fight mode
    return {
      output: `<div class="boss-battle">
        <div class="ascii-boss">
                 /|  /|
                / | / |
               /  |/  |
              /       |
             /        |
           _/         |_
          / |         | \\
         /  |         |  \\
        /   |         |   \\
       /    |         |    \\
      /     |         |     \\
     /      |         |      \\
    /       |         |       \\
   /        |         |        \\
 _/         |         |         \\_
        ⚡ CODE OVERLORD ⚡
         ❤️ ❤️ ❤️ ❤️ ❤️
        </div>
        
        <div class="battle-intro">
          A wild CODE OVERLORD appears!
          This monstrous entity challenges your programming skills!
        </div>
        
        <div class="battle-menu">
          <div class="menu-title">CHOOSE YOUR ATTACK:</div>
          <div class="menu-options">
            <div class="battle-option" data-attack="frontend">⚔️ Frontend Strike (React + CSS)</div>
            <div class="battle-option" data-attack="backend">🛡️ Backend Defense (Node.js)</div>
            <div class="battle-option" data-attack="database">💫 Database Query (MongoDB)</div>
            <div class="battle-option" data-attack="algorithm">⚡ Algorithm Blast</div>
          </div>
        </div>
        
        <div class="battle-log">
          Battle log will appear here...
        </div>
        
        <div class="battle-status">
          <div class="player-status">
            <div class="status-name">YOSR JADLY</div>
            <div class="status-hp">HP: <span class="hp-value">100</span>/100</div>
            <div class="status-mp">MP: <span class="mp-value">80</span>/80</div>
          </div>
          
          <div class="boss-status">
            <div class="status-name">CODE OVERLORD</div>
            <div class="status-hp">HP: <span class="hp-value">500</span>/500</div>
            <div class="status-mp">RAGE: <span class="mp-value">30</span>/100</div>
          </div>
        </div>
      </div>`,
      isHTML: true,
      isRPG: true,
      handler: () => {
        // This handler would trigger the battle simulation in a real implementation
        console.log('Boss battle initiated');
      }
    };
  },

  testimonials: () => {
    const testimonials = getPersonalInfo().testimonials;
    
    let output = `<div class="corrupted-logs">
      <div class="corrupted-header">
        <div class="text-terminal-green">ACCESSING ENCRYPTED REPUTATION DATABASE...</div>
        <div class="terminal-blink mb-2">DECRYPTING...</div>
      </div>`;
    
    testimonials.forEach((testimonial, index) => {
      output += `
      <div class="corrupted-entry">
        <div class="entry-header">
          <div class="entry-id">[ID: ${Math.random().toString(36).substr(2, 8)}]</div>
          <div class="entry-timestamp">${new Date(Date.now() - Math.random() * 10000000000).toISOString()}</div>
        </div>
        
        <div class="entry-content glitch-container">
          <div class="entry-data text-terminal-cyan glitch-text" data-text="${testimonial.text}">
            ${testimonial.text}
          </div>
        </div>
        
        <div class="entry-metadata">
          <div class="entry-source">
            <span class="text-terminal-yellow">SOURCE:</span> 
            <span class="text-terminal-green">${testimonial.name}</span>
            <span class="text-terminal-purple"> | ${testimonial.position}</span>
          </div>
          <div class="entry-verification">
            <span class="text-terminal-green">VERIFICATION:</span> 
            <span class="text-terminal-yellow terminal-blink">AUTHENTIC</span>
          </div>
        </div>
      </div>`;
    });
    
    output += `
      <div class="corrupted-footer text-terminal-green">
        END OF ENCRYPTED DATA - ${testimonials.length} RECORDS FOUND
      </div>
    </div>`;
    
    return {
      output,
      isHTML: true,
      isTypingAnimation: true,
    };
  },

  'rm': (args) => {
    if (args[0] === '-rf' && args[1] === '/') {
      return {
        output: `<div class="self-destruct">
          <div class="text-terminal-red text-xl mb-2">⚠️ SELF-DESTRUCT SEQUENCE INITIATED ⚠️</div>
          <div class="countdown">5</div>
          <div class="text-terminal-yellow">Just kidding! That would be a terrible idea.</div>
          <div class="mt-2 text-terminal-green">System protected. Nice try though!</div>
        </div>`,
        isHTML: true,
      };
    }
    
    return {
      output: `rm: cannot remove '${args.join(' ')}': Permission denied`,
      isError: true,
    };
  },
  
  '--darkmode': () => {
    return {
      output: `<div class="darkmode-toggle">
        <div class="text-terminal-green">🌙 ENHANCED CRT EFFECTS TOGGLED</div>
        <div class="mt-2">Visual enhancements applied. Enjoy the retro vibes!</div>
      </div>`,
      isHTML: true,
      handler: () => {
        // This would toggle dark mode visuals in a real implementation
        console.log('Dark mode toggled');
      }
    };
  },
};

// Function to handle command execution
export const executeCommand = async (commandText: string): Promise<CommandResult> => {
  const trimmedCommand = commandText.trim();
  
  if (!trimmedCommand) {
    return { output: '' };
  }
  
  const [command, ...args] = trimmedCommand.split(' ');
  
  // Check if command exists
  if (command in commands) {
    try {
      return await commands[command](args);
    } catch (error) {
      return {
        output: `Error executing command: ${error}`,
        isError: true,
      };
    }
  }
  
  // Special case for sudo rm -rf /
  if (trimmedCommand === 'sudo rm -rf /') {
    return commands['sudo'](trimmedCommand.split(' ').slice(1));
  }
  
  // Special case for hidden commands
  if (trimmedCommand.startsWith('/') && trimmedCommand in commands) {
    return commands[trimmedCommand](args);
  }
  
  // Command not found
  return {
    output: `bash: ${command}: command not found. Try 'help' for a list of commands.`,
    isError: true,
  };
};

export default commands; 