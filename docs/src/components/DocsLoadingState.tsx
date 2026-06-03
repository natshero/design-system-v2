interface DocsLoadingStateProps {
  title?: string
  description?: string
}

export function DocsLoadingState({
  title = 'Carregando documentacao',
  description = 'Preparando a proxima secao do Design System...',
}: DocsLoadingStateProps) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8">
      <div className="space-y-3">
        <div className="h-3 w-28 rounded-full bg-muted/70" />
        <div className="h-8 w-64 max-w-full rounded-full bg-muted/60" />
        <div className="h-4 w-full max-w-2xl rounded-full bg-muted/50" />
        <div className="h-4 w-4/5 max-w-xl rounded-full bg-muted/40" />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[0, 1].map((item) => (
          <div
            key={item}
            className="space-y-3 rounded-xl border border-border/60 bg-background/60 p-5"
          >
            <div className="h-4 w-32 rounded-full bg-muted/60" />
            <div className="h-24 rounded-xl bg-muted/40" />
            <div className="h-3 w-full rounded-full bg-muted/40" />
            <div className="h-3 w-3/4 rounded-full bg-muted/30" />
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
