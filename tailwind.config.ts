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
        hdfcBlue: '#224c87',
        hdfcRed: '#da3832',
        hdfcGrey: '#919090',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Montserrat', 'Arial', 'Verdana', 'sans-serif'],
        montserrat: ['Montserrat', 'Arial', 'Verdana', 'sans-serif'],
        arial: ['Arial', 'sans-serif'],
        verdana: ['Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
