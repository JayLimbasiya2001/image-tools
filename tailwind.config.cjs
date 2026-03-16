/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#ecfeff",
          100: "#cffafe",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15,23,42,0.35)",
      },
    },
  },
  plugins: [],
};

