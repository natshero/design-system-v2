import React from 'react'

export const EspacamentoSection: React.FC = () => {
  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
        <span className="cursor-pointer hover:text-primary">MI Tool DS</span> <span>/</span> <span>Foundations</span> <span>/</span> <span>Espaçamento</span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight font-['Space_Grotesk']">Espaçamento</h1>
      <p className="text-[17px] text-muted-foreground max-w-[640px]">Escala de 8pt nativa do Tailwind CSS. Mantém o ritmo vertical e horizontal uniforme em todo o sistema.</p>
      
      <div className="p-8 border border-border/50 rounded-xl bg-muted/10 mt-6 max-w-[700px]">
        <div className="space-y-4">
          {[
            { label: 'xs', val: '4px', w: 'w-1' },
            { label: 'sm', val: '8px', w: 'w-2' },
            { label: 'md', val: '12px', w: 'w-3' },
            { label: 'lg', val: '16px', w: 'w-4' },
            { label: 'xl', val: '20px', w: 'w-5' },
            { label: '2xl', val: '24px', w: 'w-6' },
            { label: '3xl', val: '32px', w: 'w-8' },
            { label: '4xl', val: '40px', w: 'w-10' },
          ].map(sp => (
            <div key={sp.label} className="flex items-center gap-4">
              <div className="w-8 font-mono text-[12px] text-muted-foreground">{sp.label}</div>
              <div className="w-12 font-mono text-[12px] text-primary">{sp.val}</div>
              <div className={`h-4 bg-primary/40 rounded-sm ${sp.w}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
