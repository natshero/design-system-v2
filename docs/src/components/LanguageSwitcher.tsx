import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES, type SupportedLang } from '@docs/i18n'
import { dsI18n } from '@rankmyapp/ds'

/**
 * Seletor de idioma compacto — exibe PT | EN | ES
 * O idioma ativo fica destacado com a cor primary do produto.
 */
export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language as SupportedLang

  const change = (code: string) => {
    i18n.changeLanguage(code)       // Altera o idioma da documentação (se houver traduções)
    dsI18n.changeLanguage(code)     // Altera o idioma da instância isolada do Design System
  }

  return (
    <div
      className="flex items-center border border-border rounded-lg overflow-hidden"
      role="group"
      aria-label="Selecionar idioma"
    >
      {SUPPORTED_LANGUAGES.map(({ code, label, full }, i) => {
        const isActive = currentLang === code || currentLang.startsWith(code.split('-')[0])
        return (
          <button
            key={code}
            onClick={() => change(code)}
            aria-pressed={isActive}
            aria-label={full}
            title={full}
            className={`
              h-8 px-2.5 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary
              ${i > 0 ? 'border-l border-border' : ''}
              ${isActive
                ? 'bg-primary/15 text-primary'
                : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
            `}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
