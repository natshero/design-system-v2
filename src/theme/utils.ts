/**
 * @rankmyapp/ds - theme/utils.ts
 * Funcoes puras de controle de tema - sem React, funciona em qualquer contexto.
 */

import {
  DARK_FIRST_PRODUCTS,
  PRODUCT_THEMES,
  type ProductId,
  type ThemeMode,
} from "./product-themes";

const STORAGE_KEY_PRODUCT = "ds-product";
const STORAGE_KEY_MODE = "ds-mode";

export interface ThemePersistenceOptions {
  persist?: boolean;
}

/** Retorna o modo padrao de um produto */
export function getDefaultMode(product: ProductId): ThemeMode {
  return PRODUCT_THEMES[product].defaultMode;
}

/** Detecta preferencia de modo do sistema operacional */
export function getSystemMode(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Aplica um produto no elemento <html> e ativa o modo correto.
 * Puro - sem React, funciona em qualquer contexto.
 */
export function applyTheme(
  product: ProductId,
  mode?: ThemeMode,
  options: ThemePersistenceOptions = { persist: false }
): void {
  if (typeof document === "undefined") return;

  const html = document.documentElement;
  const isDarkFirst = DARK_FIRST_PRODUCTS.includes(product);
  const savedMode = options.persist
    ? (localStorage.getItem(STORAGE_KEY_MODE) as ThemeMode | null)
    : null;
  const resolvedMode = mode ?? savedMode ?? getDefaultMode(product);

  html.setAttribute("data-theme", product);

  if (isDarkFirst) {
    if (resolvedMode === "light") {
      html.classList.add("light");
    } else {
      html.classList.remove("light");
    }
    html.classList.remove("dark");
  } else {
    if (resolvedMode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    html.classList.remove("light");
  }

  if (options.persist) {
    localStorage.setItem(STORAGE_KEY_PRODUCT, product);
    localStorage.setItem(STORAGE_KEY_MODE, resolvedMode);
  }
}

/** Remove o tema ativo - volta ao estado neutro. */
export function removeTheme(): void {
  if (typeof document === "undefined") return;
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.classList.remove("dark", "light");
}

/** Altera apenas o modo (dark/light) sem mudar o produto. */
export function setThemeMode(
  mode: ThemeMode,
  options: ThemePersistenceOptions = { persist: false }
): void {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  const product = (html.getAttribute("data-theme") ?? "mi-tool") as ProductId;
  applyTheme(product, mode, options);
}

/** Retorna o modo atualmente ativo baseado nas classes do <html>. */
export function getCurrentMode(product: ProductId): ThemeMode {
  if (typeof document === "undefined") return getDefaultMode(product);

  const html = document.documentElement;
  const isDarkFirst = DARK_FIRST_PRODUCTS.includes(product);

  if (isDarkFirst) {
    return html.classList.contains("light") ? "light" : "dark";
  }

  return html.classList.contains("dark") ? "dark" : "light";
}

/** Le o produto e modo salvos no localStorage. */
export function getSavedTheme(): {
  product: ProductId | null;
  mode: ThemeMode | null;
} {
  if (typeof window === "undefined") {
    return { product: null, mode: null };
  }

  return {
    product: localStorage.getItem(STORAGE_KEY_PRODUCT) as ProductId | null,
    mode: localStorage.getItem(STORAGE_KEY_MODE) as ThemeMode | null,
  };
}

export type { ProductId, ThemeMode } from "./product-themes";
export { DARK_FIRST_PRODUCTS } from "./product-themes";
