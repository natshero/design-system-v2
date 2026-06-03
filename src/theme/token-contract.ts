const asVar = <T extends string>(value: T) => `var(${value})` as const;

export const THEME_COLOR_TOKENS = {
  primary: "--primary",
  "primary-fg": "--primary-foreground",
  secondary: "--secondary",
  accent: "--accent",
  background: "--background",
  card: "--card",
  popover: "--popover",
  muted: "--muted",
  foreground: "--foreground",
  "muted-foreground": "--muted-foreground",
  "card-foreground": "--card-foreground",
  destructive: "--destructive",
  success: "--success",
  warning: "--warning",
  error: "--error",
  border: "--border",
  input: "--input",
  ring: "--ring",
  sidebar: "--sidebar",
  "sidebar-fg": "--sidebar-foreground",
  "chart-1": "--chart-1",
  "chart-2": "--chart-2",
  "chart-3": "--chart-3",
  "chart-4": "--chart-4",
  "chart-5": "--chart-5",
  "chart-6": "--chart-6",
  "chart-7": "--chart-7",
  "chart-8": "--chart-8",
} as const;

export const THEME_RADIUS_TOKENS = {
  sm: "--radius-sm",
  md: "--radius-md",
  lg: "--radius-lg",
  xl: "--radius-xl",
  "2xl": "--radius-2xl",
  "3xl": "--radius-3xl",
  "4xl": "--radius-4xl",
} as const;

export const THEME_FONT_FAMILIES = {
  display: ["Space Grotesk", "ui-sans-serif", "sans-serif"],
  sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
  mono: ["JetBrains Mono", "ui-monospace", "monospace"],
  data: ["Space Grotesk", "ui-sans-serif", "sans-serif"],
} as const;

export const THEME_SCREENS = {
  md: "1024px",
  lg: "1440px",
  xl: "1920px",
  "2xl": "2560px",
} as const;

export function mapCssVarTokens<T extends Record<string, string>>(tokens: T) {
  return Object.fromEntries(
    Object.entries(tokens).map(([token, variable]) => [token, asVar(variable)])
  ) as {
    [K in keyof T]: `var(${T[K]})`;
  };
}
