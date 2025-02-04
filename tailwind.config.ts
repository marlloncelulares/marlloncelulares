import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{html,js,ts,jsx,tsx,mdx}',
    './components/**/*.{html,js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#131D2D',
        'light-blue': '#1E2F48',
        'yellow': '#F4AF1B',
        'gray': '#F1F1F1',
        'white': '#FFFFFF',
        'custom-start': '#000000',
        'custom-end': '#282523',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #000000, #282523)',
      },
    },
  },
  plugins: [],
};

export default config;