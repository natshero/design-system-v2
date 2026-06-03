import React from "react";

export const BorderRadiusSection: React.FC = () => {
  const radii = [
    {
      label: "radius-sm",
      token: "--radius-sm",
      desc: "~4px · tags, badges pequenos",
      tailwind: "rounded-sm",
    },
    {
      label: "radius-md",
      token: "--radius-md",
      desc: "~6px · botões, inputs",
      tailwind: "rounded-md",
    },
    {
      label: "radius-lg",
      token: "--radius-lg",
      desc: "~8px · cards, popovers",
      tailwind: "rounded-lg",
    },
    {
      label: "radius-xl",
      token: "--radius-xl",
      desc: "~10px · modais, seções",
      tailwind: "rounded-xl",
    },
    {
      label: "radius-2xl",
      token: "--radius-2xl",
      desc: "~12px · containers grandes",
      tailwind: "rounded-2xl",
    },
    {
      label: "radius-3xl",
      token: "--radius-3xl",
      desc: "~16px · hero sections",
      tailwind: "rounded-3xl",
    },
    {
      label: "radius-4xl",
      token: "--radius-4xl",
      desc: "~20px · banners e cards premium",
      tailwind: "rounded-4xl",
    },
    {
      label: "pill (full)",
      token: "--radius-pill",
      desc: "9999px · chips, badges pill",
      tailwind: "rounded-full",
    },
  ];

  return (
    <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
        <span>Foundations</span> <span>/</span>{" "}
        <span className="text-foreground">Border Radius</span>
      </div>

      <div className="space-y-3">
        <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">
          Border Radius
        </h1>
        <p className="text-[17px] text-muted-foreground max-w-[640px] leading-relaxed">
          Escala de arredondamento responsiva ao tema. O valor base{" "}
          <code className="font-mono text-primary text-[15px]">--radius</code> é
          configurado por produto (MI Tool: 0.5rem) e os demais derivam dele.
        </p>
      </div>

      {/* Escala visual */}
      <div className="space-y-4">
        <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">
          Escala Completa
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {radii.map(({ label, token, desc, tailwind }) => (
            <div key={label} className="flex flex-col gap-3">
              <div
                className="w-full h-16 bg-primary/20 border-2 border-primary/40"
                style={{ borderRadius: `var(${token})` }}
              />
              <div>
                <code className="text-[12px] font-mono text-primary block">
                  {token}
                </code>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {tailwind}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aplicação em contexto */}
      <div className="space-y-4">
        <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">
          Aplicação em contexto
        </h2>
        <div className="flex flex-wrap items-end gap-4 p-6 rounded-xl bg-background border border-border">
          {/* Badge pill */}
          <div className="flex flex-col items-center gap-2">
            <span
              className="px-3 py-0.5 text-[11px] font-medium bg-primary/15 text-primary border border-primary/25"
              style={{ borderRadius: "var(--radius-pill)" }}
            >
              v0.1.0 · Stable
            </span>
            <span className="text-[10px] text-muted-foreground">pill</span>
          </div>
          {/* Button */}
          <div className="flex flex-col items-center gap-2">
            <button
              className="px-4 py-2 text-[13px] font-semibold text-white bg-primary"
              style={{ borderRadius: "var(--radius-md)" }}
            >
              Analisar →
            </button>
            <span className="text-[10px] text-muted-foreground">radius-md</span>
          </div>
          {/* Input */}
          <div className="flex flex-col items-center gap-2">
            <input
              readOnly
              value="nome@empresa.com"
              className="px-3 py-2 text-[13px] bg-card text-foreground border border-border outline-none w-44"
              style={{ borderRadius: "var(--radius-md)" }}
            />
            <span className="text-[10px] text-muted-foreground">radius-md</span>
          </div>
          {/* Card */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-24 h-14 bg-card border border-border"
              style={{ borderRadius: "var(--radius-lg)" }}
            />
            <span className="text-[10px] text-muted-foreground">radius-lg</span>
          </div>
          {/* Modal */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-32 h-20 bg-card border border-border"
              style={{ borderRadius: "var(--radius-xl)" }}
            />
            <span className="text-[10px] text-muted-foreground">radius-xl</span>
          </div>
        </div>
      </div>

      {/* Valor base do tema */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex gap-3 text-[14px]">
        <span className="text-primary text-lg shrink-0">📐</span>
        <div className="text-muted-foreground leading-relaxed">
          O valor <code className="font-mono text-primary">--radius</code> é
          definido por produto em{" "}
          <code className="font-mono text-primary">themes.css</code>. MI Tool
          usa <strong className="text-foreground">0.5rem (8px)</strong> — mais
          compacto para uma interface técnica. Outros produtos podem ter valores
          diferentes.
        </div>
      </div>
    </section>
  );
};
