import React from 'react'

export const SuperficiesFormasSection: React.FC = () => {
  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
        <span className="cursor-pointer hover:text-primary">MI Tool DS</span> <span>/</span> <span>Foundations</span> <span>/</span> <span>Superfícies & Formas</span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight font-['Space_Grotesk']">Superfícies & Formas</h1>
      <p className="text-[17px] text-muted-foreground max-w-[640px]">Tokens consolidados de Sombras (Elevation) e Border Radius (Shape) para componentes.</p>
      
      <h2 className="text-[22px] font-bold font-['Space_Grotesk'] mt-12 mb-6 pb-3 border-b border-border/50">Sombras (Elevation)</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 border border-border/50 rounded-xl bg-card shadow-sm">
          <div className="font-mono text-[13px] text-primary mb-2">shadow-sm</div>
          <p className="text-[13px] text-muted-foreground">Usado em cards simples e inputs.</p>
        </div>
        <div className="p-6 border border-border/50 rounded-xl bg-card shadow-md">
          <div className="font-mono text-[13px] text-primary mb-2">shadow-md</div>
          <p className="text-[13px] text-muted-foreground">Usado em dropdowns e popovers.</p>
        </div>
        <div className="p-6 border border-border/50 rounded-xl bg-card shadow-lg">
          <div className="font-mono text-[13px] text-primary mb-2">shadow-lg</div>
          <p className="text-[13px] text-muted-foreground">Usado em modais e dialogs de destaque.</p>
        </div>
      </div>

      <h2 className="text-[22px] font-bold font-['Space_Grotesk'] mt-12 mb-6 pb-3 border-b border-border/50">Border Radius (Shape)</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-primary/20 border border-primary/40 rounded-sm"></div>
          <div className="font-mono text-[12px] text-muted-foreground">rounded-sm (4px)</div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-primary/20 border border-primary/40 rounded-md"></div>
          <div className="font-mono text-[12px] text-muted-foreground">rounded-md (6px)</div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-primary/20 border border-primary/40 rounded-lg"></div>
          <div className="font-mono text-[12px] text-muted-foreground">rounded-lg (8px)</div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-primary/20 border border-primary/40 rounded-xl"></div>
          <div className="font-mono text-[12px] text-muted-foreground">rounded-xl (12px)</div>
        </div>
      </div>
    </section>
  )
}
