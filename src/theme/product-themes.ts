export type ThemeMode = "dark" | "light";

export const PRODUCT_THEMES = {
  "mi-tool": {
    dataTheme: "mi-tool",
    defaultMode: "dark",
  },
  datarank: {
    dataTheme: "datarank",
    defaultMode: "dark",
  },
  "ads-intelligence": {
    dataTheme: "ads-intelligence",
    defaultMode: "dark",
  },
  rankcommunity: {
    dataTheme: "rankcommunity",
    defaultMode: "light",
  },
  rankmygeo: {
    dataTheme: "rankmygeo",
    defaultMode: "dark",
  },
} as const satisfies Record<
  string,
  {
    dataTheme: string;
    defaultMode: ThemeMode;
  }
>;

export type ProductId = keyof typeof PRODUCT_THEMES;

export const DARK_FIRST_PRODUCTS = Object.entries(PRODUCT_THEMES)
  .filter(([, config]) => config.defaultMode === "dark")
  .map(([productId]) => productId as ProductId);
