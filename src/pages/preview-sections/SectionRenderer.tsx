import React from 'react'

// Overview
import { IntroducaoSection } from './Overview/IntroducaoSection'

// Getting Started (3 seções separadas — fiel a docs/mi-tool)
import { InstalacaoSection }  from './GettingStarted/InstalacaoSection'
import { ConfiguracaoSection } from './GettingStarted/ConfiguracaoSection'
import { UsoBasicoSection }   from './GettingStarted/UsoBasicoSection'

// Foundations (6 seções — fiel a docs/mi-tool)
import { CoresSection }        from './Foundations/CoresSection'
import { GradienteSection }    from './Foundations/GradienteSection'
import { TipografiaSection }   from './Foundations/TipografiaSection'
import { EspacamentoSection }  from './Foundations/EspacamentoSection'
import { SombrasSection }      from './Foundations/SombrasSection'
import { BorderRadiusSection } from './Foundations/BorderRadiusSection'

// Components
import { ComponentRenderer } from './Components/ComponentRenderer'

// Charts
import { ChartsSection } from './Charts/ChartsSection'

interface SectionRendererProps {
  activeSection: string
  productId?: string
  navItems: { id: string; label: string }[]
}

const CHART_SECTIONS = new Set([
  'charts-tokens','charts-line','charts-area','charts-bar-simple',
  'charts-bar','charts-hbar','charts-pie','charts-donut',
  'charts-funnel','charts-radar','charts-scatter','charts-treemap',
])

export const SectionRenderer: React.FC<SectionRendererProps> = ({ activeSection, productId, navItems }) => {
  const activeItem = navItems.find(i => i.id === activeSection)
  const label = activeItem?.label ?? activeSection

  // Charts
  if (CHART_SECTIONS.has(activeSection)) {
    return <ChartsSection activeSection={activeSection} label={label} />
  }

  switch (activeSection) {
    // ── Overview
    case 'introducao':
      return <IntroducaoSection productId={productId} />

    // ── Getting Started
    case 'instalacao':
      return <InstalacaoSection />
    case 'configuracao':
      return <ConfiguracaoSection />
    case 'uso-basico':
      return <UsoBasicoSection />

    // ── Foundations
    case 'cores':
      return <CoresSection />
    case 'gradiente':
      return <GradienteSection />
    case 'tipografia':
      return <TipografiaSection />
    case 'espacamento':
      return <EspacamentoSection />
    case 'sombras':
      return <SombrasSection />
    case 'border-radius':
      return <BorderRadiusSection />

    // ── Tudo o resto (components) → ComponentRenderer
    default:
      return <ComponentRenderer id={activeSection} label={label} />
  }
}
