/**
 * @rankmyapp/ds - public API
 *
 * Importacao de estilos (obrigatoria no entry da app consumidora):
 *   import "@rankmyapp/ds/styles"
 *
 * Importacao de componentes:
 *   import { Button, Badge, Card } from "@rankmyapp/ds"
 *
 * Importacao de tokens TypeScript:
 *   import { THEME_COLOR_TOKENS, PRODUCT_THEMES } from "@rankmyapp/ds/tokens"
 *
 * Importacao do preset Tailwind:
 *   import { tailwindPreset } from "@rankmyapp/ds/tailwind"
 */

export * from "./components/ui/button";
export * from "./components/ui/input";
export * from "./components/ui/textarea";
export * from "./components/ui/label";
export * from "./components/ui/checkbox";
export * from "./components/ui/radio-group";
export * from "./components/ui/select";
export * from "./components/ui/native-select";
export * from "./components/ui/switch";
export * from "./components/ui/toggle";
export * from "./components/ui/toggle-group";
export * from "./components/ui/slider";
export * from "./components/ui/input-otp";
export * from "./components/ui/field";
export * from "./components/ui/input-group";
export * from "./components/ui/button-group";

export * from "./components/ui/card";
export * from "./components/ui/accordion";
export * from "./components/ui/separator";
export * from "./components/ui/table";
export * from "./components/ui/tabs";
export * from "./components/ui/breadcrumb";
export * from "./components/ui/pagination";
export * from "./components/ui/resizable";
export * from "./components/ui/scroll-area";
export * from "./components/ui/aspect-ratio";
export * from "./components/ui/collapsible";

export * from "./components/ui/alert";
export * from "./components/ui/alert-dialog";
export * from "./components/ui/badge";
export * from "./components/ui/progress";
export * from "./components/ui/skeleton";
export * from "./components/ui/avatar";
export * from "./components/ui/spinner";
export * from "./components/ui/empty";
export * from "./components/ui/sonner";
export * from "./components/ui/kbd";
export * from "./components/ui/item";

export * from "./components/ui/dialog";
export * from "./components/ui/sheet";
export * from "./components/ui/drawer";
export * from "./components/ui/dropdown-menu";
export * from "./components/ui/popover";
export * from "./components/ui/tooltip";
export * from "./components/ui/hover-card";
export * from "./components/ui/context-menu";
export * from "./components/ui/command";
export * from "./components/ui/combobox";

export * from "./components/ui/navigation-menu";
export * from "./components/ui/menubar";
export * from "./components/ui/sidebar";

export * from "./components/ui/chart";
export * from "./components/ui/calendar";
export * from "./components/ui/carousel";

export { cn } from "./lib/utils";
export * from "./components/ui/direction";

export { DSThemeProvider, useTheme } from "./theme/ThemeProvider";
export {
  applyTheme,
  removeTheme,
  setThemeMode,
  getCurrentMode,
  getSavedTheme,
  getDefaultMode,
  getSystemMode,
  DARK_FIRST_PRODUCTS,
  type ProductId,
  type ThemeMode,
} from "./theme/utils";
export * from "./tokens";
export { i18n as dsI18n, useDSTranslation, SUPPORTED_LANGUAGES, type SupportedLang } from "./i18n";
