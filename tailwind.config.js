/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        marquee: "marquee linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(calc(100% + 3rem))" },
          "100%": { transform: "translateX(calc(-100% - 2rem))" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        }
      },
    },
  },
  plugins: [],
};

