/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class" , 
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],    },
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value> )",
        secondary: "rgb(var(--color-secondary) / <alpha-value> )",
        content: "rgb(var(--color-content) / <alpha-value> )",
      }
    },
  },
  plugins: [],
}