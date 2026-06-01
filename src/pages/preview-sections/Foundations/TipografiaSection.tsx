import React from 'react'

export const TipografiaSection: React.FC = () => {
  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
        <span className="cursor-pointer hover:text-primary">MI Tool DS</span> <span>/</span> <span>Foundations</span> <span>/</span> <span>Tipografia</span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight font-['Space_Grotesk']">Tipografia</h1>
      <p className="text-[17px] text-muted-foreground max-w-[640px]">Duas famílias tipográficas que equilibram legibilidade de dados e personalidade da marca.</p>
      
      <h2 className="text-[22px] font-bold font-['Space_Grotesk'] mt-12 mb-6 pb-3 border-b border-border/50">Famílias</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border border-border/50 rounded-xl bg-card">
          <div className="text-3xl font-bold font-['Space_Grotesk'] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1A88FF] to-[#07C6C3]">Space Grotesk</div>
          <div className="text-[13px] font-medium">--font-heading, --font-data</div>
          <div className="text-[13px] text-muted-foreground mt-2">Títulos, métricas, dados numéricos. Personalidade técnica e moderna.</div>
        </div>
        <div className="p-6 border border-border/50 rounded-xl bg-card">
          <div className="text-2xl font-medium font-sans mb-4">Inter</div>
          <div className="text-[13px] font-medium">--font-body</div>
          <div className="text-[13px] text-muted-foreground mt-2">Corpo de texto, labels, descrições. Máxima legibilidade para grandes volumes de informação.</div>
        </div>
      </div>
    </section>
  )
}
