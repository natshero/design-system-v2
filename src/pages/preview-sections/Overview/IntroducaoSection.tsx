import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface IntroducaoSectionProps {
  productId?: string
}

export const IntroducaoSection: React.FC<IntroducaoSectionProps> = ({ productId }) => {
  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
        <span className="cursor-pointer hover:text-primary">Design System</span> <span>/</span> <span className="cursor-pointer hover:text-primary">{productId === 'mi-tool' ? 'MI Tool' : productId?.replace('-', ' ')}</span> <span>/</span> <span>Introducao</span>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl md:text-[42px] font-bold tracking-tight capitalize font-['Space_Grotesk'] leading-tight">
          {productId === 'mi-tool' ? 'MI Tool' : productId?.replace('-', ' ')}<br/>
          Design System
        </h1>
        <p className="text-[17px] text-muted-foreground max-w-[640px] leading-relaxed">
          Linguagem visual oficial do MI Tool — plataforma de inteligencia de dados mobile. Identidade dark-first com gradiente caracteristico entre Magenta, Roxo e Verde Agua.
        </p>
      </div>

      <div>
        <Badge className="bg-[#1A88FF]/10 text-[#1A88FF] border-[#1A88FF]/20 hover:bg-[#1A88FF]/20 font-medium px-3">
          Stable v0.1.0
        </Badge>
      </div>

      <Card className="bg-transparent border-border/50 max-w-[700px]">
        <CardContent className="p-0 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/50">
          <div className="p-6 flex flex-col justify-center">
            <div className="text-3xl font-bold font-['Space_Grotesk'] text-[#1A88FF]">3</div>
            <div className="text-[13px] text-muted-foreground mt-1">Cores brand</div>
          </div>
          <div className="p-6 flex flex-col justify-center">
            <div className="text-3xl font-bold font-['Space_Grotesk'] text-[#1A88FF]">4</div>
            <div className="text-[13px] text-muted-foreground mt-1">Superfícies dark</div>
          </div>
          <div className="p-6 flex flex-col justify-center">
            <div className="text-3xl font-bold font-['Space_Grotesk'] text-[#1A88FF]">2</div>
            <div className="text-[13px] text-muted-foreground mt-1">Fontes</div>
          </div>
          <div className="p-6 flex flex-col justify-center">
            <div className="text-3xl font-bold font-['Space_Grotesk'] text-[#1A88FF]">29</div>
            <div className="text-[13px] text-muted-foreground mt-1">Componentes</div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="bg-[#1A88FF] hover:bg-[#0050E5] text-white">
          Começar agora <span className="ml-2">→</span>
        </Button>
        <Button variant="outline" className="border-border/50 bg-transparent hover:bg-muted/20">
          Ver componentes <span className="ml-2">→</span>
        </Button>
      </div>

      <div className="pt-8 space-y-4">
        <h2 className="text-[22px] font-bold font-['Space_Grotesk'] pb-2">Identidade</h2>
        <p className="text-[15px] text-muted-foreground max-w-[700px] leading-relaxed">
          O MI Tool comunica <strong>sofisticação técnica</strong> com uma paleta propositalmente diferenciada do MI Tool — sem azul. O trio cromático <strong>Magenta, Roxo, Verde Agua</strong> forma o gradiente identitário da plataforma, usado em destaques, CTAs e elementos de alto impacto.
        </p>
        
        <div className="bg-[#1A88FF]/5 border border-[#1A88FF]/20 rounded-lg p-5 flex gap-4 text-foreground text-[14px] max-w-[700px] mt-4">
          <div className="text-xl">🎨</div>
          <div className="leading-relaxed">
            <strong>Dark-first.</strong> O MI Tool é projetado primariamente para fundos escuros. As superfícies partem do preto (#000000) e escalam até tons de índigo profundo, criando profundidade sem flat design.
          </div>
        </div>
      </div>

      <div className="pt-8 space-y-4">
        <h2 className="text-[22px] font-bold font-['Space_Grotesk'] pb-2">Princípios de cor</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[800px]">
          <Card className="bg-[#111119] border-border/20">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="text-xl">🟣</div>
              <div>
                <div className="text-[#1A88FF] font-bold font-['Space_Grotesk'] text-sm">Roxo Profundo</div>
                <div className="text-muted-foreground text-[11px] font-mono">#1A88FF</div>
              </div>
              <p className="text-[12px] text-muted-foreground leading-relaxed mt-2">
                Cor primária. Inovação e sofisticação. Usada em CTAs principais, bordas ativas e ícones de destaque.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#111119] border-border/20">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="text-xl">🏄</div>
              <div>
                <div className="text-[#07C6C3] font-bold font-['Space_Grotesk'] text-sm">Verde Agua</div>
                <div className="text-muted-foreground text-[11px] font-mono">#07C6C3</div>
              </div>
              <p className="text-[12px] text-muted-foreground leading-relaxed mt-2">
                Cor secundária. Clareza e modernidade. Usada em métricas positivas, success states e acentos de dados.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#111119] border-border/20">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="text-xl">🪀</div>
              <div>
                <div className="text-[#FF0167] font-bold font-['Space_Grotesk'] text-sm">Magenta</div>
                <div className="text-muted-foreground text-[11px] font-mono">#FF0167</div>
              </div>
              <p className="text-[12px] text-muted-foreground leading-relaxed mt-2">
                Cor de ação e impacto. Usada em alertas de atenção, destaques editoriais e início do gradiente.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#111119] border-border/20">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="text-xl">⬛</div>
              <div>
                <div className="text-foreground font-bold font-['Space_Grotesk'] text-sm">Fundo Dark</div>
                <div className="text-muted-foreground text-[11px] font-mono">#000000 → #0A0A10</div>
              </div>
              <p className="text-[12px] text-muted-foreground leading-relaxed mt-2">
                Base dark. Nunca branco como fundo primário. Escala do preto puro até índigo profundo.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-2 pt-6">
          {['Dark-first', 'Space Grotesk', 'Inter', 'No Blue', 'Gradient Identity', 'Tailwind CSS', 'React'].map(tag => (
            <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-white/70 border border-white/10 font-normal px-3 py-1">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
