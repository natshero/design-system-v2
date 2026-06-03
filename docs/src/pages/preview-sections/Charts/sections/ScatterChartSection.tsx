import type { ScatterShapeProps } from 'recharts'
import { CartesianGrid, Scatter, ScatterChart, Tooltip as RechartsTooltip, XAxis, YAxis, ZAxis } from 'recharts'
import { ChartCard, ChartSectionScaffold, scatterData, type ChartsSectionProps } from '../shared'

export function ScatterChartSection({ label }: ChartsSectionProps) {
  return (
    <ChartSectionScaffold label={label}>
      <ChartCard
        title="Scatter / Bubble"
        description="Downloads vs Rating - tamanho proporcional ao volume de reviews"
      >
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
          <XAxis
            type="number"
            dataKey="x"
            name="Downloads"
            tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
            tickFormatter={(value) => `${(Number(value) / 1000).toFixed(0)}K`}
            label={{
              value: 'Downloads',
              position: 'insideBottom',
              offset: -4,
              fill: 'var(--muted-foreground)',
              fontSize: 11,
            }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Rating"
            domain={[2.5, 5]}
            tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
            label={{
              value: 'Rating',
              angle: -90,
              position: 'insideLeft',
              fill: 'var(--muted-foreground)',
              fontSize: 11,
            }}
          />
          <ZAxis type="number" dataKey="z" range={[60, 400]} />
          <RechartsTooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ payload }) => {
              if (!payload?.length) {
                return null
              }

              const point = payload[0].payload as { name: string; x: number; y: number }

              return (
                <div className="rounded-lg border border-border bg-card px-3 py-2 text-[12px] shadow-md">
                  <p className="font-semibold text-foreground">{point.name}</p>
                  <p className="text-muted-foreground">
                    {point.x.toLocaleString()} downloads · {point.y}
                  </p>
                </div>
              )
            }}
          />
          <Scatter
            data={scatterData}
            fill="var(--chart-1)"
            fillOpacity={0.65}
            stroke="var(--chart-1)"
            strokeWidth={1.5}
            shape={(props: ScatterShapeProps) => {
              const { cx = 0, cy = 0, r = 8 } = props as ScatterShapeProps & { r?: number }
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="var(--chart-1)"
                  fillOpacity={0.65}
                  stroke="var(--background)"
                  strokeWidth={2}
                />
              )
            }}
          />
        </ScatterChart>
      </ChartCard>
    </ChartSectionScaffold>
  )
}
