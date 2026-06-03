import React, { useState } from 'react'

function GradCard({ label, gradient, css }: { label: string; gradient: string; css: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div
      className="rounded-xl h-24 relative overflow-hidden cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 flex items-end p-3"
      style={{ background: gradient }}
      onClick={() => { navigator.clipboard.writeText(css); setCopied(true); setTimeout(() => setCopied(false), 1200) }}
    >
      <span className="text-[11px] font-medium text-white/85 bg-black/35 backdrop-blur-sm px-2 py-0.5 rounded-full">
        {copied ? '✓ Copiado' : label}
      </span>
    </div>
  )
}

export const GradienteSection: React.FC = () => (
  <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
    <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
      <span>Foundations</span> <span>/</span> <span className="text-foreground">Gradiente</span>
    </div>

    <div className="space-y-3">
      <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">Gradiente</h1>
      <p className="text-[17px] text-muted-foreground max-w-[640px] leading-relaxed">
        Gradiente identitário do MI Tool — Magenta → Azul → Azul Escuro. Usado em destaques, CTAs e elementos de alto impacto.
      </p>
    </div>

    {/* Hero gradient */}
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">Gradiente Identitário</h2>
      <div
        className="w-full h-44 rounded-2xl relative overflow-hidden flex items-end p-6"
        style={{ background: 'linear-gradient(135deg, #07C6C3 0%, #1A88FF 50%, #0050E5 100%)' }}
      >
        <span className="text-[11px] font-mono text-white/70 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
          linear-gradient(135deg, #07C6C3 → #1A88FF → #0050E5)
        </span>
      </div>
      <p className="text-[14px] text-muted-foreground max-w-[600px] leading-relaxed">
        Trio cromático: <strong style={{ color: '#07C6C3' }}>Verde Água</strong> → <strong style={{ color: '#1A88FF' }}>Azul</strong> → <strong style={{ color: '#0050E5' }}>Azul Escuro</strong>.
        Representa clareza, inovação e profundidade técnica.
      </p>
    </div>

    {/* Variantes */}
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">Variantes</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <GradCard
          label="Brand Horizontal"
          gradient="linear-gradient(90deg, #07C6C3 0%, #1A88FF 100%)"
          css="linear-gradient(90deg, #07C6C3 0%, #1A88FF 100%)"
        />
        <GradCard
          label="Brand Vertical"
          gradient="linear-gradient(180deg, #1A88FF 0%, #0050E5 100%)"
          css="linear-gradient(180deg, #1A88FF 0%, #0050E5 100%)"
        />
        <GradCard
          label="Accent Overlay"
          gradient="linear-gradient(135deg, #FF0167 0%, #1A88FF 100%)"
          css="linear-gradient(135deg, #FF0167 0%, #1A88FF 100%)"
        />
        <GradCard
          label="Teal Deep"
          gradient="linear-gradient(135deg, #07C6C3 0%, #05918F 100%)"
          css="linear-gradient(135deg, #07C6C3 0%, #05918F 100%)"
        />
        <GradCard
          label="Dark Surfaces"
          gradient="linear-gradient(180deg, #0A0A10 0%, #111119 50%, #1A1A26 100%)"
          css="linear-gradient(180deg, #0A0A10 0%, #111119 50%, #1A1A26 100%)"
        />
        <GradCard
          label="Glow Brand"
          gradient="radial-gradient(circle at 50% 50%, rgba(26,136,255,0.3) 0%, transparent 70%)"
          css="radial-gradient(circle at 50% 50%, rgba(26,136,255,0.3) 0%, transparent 70%)"
        />
      </div>
    </div>

    {/* Uso */}
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">Como usar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'CTAs de impacto', desc: 'Botões primários e banners de conversão usam o gradiente completo.', ex: 'Analisar agora →' },
          { title: 'Headers e banners', desc: 'Seções hero e banners de destaque editorial com o gradiente de fundo.', ex: 'Destaque visual' },
          { title: 'Ícones e badges', desc: 'Ícones de feature e badges de status premium com gradiente de texto.', ex: '★ Premium' },
        ].map(({ title, desc, ex }) => (
          <div key={title} className="p-4 rounded-xl bg-card border border-border space-y-2">
            <div
              className="w-full h-10 rounded-lg flex items-center justify-center text-white text-[13px] font-semibold"
              style={{ background: 'linear-gradient(135deg, #07C6C3 0%, #1A88FF 50%, #0050E5 100%)' }}
            >
              {ex}
            </div>
            <div className="text-[13px] font-semibold text-foreground">{title}</div>
            <div className="text-[12px] text-muted-foreground leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
)
