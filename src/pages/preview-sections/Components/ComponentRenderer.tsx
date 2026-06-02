/**
 * ComponentRenderer — demos de componentes fiéis a docs/mi-tool/index.html
 * IDs mapeados exatamente como no navGroups de ProductPreviewPage.
 * Usa CSS vars (var(--primary), var(--card), etc.) — responde ao tema ativo.
 */
import React, { useState } from 'react'
import { Button }       from '@/components/ui/button'
import { Input }        from '@/components/ui/input'
import { Label }        from '@/components/ui/label'
import { Textarea }     from '@/components/ui/textarea'
import { Badge }        from '@/components/ui/badge'
import { Checkbox }     from '@/components/ui/checkbox'
import { Switch }       from '@/components/ui/switch'
import { Toggle }       from '@/components/ui/toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton }     from '@/components/ui/skeleton'
import { Progress }     from '@/components/ui/progress'
import { Separator }    from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card'
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from '@/components/ui/pagination'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format, subDays, subMonths } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { useDSTranslation } from '@/i18n'
import {
  Info, AlertCircle, CheckCircle2, AlertTriangle,
  CalendarIcon, MoreHorizontal, Settings, LayoutDashboard,
  TrendingUp, TrendingDown, Minus, Star, Trash2,
  ChevronRight, Home, User, Bell,
  ArrowUpRight, ArrowDownRight,
} from 'lucide-react'
import { toast } from 'sonner'

// ── Helpers ──────────────────────────────────────────────────────────────────

function PreviewBox({ children, center = true }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`p-8 rounded-xl border border-border bg-card/20 ${center ? 'flex items-center justify-center' : ''}`}>
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2 mt-8 first:mt-0">
      {children}
    </h2>
  )
}

// ── DateRangePicker (componente dedicado por complexidade) ───────────────────

