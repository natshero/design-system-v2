import React from 'react'

function CodeBlock({ filename, children }: { filename: string; children: string }) {
  const [copied, setCopied] = React.useState(false)
  const copy = () => {
    navigator.clipboard.writeText(children).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) })
  }
  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/60 border-b border-border">
        <span className="text-xs font-mono text-muted-foreground">{filename}</span>
        <button onClick={copy} className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-[var(--code-bg)] text-[var(--code-text)] text-[13px] font-mono leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  )
}

function Callout({ type, children }: { type: 'info' | 'warning' | 'tip'; children: React.ReactNode }) {
  const s = {
    info:    { bg: 'bg-primary/5 border-primary/20', icon: '◈', cls: 'text-primary' },
    warning: { bg: 'bg-warning/5 border-warning/20', icon: '▲', cls: 'text-warning' },
    tip:     { bg: 'bg-success/5 border-success/20', icon: '✦', cls: 'text-success' },
  }[type]
  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${s.bg} text-[14px]`}>
      <span className={`shrink-0 font-bold ${s.cls}`} aria-hidden="true">{s.icon}</span>
      <div className="leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

export const ConfiguracaoSection: React.FC = () => (
  <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
    <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
      <span>Getting Started</span> <span>/</span> <span className="text-foreground">Configuração</span>
    </div>

    <div className="space-y-3">
      <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">
        Configuração
      </h1>
      <p className="text-[17px] text-muted-foreground max-w-[640px] leading-relaxed">
        Importe os estilos, aplique o tema do produto e configure o Tailwind. São 3 passos.
      </p>
    </div>

    {/* PASSO 1 */}
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="size-6 rounded-full bg-primary/15 text-primary text-[12px] font-bold flex items-center justify-center shrink-0">1</span>
        <h2 className="text-[22px] font-semibold font-display text-foreground">
          Importar os estilos
        </h2>
      </div>
      <p className="text-[14px] text-muted-foreground pl-9">
        No entry point da aplicação — importa as CSS vars de todos os temas:
      </p>
      <CodeBlock filename="main.tsx">
{`// Importa src/styles/themes.css — CSS vars de todos os produtos
import '@rankmyapp/ds/styles'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>
)`}
      </CodeBlock>
    </div>

    {/* PASSO 2 */}
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="size-6 rounded-full bg-primary/15 text-primary text-[12px] font-bold flex items-center justify-center shrink-0">2</span>
        <h2 className="text-[22px] font-semibold font-display text-foreground">
          Aplicar o tema do produto
        </h2>
      </div>
      <p className="text-[14px] text-muted-foreground pl-9">
        O tema é controlado por <code className="font-mono text-primary text-[12px]">data-theme</code> no elemento{' '}
        <code className="font-mono text-primary text-[12px]">&lt;html&gt;</code> + classe{' '}
        <code className="font-mono text-primary text-[12px]">.dark</code> ou{' '}
        <code className="font-mono text-primary text-[12px]">.light</code> para o modo:
      </p>
      <CodeBlock filename="App.tsx">
{`import { useEffect, useState } from 'react'

// Modos por produto:
//   dark-first  → MI Tool, DataRank, Ads, GEO  (padrão = dark, .light = override)
//   light-first → Rank Community               (padrão = light, .dark = override)
const DARK_FIRST = ['mi-tool', 'datarank', 'ads-intelligence', 'rankmygeo']

export function App() {
  const [isDark, setIsDark] = useState(true) // MI Tool começa dark

  useEffect(() => {
    const html = document.documentElement

    // 1. Ativa o tema do produto via data-theme
    html.setAttribute('data-theme', 'mi-tool')

    // 2. Define o modo (dark-first: sem classe = dark)
    if (isDark) {
      html.classList.remove('light')
    } else {
      html.classList.add('light')
    }

    return () => {
      html.removeAttribute('data-theme')
      html.classList.remove('dark', 'light')
    }
  }, [isDark])

  return (
    <>
      <RouterProvider router={router} />
      <button onClick={() => setIsDark(d => !d)}>
        Modo {isDark ? 'claro' : 'escuro'}
      </button>
    </>
  )
}`}
      </CodeBlock>
      <Callout type="info">
        Não existe um <code className="font-mono text-foreground bg-muted px-1 rounded text-[12px]">ThemeProvider</code> exportado
        pelo DS. O sistema é baseado em CSS variables nativas — basta controlar o atributo{' '}
        <code className="font-mono text-foreground bg-muted px-1 rounded text-[12px]">data-theme</code> e a
        classe <code className="font-mono text-foreground bg-muted px-1 rounded text-[12px]">.dark / .light</code>.
      </Callout>
    </div>

    {/* PASSO 3 */}
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="size-6 rounded-full bg-primary/15 text-primary text-[12px] font-bold flex items-center justify-center shrink-0">3</span>
        <h2 className="text-[22px] font-semibold font-display text-foreground">
          Configurar Tailwind
        </h2>
      </div>
      <p className="text-[14px] text-muted-foreground pl-9">
        Use o preset do DS para herdar automaticamente os tokens, breakpoints e famílias de fonte:
      </p>
      <CodeBlock filename="tailwind.config.ts">
{`import { tailwindPreset } from '@rankmyapp/ds/tailwind'
import type { Config } from 'tailwindcss'

export default {
  presets: [tailwindPreset],
  content: [
    './src/**/*.{ts,tsx}',
    // Necessário para incluir as classes usadas nos componentes do DS
    './node_modules/@rankmyapp/ds/dist/**/*.js',
  ],
} satisfies Config`}
      </CodeBlock>
    </div>

    {/* CSS vars disponíveis */}
    <div className="space-y-3">
      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">
        CSS vars disponíveis após configuração
      </h2>
      <p className="text-[14px] text-muted-foreground">
        Todas mudam automaticamente conforme o <code className="font-mono text-primary text-[12px]">data-theme</code> ativo:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] font-mono">
        {[
          ['--primary',          'Cor brand do produto (ex: #1A88FF no MI Tool)'],
          ['--background',       'Fundo da página'],
          ['--card',             'Fundo de cards e modais'],
          ['--foreground',       'Texto principal'],
          ['--muted-foreground', 'Texto secundário'],
          ['--border',           'Cor de bordas'],
          ['--sidebar-bg',       'Fundo da sidebar (sempre escura)'],
          ['--chart-1',          'Série 1 de gráficos (= brand do produto)'],
          ['--success',          '#07C6C3 — compartilhado entre produtos'],
          ['--error',            '#E24B4A — compartilhado entre produtos'],
        ].map(([token, desc]) => (
          <div key={token} className="flex gap-2 p-2 rounded bg-muted/30 border border-border/50 items-center">
            <code className="text-primary shrink-0 text-[11px]">{token}</code>
            <span className="text-muted-foreground text-[11px]">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
)
