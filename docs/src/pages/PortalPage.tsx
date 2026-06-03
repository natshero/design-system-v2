import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sun, Moon, Smartphone, TrendingUp, Target, Globe, Users, Search } from 'lucide-react'
import { LanguageSwitcher } from '@docs/components/LanguageSwitcher'
import { applyTheme, removeTheme, type ThemeMode } from '@/theme'

// Ícones SVG por produto — sem emojis (skill rule: no-emoji-icons)
const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  'mi-tool':          <Smartphone  size={22} aria-hidden="true" />,
  'datarank':         <TrendingUp  size={22} aria-hidden="true" />,
  'ads-intelligence': <Target      size={22} aria-hidden="true" />,
  'rankmygeo':        <Globe       size={22} aria-hidden="true" />,
  'rankcommunity':    <Users       size={22} aria-hidden="true" />,
  'ri-tool':          <Search      size={22} aria-hidden="true" />,
}

const PRODUCT_ICON_COLORS: Record<string, string> = {
  'mi-tool':          '#1A88FF',
  'datarank':         '#8243FF',
  'ads-intelligence': '#5667EA',
  'rankmygeo':        '#00A884',
  'rankcommunity':    '#7C3AED',
  'ri-tool':          '#FF5700',
}

interface ProductCardProps {
  id: string
  name: string
  description: string
  iconBg: string
  available?: boolean
  stats?: string
  path?: string
}

const PRODUCTS: ProductCardProps[] = [
  {
    id: 'mi-tool',
    name: 'MI Tool',
    description: 'Mobile Intelligence & ASO Platform',
    iconBg: 'rgba(26,136,255,0.12)',
    stats: '49 componentes · 32 tokens',
    path: '/preview/mi-tool',
    available: true,
  },
  {
    id: 'datarank',
    name: 'DataRank',
    description: 'Analytics & Rankings Platform',
    iconBg: 'rgba(130,67,255,0.12)',
    stats: '8 tokens · dark-first',
    path: '/preview/datarank',
    available: true,
  },
  {
    id: 'ads-intelligence',
    name: 'Ads Intelligence',
    description: 'AI & GEO Advertising Platform',
    iconBg: 'rgba(86,103,234,0.12)',
    stats: 'tokens · dark-first',
    path: '/preview/ads-intelligence',
    available: true,
  },
  {
    id: 'rankmygeo',
    name: 'RankMyGEO',
    description: 'GEO Visibility & AI Engine Monitoring',
    iconBg: 'rgba(0,168,132,0.12)',
    stats: 'tokens · light-first',
    path: '/preview/rankmygeo',
    available: true,
  },
  {
    id: 'rankcommunity',
    name: 'Rank Community',
    description: 'Community & Engagement Platform',
    iconBg: 'rgba(124,58,237,0.12)',
    stats: 'tokens · light-first',
    path: '/preview/rankcommunity',
    available: true,
  },
  {
    id: 'ri-tool',
    name: 'RI Tool',
    description: 'Reputation Intelligence',
    iconBg: 'rgba(255,87,0,0.12)',
    stats: '— componentes · — tokens',
    available: false,
  },
]

