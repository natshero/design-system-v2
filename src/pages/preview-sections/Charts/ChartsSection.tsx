import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import type { ScatterShapeProps } from "recharts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Scatter,
  ScatterChart,
  ZAxis,
  Treemap,
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip as RechartsTooltip,
} from "recharts";

// ── Dados de exemplo ──────────────────────────────────────────────────────────

const monthlyData = [
  { month: "Jan", myapp: 186, competitor: 80 },
  { month: "Fev", myapp: 305, competitor: 200 },
  { month: "Mar", myapp: 237, competitor: 120 },
  { month: "Abr", myapp: 73, competitor: 190 },
  { month: "Mai", myapp: 209, competitor: 130 },
  { month: "Jun", myapp: 214, competitor: 140 },
];

const pieData = [
  { name: "Games", value: 275, fill: "var(--chart-1)" },
  { name: "Social", value: 200, fill: "var(--chart-2)" },
  { name: "Finance", value: 187, fill: "var(--chart-3)" },
  { name: "Health", value: 120, fill: "var(--chart-4)" },
  { name: "Travel", value: 90, fill: "var(--chart-5)" },
];

const funnelData = [
  { name: "Impressões", value: 12000, fill: "var(--chart-1)" },
  { name: "Cliques", value: 4800, fill: "var(--chart-2)" },
  { name: "Instalações", value: 1200, fill: "var(--chart-3)" },
  { name: "Ativações", value: 480, fill: "var(--chart-4)" },
  { name: "Retenção", value: 160, fill: "var(--chart-5)" },
];

const radarData = [
  { subject: "ASO", myapp: 120, competitor: 80 },
  { subject: "Keywords", myapp: 98, competitor: 90 },
  { subject: "Reviews", myapp: 86, competitor: 70 },
  { subject: "Downloads", myapp: 99, competitor: 110 },
  { subject: "Ratings", myapp: 85, competitor: 60 },
  { subject: "Creatives", myapp: 65, competitor: 85 },
];

const scatterData = [
  { x: 1200, y: 4.5, z: 200, name: "App A" },
  { x: 4800, y: 3.8, z: 800, name: "App B" },
  { x: 890, y: 4.2, z: 150, name: "App C" },
  { x: 2400, y: 4.8, z: 400, name: "App D" },
  { x: 600, y: 3.1, z: 100, name: "App E" },
  { x: 3600, y: 4.1, z: 600, name: "App F" },
  { x: 7200, y: 4.6, z: 1200, name: "App G" },
];

const treemapData = [
  { name: "Games", size: 4200 },
  { name: "Social", size: 3100 },
  { name: "Finance", size: 2800 },
  { name: "Health", size: 2200 },
  { name: "Shopping", size: 1900 },
  { name: "Travel", size: 1400 },
  { name: "News", size: 1100 },
  { name: "Sports", size: 900 },
];

const TREEMAP_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
];

// chartConfig: chaves mapeiam para CSS vars geradas pelo ChartContainer
const chartConfig = {
  myapp: { label: "My App", color: "var(--chart-my-app)" },
  competitor: { label: "Competitor", color: "var(--chart-competitor)" },
  Games: { label: "Games", color: "var(--chart-1)" },
  Social: { label: "Social", color: "var(--chart-2)" },
  Finance: { label: "Finance", color: "var(--chart-3)" },
  Health: { label: "Health", color: "var(--chart-4)" },
  Travel: { label: "Travel", color: "var(--chart-5)" },
} satisfies ChartConfig;

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Empty state reutilizável para gráficos sem dados (skill: empty-data-state) */
function ChartEmptyState({
  message = "Sem dados para exibir",
  hint,
}: {
  message?: string;
  hint?: string;
}) {
  return (
    <div className="min-h-[260px] flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/10 text-center px-6">
      <div className="size-10 rounded-full bg-muted/40 flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-muted-foreground"
          aria-hidden="true"
        >
          <path
            d="M3 3l18 18M9 9H3v12h18V9h-6M9 3h6v6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-[14px] font-medium text-foreground">{message}</p>
        {hint && (
          <p className="text-[12px] text-muted-foreground mt-1">{hint}</p>
        )}
      </div>
    </div>
  );
}

