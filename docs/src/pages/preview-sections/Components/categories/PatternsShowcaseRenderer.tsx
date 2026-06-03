import React from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TrendingUp, TrendingDown, Minus, ChevronRight, Home, ArrowUpRight, ArrowDownRight } from 'lucide-react'

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

export const PatternsShowcaseRenderer: React.FC<ComponentCategoryRendererProps> = ({ id, label, category = 'Components' }) => {

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

if (id === 'metric-card') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>MetricCard</SectionTitle>
      <PreviewBox center={false}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Downloads', value: '12.847', delta: '+20.1%', type: 'up' },
            { label: 'Avaliação', value: '4.7 ★', delta: '+0.2', type: 'up' },
            { label: 'Uninstalls', value: '1.203', delta: '-5.4%', type: 'down' },
            { label: 'Ranking', value: '#12', delta: '—', type: 'neutral' },
          ].map(({ label: ml, value, delta, type }) => (
            <Card key={ml} className="min-w-[140px]">
              <CardContent className="p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  {type === 'up' && <TrendingUp size={12} className="text-success" />}
                  {type === 'down' && <TrendingDown size={12} className="text-error" />}
                  {type === 'neutral' && <Minus size={12} className="text-muted-foreground" />}
                  {ml}
                </div>
                <div className="font-display font-bold text-[26px] text-foreground leading-none">{value}</div>
                <div className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${type === 'up' ? 'bg-success/10 text-success' : type === 'down' ? 'bg-error/10 text-error' : 'bg-muted/50 text-muted-foreground'}`}>
                  {type === 'up' && <ArrowUpRight size={10} />}
                  {type === 'down' && <ArrowDownRight size={10} />}
                  {delta}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'datatable') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Tabela de Keywords</SectionTitle>
      <PreviewBox center={false}>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="text-[11px] uppercase tracking-wider">Keyword</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider">Volume</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider">Rank</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider">Tendência</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-right">Delta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { kw: 'rankmyapp', vol: '12.4K', rank: 1, trend: 'up', delta: '+3' },
                { kw: 'aso tools', vol: '8.9K', rank: 5, trend: 'up', delta: '+1' },
                { kw: 'app marketing', vol: '5.3K', rank: 12, trend: 'down', delta: '-2' },
                { kw: 'mobile growth', vol: '3.1K', rank: 18, trend: 'neutral', delta: '—' },
              ].map(({ kw, vol, rank, trend, delta }) => (
                <TableRow key={kw} className="hover:bg-muted/20">
                  <TableCell className="font-medium text-foreground">{kw}</TableCell>
                  <TableCell className="text-muted-foreground">{vol}</TableCell>
                  <TableCell><span className="font-display font-bold text-primary">#{rank}</span></TableCell>
                  <TableCell>
                    {trend === 'up' && <TrendingUp size={14} className="text-success" />}
                    {trend === 'down' && <TrendingDown size={14} className="text-error" />}
                    {trend === 'neutral' && <Minus size={14} className="text-muted-foreground" />}
                  </TableCell>
                  <TableCell className={`text-right font-medium font-display ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground'}`}>{delta}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'appshell') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox center={false}>
        <div className="border border-border rounded-xl overflow-hidden w-full">
          <div className="h-11 bg-card border-b border-border flex items-center px-4 justify-between">
            <div className="flex items-center gap-2">
              <div className="size-5 rounded flex items-center justify-center text-[10px] font-bold text-white" style={{ background: 'var(--primary)' }}>R</div>
              <span className="text-[13px] font-medium text-foreground">MI Tool</span>
            </div>
            <div className="flex items-center gap-2"><Skeleton className="h-6 w-24 rounded-full" /><Skeleton className="h-7 w-7 rounded-full" /></div>
          </div>
          <div className="flex h-40 bg-background">
            <div className="w-40 border-r border-border p-3 space-y-1.5" style={{ background: 'var(--sidebar-bg)' }}>
              {[true, false, false, false].map((active, i) => (
                <div key={i} className="h-5 rounded-[4px]" style={{ background: active ? 'var(--sidebar-active-bg)' : 'rgba(255,255,255,0.04)' }} />
              ))}
            </div>
            <div className="flex-1 p-4 space-y-3">
              <Skeleton className="h-4 w-1/3" />
              <div className="grid grid-cols-4 gap-2">{[1,2,3,4].map(i => <Skeleton key={i} className="h-10 rounded-lg" />)}</div>
              <Skeleton className="h-16 rounded-lg" />
            </div>
          </div>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'page-header') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox center={false}>
        <div className="space-y-4 max-w-lg">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
            <Home size={10} /><ChevronRight size={10} /><span>Keywords</span><ChevronRight size={10} /><span className="text-foreground">Monitoramento</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[26px] font-bold font-display tracking-tight text-foreground leading-tight">Monitoramento de Keywords</h1>
              <p className="text-[14px] text-muted-foreground mt-1">128 keywords · Atualizado há 5 min</p>
            </div>
            <div className="flex gap-2 shrink-0 mt-1">
              <Button variant="outline" size="sm">Exportar</Button>
              <Button size="sm">+ Adicionar</Button>
            </div>
          </div>
          <Separator />
        </div>
      </PreviewBox>
    </section>
  )

  return null
}

