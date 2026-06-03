import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from '@/components/ui/context-menu'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Info, MoreHorizontal, Settings, Trash2, User, Search, Copy, Edit2, ExternalLink, ChevronDown } from 'lucide-react'

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

interface ComponentCategoryRendererProps {
  id: string
  label: string
  category?: string
}

export const OverlayRenderer: React.FC<ComponentCategoryRendererProps> = ({ id, label, category = 'Components' }) => {
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
                <Select><SelectTrigger><SelectValue placeholder="Selecione…" /></SelectTrigger><SelectContent alignItemWithTrigger={false}><SelectItem value="br">🇧🇷 Brasil</SelectItem><SelectItem value="us">🇺🇸 EUA</SelectItem></SelectContent></Select>
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
                <Select><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger><SelectContent alignItemWithTrigger={false}><SelectItem value="ios">iOS</SelectItem><SelectItem value="android">Android</SelectItem></SelectContent></Select>
              </div>
              <div className="space-y-1.5"><Label>País</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger><SelectContent alignItemWithTrigger={false}><SelectItem value="br">Brasil</SelectItem><SelectItem value="us">EUA</SelectItem></SelectContent></Select>
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
                <Select><SelectTrigger><SelectValue placeholder="Todas..." /></SelectTrigger><SelectContent alignItemWithTrigger={false}><SelectItem value="ios">iOS</SelectItem><SelectItem value="android">Android</SelectItem></SelectContent></Select>
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

  return null
}
