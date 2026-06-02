import React from 'react'

interface ShadowCardProps {
  label: string
  token: string
  shadow: string
  desc: string
}

function ShadowCard({ label, token, shadow, desc }: ShadowCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="w-12 h-12 rounded-xl bg-card"
        style={{ boxShadow: shadow }}
      />
      <div>
        <div className="text-[13px] font-semibold text-foreground">{label}</div>
        <code className="text-[11px] font-mono text-primary">{token}</code>
        <div className="text-[11px] text-muted-foreground mt-1">{desc}</div>
      </div>
    </div>
  )
}

export const SombrasSection: React.FC = () => (
  <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
    <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
      <span>Foundations</span> <span>/</span> <span className="text-foreground">Sombras</span>
    </div>

    <div className="space-y-3">
      <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">Sombras</h1>
      <p className="text-[17px] text-muted-foreground max-w-[640px] leading-relaxed">
        Tokens de elevação e glow. As sombras variam entre dark e light mode e incluem glows tintados com a cor brand do produto ativo.
      </p>
    </div>

    {/* Sombras de elevação */}
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">Elevação</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 p-8 rounded-xl bg-background border border-border">
        <ShadowCard label="Shadow SM" token="--shadow-sm" shadow="var(--shadow-sm)" desc="Elementos próximos à superfície" />
        <ShadowCard label="Shadow MD" token="--shadow-md" shadow="var(--shadow-md)" desc="Cards e componentes padrão" />
        <ShadowCard label="Shadow LG" token="--shadow-lg" shadow="var(--shadow-lg)" desc="Modais e overlays" />
        <ShadowCard label="Card Soft" token="--shadow-card-soft" shadow="var(--shadow-card-soft)" desc="Cards com sombra difusa" />
      </div>
    </div>

    {/* Glow shadows */}
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">Glow — Tintados com Brand</h2>
      <p className="text-[14px] text-muted-foreground">
        Sombras com a cor do produto ativo. Mudam automaticamente ao trocar de produto.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-8 rounded-xl bg-background border border-border">
        <ShadowCard
          label="Shadow Glow"
          token="--shadow-glow"
          shadow="var(--shadow-glow)"
          desc="Foco de elementos interativos principais"
        />
        <ShadowCard
          label="Shadow CTA Glow"
          token="--shadow-cta-glow"
          shadow="var(--shadow-cta-glow)"
          desc="Botões primários e CTAs de destaque"
        />
        <ShadowCard
          label="Shadow Glow Accent"
          token="--shadow-glow-accent"
          shadow="var(--shadow-glow-accent)"
          desc="Elementos com acento (magenta/pink)"
        />
      </div>
    </div>

    {/* Aplicação */}
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">Aplicação em contexto</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Botão primário', style: { background: 'var(--primary)', shadow: 'var(--shadow-cta-glow)', text: 'Analisar' } },
          { label: 'Card elevado', style: { background: 'var(--card)', shadow: 'var(--shadow-md)', text: 'Card' } },
          { label: 'Badge destaque', style: { background: 'var(--primary)', shadow: 'var(--shadow-glow)', text: '● Ativo' } },
        ].map(({ label, style }) => (
          <div key={label} className="flex flex-col items-center gap-4 p-6 rounded-xl bg-background border border-border">
            <div
              className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white"
              style={{ background: style.background, boxShadow: style.shadow }}
            >
              {style.text}
            </div>
            <span className="text-[11px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
)
