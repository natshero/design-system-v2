import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'

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

export const LayoutRenderer: React.FC<ComponentCategoryRendererProps> = ({ id, label, category = 'Components' }) => {

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

if (id === 'aspect-ratio') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Proporções comuns</SectionTitle>
      <PreviewBox center={false}>
        <div className="grid grid-cols-3 gap-4">
          {[{ ratio: 16/9, label: '16:9 — Vídeo' }, { ratio: 1, label: '1:1 — Quadrado' }, { ratio: 4/3, label: '4:3 — Clássico' }].map(({ ratio, label: al }) => (
            <div key={al}>
              <AspectRatio ratio={ratio} className="bg-muted/50 border border-border rounded-lg overflow-hidden">
                <div className="flex flex-col items-center justify-center size-full text-[11px] text-muted-foreground gap-1">
                  <span className="font-mono font-medium">{al.split(' — ')[0]}</span>
                </div>
              </AspectRatio>
              <p className="text-[11px] text-muted-foreground text-center mt-1">{al}</p>
            </div>
          ))}
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'resizable') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Painel redimensionável horizontal</SectionTitle>
      <PreviewBox center={false}>
        <ResizablePanelGroup direction={"horizontal" as const} className="h-40 rounded-lg border border-border overflow-hidden w-full">
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="h-full p-4 flex flex-col gap-2" style={{ background: 'var(--sidebar-bg)' }}>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Sidebar</span>
              {['Dashboard', 'Keywords', 'Reviews'].map(i => <div key={i} className="text-[12px] text-muted-foreground">{i}</div>)}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>
            <div className="h-full p-4 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-16 rounded-lg mt-3" />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </PreviewBox>
      <SectionTitle>Vertical</SectionTitle>
      <PreviewBox center={false}>
        <ResizablePanelGroup direction={"vertical" as const} className="h-48 rounded-lg border border-border overflow-hidden w-full">
          <ResizablePanel defaultSize={40}>
            <div className="h-full p-4 bg-card"><Skeleton className="h-3 w-1/2 mb-2" /><Skeleton className="h-16 rounded" /></div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60}>
            <div className="h-full p-4"><Skeleton className="h-3 w-1/3 mb-2" /><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-4/5 mt-1" /></div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </PreviewBox>
    </section>
  )

  if (id === 'scroll-area') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Lista rolável</SectionTitle>
      <PreviewBox>
        <ScrollArea className="h-56 w-72 rounded-md border p-4">
          <div className="space-y-2">
            {[12,8,45,3,27,19,6,33,41,2,15,38,7,22,49,11,30,5,17,44].map((vol, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0">
                <span className="text-[13px] text-foreground">keyword-{String(i + 1).padStart(2, '0')}</span>
                <Badge variant="secondary" className="text-[11px]">{vol}K</Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PreviewBox>
    </section>
  )

  // ── PATTERNS ─────────────────────────────────────────────────────────────────

  return null
}

