/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Terminal theme
        terminal: {
          bg: '#0C0C0C',
          text: '#F2F2F2',
          green: '#0FFF50',
          highlight: '#3A3A3A',
        },
        // LinkedIn theme
        linkedin: {
          bg: '#F3F2EF',
          primary: '#0A66C2',
          text: '#191919',
          secondary: '#00000099',
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
    },
  },
  plugins: [],
}; 