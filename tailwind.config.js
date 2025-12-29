
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#1a1aff",
        "primary-dark": "#0000cc",
        "surface-light": "#f8fafc",
        "surface-dark": "#0f172a",
      },
      fontFamily: {
        sans: ["Public Sans", "sans-serif"],
      },
      screens: {
        'xs': '480px',
      }
    },
  },
  plugins: [],
}
