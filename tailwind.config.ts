import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#f550a9",
        "acc-light": "#9fa7bd",
        "acc-dark": "#8b7190",
        "shade-light": "#eff0ed",
        "shade-dark": "#372c50",
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
