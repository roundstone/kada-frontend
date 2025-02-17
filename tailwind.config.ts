/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";
import typography from "./theme/typography";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--inter)"],
        oxygen: ["var(--oxygen)"],
        railway: ["var(--raleway)"],
      },
      backgroundImage: {
        "hero-image": "url('/images/bg.png')",
        "custom-gradient":
          "linear-gradient(331.35deg, rgba(0, 0, 0, 0) 30.95%, rgba(38, 84, 38, 0.8) 62.42%)",
      },

      colors: {
        /*
        * primary colors
        */
        // primary: {
        //   lighter: colors.gray[200],
        //   DEFAULT: colors.gray[800],
        //   dark: colors.gray[950],
        //   foreground: colors.white,
        // },

        // /*
        // * secondary colors
        // */
        // secondary: {
        //   lighter: colors.indigo[200],
        //   DEFAULT: colors.indigo[500],
        //   dark: colors.indigo[700],
        //   foreground: colors.white,
        // },

        /*
        * danger colors
        */
        red: {
          lighter: colors.rose[200],
          DEFAULT: colors.rose[500],
          dark: colors.rose[700],
        },

        /*
        * warning colors
        */
        orange: {
          lighter: colors.amber[200],
          DEFAULT: colors.amber[500],
          dark: colors.amber[700],
        },

        /*
        * info colors
        */
        blue: {
          lighter: colors.sky[200],
          DEFAULT: colors.sky[500],
          dark: colors.sky[700],
        },

        /*
        * success colors
        */
        green: {
          lighter: colors.emerald[200],
          DEFAULT: colors.emerald[500],
          dark: colors.emerald[700],
        },

        muted: colors.gray[200],
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: {},
        primary: {
          DEFAULT: "#0F6238", //"#367B62", // Base
          100: "#d7e5e0", // 10%
          200: "#bcd3cb", // 20%
          300: "#9bbdb1", // 30%
          400: "#79a796", // 40%
          500: "#58917c", // 50%
          600: "#367b62", // Base
          700: "#2d6752", // 60%
          800: "#245241", // 70%
          900: "#1b3e31", // 80%
          1000: "#122921", // 90%
          1100: "#0b1914", // 100%
        },
        secondary: {
          DEFAULT: "#F7D150", // Base
          100: "#fdf6dc", // 10%
          200: "#fcf0c5", // 20%
          300: "#fbe8a8", // 30%
          400: "#fae08a", // 40%
          500: "#f8d96d", // 50%
          600: "#f7d150", // Base
          700: "#ceae43", // 60%
          800: "#a58b35", // 70%
          900: "#7c6928", // 80%
          1000: "#52461b", // 90%
          1100: "#312a10", // 100%
        },
        tertiary: {
          default: "#333543", // Base
          100: "#d6d7d9", // 10%
          200: "#bbbcc0", // 20%
          300: "#999aa1", // 30%
          400: "#777882", // 40%
          500: "#555762", // 50%
          600: "#333543", // Base
          700: "#2b2c38", // 60%
          800: "#22232d", // 70%
          900: "#1a1b22", // 80%
          1000: "#111216", // 90%
          1100: "#0a0b0d", // 100%
        },
        others: {
          lightGreen: "#F2F9F5",
          lightYellow: "#FCF8E7",
        },
        text: {},
      },
      boxShadow: {},
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1440px",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const newComponents: any = {
        ...typography,
      };
      addComponents(newComponents);
    }),
    require("@tailwindcss/forms"),
  ],
};
export default config;
