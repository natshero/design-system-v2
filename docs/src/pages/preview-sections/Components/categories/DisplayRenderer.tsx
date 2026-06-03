import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Item, ItemActions, ItemContent, ItemDescription as ItemDesc, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { ChevronDown, Package, BarChart2, Users } from 'lucide-react'

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

export const DisplayRenderer: React.FC<ComponentCategoryRendererProps> = ({ id, label, category = 'Components' }) => {

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

  return null
}

