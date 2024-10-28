import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3498db',
          600: '#2980b9',
        },
        secondary: {
          500: '#2ecc71',
          600: '#27ae60',
        },
      },
    },
  },
  plugins: [],
};
export default config;