export const PortalPage: React.FC = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState<ThemeMode>('dark')

  useEffect(() => {
    applyTheme('mi-tool', mode, { persist: false })
    return () => removeTheme()
  }, [mode])

  const toggleTheme = useCallback(() => {
    setMode(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  const isDark = mode === 'dark'

  const handleCardKeyDown = (e: React.KeyboardEvent, path?: string) => {
    if ((e.key === 'Enter' || e.key === ' ') && path) {
      e.preventDefault()
      navigate(path)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">

      {/* Header */}
      <header className="sticky top-0 z-50 h-16 flex items-center justify-between px-6 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center w-6 h-6 rounded-md bg-primary text-primary-foreground font-bold text-[14px]"
            aria-hidden="true"
          >
            R
          </div>
          <span className="text-sm text-muted-foreground font-medium">Design System</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <span className="text-xs text-muted-foreground border border-border rounded-full px-2.5 py-0.5 hidden sm:inline">
            v0.1.0
          </span>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 border border-border rounded-lg bg-card text-muted-foreground hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
            aria-label={`Alternar para modo ${isDark ? 'claro' : 'escuro'}`}
          >
            {/* Ícones SVG — sem emoji (skill: no-emoji-icons) */}
            {isDark
              ? <Sun  size={16} aria-hidden="true" />
              : <Moon size={16} aria-hidden="true" />
            }
          </button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="text-center pt-20 px-6">
          <h1 className="font-bold text-[40px] leading-tight text-foreground font-display">
            RankMyApp Design System
          </h1>
          <p className="text-base text-muted-foreground max-w-[480px] mx-auto mt-4 leading-relaxed">
            O sistema unificado de componentes, tokens e padrões para todos os produtos RankMyApp.
          </p>
          <div className="w-10 h-[3px] bg-primary rounded-sm mx-auto mt-6" aria-hidden="true" />
        </section>

        {/* Stats */}
        <section
          className="flex justify-center gap-12 mt-10 px-6"
          aria-label="Números do Design System"
        >
          {[
            { value: '49', label: 'Componentes' },
            { value: '3',  label: 'Idiomas'     },
            { value: '2+', label: 'Produtos'    },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-display font-bold text-[28px] text-primary leading-tight">{value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-[0.08em] mt-1">{label}</div>
            </div>
          ))}
        </section>

        {/* Products */}
        <section className="max-w-[800px] mx-auto mt-14 px-6">
          <h2 className="font-medium text-[11px] tracking-[0.08em] uppercase text-muted-foreground mb-5">
            Produtos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRODUCTS.map(product => {
              const iconColor = PRODUCT_ICON_COLORS[product.id]
              const icon = PRODUCT_ICONS[product.id]
              return (
                <article
                  key={product.id}
                  onClick={() => product.available && product.path && navigate(product.path)}
                  onKeyDown={(e) => product.available && handleCardKeyDown(e, product.path)}
                  aria-label={
                    product.available
                      ? `Acessar documentação do ${product.name}`
                      : `${product.name} — Em breve`
                  }
                  aria-disabled={!product.available}
                  role="link"
                  tabIndex={product.available ? 0 : undefined}
                  className={`border border-border rounded-2xl p-6 bg-card shadow-sm transition-all duration-200 ${
                    product.available
                      ? 'cursor-pointer hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                      : 'opacity-50 cursor-default'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Ícone SVG com cor do produto — sem emoji */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: product.iconBg, color: iconColor }}
                      aria-hidden="true"
                    >
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-lg text-foreground leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-[13px] text-muted-foreground mt-0.5">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-border my-4" aria-hidden="true" />

                  <div className="flex md:flex-col md:items-start items-center justify-between flex-wrap gap-2">
                    <div className="flex flex-col gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[12px] leading-none ${
                          product.available ? 'text-success' : 'text-muted-foreground'
                        }`}
                      >
                        {product.available && (
                          <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
                        )}
                        {product.available ? 'Disponível' : 'Em breve'}
                      </span>
                      <span className="text-[12px] text-muted-foreground">{product.stats}</span>
                    </div>
                    {product.available && (
                      <span className="text-[13px] font-medium text-primary whitespace-nowrap md:mt-2" aria-hidden="true">
                        Acessar docs →
                      </span>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* Built With */}
        <section className="text-center mt-16 px-6">
          <h2 className="font-medium text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
            Construído sobre
          </h2>
          <div className="flex justify-center flex-wrap gap-2 mt-4">
            {['React 19', 'TypeScript', 'Tailwind CSS 4', 'Radix UI', 'shadcn/ui', 'Vite 8'].map(chip => (
              <span
                key={chip}
                className="text-[13px] text-muted-foreground border border-border rounded-full px-3.5 py-1.5 leading-none transition-colors hover:border-primary/40"
              >
                {chip}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center mt-20 py-8 border-t border-border text-[12px] text-muted-foreground">
        Documentação privada · Uso interno RankMyApp · {new Date().getFullYear()}
      </footer>
    </div>
  )
}
