import { getAllProjects } from '../../lib/projects';
import { getAllSkillCategories } from '../../lib/skills';

export type CommandResult = {
  output: string | React.ReactNode;
  isHTML?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  handler?: () => void;
};

export type CommandHandler = (args: string[]) => CommandResult | Promise<CommandResult>;

// The registry of all available commands
const commands: Record<string, CommandHandler> = {
  help: () => ({
    output: `
Available commands:
  help              - Display this help message
  clear             - Clear the terminal
  projects          - List all projects
  project [name]    - View details of a specific project
  skills            - List all skills
  contact           - Display contact information
  about             - About me
  ls                - List "files" in the current directory
  cat [file]        - View the contents of a file
  whoami            - Who am I?
  sudo              - Don't even try
  exit              - "Exit" the terminal (not really)
  
Use arrow keys to navigate command history.
Press Tab for auto-completion.
`,
  }),

  clear: () => ({
    output: '',
  }),

  projects: () => {
    const projects = getAllProjects();
    return {
      output: `
Found ${projects.length} projects:
${projects.map((project, index) => `\n${index + 1}. ${project.title} - ${project.summary}`).join('')}

Use 'project [name]' for details.
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
`,
    };
  },

  skills: () => {
    const skillCategories = getAllSkillCategories();
    const output = skillCategories.map((category) => {
      return `
${category.category}:
${category.skills.map((skill) => `  - ${skill.name} ${skill.icon} (${skill.level}%) - ${skill.experience}`).join('\n')}
`;
    }).join('\n');

    return {
      output: `My Skills:\n${output}`,
      isHTML: true,
    };
  },

  contact: () => ({
    output: `
Contact Information:
Email: dev@example.com
GitHub: github.com/username
LinkedIn: linkedin.com/in/username
Twitter: @username

Initializing email client...
`,
    isLoading: true,
    handler: () => {
      // This would open a contact form in a real implementation
      window.location.href = 'mailto:dev@example.com';
    },
  }),

  about: () => ({
    output: `
I'm a passionate developer with expertise in modern web technologies.
I love creating beautiful, interactive experiences and solving complex problems.

Background:
- 5+ years of experience in frontend development
- Passionate about user experience and accessibility
- Open source contributor
- Tech community speaker

When not coding, I enjoy photography, hiking, and playing chess.
`,
  }),

  ls: (args) => {
    // Simulate a directory listing
    const files = [
      { name: 'about.txt', type: 'file', size: '2.4K' },
      { name: 'projects', type: 'directory', size: '4.0K' },
      { name: 'skills.json', type: 'file', size: '8.2K' },
      { name: 'contact.sh', type: 'executable', size: '1.2K' },
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
          ? 'terminal-blue' 
          : file.type === 'executable' 
            ? 'terminal-green' 
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
        ? 'terminal-blue' 
        : file.type === 'executable' 
          ? 'terminal-green' 
          : '';
      
      return `<span class="${className}">${file.name}</span>`;
    }).join('  ');

    return {
      output,
      isHTML: true,
    };
  },

  cat: (args) => {
    if (args.length === 0) {
      return {
        output: 'Usage: cat [file]',
        isError: true,
      };
    }

    const fileName = args[0];
    
    // Simulated file contents
    const fileContents: Record<string, string> = {
      'about.txt': `Hi, I'm a full-stack developer with a passion for creating elegant, efficient solutions to complex problems. With a strong foundation in web technologies and an eye for design, I bring a holistic approach to development that balances technical excellence with user-focused design.\n\nI specialize in React, TypeScript, Next.js, and Node.js, with experience across the entire development lifecycle from concept to deployment.`,
      
      'skills.json': `{
  "languages": ["JavaScript", "TypeScript", "Python", "HTML", "CSS"],
  "frameworks": ["React", "Next.js", "Express", "TailwindCSS"],
  "tools": ["Git", "Docker", "AWS", "Figma"],
  "databases": ["MongoDB", "PostgreSQL", "Redis"],
  "other": ["RESTful APIs", "GraphQL", "CI/CD", "Agile Methodologies"]
}`,
      
      'contact.sh': `#!/bin/bash
echo "Initializing contact protocol..."
sleep 1
echo "Establishing secure connection..."
sleep 1
echo "Connection established!"
echo "Email: dev@example.com"
echo "GitHub: github.com/username"
echo "LinkedIn: linkedin.com/in/username"
open mailto:dev@example.com`,
      
      '.secret': `Congratulations! You found the hidden file.
Special debug commands:
/crash - Trigger a fake terminal crash
/matrix - Start Matrix effect
/glitch - Add glitch effects to terminal`
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
    output: 'developer',
  }),

  sudo: () => ({
    output: 'Nice try. Permission denied.',
    isError: true,
  }),

  'sudo rm -rf /': () => ({
    output: `
⚠️ CRITICAL SYSTEM ERROR ⚠️
Attempting to delete root directory...

Error: Your portfolio is protected against self-destruction.
Try 'help' instead.
`,
    isError: true,
  }),

  exit: () => ({
    output: 'Cannot exit terminal. This is your life now.',
  }),

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
    return commands['sudo rm -rf /'](args);
  }
  
  // Special case for hidden commands
  if (trimmedCommand.startsWith('/') && trimmedCommand in commands) {
    return commands[trimmedCommand](args);
  }
  
  // Command not found
  return {
    output: `Command not found: ${command}. Try 'help' for a list of commands.`,
    isError: true,
  };
};

export default commands; 