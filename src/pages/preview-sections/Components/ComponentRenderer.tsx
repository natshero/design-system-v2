import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Info, AlertCircle, FileWarning, MoreHorizontal, CheckCircle2, LayoutDashboard, Settings, Box } from 'lucide-react'
import { toast } from 'sonner'

interface ComponentRendererProps {
  id: string
  label: string
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ id, label }) => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
        <span className="cursor-pointer hover:text-primary">MI Tool DS</span> <span>/</span> <span>Components</span> <span>/</span> <span>{label}</span>
      </div>
      <div className="border-b pb-4 border-border/40">
        <h1 className="text-4xl font-bold tracking-tight font-['Space_Grotesk']">{label}</h1>
        <p className="text-muted-foreground mt-3 text-[17px]">
          Demonstração do componente <span className="font-semibold text-primary">{label}</span> importado do Shadcn UI ou criado no Design System.
        </p>
      </div>
      
      {/* ─── INPUTS ──────────────────────────────────────────────────────────── */}
      {id === 'button' && (
        <div className="flex flex-wrap gap-4 p-8 border border-border/40 rounded-xl bg-card/20 items-center justify-center">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      )}

      {id === 'input' && (
         <div className="p-8 border border-border/40 rounded-xl bg-card/20 max-w-sm">
          <div className="space-y-2">
            <label className="text-[13px] font-medium">Email address</label>
            <Input placeholder="name@example.com" />
          </div>
        </div>
      )}

      {id === 'select' && (
        <div className="p-8 border border-border/40 rounded-xl bg-card/20 max-w-sm">
          <div className="space-y-2">
            <label className="text-[13px] font-medium">Selecione uma opção</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Opção 1</SelectItem>
                <SelectItem value="2">Opção 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {id === 'checkbox' && (
         <div className="p-8 border border-border/40 rounded-xl bg-card/20 flex flex-col gap-6 max-w-sm">
          <div className="flex items-center space-x-3">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-[14px] font-medium leading-none">
              Aceito os termos e condições
            </label>
          </div>
        </div>
      )}

      {id === 'switch' && (
         <div className="p-8 border border-border/40 rounded-xl bg-card/20 flex flex-col gap-6 max-w-sm">
          <div className="flex items-center space-x-3">
            <Switch id="airplane-mode" />
            <label htmlFor="airplane-mode" className="text-[14px] font-medium">Ativar notificações</label>
          </div>
        </div>
      )}

      {id === 'daterangepicker' && (
        <div className="p-8 border border-border/40 rounded-xl bg-card/20 max-w-sm">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* ─── DISPLAY ─────────────────────────────────────────────────────────── */}
      {id === 'badge' && (
        <div className="flex flex-wrap gap-4 p-8 border border-border/40 rounded-xl bg-card/20 items-center justify-center">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      )}

      {id === 'avatar' && (
        <div className="flex gap-4 p-8 border border-border/40 rounded-xl bg-card/20 items-center justify-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>RM</AvatarFallback>
          </Avatar>
        </div>
      )}

      {(id === 'card' || id === 'metriccard') && (
        <div className="grid md:grid-cols-2 gap-6 p-8 border border-border/40 rounded-xl bg-card/20">
          <Card className="card-pro">
            <CardHeader>
              <CardTitle className="text-lg">Métricas de ASO</CardTitle>
              <CardDescription>Resumo dos últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-['Space_Grotesk'] text-primary">12,345</div>
              <p className="text-[12px] text-muted-foreground mt-1">+20.1% em relação à semana anterior</p>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Badge variant="secondary" className="font-normal text-[11px] text-primary">Positivo</Badge>
                <Badge variant="outline" className="font-normal text-[11px]">Orgânico</Badge>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}

      {id === 'datatable' && (
        <div className="p-8 border border-border/40 rounded-xl bg-card/20">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Keyword</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">KWD-01</TableCell>
                <TableCell>rankmyapp</TableCell>
                <TableCell><Badge variant="secondary" className="text-green-500 bg-green-500/10">Active</Badge></TableCell>
                <TableCell className="text-right">1,250</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">KWD-02</TableCell>
                <TableCell>aso tools</TableCell>
                <TableCell><Badge variant="secondary" className="text-amber-500 bg-amber-500/10">Pending</Badge></TableCell>
                <TableCell className="text-right">890</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">KWD-03</TableCell>
                <TableCell>app marketing</TableCell>
                <TableCell><Badge variant="secondary" className="text-red-500 bg-red-500/10">Dropped</Badge></TableCell>
                <TableCell className="text-right">340</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}

      {/* ─── FEEDBACK ────────────────────────────────────────────────────────── */}
      {id === 'alert' && (
        <div className="space-y-4 p-8 border border-border/40 rounded-xl bg-card/20">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Informação</AlertTitle>
            <AlertDescription>
              Uma nova versão da plataforma está disponível com melhorias de performance.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro na importação</AlertTitle>
            <AlertDescription>
              O arquivo enviado está corrompido ou possui um formato inválido.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {id === 'toast' && (
        <div className="flex flex-wrap gap-4 p-8 border border-border/40 rounded-xl bg-card/20 items-center justify-center">
          <Button onClick={() => toast("Ação realizada com sucesso!")}>
            Mostrar Toast Normal
          </Button>
          <Button variant="outline" onClick={() => toast.success("Dados salvos com sucesso!", { description: "Sexta-feira, 29 Maio 2026 às 15:24" })}>
            Mostrar Toast de Sucesso
          </Button>
        </div>
      )}

      {id === 'loading-states' && (
        <div className="grid md:grid-cols-2 gap-6 p-8 border border-border/40 rounded-xl bg-card/20">
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">Skeleton (Shadcn)</h3>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
             <h3 className="font-medium text-sm text-muted-foreground">Spinner (Custom)</h3>
             <div className="flex gap-4 items-center h-[52px]">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-r-transparent"></div>
                <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-muted-foreground border-r-transparent"></div>
             </div>
          </div>
        </div>
      )}

      {id === 'emptystate' && (
        <div className="p-8 border border-border/40 rounded-xl bg-card/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/5 to-background/0 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-border/50 rounded-xl bg-card/40 backdrop-blur-sm relative z-10">
            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 rotate-3 hover:rotate-6 transition-transform shadow-sm">
              <Box className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-[19px] font-semibold text-foreground tracking-tight mb-2 font-['Space_Grotesk']">Nenhuma campanha ativa</h3>
            <p className="text-[14px] text-muted-foreground max-w-[340px] mb-6 leading-relaxed">
              Você ainda não possui campanhas rodando. Crie sua primeira campanha para começar a monitorar os dados orgânicos.
            </p>
            <Button className="shadow-lg shadow-primary/20">
              Nova Campanha
            </Button>
          </div>
        </div>
      )}

      {id === 'codeblock' && (
        <div className="p-8 border border-border/40 rounded-xl bg-card/20">
          <div className="relative rounded-lg bg-[#0d1117] border border-border/50 overflow-hidden text-sm">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-[#161b22]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-muted-foreground hover:text-foreground">
                Copy
              </Button>
            </div>
            <div className="p-4 overflow-x-auto font-mono text-[13px] leading-relaxed text-gray-300">
              <span className="text-pink-400">const</span> fetchCampaigns = <span className="text-pink-400">async</span> () <span className="text-pink-400">=&gt;</span> {'{\n'}
              {'  '}<span className="text-pink-400">const</span> response = <span className="text-pink-400">await</span> <span className="text-blue-400">api</span>.<span className="text-green-300">get</span>(<span className="text-amber-300">"/v1/campaigns"</span>);{'\n'}
              {'  '}<span className="text-pink-400">return</span> response.<span className="text-blue-300">data</span>;{'\n'}
              {'}'}
            </div>
          </div>
        </div>
      )}

      {/* ─── NAVIGATION ──────────────────────────────────────────────────────── */}
      {id === 'tabs' && (
        <div className="p-8 border border-border/40 rounded-xl bg-card/20 flex justify-center">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card className="card-pro">
                <CardHeader><CardTitle>Account</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">Make changes to your account here.</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card className="card-pro">
                <CardHeader><CardTitle>Password</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">Change your password here.</CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {id === 'breadcrumb' && (
        <div className="p-8 border border-border/40 rounded-xl bg-card/20">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Components</DropdownMenuItem>
                    <DropdownMenuItem>Navigation</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}

      {id === 'pagination' && (
        <div className="p-8 border border-border/40 rounded-xl bg-card/20">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {id === 'sidebar-comp' && (
        <div className="p-8 border border-border/40 rounded-xl bg-card/20 flex justify-center">
           <div className="w-[200px] border border-border rounded-lg bg-card overflow-hidden h-[300px] flex flex-col">
              <div className="p-4 border-b border-border/50 font-bold text-primary flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </div>
              <div className="flex-1 p-2 space-y-1">
                <div className="px-3 py-2 text-sm bg-primary/10 text-primary rounded-md font-medium">Analytics</div>
                <div className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md cursor-pointer">Reports</div>
                <div className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md cursor-pointer">Customers</div>
              </div>
              <div className="p-2 border-t border-border/50">
                <div className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md flex items-center gap-2 cursor-pointer">
                  <Settings className="w-4 h-4" /> Settings
                </div>
              </div>
           </div>
        </div>
      )}

      {/* ─── OVERLAY ─────────────────────────────────────────────────────────── */}
      {id === 'modal' && (
        <div className="p-8 border border-border/40 rounded-xl bg-card/20 flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Abrir Modal de Exemplo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Editar perfil</DialogTitle>
                <DialogDescription>
                  Faça alterações em seu perfil aqui. Clique em salvar quando terminar.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right text-sm">Name</label>
                  <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="username" className="text-right text-sm">Username</label>
                  <Input id="username" defaultValue="@pedroduarte" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Salvar alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {id === 'tooltip' && (
        <div className="p-8 border border-border/40 rounded-xl bg-card/20 flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Passe o mouse aqui</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Informação adicional muito útil!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {id === 'dropdownmenu' && (
        <div className="p-8 border border-border/40 rounded-xl bg-card/20 flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Opções <MoreHorizontal className="ml-2 w-4 h-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Faturamento</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* ─── LAYOUT ──────────────────────────────────────────────────────────── */}
      {id === 'appshell' && (
        <div className="p-8 border border-border/40 rounded-xl bg-card/20">
          <div className="border border-border rounded-lg overflow-hidden shadow-sm">
            {/* Fake App Shell Header */}
            <div className="h-10 bg-card border-b border-border flex items-center px-4 justify-between">
              <div className="flex gap-2 items-center">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="h-5 w-32 bg-muted rounded-md"></div>
              <div className="w-6 h-6 rounded-full bg-primary/20"></div>
            </div>
            {/* Fake App Shell Body */}
            <div className="flex h-[200px] bg-background">
              <div className="w-1/4 border-r border-border bg-muted/20 p-4 space-y-2">
                <div className="h-3 w-full bg-muted rounded-sm"></div>
                <div className="h-3 w-3/4 bg-muted rounded-sm"></div>
                <div className="h-3 w-5/6 bg-muted rounded-sm"></div>
              </div>
              <div className="w-3/4 p-6">
                <div className="h-6 w-1/3 bg-muted rounded-md mb-6"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 bg-card border border-border rounded-lg"></div>
                  <div className="h-20 bg-card border border-border rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {id === 'pageheader' && (
        <div className="p-8 border border-border/40 rounded-xl bg-card/20">
          <div className="border border-border rounded-lg p-6 bg-card flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <span>Apps</span> <span>/</span> <span>Uber</span>
              </div>
              <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-foreground">Performance Overview</h2>
              <p className="text-sm text-muted-foreground">Métricas detalhadas para os últimos 30 dias.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Exportar CSV</Button>
              <Button>Atualizar Dados</Button>
            </div>
          </div>
        </div>
      )}

      {/* FALLBACK */}
      {!['button', 'input', 'select', 'checkbox', 'switch', 'daterangepicker', 'badge', 'avatar', 'card', 'metriccard', 'datatable', 'alert', 'toast', 'loading-states', 'emptystate', 'tabs', 'sidebar-comp', 'breadcrumb', 'pagination', 'modal', 'tooltip', 'dropdownmenu', 'appshell', 'pageheader'].includes(id) && (
        <div className="flex flex-col gap-4 p-8 border border-dashed border-border/60 rounded-xl bg-card/10 items-center justify-center text-center py-16">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
            <Box className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg text-foreground">Componente em Desenvolvimento</h3>
          <p className="text-[13px] text-muted-foreground max-w-[400px]">
            O componente <strong>{label}</strong> será migrado do Shadcn UI em breve.
          </p>
        </div>
      )}
    </section>
  )
}

// Internal fake BreadcrumbEllipsis since we didn't extract it
const BreadcrumbEllipsis = ({ className }: { className?: string }) => (
  <span role="presentation" aria-hidden="true" className={`flex h-9 w-9 items-center justify-center ${className}`}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
