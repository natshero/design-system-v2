import { Treemap } from 'recharts'
import {
  ChartCard,
  ChartSectionScaffold,
  TREEMAP_COLORS,
  treemapData,
  type ChartsSectionProps,
} from '../shared'

export function TreemapChartSection({ label }: ChartsSectionProps) {
  return (
    <ChartSectionScaffold label={label}>
      <ChartCard title="Treemap" description="Distribuicao de volume por categoria de app">
        <Treemap
          data={treemapData}
          dataKey="size"
          aspectRatio={4 / 3}
          content={({ x, y, width, height, name, value, index }) => {
            const colorIndex = (index ?? 0) % TREEMAP_COLORS.length
            if ((width ?? 0) < 30 || (height ?? 0) < 20) {
              return <g />
            }

            return (
              <g>
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  style={{
                    fill: TREEMAP_COLORS[colorIndex],
                    stroke: 'var(--background)',
                    strokeWidth: 2,
                    opacity: 0.85,
                  }}
                />
                {(width ?? 0) > 60 && (height ?? 0) > 30 ? (
                  <>
                    <text
                      x={(x ?? 0) + (width ?? 0) / 2}
                      y={(y ?? 0) + (height ?? 0) / 2 - 6}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize={13}
                      fontWeight={600}
                    >
                      {name}
                    </text>
                    <text
                      x={(x ?? 0) + (width ?? 0) / 2}
                      y={(y ?? 0) + (height ?? 0) / 2 + 10}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.75)"
                      fontSize={11}
                    >
                      {Number(value).toLocaleString()}
                    </text>
                  </>
                ) : null}
              </g>
            )
          }}
        />
      </ChartCard>
    </ChartSectionScaffold>
  )
}
