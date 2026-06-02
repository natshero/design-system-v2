/**
 * @rankmyapp/ds — theme/utils.ts
 * Funções puras de controle de tema — sem React, funciona em qualquer contexto.
 */

export type ProductId =
  | 'mi-tool'
  | 'datarank'
  | 'ads-intelligence'
  | 'rankcommunity'
  | 'rankmygeo'

export type ThemeMode = 'dark' | 'light'

/** Produtos dark-first: o modo padrão é dark, .light é o override */
export const DARK_FIRST_PRODUCTS: ProductId[] = [
  'mi-tool',
  'datarank',
  'ads-intelligence',
  'rankmygeo',
]

const STORAGE_KEY_PRODUCT = 'ds-product'
const STORAGE_KEY_MODE    = 'ds-mode'

/** Retorna o modo padrão de um produto */
export function getDefaultMode(product: ProductId): ThemeMode {
  return DARK_FIRST_PRODUCTS.includes(product) ? 'dark' : 'light'
}

/** Detecta preferência de modo do sistema operacional */
export function getSystemMode(): ThemeMode {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Aplica um produto no elemento <html> e ativa o modo correto.
 * Puro — sem React, funciona em qualquer contexto.
 *
 * @example
 * applyTheme('datarank')         // dark-first, sem override
 * applyTheme('datarank', 'light') // força modo claro
 * applyTheme('rankcommunity')     // light-first, sem override
 */
export function applyTheme(
  product: ProductId,
  mode?: ThemeMode,
  options: { persist?: boolean } = { persist: true },
): void {
  if (typeof document === 'undefined') return

  const html    = document.documentElement
  const isDarkFirst = DARK_FIRST_PRODUCTS.includes(product)

  // Resolve qual modo usar:
  // 1. modo explícito passado como argumento
  // 2. modo salvo no localStorage
  // 3. modo padrão do produto
  const savedMode  = options.persist ? (localStorage.getItem(STORAGE_KEY_MODE) as ThemeMode | null) : null
  const resolvedMode: ThemeMode = mode ?? savedMode ?? getDefaultMode(product)

  // Aplica data-theme
  html.setAttribute('data-theme', product)

  // Aplica a classe de modo
  if (isDarkFirst) {
    // Dark-first: sem classe = dark | .light = claro
    resolvedMode === 'light'
      ? html.classList.add('light')
      : html.classList.remove('light')
    html.classList.remove('dark')
  } else {
    // Light-first: sem classe = light | .dark = escuro
    resolvedMode === 'dark'
      ? html.classList.add('dark')
      : html.classList.remove('dark')
    html.classList.remove('light')
  }

  // Persiste
  if (options.persist) {
    localStorage.setItem(STORAGE_KEY_PRODUCT, product)
    localStorage.setItem(STORAGE_KEY_MODE, resolvedMode)
  }
}

/**
 * Remove o tema ativo — volta ao estado neutro (sem data-theme).
 */
export function removeTheme(): void {
  if (typeof document === 'undefined') return
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.classList.remove('dark', 'light')
}

/**
 * Altera apenas o modo (dark/light) sem mudar o produto.
 */
export function setThemeMode(mode: ThemeMode): void {
  if (typeof document === 'undefined') return
  const html    = document.documentElement
  const product = (html.getAttribute('data-theme') ?? 'mi-tool') as ProductId
  applyTheme(product, mode)
}

/**
 * Retorna o modo atualmente ativo baseado nas classes do <html>.
 */
export function getCurrentMode(product: ProductId): ThemeMode {
  if (typeof document === 'undefined') return getDefaultMode(product)
  const html        = document.documentElement
  const isDarkFirst = DARK_FIRST_PRODUCTS.includes(product)

  if (isDarkFirst) {
    return html.classList.contains('light') ? 'light' : 'dark'
  } else {
    return html.classList.contains('dark') ? 'dark' : 'light'
  }
}

/**
 * Lê o produto e modo salvos no localStorage.
 * Útil para restaurar estado na inicialização.
 */
export function getSavedTheme(): { product: ProductId | null; mode: ThemeMode | null } {
  if (typeof window === 'undefined') return { product: null, mode: null }
  return {
    product: localStorage.getItem(STORAGE_KEY_PRODUCT) as ProductId | null,
    mode:    localStorage.getItem(STORAGE_KEY_MODE) as ThemeMode | null,
  }
}
