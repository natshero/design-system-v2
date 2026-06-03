import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card, CardContent, CardHeader, CardTitle, CardFooter,
} from '@/components/ui/card'

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

export const UsoBasicoSection: React.FC = () => {
  const [nome, setNome] = useState('')
  const [pkg, setPkg]   = useState('')

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
        <span>Getting Started</span> <span>/</span> <span className="text-foreground">Uso Básico</span>
      </div>

      <div className="space-y-3">
        <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">
          Uso Básico
        </h1>
        <p className="text-[17px] text-muted-foreground max-w-[640px] leading-relaxed">
          Importe componentes de <code className="font-mono text-primary">@rankmyapp/ds</code> e
          construa interfaces com os tokens do tema ativo.
        </p>
      </div>

      {/* Exemplo 1 — Formulário */}
      <div className="space-y-2">
        <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">
          Exemplo — Formulário com Card
        </h2>
        <p className="text-[14px] text-muted-foreground">
          Os sub-componentes do Card são importados separadamente (não usa dot notation):
        </p>
        <CodeBlock filename="NovaAnalise.tsx">
{`import {
  Button,
  Input, Label,
  Card, CardHeader, CardTitle, CardContent, CardFooter,
} from '@rankmyapp/ds'

export function NovaAnalise() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Análise</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="app-name">Nome do app</Label>
          <Input
            id="app-name"
            placeholder="ex: com.nubank.android"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pkg-name">Package name</Label>
          <Input
            id="pkg-name"
            placeholder="br.com.meuapp"
          />
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button>Adicionar</Button>
      </CardFooter>
    </Card>
  )
}`}
        </CodeBlock>
      </div>

      {/* Preview interativo */}
      <div className="space-y-3">
        <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">
          Preview interativo
        </h2>
        <div className="p-8 rounded-xl bg-background border border-border flex items-center justify-center">
          <Card className="w-full max-w-[400px]">
            <CardHeader>
              <CardTitle className="text-[15px] font-semibold">Nova Análise</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="preview-app" className="text-[13px] font-medium">Nome do app</Label>
                <Input
                  id="preview-app"
                  placeholder="ex: com.nubank.android"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="preview-pkg" className="text-[13px] font-medium">Package name</Label>
                <Input
                  id="preview-pkg"
                  placeholder="br.com.meuapp"
                  value={pkg}
                  onChange={e => setPkg(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => { setNome(''); setPkg('') }}>
                Cancelar
              </Button>
              <Button size="sm" disabled={!nome || !pkg}>
                Adicionar
              </Button>
            </CardFooter>
          </Card>
        </div>
        <p className="text-[12px] text-muted-foreground text-center">
          Os tokens mudam automaticamente ao trocar o produto — experimente navegar para DataRank e voltar.
        </p>
      </div>

      {/* Exemplo 2 — Badge e Alert */}
      <div className="space-y-2">
        <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">
          Exemplo — Badge e feedback
        </h2>
        <CodeBlock filename="StatusExample.tsx">
{`import { Badge, Alert, AlertTitle, AlertDescription, Spinner } from '@rankmyapp/ds'

export function Status() {
  return (
    <div className="flex flex-col gap-4">
      {/* Badges */}
      <div className="flex gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Erro</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>

      {/* Alert */}
      <Alert>
        <AlertTitle>Sincronização concluída</AlertTitle>
        <AlertDescription>
          1.234 keywords atualizadas com sucesso.
        </AlertDescription>
      </Alert>

      {/* Spinner */}
      <Spinner size="md" />
    </div>
  )
}`}
        </CodeBlock>
      </div>

      {/* Importações disponíveis */}
      <div className="space-y-2">
        <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">
          O que está disponível em <code className="font-mono text-primary text-[18px]">@rankmyapp/ds</code>
        </h2>
        <CodeBlock filename="imports-referencia.ts">
{`// ── Inputs & Form
import {
  Button, Input, Textarea, Label,
  Checkbox, RadioGroup, Select, Switch, Toggle,
  Slider, Calendar,
} from '@rankmyapp/ds'

// ── Layout & Estrutura
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter,
  Accordion, Separator, Table, Tabs, Breadcrumb,
  Pagination,
} from '@rankmyapp/ds'

// ── Feedback & Display
import {
  Alert, AlertTitle, AlertDescription,
  Badge, Progress, Skeleton, Avatar,
  AvatarImage, AvatarFallback,
  Spinner,    // <Spinner size="sm|md|lg" />
  Toaster,    // adicionar em App.tsx para toasts
} from '@rankmyapp/ds'

// ── Overlays
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogTrigger,
  Sheet, SheetContent, SheetTrigger,
  Popover, PopoverContent, PopoverTrigger,
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger,
} from '@rankmyapp/ds'

// ── Utilitário
import { cn } from '@rankmyapp/ds'  // cn('class-a', condition && 'class-b')`}
        </CodeBlock>
      </div>
    </section>
  )
}