function DateRangePickerSection({ breadcrumb, header }: { breadcrumb: React.ReactNode; header: React.ReactNode }) {
  const { t } = useDSTranslation()

  // Presets dinâmicos — labels vêm das traduções (pt-BR | en-US | es-ES)
  const PRESETS = [
    { key: 'today',       label: t('datepicker.presets.today'),       range: () => { const d = new Date(); return { from: d, to: d } } },
    { key: 'yesterday',   label: t('datepicker.presets.yesterday'),   range: () => { const d = subDays(new Date(), 1); return { from: d, to: d } } },
    { key: 'last7days',   label: t('datepicker.presets.last7days'),   range: () => ({ from: subDays(new Date(), 6), to: new Date() }) },
    { key: 'last15days',  label: t('datepicker.presets.last15days'),  range: () => ({ from: subDays(new Date(), 14), to: new Date() }) },
    { key: 'lastMonth',   label: t('datepicker.presets.lastMonth'),   range: () => ({ from: subDays(new Date(), 29), to: new Date() }) },
    { key: 'last3months', label: t('datepicker.presets.last3months'), range: () => ({ from: subMonths(new Date(), 3), to: new Date() }) },
  ]

  const [range, setRange] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  })
  const [open, setOpen] = React.useState(false)
  const [activePresetKey, setActivePresetKey] = React.useState<string>('last7days')
  // C3: estado de validação — range incompleto (skill: error-feedback + inline-validation)
  const [touched, setTouched] = React.useState(false)
  const isInvalid = touched && range?.from && !range?.to

  const label = range?.from
    ? range.to
      ? `${format(range.from, 'dd/MM/yyyy')} — ${format(range.to, 'dd/MM/yyyy')}`
      : format(range.from, 'dd/MM/yyyy')
    : t('datepicker.placeholder')

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setRange(preset.range())
    setActivePresetKey(preset.key)
    setTouched(false)
  }

  const handleApply = () => {
    setTouched(true)
    if (range?.from && range?.to) setOpen(false)
  }

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}

      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2">
        DateRangePicker interativo
      </h2>
      <div className="p-8 rounded-xl border border-border bg-card/20 flex flex-col items-start gap-4">
        {/* Trigger */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <button
              className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-[13px] rounded-lg border bg-card text-foreground hover:border-primary transition-colors font-sans min-w-[260px] justify-start ${
                isInvalid ? 'border-error' : 'border-border-emphasis'
              }`}
              aria-invalid={isInvalid ? 'true' : undefined}
              aria-describedby={isInvalid ? 'drp-error' : undefined}
              style={{ boxShadow: open ? `0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent)` : isInvalid ? `0 0 0 3px color-mix(in srgb, var(--error) 15%, transparent)` : undefined, borderColor: open ? 'var(--primary)' : isInvalid ? 'var(--error)' : undefined }}
            >
              <CalendarIcon size={14} className="text-muted-foreground shrink-0" />
              <span className={range?.from ? 'text-foreground' : 'text-muted-foreground'}>
                {label}
              </span>
              <span className="ml-auto text-muted-foreground text-[10px]">▾</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 shadow-lg" align="start" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            {/* Header com presets */}
            <div className="flex items-center gap-1.5 p-3 border-b border-border flex-wrap">
              <span className="text-[11px] font-medium text-muted-foreground mr-1 shrink-0">Período:</span>
              {PRESETS.map(p => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p)}
                  className="px-2.5 py-1 text-[11px] rounded-full border transition-all"
                  style={activePresetKey === p.key
                    ? { background: 'color-mix(in srgb, var(--primary) 15%, transparent)', borderColor: 'var(--primary)', color: 'var(--primary)' }
                    : { background: 'var(--muted)', borderColor: 'var(--border)', color: 'var(--muted-foreground)' }
                  }
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Calendário de range */}
            <Calendar
              mode="range"
              selected={range}
              onSelect={r => { setRange(r); setActivePresetKey('') }}
              numberOfMonths={2}
              className="p-3"
            />

            {/* Footer */}
            <div className="flex items-center justify-between p-3 border-t border-border">
              <span className="text-[12px] text-muted-foreground">
                {range?.from && range?.to
                  ? `${Math.round((range.to.getTime() - range.from.getTime()) / 86400000) + 1} dias`
                  : t('datepicker.presetsTitle')}
              </span>
              <button
                onClick={handleApply}
                className="px-3 py-1.5 text-[12px] font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                disabled={!range?.from}
              >
                {t('datepicker.apply')}
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* C3: mensagem de erro quando range incompleto (skill: error-placement + error-clarity) */}
        {isInvalid && (
          <p id="drp-error" role="alert" className="text-[12px] text-error flex items-center gap-1.5">
            <span aria-hidden="true">⚠</span>
            Selecione também a data de término — clique em uma segunda data no calendário.
          </p>
        )}

        {/* Estado atual — visível apenas quando range completo */}
        {range?.from && range?.to && (
          <div className="text-[12px] font-mono text-muted-foreground bg-muted/30 px-3 py-2 rounded-md border border-border/50">
            <span className="text-primary">from:</span> {format(range.from, 'yyyy-MM-dd')}
            <span className="mx-2 text-muted-foreground/40">|</span>
            <span className="text-primary">to:</span> {format(range.to, 'yyyy-MM-dd')}
          </div>
        )}
      </div>

      <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2 mt-8">
        Trigger compacto
      </h2>
      <div className="p-8 rounded-xl border border-border bg-card/20 flex gap-3 flex-wrap">
        <button className="inline-flex items-center gap-2 px-3 py-2 text-[13px] rounded-lg border border-border bg-card text-foreground hover:border-primary transition-colors">
          <CalendarIcon size={13} className="text-muted-foreground" />
          {range?.from ? format(range.from, 'dd/MM') : '—'}
          {range?.to && <> — {format(range.to, 'dd/MM')}</>}
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-2 text-[12px] rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
          Últimos 7 dias ▾
        </button>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────

interface ComponentRendererProps {
  id: string
  label: string
}

// ── Main component ────────────────────────────────────────────────────────────

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ id, label }) => {
  const [checked, setChecked] = useState(false)
  const [toggled, setToggled] = useState(false)
  const [progress] = useState(68)

  const breadcrumb = (
    <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
      <span>Components</span> <span>/</span> <span className="text-foreground">{label}</span>
    </div>
  )

  const header = (
    <div className="space-y-3">
      <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">
        {label}
      </h1>
      <p className="text-[17px] text-muted-foreground max-w-[640px] leading-relaxed">
        Demonstração do componente <span className="font-semibold text-primary">{label}</span>.
        Todos os tokens respondem ao tema ativo.
      </p>
    </div>
  )

  // ── INPUTS ──────────────────────────────────────────────────────────────────

  if (id === 'button') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}

      <SectionTitle>Variantes</SectionTitle>
      <PreviewBox>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </PreviewBox>

      <SectionTitle>Tamanhos</SectionTitle>
      <PreviewBox>
        <div className="flex flex-wrap gap-3 items-center justify-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Star size={16} /></Button>
        </div>
      </PreviewBox>

      <SectionTitle>Estados</SectionTitle>
      <PreviewBox>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button disabled>Disabled</Button>
          <Button>
            <span className="animate-spin mr-2 size-4 rounded-full border-2 border-white/30 border-t-white" />
            Carregando…
          </Button>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'input') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}

      <SectionTitle>Variantes</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-4 max-w-sm">
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input placeholder="nome@empresa.com" type="email" />
          </div>
          <div className="space-y-1.5">
            <Label>Senha</Label>
            <Input placeholder="••••••••" type="password" />
          </div>
          <div className="space-y-1.5">
            <Label className="flex gap-1">Campo obrigatório <span className="text-error">*</span></Label>
            <Input placeholder="Obrigatório" className="border-error focus-visible:ring-error/30" />
            <p className="text-[12px] text-error">Este campo é obrigatório</p>
          </div>
          <div className="space-y-1.5">
            <Label>Desabilitado</Label>
            <Input placeholder="Não editável" disabled />
          </div>
          <div className="space-y-1.5">
            <Label>Mensagem</Label>
            <Textarea placeholder="Digite sua mensagem..." rows={3} />
          </div>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'select') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox center={false}>
        <div className="space-y-4 max-w-xs">
          <div className="space-y-1.5">
            <Label>Produto</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Selecione o produto…" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mi-tool">MI Tool</SelectItem>
                <SelectItem value="datarank">DataRank</SelectItem>
                <SelectItem value="ads">Ads Intelligence</SelectItem>
                <SelectItem value="geo">RankMyGEO</SelectItem>
                <SelectItem value="community">Rank Community</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Desabilitado</Label>
            <Select disabled>
              <SelectTrigger><SelectValue placeholder="Indisponível" /></SelectTrigger>
            </Select>
          </div>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'checkbox') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox center={false}>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Checkbox id="cb1" checked={checked} onCheckedChange={v => setChecked(Boolean(v))} />
            <Label htmlFor="cb1" className="cursor-pointer">
              {checked ? 'Marcado ✓' : 'Aceito os termos e condições'}
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="cb2" defaultChecked />
            <Label htmlFor="cb2" className="cursor-pointer">Receber notificações</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="cb3" disabled />
            <Label htmlFor="cb3" className="text-muted-foreground cursor-not-allowed">Desabilitado</Label>
          </div>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'toggle') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}

      <SectionTitle>Switch (Toggle)</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch id="sw1" checked={toggled} onCheckedChange={setToggled} />
            <Label htmlFor="sw1" className="cursor-pointer">
              Notificações: {toggled ? 'Ativas' : 'Desativadas'}
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="sw2" defaultChecked />
            <Label htmlFor="sw2" className="cursor-pointer">Atualizações automáticas</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="sw3" disabled />
            <Label htmlFor="sw3" className="text-muted-foreground">Desabilitado</Label>
          </div>
        </div>
      </PreviewBox>

      <SectionTitle>Toggle Button</SectionTitle>
      <PreviewBox>
        <div className="flex gap-2">
          <Toggle>Negrito</Toggle>
          <Toggle defaultPressed>Itálico</Toggle>
          <Toggle>Sublinhado</Toggle>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'daterangepicker') return (
    <DateRangePickerSection breadcrumb={breadcrumb} header={header} />
  )

  // ── DISPLAY ──────────────────────────────────────────────────────────────────

  if (id === 'badge') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}

      <SectionTitle>Variantes shadcn</SectionTitle>
      <PreviewBox>
        <div className="flex flex-wrap gap-3 items-center justify-center">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </PreviewBox>

      <SectionTitle>Semânticas com tokens</SectionTitle>
      <PreviewBox>
        <div className="flex flex-wrap gap-3 items-center justify-center">
          {[
            { label: 'Brand', bg: 'var(--primary)', border: 'var(--primary)' },
            { label: 'Success', bg: 'var(--success)', border: 'var(--success)' },
            { label: 'Warning', bg: 'var(--warning)', border: 'var(--warning)' },
            { label: 'Error', bg: 'var(--error)', border: 'var(--error)' },
          ].map(({ label: bl, bg, border }) => (
            <span
              key={bl}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium text-white border"
              style={{ background: `color-mix(in srgb, ${bg} 15%, transparent)`, borderColor: `color-mix(in srgb, ${border} 30%, transparent)`, color: bg }}
            >
              <span className="size-1.5 rounded-full" style={{ background: bg }} />
              {bl}
            </span>
          ))}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border border-border text-muted-foreground bg-muted/30">
            Default
          </span>
        </div>
      </PreviewBox>

      <SectionTitle>Progress</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-3 max-w-sm">
          <div className="flex items-center gap-3">
            <Progress value={progress} className="flex-1 h-1.5" />
            <span className="text-[12px] font-mono text-muted-foreground w-10 text-right">{progress}%</span>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={32} className="flex-1 h-1.5" />
            <span className="text-[12px] font-mono text-muted-foreground w-10 text-right">32%</span>
          </div>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'avatar') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}

      <SectionTitle>Tamanhos</SectionTitle>
      <PreviewBox>
        <div className="flex items-end gap-4">
          {(['size-6', 'size-8', 'size-10', 'size-12', 'size-16'] as const).map((sz, i) => (
            <div key={sz} className="flex flex-col items-center gap-1">
              <Avatar className={sz}>
                <AvatarFallback className="text-xs font-semibold bg-primary/15 text-primary">
                  {['JF', 'AP', 'CM', 'BL', 'RS'][i]}
                </AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-muted-foreground">{sz}</span>
            </div>
          ))}
        </div>
      </PreviewBox>

      <SectionTitle>Com imagem + fallback</SectionTitle>
      <PreviewBox>
        <div className="flex gap-4 items-center">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <Avatar className="size-10">
            <AvatarFallback className="bg-primary text-white font-semibold">RM</AvatarFallback>
          </Avatar>
          <Avatar className="size-10">
            <AvatarFallback className="bg-secondary text-white font-semibold">PV</AvatarFallback>
          </Avatar>
        </div>
      </PreviewBox>

      <SectionTitle>Avatar Group</SectionTitle>
      <PreviewBox>
        <div className="flex items-center">
          {['JF', 'AP', 'CM', 'BL'].map((initials, i) => (
            <Avatar
              key={initials}
              className="size-9 ring-2 ring-background"
              style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 4 - i }}
            >
              <AvatarFallback className="text-xs font-semibold bg-primary/20 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
          ))}
          <Avatar className="size-9 ring-2 ring-background" style={{ marginLeft: -10 }}>
            <AvatarFallback className="text-xs font-medium bg-muted text-muted-foreground">+4</AvatarFallback>
          </Avatar>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'card') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}

      <SectionTitle>Card padrão</SectionTitle>
      <PreviewBox center={false}>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Nova Análise</CardTitle>
            <CardDescription>Configure os parâmetros para monitoramento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <Label className="text-[13px]">Nome do app</Label>
              <Input placeholder="ex: com.nubank.android" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" size="sm">Cancelar</Button>
            <Button size="sm">Salvar</Button>
          </CardFooter>
        </Card>
      </PreviewBox>
    </section>
  )

  if (id === 'metric-card') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}

      <SectionTitle>MetricCard</SectionTitle>
      <PreviewBox center={false}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Downloads', value: '12.847', delta: '+20.1%', type: 'up' },
            { label: 'Avaliação', value: '4.7 ★', delta: '+0.2', type: 'up' },
            { label: 'Uninstalls', value: '1.203', delta: '-5.4%', type: 'down' },
            { label: 'Ranking', value: '#12', delta: '—', type: 'neutral' },
          ].map(({ label: ml, value, delta, type }) => (
            <Card key={ml} className="min-w-[140px]">
              <CardContent className="p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  {type === 'up' && <TrendingUp size={12} className="text-success" />}
                  {type === 'down' && <TrendingDown size={12} className="text-error" />}
                  {type === 'neutral' && <Minus size={12} className="text-muted-foreground" />}
                  {ml}
                </div>
                <div className="font-display font-bold text-[26px] text-foreground leading-none">{value}</div>
                <div
                  className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                    type === 'up'      ? 'bg-success/10 text-success' :
                    type === 'down'    ? 'bg-error/10 text-error' :
                    'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {type === 'up' && <ArrowUpRight size={10} />}
                  {type === 'down' && <ArrowDownRight size={10} />}
                  {delta}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'datatable') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}

      <SectionTitle>Tabela de Keywords</SectionTitle>
      <PreviewBox center={false}>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="text-[11px] uppercase tracking-wider">Keyword</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider">Volume</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider">Rank</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider">Tendência</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-right">Delta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { kw: 'rankmyapp', vol: '12.4K', rank: 1, trend: 'up', delta: '+3' },
                { kw: 'aso tools', vol: '8.9K', rank: 5, trend: 'up', delta: '+1' },
                { kw: 'app marketing', vol: '5.3K', rank: 12, trend: 'down', delta: '-2' },
                { kw: 'mobile growth', vol: '3.1K', rank: 18, trend: 'neutral', delta: '—' },
              ].map(({ kw, vol, rank, trend, delta }) => (
                <TableRow key={kw} className="hover:bg-muted/20">
                  <TableCell className="font-medium text-foreground">{kw}</TableCell>
                  <TableCell className="text-muted-foreground">{vol}</TableCell>
                  <TableCell>
                    <span className="font-display font-bold text-primary">#{rank}</span>
                  </TableCell>
                  <TableCell>
                    {trend === 'up' && <TrendingUp size={14} className="text-success" />}
                    {trend === 'down' && <TrendingDown size={14} className="text-error" />}
                    {trend === 'neutral' && <Minus size={14} className="text-muted-foreground" />}
                  </TableCell>
                  <TableCell className={`text-right font-medium font-display ${
                    trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground'
                  }`}>{delta}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PreviewBox>
    </section>
  )

  // ── FEEDBACK ──────────────────────────────────────────────────────────────────

  if (id === 'alert') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}

      <SectionTitle>Variantes</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-3 max-w-lg">
          <Alert>
            <Info className="size-4" />
            <AlertTitle>Informação</AlertTitle>
            <AlertDescription>Uma nova versão está disponível com melhorias de performance.</AlertDescription>
          </Alert>
          <Alert style={{ borderLeftColor: 'var(--success)', background: 'color-mix(in srgb, var(--success) 6%, transparent)' }}>
            <CheckCircle2 className="size-4" style={{ color: 'var(--success)' }} />
            <AlertTitle>Sucesso</AlertTitle>
            <AlertDescription>Dados importados com sucesso. 1.234 keywords adicionadas.</AlertDescription>
          </Alert>
          <Alert style={{ borderLeftColor: 'var(--warning)', background: 'color-mix(in srgb, var(--warning) 6%, transparent)' }}>
            <AlertTriangle className="size-4" style={{ color: 'var(--warning)' }} />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>Sua assinatura expira em 7 dias. Renove para manter o acesso.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Erro na importação</AlertTitle>
            <AlertDescription>O arquivo enviado possui formato inválido ou está corrompido.</AlertDescription>
          </Alert>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'toast') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={() => toast('Ação realizada!')} variant="outline">
            Toast padrão
          </Button>
          {/* Classes Tailwind com tokens semânticos — sem inline styles */}
          <Button
            onClick={() => toast.success('Salvo com sucesso!', { description: 'Dados atualizados às 15:24.' })}
            className="bg-success/15 text-success border border-success/30 hover:bg-success/25"
          >
            Toast sucesso
          </Button>
          <Button
            onClick={() => toast.warning('Atenção necessária', { description: 'Verifique os dados antes de prosseguir.' })}
            className="bg-warning/15 text-warning border border-warning/30 hover:bg-warning/25"
          >
            Toast aviso
          </Button>
          <Button
            onClick={() => toast.error('Erro ao salvar', { description: 'Verifique sua conexão e tente novamente.' })}
            variant="destructive"
          >
            Toast erro
          </Button>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'spinner') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}

      <SectionTitle>Spinner</SectionTitle>
      <PreviewBox>
        <div className="flex items-end gap-6">
          {[14, 18, 24, 36].map(size => (
            <div key={size} className="flex flex-col items-center gap-2">
              <span
                className="animate-spin rounded-full border-[2px]"
                style={{
                  width: size, height: size,
                  borderColor: `color-mix(in srgb, var(--primary) 18%, transparent)`,
                  borderTopColor: 'var(--primary)',
                  animationDuration: '0.75s',
                }}
              />
              <span className="text-[10px] text-muted-foreground">{size}px</span>
            </div>
          ))}
        </div>
      </PreviewBox>

      <SectionTitle>Com texto de carregamento</SectionTitle>
      <PreviewBox>
        <div className="flex flex-col items-center gap-3">
          <span
            className="animate-spin rounded-full border-[3px]"
            style={{
              width: 36, height: 36,
              borderColor: `color-mix(in srgb, var(--primary) 18%, transparent)`,
              borderTopColor: 'var(--primary)',
            }}
          />
          <span className="text-[13px] text-muted-foreground font-sans">Carregando dados…</span>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'skeleton') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}

      <SectionTitle>Card loading</SectionTitle>
      <PreviewBox center={false}>
        <div className="flex items-center gap-4 max-w-sm">
          <Skeleton className="size-12 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-4/5" />
          </div>
        </div>
      </PreviewBox>

      <SectionTitle>Tabela loading</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-2 max-w-lg">
          <div className="flex gap-4 py-2 border-b border-border">
            {['w-1/4', 'w-1/3', 'w-1/5', 'w-1/6'].map(w => (
              <Skeleton key={w} className={`h-3 ${w}`} />
            ))}
          </div>
          {[1,2,3].map(i => (
            <div key={i} className="flex gap-4 py-2 border-b border-border/50">
              {['w-1/4', 'w-1/3', 'w-1/5', 'w-1/6'].map(w => (
                <Skeleton key={w} className={`h-3 ${w}`} />
              ))}
            </div>
          ))}
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'empty-state') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox>
        <div className="flex flex-col items-center text-center p-12 max-w-sm">
          <div
            className="size-12 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}
          >
            <Bell size={24} style={{ color: 'var(--primary)' }} />
          </div>
          <h3 className="text-[18px] font-semibold text-foreground font-display mb-2">Nenhuma keyword monitorada</h3>
          <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">
            Você ainda não adicionou keywords para monitoramento. Comece agora para ver dados de ranking.
          </p>
          <Button size="sm">Adicionar keyword</Button>
        </div>
      </PreviewBox>
    </section>
  )

  // ── NAVIGATION ────────────────────────────────────────────────────────────────

  if (id === 'tabs') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox center={false}>
        <Tabs defaultValue="overview" className="w-full max-w-lg">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rankings">Rankings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="pt-4">
            <Card><CardContent className="pt-4 text-[14px] text-muted-foreground">Visão geral do desempenho do app nos últimos 30 dias.</CardContent></Card>
          </TabsContent>
          <TabsContent value="rankings" className="pt-4">
            <Card><CardContent className="pt-4 text-[14px] text-muted-foreground">Posições nas categorias e buscas orgânicas.</CardContent></Card>
          </TabsContent>
          <TabsContent value="reviews" className="pt-4">
            <Card><CardContent className="pt-4 text-[14px] text-muted-foreground">Análise de avaliações e sentimento dos usuários.</CardContent></Card>
          </TabsContent>
        </Tabs>
      </PreviewBox>
    </section>
  )

  if (id === 'sidebar-comp') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox>
        <div
          className="w-[200px] h-[320px] flex flex-col rounded-xl overflow-hidden border border-border/50"
          style={{ background: 'var(--sidebar-bg)' }}
        >
          {/* Header */}
          <div className="p-4 flex items-center gap-2 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="size-6 rounded-md flex items-center justify-center text-xs font-bold text-white" style={{ background: 'var(--primary)' }}>R</div>
            <span className="text-[13px] font-medium text-white">RankMyApp</span>
          </div>
          {/* Nav */}
          <div className="flex-1 py-2 px-2 space-y-0.5">
            {[
              { icon: <LayoutDashboard size={13} />, label: 'Dashboard', active: true },
              { icon: <TrendingUp size={13} />, label: 'Keywords', active: false },
              { icon: <Star size={13} />, label: 'Reviews', active: false },
              { icon: <Bell size={13} />, label: 'Alertas', active: false },
            ].map(({ icon, label: nl, active }) => (
              <div
                key={nl}
                className="flex items-center gap-2 px-3 py-[7px] rounded-[5px] text-[12px] cursor-pointer"
                style={active
                  ? { background: 'var(--sidebar-active-bg)', color: 'white', borderLeft: '2px solid var(--sidebar-active-border)', fontWeight: 500 }
                  : { color: 'var(--sidebar-text)', borderLeft: '2px solid transparent' }
                }
              >
                {icon}{nl}
              </div>
            ))}
            <div className="text-[10px] uppercase tracking-wider px-3 pt-3 pb-1" style={{ color: 'var(--sidebar-group)' }}>
              Config
            </div>
            <div
              className="flex items-center gap-2 px-3 py-[7px] rounded-[5px] text-[12px] cursor-pointer"
              style={{ color: 'var(--sidebar-text)', borderLeft: '2px solid transparent' }}
            >
              <Settings size={13} />Settings
            </div>
          </div>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'breadcrumb-comp') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox center={false}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#">MI Tool DS</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PreviewBox>
    </section>
  )

  if (id === 'pagination') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox>
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </PreviewBox>
    </section>
  )

  // ── OVERLAY ───────────────────────────────────────────────────────────────────

  if (id === 'modal') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox>
        <Dialog>
          <DialogTrigger>
            <Button variant="outline">Abrir Modal</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[440px]">
            <DialogHeader>
              <DialogTitle>Adicionar keyword</DialogTitle>
              <DialogDescription>Configure os parâmetros de monitoramento para esta keyword.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-3">
              <div className="space-y-1.5">
                <Label>Keyword</Label>
                <Input placeholder="ex: aso tools" />
              </div>
              <div className="space-y-1.5">
                <Label>Mercado</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Selecione o mercado…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="br">🇧🇷 Brasil</SelectItem>
                    <SelectItem value="us">🇺🇸 Estados Unidos</SelectItem>
                    <SelectItem value="uk">🇬🇧 Reino Unido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" size="sm">Cancelar</Button>
              <Button size="sm">Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PreviewBox>
    </section>
  )

  if (id === 'tooltip') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox>
        <div className="flex gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="sm">Hover aqui</Button>
              </TooltipTrigger>
              <TooltipContent><p>Informação contextual de ajuda</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button size="icon" variant="ghost"><Info size={16} /></Button>
              </TooltipTrigger>
              <TooltipContent side="right"><p>Ícone de informação com tooltip</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'dropdown-menu') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">
              Opções <MoreHorizontal className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2"><User size={14} />Perfil</DropdownMenuItem>
            <DropdownMenuItem className="gap-2"><Settings size={14} />Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-error focus:text-error focus:bg-error/8">
              <Trash2 size={14} />Excluir conta
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PreviewBox>
    </section>
  )

  // ── LAYOUT ────────────────────────────────────────────────────────────────────

  if (id === 'appshell') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox center={false}>
        <div className="border border-border rounded-xl overflow-hidden w-full">
          {/* Header */}
          <div className="h-11 bg-card border-b border-border flex items-center px-4 justify-between">
            <div className="flex items-center gap-2">
              <div className="size-5 rounded flex items-center justify-center text-[10px] font-bold text-white" style={{ background: 'var(--primary)' }}>R</div>
              <span className="text-[13px] font-medium text-foreground">MI Tool</span>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-7 w-7 rounded-full" />
            </div>
          </div>
          {/* Body */}
          <div className="flex h-40 bg-background">
            <div className="w-40 border-r border-border p-3 space-y-1.5" style={{ background: 'var(--sidebar-bg)' }}>
              {[true, false, false, false].map((active, i) => (
                <div
                  key={i}
                  className="h-5 rounded-[4px]"
                  style={{ background: active ? 'var(--sidebar-active-bg)' : 'rgba(255,255,255,0.04)' }}
                />
              ))}
            </div>
            <div className="flex-1 p-4 space-y-3">
              <Skeleton className="h-4 w-1/3" />
              <div className="grid grid-cols-4 gap-2">
                {[1,2,3,4].map(i => <Skeleton key={i} className="h-10 rounded-lg" />)}
              </div>
              <Skeleton className="h-16 rounded-lg" />
            </div>
          </div>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'page-header') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox center={false}>
        <div className="space-y-4 max-w-lg">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
            <Home size={10} /><ChevronRight size={10} />
            <span>Keywords</span><ChevronRight size={10} />
            <span className="text-foreground">Monitoramento</span>
          </div>
          {/* Title + actions */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[26px] font-bold font-display tracking-tight text-foreground leading-tight">
                Monitoramento de Keywords
              </h1>
              <p className="text-[14px] text-muted-foreground mt-1">
                128 keywords · Atualizado há 5 min
              </p>
            </div>
            <div className="flex gap-2 shrink-0 mt-1">
              <Button variant="outline" size="sm">Exportar</Button>
              <Button size="sm">+ Adicionar</Button>
            </div>
          </div>
          <Separator />
        </div>
      </PreviewBox>
    </section>
  )

  // ── Fallback (seção não implementada) ────────────────────────────────────────

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}
      <div className="space-y-3">
        <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">{label}</h1>
        <p className="text-[17px] text-muted-foreground">
          Seção em desenvolvimento. Em breve terá demonstrações do componente <strong className="text-primary">{label}</strong>.
        </p>
      </div>
      <PreviewBox>
        <div className="text-center text-muted-foreground text-[14px] py-8">
          <div className="text-3xl mb-3">🛠</div>
          <p>Em desenvolvimento</p>
          <code className="text-[11px] text-primary font-mono mt-2 block">{id}</code>
        </div>
      </PreviewBox>
    </section>
  )
}
