import React, { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { applyTheme, removeTheme, getDefaultMode, type ProductId, type ThemeMode } from '@/theme'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { ArrowLeft, Moon, Sun, Menu, Search } from 'lucide-react'
import { SectionRenderer } from './preview-sections/SectionRenderer'
import { LanguageSwitcher } from '@docs/components/LanguageSwitcher'

/**
 * Estrutura de navegação fiel a docs/mi-tool/index.html
 * Mesmos grupos, categorias e IDs das seções.
 */
const navGroups = [
  {
    title: 'OVERVIEW',
    items: [
      { id: 'introducao', label: 'Introdução' }
    ]
  },
  {
    title: 'GETTING STARTED',
    items: [
      { id: 'instalacao',   label: 'Instalação' },
      { id: 'configuracao', label: 'Configuração' },
      { id: 'uso-basico',   label: 'Uso Básico' }
    ]
  },
  {
    title: 'FOUNDATIONS',
    items: [
      { id: 'cores',         label: 'Cores' },
      { id: 'gradiente',     label: 'Gradiente' },
      { id: 'tipografia',    label: 'Tipografia' },
      { id: 'espacamento',   label: 'Espaçamento' },
      { id: 'sombras',       label: 'Sombras' },
      { id: 'border-radius', label: 'Border Radius' }
    ]
  },
  {
    title: 'COMPONENTS',
    categories: [
      {
        name: 'INPUTS',
        items: [
          { id: 'button',          label: 'Button' },
          { id: 'input',           label: 'Input' },
          { id: 'textarea',        label: 'Textarea' },
          { id: 'select',          label: 'Select' },
          { id: 'native-select',   label: 'NativeSelect' },
          { id: 'combobox',        label: 'Combobox' },
          { id: 'radio-group',     label: 'RadioGroup' },
          { id: 'checkbox',        label: 'Checkbox' },
          { id: 'switch',          label: 'Switch' },
          { id: 'toggle',          label: 'Toggle' },
          { id: 'slider',          label: 'Slider' },
          { id: 'input-otp',       label: 'InputOTP' },
          { id: 'field',           label: 'Field' },
          { id: 'input-group',     label: 'InputGroup' },
          { id: 'button-group',    label: 'ButtonGroup' },
          { id: 'daterangepicker', label: 'DateRangePicker' },
          { id: 'command',         label: 'Command' }
        ]
      },
      {
        name: 'DISPLAY',
        items: [
          { id: 'badge',       label: 'Badge' },
          { id: 'avatar',      label: 'Avatar' },
          { id: 'card',        label: 'Card' },
          { id: 'accordion',   label: 'Accordion' },
          { id: 'carousel',    label: 'Carousel' },
          { id: 'collapsible', label: 'Collapsible' },
          { id: 'table',       label: 'Table' },
          { id: 'kbd',         label: 'Kbd' },
          { id: 'item',        label: 'Item' }
        ]
      },
      {
        name: 'FEEDBACK',
        items: [
          { id: 'alert',       label: 'Alert' },
          { id: 'toast',       label: 'Toast' },
          { id: 'progress',    label: 'Progress' },
          { id: 'spinner',     label: 'Spinner' },
          { id: 'skeleton',    label: 'Skeleton' },
          { id: 'empty-state', label: 'EmptyState' }
        ]
      },
      {
        name: 'NAVIGATION',
        items: [
          { id: 'tabs',             label: 'Tabs' },
          { id: 'sidebar-comp',     label: 'Sidebar' },
          { id: 'breadcrumb-comp',  label: 'Breadcrumb' },
          { id: 'pagination',       label: 'Pagination' },
          { id: 'menubar',          label: 'Menubar' },
          { id: 'navigation-menu',  label: 'NavigationMenu' }
        ]
      },
      {
        name: 'OVERLAY',
        items: [
          { id: 'modal',         label: 'Modal' },
          { id: 'tooltip',       label: 'Tooltip' },
          { id: 'dropdown-menu', label: 'DropdownMenu' },
          { id: 'alert-dialog',  label: 'AlertDialog' },
          { id: 'context-menu',  label: 'ContextMenu' },
          { id: 'drawer',        label: 'Drawer' },
          { id: 'hover-card',    label: 'HoverCard' },
          { id: 'popover',       label: 'Popover' },
          { id: 'sheet',         label: 'Sheet' }
        ]
      },
      {
        name: 'LAYOUT',
        items: [
          { id: 'aspect-ratio', label: 'AspectRatio' },
          { id: 'resizable',    label: 'Resizable' },
          { id: 'scroll-area',  label: 'ScrollArea' }
        ]
      }
    ]
  },
  {
    title: 'PATTERNS',
    items: [
      { id: 'metric-card', label: 'MetricCard' },
      { id: 'datatable',   label: 'DataTable' },
      { id: 'appshell',    label: 'AppShell' },
      { id: 'page-header', label: 'PageHeader' }
    ]
  },
  {
    title: 'GRÁFICOS',
    items: [
      { id: 'charts-tokens',    label: 'Tokens & Padrões' },
      { id: 'charts-line',      label: 'Line Chart' },
      { id: 'charts-area',      label: 'Area Chart' },
      { id: 'charts-bar-simple',label: 'Bar Simples' },
      { id: 'charts-bar',       label: 'Stacked Bar' },
      { id: 'charts-hbar',      label: 'Horizontal Bar' },
      { id: 'charts-pie',       label: 'Pie Chart' },
      { id: 'charts-donut',     label: 'Donut Chart' },
      { id: 'charts-funnel',    label: 'Funnel Chart' },
      { id: 'charts-radar',     label: 'Radar Chart' },
      { id: 'charts-scatter',   label: 'Scatter / Bubble' },
      { id: 'charts-treemap',   label: 'Treemap' }
    ]
  }
]

const allNavItems = navGroups.flatMap(group => {
  if (group.items) return group.items
  if (group.categories) return group.categories.flatMap(cat => cat.items)
  return []
})

interface NavigationContentProps {
  onNavClick?: () => void
  onSearchOpen: () => void
  renderNavList: (onNavClick?: () => void) => ReactNode
}

function NavigationContent({
  onNavClick,
  onSearchOpen,
  renderNavList,
}: NavigationContentProps) {
  return (
    <>
      <div className="p-4 border-b border-border/20">
        <button
          onClick={() => {
            onSearchOpen()
            onNavClick?.()
          }}
          className="inline-flex w-full items-center justify-between whitespace-nowrap rounded-md border border-border/50 bg-background/50 px-3 py-2 text-[13px] font-medium text-muted-foreground shadow-sm transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <span className="flex items-center gap-2"><Search className="h-4 w-4" />Buscar...</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">Ctrl</span>K
          </kbd>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        {renderNavList(onNavClick)}
      </div>
    </>
  )
}

interface ProductPreviewContentProps {
  productId: ProductId
}

function ProductPreviewContent({ productId }: ProductPreviewContentProps) {
  const navigate = useNavigate()

  const [mode, setModeState] = useState<ThemeMode>(() => getDefaultMode(productId))
  const [activeSection, setActiveSection] = useState('introducao')
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Aplica o tema via applyTheme() sempre que produto ou modo mudar
  useEffect(() => {
    applyTheme(productId, mode, { persist: false })
    return () => removeTheme()
  }, [productId, mode])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsCommandOpen(open => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const toggleTheme = useCallback(() => {
    setModeState(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  const isDark = mode === 'dark'

  // ref para preservar scroll do sidebar desktop entre re-renders
  const sidebarScrollRef = useRef<HTMLDivElement>(null)

  // NavLink como arrow function estável dentro do escopo
  const renderNavLink = (
    item: { id: string; label: string },
    opts?: { isNested?: boolean; onClickCallback?: () => void }
  ) => {
    const isActive = activeSection === item.id
    return (
      <button
        key={item.id}
        onClick={() => {
          setActiveSection(item.id)
          opts?.onClickCallback?.()
        }}
        aria-current={isActive ? 'page' : undefined}
        className={`w-full min-h-[44px] flex items-center ${opts?.isNested ? 'pl-7' : 'pl-5'} pr-4 py-3 text-[13px] transition-colors border-l-[2px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
          isActive
            ? 'bg-primary/15 text-foreground border-primary font-medium'
            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground border-transparent'
        }`}
      >
        {item.label}
      </button>
    )
  }

  // Lista de nav reutilizável (renderizada inline — não como sub-componente)
  const renderNavList = (onNavClick?: () => void) => (
    <>
      {navGroups.map((group, idx) => (
        <div key={idx} className="mb-6">
          <div className="px-5 py-2 text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground font-mono mb-1">
            {group.title}
          </div>
          {group.items && (
            <div className="flex flex-col">
              {group.items.map(item => renderNavLink(item, { onClickCallback: onNavClick }))}
            </div>
          )}
          {group.categories && (
            <div className="flex flex-col space-y-2 mt-1">
              {group.categories.map((cat, catIdx) => (
                <div key={catIdx}>
                  <div className="pl-7 pr-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70 mb-0.5">
                    {cat.name}
                  </div>
                  <div className="flex flex-col">
                    {cat.items.map(item => renderNavLink(item, { isNested: true, onClickCallback: onNavClick }))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  )

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background/90 px-4 md:px-6 backdrop-blur-md">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger>
              <Button variant="ghost" size="icon" className="lg:hidden text-foreground mr-1" aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[260px] p-0 flex flex-col bg-card border-r">
              <NavigationContent
                onNavClick={() => setIsSheetOpen(false)}
                onSearchOpen={() => setIsCommandOpen(true)}
                renderNavList={renderNavList}
              />
            </SheetContent>
          </Sheet>
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="h-8 w-8 -ml-2 text-primary hidden md:flex" aria-label="Voltar">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[14px] md:text-[15px] font-['Space_Grotesk'] text-primary truncate">
              RankMyApp
            </span>
            <span className="text-muted-foreground font-normal hidden sm:inline">|</span>
            <span className="text-[13px] md:text-[14px] font-medium text-foreground truncate">{productId === 'mi-tool' ? 'MI Tool' : productId?.replace('-', ' ')}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <LanguageSwitcher />
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 rounded-full px-2 py-0.5 text-[11px] font-medium hidden sm:flex">
            v0.1.0
          </Badge>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 border rounded-md bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all active:scale-95"
            aria-label="Alternar tema claro/escuro"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop sidebar — usa ref no scroll para preservar posição ao mudar seção */}
        <aside className="w-[240px] border-r bg-card hidden lg:flex flex-col h-[calc(100vh-3.5rem)] sticky top-14 flex-shrink-0 overflow-hidden">
          <div className="p-4 border-b border-border/20">
            <button
              onClick={() => setIsCommandOpen(true)}
              className="inline-flex w-full items-center justify-between whitespace-nowrap rounded-md border border-border/50 bg-background/50 px-3 py-2 text-[13px] font-medium text-muted-foreground shadow-sm transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <span className="flex items-center gap-2"><Search className="h-4 w-4" />Buscar...</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">Ctrl</span>K
              </kbd>
            </button>
          </div>
          {/* ref={sidebarScrollRef} — elemento estável, não desmonta entre re-renders */}
          <div ref={sidebarScrollRef} className="flex-1 overflow-y-auto py-4 custom-scrollbar">
            {renderNavList()}
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto relative w-full overflow-x-hidden custom-scrollbar">
          <div className="max-w-[900px] px-4 md:px-12 py-6 md:py-10 pb-24 mx-auto w-full">
            <SectionRenderer 
              activeSection={activeSection} 
              productId={productId} 
              navItems={allNavItems} 
            />
          </div>
        </main>
      </div>
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <CommandInput placeholder="Buscar componentes ou documentação..." />
        <CommandList className="custom-scrollbar">
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          {navGroups.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items && group.items.map((item) => (
                <CommandItem 
                  key={item.id} 
                  onSelect={() => {
                    setActiveSection(item.id)
                    setIsCommandOpen(false)
                  }}
                  className="cursor-pointer"
                >
                  <span>{item.label}</span>
                </CommandItem>
              ))}
              {group.categories && group.categories.map((cat) => (
                cat.items.map((item) => (
                  <CommandItem 
                    key={item.id} 
                    onSelect={() => {
                      setActiveSection(item.id)
                      setIsCommandOpen(false)
                    }}
                    className="cursor-pointer"
                  >
                    <span className="text-muted-foreground mr-2">{cat.name} &rsaquo;</span>
                    <span>{item.label}</span>
                  </CommandItem>
                ))
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  )
}

export const ProductPreviewPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const resolvedProductId = (productId ?? 'mi-tool') as ProductId

  return <ProductPreviewContent key={resolvedProductId} productId={resolvedProductId} />
}
