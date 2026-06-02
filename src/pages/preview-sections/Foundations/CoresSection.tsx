/**
 * CoresSection — Paleta de cores fiel a docs/mi-tool/index.html
 * Usa CSS vars do tema ativo: var(--primary), var(--secondary), etc.
 */
import React, { useState } from 'react'

interface SwatchProps {
  color: string
  name: string
  role: string
  glow?: string
}

function Swatch({ color, name, role, glow }: SwatchProps) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(color).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1200) })
  }
  return (
    <div className="cursor-pointer group" onClick={copy}>
      <div
        className="w-full aspect-square rounded-xl border border-white/8 transition-transform duration-150 group-hover:-translate-y-[3px]"
        style={{ background: color, boxShadow: glow }}
      />
      <div className="mt-1.5 text-[12px] font-medium text-foreground">{copied ? '✓ Copiado!' : name}</div>
      <div className="text-[11px] font-mono text-muted-foreground mt-0.5">{color}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wide">{role}</div>
    </div>
  )
}

function SemanticCard({ icon, name, hex, color, desc }: { icon: string; name: string; hex: string; color: string; desc: string }) {
  return (
    <div className="p-4 rounded-xl border border-border bg-card">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-[14px] font-semibold mb-0.5" style={{ color }}>{name}</div>
      <div className="text-[12px] font-mono text-muted-foreground mb-2">{hex}</div>
      <div className="text-[12px] text-muted-foreground leading-relaxed">{desc}</div>
    </div>
  )
}

function NeutralRow({ swatch, name, value }: { swatch: string; name: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-border last:border-0">
      <div className="w-10 h-7 rounded shrink-0 border border-white/8" style={{ background: swatch }} />
      <div className="flex-1 text-[13px] font-medium text-foreground">{name}</div>
      <div className="text-[12px] font-mono text-muted-foreground">{value}</div>
    </div>
  )
}

export const CoresSection: React.FC = () => (
  <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
    <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
      <span>Foundations</span> <span>/</span> <span className="text-foreground">Cores</span>
    </div>

    <div className="space-y-3">
      <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">Cores</h1>
      <p className="text-[17px] text-muted-foreground max-w-[640px] leading-relaxed">
        Paleta cromática completa — brand, semântica e superfícies. Todos os valores respondem ao tema ativo.
      </p>
    </div>

    {/* Brand primárias */}
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">Brand — Primárias</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        <Swatch color="var(--primary)" name="Primary / Brand" role="Primary" glow="0 4px 20px color-mix(in srgb, var(--primary) 40%, transparent)" />
        <Swatch color="var(--color-brand-dark, #0050E5)" name="Brand Dark" role="Primary Hover" />
        <Swatch color="#93C5FD" name="Blue 300" role="Light Accent" />
        <Swatch color="var(--secondary)" name="Verde Água" role="Secondary" glow="0 4px 16px rgba(7,198,195,0.35)" />
        <Swatch color="#05918F" name="Verde Dark" role="Secondary Dark" />
        <Swatch color="var(--accent)" name="Magenta" role="Accent / Alerta" glow="0 4px 20px color-mix(in srgb, var(--accent) 40%, transparent)" />
      </div>
    </div>

    {/* Semantic feedback */}
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">Semânticas — Feedback</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <SemanticCard icon="✅" name="Success" hex="#07C6C3" color="var(--success)" desc="Métricas positivas, estados de sucesso, deltas de alta." />
        <SemanticCard icon="⚠️" name="Warning" hex="#F59E0B" color="var(--warning)" desc="Avisos moderados, atenção necessária sem bloqueio." />
        <SemanticCard icon="❌" name="Error" hex="#E24B4A" color="var(--error)" desc="Erros, estados destrutivos, métricas negativas." />
        <SemanticCard icon="ℹ️" name="Info" hex="= primary" color="var(--primary)" desc="Informações neutras. Herda a cor primária do produto." />
      </div>
    </div>

    {/* Superfícies dark */}
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">Superfícies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Swatch color="var(--background)" name="Background" role="Fundo da página" />
        <Swatch color="var(--card)" name="Card / Elevated" role="Cards e modais" />
        <Swatch color="var(--popover)" name="Popover" role="Popovers e tooltips" />
        <Swatch color="var(--muted)" name="Muted / Neutral" role="Painéis internos" />
      </div>
    </div>

    {/* Texto */}
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">Texto</h2>
      <div className="space-y-0 rounded-xl border border-border overflow-hidden">
        <NeutralRow swatch="var(--foreground)" name="Foreground (Primary)" value="var(--foreground)" />
        <NeutralRow swatch="var(--muted-foreground)" name="Muted Foreground (Secondary)" value="var(--muted-foreground)" />
        <NeutralRow swatch="var(--color-text-muted, rgba(255,255,255,0.35))" name="Text Muted (Tertiary)" value="var(--text-muted)" />
      </div>
    </div>

    {/* Charts */}
    <div className="space-y-4">
      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">Gráficos — Séries</h2>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {[1,2,3,4,5,6,7,8].map(n => (
          <Swatch key={n} color={`var(--chart-${n})`} name={`Serie ${n}`} role={`chart-${n}`} />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
        <Swatch color="var(--chart-positive)" name="Positive" role="Crescimento" />
        <Swatch color="var(--chart-negative)" name="Negative" role="Queda" />
        <Swatch color="var(--chart-neutral)" name="Neutral" role="Estável" />
        <Swatch color="var(--chart-competitor)" name="Competitor" role="Concorrente" />
      </div>
    </div>
  </section>
)
