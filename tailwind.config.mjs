/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F4F1EA',
        surface: '#FBF8F2',
        'surface-2': '#EDE7DB',
        ink: '#16130F',
        'ink-muted': '#6B655B',
        'ink-soft': '#9A9489',
        hairline: '#E2DBCB',
        accent: '#8A6A3F',
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
