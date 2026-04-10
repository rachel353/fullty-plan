import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        sage: {
          DEFAULT: "var(--sage)",
          soft: "var(--sage-soft)",
          deep: "var(--sage-deep)",
          ink: "var(--sage-ink)",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Pretendard", "system-ui", "sans-serif"],
        display: ['"Cormorant Garamond"', '"Playfair Display"', '"Times New Roman"', "Georgia", "serif"],
      },
      maxWidth: {
        canvas: "1480px",
      },
    },
  },
  plugins: [],
};

export default config;
