/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff6b6b",
        secondary: "#4c6ef5",
        dark: "#1a1a1a",
        light: "#f5f5f5",
      },
    },
  },
  plugins: [],
};
