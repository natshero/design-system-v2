import React, { useState } from 'react'
import { Button }       from '@/components/ui/button'
import { Input }        from '@/components/ui/input'
import { Label }        from '@/components/ui/label'
import { Textarea }     from '@/components/ui/textarea'
import { Badge }        from '@/components/ui/badge'
import { Checkbox }     from '@/components/ui/checkbox'
import { Switch }       from '@/components/ui/switch'
import { Toggle }       from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
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
  Select, SelectContent, SelectGroup, SelectItem,
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
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
  DropdownMenuCheckboxItem, DropdownMenuSub, DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group'
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Combobox, ComboboxContent, ComboboxEmpty,
  ComboboxInput, ComboboxItem, ComboboxList,
} from '@/components/ui/combobox'
import {
  Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from '@/components/ui/command'
import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel,
  ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from '@/components/ui/drawer'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import {
  InputGroup, InputGroupAddon, InputGroupInput, InputGroupText,
} from '@/components/ui/input-group'
import {
  InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,
} from '@/components/ui/input-otp'
import {
  Item, ItemActions, ItemContent, ItemDescription as ItemDesc,
  ItemGroup, ItemMedia, ItemTitle,
} from '@/components/ui/item'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import {
  Menubar, MenubarContent, MenubarItem, MenubarMenu,
  MenubarSeparator, MenubarShortcut, MenubarTrigger,
} from '@/components/ui/menubar'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  ResizableHandle, ResizablePanel, ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet, SheetContent, SheetDescription, SheetFooter,
  SheetHeader, SheetTitle, SheetTrigger,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { format, subDays, subMonths } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { useDSTranslation } from '@/i18n'
import {
  Info, AlertCircle, CheckCircle2, AlertTriangle,
  CalendarIcon, MoreHorizontal, Settings, LayoutDashboard,
  TrendingUp, TrendingDown, Minus, Star, Trash2,
  ChevronRight, Home, User, Bell, ArrowUpRight, ArrowDownRight,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Search, Globe, Mail, Phone, MapPin, Copy, Edit2, ExternalLink,
  ChevronDown, Package, BarChart2, Users, Zap,
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

interface ComponentRendererProps {
  id: string
  label: string
  category?: string
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ id, label, category = 'Components' }) => {
  const [checked, setChecked] = useState(false)
  const [toggled, setToggled] = useState(false)
  const [sliderVal, setSliderVal] = useState([50])
  const [commandOpen, setCommandOpen] = useState(false)
  const [progressVal] = useState(68)

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
          ? <>Padrão de composição — combina componentes base para resolver um caso de uso específico. Todos os tokens respondem ao tema ativo.</>
          : <>Demonstração do componente <span className="font-semibold text-primary">{label}</span>. Todos os tokens respondem ao tema ativo.</>
        }
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
              <SelectContent>
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
            <SelectContent>
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
            { label: 'Brand', bg: 'var(--primary)' },
            { label: 'Success', bg: 'var(--success)' },
            { label: 'Warning', bg: 'var(--warning)' },
            { label: 'Error', bg: 'var(--error)' },
          ].map(({ label: bl, bg }) => (
            <span key={bl} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border"
              style={{ background: `color-mix(in srgb, ${bg} 15%, transparent)`, borderColor: `color-mix(in srgb, ${bg} 30%, transparent)`, color: bg }}>
              <span className="size-1.5 rounded-full" style={{ background: bg }} />{bl}
            </span>
          ))}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border border-border text-muted-foreground bg-muted/30">Default</span>
        </div>
      </PreviewBox>
      <SectionTitle>Tamanhos</SectionTitle>
      <PreviewBox>
        <div className="flex flex-wrap gap-3 items-center justify-center">
          <Badge className="text-[10px] px-1.5 py-0">XS</Badge>
          <Badge>Default</Badge>
          <Badge className="text-[13px] px-3 py-1">LG</Badge>
        </div>
      </PreviewBox>
      <SectionTitle>Com dot (status)</SectionTitle>
      <PreviewBox>
        <div className="flex flex-wrap gap-3 items-center justify-center">
          {[{ label: 'Ativo', color: 'var(--success)' }, { label: 'Pendente', color: 'var(--warning)' }, { label: 'Inativo', color: 'var(--muted-foreground)' }].map(({ label: bl, color }) => (
            <span key={bl} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium bg-muted/50 border border-border text-foreground">
              <span className="size-2 rounded-full animate-pulse" style={{ background: color }} />{bl}
            </span>
          ))}
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
                <AvatarFallback className="text-xs font-semibold bg-primary/15 text-primary">{['JF', 'AP', 'CM', 'BL', 'RS'][i]}</AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-muted-foreground">{sz}</span>
            </div>
          ))}
        </div>
      </PreviewBox>
      <SectionTitle>Com imagem + fallback</SectionTitle>
      <PreviewBox>
        <div className="flex gap-4 items-center">
          <Avatar className="size-10"><AvatarImage src="https://github.com/shadcn.png" alt="shadcn" /><AvatarFallback>SC</AvatarFallback></Avatar>
          <Avatar className="size-10"><AvatarFallback className="bg-primary text-white font-semibold">RM</AvatarFallback></Avatar>
          <Avatar className="size-10"><AvatarFallback className="bg-secondary text-white font-semibold">PV</AvatarFallback></Avatar>
        </div>
      </PreviewBox>
      <SectionTitle>Avatar Group</SectionTitle>
      <PreviewBox>
        <div className="flex items-center">
          {['JF', 'AP', 'CM', 'BL'].map((initials, i) => (
            <Avatar key={initials} className="size-9 ring-2 ring-background" style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 4 - i }}>
              <AvatarFallback className="text-xs font-semibold bg-primary/20 text-primary">{initials}</AvatarFallback>
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
          <CardHeader><CardTitle>Nova Análise</CardTitle><CardDescription>Configure os parâmetros para monitoramento.</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1"><Label className="text-[13px]">Nome do app</Label><Input placeholder="ex: com.nubank.android" /></div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2"><Button variant="outline" size="sm">Cancelar</Button><Button size="sm">Salvar</Button></CardFooter>
        </Card>
      </PreviewBox>
      <SectionTitle>Card horizontal</SectionTitle>
      <PreviewBox center={false}>
        <Card className="max-w-md flex flex-row overflow-hidden">
          <div className="w-24 bg-primary/10 flex items-center justify-center shrink-0">
            <BarChart2 size={32} className="text-primary" />
          </div>
          <div className="flex-1">
            <CardHeader className="pb-1"><CardTitle className="text-base">DataRank</CardTitle><CardDescription>Análise de market intelligence</CardDescription></CardHeader>
            <CardContent className="pt-0"><Badge variant="secondary">v2.1.0</Badge></CardContent>
          </div>
        </Card>
      </PreviewBox>
      <SectionTitle>Card clicável</SectionTitle>
      <PreviewBox center={false}>
        <div className="grid grid-cols-3 gap-3 max-w-sm">
          {[{ icon: <Package size={18} />, label: 'Produtos' }, { icon: <BarChart2 size={18} />, label: 'Analytics' }, { icon: <Users size={18} />, label: 'Usuários' }].map(({ icon, label: cl }) => (
            <Card key={cl} className="cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-colors active:scale-[0.98]">
              <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
                <div className="text-primary">{icon}</div>
                <span className="text-[12px] font-medium">{cl}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'accordion') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>FAQ</SectionTitle>
      <PreviewBox center={false}>
        <div className="max-w-lg w-full">
          <Accordion multiple={false}>
            {[
              { value: 'q1', question: 'O que é ASO?', answer: 'App Store Optimization é o processo de otimizar aplicativos móveis para ranquear melhor nos resultados de busca das lojas de apps.' },
              { value: 'q2', question: 'Como funciona o rastreamento de keywords?', answer: 'O RankMyApp monitora a posição do seu app para palavras-chave específicas em diferentes países e plataformas em tempo real.' },
              { value: 'q3', question: 'Quais plataformas são suportadas?', answer: 'Suportamos App Store (iOS) e Google Play (Android) com cobertura em mais de 60 países.' },
              { value: 'q4', question: 'Com que frequência os dados são atualizados?', answer: 'Os dados de ranking são atualizados diariamente, com opção de atualização em tempo real nos planos Enterprise.' },
            ].map(({ value, question, answer }) => (
              <AccordionItem key={value} value={value}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'carousel') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Cards em carrossel</SectionTitle>
      <PreviewBox>
        <div className="w-full max-w-sm px-12">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {[
                { title: 'MI Tool', desc: 'Market Intelligence', color: 'var(--primary)' },
                { title: 'DataRank', desc: 'Ranking Analytics', color: 'var(--success)' },
                { title: 'Ads Intel', desc: 'Ads Intelligence', color: 'var(--warning)' },
                { title: 'RankMyGEO', desc: 'Geo Insights', color: 'var(--error)' },
              ].map(({ title, desc, color }) => (
                <CarouselItem key={title}>
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center gap-3 text-center">
                      <div className="size-12 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: color }}>{title[0]}</div>
                      <div><p className="font-semibold text-foreground">{title}</p><p className="text-[13px] text-muted-foreground">{desc}</p></div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'collapsible') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Seção colapsável</SectionTitle>
      <PreviewBox center={false}>
        <div className="max-w-sm w-full space-y-3">
          <Collapsible>
            <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-card">
              <span className="text-[14px] font-medium">Filtros avançados</span>
              <CollapsibleTrigger>
                <Button variant="ghost" size="icon" className="size-7"><ChevronDown size={14} /></Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="px-4 py-3 border border-t-0 rounded-b-lg border-border space-y-3">
                <div className="space-y-1.5"><Label className="text-[13px]">País</Label>
                  <NativeSelect><NativeSelectOption value="">Todos...</NativeSelectOption><NativeSelectOption value="br">Brasil</NativeSelectOption></NativeSelect>
                </div>
                <div className="space-y-1.5"><Label className="text-[13px]">Plataforma</Label>
                  <NativeSelect><NativeSelectOption value="">Todas...</NativeSelectOption><NativeSelectOption value="ios">iOS</NativeSelectOption><NativeSelectOption value="android">Android</NativeSelectOption></NativeSelect>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'table') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Tabela básica</SectionTitle>
      <PreviewBox center={false}>
        <div className="rounded-lg border border-border overflow-hidden w-full">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>App</TableHead>
                <TableHead>Plataforma</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { app: 'Nubank', platform: 'Android', cat: 'Finanças', rating: '4.8' },
                { app: 'iFood', platform: 'iOS', cat: 'Alimentação', rating: '4.6' },
                { app: 'Uber', platform: 'Android', cat: 'Transporte', rating: '4.4' },
                { app: 'Mercado Livre', platform: 'iOS', cat: 'Compras', rating: '4.7' },
              ].map(({ app, platform, cat, rating }) => (
                <TableRow key={app} className="hover:bg-muted/20">
                  <TableCell className="font-medium">{app}</TableCell>
                  <TableCell><Badge variant="outline" className="text-[11px]">{platform}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{cat}</TableCell>
                  <TableCell className="text-right font-medium text-primary">{rating} ★</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'kbd') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Atalhos de teclado</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-3 max-w-sm w-full">
          {[
            { keys: ['⌘', 'K'], desc: 'Abrir busca global' },
            { keys: ['⌘', 'S'], desc: 'Salvar alterações' },
            { keys: ['⌘', 'Z'], desc: 'Desfazer' },
            { keys: ['⌘', 'Shift', 'Z'], desc: 'Refazer' },
            { keys: ['Esc'], desc: 'Fechar modal / cancelar' },
          ].map(({ keys, desc }) => (
            <div key={desc} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <span className="text-[13px] text-muted-foreground">{desc}</span>
              <KbdGroup>
                {keys.map(k => <Kbd key={k}>{k}</Kbd>)}
              </KbdGroup>
            </div>
          ))}
        </div>
      </PreviewBox>
      <SectionTitle>Kbd standalone</SectionTitle>
      <PreviewBox>
        <div className="flex gap-2 items-center flex-wrap justify-center">
          <Kbd>⌘</Kbd><Kbd>Ctrl</Kbd><Kbd>Alt</Kbd><Kbd>Shift</Kbd><Kbd>Enter</Kbd><Kbd>Esc</Kbd><Kbd>Tab</Kbd>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'item') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Item com media e ações</SectionTitle>
      <PreviewBox center={false}>
        <ItemGroup className="max-w-md w-full">
          {[
            { initials: 'MI', name: 'MI Tool', desc: 'Market Intelligence para ASO', color: 'var(--primary)' },
            { initials: 'DR', name: 'DataRank', desc: 'Rankings e benchmarks', color: 'var(--success)' },
            { initials: 'AI', name: 'Ads Intelligence', desc: 'Análise de campanhas pagas', color: 'var(--warning)' },
          ].map(({ initials, name, desc, color }) => (
            <Item key={name} variant="outline">
              <ItemMedia variant="image">
                <div className="size-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: color }}>{initials}</div>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{name}</ItemTitle>
                <ItemDesc>{desc}</ItemDesc>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm">Ver</Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </PreviewBox>
      <SectionTitle>Item tamanho xs</SectionTitle>
      <PreviewBox center={false}>
        <ItemGroup className="max-w-md w-full">
          {['rankmyapp', 'aso tools', 'app marketing'].map(kw => (
            <Item key={kw} size="xs" variant="outline">
              <ItemContent><ItemTitle className="text-[13px]">{kw}</ItemTitle></ItemContent>
              <ItemActions><Badge variant="secondary">12.4K</Badge></ItemActions>
            </Item>
          ))}
        </ItemGroup>
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
          <Alert><Info className="size-4" /><AlertTitle>Informação</AlertTitle><AlertDescription>Uma nova versão está disponível com melhorias de performance.</AlertDescription></Alert>
          <Alert style={{ borderLeftColor: 'var(--success)', background: 'color-mix(in srgb, var(--success) 6%, transparent)' }}>
            <CheckCircle2 className="size-4" style={{ color: 'var(--success)' }} /><AlertTitle>Sucesso</AlertTitle><AlertDescription>Dados importados com sucesso. 1.234 keywords adicionadas.</AlertDescription>
          </Alert>
          <Alert style={{ borderLeftColor: 'var(--warning)', background: 'color-mix(in srgb, var(--warning) 6%, transparent)' }}>
            <AlertTriangle className="size-4" style={{ color: 'var(--warning)' }} /><AlertTitle>Atenção</AlertTitle><AlertDescription>Sua assinatura expira em 7 dias. Renove para manter o acesso.</AlertDescription>
          </Alert>
          <Alert variant="destructive"><AlertCircle className="size-4" /><AlertTitle>Erro na importação</AlertTitle><AlertDescription>O arquivo enviado possui formato inválido ou está corrompido.</AlertDescription></Alert>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'toast') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={() => toast('Ação realizada!')} variant="outline">Toast padrão</Button>
          <Button onClick={() => toast.success('Salvo!', { description: 'Dados atualizados às 15:24.' })} className="bg-success/15 text-success border border-success/30 hover:bg-success/25">Toast sucesso</Button>
          <Button onClick={() => toast.warning('Atenção', { description: 'Verifique os dados antes de prosseguir.' })} className="bg-warning/15 text-warning border border-warning/30 hover:bg-warning/25">Toast aviso</Button>
          <Button onClick={() => toast.error('Erro ao salvar', { description: 'Verifique sua conexão.' })} variant="destructive">Toast erro</Button>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'progress') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Determinate</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-4 max-w-md w-full">
          {[{ label: 'Downloads', value: 68, color: 'var(--primary)' }, { label: 'Instalações', value: 45, color: 'var(--success)' }, { label: 'Desinstalações', value: 23, color: 'var(--error)' }, { label: 'Avaliações', value: 87, color: 'var(--warning)' }].map(({ label: pl, value, color }) => (
            <div key={pl}>
              <div className="flex justify-between text-[13px] mb-1.5">
                <span className="text-muted-foreground">{pl}</span>
                <span className="font-mono font-medium" style={{ color }}>{value}%</span>
              </div>
              <Progress value={value} className="h-2" style={{ '--primary': color } as React.CSSProperties} />
            </div>
          ))}
        </div>
      </PreviewBox>
      <SectionTitle>Tamanhos</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-3 max-w-md w-full">
          <Progress value={60} className="h-1" />
          <Progress value={60} className="h-2" />
          <Progress value={60} className="h-3" />
          <Progress value={60} className="h-4" />
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'spinner') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Tamanhos</SectionTitle>
      <PreviewBox>
        <div className="flex items-end gap-6">
          {[14, 18, 24, 36].map(size => (
            <div key={size} className="flex flex-col items-center gap-2">
              <span className="animate-spin rounded-full border-[2px]" style={{ width: size, height: size, borderColor: `color-mix(in srgb, var(--primary) 18%, transparent)`, borderTopColor: 'var(--primary)', animationDuration: '0.75s' }} />
              <span className="text-[10px] text-muted-foreground">{size}px</span>
            </div>
          ))}
        </div>
      </PreviewBox>
      <SectionTitle>Com texto</SectionTitle>
      <PreviewBox>
        <div className="flex flex-col items-center gap-3">
          <span className="animate-spin rounded-full border-[3px]" style={{ width: 36, height: 36, borderColor: `color-mix(in srgb, var(--primary) 18%, transparent)`, borderTopColor: 'var(--primary)' }} />
          <span className="text-[13px] text-muted-foreground">Carregando dados…</span>
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
          <div className="flex-1 space-y-2"><Skeleton className="h-3.5 w-full" /><Skeleton className="h-3.5 w-4/5" /></div>
        </div>
      </PreviewBox>
      <SectionTitle>Tabela loading</SectionTitle>
      <PreviewBox center={false}>
        <div className="space-y-2 max-w-lg">
          <div className="flex gap-4 py-2 border-b border-border">
            {['w-1/4', 'w-1/3', 'w-1/5', 'w-1/6'].map(w => <Skeleton key={w} className={`h-3 ${w}`} />)}
          </div>
          {[1,2,3].map(i => (
            <div key={i} className="flex gap-4 py-2 border-b border-border/50">
              {['w-1/4', 'w-1/3', 'w-1/5', 'w-1/6'].map(w => <Skeleton key={w} className={`h-3 ${w}`} />)}
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
          <div className="size-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}>
            <Bell size={24} style={{ color: 'var(--primary)' }} />
          </div>
          <h3 className="text-[18px] font-semibold text-foreground font-display mb-2">Nenhuma keyword monitorada</h3>
          <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">Você ainda não adicionou keywords para monitoramento. Comece agora para ver dados de ranking.</p>
          <Button size="sm">Adicionar keyword</Button>
        </div>
      </PreviewBox>
    </section>
  )

  // ── NAVIGATION ────────────────────────────────────────────────────────────────

  if (id === 'tabs') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Tabs horizontal</SectionTitle>
      <PreviewBox center={false}>
        <Tabs defaultValue="overview" className="w-full max-w-lg">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rankings">Rankings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="pt-4"><Card><CardContent className="pt-4 text-[14px] text-muted-foreground">Visão geral do desempenho do app nos últimos 30 dias.</CardContent></Card></TabsContent>
          <TabsContent value="rankings" className="pt-4"><Card><CardContent className="pt-4 text-[14px] text-muted-foreground">Posições nas categorias e buscas orgânicas.</CardContent></Card></TabsContent>
          <TabsContent value="reviews" className="pt-4"><Card><CardContent className="pt-4 text-[14px] text-muted-foreground">Análise de avaliações e sentimento dos usuários.</CardContent></Card></TabsContent>
        </Tabs>
      </PreviewBox>
      <SectionTitle>Tabs com ícone e badge</SectionTitle>
      <PreviewBox center={false}>
        <Tabs defaultValue="keywords" className="w-full max-w-lg">
          <TabsList>
            <TabsTrigger value="keywords" className="gap-1.5"><Search size={13} />Keywords <Badge className="ml-1 h-4 px-1 text-[10px]">128</Badge></TabsTrigger>
            <TabsTrigger value="reviews" className="gap-1.5"><Star size={13} />Reviews <Badge variant="destructive" className="ml-1 h-4 px-1 text-[10px]">3</Badge></TabsTrigger>
            <TabsTrigger value="alerts" className="gap-1.5"><Bell size={13} />Alertas</TabsTrigger>
          </TabsList>
          <TabsContent value="keywords" className="pt-4"><Card><CardContent className="pt-4 text-[14px] text-muted-foreground">128 keywords sendo monitoradas.</CardContent></Card></TabsContent>
          <TabsContent value="reviews" className="pt-4"><Card><CardContent className="pt-4 text-[14px] text-muted-foreground">3 avaliações precisam de resposta.</CardContent></Card></TabsContent>
          <TabsContent value="alerts" className="pt-4"><Card><CardContent className="pt-4 text-[14px] text-muted-foreground">Nenhum alerta ativo no momento.</CardContent></Card></TabsContent>
        </Tabs>
      </PreviewBox>
    </section>
  )

  if (id === 'sidebar-comp') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox>
        <div className="w-[200px] h-[320px] flex flex-col rounded-xl overflow-hidden border border-border/50" style={{ background: 'var(--sidebar-bg)' }}>
          <div className="p-4 flex items-center gap-2 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="size-6 rounded-md flex items-center justify-center text-xs font-bold text-white" style={{ background: 'var(--primary)' }}>R</div>
            <span className="text-[13px] font-medium text-white">RankMyApp</span>
          </div>
          <div className="flex-1 py-2 px-2 space-y-0.5">
            {[
              { icon: <LayoutDashboard size={13} />, label: 'Dashboard', active: true },
              { icon: <TrendingUp size={13} />, label: 'Keywords', active: false },
              { icon: <Star size={13} />, label: 'Reviews', active: false },
              { icon: <Bell size={13} />, label: 'Alertas', active: false },
            ].map(({ icon, label: nl, active }) => (
              <div key={nl} className="flex items-center gap-2 px-3 py-[7px] rounded-[5px] text-[12px] cursor-pointer"
                style={active ? { background: 'var(--sidebar-active-bg)', color: 'white', borderLeft: '2px solid var(--sidebar-active-border)', fontWeight: 500 } : { color: 'var(--sidebar-text)', borderLeft: '2px solid transparent' }}>
                {icon}{nl}
              </div>
            ))}
            <div className="text-[10px] uppercase tracking-wider px-3 pt-3 pb-1" style={{ color: 'var(--sidebar-group)' }}>Config</div>
            <div className="flex items-center gap-2 px-3 py-[7px] rounded-[5px] text-[12px] cursor-pointer" style={{ color: 'var(--sidebar-text)', borderLeft: '2px solid transparent' }}><Settings size={13} />Settings</div>
          </div>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'breadcrumb-comp') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Breadcrumb padrão</SectionTitle>
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
      <SectionTitle>Breadcrumb com ícone</SectionTitle>
      <PreviewBox center={false}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#" className="flex items-center gap-1"><Home size={13} />Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#" className="flex items-center gap-1"><BarChart2 size={13} />Keywords</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Monitoramento</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PreviewBox>
    </section>
  )

  if (id === 'pagination') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Paginação padrão</SectionTitle>
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

  if (id === 'menubar') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Menubar de aplicação</SectionTitle>
      <PreviewBox>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Arquivo</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Novo <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
              <MenubarItem>Abrir <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Salvar <MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>
              <MenubarItem>Exportar</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Editar</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Desfazer <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
              <MenubarItem>Refazer <MenubarShortcut>⌘⇧Z</MenubarShortcut></MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Copiar <MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
              <MenubarItem>Colar <MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Visualizar</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Tela cheia <MenubarShortcut>⌘⇧F</MenubarShortcut></MenubarItem>
              <MenubarItem>Zoom in <MenubarShortcut>⌘+</MenubarShortcut></MenubarItem>
              <MenubarItem>Zoom out <MenubarShortcut>⌘-</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </PreviewBox>
    </section>
  )

  if (id === 'navigation-menu') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Nav com dropdown</SectionTitle>
      <PreviewBox>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-2 p-4 w-[320px]">
                  {[
                    { icon: <BarChart2 size={16} />, name: 'MI Tool', desc: 'Market Intelligence' },
                    { icon: <TrendingUp size={16} />, name: 'DataRank', desc: 'Rankings & Benchmarks' },
                    { icon: <Zap size={16} />, name: 'Ads Intelligence', desc: 'Análise de anúncios' },
                  ].map(({ icon, name, desc }) => (
                    <NavigationMenuLink key={name} href="#">
                      <div className="text-primary shrink-0">{icon}</div>
                      <div><p className="text-[13px] font-medium">{name}</p><p className="text-[12px] text-muted-foreground">{desc}</p></div>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>Preços</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>Docs</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </PreviewBox>
    </section>
  )

  // ── OVERLAY ───────────────────────────────────────────────────────────────────

  if (id === 'modal') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Modal de formulário</SectionTitle>
      <PreviewBox>
        <Dialog>
          <DialogTrigger><Button variant="outline">Abrir Modal</Button></DialogTrigger>
          <DialogContent className="sm:max-w-[440px]">
            <DialogHeader><DialogTitle>Adicionar keyword</DialogTitle><DialogDescription>Configure os parâmetros de monitoramento.</DialogDescription></DialogHeader>
            <div className="space-y-3 py-3">
              <div className="space-y-1.5"><Label>Keyword</Label><Input placeholder="ex: aso tools" /></div>
              <div className="space-y-1.5">
                <Label>Mercado</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecione…" /></SelectTrigger><SelectContent><SelectItem value="br">🇧🇷 Brasil</SelectItem><SelectItem value="us">🇺🇸 EUA</SelectItem></SelectContent></Select>
              </div>
            </div>
            <DialogFooter><Button variant="outline" size="sm">Cancelar</Button><Button size="sm">Adicionar</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </PreviewBox>
      <SectionTitle>Modal de confirmação destrutiva</SectionTitle>
      <PreviewBox>
        <Dialog>
          <DialogTrigger><Button variant="destructive">Excluir projeto</Button></DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <div className="size-10 rounded-full bg-error/10 flex items-center justify-center mb-2"><Trash2 size={18} className="text-error" /></div>
              <DialogTitle>Excluir projeto</DialogTitle>
              <DialogDescription>Esta ação não pode ser desfeita. O projeto e todos os dados associados serão permanentemente removidos.</DialogDescription>
            </DialogHeader>
            <DialogFooter><Button variant="outline" size="sm">Cancelar</Button><Button variant="destructive" size="sm">Sim, excluir</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </PreviewBox>
    </section>
  )

  if (id === 'tooltip') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Tooltip básico</SectionTitle>
      <PreviewBox>
        <div className="flex gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><Button variant="outline" size="sm">Hover aqui</Button></TooltipTrigger>
              <TooltipContent><p>Informação contextual de ajuda</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><Button size="icon" variant="ghost"><Info size={16} /></Button></TooltipTrigger>
              <TooltipContent side="right"><p>Ícone de informação</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </PreviewBox>
      <SectionTitle>Direções</SectionTitle>
      <PreviewBox>
        <div className="grid grid-cols-2 gap-3">
          {(['top', 'right', 'bottom', 'left'] as const).map(side => (
            <TooltipProvider key={side}>
              <Tooltip>
                <TooltipTrigger><Button variant="outline" size="sm" className="w-full capitalize">{side}</Button></TooltipTrigger>
                <TooltipContent side={side}><p>Tooltip {side}</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </PreviewBox>
      <SectionTitle>Tooltip com atalho de teclado</SectionTitle>
      <PreviewBox>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><Button variant="outline"><Search size={14} className="mr-2" />Buscar</Button></TooltipTrigger>
            <TooltipContent className="flex items-center gap-2"><p>Busca global</p><KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PreviewBox>
    </section>
  )

  if (id === 'dropdown-menu') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Dropdown básico</SectionTitle>
      <PreviewBox>
        <DropdownMenu>
          <DropdownMenuTrigger><Button variant="outline">Opções <MoreHorizontal className="ml-2 size-4" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuItem className="gap-2"><User size={14} />Perfil</DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><Settings size={14} />Configurações</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-error focus:text-error focus:bg-error/8"><Trash2 size={14} />Excluir conta</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PreviewBox>
      <SectionTitle>Com checkboxes</SectionTitle>
      <PreviewBox>
        <DropdownMenu>
          <DropdownMenuTrigger><Button variant="outline">Colunas visíveis <ChevronDown className="ml-2 size-4" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent className="w-44">
            <DropdownMenuLabel>Mostrar colunas</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Volume</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Rank</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Tendência</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Delta</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PreviewBox>
      <SectionTitle>Com submenu</SectionTitle>
      <PreviewBox>
        <DropdownMenu>
          <DropdownMenuTrigger><Button variant="outline">Exportar <ChevronDown className="ml-2 size-4" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2"><Copy size={14} />Copiar como</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>CSV</DropdownMenuItem>
                <DropdownMenuItem>JSON</DropdownMenuItem>
                <DropdownMenuItem>Markdown</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem className="gap-2"><ExternalLink size={14} />Exportar PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PreviewBox>
    </section>
  )

  if (id === 'alert-dialog') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Confirmação de ação destrutiva</SectionTitle>
      <PreviewBox>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>Excluir conta</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente excluídos dos nossos servidores.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Sim, excluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PreviewBox>
      <SectionTitle>Confirmação simples</SectionTitle>
      <PreviewBox>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" />}>Publicar relatório</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Publicar relatório?</AlertDialogTitle>
              <AlertDialogDescription>O relatório ficará visível para todos os membros da equipe. Deseja continuar?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Publicar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PreviewBox>
    </section>
  )

  if (id === 'context-menu') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Clique com botão direito</SectionTitle>
      <PreviewBox>
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="border-2 border-dashed border-border rounded-xl p-16 text-center text-muted-foreground text-[14px] select-none cursor-context-menu hover:border-primary/40 hover:text-foreground transition-colors">
              Clique com botão direito aqui
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem className="gap-2"><Copy size={14} />Copiar</ContextMenuItem>
            <ContextMenuItem className="gap-2"><Edit2 size={14} />Editar</ContextMenuItem>
            <ContextMenuItem className="gap-2"><ExternalLink size={14} />Abrir em nova aba</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive" className="gap-2"><Trash2 size={14} />Excluir <ContextMenuShortcut>⌫</ContextMenuShortcut></ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </PreviewBox>
    </section>
  )

  if (id === 'drawer') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Bottom sheet (mobile)</SectionTitle>
      <PreviewBox>
        <Drawer>
          <DrawerTrigger asChild><Button variant="outline">Abrir Drawer</Button></DrawerTrigger>
          <DrawerContent>
            <DrawerHeader><DrawerTitle>Filtros</DrawerTitle><DrawerDescription>Configure os filtros de busca de keywords.</DrawerDescription></DrawerHeader>
            <div className="px-4 space-y-4">
              <div className="space-y-1.5"><Label>Plataforma</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger><SelectContent><SelectItem value="ios">iOS</SelectItem><SelectItem value="android">Android</SelectItem></SelectContent></Select>
              </div>
              <div className="space-y-1.5"><Label>País</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger><SelectContent><SelectItem value="br">Brasil</SelectItem><SelectItem value="us">EUA</SelectItem></SelectContent></Select>
              </div>
            </div>
            <DrawerFooter>
              <Button>Aplicar filtros</Button>
              <DrawerClose asChild><Button variant="outline">Cancelar</Button></DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </PreviewBox>
    </section>
  )

  if (id === 'hover-card') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Preview ao hover</SectionTitle>
      <PreviewBox>
        <HoverCard>
          <HoverCardTrigger render={<Button variant="link" />}>@rankmyapp</HoverCardTrigger>
          <HoverCardContent>
            <div className="flex gap-3">
              <Avatar className="size-10">
                <AvatarFallback className="bg-primary text-white font-bold">R</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-[14px] font-semibold">RankMyApp</p>
                <p className="text-[12px] text-muted-foreground">Plataforma líder em ASO para apps mobile.</p>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground pt-1">
                  <span><strong className="text-foreground">128</strong> keywords</span>
                  <span><strong className="text-foreground">4.8</strong> rating</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </PreviewBox>
      <SectionTitle>Card de produto</SectionTitle>
      <PreviewBox>
        <HoverCard>
          <HoverCardTrigger render={<Badge variant="outline" className="cursor-pointer hover:border-primary" />}>MI Tool v2.1.0</HoverCardTrigger>
          <HoverCardContent>
            <div className="space-y-2">
              <p className="text-[13px] font-medium">MI Tool — Market Intelligence</p>
              <p className="text-[12px] text-muted-foreground">Monitoramento de keywords, ASO e análise competitiva em tempo real.</p>
              <div className="flex gap-2 pt-1">
                <Badge className="text-[10px]">iOS</Badge>
                <Badge className="text-[10px]">Android</Badge>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </PreviewBox>
    </section>
  )

  if (id === 'popover') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Painel de filtros</SectionTitle>
      <PreviewBox>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}><Search size={14} className="mr-2" />Filtros avançados</PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-4">
              <p className="text-[14px] font-semibold">Filtros</p>
              <div className="space-y-1.5"><Label className="text-[13px]">Plataforma</Label>
                <Select><SelectTrigger><SelectValue placeholder="Todas..." /></SelectTrigger><SelectContent><SelectItem value="ios">iOS</SelectItem><SelectItem value="android">Android</SelectItem></SelectContent></Select>
              </div>
              <div className="space-y-1.5"><Label className="text-[13px]">Volume mínimo</Label>
                <Input type="number" placeholder="ex: 1000" />
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">Limpar</Button>
                <Button size="sm" className="flex-1">Aplicar</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </PreviewBox>
    </section>
  )

  if (id === 'sheet') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Sheet lateral (right)</SectionTitle>
      <PreviewBox>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}><Settings size={14} className="mr-2" />Configurações</SheetTrigger>
          <SheetContent side="right">
            <SheetHeader><SheetTitle>Configurações</SheetTitle><SheetDescription>Ajuste as preferências do seu painel.</SheetDescription></SheetHeader>
            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-[13px]">Notificações por email</Label>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label className="text-[13px]">Relatório semanal</Label>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label className="text-[13px]">Alertas de ranking</Label>
                <Switch defaultChecked />
              </div>
            </div>
            <SheetFooter><Button>Salvar preferências</Button></SheetFooter>
          </SheetContent>
        </Sheet>
      </PreviewBox>
      <SectionTitle>Sheet bottom</SectionTitle>
      <PreviewBox>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>Abrir bottom sheet</SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader><SheetTitle>Exportar dados</SheetTitle><SheetDescription>Escolha o formato de exportação.</SheetDescription></SheetHeader>
            <div className="py-4 grid grid-cols-3 gap-3">
              {['CSV', 'JSON', 'PDF'].map(fmt => (
                <Button key={fmt} variant="outline" className="h-16 flex-col gap-1">
                  <Copy size={16} />{fmt}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </PreviewBox>
    </section>
  )

  // ── LAYOUT ────────────────────────────────────────────────────────────────────

  if (id === 'aspect-ratio') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Proporções comuns</SectionTitle>
      <PreviewBox center={false}>
        <div className="grid grid-cols-3 gap-4">
          {[{ ratio: 16/9, label: '16:9 — Vídeo' }, { ratio: 1, label: '1:1 — Quadrado' }, { ratio: 4/3, label: '4:3 — Clássico' }].map(({ ratio, label: al }) => (
            <div key={al}>
              <AspectRatio ratio={ratio} className="bg-muted/50 border border-border rounded-lg overflow-hidden">
                <div className="flex flex-col items-center justify-center size-full text-[11px] text-muted-foreground gap-1">
                  <span className="font-mono font-medium">{al.split(' — ')[0]}</span>
                </div>
              </AspectRatio>
              <p className="text-[11px] text-muted-foreground text-center mt-1">{al}</p>
            </div>
          ))}
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'resizable') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Painel redimensionável horizontal</SectionTitle>
      <PreviewBox center={false}>
        <ResizablePanelGroup direction={"horizontal" as const} className="h-40 rounded-lg border border-border overflow-hidden w-full">
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="h-full p-4 flex flex-col gap-2" style={{ background: 'var(--sidebar-bg)' }}>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Sidebar</span>
              {['Dashboard', 'Keywords', 'Reviews'].map(i => <div key={i} className="text-[12px] text-muted-foreground">{i}</div>)}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>
            <div className="h-full p-4 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-16 rounded-lg mt-3" />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </PreviewBox>
      <SectionTitle>Vertical</SectionTitle>
      <PreviewBox center={false}>
        <ResizablePanelGroup direction={"vertical" as const} className="h-48 rounded-lg border border-border overflow-hidden w-full">
          <ResizablePanel defaultSize={40}>
            <div className="h-full p-4 bg-card"><Skeleton className="h-3 w-1/2 mb-2" /><Skeleton className="h-16 rounded" /></div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60}>
            <div className="h-full p-4"><Skeleton className="h-3 w-1/3 mb-2" /><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-4/5 mt-1" /></div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </PreviewBox>
    </section>
  )

  if (id === 'scroll-area') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <SectionTitle>Lista rolável</SectionTitle>
      <PreviewBox>
        <ScrollArea className="h-56 w-72 rounded-md border p-4">
          <div className="space-y-2">
            {[12,8,45,3,27,19,6,33,41,2,15,38,7,22,49,11,30,5,17,44].map((vol, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0">
                <span className="text-[13px] text-foreground">keyword-{String(i + 1).padStart(2, '0')}</span>
                <Badge variant="secondary" className="text-[11px]">{vol}K</Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PreviewBox>
    </section>
  )

  // ── PATTERNS ─────────────────────────────────────────────────────────────────

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
                <div className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${type === 'up' ? 'bg-success/10 text-success' : type === 'down' ? 'bg-error/10 text-error' : 'bg-muted/50 text-muted-foreground'}`}>
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
                  <TableCell><span className="font-display font-bold text-primary">#{rank}</span></TableCell>
                  <TableCell>
                    {trend === 'up' && <TrendingUp size={14} className="text-success" />}
                    {trend === 'down' && <TrendingDown size={14} className="text-error" />}
                    {trend === 'neutral' && <Minus size={14} className="text-muted-foreground" />}
                  </TableCell>
                  <TableCell className={`text-right font-medium font-display ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground'}`}>{delta}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PreviewBox>
    </section>
  )

  if (id === 'appshell') return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}{header}
      <PreviewBox center={false}>
        <div className="border border-border rounded-xl overflow-hidden w-full">
          <div className="h-11 bg-card border-b border-border flex items-center px-4 justify-between">
            <div className="flex items-center gap-2">
              <div className="size-5 rounded flex items-center justify-center text-[10px] font-bold text-white" style={{ background: 'var(--primary)' }}>R</div>
              <span className="text-[13px] font-medium text-foreground">MI Tool</span>
            </div>
            <div className="flex items-center gap-2"><Skeleton className="h-6 w-24 rounded-full" /><Skeleton className="h-7 w-7 rounded-full" /></div>
          </div>
          <div className="flex h-40 bg-background">
            <div className="w-40 border-r border-border p-3 space-y-1.5" style={{ background: 'var(--sidebar-bg)' }}>
              {[true, false, false, false].map((active, i) => (
                <div key={i} className="h-5 rounded-[4px]" style={{ background: active ? 'var(--sidebar-active-bg)' : 'rgba(255,255,255,0.04)' }} />
              ))}
            </div>
            <div className="flex-1 p-4 space-y-3">
              <Skeleton className="h-4 w-1/3" />
              <div className="grid grid-cols-4 gap-2">{[1,2,3,4].map(i => <Skeleton key={i} className="h-10 rounded-lg" />)}</div>
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
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
            <Home size={10} /><ChevronRight size={10} /><span>Keywords</span><ChevronRight size={10} /><span className="text-foreground">Monitoramento</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[26px] font-bold font-display tracking-tight text-foreground leading-tight">Monitoramento de Keywords</h1>
              <p className="text-[14px] text-muted-foreground mt-1">128 keywords · Atualizado há 5 min</p>
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

  // ── Fallback ──────────────────────────────────────────────────────────────────

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {breadcrumb}
      <div className="space-y-3">
        <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">{label}</h1>
        <p className="text-[17px] text-muted-foreground">Seção em desenvolvimento. Em breve terá demonstrações do componente <strong className="text-primary">{label}</strong>.</p>
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
