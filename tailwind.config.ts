import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#0a0a0c',
          surface: '#111114',
          elevated: '#16161a',
          subtle: '#1c1c22',
        },
        border: {
          DEFAULT: '#26262e',
          subtle: '#1a1a20',
        },
        fg: {
          DEFAULT: '#e8e8ee',
          muted: '#8b8b95',
          subtle: '#5b5b65',
        },
        accent: {
          DEFAULT: '#e8ff47',
          dim: '#a8b833',
          glow: 'rgba(232, 255, 71, 0.15)',
        },
        warn: '#ff6b6b',
        info: '#47c8ff',
      },
      maxWidth: {
        page: '1280px',
        prose: '720px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(232, 255, 71, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(232, 255, 71, 0)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
