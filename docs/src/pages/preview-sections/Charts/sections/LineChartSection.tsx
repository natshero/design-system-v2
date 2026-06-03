import { ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { ChartCard, ChartSectionScaffold, monthlyData, type ChartsSectionProps } from '../shared'

export function LineChartSection({ label }: ChartsSectionProps) {
  return (
    <ChartSectionScaffold label={label}>
      <ChartCard
        title="Line Chart"
        description="Comparativo de crescimento mensal - My App vs Concorrente"
        summary="Grafico de linha: My App lidera com pico em Fevereiro (305 downloads). Concorrente estavel entre 80 e 200."
        tableData={{
          headers: ['Mes', 'My App', 'Concorrente'],
          rows: monthlyData.map((item) => [item.month, item.myapp, item.competitor]),
        }}
      >
        <LineChart data={monthlyData}>
          <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            type="monotone"
            dataKey="myapp"
            stroke="var(--color-myapp)"
            strokeWidth={2.5}
            dot={{ fill: 'var(--color-myapp)', r: 3 }}
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
    </ChartSectionScaffold>
  )
}
