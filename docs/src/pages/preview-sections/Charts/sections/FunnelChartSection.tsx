import { Cell, Funnel, FunnelChart, LabelList, Tooltip as RechartsTooltip } from 'recharts'
import { ChartCard, ChartSectionScaffold, funnelData, sharedTooltipStyle, type ChartsSectionProps } from '../shared'

export function FunnelChartSection({ label }: ChartsSectionProps) {
  return (
    <ChartSectionScaffold label={label}>
      <ChartCard
        title="Funnel Chart"
        description="Funil de aquisicao - impressoes ate retencao"
        maxWidth="max-w-xl"
      >
        <FunnelChart>
          <RechartsTooltip
            formatter={(value: unknown) => [Number(value).toLocaleString(), '']}
            contentStyle={sharedTooltipStyle}
          />
          <Funnel dataKey="value" data={funnelData} isAnimationActive>
            {funnelData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList dataKey="name" position="right" fill="var(--foreground)" fontSize={12} />
            <LabelList
              dataKey="value"
              position="center"
              fill="#fff"
              fontSize={11}
              fontWeight={600}
              formatter={(value: unknown) => Number(value).toLocaleString()}
            />
          </Funnel>
        </FunnelChart>
      </ChartCard>
    </ChartSectionScaffold>
  )
}
