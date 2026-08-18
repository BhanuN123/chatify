/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        4.5: "1.125rem",
        10.5: "2.625rem",
      },
      colors: {
        bg: {
          DEFAULT: "var(--bg)",
          canvas: "var(--bg-canvas)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          raised: "var(--surface-raised)",
          overlay: "var(--surface-overlay)",
          hover: "var(--surface-hover)",
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        ink: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          inverse: "var(--text-inverse)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          active: "var(--accent-active)",
          soft: "var(--accent-soft)",
        },
        signal: {
          online: "var(--signal-online)",
          amber: "var(--signal-amber)",
          danger: "var(--signal-danger)",
        },
      },
      fontFamily: {
        display: ["'Sora'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(6, 8, 14, 0.4)",
        panel: "0 4px 24px -4px rgba(6, 8, 14, 0.5)",
        floating: "0 12px 40px -8px rgba(6, 8, 14, 0.6)",
        glow: "0 0 0 1px var(--accent-soft), 0 8px 24px -4px rgba(91, 110, 245, 0.35)",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        riseIn: {
          from: { opacity: 0, transform: "translateY(6px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        popIn: {
          from: { opacity: 0, transform: "scale(0.96) translateY(-4px)" },
          to: { opacity: 1, transform: "scale(1) translateY(0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: 0.7 },
          "70%": { transform: "scale(1.9)", opacity: 0 },
          "100%": { transform: "scale(1.9)", opacity: 0 },
        },
        typingBounce: {
          "0%, 60%, 100%": { transform: "translateY(0)", opacity: 0.5 },
          "30%": { transform: "translateY(-4px)", opacity: 1 },
        },
        slideInLeft: {
          from: { opacity: 0, transform: "translateX(-12px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        border: "border 4s linear infinite",
        fadeIn: "fadeIn 0.2s ease-out",
        riseIn: "riseIn 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        popIn: "popIn 0.16s cubic-bezier(0.16, 1, 0.3, 1)",
        pulseRing: "pulseRing 2.4s cubic-bezier(0.2, 0.6, 0.4, 1) infinite",
        typingBounce: "typingBounce 1.2s ease-in-out infinite",
        slideInLeft: "slideInLeft 0.24s cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer: "shimmer 1.8s linear infinite",
      },
    },
  },
  plugins: [],
};
