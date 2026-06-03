import React from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'
import { Info, AlertCircle, CheckCircle2, AlertTriangle, Bell } from 'lucide-react'
import { toast } from 'sonner'

// ── Helpers ──────────────────────────────────────────────────────────────────

function PreviewBox({ children, center = true }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`p-8 rounded-xl border border-border bg-card/20 ${center ? 'flex items-center justify-center' : ''}`}>
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2 mt-8 first:mt-0">
      {children}
    </h2>
  )
}

// ── DateRangePicker ───────────────────────────────────────────────────────────

interface ComponentCategoryRendererProps {
  id: string
  label: string
  category?: string
}

export const FeedbackRenderer: React.FC<ComponentCategoryRendererProps> = ({ id, label, category = 'Components' }) => {

  const breadcrumb = (
    <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
      <span>{category}</span> <span>/</span> <span className="text-foreground">{label}</span>
    </div>
  )

  const header = (
    <div className="space-y-3">
      <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">{label}</h1>
      <p className="text-[17px] text-muted-foreground max-w-[640px] leading-relaxed">
        {category === 'Patterns'
          ? <>Padrao de composicao - combina componentes base para resolver um caso de uso especifico. Todos os tokens respondem ao tema ativo.</>
          : <>Demonstracao do componente <span className="font-semibold text-primary">{label}</span>. Todos os tokens respondem ao tema ativo.</>
        }
      </p>
    </div>
  )

if (id === 'alert') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Variantes</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-3 max-w-lg">
          <Alert><Info className="size-4" /><AlertTitle>Informação</AlertTitle><AlertDescription>Uma nova versão está disponível com melhorias de performance.</AlertDescription></Alert>
          <Alert style={{ borderLeftColor: 'var(--success)', background: 'color-mix(in srgb, var(--success) 6%, transparent)' }}>
            <CheckCircle2 className="size-4" style={{ color: 'var(--success)' }} /><AlertTitle>Sucesso</AlertTitle><AlertDescription>Dados importados com sucesso. 1.234 keywords adicionadas.</AlertDescription>
          </Alert>
          <Alert style={{ borderLeftColor: 'var(--warning)', background: 'color-mix(in srgb, var(--warning) 6%, transparent)' }}>
            <AlertTriangle className="size-4" style={{ color: 'var(--warning)' }} /><AlertTitle>Atenção</AlertTitle><AlertDescription>Sua assinatura expira em 7 dias. Renove para manter o acesso.</AlertDescription>
          </Alert>
          <Alert variant="destructive"><AlertCircle className="size-4" /><AlertTitle>Erro na importação</AlertTitle><AlertDescription>O arquivo enviado possui formato inválido ou está corrompido.</AlertDescription></Alert>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'toast') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={() => toast('Ação realizada!')} variant="outline">Toast padrão</Button>
          <Button onClick={() => toast.success('Salvo!', { description: 'Dados atualizados às 15:24.' })} className="bg-success/15 text-success border border-success/30 hover:bg-success/25">Toast sucesso</Button>
          <Button onClick={() => toast.warning('Atenção', { description: 'Verifique os dados antes de prosseguir.' })} className="bg-warning/15 text-warning border border-warning/30 hover:bg-warning/25">Toast aviso</Button>
          <Button onClick={() => toast.error('Erro ao salvar', { description: 'Verifique sua conexão.' })} variant="destructive">Toast erro</Button>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'progress') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Determinate</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-4 max-w-md w-full">
          {[{ label: 'Downloads', value: 68, color: 'var(--primary)' }, { label: 'Instalações', value: 45, color: 'var(--success)' }, { label: 'Desinstalações', value: 23, color: 'var(--error)' }, { label: 'Avaliações', value: 87, color: 'var(--warning)' }].map(({ label: pl, value, color }) => (
            <div key={pl}>
              <div className="flex justify-between text-[13px] mb-1.5">
                <span className="text-muted-foreground">{pl}</span>
                <span className="font-mono font-medium" style={{ color }}>{value}%</span>
              </div>
              <Progress value={value} className="h-2" style={{ '--primary': color } as React.CSSProperties} />
            </div>
          ))}
        </div>
      </PreviewBox>
      <SectionTitle>Tamanhos</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-3 max-w-md w-full">
          <Progress value={60} className="h-1" />
          <Progress value={60} className="h-2" />
          <Progress value={60} className="h-3" />
          <Progress value={60} className="h-4" />
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'spinner') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Tamanhos</SectionTitle>
      <PreviewBox>
        <div className="flex items-end gap-6">
          {[14, 18, 24, 36].map(size => (
            <div key={size} className="flex flex-col items-center gap-2">
              <span className="animate-spin rounded-full border-[2px]" style={{ width: size, height: size, borderColor: `color-mix(in srgb, var(--primary) 18%, transparent)`, borderTopColor: 'var(--primary)', animationDuration: '0.75s' }} />
              <span className="text-[10px] text-muted-foreground">{size}px</span>
            </div>
          ))}
        </div>
      </PreviewBox>
      <SectionTitle>Com texto</SectionTitle>
      <PreviewBox>
        <div className="flex flex-col items-center gap-3">
          <span className="animate-spin rounded-full border-[3px]" style={{ width: 36, height: 36, borderColor: `color-mix(in srgb, var(--primary) 18%, transparent)`, borderTopColor: 'var(--primary)' }} />
          <span className="text-[13px] text-muted-foreground">Carregando dados…</span>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'skeleton') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Card loading</SectionTitle>
      <PreviewBox center={false}>
        <div className="flex items-center gap-4 max-w-sm">
          <Skeleton className="size-12 rounded-full shrink-0" />
          <div className="flex-1 space-y-2"><Skeleton className="h-3.5 w-full" /><Skeleton className="h-3.5 w-4/5" /></div>
        </div>
      </PreviewBox>
      <SectionTitle>Tabela loading</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-2 max-w-lg">
          <div className="flex gap-4 py-2 border-b border-border">
            {['w-1/4', 'w-1/3', 'w-1/5', 'w-1/6'].map(w => <Skeleton key={w} className={`h-3 ${w}`} />)}
          </div>
          {[1,2,3].map(i => (
            <div key={i} className="flex gap-4 py-2 border-b border-border/50">
              {['w-1/4', 'w-1/3', 'w-1/5', 'w-1/6'].map(w => <Skeleton key={w} className={`h-3 ${w}`} />)}
            </div>
          ))}
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'empty-state') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox>
        <div className="flex flex-col items-center text-center p-12 max-w-sm">
          <div className="size-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}>
            <Bell size={24} style={{ color: 'var(--primary)' }} />
          </div>
          <h3 className="text-[18px] font-semibold text-foreground font-display mb-2">Nenhuma keyword monitorada</h3>
          <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">Você ainda não adicionou keywords para monitoramento. Comece agora para ver dados de ranking.</p>
          <Button size="sm">Adicionar keyword</Button>
        </div>
      </PreviewBox>
    </section>
  )

  // ── NAVIGATION ────────────────────────────────────────────────────────────────

  return null
}
