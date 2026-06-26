import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'arctic-powder':  '#F1F6F4',
        'mystic-mint':    '#D9E8E2',
        'forsythia':      '#FFC801',
        'deep-saffron':   '#FF9932',
        'nocturnal':      '#114C5A',
        'oceanic-noir':   '#172B36',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body:    ['var(--font-body)', 'sans-serif'],
      },
      transitionDuration: {
        'micro':  '175ms',
        'layout': '350ms',
      },
    },
  },
  plugins: [],
};
export default config;
