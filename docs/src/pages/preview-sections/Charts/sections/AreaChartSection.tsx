import { ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { ChartCard, ChartSectionScaffold, monthlyData, type ChartsSectionProps } from '../shared'

export function AreaChartSection({ label }: ChartsSectionProps) {
  return (
    <ChartSectionScaffold label={label}>
      <ChartCard title="Area Chart" description="Volume acumulado com area de gradiente">
        <AreaChart data={monthlyData}>
          <defs>
            <linearGradient id="fillMyapp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-my-app)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--chart-my-app)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="fillCompetitor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-competitor)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--chart-competitor)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            type="monotone"
            dataKey="myapp"
            stroke="var(--color-myapp)"
            fill="url(#fillMyapp)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="competitor"
            stroke="var(--color-competitor)"
            fill="url(#fillCompetitor)"
            strokeWidth={1.5}
          />
        </AreaChart>
      </ChartCard>
    </ChartSectionScaffold>
  )
}
