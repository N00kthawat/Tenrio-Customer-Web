import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f4efe7",
        ink: "#18212f",
        accent: "#c55f35",
        accentDark: "#8a3f20",
        pine: "#2d5a4a",
        cream: "#fffaf2",
      },
      boxShadow: {
        card: "0 24px 60px rgba(24, 33, 47, 0.08)",
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        body: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
