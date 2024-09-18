/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';
import tailwindcssAspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
        accent: '#657786',
        background: '#F5F8FA',
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      borderRadius: {
        xl: '1.5rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [flowbitePlugin, tailwindcssAspectRatio],
};


