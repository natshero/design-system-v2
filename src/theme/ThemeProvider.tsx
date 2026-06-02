/**
 * @rankmyapp/ds — theme/ThemeProvider.tsx
 * Provider React para controle de tema. Embrulha o app uma vez.
 */
import {
  createContext, useCallback, useContext,
  useEffect, useState, type ReactNode,
} from 'react'
import {
  applyTheme, getCurrentMode, getDefaultMode,
  getSavedTheme, removeTheme, setThemeMode,
  type ProductId, type ThemeMode,
} from './utils'

// ── Contexto ──────────────────────────────────────────────────────────────────

interface ThemeContextValue {
  /** Produto ativo (ex: 'datarank') */
  product: ProductId
  /** Modo atual do produto ('dark' | 'light') */
  mode: ThemeMode
  /** Alterna entre dark e light */
  toggleMode: () => void
  /** Define o modo explicitamente */
  setMode: (mode: ThemeMode) => void
  /** Troca o produto ativo (útil no docs SPA) */
  setProduct: (product: ProductId) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

// ── Provider ──────────────────────────────────────────────────────────────────

interface DSThemeProviderProps {
  /**
   * Produto a ser ativado.
   * Define qual bloco de CSS vars será aplicado no <html>.
   */
  product: ProductId
  /**
   * Modo inicial. Se omitido:
   * 1. Usa o valor salvo no localStorage
   * 2. Usa o modo padrão do produto (dark-first ou light-first)
   */
  defaultMode?: ThemeMode
  /**
   * Se true, detecta a preferência do sistema (prefers-color-scheme).
   * Só se aplica se não houver nada salvo no localStorage.
   * @default false
   */
  respectSystem?: boolean
  children: ReactNode
}

export function DSThemeProvider({
  product: initialProduct,
  defaultMode,
  respectSystem = false,
  children,
}: DSThemeProviderProps) {
  const [product, setProductState] = useState<ProductId>(() => {
    const saved = getSavedTheme()
    return saved.product ?? initialProduct
  })

  const [mode, setModeState] = useState<ThemeMode>(() => {
    const saved = getSavedTheme()
    if (saved.mode) return saved.mode
    if (defaultMode) return defaultMode
    if (respectSystem) {
      const sysPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      return sysPref
    }
    return getDefaultMode(initialProduct)
  })

  // Aplica tema sempre que produto ou modo mudar
  useEffect(() => {
    applyTheme(product, mode)
    return () => { removeTheme() }
  }, [product, mode])

  // Ouve mudanças de preferência do sistema (se respectSystem = true)
  useEffect(() => {
    if (!respectSystem) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      setModeState(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [respectSystem])

  const toggleMode = useCallback(() => {
    setModeState(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m)
    setThemeMode(m)
  }, [])

  const setProduct = useCallback((p: ProductId) => {
    setProductState(p)
  }, [])

  return (
    <ThemeContext.Provider value={{ product, mode, toggleMode, setMode, setProduct }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * Hook para ler e controlar o tema ativo.
 * Deve ser usado dentro de um <DSThemeProvider>.
 *
 * @example
 * const { mode, toggleMode } = useTheme()
 * const { product, setProduct } = useTheme() // para o docs SPA
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme deve ser usado dentro de <DSThemeProvider>')
  }
  return ctx
}

// Exporta getCurrentMode para uso fora do contexto
export { getCurrentMode }
