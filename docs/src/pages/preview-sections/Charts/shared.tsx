import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'

export interface ChartsSectionProps {
  label: string
}

export const monthlyData = [
  { month: 'Jan', myapp: 186, competitor: 80 },
  { month: 'Fev', myapp: 305, competitor: 200 },
  { month: 'Mar', myapp: 237, competitor: 120 },
  { month: 'Abr', myapp: 73, competitor: 190 },
  { month: 'Mai', myapp: 209, competitor: 130 },
  { month: 'Jun', myapp: 214, competitor: 140 },
]

export const pieData = [
  { name: 'Games', value: 275, fill: 'var(--chart-1)' },
  { name: 'Social', value: 200, fill: 'var(--chart-2)' },
  { name: 'Finance', value: 187, fill: 'var(--chart-3)' },
  { name: 'Health', value: 120, fill: 'var(--chart-4)' },
  { name: 'Travel', value: 90, fill: 'var(--chart-5)' },
]

export const funnelData = [
  { name: 'Impressoes', value: 12000, fill: 'var(--chart-1)' },
  { name: 'Cliques', value: 4800, fill: 'var(--chart-2)' },
  { name: 'Instalacoes', value: 1200, fill: 'var(--chart-3)' },
  { name: 'Ativacoes', value: 480, fill: 'var(--chart-4)' },
  { name: 'Retencao', value: 160, fill: 'var(--chart-5)' },
]

export const radarData = [
  { subject: 'ASO', myapp: 120, competitor: 80 },
  { subject: 'Keywords', myapp: 98, competitor: 90 },
  { subject: 'Reviews', myapp: 86, competitor: 70 },
  { subject: 'Downloads', myapp: 99, competitor: 110 },
  { subject: 'Ratings', myapp: 85, competitor: 60 },
  { subject: 'Creatives', myapp: 65, competitor: 85 },
]

export const scatterData = [
  { x: 1200, y: 4.5, z: 200, name: 'App A' },
  { x: 4800, y: 3.8, z: 800, name: 'App B' },
  { x: 890, y: 4.2, z: 150, name: 'App C' },
  { x: 2400, y: 4.8, z: 400, name: 'App D' },
  { x: 600, y: 3.1, z: 100, name: 'App E' },
  { x: 3600, y: 4.1, z: 600, name: 'App F' },
  { x: 7200, y: 4.6, z: 1200, name: 'App G' },
]

export const treemapData = [
  { name: 'Games', size: 4200 },
  { name: 'Social', size: 3100 },
  { name: 'Finance', size: 2800 },
  { name: 'Health', size: 2200 },
  { name: 'Shopping', size: 1900 },
  { name: 'Travel', size: 1400 },
  { name: 'News', size: 1100 },
  { name: 'Sports', size: 900 },
]

export const TREEMAP_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--chart-6)',
  'var(--chart-7)',
  'var(--chart-8)',
]

export const chartConfig = {
  myapp: { label: 'My App', color: 'var(--chart-my-app)' },
  competitor: { label: 'Competitor', color: 'var(--chart-competitor)' },
  Games: { label: 'Games', color: 'var(--chart-1)' },
  Social: { label: 'Social', color: 'var(--chart-2)' },
  Finance: { label: 'Finance', color: 'var(--chart-3)' },
  Health: { label: 'Health', color: 'var(--chart-4)' },
  Travel: { label: 'Travel', color: 'var(--chart-5)' },
} satisfies ChartConfig

export function ChartSectionScaffold({
  label,
  children,
}: React.PropsWithChildren<ChartsSectionProps>) {
  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
        <span>Graficos</span> <span>/</span> <span className="text-foreground">{label}</span>
      </div>
      <div className="border-b pb-4 border-border">
        <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">
          {label}
        </h1>
        <p className="text-[17px] text-muted-foreground mt-2 leading-relaxed">
          Demonstracao usando Recharts + tokens do tema ativo.
        </p>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function ChartEmptyState({
  message = 'Sem dados para exibir',
  hint,
}: {
  message?: string
  hint?: string
}) {
  return (
    <div className="min-h-[260px] flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/10 text-center px-6">
      <div className="size-10 rounded-full bg-muted/40 flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-muted-foreground"
          aria-hidden="true"
        >
          <path
            d="M3 3l18 18M9 9H3v12h18V9h-6M9 3h6v6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-[14px] font-medium text-foreground">{message}</p>
        {hint ? <p className="text-[12px] text-muted-foreground mt-1">{hint}</p> : null}
      </div>
    </div>
  )
}

export function ChartErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="min-h-[260px] flex flex-col items-center justify-center gap-3 rounded-lg border border-error/20 bg-error/5 text-center px-6">
      <div className="size-10 rounded-full bg-error/10 flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-error"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path
            d="M12 8v4m0 4h.01"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-[14px] font-medium text-foreground">Falha ao carregar dados</p>
        <p className="text-[12px] text-muted-foreground mt-1">
          Verifique sua conexao e tente novamente.
        </p>
      </div>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="mt-1 px-4 py-1.5 text-[12px] font-medium rounded-md border border-border bg-card text-foreground hover:bg-muted transition-colors"
        >
          Tentar novamente
        </button>
      ) : null}
    </div>
  )
}

export function ChartCard({
  title,
  description,
  children,
  maxWidth = 'max-w-2xl',
  summary,
  tableData,
  isEmpty,
  hasError,
  onRetry,
}: {
  title: string
  description: string
  children: React.ReactNode
  maxWidth?: string
  summary?: string
  tableData?: { headers: string[]; rows: (string | number)[][] }
  isEmpty?: boolean
  hasError?: boolean
  onRetry?: () => void
}) {
  return (
    <Card className={maxWidth}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {hasError ? (
          <ChartErrorState onRetry={onRetry} />
        ) : isEmpty ? (
          <ChartEmptyState hint="Adicione dados para visualizar o grafico." />
        ) : (
          <div role="img" aria-label={summary ?? `Grafico ${title}: ${description}`}>
            <ChartContainer config={chartConfig} className="min-h-[260px] w-full">
              {children as React.ReactElement}
            </ChartContainer>
          </div>
        )}

        {tableData ? (
          <details className="mt-2">
            <summary className="text-[12px] text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none py-1">
              Ver dados em tabela
            </summary>
            <div className="mt-2 overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-[12px]" aria-label={`Dados do grafico: ${title}`}>
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    {tableData.headers.map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-3 py-2 text-left font-medium text-muted-foreground"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/20"
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-3 py-2 text-foreground tabular-nums"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        ) : null}
      </CardContent>
    </Card>
  )
}

export const sharedTooltipStyle = {
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  fontSize: 12,
}
