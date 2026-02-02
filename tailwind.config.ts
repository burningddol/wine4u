import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--bg))",
        foreground: "hsl(var(--fg))",
        primary: "hsl(var(--primary))",
        black: "hsl(var(--black))",
        white: "hsl(var(--white))",
        error: "hsl(var(--error))",
        gray: {
          100: "hsl(var(--gray100))",
          300: "hsl(var(--gray300))",
          600: "hsl(var(--gray600))",
          800: "hsl(var(--gray800))",
        },
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
      },
      borderRadius: {
        md: "var(--radius-md)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
      },
    },
  },
  plugins: [],
};

export default config;
