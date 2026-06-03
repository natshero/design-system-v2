import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/components/ui/menubar'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Settings, LayoutDashboard, TrendingUp, Star, Home, Bell, Search, BarChart2, Zap } from 'lucide-react'

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

export const NavigationRenderer: React.FC<ComponentCategoryRendererProps> = ({ id, label, category = 'Components' }) => {

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

  return null
}

