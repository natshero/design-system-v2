import React from 'react'
import { Badge } from '@/components/ui/badge'

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

export const InstalacaoSection: React.FC = () => (
  <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
    <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
      <span>Getting Started</span> <span>/</span> <span className="text-foreground">Instalação</span>
    </div>

    <div className="space-y-3">
      <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">
        Instalação
      </h1>
      <p className="text-[17px] text-muted-foreground max-w-[640px] leading-relaxed">
        Configure o acesso ao registro privado do GitHub Packages e instale o pacote.
      </p>
    </div>

    <Callout type="warning">
      O pacote ainda não foi publicado no registro. Para uso local durante o desenvolvimento,
      use <code className="font-mono text-foreground bg-muted px-1 rounded text-[12px]">workspace:*</code> em
      um monorepo pnpm ou copie a pasta diretamente.
    </Callout>

    <div className="space-y-2">
      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">
        Instalar o pacote
      </h2>
      <CodeBlock filename="terminal">
{`# Via pnpm (recomendado)
pnpm add @natshero/rankmyapp-ds

# Via npm
npm install @natshero/rankmyapp-ds`}
      </CodeBlock>
    </div>

    <div className="space-y-2">
      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">
        Configurar .npmrc (GitHub Packages)
      </h2>
      <p className="text-[14px] text-muted-foreground">
        O DS é hospedado no GitHub Packages (registro privado). Crie o arquivo na raiz do projeto:
      </p>
      <CodeBlock filename=".npmrc">
{`@natshero:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}`}
      </CodeBlock>
      <Callout type="info">
        Você precisará de um <strong>Personal Access Token</strong> com
        escopo <code className="font-mono text-primary bg-primary/10 px-1 rounded text-[12px]">read:packages</code> para
        autenticar no registro privado.
      </Callout>
    </div>

    <div className="space-y-2">
      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">
        Verificar instalação
      </h2>
      <CodeBlock filename="terminal">
{`# Confirmar versão instalada
node -e "const p = require('@natshero/rankmyapp-ds/package.json'); console.log('v' + p.version)"`}
      </CodeBlock>
    </div>

    <div className="flex flex-wrap gap-2 pt-2">
      {['GitHub Packages', 'pnpm', 'npm', 'Tailwind v4', 'React 19', 'Shadcn/UI'].map(tag => (
        <Badge key={tag} variant="secondary" className="bg-muted/50 text-muted-foreground border border-border/50 font-normal">
          {tag}
        </Badge>
      ))}
    </div>
  </section>
)