/** Error state reutilizável para gráficos com falha (skill: error-state-chart) */
function ChartErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="min-h-[260px] flex flex-col items-center justify-center gap-3 rounded-lg border border-error/20 bg-error/5 text-center px-6">
      <div className="size-10 rounded-full bg-error/10 flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-error"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path
            d="M12 8v4m0 4h.01"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-[14px] font-medium text-foreground">
          Falha ao carregar dados
        </p>
        <p className="text-[12px] text-muted-foreground mt-1">
          Verifique sua conexão e tente novamente.
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 px-4 py-1.5 text-[12px] font-medium rounded-md border border-border bg-card text-foreground hover:bg-muted transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}

function ChartCard({
  title,
  description,
  children,
  maxWidth = "max-w-2xl",
  summary,
  tableData,
  isEmpty,
  hasError,
  onRetry,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  maxWidth?: string;
  /** Resumo textual para screen readers (skill: screen-reader-summary) */
  summary?: string;
  /** Dados tabulares alternativos para acessibilidade (skill: data-table) */
  tableData?: { headers: string[]; rows: (string | number)[][] };
  /** Sem dados — exibe empty state (skill: empty-data-state) */
  isEmpty?: boolean;
  /** Com erro — exibe error state (skill: error-state-chart) */
  hasError?: boolean;
  /** Callback de retry para o error state */
  onRetry?: () => void;
}) {
  return (
    <Card className={maxWidth}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* C1: empty state | C2: error state | normal: gráfico */}
        {hasError ? (
          <ChartErrorState onRetry={onRetry} />
        ) : isEmpty ? (
          <ChartEmptyState hint="Adicione dados para visualizar o gráfico." />
        ) : (
          <div
            role="img"
            aria-label={summary ?? `Gráfico ${title}: ${description}`}
          >
            <ChartContainer
              config={chartConfig}
              className="min-h-[260px] w-full"
            >
              {children as React.ReactElement}
            </ChartContainer>
          </div>
        )}

        {/* Tabela colapsável — alternativa acessível ao gráfico (skill: data-table) */}
        {tableData && (
          <details className="mt-2">
            <summary className="text-[12px] text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none py-1">
              Ver dados em tabela
            </summary>
            <div className="mt-2 overflow-x-auto rounded-lg border border-border">
              <table
                className="w-full text-[12px]"
                aria-label={`Dados do gráfico: ${title}`}
              >
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    {tableData.headers.map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="px-3 py-2 text-left font-medium text-muted-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/20"
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="px-3 py-2 text-foreground tabular-nums"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        )}
      </CardContent>
    </Card>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

export const ChartsSection: React.FC<{
  activeSection: string;
  label: string;
}> = ({ activeSection, label }) => {
  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex gap-2">
        <span>Gráficos</span> <span>/</span>{" "}
        <span className="text-foreground">{label}</span>
      </div>
      <div className="border-b pb-4 border-border">
        <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">
          {label}
        </h1>
        <p className="text-[17px] text-muted-foreground mt-2 leading-relaxed">
          Demonstração usando Recharts + tokens do tema ativo.
        </p>
      </div>

      <div className="mt-6">
        {/* ── TOKENS & PADRÕES ────────────────────────────────────────────── */}
        {activeSection === "charts-tokens" && (
          <div className="space-y-10">
            <div>
              <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2 mb-4">
                Data Series (1–8)
              </h2>
              <p className="text-[14px] text-muted-foreground mb-5">
                Séries 1 e 6 seguem o brand do produto ativo. Séries 2–5, 7–8
                são compartilhadas entre todos os produtos.
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col rounded-xl border border-border overflow-hidden"
                  >
                    <div
                      className="h-16"
                      style={{ background: `var(--chart-${i})` }}
                    />
                    <div className="p-2 bg-card">
                      <div className="text-[12px] font-semibold text-foreground">
                        Série {i}
                      </div>
                      <code className="text-[10px] font-mono text-muted-foreground">
                        --chart-{i}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2 mb-4">
                Tokens Semânticos
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    token: "--chart-my-app",
                    label: "My App",
                    desc: "App monitorado",
                  },
                  {
                    token: "--chart-competitor",
                    label: "Competitor",
                    desc: "Concorrentes",
                  },
                  {
                    token: "--chart-positive",
                    label: "Positive",
                    desc: "Crescimento",
                  },
                  {
                    token: "--chart-negative",
                    label: "Negative",
                    desc: "Queda",
                  },
                  {
                    token: "--chart-neutral",
                    label: "Neutral",
                    desc: "Estável",
                  },
                  {
                    token: "--chart-band",
                    label: "Band",
                    desc: "Faixa de fundo",
                  },
                  {
                    token: "--chart-grid",
                    label: "Grid",
                    desc: "Linhas de grade",
                  },
                  { token: "--chart-axis", label: "Axis", desc: "Eixos" },
                ].map(({ token, label: tl, desc }) => (
                  <div
                    key={token}
                    className="rounded-xl border border-border overflow-hidden bg-card"
                  >
                    <div
                      className="h-10"
                      style={{ background: `var(${token})` }}
                    />
                    <div className="p-2">
                      <div className="text-[11px] font-semibold text-foreground">
                        {tl}
                      </div>
                      <code className="text-[10px] font-mono text-muted-foreground block">
                        {token}
                      </code>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* C1 + C2: estados de empty e error */}
            <div>
              <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2 mb-4">
                Estados dos gráficos
              </h2>
              <p className="text-[14px] text-muted-foreground mb-5">
                Todo gráfico precisa tratar{" "}
                <strong className="text-foreground">sem dados</strong> e{" "}
                <strong className="text-foreground">
                  falha de carregamento
                </strong>{" "}
                — nunca deixar eixo vazio ou quebrado.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[15px]">Empty State</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartEmptyState hint="Adicione dados para visualizar." />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[15px]">Error State</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartErrorState onRetry={() => alert("Retry!")} />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-[22px] font-semibold font-display text-foreground border-b border-border pb-2 mb-4">
                Exemplo em contexto
              </h2>
              <ChartCard
                title="App vs Concorrente"
                description="Usando chart-my-app e chart-competitor"
              >
                <LineChart data={monthlyData}>
                  <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--chart-axis)", fontSize: 11 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="myapp"
                    stroke="var(--color-myapp)"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="competitor"
                    stroke="var(--color-competitor)"
                    strokeWidth={2}
                    strokeDasharray="4 2"
                    dot={false}
                  />
                </LineChart>
              </ChartCard>
            </div>
          </div>
        )}

        {/* ── LINE CHART ───────────────────────────────────────────────────── */}
        {activeSection === "charts-line" && (
          <ChartCard
            title="Line Chart"
            description="Comparativo de crescimento mensal — My App vs Concorrente"
            summary="Gráfico de linha: My App lidera com pico em Fevereiro (305 downloads). Concorrente estável entre 80–200."
            tableData={{
              headers: ["Mês", "My App", "Concorrente"],
              rows: monthlyData.map((d) => [d.month, d.myapp, d.competitor]),
            }}
          >
            <LineChart data={monthlyData}>
              <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--chart-axis)", fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--chart-axis)", fontSize: 11 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="myapp"
                stroke="var(--color-myapp)"
                strokeWidth={2.5}
                dot={{ fill: "var(--color-myapp)", r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="competitor"
                stroke="var(--color-competitor)"
                strokeWidth={2}
                strokeDasharray="4 2"
                dot={false}
              />
            </LineChart>
          </ChartCard>
        )}

        {/* ── AREA CHART ───────────────────────────────────────────────────── */}
        {activeSection === "charts-area" && (
          <ChartCard
            title="Area Chart"
            description="Volume acumulado com área de gradiente"
          >
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="fillMyapp" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-my-app)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-my-app)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="fillCompetitor" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-competitor)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-competitor)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--chart-axis)", fontSize: 11 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                type="monotone"
                dataKey="myapp"
                stroke="var(--color-myapp)"
                fill="url(#fillMyapp)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="competitor"
                stroke="var(--color-competitor)"
                fill="url(#fillCompetitor)"
                strokeWidth={1.5}
              />
            </AreaChart>
          </ChartCard>
        )}

        {/* ── BAR CHARTS ───────────────────────────────────────────────────── */}
        {activeSection === "charts-bar-simple" && (
          <ChartCard
            title="Bar Chart — Simples"
            description="Downloads mensais comparados"
          >
            <BarChart data={monthlyData}>
              <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--chart-axis)", fontSize: 11 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="myapp"
                fill="var(--color-myapp)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="competitor"
                fill="var(--color-competitor)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartCard>
        )}

        {activeSection === "charts-bar" && (
          <ChartCard
            title="Stacked Bar"
            description="Volumes empilhados por mês"
          >
            <BarChart data={monthlyData}>
              <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--chart-axis)", fontSize: 11 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="myapp"
                stackId="a"
                fill="var(--color-myapp)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="competitor"
                stackId="a"
                fill="var(--color-competitor)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartCard>
        )}

        {activeSection === "charts-hbar" && (
          <ChartCard
            title="Horizontal Bar"
            description="Comparativo horizontal por mês"
          >
            <BarChart data={monthlyData} layout="vertical">
              <CartesianGrid horizontal={false} stroke="var(--chart-grid)" />
              <XAxis type="number" hide />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--chart-axis)", fontSize: 11 }}
                width={32}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="myapp"
                fill="var(--color-myapp)"
                radius={[0, 4, 4, 0]}
              />
              <Bar
                dataKey="competitor"
                fill="var(--color-competitor)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ChartCard>
        )}

        {/* ── PIE / DONUT ───────────────────────────────────────────────────── */}
        {(activeSection === "charts-pie" ||
          activeSection === "charts-donut") && (
          <ChartCard
            title={
              activeSection === "charts-donut" ? "Donut Chart" : "Pie Chart"
            }
            description="Distribuição de market share por categoria"
            maxWidth="max-w-lg"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={activeSection === "charts-donut" ? 65 : 0}
                outerRadius={activeSection === "charts-donut" ? 105 : 110}
                strokeWidth={2}
                stroke="var(--background)"
              >
                {pieData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartCard>
        )}

        {/* ── FUNNEL ────────────────────────────────────────────────────────── */}
        {activeSection === "charts-funnel" && (
          <ChartCard
            title="Funnel Chart"
            description="Funil de aquisição — impressões até retenção"
            maxWidth="max-w-xl"
          >
            <FunnelChart>
              <RechartsTooltip
                formatter={(v: unknown) => [Number(v).toLocaleString(), ""]}
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Funnel dataKey="value" data={funnelData} isAnimationActive>
                {funnelData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.fill} />
                ))}
                <LabelList
                  dataKey="name"
                  position="right"
                  fill="var(--foreground)"
                  fontSize={12}
                />
                <LabelList
                  dataKey="value"
                  position="center"
                  fill="#fff"
                  fontSize={11}
                  fontWeight={600}
                  formatter={(v: unknown) => Number(v).toLocaleString()}
                />
              </Funnel>
            </FunnelChart>
          </ChartCard>
        )}

        {/* ── RADAR ─────────────────────────────────────────────────────────── */}
        {activeSection === "charts-radar" && (
          <ChartCard
            title="Radar Chart"
            description="Score de performance — My App vs Concorrente"
            maxWidth="max-w-xl"
          >
            <RadarChart data={radarData}>
              {/* B3: grid sutil — var(--chart-grid) em vez de --border (skill: gridline-subtle) */}
              <PolarGrid stroke="var(--chart-grid)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <Radar
                name="My App"
                dataKey="myapp"
                stroke="var(--color-myapp)"
                fill="var(--color-myapp)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Competitor"
                dataKey="competitor"
                stroke="var(--color-competitor)"
                fill="var(--color-competitor)"
                fillOpacity={0.12}
                strokeWidth={1.5}
                strokeDasharray="4 2"
              />
              <ChartLegend content={<ChartLegendContent />} />
              <RechartsTooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
            </RadarChart>
          </ChartCard>
        )}

        {/* ── SCATTER ───────────────────────────────────────────────────────── */}
        {activeSection === "charts-scatter" && (
          <ChartCard
            title="Scatter / Bubble"
            description="Downloads vs Rating — tamanho proporcional ao volume de reviews"
          >
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis
                type="number"
                dataKey="x"
                name="Downloads"
                tick={{ fill: "var(--chart-axis)", fontSize: 11 }}
                tickFormatter={(v) => `${(Number(v) / 1000).toFixed(0)}K`}
                label={{
                  value: "Downloads",
                  position: "insideBottom",
                  offset: -4,
                  fill: "var(--muted-foreground)",
                  fontSize: 11,
                }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Rating"
                domain={[2.5, 5]}
                tick={{ fill: "var(--chart-axis)", fontSize: 11 }}
                label={{
                  value: "⭐ Rating",
                  angle: -90,
                  position: "insideLeft",
                  fill: "var(--muted-foreground)",
                  fontSize: 11,
                }}
              />
              <ZAxis type="number" dataKey="z" range={[60, 400]} />
              <RechartsTooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ payload }) => {
                  if (!payload?.length) return null;
                  const d = payload[0].payload as {
                    name: string;
                    x: number;
                    y: number;
                  };
                  return (
                    <div className="rounded-lg border border-border bg-card px-3 py-2 text-[12px] shadow-md">
                      <p className="font-semibold text-foreground">{d.name}</p>
                      <p className="text-muted-foreground">
                        {d.x.toLocaleString()} downloads · ⭐ {d.y}
                      </p>
                    </div>
                  );
                }}
              />
              {/* B4: shape distinta além de cor — círculo com borda (skill: pattern-texture)
                  Distinguível sem depender só de cor */}
              <Scatter
                data={scatterData}
                fill="var(--chart-1)"
                fillOpacity={0.65}
                stroke="var(--chart-1)"
                strokeWidth={1.5}
                shape={(props: ScatterShapeProps) => {
                  const {
                    cx = 0,
                    cy = 0,
                    r = 8,
                  } = props as ScatterShapeProps & { r?: number };
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill="var(--chart-1)"
                      fillOpacity={0.65}
                      stroke="var(--background)"
                      strokeWidth={2}
                    />
                  );
                }}
              />
            </ScatterChart>
          </ChartCard>
        )}

        {/* ── TREEMAP ───────────────────────────────────────────────────────── */}
        {activeSection === "charts-treemap" && (
          <ChartCard
            title="Treemap"
            description="Distribuição de volume por categoria de app"
          >
            <Treemap
              data={treemapData}
              dataKey="size"
              aspectRatio={4 / 3}
              content={({ x, y, width, height, name, value, index }) => {
                const idx = (index ?? 0) % TREEMAP_COLORS.length;
                if ((width ?? 0) < 30 || (height ?? 0) < 20) return <g />;
                return (
                  <g>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      style={{
                        fill: TREEMAP_COLORS[idx],
                        stroke: "var(--background)",
                        strokeWidth: 2,
                        opacity: 0.85,
                      }}
                    />
                    {(width ?? 0) > 60 && (height ?? 0) > 30 && (
                      <>
                        <text
                          x={(x ?? 0) + (width ?? 0) / 2}
                          y={(y ?? 0) + (height ?? 0) / 2 - 6}
                          textAnchor="middle"
                          fill="#fff"
                          fontSize={13}
                          fontWeight={600}
                        >
                          {name}
                        </text>
                        <text
                          x={(x ?? 0) + (width ?? 0) / 2}
                          y={(y ?? 0) + (height ?? 0) / 2 + 10}
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.75)"
                          fontSize={11}
                        >
                          {Number(value).toLocaleString()}
                        </text>
                      </>
                    )}
                  </g>
                );
              }}
            />
          </ChartCard>
        )}
      </div>
    </section>
  );
};
