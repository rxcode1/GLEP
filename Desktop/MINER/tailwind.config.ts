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
        // Earthy browns
        dirt: {
          50: "#f5f1e8",
          100: "#e8dcc4",
          200: "#d4c09a",
          300: "#b89d6f",
          400: "#9d7f52",
          500: "#7a6340",
          600: "#5c4a32",
          700: "#453829",
          800: "#2f261f",
          900: "#1a1512",
        },
        // Diamond blues
        diamond: {
          50: "#e6f4ff",
          100: "#b3d9ff",
          200: "#80bfff",
          300: "#4da5ff",
          400: "#1a8bff",
          500: "#0070e6",
          600: "#0057b3",
          700: "#003e80",
          800: "#00254d",
          900: "#000c1a",
        },
        // Gold accents
        gold: {
          50: "#fffef5",
          100: "#fff9d9",
          200: "#fff4bd",
          300: "#ffefa1",
          400: "#ffea85",
          500: "#ffd700",
          600: "#ccac00",
          700: "#998100",
          800: "#665600",
          900: "#332b00",
        },
      },
      animation: {
        "sparkle": "sparkle 2s ease-in-out infinite",
        "pickaxe-swing": "pickaxe-swing 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        sparkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        "pickaxe-swing": {
          "0%, 100%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(10deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

