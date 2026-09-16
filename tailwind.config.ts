import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1D2421',
        paper: '#F7F5F0',
        cream: '#EFE8DD',
        line: '#DDD9D1',
        sage: '#87978C',
        moss: '#46574E',
        vermilion: '#B74336',
        tangerine: '#DC7B40',
        blush: '#EAD5CB',
        indigo: '#29365C',
        cosmic: '#2A0B3D',
        sagewash: '#A7C7AE',
        gold: '#D4AF37',
      },
      fontFamily: {
        display: ['Tenor Sans', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Cabin', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 22px 60px rgba(32, 43, 38, .10)',
        lift: '0 16px 34px rgba(32, 43, 38, .14)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.14'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
