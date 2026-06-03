import React from 'react'
import { ChartsSection } from './Charts/ChartsSection'
import { ComponentRenderer } from './Components/ComponentRenderer'
import { BorderRadiusSection } from './Foundations/BorderRadiusSection'
import { CoresSection } from './Foundations/CoresSection'
import { EspacamentoSection } from './Foundations/EspacamentoSection'
import { GradienteSection } from './Foundations/GradienteSection'
import { SombrasSection } from './Foundations/SombrasSection'
import { TipografiaSection } from './Foundations/TipografiaSection'
import { ConfiguracaoSection } from './GettingStarted/ConfiguracaoSection'
import { InstalacaoSection } from './GettingStarted/InstalacaoSection'
import { UsoBasicoSection } from './GettingStarted/UsoBasicoSection'
import { IntroducaoSection } from './Overview/IntroducaoSection'
import { PatternsRenderer } from './Patterns/PatternsRenderer'

interface SectionRendererProps {
  activeSection: string
  productId?: string
  navItems: { id: string; label: string }[]
}

const CHART_SECTIONS = new Set([
  'charts-tokens',
  'charts-line',
  'charts-area',
  'charts-bar-simple',
  'charts-bar',
  'charts-hbar',
  'charts-pie',
  'charts-donut',
  'charts-funnel',
  'charts-radar',
  'charts-scatter',
  'charts-treemap',
])

const PATTERN_SECTIONS = new Set([
  'metric-card',
  'datatable',
  'appshell',
  'page-header',
])

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  activeSection,
  productId,
  navItems,
}) => {
  const activeItem = navItems.find((item) => item.id === activeSection)
  const label = activeItem?.label ?? activeSection

  let content: React.ReactNode

  if (CHART_SECTIONS.has(activeSection)) {
    content = <ChartsSection activeSection={activeSection} label={label} />
  } else if (PATTERN_SECTIONS.has(activeSection)) {
    content = <PatternsRenderer id={activeSection} label={label} />
  } else {
    switch (activeSection) {
      case 'introducao':
        content = <IntroducaoSection productId={productId} />
        break
      case 'instalacao':
        content = <InstalacaoSection />
        break
      case 'configuracao':
        content = <ConfiguracaoSection />
        break
      case 'uso-basico':
        content = <UsoBasicoSection />
        break
      case 'cores':
        content = <CoresSection />
        break
      case 'gradiente':
        content = <GradienteSection />
        break
      case 'tipografia':
        content = <TipografiaSection />
        break
      case 'espacamento':
        content = <EspacamentoSection />
        break
      case 'sombras':
        content = <SombrasSection />
        break
      case 'border-radius':
        content = <BorderRadiusSection />
        break
      default:
        content = <ComponentRenderer id={activeSection} label={label} />
        break
    }
  }

  return <>{content}</>
}
