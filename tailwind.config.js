export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#ffffff',
        surface: '#f3f4f6',
        surface2: '#f1f5f9',
        surface3: '#e2e8f0',
        bdr: '#e2e8f0',
        primary: '#2563eb',
        primary2: '#1d4ed8',
        accent: '#2563eb',
        accent2: '#1d4ed8',
        muted: '#64748b',
        muted2: '#6b7280',
        text: '#0f172a',
        hero: '#1e3a8a',
        heroLight: '#2563eb',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}