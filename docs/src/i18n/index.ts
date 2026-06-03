import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { ptBR } from './resources/pt-BR'
import { enUS } from './resources/en-US'
import { esES } from './resources/es-ES'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS:    'ds',
    fallbackLng:  'pt-BR',
    supportedLngs:['pt-BR', 'en-US', 'es-ES'],
    resources: {
      'pt-BR': ptBR,
      'en-US': enUS,
      'es-ES': esES,
    },
    detection: {
      // Detecta pelo querystring (?lng=en-US) ou pelo browser
      order:  ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupQuerystring: 'lng',
      lookupLocalStorage:'ds-language',
    },
    interpolation: {
      escapeValue: false,
    },
  })

export { i18n }

/**
 * Hook principal para tradução de strings do DS.
 * Substitui o useDSTranslation() standalone anterior.
 *
 * @example
 * const { t, i18n } = useDSTranslation()
 * t('common.close')         // 'Fechar' | 'Close' | 'Cerrar'
 * t('datepicker.apply')     // 'Aplicar' | 'Apply' | 'Aplicar'
 * i18n.language             // 'pt-BR' | 'en-US' | 'es-ES'
 * i18n.changeLanguage('en-US')
 */
export function useDSTranslation() {
  return useTranslation('ds')
}

/** Idiomas suportados com labels para o seletor */
export const SUPPORTED_LANGUAGES = [
  { code: 'pt-BR', label: 'PT', full: 'Português' },
  { code: 'en-US', label: 'EN', full: 'English'   },
  { code: 'es-ES', label: 'ES', full: 'Español'   },
] as const

export type SupportedLang = typeof SUPPORTED_LANGUAGES[number]['code']
