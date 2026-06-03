import { ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ChartCard, ChartSectionScaffold, monthlyData } from '../shared'

interface BarChartsSectionProps {
  activeSection: 'charts-bar-simple' | 'charts-bar' | 'charts-hbar'
  label: string
}

export function BarChartsSection({ activeSection, label }: BarChartsSectionProps) {
  const chartTitle =
    activeSection === 'charts-bar-simple'
      ? 'Bar Chart - Simples'
      : activeSection === 'charts-bar'
        ? 'Stacked Bar'
        : 'Horizontal Bar'

  const chartDescription =
    activeSection === 'charts-bar-simple'
      ? 'Downloads mensais comparados'
      : activeSection === 'charts-bar'
        ? 'Volumes empilhados por mes'
        : 'Comparativo horizontal por mes'

  return (
    <ChartSectionScaffold label={label}>
      <ChartCard title={chartTitle} description={chartDescription}>
        {activeSection === 'charts-hbar' ? (
          <BarChart data={monthlyData} layout="vertical">
            <CartesianGrid horizontal={false} stroke="var(--chart-grid)" />
            <XAxis type="number" hide />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
              width={32}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="myapp" fill="var(--color-myapp)" radius={[0, 4, 4, 0]} />
            <Bar
              dataKey="competitor"
              fill="var(--color-competitor)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        ) : (
          <BarChart data={monthlyData}>
            <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            {activeSection === 'charts-bar' ? (
              <>
                <Bar
                  dataKey="myapp"
                  stackId="a"
                  fill="var(--color-myapp)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="competitor"
                  stackId="a"
                  fill="var(--color-competitor)"
                  radius={[4, 4, 0, 0]}
                />
              </>
            ) : (
              <>
                <Bar
                  dataKey="myapp"
                  fill="var(--color-myapp)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="competitor"
                  fill="var(--color-competitor)"
                  radius={[4, 4, 0, 0]}
                />
              </>
            )}
          </BarChart>
        )}
      </ChartCard>
    </ChartSectionScaffold>
  )
}
