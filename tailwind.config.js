/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070b14',
        panel: '#0c1322',
        line: '#1a2540',
        cyan: { DEFAULT: '#4cc9f0', dim: '#2a6f86' },
        amber: { DEFAULT: '#ffb547' },
        fg: '#d6deee',
        muted: '#8592ad',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        blink: 'blink 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
};
