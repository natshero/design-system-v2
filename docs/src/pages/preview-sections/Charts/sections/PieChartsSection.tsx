import { ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Cell, Pie, PieChart } from 'recharts'
import { ChartCard, ChartSectionScaffold, pieData } from '../shared'

interface PieChartsSectionProps {
  activeSection: 'charts-pie' | 'charts-donut'
  label: string
}

export function PieChartsSection({ activeSection, label }: PieChartsSectionProps) {
  const isDonut = activeSection === 'charts-donut'

  return (
    <ChartSectionScaffold label={label}>
      <ChartCard
        title={isDonut ? 'Donut Chart' : 'Pie Chart'}
        description="Distribuicao de market share por categoria"
        maxWidth="max-w-lg"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            innerRadius={isDonut ? 65 : 0}
            outerRadius={isDonut ? 105 : 110}
            strokeWidth={2}
            stroke="var(--background)"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <ChartLegend content={<ChartLegendContent />} />
        </PieChart>
      </ChartCard>
    </ChartSectionScaffold>
  )
}
