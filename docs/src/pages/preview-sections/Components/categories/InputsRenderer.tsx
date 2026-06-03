import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group'
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox'
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Kbd } from '@/components/ui/kbd'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { format, subDays, subMonths } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { useDSTranslation } from '@docs/i18n'
import { CalendarIcon, TrendingUp, Star, Trash2, Bell, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Search, Globe, Mail, Phone } from 'lucide-react'

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

// ── DateRangePicker ───────────────────────────────────────────────────────────

function DateRangePickerSection({ breadcrumb, header }: { breadcrumb: React.ReactNode; header: React.ReactNode }) {
  const { t } = useDSTranslation()
  const PRESETS = [
    { key: 'today',       label: t('datepicker.presets.today'),       range: () => { const d = new Date(); return { from: d, to: d } } },
    { key: 'yesterday',   label: t('datepicker.presets.yesterday'),   range: () => { const d = subDays(new Date(), 1); return { from: d, to: d } } },
    { key: 'last7days',   label: t('datepicker.presets.last7days'),   range: () => ({ from: subDays(new Date(), 6), to: new Date() }) },
    { key: 'last15days',  label: t('datepicker.presets.last15days'),  range: () => ({ from: subDays(new Date(), 14), to: new Date() }) },
    { key: 'lastMonth',   label: t('datepicker.presets.lastMonth'),   range: () => ({ from: subDays(new Date(), 29), to: new Date() }) },
    { key: 'last3months', label: t('datepicker.presets.last3months'), range: () => ({ from: subMonths(new Date(), 3), to: new Date() }) },
  ]
  const [range, setRange] = React.useState<DateRange | undefined>({ from: subDays(new Date(), 6), to: new Date() })
  const [open, setOpen] = React.useState(false)
  const [activePresetKey, setActivePresetKey] = React.useState<string>('last7days')
  const [touched, setTouched] = React.useState(false)
  const isInvalid = touched && range?.from && !range?.to
  const label = range?.from
    ? range.to ? `${format(range.from, 'dd/MM/yyyy')} — ${format(range.to, 'dd/MM/yyyy')}` : format(range.from, 'dd/MM/yyyy')
    : t('datepicker.placeholder')
  const applyPreset = (preset: typeof PRESETS[0]) => { setRange(preset.range()); setActivePresetKey(preset.key); setTouched(false) }
  const handleApply = () => { setTouched(true); if (range?.from && range?.to) setOpen(false) }
  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>DateRangePicker interativo</SectionTitle>
      <div className="p-8 rounded-xl border border-border bg-card/20 flex flex-col items-start gap-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <button className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-[13px] rounded-lg border bg-card text-foreground hover:border-primary transition-colors font-sans min-w-[260px] justify-start ${isInvalid ? 'border-error' : 'border-border-emphasis'}`}
              style={{ borderColor: open ? 'var(--primary)' : isInvalid ? 'var(--error)' : undefined }}>
              <CalendarIcon size={14} className="text-muted-foreground shrink-0" />
              <span className={range?.from ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
              <span className="ml-auto text-muted-foreground text-[10px]">▾</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 shadow-lg" align="start" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-1.5 p-3 border-b border-border flex-wrap">
              <span className="text-[11px] font-medium text-muted-foreground mr-1 shrink-0">Período:</span>
              {PRESETS.map(p => (
                <button key={p.label} onClick={() => applyPreset(p)} className="px-2.5 py-1 text-[11px] rounded-full border transition-all"
                  style={activePresetKey === p.key
                    ? { background: 'color-mix(in srgb, var(--primary) 15%, transparent)', borderColor: 'var(--primary)', color: 'var(--primary)' }
                    : { background: 'var(--muted)', borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
                  {p.label}
                </button>
              ))}
            </div>
            <Calendar mode="range" selected={range} onSelect={r => { setRange(r); setActivePresetKey('') }} numberOfMonths={2} className="p-3" />
            <div className="flex items-center justify-between p-3 border-t border-border">
              <span className="text-[12px] text-muted-foreground">
                {range?.from && range?.to ? `${Math.round((range.to.getTime() - range.from.getTime()) / 86400000) + 1} dias` : t('datepicker.presetsTitle')}
              </span>
              <button onClick={handleApply} className="px-3 py-1.5 text-[12px] font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50" disabled={!range?.from}>{t('datepicker.apply')}</button>
            </div>
          </PopoverContent>
        </Popover>
        {isInvalid && <p role="alert" className="text-[12px] text-error flex items-center gap-1.5"><span>⚠</span>Selecione também a data de término.</p>}
        {range?.from && range?.to && (
          <div className="text-[12px] font-mono text-muted-foreground bg-muted/30 px-3 py-2 rounded-md border border-border/50">
            <span className="text-primary">from:</span> {format(range.from, 'yyyy-MM-dd')}
            <span className="mx-2 text-muted-foreground/40">|</span>
            <span className="text-primary">to:</span> {format(range.to, 'yyyy-MM-dd')}
          </div>
        )}
      </div>
      <SectionTitle>Trigger compacto</SectionTitle>
      <div className="p-8 rounded-xl border border-border bg-card/20 flex gap-3 flex-wrap">
        <button className="inline-flex items-center gap-2 px-3 py-2 text-[13px] rounded-lg border border-border bg-card text-foreground hover:border-primary transition-colors">
          <CalendarIcon size={13} className="text-muted-foreground" />
          {range?.from ? format(range.from, 'dd/MM') : '—'}{range?.to && <> — {format(range.to, 'dd/MM')}</>}
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-2 text-[12px] rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">Últimos 7 dias ▾</button>
      </div>
    </section>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

interface ComponentCategoryRendererProps {
  id: string
  label: string
  category?: string
}

export const InputsRenderer: React.FC<ComponentCategoryRendererProps> = ({ id, label, category = 'Components' }) => {
  const [checked, setChecked] = useState(false)
  const [toggled, setToggled] = useState(false)
  const [sliderVal, setSliderVal] = useState([50])
  const [commandOpen, setCommandOpen] = useState(false)

  const breadcrumb = (
    <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
      <span>{category}</span> <span>/</span> <span className="text-foreground">{label}</span>
    </div>
  )

  const header = (
    <div className="space-y-3">
      <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">{label}</h1>
      <p className="text-[17px] text-muted-foreground max-w-[640px] leading-relaxed">
        {category === 'Patterns'
          ? <>Padrao de composicao - combina componentes base para resolver um caso de uso especifico. Todos os tokens respondem ao tema ativo.</>
          : <>Demonstracao do componente <span className="font-semibold text-primary">{label}</span>. Todos os tokens respondem ao tema ativo.</>
        }
      </p>
    </div>
  )

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
      <SectionTitle>Com ícone</SectionTitle>
      <PreviewBox>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button><Search size={15} className="mr-1" />Buscar</Button>
          <Button variant="outline"><Bell size={15} className="mr-1" />Alertas</Button>
          <Button variant="secondary"><TrendingUp size={15} className="mr-1" />Relatório</Button>
          <Button variant="destructive"><Trash2 size={15} className="mr-1" />Excluir</Button>
        </div>
      </PreviewBox>
      <SectionTitle>ButtonGroup</SectionTitle>
      <PreviewBox>
        <div className="flex flex-col gap-4 items-center">
          <ButtonGroup>
            <Button variant="outline" size="sm">Cancelar</Button>
            <Button size="sm">Salvar</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="sm"><AlignLeft size={14} /></Button>
            <Button variant="outline" size="sm"><AlignCenter size={14} /></Button>
            <Button variant="outline" size="sm"><AlignRight size={14} /></Button>
          </ButtonGroup>
        </div>
      </PreviewBox>
      <SectionTitle>Estados</SectionTitle>
      <PreviewBox>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button disabled>Disabled</Button>
          <Button><span className="animate-spin mr-2 size-4 rounded-full border-2 border-white/30 border-t-white" />Carregando…</Button>
          <Button className="w-full max-w-xs">Full Width</Button>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'input') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Estados</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-4 max-w-sm">
          <div className="space-y-1.5"><Label>Email</Label><Input placeholder="nome@empresa.com" type="email" /></div>
          <div className="space-y-1.5"><Label>Senha</Label><Input placeholder="••••••••" type="password" /></div>
          <div className="space-y-1.5">
            <Label className="flex gap-1">Obrigatório <span className="text-error">*</span></Label>
            <Input placeholder="Campo obrigatório" className="border-error focus-visible:ring-error/30" />
            <p className="text-[12px] text-error">Este campo é obrigatório</p>
          </div>
          <div className="space-y-1.5"><Label>Desabilitado</Label><Input placeholder="Não editável" disabled /></div>
        </div>
      </PreviewBox>
      <SectionTitle>Com InputGroup (prefix/suffix)</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-3 max-w-sm">
          <InputGroup>
            <InputGroupAddon align="inline-start"><Search size={14} /></InputGroupAddon>
            <InputGroupInput placeholder="Buscar keyword..." />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon align="inline-start"><Globe size={14} /></InputGroupAddon>
            <InputGroupInput placeholder="https://" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon align="inline-start"><Mail size={14} /></InputGroupAddon>
            <InputGroupInput placeholder="nome@empresa.com" type="email" />
            <InputGroupAddon align="inline-end"><InputGroupText>@rankmyapp</InputGroupText></InputGroupAddon>
          </InputGroup>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'textarea') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Variantes</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-4 max-w-sm">
          <div className="space-y-1.5"><Label>Mensagem</Label><Textarea placeholder="Digite sua mensagem..." rows={3} /></div>
          <div className="space-y-1.5">
            <Label className="flex gap-1">Descrição <span className="text-error">*</span></Label>
            <Textarea placeholder="Obrigatório..." rows={3} className="border-error focus-visible:ring-error/30" />
            <p className="text-[12px] text-error">Campo obrigatório</p>
          </div>
          <div className="space-y-1.5"><Label>Desabilitado</Label><Textarea placeholder="Não editável" disabled rows={2} /></div>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'select') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Select simples</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-4 max-w-xs">
          <div className="space-y-1.5">
            <Label>Produto</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Selecione o produto…" /></SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectItem value="mi-tool">MI Tool</SelectItem>
                <SelectItem value="datarank">DataRank</SelectItem>
                <SelectItem value="ads">Ads Intelligence</SelectItem>
                <SelectItem value="geo">RankMyGEO</SelectItem>
                <SelectItem value="community">Rank Community</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5"><Label>Desabilitado</Label><Select disabled><SelectTrigger><SelectValue placeholder="Indisponível" /></SelectTrigger></Select></div>
        </div>
      </PreviewBox>
      <SectionTitle>Com grupos</SectionTitle>
      <PreviewBox center={false}>
        <div className="max-w-xs">
          <Select>
            <SelectTrigger><SelectValue placeholder="Selecione a plataforma…" /></SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                <SelectItem value="ios">iOS</SelectItem>
                <SelectItem value="android">Android</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectItem value="web">Web</SelectItem>
                <SelectItem value="pwa">PWA</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'native-select') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>NativeSelect</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-4 max-w-xs">
          <div className="space-y-1.5">
            <Label>País</Label>
            <NativeSelect>
              <NativeSelectOption value="">Selecione...</NativeSelectOption>
              <NativeSelectOption value="br">🇧🇷 Brasil</NativeSelectOption>
              <NativeSelectOption value="us">🇺🇸 Estados Unidos</NativeSelectOption>
              <NativeSelectOption value="uk">🇬🇧 Reino Unido</NativeSelectOption>
            </NativeSelect>
          </div>
          <div className="space-y-1.5">
            <Label>Plataforma</Label>
            <NativeSelect size="sm">
              <NativeSelectOption value="">Plataforma...</NativeSelectOption>
              <NativeSelectOption value="ios">iOS</NativeSelectOption>
              <NativeSelectOption value="android">Android</NativeSelectOption>
            </NativeSelect>
          </div>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'combobox') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Combobox com busca</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-4 max-w-xs">
          <div className="space-y-1.5">
            <Label>Produto</Label>
            <Combobox>
              <ComboboxInput placeholder="Buscar produto..." showClear />
              <ComboboxContent>
                <ComboboxList>
                  <ComboboxItem value="mi-tool">MI Tool</ComboboxItem>
                  <ComboboxItem value="datarank">DataRank</ComboboxItem>
                  <ComboboxItem value="ads">Ads Intelligence</ComboboxItem>
                  <ComboboxItem value="geo">RankMyGEO</ComboboxItem>
                  <ComboboxItem value="community">Rank Community</ComboboxItem>
                  <ComboboxEmpty>Nenhum produto encontrado.</ComboboxEmpty>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'radio-group') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Seleção única</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-6 max-w-sm">
          <div>
            <Label className="text-[13px] font-medium mb-3 block">Plataforma</Label>
            <RadioGroup defaultValue="android" className="gap-3">
              {[{ value: 'ios', label: 'iOS' }, { value: 'android', label: 'Android' }, { value: 'web', label: 'Web' }].map(({ value, label: lbl }) => (
                <div key={value} className="flex items-center gap-2.5">
                  <RadioGroupItem value={value} id={`plat-${value}`} />
                  <Label htmlFor={`plat-${value}`} className="cursor-pointer">{lbl}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <Label className="text-[13px] font-medium mb-3 block">Plano</Label>
            <RadioGroup defaultValue="pro" className="gap-3">
              {[{ value: 'free', label: 'Free', desc: 'Até 5 keywords' }, { value: 'pro', label: 'Pro', desc: 'Até 500 keywords' }, { value: 'enterprise', label: 'Enterprise', desc: 'Ilimitado', disabled: true }].map(({ value, label: lbl, desc, disabled }) => (
                <div key={value} className={`flex items-start gap-2.5 ${disabled ? 'opacity-50' : ''}`}>
                  <RadioGroupItem value={value} id={`plan-${value}`} disabled={disabled} />
                  <div>
                    <Label htmlFor={`plan-${value}`} className={disabled ? 'cursor-not-allowed' : 'cursor-pointer'}>{lbl}</Label>
                    <p className="text-[12px] text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
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
            <Label htmlFor="cb1" className="cursor-pointer">{checked ? 'Marcado ✓' : 'Aceito os termos e condições'}</Label>
          </div>
          <div className="flex items-center gap-3"><Checkbox id="cb2" defaultChecked /><Label htmlFor="cb2" className="cursor-pointer">Receber notificações</Label></div>
          <div className="flex items-center gap-3"><Checkbox id="cb3" disabled /><Label htmlFor="cb3" className="text-muted-foreground cursor-not-allowed">Desabilitado</Label></div>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'switch') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Switch</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch id="sw1" checked={toggled} onCheckedChange={setToggled} />
            <Label htmlFor="sw1" className="cursor-pointer">Notificações: {toggled ? 'Ativas' : 'Desativadas'}</Label>
          </div>
          <div className="flex items-center gap-3"><Switch id="sw2" defaultChecked /><Label htmlFor="sw2" className="cursor-pointer">Atualizações automáticas</Label></div>
          <div className="flex items-center gap-3"><Switch id="sw3" /><Label htmlFor="sw3" className="cursor-pointer">Modo escuro</Label></div>
          <div className="flex items-center gap-3"><Switch id="sw4" disabled /><Label htmlFor="sw4" className="text-muted-foreground">Desabilitado</Label></div>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'toggle') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Toggle Button</SectionTitle>
      <PreviewBox>
        <div className="flex gap-2">
          <Toggle aria-label="Negrito"><Bold size={15} /></Toggle>
          <Toggle defaultPressed aria-label="Itálico"><Italic size={15} /></Toggle>
          <Toggle aria-label="Sublinhado"><Underline size={15} /></Toggle>
        </div>
      </PreviewBox>
      <SectionTitle>ToggleGroup — alinhamento</SectionTitle>
      <PreviewBox>
        <ToggleGroup defaultValue={['left']}>
          <ToggleGroupItem value="left" aria-label="Alinhar à esquerda"><AlignLeft size={15} /></ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Centralizar"><AlignCenter size={15} /></ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Alinhar à direita"><AlignRight size={15} /></ToggleGroupItem>
        </ToggleGroup>
      </PreviewBox>
      <SectionTitle>ToggleGroup — múltipla seleção</SectionTitle>
      <PreviewBox>
        <ToggleGroup>
          <ToggleGroupItem value="bold"><Bold size={15} /></ToggleGroupItem>
          <ToggleGroupItem value="italic"><Italic size={15} /></ToggleGroupItem>
          <ToggleGroupItem value="underline"><Underline size={15} /></ToggleGroupItem>
        </ToggleGroup>
      </PreviewBox>
    </section>
  )

  if (id === 'slider') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Slider simples</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-6 max-w-sm">
          <div>
            <div className="flex justify-between text-[13px] mb-3">
              <Label>Volume</Label>
              <span className="text-primary font-mono font-medium">{sliderVal[0]}%</span>
            </div>
            <Slider value={sliderVal} onValueChange={(v) => setSliderVal(Array.isArray(v) ? [...v] as number[] : [v as number])} min={0} max={100} />
          </div>
          <div>
            <Label className="text-[13px] mb-3 block">Desabilitado</Label>
            <Slider defaultValue={[40]} disabled />
          </div>
        </div>
      </PreviewBox>
      <SectionTitle>Range (dois thumbs)</SectionTitle>
      <PreviewBox center={false}>
        <div className="max-w-sm">
          <Label className="text-[13px] mb-3 block">Faixa de preço</Label>
          <Slider defaultValue={[20, 80]} min={0} max={100} />
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'input-otp') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>OTP de 6 dígitos</SectionTitle>
      <PreviewBox>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </PreviewBox>
      <SectionTitle>PIN de 4 dígitos</SectionTitle>
      <PreviewBox>
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} /><InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </PreviewBox>
    </section>
  )

  if (id === 'field') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Field com label, descrição e erro</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-4 max-w-sm">
          <Field>
            <FieldLabel htmlFor="f-email">Email</FieldLabel>
            <Input id="f-email" placeholder="nome@empresa.com" type="email" />
            <FieldDescription>Usado para login e notificações.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="f-keyword">Keyword <span className="text-error">*</span></FieldLabel>
            <Input id="f-keyword" placeholder="ex: aso tools" className="border-error focus-visible:ring-error/30" />
            <FieldError>Este campo é obrigatório.</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="f-disabled">Campo desabilitado</FieldLabel>
            <Input id="f-disabled" placeholder="Não editável" disabled />
            <FieldDescription>Este campo não pode ser editado.</FieldDescription>
          </Field>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'input-group') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Prefix e suffix</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-3 max-w-sm">
          <InputGroup>
            <InputGroupAddon align="inline-start"><Search size={14} /></InputGroupAddon>
            <InputGroupInput placeholder="Buscar keywords..." />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon align="inline-start"><Globe size={14} /></InputGroupAddon>
            <InputGroupInput placeholder="https://seusite.com" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon align="inline-start"><Mail size={14} /></InputGroupAddon>
            <InputGroupInput placeholder="nome" />
            <InputGroupAddon align="inline-end"><InputGroupText>@rankmyapp.com</InputGroupText></InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon align="inline-start"><Phone size={14} /></InputGroupAddon>
            <InputGroupInput placeholder="(00) 00000-0000" />
          </InputGroup>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'button-group') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Horizontal</SectionTitle>
      <PreviewBox>
        <div className="flex flex-col gap-4 items-center">
          <ButtonGroup>
            <Button variant="outline" size="sm">Cancelar</Button>
            <Button size="sm">Salvar</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="sm">Exportar</Button>
            <ButtonGroupSeparator />
            <Button variant="outline" size="sm">Importar</Button>
            <ButtonGroupSeparator />
            <Button variant="outline" size="sm">Configurar</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="sm"><AlignLeft size={14} /></Button>
            <Button variant="outline" size="sm"><AlignCenter size={14} /></Button>
            <Button variant="outline" size="sm"><AlignRight size={14} /></Button>
          </ButtonGroup>
        </div>
      </PreviewBox>
      <SectionTitle>Vertical</SectionTitle>
      <PreviewBox>
        <ButtonGroup orientation="vertical">
          <Button variant="outline" size="sm">Opção 1</Button>
          <Button variant="outline" size="sm">Opção 2</Button>
          <Button variant="outline" size="sm">Opção 3</Button>
        </ButtonGroup>
      </PreviewBox>
    </section>
  )

  if (id === 'daterangepicker') return (
    <DateRangePickerSection breadcrumb={breadcrumb} header={header} />
  )

  if (id === 'command') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Command palette embutido</SectionTitle>
      <PreviewBox center={false}>
        <div className="border rounded-lg overflow-hidden max-w-sm w-full">
          <Command>
            <CommandInput placeholder="Buscar componente ou seção..." />
            <CommandList className="max-h-72">
              <CommandEmpty>Nenhum resultado.</CommandEmpty>
              <CommandGroup heading="Componentes">
                <CommandItem>Button</CommandItem>
                <CommandItem>Input</CommandItem>
                <CommandItem>Select</CommandItem>
                <CommandItem>Checkbox</CommandItem>
              </CommandGroup>
              <CommandGroup heading="Foundations">
                <CommandItem>Cores</CommandItem>
                <CommandItem>Tipografia</CommandItem>
                <CommandItem>Espaçamento</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </PreviewBox>
      <SectionTitle>Via Dialog (⌘K)</SectionTitle>
      <PreviewBox>
        <Button variant="outline" onClick={() => setCommandOpen(true)}>
          <Search size={14} className="mr-2" />Abrir Command Palette
          <Kbd className="ml-2">⌘K</Kbd>
        </Button>
        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado.</CommandEmpty>
            <CommandGroup heading="Navegação">
              <CommandItem onSelect={() => setCommandOpen(false)}>Introdução</CommandItem>
              <CommandItem onSelect={() => setCommandOpen(false)}>Instalação</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </PreviewBox>
    </section>
  )

  // ── DISPLAY ──────────────────────────────────────────────────────────────────

  return null
}
