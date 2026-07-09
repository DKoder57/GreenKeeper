// src/core/theme/tokens.ts

export const palette = {
  primary: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  danger: "#ef4444",
  white: "#ffffff",
  black: "#000000",
};

export const radius = {
  card: 16,
  input: 12,
  button: 12,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const lightTheme = {
  colors: {
    primary: palette.primary[500],
    primaryMuted: palette.primary[100],
    surface: palette.white,
    background: "#f8faf9",
    muted: "#6b7280",
    border: "#e5e7eb",
    danger: palette.danger,
    text: "#111827",
    textMuted: "#6b7280",
  },
  radius,
  spacing,
};

export const darkTheme = {
  colors: {
    primary: palette.primary[400],
    primaryMuted: palette.primary[900],
    surface: "#1c1f1e",
    background: "#0f1110",
    muted: "#9ca3af",
    border: "#2a2e2d",
    danger: "#f87171",
    text: "#f3f4f6",
    textMuted: "#9ca3af",
  },
  radius,
  spacing,
};

export type Theme = typeof lightTheme;
export type ColorScheme = "light" | "dark";