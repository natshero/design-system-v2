/**
 * @rankmyapp/ds - tailwind.preset.ts
 * Preset Tailwind para apps que consomem o DS.
 *
 * Uso no tailwind.config.ts do app consumidor:
 *   import { tailwindPreset } from "@rankmyapp/ds/tailwind"
 *   export default { presets: [tailwindPreset], content: [...] }
 *
 * O preset mapeia as CSS vars do DS para utilities Tailwind.
 * Os valores reais vem do tema ativo (html[data-theme="mi-tool"] etc.).
 */

import type { Config } from "tailwindcss";
import {
  THEME_COLOR_TOKENS,
  THEME_FONT_FAMILIES,
  THEME_RADIUS_TOKENS,
  THEME_SCREENS,
  mapCssVarTokens,
} from "./theme/token-contract";

export const tailwindPreset: Partial<Config> = {
  darkMode: ["selector", ".dark"],
  theme: {
    extend: {
      colors: mapCssVarTokens(THEME_COLOR_TOKENS),
      borderRadius: mapCssVarTokens(THEME_RADIUS_TOKENS),
      fontFamily: THEME_FONT_FAMILIES,
      screens: THEME_SCREENS,
    },
  },
};
