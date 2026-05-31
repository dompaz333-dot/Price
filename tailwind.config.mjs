/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F4EE',
        surface: '#FDFBF7',
        ink: '#1A1714',
        'ink-muted': '#6B655B',
        hairline: '#E5DFD3',
        accent: '#B88A5C',
      },
      fontFamily: {
        serif: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.12em',
        button: '0.08em',
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
};
