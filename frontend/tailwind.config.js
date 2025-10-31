import defaultTheme from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";

const tokens = {
  colors: {
    background: "#050608",
    foreground: "#F5FBFF",
    primary: "#4EF1E5",
    secondary: "#FF77E9",
    muted: "#1F2230",
    accent: "#0D47A1",
    success: "#5FFFD3",
    danger: "#FF5F87",
    warning: "#FFD166"
  },
  radius: {
    sm: "0.375rem",
    md: "0.75rem",
    lg: "1.25rem"
  }
};

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        background: tokens.colors.background,
        foreground: tokens.colors.foreground,
        primary: tokens.colors.primary,
        secondary: tokens.colors.secondary,
        muted: tokens.colors.muted,
        accent: tokens.colors.accent,
        success: tokens.colors.success,
        danger: tokens.colors.danger,
        warning: tokens.colors.warning
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Space Grotesk", ...defaultTheme.fontFamily.sans]
      },
      borderRadius: tokens.radius,
      boxShadow: {
        neon: "0 0 30px rgba(78, 241, 229, 0.4)",
        glass: "0 10px 40px rgba(0, 0, 0, 0.4)"
      }
    }
  },
  plugins: [tailwindcssAnimate]
};
