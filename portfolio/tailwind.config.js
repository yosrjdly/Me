/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Terminal theme
        terminal: {
          bg: '#0a0a0a', // Matte black
          text: '#F2F2F2',
          green: '#0FFF50', // Cyberpunk neon green
          cyan: '#06b6d4', // Electric cyan
          yellow: '#facc15', // Terminal amber
          red: '#ef4444', // Error red
          blue: '#3b82f6', // Info blue
          purple: '#a855f7', // Highlight purple
          highlight: '#1A1A1A',
          darkGreen: '#057a55', // Darker green for contrast
          matrix: '#00FF41', // Matrix specific green
        },
        // LinkedIn theme
        linkedin: {
          bg: '#F3F2EF',
          primary: '#0A66C2',
          text: '#191919',
          secondary: '#00000099',
        },
        // Modern theme
        theme: {
          primary: '#00BFA6',    // Vibrant teal
          secondary: '#64CCC5',  // Soft teal
          accent: '#176B87',     // Deep ocean blue
          light: '#DAFFFB',      // Light minty
          background: '#f7f9fc',
          card: '#ffffff',
          text: '#333333',
          'text-light': '#666666',
          border: '#e1e8f0',
          highlight: 'rgba(0, 191, 166, 0.1)',
          'card-hover': 'rgba(0, 191, 166, 0.05)',
        },
        // Messaging theme
        messaging: {
          bg: '#FFFFFF',
          primary: '#0B93F6',
          secondary: '#E5E5EA',
          text: '#000000',
        },
        // Game theme
        game: {
          bg: '#1A1A2E',
          primary: '#FF0080',
          secondary: '#4B44F0',
          text: '#FFFFFF',
        },
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', 'monospace'],
        sans: ['var(--font-geist-sans)', 'sans-serif'],
      },
      maxWidth: {
        'terminal': '900px', // Cap terminal width as specified
      },
      animation: {
        'typing': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
        'glitch': 'glitch 500ms infinite',
        'scanline': 'scanlines 1s steps(60) infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'crt-flicker': 'flicker 0.15s infinite',
        'border-shine': 'border-shine 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'wave': 'wave 8s linear infinite',
        'fadeInUp': 'fadeInUp 0.6s ease forwards',
        'fadeIn': 'fadeIn 0.6s ease forwards',
        'slideInRight': 'slideInRight 0.6s ease forwards',
        'bounce-sm': 'bounce-sm 2s ease infinite',
        'rotate-slow': 'rotate 8s linear infinite',
        'ping-sm': 'ping-sm 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#0FFF50' }
        },
        glitch: {
          '0%': { 
            textShadow: '0.05em 0 0 rgba(255, 0, 251, 0.75), -0.025em -0.05em 0 rgba(0, 255, 255, 0.75), 0.025em 0.05em 0 rgba(0, 255, 0, 0.75)' 
          },
          '14%': { 
            textShadow: '0.05em 0 0 rgba(255, 0, 251, 0.75), -0.025em -0.05em 0 rgba(0, 255, 255, 0.75), 0.025em 0.05em 0 rgba(0, 255, 0, 0.75)' 
          },
          '15%': { 
            textShadow: '-0.05em -0.025em 0 rgba(255, 0, 251, 0.75), 0.025em 0.025em 0 rgba(0, 255, 255, 0.75), -0.05em -0.05em 0 rgba(0, 255, 0, 0.75)' 
          },
          '49%': { 
            textShadow: '-0.05em -0.025em 0 rgba(255, 0, 251, 0.75), 0.025em 0.025em 0 rgba(0, 255, 255, 0.75), -0.05em -0.05em 0 rgba(0, 255, 0, 0.75)' 
          },
          '50%': { 
            textShadow: '0.025em 0.05em 0 rgba(255, 0, 251, 0.75), 0.05em 0 0 rgba(0, 255, 255, 0.75), 0 -0.05em 0 rgba(0, 255, 0, 0.75)' 
          },
          '99%': { 
            textShadow: '0.025em 0.05em 0 rgba(255, 0, 251, 0.75), 0.05em 0 0 rgba(0, 255, 255, 0.75), 0 -0.05em 0 rgba(0, 255, 0, 0.75)' 
          },
          '100%': { 
            textShadow: '-0.025em 0 0 rgba(255, 0, 251, 0.75), -0.025em -0.025em 0 rgba(0, 255, 255, 0.75), -0.025em -0.05em 0 rgba(0, 255, 0, 0.75)' 
          }
        },
        'border-shine': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'wave': {
          '0%': { transform: 'translateX(0) translateZ(0) scaleY(1)' },
          '50%': { transform: 'translateX(-25%) translateZ(0) scaleY(0.8)' },
          '100%': { transform: 'translateX(-50%) translateZ(0) scaleY(1)' },
        },
        'fadeInUp': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slideInRight': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'bounce-sm': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'ping-sm': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '75%, 100%': { transform: 'scale(1.5)', opacity: '0' }
        }
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}; 