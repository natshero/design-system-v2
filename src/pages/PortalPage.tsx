import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProductCardProps {
  id: string
  name: string
  description: string
  icon: string
  iconColorClass: string
  available?: boolean
  stats?: string
  path?: string
}

const PRODUCTS: ProductCardProps[] = [
  {
    id: 'mi-tool',
    name: 'MI Tool',
    description: 'Mobile Intelligence & ASO Platform',
    icon: '🧠',
    iconColorClass: 'bg-[#1A88FF]/10',
    stats: '49 componentes · 32 tokens',
    path: '/preview/mi-tool',
    available: true
  },
  {
    id: 'datarank',
    name: 'DataRank',
    description: 'Analytics & Rankings Platform',
    icon: '📊',
    iconColorClass: 'bg-[#8243FF]/10',
    stats: '8 tokens · dark-first',
    path: '/preview/datarank',
    available: true
  },
  {
    id: 'ads-intelligence',
    name: 'Ads Intelligence',
    description: 'AI & GEO Advertising Platform',
    icon: '🎯',
    iconColorClass: 'bg-[#5667EA]/10',
    stats: 'tokens · dark-first',
    path: '/preview/ads-intelligence',
    available: true
  },
  {
    id: 'rankmygeo',
    name: 'RankMyGEO',
    description: 'GEO Visibility & AI Engine Monitoring',
    icon: '🌍',
    iconColorClass: 'bg-[#00A884]/10',
    stats: 'tokens · light-first',
    path: '/preview/rankmygeo',
    available: true
  },
  {
    id: 'rankcommunity',
    name: 'Rank Community',
    description: 'Community & Engagement Platform',
    icon: '🏡',
    iconColorClass: 'bg-[#7C3AED]/10',
    stats: 'tokens · light-first',
    path: '/preview/rankcommunity',
    available: true
  },
  {
    id: 'ri-tool',
    name: 'RI Tool',
    description: 'Reputation Intelligence',
    icon: '🔍',
    iconColorClass: 'bg-[#FF5700]/10',
    stats: '— componentes · — tokens',
    available: false
  }
]

export const PortalPage: React.FC = () => {
  const navigate = useNavigate()
  
  // Initialize dark mode based on existing html class
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    // Set portal theme explicitly
    document.documentElement.setAttribute('data-theme', 'portal')
    return () => {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    if (nextDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
      
      {/* Header */}
      <header className="sticky top-0 z-50 h-16 flex items-center justify-between px-6 bg-background/80 backdrop-blur-md border-b">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary text-primary-foreground font-bold text-[14px]">
            R
          </div>
          <span className="text-sm text-secondary-foreground font-medium">Design System</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-secondary-foreground border rounded-full px-2.5 py-0.5">
            v0.1.0
          </span>
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 border rounded-lg bg-card text-secondary-foreground hover:border-primary/40 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
            aria-label="Alternar tema claro/escuro"
          >
            <span aria-hidden="true" className="text-base">{isDark ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="text-center pt-20 px-6">
          <h1 className="font-bold text-[40px] leading-[1.2] text-foreground font-['Space_Grotesk']">
            RankMyApp Design System
          </h1>
          <p className="text-base text-secondary-foreground max-w-[480px] mx-auto mt-4 leading-[1.6]">
            O sistema unificado de componentes, tokens e padrões
            para todos os produtos RankMyApp.
          </p>
          <div className="w-10 h-[3px] bg-primary rounded-sm mx-auto mt-6" aria-hidden="true"></div>
        </section>

        {/* Stats */}
        <section className="flex justify-center gap-12 mt-10 px-6" aria-label="Números do Design System">
          <div className="text-center">
            <div className="font-['Space_Grotesk'] font-bold text-[28px] text-primary leading-[1.2]">49</div>
            <div className="text-xs text-secondary-foreground uppercase tracking-[0.08em] mt-1">Componentes</div>
          </div>
          <div className="text-center">
            <div className="font-['Space_Grotesk'] font-bold text-[28px] text-primary leading-[1.2]">3</div>
            <div className="text-xs text-secondary-foreground uppercase tracking-[0.08em] mt-1">Idiomas</div>
          </div>
          <div className="text-center">
            <div className="font-['Space_Grotesk'] font-bold text-[28px] text-primary leading-[1.2]">2+</div>
            <div className="text-xs text-secondary-foreground uppercase tracking-[0.08em] mt-1">Produtos</div>
          </div>
        </section>

        {/* Products Section */}
        <section className="max-w-[800px] mx-auto mt-14 px-6">
          <h2 className="font-medium text-[11px] tracking-[0.08em] uppercase text-secondary-foreground mb-5">
            Produtos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRODUCTS.map(product => (
              <article 
                key={product.id}
                onClick={() => product.available && product.path && navigate(product.path)}
                className={`border rounded-2xl p-6 bg-card shadow-sm transition-all duration-200 ${
                  product.available 
                    ? 'cursor-pointer hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 hover:bg-muted/50' 
                    : 'opacity-50 cursor-default'
                }`}
                role={product.available ? "link" : "article"}
                tabIndex={product.available ? 0 : -1}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${product.iconColorClass}`} aria-hidden="true">
                    {product.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-['Space_Grotesk'] font-semibold text-lg text-foreground leading-[1.3]">
                      {product.name}
                    </h3>
                    <p className="text-[13px] text-secondary-foreground mt-0.5">
                      {product.description}
                    </p>
                  </div>
                </div>
                
                <div className="h-[1px] bg-border my-4" aria-hidden="true"></div>
                
                <div className="flex md:flex-col md:items-start items-center justify-between flex-wrap gap-2">
                  <div className="flex flex-col gap-1.5">
                    <span className={`inline-flex items-center gap-1.5 text-[12px] leading-[1] ${product.available ? 'text-[#07C6C3]' : 'text-muted-foreground'}`}>
                      {product.available && <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true"></span>}
                      {product.available ? 'Disponível' : 'Em breve'}
                    </span>
                    <span className="text-[12px] text-muted-foreground">
                      {product.stats}
                    </span>
                  </div>
                  {product.available && (
                    <span className="text-[13px] font-medium text-primary whitespace-nowrap md:mt-2 group-hover:text-accent">
                      Acessar docs &rarr;
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Built With */}
        <section className="text-center mt-16 px-6">
          <h2 className="font-medium text-[11px] tracking-[0.08em] uppercase text-secondary-foreground">
            Construído sobre
          </h2>
          <div className="flex justify-center flex-wrap gap-2 mt-4">
            {['React 19', 'TypeScript', 'Tailwind CSS 4', 'Radix UI', 'Shadcn', 'Vite 8'].map(chip => (
              <span key={chip} className="text-[13px] text-secondary-foreground border rounded-full px-3.5 py-1.5 leading-[1.4] transition-colors hover:border-primary/40">
                {chip}
              </span>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center mt-20 py-8 border-t text-[12px] text-muted-foreground">
        Documentação privada &middot; Uso interno RankMyApp &middot; {new Date().getFullYear()}
      </footer>
    </div>
  )
}
