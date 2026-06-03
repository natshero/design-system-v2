import React from 'react'
import { AreaChartSection } from './sections/AreaChartSection'
import { BarChartsSection } from './sections/BarChartsSection'
import { FunnelChartSection } from './sections/FunnelChartSection'
import { LineChartSection } from './sections/LineChartSection'
import { PieChartsSection } from './sections/PieChartsSection'
import { RadarChartSection } from './sections/RadarChartSection'
import { ScatterChartSection } from './sections/ScatterChartSection'
import { TokensOverviewSection } from './sections/TokensOverviewSection'
import { TreemapChartSection } from './sections/TreemapChartSection'

interface ChartsSectionProps {
  activeSection: string
  label: string
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ activeSection, label }) => {
  let content: React.ReactNode

  switch (activeSection) {
    case 'charts-tokens':
      content = <TokensOverviewSection label={label} />
      break
    case 'charts-line':
      content = <LineChartSection label={label} />
      break
    case 'charts-area':
      content = <AreaChartSection label={label} />
      break
    case 'charts-bar-simple':
    case 'charts-bar':
    case 'charts-hbar':
      content = <BarChartsSection activeSection={activeSection} label={label} />
      break
    case 'charts-pie':
    case 'charts-donut':
      content = <PieChartsSection activeSection={activeSection} label={label} />
      break
    case 'charts-funnel':
      content = <FunnelChartSection label={label} />
      break
    case 'charts-radar':
      content = <RadarChartSection label={label} />
      break
    case 'charts-scatter':
      content = <ScatterChartSection label={label} />
      break
    case 'charts-treemap':
      content = <TreemapChartSection label={label} />
      break
    default:
      content = <TokensOverviewSection label={label} />
      break
  }

  return <>{content}</>
}
