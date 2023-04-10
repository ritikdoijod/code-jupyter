/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        theme: {
          0: "hsl(var(--theme-0))",
          50: "hsl(var(--theme-50))",
          100: "hsl(var(--theme-100))",
          200: "hsl(var(--theme-200))",
          300: "hsl(var(--theme-300))",
          400: "hsl(var(--theme-400))",
          500: "hsl(var(--theme-500))",
          600: "hsl(var(--theme-600))",
          700: "hsl(var(--theme-700))",
          800: "hsl(var(--theme-800))",
          900: "hsl(var(--theme-900))",
          950: "hsl(var(--theme-950))",
        },
        accent: {
          50: "hsl(var(--accent-50))",
          100: "hsl(var(--accent-100))",
          200: "hsl(var(--accent-200))",
          300: "hsl(var(--accent-300))",
          400: "hsl(var(--accent-400))",
          500: "hsl(var(--accent-500))",
          600: "hsl(var(--accent-600))",
          700: "hsl(var(--accent-700))",
          800: "hsl(var(--accent-800))",
          900: "hsl(var(--accent-900))",
          950: "hsl(var(--accent-950))",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
