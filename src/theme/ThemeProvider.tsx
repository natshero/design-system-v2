/**
 * @rankmyapp/ds - theme/ThemeProvider.tsx
 * Provider React para controle de tema. Embrulha o app uma vez.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  applyTheme,
  getCurrentMode,
  getDefaultMode,
  getSavedTheme,
  removeTheme,
  type ProductId,
  type ThemeMode,
} from "./utils";

interface ThemeContextValue {
  product: ProductId;
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  setProduct: (product: ProductId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface DSThemeProviderProps {
  product: ProductId;
  defaultMode?: ThemeMode;
  respectSystem?: boolean;
  persist?: boolean;
  children: ReactNode;
}

export function DSThemeProvider({
  product: productProp,
  defaultMode,
  respectSystem = false,
  persist = false,
  children,
}: DSThemeProviderProps) {
  const [product, setProductState] = useState<ProductId>(productProp);

  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (persist) {
      const savedMode = getSavedTheme().mode;
      if (savedMode) return savedMode;
    }

    if (defaultMode) return defaultMode;

    if (respectSystem && typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    return getDefaultMode(productProp);
  });

  useEffect(() => {
    applyTheme(product, mode, { persist });
    return () => {
      removeTheme();
    };
  }, [mode, persist, product]);

  useEffect(() => {
    if (!respectSystem) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (!persist) {
        setModeState(event.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [persist, respectSystem]);

  const toggleMode = useCallback(() => {
    setModeState((currentMode) =>
      currentMode === "dark" ? "light" : "dark"
    );
  }, []);

  const setMode = useCallback((nextMode: ThemeMode) => {
    setModeState(nextMode);
  }, []);

  const setProduct = useCallback((nextProduct: ProductId) => {
    setProductState(nextProduct);
  }, []);

  const value = useMemo(
    () => ({
      product,
      mode,
      toggleMode,
      setMode,
      setProduct,
    }),
    [mode, product, setMode, setProduct, toggleMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme deve ser usado dentro de <DSThemeProvider>");
  }

  return context;
}

export { getCurrentMode };
