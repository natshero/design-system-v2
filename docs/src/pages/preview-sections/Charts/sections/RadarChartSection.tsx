import { ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Tooltip as RechartsTooltip } from 'recharts'
import { ChartCard, ChartSectionScaffold, radarData, sharedTooltipStyle, type ChartsSectionProps } from '../shared'

export function RadarChartSection({ label }: ChartsSectionProps) {
  return (
    <ChartSectionScaffold label={label}>
      <ChartCard
        title="Radar Chart"
        description="Score de performance - My App vs Concorrente"
        maxWidth="max-w-xl"
      >
        <RadarChart data={radarData}>
          <PolarGrid stroke="var(--chart-grid)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
          />
          <Radar
            name="My App"
            dataKey="myapp"
            stroke="var(--color-myapp)"
            fill="var(--color-myapp)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Radar
            name="Competitor"
            dataKey="competitor"
            stroke="var(--color-competitor)"
            fill="var(--color-competitor)"
            fillOpacity={0.12}
            strokeWidth={1.5}
            strokeDasharray="4 2"
          />
          <ChartLegend content={<ChartLegendContent />} />
          <RechartsTooltip contentStyle={sharedTooltipStyle} />
        </RadarChart>
      </ChartCard>
    </ChartSectionScaffold>
  )
}
