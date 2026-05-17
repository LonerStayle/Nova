import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand colors — globals.css 의 --brand-* CSS variables 참조
        // light/dark mode 에서 자동으로 contrast 보강된 값 적용
        brand: {
          primary: "hsl(var(--brand-primary))",
          accent: "hsl(var(--brand-accent))",
        },
      },
      backgroundImage: {
        // Brand 그라데이션 — 단일 utility 로 사이트 전반 일관성 유지
        "brand-gradient":
          "linear-gradient(135deg, hsl(var(--brand-primary)) 0%, hsl(var(--brand-accent)) 100%)",
        "brand-gradient-h":
          "linear-gradient(90deg, hsl(var(--brand-primary)) 0%, hsl(var(--brand-accent)) 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Display scale — hero/heading 용. line-height 와 letter-spacing 일체화
        "display-sm": [
          "2.25rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "3.75rem",
          { lineHeight: "1.05", letterSpacing: "-0.03em" },
        ],
        "display-lg": [
          "5rem",
          { lineHeight: "1.0", letterSpacing: "-0.035em" },
        ],
        "display-xl": [
          "6rem",
          { lineHeight: "0.95", letterSpacing: "-0.04em" },
        ],
      },
      letterSpacing: {
        // 풍자 사이트의 monospace caption 톤 — 이미 사이트 곳곳에서 [0.2em] 사용 중
        widest2: "0.24em",
      },
    },
  },
  plugins: [animate],
};

export default config;
