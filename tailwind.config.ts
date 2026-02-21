import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dt: {
          bg: 'var(--dt-bg)',
          surface: 'var(--dt-surface)',
          sidebar: 'var(--dt-sidebar)',
          border: 'var(--dt-border)',
          accent: '#7c3aed',
          'accent-hover': '#6d28d9',
          text: 'var(--dt-text)',
          'text-muted': 'var(--dt-text-muted)',
          'text-dim': 'var(--dt-text-dim)',
          success: '#22c55e',
          error: '#ef4444',
          warning: '#eab308',
          tab: 'var(--dt-tab)',
          'tab-active': 'var(--dt-tab-active)',
        },
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
