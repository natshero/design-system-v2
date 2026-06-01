import React from 'react'
import { BarChart2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Area, AreaChart, Pie, PieChart, Cell } from 'recharts'

const chartData = [
  { month: "January", myapp: 186, competitor: 80 },
  { month: "February", myapp: 305, competitor: 200 },
  { month: "March", myapp: 237, competitor: 120 },
  { month: "April", myapp: 73, competitor: 190 },
  { month: "May", myapp: 209, competitor: 130 },
  { month: "June", myapp: 214, competitor: 140 },
]

const pieData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
]

const chartConfig = {
  myapp: {
    label: "My App",
    color: "var(--chart-1)",
  },
  competitor: {
    label: "Competitor",
    color: "var(--chart-2)",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export const ChartsSection: React.FC<{ activeSection: string, label: string }> = ({ activeSection, label }) => {
  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
        <span className="cursor-pointer hover:text-primary">MI Tool DS</span> <span>/</span> <span>Gráficos</span> <span>/</span> <span>{label}</span>
      </div>
      <div className="border-b pb-4 border-border/40">
        <h1 className="text-4xl font-bold tracking-tight font-['Space_Grotesk']">{label}</h1>
        <p className="text-muted-foreground mt-3 text-[17px]">
          Demonstração do componente de gráfico <strong>{label}</strong> usando Shadcn Charts.
        </p>
      </div>
      
      <div className="mt-8">
        
        {/* Tokens & Padrões */}
        {activeSection === 'charts-tokens' && (
           <div className="space-y-8">
             <div>
               <h2 className="text-2xl font-bold mb-4">Paleta de Cores (Data Series)</h2>
               <p className="text-muted-foreground mb-6">
                 Estas são as cores mapeadas dinamicamente pelos tokens do tema atual para serem utilizadas em todos os gráficos.
               </p>
               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="flex flex-col border border-border/50 rounded-xl bg-card overflow-hidden">
                     <div className="h-24 w-full" style={{ backgroundColor: `var(--chart-${i})` }}></div>
                     <div className="p-4 bg-card">
                       <div className="font-semibold">Data-{i}</div>
                       <div className="text-xs font-mono text-muted-foreground mt-1">var(--chart-{i})</div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
        )}

        {/* Bar Chart */}
        {(activeSection === 'bar-simples' || activeSection === 'stacked-bar' || activeSection === 'horizontal-bar') && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>{label}</CardTitle>
            <CardDescription>Janeiro - Junho 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
              <BarChart accessibilityLayer data={chartData} layout={activeSection === 'horizontal-bar' ? "vertical" : "horizontal"}>
                <CartesianGrid vertical={false} />
                {activeSection === 'horizontal-bar' ? (
                   <>
                     <XAxis type="number" hide />
                     <YAxis dataKey="month" type="category" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                   </>
                ) : (
                   <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                )}
                
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="myapp" stackId={activeSection === 'stacked-bar' ? "a" : undefined} fill="var(--color-myapp)" radius={activeSection === 'stacked-bar' ? [0,0,4,4] : 4} />
                <Bar dataKey="competitor" stackId={activeSection === 'stacked-bar' ? "a" : undefined} fill="var(--color-competitor)" radius={activeSection === 'stacked-bar' ? [4,4,0,0] : 4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        )}

        {/* Line Chart */}
        {activeSection === 'line-chart' && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>{label}</CardTitle>
            <CardDescription>Comparativo de Crescimento</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
              <LineChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="myapp" stroke="var(--color-myapp)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="competitor" stroke="var(--color-competitor)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        )}

        {/* Area Chart */}
        {activeSection === 'area-chart' && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>{label}</CardTitle>
            <CardDescription>Volume Acumulado</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
              <AreaChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="myapp" stroke="var(--color-myapp)" fill="var(--color-myapp)" fillOpacity={0.2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        )}

        {/* Pie / Donut Chart */}
        {(activeSection === 'pie-chart' || activeSection === 'donut-chart') && (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>{label}</CardTitle>
            <CardDescription>Distribuição de Market Share</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={pieData} dataKey="visitors" nameKey="browser" innerRadius={activeSection === 'donut-chart' ? 60 : 0}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        )}

        {/* Fallback para gráficos mais complexos (Treemap, Radar, Scatter) */}
        {!['charts-tokens', 'bar-simples', 'stacked-bar', 'horizontal-bar', 'line-chart', 'area-chart', 'pie-chart', 'donut-chart'].includes(activeSection) && (
          <div className="flex flex-col gap-4 p-8 border border-dashed border-border/60 rounded-xl bg-card/10 items-center justify-center text-center py-16">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg text-foreground">Gráfico em Desenvolvimento</h3>
            <p className="text-[13px] text-muted-foreground max-w-[400px]">
              A visualização para <strong>{label}</strong> está sendo migrada para a estrutura Recharts atualizada.
            </p>
          </div>
        )}

      </div>
    </section>
  )
}
