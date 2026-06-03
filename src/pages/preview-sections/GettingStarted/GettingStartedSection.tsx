import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'

const CodeBlock = ({ language, code, title }: { language: string, code: string, title?: string }) => {
  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="bg-[#0D0D1A] dark:bg-[#09090b] rounded-lg border border-border/50 overflow-hidden mb-6">
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/20 border-b border-border/50 text-[12px] font-mono text-muted-foreground">
        <span>{title || language}</span>
        <button onClick={onCopy} className="hover:text-primary transition-colors flex items-center gap-1.5">
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className="p-4 text-[13px] text-[#BFDBFE] font-mono overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export const GettingStartedSection: React.FC = () => {
  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
        <span className="cursor-pointer hover:text-primary">MI Tool DS</span> <span>/</span> <span>Getting Started</span> <span>/</span> <span>Guia de Início</span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight font-['Space_Grotesk']">Guia de Início</h1>
      <p className="text-[17px] text-muted-foreground max-w-[640px]">Configure o acesso ao registro privado, instale o pacote e construa sua primeira interface.</p>
      
      <h2 className="text-[22px] font-bold font-['Space_Grotesk'] mt-12 mb-6 pb-3 border-b border-border/50">1. Instalar o pacote</h2>
      <CodeBlock language="bash" code={`# Via npm (GitHub Packages — requer autenticação)
npm install @rankmyapp/ds

# Via pnpm
pnpm add @rankmyapp/ds`} />

      <h2 className="text-[22px] font-bold font-['Space_Grotesk'] mt-12 mb-6 pb-3 border-b border-border/50">2. Configurar .npmrc</h2>
      <CodeBlock language=".npmrc" code={`# .npmrc (na raiz do projeto)
@rankmyapp:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}`} />

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex gap-3 text-primary text-[14px]">
        <div className="mt-0.5">ℹ️</div>
        <div>O DS é hospedado no GitHub Packages (registro privado). Você precisará de um Personal Access Token com escopo <code className="bg-primary/20 px-1.5 py-0.5 rounded text-[12px]">read:packages</code>.</div>
      </div>

      <h2 className="text-[22px] font-bold font-['Space_Grotesk'] mt-12 mb-6 pb-3 border-b border-border/50">3. Importar estilos e ThemeProvider</h2>
      <CodeBlock language="tsx" title="main.tsx / App.tsx" code={`import '@rankmyapp/ds/styles'
import { DSThemeProvider } from '@rankmyapp/ds/theme'

function App() {
  return (
    <DSThemeProvider product="mi-tool" respectSystem={true} persist={true}>
      <RouterProvider router={router} />
    </DSThemeProvider>
  )
}`} />

      <h2 className="text-[22px] font-bold font-['Space_Grotesk'] mt-12 mb-6 pb-3 border-b border-border/50">4. Tailwind CSS v4</h2>
      <CodeBlock language="css" title="index.css" code={`@import "tailwindcss";

/*
 * O pacote já inclui todas as variáveis e temas no CSS importado no passo 3.
 * Não é mais necessário criar tailwind.config.ts!
 */`} />

    </section>
  )
}
