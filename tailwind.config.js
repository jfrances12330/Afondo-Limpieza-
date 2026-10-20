
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./routes.meta.ts",
    "./data/**/*.{js,ts}",
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
        // Restyling oct-2026 (web pública). `primary` se queda tal cual porque lo
        // usan la zona privada y los legales; lo público usa estos.
        ink: { DEFAULT: "#0b1324", 2: "#1a2336", 3: "#3b4558" },
        mist: "#f5f6f8",
        line: { DEFAULT: "#e3e6eb", dark: "#243049" },
        muted: "#5d6677",
        brand: { DEFAULT: "#1f35d1", dark: "#17279e", soft: "#eef0fc" },
        signal: "#f2b01e",
      },
      fontFamily: {
        sans: ["Public Sans", "sans-serif"],
        plex: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,19,36,.04), 0 8px 24px -12px rgba(11,19,36,.10)",
        lift: "0 1px 2px rgba(11,19,36,.05), 0 24px 48px -20px rgba(11,19,36,.25)",
      },
      screens: {
        'xs': '480px',
      }
    },
  },
  plugins: [],
}
