import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        ig: {
          blue: '#0095f6',
          'blue-hover': '#1877f2',
          red: '#ed4956',
          gray: '#8e8e8e',
          border: '#dbdbdb',
          bg: '#fafafa',
        },
      },
    },
  },
  plugins: [],
};

export default config;
