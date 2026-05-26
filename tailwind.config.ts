import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Paytone One'", "sans-serif"],
        body: ["'Quicksand'", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
