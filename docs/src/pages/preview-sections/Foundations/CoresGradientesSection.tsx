import React from 'react'

export const CoresGradientesSection: React.FC = () => {
  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
        <span className="cursor-pointer hover:text-primary">MI Tool DS</span> <span>/</span> <span>Foundations</span> <span>/</span> <span>Cores & Gradientes</span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight font-['Space_Grotesk']">Cores & Gradientes</h1>
      <p className="text-[17px] text-muted-foreground max-w-[640px]">Paleta cromática completa do MI Tool — brand, semântica e gradientes identitários.</p>
      
      <h2 className="text-[22px] font-bold font-['Space_Grotesk'] mt-12 mb-6 pb-3 border-b border-border/50">Brand — Primárias</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-2 group cursor-pointer">
          <div className="h-24 w-full rounded-xl bg-[#1A88FF] shadow-[0_4px_20px_rgba(26,136,255,0.4)] transition-transform group-hover:-translate-y-1"></div>
          <div>
            <div className="font-medium text-[13px]">Blue 500</div>
            <div className="text-[11px] font-mono text-muted-foreground">#1A88FF</div>
          </div>
        </div>
        <div className="space-y-2 group cursor-pointer">
          <div className="h-24 w-full rounded-xl bg-[#0050E5] transition-transform group-hover:-translate-y-1"></div>
          <div>
            <div className="font-medium text-[13px]">Blue 600</div>
            <div className="text-[11px] font-mono text-muted-foreground">#0050E5</div>
          </div>
        </div>
        <div className="space-y-2 group cursor-pointer">
          <div className="h-24 w-full rounded-xl bg-[#07C6C3] shadow-[0_4px_16px_rgba(7,198,195,0.35)] transition-transform group-hover:-translate-y-1"></div>
          <div>
            <div className="font-medium text-[13px]">Verde Água</div>
            <div className="text-[11px] font-mono text-muted-foreground">#07C6C3</div>
          </div>
        </div>
        <div className="space-y-2 group cursor-pointer">
          <div className="h-24 w-full rounded-xl bg-[#FF0167] shadow-[0_4px_16px_rgba(255,1,103,0.35)] transition-transform group-hover:-translate-y-1"></div>
          <div>
            <div className="font-medium text-[13px]">Pink</div>
            <div className="text-[11px] font-mono text-muted-foreground">#FF0167</div>
          </div>
        </div>
      </div>

      <h2 className="text-[22px] font-bold font-['Space_Grotesk'] mt-12 mb-6 pb-3 border-b border-border/50">Semântica</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <div className="h-24 w-full rounded-xl bg-[#07C6C3]"></div>
          <div><div className="font-medium text-[13px]">Success</div><div className="text-[11px] font-mono text-muted-foreground">#07C6C3</div></div>
        </div>
        <div className="space-y-2">
          <div className="h-24 w-full rounded-xl bg-[#E24B4A]"></div>
          <div><div className="font-medium text-[13px]">Error</div><div className="text-[11px] font-mono text-muted-foreground">#E24B4A</div></div>
        </div>
        <div className="space-y-2">
          <div className="h-24 w-full rounded-xl bg-[#F59E0B]"></div>
          <div><div className="font-medium text-[13px]">Warning</div><div className="text-[11px] font-mono text-muted-foreground">#F59E0B</div></div>
        </div>
        <div className="space-y-2">
          <div className="h-24 w-full rounded-xl bg-[#1A88FF]"></div>
          <div><div className="font-medium text-[13px]">Info</div><div className="text-[11px] font-mono text-muted-foreground">#1A88FF</div></div>
        </div>
      </div>

      <h2 className="text-[22px] font-bold font-['Space_Grotesk'] mt-12 mb-6 pb-3 border-b border-border/50">Gradiente Identitário</h2>
      <div className="w-full h-40 rounded-xl flex items-center justify-center text-white font-mono text-sm shadow-xl" style={{ background: 'linear-gradient(135deg, #07C6C3, #1A88FF, #0050E5)' }}>
        linear-gradient(135deg, #07C6C3, #1A88FF, #0050E5)
      </div>
      <p className="text-[14px] text-muted-foreground mt-4">Reservado para elementos de alto impacto visual — hero sections, CTAs primários e loaders.</p>
    </section>
  )
}
