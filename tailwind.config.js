/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      manrope: ["Manrope", "sans-serif"],
    },
    extend: {
      colors: {
        font01: "#d4d4d4",
        font02: "#9e9e9e",
        mainBg: "#191919",
        subBg: "#202020",
        hoverBg: "#2c2c2c",
        borderGray: "#2b2b2b",
        primaryLight: "#1a80df",
        primaryDark: "#0075d2",
        light: {
          font01: "#37352f",
          font02: "#5e5c57",
          mainBg: "#ffff",
          subBg: "#f8f8f8",
          hoverBg: "#f0f0f0",
          borderGray: "#e7e7e7",
        },
      },
      animation: {
        "spin-linear": "spin-linear 1s infinite linear",
      },
      keyframes: {
        "spin-linear": {
          to: { transform: "rotate(1turn)" },
        },
      },
    },
  },
  plugins: [],
};
