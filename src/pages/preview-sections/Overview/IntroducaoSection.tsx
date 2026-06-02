import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Zap, Waves, Flame, Square } from 'lucide-react'

interface IntroducaoSectionProps {
  productId?: string
}

// Ícones que representam os princípios de cor (SVG, sem emoji)
const COLOR_PRINCIPLES = [
  {
    icon: <Zap  size={18} aria-hidden="true" />,
    colorVar: 'var(--primary)',
    colorToken: '--primary',
    name: 'Cor Primária',
    desc: 'Inovação e sofisticação. CTAs principais, bordas ativas e ícones de destaque.',
  },
  {
    icon: <Waves size={18} aria-hidden="true" />,
    colorVar: 'var(--secondary)',
    colorToken: '--secondary',
    name: 'Cor Secundária',
    desc: 'Clareza e modernidade. Métricas positivas, success states e acentos de dados.',
  },
  {
    icon: <Flame size={18} aria-hidden="true" />,
    colorVar: 'var(--accent)',
    colorToken: '--accent',
    name: 'Cor de Acento',
    desc: 'Ação e impacto. Alertas de atenção, destaques editoriais e CTAs secundários.',
  },
  {
    icon: <Square size={18} aria-hidden="true" />,
    colorVar: 'var(--background)',
    colorToken: '--background',
    name: 'Fundo Base',
    desc: 'Base dark. Nunca branco como fundo primário. Escala do preto até tom profundo.',
  },
]

export const IntroducaoSection: React.FC<IntroducaoSectionProps> = ({ productId }) => {
  const productName = productId === 'mi-tool'
    ? 'MI Tool'
    : productId?.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">

      {/* Breadcrumb */}
      <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
        <span className="hover:text-primary cursor-default">Design System</span>
        <span>/</span>
        <span className="hover:text-primary cursor-default">{productName}</span>
        <span>/</span>
        <span className="text-foreground">Introdução</span>
      </div>

      {/* Título */}
      <div className="space-y-4">
        <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">
          {productName}<br />Design System
        </h1>
        <p className="text-[17px] text-muted-foreground max-w-[640px] leading-relaxed">
          Linguagem visual oficial — identidade dark-first com gradiente
          característico entre as cores primária, secundária e de acento.
        </p>
      </div>

      {/* Badge de versão — usando tokens, sem hex hardcoded */}
      <div>
        <Badge className="bg-primary/10 text-primary border-primary/25 hover:bg-primary/15 font-medium px-3">
          Stable v0.1.0
        </Badge>
      </div>

      {/* Stats card — text-primary em vez de text-[#1A88FF] */}
      <Card className="bg-transparent border-border/50 max-w-[700px]">
        <CardContent className="p-0 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/50">
          {[
            { value: '3',  label: 'Cores brand'      },
            { value: '4',  label: 'Superfícies dark'  },
            { value: '2',  label: 'Fontes'            },
            { value: '29', label: 'Componentes'       },
          ].map(({ value, label }) => (
            <div key={label} className="p-6 flex flex-col justify-center">
              <div className="text-3xl font-bold font-display text-primary">{value}</div>
              <div className="text-[13px] text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* CTAs — usando variantes shadcn */}
      <div className="flex gap-4">
        <Button>
          Começar agora <span className="ml-2" aria-hidden="true">→</span>
        </Button>
        <Button variant="outline">
          Ver componentes <span className="ml-2" aria-hidden="true">→</span>
        </Button>
      </div>

      {/* Identidade */}
      <div className="pt-8 space-y-4">
        <h2 className="text-[22px] font-bold font-display border-b border-border pb-2">Identidade</h2>
        <p className="text-[15px] text-muted-foreground max-w-[700px] leading-relaxed">
          Este produto comunica <strong className="text-foreground">sofisticação técnica</strong> com
          uma paleta propositalmente diferenciada. O trio cromático
          <strong className="text-foreground"> primária, secundária e acento</strong> forma o
          gradiente identitário, usado em destaques, CTAs e elementos de alto impacto.
        </p>

        {/* Callout — bg-primary/5 sem hex fixo */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 flex gap-4 text-[14px] max-w-[700px] mt-4">
          <span className="text-primary font-bold shrink-0" aria-hidden="true">◈</span>
          <div className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Dark-first.</strong> Este produto é projetado primariamente
            para fundos escuros. As superfícies partem do tom mais profundo e escalam
            até criar profundidade sem flat design.
          </div>
        </div>
      </div>

      {/* Princípios de cor — ícones SVG com CSS vars (sem hex hardcoded) */}
      <div className="pt-8 space-y-4">
        <h2 className="text-[22px] font-bold font-display border-b border-border pb-2">Princípios de cor</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[800px]">
          {COLOR_PRINCIPLES.map(({ icon, colorVar, colorToken, name, desc }) => (
            <Card key={colorToken} className="bg-card border-border/40">
              <CardContent className="p-5 flex flex-col gap-3">
                {/* Ícone SVG com a cor do token — sem hex fixo */}
                <div style={{ color: colorVar }}>{icon}</div>
                <div>
                  <div className="font-bold font-display text-sm" style={{ color: colorVar }}>
                    {name}
                  </div>
                  <div className="text-muted-foreground text-[11px] font-mono mt-0.5">
                    {colorToken}
                  </div>
                </div>
                <p className="text-[12px] text-muted-foreground leading-relaxed mt-1">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tech tags — sem hardcoded white */}
        <div className="flex flex-wrap gap-2 pt-6">
          {['Dark-first', 'Space Grotesk', 'Inter', 'Shadcn/UI', 'Tailwind CSS 4', 'React 19'].map(tag => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-muted/50 hover:bg-muted text-muted-foreground border border-border/60 font-normal px-3 py-1"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
