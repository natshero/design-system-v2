import React from 'react'

// Import Sections
import { IntroducaoSection } from './Overview/IntroducaoSection'
import { GettingStartedSection } from './GettingStarted/GettingStartedSection'
import { CoresGradientesSection } from './Foundations/CoresGradientesSection'
import { TipografiaSection } from './Foundations/TipografiaSection'
import { SuperficiesFormasSection } from './Foundations/SuperficiesFormasSection'
import { EspacamentoSection } from './Foundations/EspacamentoSection'
import { ComponentRenderer } from './Components/ComponentRenderer'
import { ChartsSection } from './Charts/ChartsSection'

interface SectionRendererProps {
  activeSection: string
  productId?: string
  navItems: any[]
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ activeSection, productId, navItems }) => {
  // Encontrar o item ativo para pegar o label (nome do componente)
  const activeItem = navItems.find(i => i.id === activeSection)

  const isChartItem = [
    'charts-tokens', 'line-chart', 'area-chart', 'bar-simples', 'stacked-bar', 
    'horizontal-bar', 'pie-chart', 'donut-chart', 'funnel-chart', 'radar-chart', 
    'scatter-chart', 'treemap-chart'
  ].includes(activeSection)

  if (isChartItem) {
    return <ChartsSection activeSection={activeSection} label={activeItem?.label || activeSection} />
  }

  switch (activeSection) {
    case 'introducao':
      return <IntroducaoSection productId={productId} />
    case 'guia-inicio':
      return <GettingStartedSection />
    case 'cores-gradientes':
      return <CoresGradientesSection />
    case 'tipografia':
      return <TipografiaSection />
    case 'superficies-formas':
      return <SuperficiesFormasSection />
    case 'espacamento':
      return <EspacamentoSection />
    default:
      // Se não for fundação, overview nem chart, trata como um componente
      return <ComponentRenderer id={activeSection} label={activeItem?.label || activeSection} />
  }
}

