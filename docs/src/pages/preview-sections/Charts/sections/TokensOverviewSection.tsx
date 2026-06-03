import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  ChartCard,
  ChartEmptyState,
  ChartErrorState,
  ChartSectionScaffold,
  monthlyData,
  type ChartsSectionProps,
} from '../shared'

export function TokensOverviewSection({ label }: ChartsSectionProps) {
  return (
    <ChartSectionScaffold label={label}>
      <div className="space-y-10">
        <div>
          <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2 mb-4">
            Data Series (1-8)
          </h2>
          <p className="text-[14px] text-muted-foreground mb-5">
            Series 1 e 6 seguem o brand do produto ativo. Series 2-5 e 7-8 sao
            compartilhadas entre todos os produtos.
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
              <div
                key={value}
                className="flex flex-col rounded-xl border border-border overflow-hidden"
              >
                <div className="h-16" style={{ background: `var(--chart-${value})` }} />
                <div className="p-2 bg-card">
                  <div className="text-[12px] font-semibold text-foreground">Serie {value}</div>
                  <code className="text-[10px] font-mono text-muted-foreground">
                    --chart-{value}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2 mb-4">
            Tokens Semanticos
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { token: '--chart-my-app', label: 'My App', desc: 'App monitorado' },
              { token: '--chart-competitor', label: 'Competitor', desc: 'Concorrentes' },
              { token: '--chart-positive', label: 'Positive', desc: 'Crescimento' },
              { token: '--chart-negative', label: 'Negative', desc: 'Queda' },
              { token: '--chart-neutral', label: 'Neutral', desc: 'Estavel' },
              { token: '--chart-band', label: 'Band', desc: 'Faixa de fundo' },
              { token: '--chart-grid', label: 'Grid', desc: 'Linhas de grade' },
              { token: '--chart-axis', label: 'Axis', desc: 'Eixos' },
            ].map(({ token, label: tokenLabel, desc }) => (
              <div
                key={token}
                className="rounded-xl border border-border overflow-hidden bg-card"
              >
                <div className="h-10" style={{ background: `var(${token})` }} />
                <div className="p-2">
                  <div className="text-[11px] font-semibold text-foreground">{tokenLabel}</div>
                  <code className="text-[10px] font-mono text-muted-foreground block">{token}</code>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2 mb-4">
            Estados dos graficos
          </h2>
          <p className="text-[14px] text-muted-foreground mb-5">
            Todo grafico precisa tratar <strong className="text-foreground">sem dados</strong>{' '}
            e <strong className="text-foreground">falha de carregamento</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-[15px]">Empty State</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartEmptyState hint="Adicione dados para visualizar." />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-[15px]">Error State</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartErrorState onRetry={() => window.alert('Retry!')} />
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2 mb-4">
            Exemplo em contexto
          </h2>
          <ChartCard title="App vs Concorrente" description="Usando chart-my-app e chart-competitor">
            <LineChart data={monthlyData}>
              <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="myapp"
                stroke="var(--color-myapp)"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="competitor"
                stroke="var(--color-competitor)"
                strokeWidth={2}
                strokeDasharray="4 2"
                dot={false}
              />
            </LineChart>
          </ChartCard>
        </div>
      </div>
    </ChartSectionScaffold>
  )
}
