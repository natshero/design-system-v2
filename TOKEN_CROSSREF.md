# Token Cross-Reference: design-system-v2 vs rankmyapp-ds (original)

> Análise milimétrica gerada em: 2026-06-01
> Objetivo: identificar o que falta, o que está errado e o que já está certo no v2
> Fonte da verdade: `docs/*/index.html` do rankmyapp-ds (HTML estático criado pelo time de produto)

---

## Sumário

1. [O que o v2 já acertou](#1-o-que-o-v2-já-acertou)
2. [Tokens ausentes por categoria](#2-tokens-ausentes-por-categoria)
3. [Valores errados por produto](#3-valores-errados-por-produto)
4. [Mapeamento de nomes (shadcn ↔ docs)](#4-mapeamento-de-nomes-shadcn--docs)
5. [O themes.css completo e correto](#5-o-themescss-completo-e-correto)
6. [Adições ao index.css](#6-adições-ao-indexcss)
7. [Checklist de implementação](#7-checklist-de-implementação)

---

## 1. O que o v2 já acertou

✅ **Arquitetura `data-theme` no `html`** — Correta. Melhor que o sistema de import por arquivo do original.  
✅ **Estrutura `html[data-theme="produto"]` + `.dark`** — Funciona e é o padrão correto.  
✅ **Cores de brand primária por produto** — `--primary` com os valores certos em todos os 6 produtos.  
✅ **Surfaces dark genéricas** — `#0A0A10/111119/1A1A26` estão corretas para MI Tool, DataRank, Ads, GEO.  
✅ **Surfaces light genéricas** — `#FFFFFF/F4F4FF/EAEAF8` corretas para MI Tool, Ads, DataRank.  
✅ **Cor de border** — `rgba(0,0,0,0.08)` light e `rgba(255,255,255,0.08)` dark corretas.  
✅ **Destructive** — `#E24B4A` correto (coral red da fonte da verdade).  
✅ **Tailwind v4 + shadcn** — Stack correto e moderno.  
✅ **CVA + Base UI** — Padrão de componente correto.  
✅ **Tipografia** — `Space Grotesk` heading, `Inter` body, `JetBrains Mono` mono — correto.  
✅ **Chart base 1-5** — Valores corretos para MI Tool (`#1A88FF, #07C6C3, #FF0167, #FF5700, #00D9FF`).

---

## 2. Tokens ausentes por categoria

### 2.1 Brand — Hover states ausentes

O v2 tem `--primary` (brand) mas não tem o estado de hover. Sem ele, botões e links não conseguem escurecer dinamicamente.

```css
/* FALTA em todos os temas */
--brand-dark: [cor mais escura do brand — ex: #0050E5 para MI Tool]
```

| Produto | --brand-dark | --brand-accent-dark |
|---------|-------------|---------------------|
| MI Tool | `#0050E5` | `#CC004F` |
| DataRank | `#6530CC` | `#CC004F` |
| Ads Intelligence | `#3D4EC8` | `#CC004F` |
| RankCommunity | `#6D28D9` | `#D97706` |
| RankMyGEO | `#008a6e` | `#CC004F` |

---

### 2.2 Text — Terceiro nível de texto ausente

O v2 tem `--foreground` (texto primário) e `--muted-foreground` (texto secundário). Mas falta o texto **muted** (terceiro nível, mais apagado):

```css
/* Nomes sugeridos para adicionar ao v2 */
--text-muted: rgba(255,255,255,0.35); /* dark */
/* light: */
--text-muted: #9090B0;
```

> **Nota:** `--muted-foreground` do shadcn já cobre o texto secundário. Para texto muted, adicione `--text-muted` como alias ou use `--muted-foreground` com menor opacidade.

---

### 2.3 Sidebar — Sistema completo ausente ❌

O v2 tem os tokens genéricos do shadcn (`--sidebar`, `--sidebar-foreground`, `--sidebar-primary`...) mas **não tem os tokens de sidebar específicos por produto** que as docs usam.

Cada produto tem uma sidebar com comportamento único:

```css
/* FALTAM — adicionar em cada bloco de produto */
--sidebar-bg:            [fundo da sidebar];
--sidebar-text:          rgba(255,255,255,0.55); /* texto dos itens */
--sidebar-text-active:   #FFFFFF;
--sidebar-active-bg:     rgba([brand-rgb], 0.15); /* item ativo fundo */
--sidebar-active-border: [brand color];          /* indicador lateral */
--sidebar-hover-bg:      rgba(255,255,255,0.05);
--sidebar-group:         rgba(255,255,255,0.28); /* label de grupo */
```

**Valores por produto (dark = default para sidebar, sempre escura exceto Community):**

| Produto | `--sidebar-bg` dark | `--sidebar-bg` light | `--sidebar-active-bg` |
|---------|--------------------|--------------------|----------------------|
| MI Tool | `#07070C` | `#0D0D1A` | `rgba(26,136,255,0.15)` |
| DataRank | `#07070C` | `#0D0D1A` | `rgba(130,67,255,0.15)` |
| Ads Intelligence | `#07070C` | `#0D0D1A` | `rgba(86,103,234,0.15)` |
| RankCommunity | `#070414` (dark) | `#1E1242` (light) | `rgba(124,58,237,0.20/0.22)` |
| RankMyGEO | `#07070C` | `#0D0D1A` | `rgba(0,168,132,0.15)` |

> **RankCommunity é a exceção:** sidebar escura mesmo em light mode (`#1E1242`), e sidebar ainda mais escura no dark mode (`#070414`).

---

### 2.4 Shadows — Sistema completo ausente ❌

Nenhum token de sombra existe no v2. As sombras precisam mudar entre light/dark e também têm um `glow` tintado com a cor do brand.

```css
/* FALTAM — adicionar em cada bloco */

/* Sombras base (variam entre dark/light) */
--shadow-sm: [valor];
--shadow-md: [valor];
--shadow-lg: [valor];
--shadow-card-soft: [valor];

/* Sombras de glow (tintadas com brand — únicas por produto) */
--shadow-glow:       0 4px 20px rgba([brand-rgb], 0.40);
--shadow-glow-accent: 0 4px 20px rgba(255,1,103,0.35); /* sempre pink */
--shadow-cta-glow:   0 4px 14px 0 rgba([brand-rgb], 0.35);
```

**Valores das sombras base:**

| Modo | `--shadow-sm` | `--shadow-md` | `--shadow-lg` | `--shadow-card-soft` |
|------|--------------|--------------|--------------|---------------------|
| Dark | `0 1px 3px rgba(0,0,0,0.40)` | `0 4px 16px rgba(0,0,0,0.50)` | `0 8px 32px rgba(0,0,0,0.60)` | `0 4px 28px 0 rgba(0,0,0,0.15)` |
| Light | `0 1px 3px rgba(0,0,0,0.08)` | `0 4px 12px rgba(0,0,0,0.10)` | `0 8px 24px rgba(0,0,0,0.12)` | `0 4px 28px 0 rgba(0,0,0,0.06)` |

**Valores do glow por produto (usar RGB do brand):**

| Produto | Brand RGB | `--shadow-glow` | `--shadow-cta-glow` |
|---------|-----------|-----------------|---------------------|
| MI Tool | `26,136,255` | `0 4px 20px rgba(26,136,255,0.40)` | `0 4px 14px 0 rgba(26,136,255,0.35)` |
| DataRank | `130,67,255` | `0 4px 20px rgba(130,67,255,0.40)` | `0 4px 14px 0 rgba(130,67,255,0.35)` |
| Ads Intelligence | `86,103,234` | `0 4px 20px rgba(86,103,234,0.40)` | `0 4px 14px 0 rgba(86,103,234,0.35)` |
| RankCommunity | `124,58,237` | `0 4px 20px rgba(124,58,237,0.40)` | `0 4px 14px 0 rgba(124,58,237,0.35)` |
| RankMyGEO | `0,168,132` | `0 4px 20px rgba(0,168,132,0.40)` | `0 4px 14px 0 rgba(0,168,132,0.35)` |

---

### 2.5 Feedback semântico — Apenas destructive ❌

O v2 tem `--destructive` mas falta o sistema completo de feedback:

```css
/* FALTAM — iguais em todos os produtos (compartilhados) */
--success: #07C6C3;  /* teal — success states, deltas positivos */
--warning: #F59E0B;  /* âmbar — avisos */
--error:   #E24B4A;  /* coral — erros (= --destructive) */
--info:    var(--primary); /* = brand do produto ativo */
```

> **Nota:** `--error` tem o mesmo valor de `--destructive` (`#E24B4A`). Pode ser um alias.  
> `--success` (#07C6C3) é o mesmo valor que `--secondary` em MI Tool — mas é melhor ter ambos nomeados separadamente por semântica.

---

### 2.6 Code block colors — Ausente

```css
/* FALTAM — tintados com brand, variam por produto */
--code-bg:   #0D0D1A; /* igual em todos no dark */
--code-text: [cor tintada com brand];
```

| Produto | `--code-text` dark | `--code-text` light |
|---------|-------------------|---------------------|
| MI Tool | `#BFDBFE` (azul) | `#CDD6F4` |
| DataRank | `#C8B3FF` (roxo) | `#CDD6F4` |
| Ads Intelligence | `#A5B4FC` (indigo) | `#CDD6F4` |
| RankCommunity | `#EDE9FE` (lavanda) | `#3730A3` |
| RankMyGEO | `#DDF8F0` (teal claro) | `#CDD6F4` |

---

### 2.7 Chart tokens — Incompleto (5 de 8+ presentes)

O v2 tem `--chart-1..5`. A fonte da verdade usa 8 séries + tokens semânticos completos:

```css
/* Adicionar em cada produto */

/* Séries 6-8 (iguais em todos os produtos) */
--chart-series-6: [brand-dark]; /* dark variant do brand */
--chart-series-7: #FF935B;      /* laranja claro — fixo */
--chart-series-8: #9CA3AF;      /* cinza — fixo */

/* Tokens semânticos de chart (iguais em todos os produtos) */
--chart-my-app:         var(--primary);  /* = brand do produto */
--chart-competitor:     #9CA3AF;         /* sempre cinza */
--chart-positive:       #07C6C3;         /* sempre teal */
--chart-negative:       #E24B4A;         /* sempre coral */
--chart-neutral:        #F59E0B;         /* sempre âmbar */
--chart-anomaly-high:   #E24B4A;
--chart-anomaly-medium: #F59E0B;
--chart-anomaly-low:    #07C6C3;
--chart-band:           rgba([brand-rgb], 0.12); /* fundo de faixa */

/* Tokens de grid/eixo (variam dark/light) */
--chart-grid:           rgba(255,255,255,0.06); /* dark */
--chart-axis:           #9CA3AF;                 /* fixo */
--chart-axis-size:      11px;                    /* fixo */

/* Tooltip (varia dark/light) */
--chart-tooltip-bg:     #1A1A26;                 /* dark */
--chart-tooltip-border: rgba(255,255,255,0.12);  /* dark */
--chart-tooltip-shadow: 0 4px 12px rgba(0,0,0,0.40);
--chart-tooltip-radius: 8px;
```

**`--chart-band` por produto (usa RGB do brand):**

| Produto | `--chart-band` |
|---------|---------------|
| MI Tool | `rgba(26,136,255,0.12)` |
| DataRank | `rgba(130,67,255,0.12)` |
| Ads Intelligence | `rgba(86,103,234,0.12)` |
| RankCommunity | `rgba(124,58,237,0.12)` |
| RankMyGEO | `rgba(0,168,132,0.12)` |

---

### 2.8 Typography extras — Ausentes

```css
/* FALTAM no @theme inline */
--font-data:        'Space Grotesk', sans-serif; /* para KPIs, tabelas, números */
--tracking-tight:   -0.025em;
--tracking-tighter: -0.04em;
--tracking-label:    0.10em;  /* uppercase labels */
```

---

### 2.9 Surface overlay — Ausente

```css
/* FALTA — overlay de modal/drawer */
--surface-overlay: rgba(0,0,0,0.70);
```

---

## 3. Valores errados por produto

### 3.1 DataRank — Deve ser dark-first ❌

No v2, DataRank tem `--background: #FFFFFF` como default (light). Mas DataRank é o **único produto dark-first** — deve iniciar com superfícies escuras.

```css
/* ERRADO no v2: */
html[data-theme="datarank"] {
  --background: #FFFFFF;   ← WRONG
  ...
}

/* CORRETO: */
html[data-theme="datarank"] {
  --background: #0A0A10;   /* dark como padrão */
  --foreground: #F0F6FC;
  --card: #111119;
  ...
}
html[data-theme="datarank"].light {
  --background: #FFFFFF;   /* light como override */
  ...
}
```

---

### 3.2 RankCommunity — Superfícies dark erradas ❌

No v2, RankCommunity dark usa as mesmas superfícies genéricas dos outros produtos. Mas RankCommunity tem superfícies **purple-tinted** únicas:

```css
/* ERRADO no v2: */
html[data-theme="rankcommunity"].dark {
  --background: #0A0A10;  ← WRONG
  --card:       #111119;  ← WRONG
  --popover:    #1A1A26;  ← WRONG
}

/* CORRETO (purple-tinted): */
html[data-theme="rankcommunity"].dark {
  --background: #0A0614;  /* roxo muito escuro */
  --card:       #110A22;  /* roxo escuro */
  --popover:    #1A1030;  /* roxo médio escuro */
}
```

Também: borders em dark no Community são **brand-tinted**, não genéricas:
```css
/* CORRETO para Community dark: */
--border:          rgba(124,58,237,0.15);  /* roxo sutil */
--border-emphasis: rgba(124,58,237,0.28);  /* roxo médio */
```

---

### 3.3 RankMyGEO — Superfícies light erradas ❌

RankMyGEO tem identidade visual **verde** que deve aparecer nas superfícies em light mode:

```css
/* ERRADO no v2: */
html[data-theme="rankmygeo"] {
  --background: #FFFFFF;   ← WRONG (generic white)
  --foreground: #0D0D1A;   ← WRONG (generic dark)
  --border: rgba(0,0,0,0.08); ← WRONG (generic border)
}

/* CORRETO: */
html[data-theme="rankmygeo"] {
  --background: #F7FAF0;   /* verde muito sutil */
  --foreground: #172014;   /* verde escuro — texto principal */
  --card:       #FFFFFF;   /* branco para cards */
  --muted-foreground: #52624A;  /* verde médio */
  --border: #C5D4B7;            /* verde/sage para bordas */
  --input:  #B5C8A5;            /* verde levemente mais escuro */
}
```

---

### 3.4 RankCommunity — Sidebar light errada ❌

No v2, RankCommunity não tem sidebar customizada em light. A sidebar em light mode deve ser **escura com tom purple**:

```css
/* CORRETO para Community: */
html[data-theme="rankcommunity"] {
  /* sidebar escura mesmo no light mode (deep purple) */
  --sidebar-bg:            #1E1242;
  --sidebar-active-border: #A78BFA;  /* roxo claro — melhor contraste */
  --sidebar-active-bg:     rgba(124,58,237,0.22);
  --sidebar-group:         rgba(255,255,255,0.35);
}
html[data-theme="rankcommunity"].dark {
  --sidebar-bg:            #070414;  /* ainda mais escuro no dark */
  --sidebar-active-bg:     rgba(124,58,237,0.20);
}
```

---

### 3.5 RankMyGEO — Sidebar dark errada ❌

GEO não usa `#07070C` para sidebar. Usa a cor do texto principal (deep green):

```css
/* CORRETO para GEO: */
html[data-theme="rankmygeo"] {
  --sidebar-bg:            #172014;  /* deep green — dark mesmo em light mode */
  --sidebar-text:          #C5D4B7;  /* verde/sage claro */
  --sidebar-active-bg:     rgba(0,168,132,0.15);
  --sidebar-active-border: #00A884;
}
```

---

### 3.6 RankCommunity — Accent errado ❌

RankCommunity tem **âmbar** como segundo acento, não `#FF0167` (pink). O v2 usa o mesmo `--accent: #FF0167` em todos os produtos, mas Community é diferente:

```css
/* ERRADO no v2: */
html[data-theme="rankcommunity"] {
  --accent: #FF0167;  ← WRONG (pink é o acento genérico dos outros)
}

/* CORRETO: */
html[data-theme="rankcommunity"] {
  --accent:            #F59E0B;  /* ÂMBAR — segundo acento do Community */
  --accent-foreground: #FFFFFF;
  /* Nota: --secondary já é teal #07C6C3 */
}
```

---

### 3.7 RankMyGEO — Secondary errado ❌

GEO tem Lime como segundo acento (Gemini), não azul `#1A88FF`:

```css
/* ERRADO no v2: */
html[data-theme="rankmygeo"] {
  --secondary: #1A88FF;  ← WRONG (azul é brand do MI Tool)
}

/* CORRETO: */
html[data-theme="rankmygeo"] {
  --secondary:             #07C6C3;  /* teal compartilhado (brand-secondary) */
  /* tokens adicionais exclusivos do GEO: */
  --accent-lime:           #B8E62E;  /* Gemini — CTA */
  --accent-emerald:        #2FBF71;  /* Perplexity */
  --accent-moss:           #24451A;  /* meta/escuro */
}
```

---

## 4. Mapeamento de nomes (shadcn ↔ docs)

Esta tabela mostra como os tokens do v2 se relacionam com os nomes usados nas docs (fonte da verdade):

| Token v2 (shadcn) | Token docs (fonte da verdade) | Notas |
|-------------------|-------------------------------|-------|
| `--primary` | `--brand` | ✅ Mesmo conceito |
| `--primary-foreground` | `--text-on-brand` | ✅ Mesmo conceito |
| `--ring` | `--brand` | ✅ Usado para focus ring |
| `--background` | `--surface-secondary` | ✅ Fundo da página |
| `--card` | `--surface-primary` | ✅ Fundo de card |
| `--popover` | `--surface-tertiary` | ✅ Fundo de popover |
| `--muted` | `--surface-tertiary` | ✅ Fundo neutro |
| `--foreground` | `--text-primary` | ✅ Texto principal |
| `--muted-foreground` | `--text-secondary` | ✅ Texto secundário |
| `--border` | `--border` | ✅ Borda padrão |
| `--input` | `--border-emphasis` | ✅ Borda de input |
| `--destructive` | `--error` | ✅ Mesmo valor |
| `--secondary` | `--brand-secondary` | ✅ Teal compartilhado |
| `--accent` | `--brand-accent` | ✅ Pink #FF0167 (exceto Community) |
| `--sidebar` | `--sidebar-bg` | ⚠️ shadcn genérico, docs têm mais |
| — | `--brand-dark` | ❌ Ausente no v2 |
| — | `--text-muted` | ❌ Ausente no v2 |
| — | `--success`, `--warning`, `--info` | ❌ Ausente no v2 |
| — | `--shadow-*` | ❌ Ausente no v2 |
| — | `--sidebar-text`, `--sidebar-active-*` | ❌ Ausente no v2 |
| — | `--chart-series-6/7/8` | ❌ Ausente no v2 |
| — | `--chart-my-app`, `--chart-competitor` | ❌ Ausente no v2 |
| — | `--code-bg`, `--code-text` | ❌ Ausente no v2 |
| — | `--font-data` | ❌ Ausente no v2 |

---

## 5. O themes.css completo e correto

Abaixo está o `themes.css` reescrito do zero, fiel às docs, com todos os tokens presentes:

```css
/* 
  RankMyApp Design System — themes.css
  Fonte da verdade: docs/*/index.html (HTML estático do produto)
  
  Mecanismo: html[data-theme="produto"] + .dark/.light
  Defaults (sem data-theme): shadcn genérico em :root/index.css
*/

/* ═══════════════════════════════════════════════════════════════
   TOKENS COMPARTILHADOS ENTRE TODOS OS PRODUTOS
   Esses não mudam de produto para produto
   ═══════════════════════════════════════════════════════════════ */
html[data-theme] {
  /* Feedback semântico — fixos em todos os produtos */
  --success: #07C6C3;
  --warning: #F59E0B;
  --error:   #E24B4A;
  /* --info é = --primary do produto, não precisa declarar */

  /* Chart — séries 2-5 e 7-8 são compartilhadas */
  --chart-2: #07C6C3;   /* teal — brand-secondary */
  --chart-3: #FF0167;   /* pink — brand-accent */
  --chart-4: #FF5700;   /* laranja */
  --chart-5: #00D9FF;   /* ciano */
  --chart-7: #FF935B;   /* laranja claro */
  --chart-8: #9CA3AF;   /* cinza */

  /* Chart semânticos — fixos */
  --chart-competitor:     #9CA3AF;
  --chart-positive:       #07C6C3;
  --chart-negative:       #E24B4A;
  --chart-neutral:        #F59E0B;
  --chart-anomaly-high:   #E24B4A;
  --chart-anomaly-medium: #F59E0B;
  --chart-anomaly-low:    #07C6C3;
  --chart-axis:           #9CA3AF;
  --chart-axis-size:      11px;
  --chart-tooltip-radius: 8px;
  --chart-tooltip-shadow: 0 4px 12px rgba(0,0,0,0.40);

  /* Sidebar — tokens fixos */
  --sidebar-text:        rgba(255,255,255,0.55);
  --sidebar-text-active: #FFFFFF;
  --sidebar-hover-bg:    rgba(255,255,255,0.05);
  --sidebar-group:       rgba(255,255,255,0.28);

  /* Shadow accent — fixo (pink) */
  --shadow-glow-accent: 0 4px 20px rgba(255,1,103,0.35);

  /* Typography extras */
  --font-data: 'Space Grotesk', sans-serif;
}

/* Dark defaults compartilhados */
html[data-theme].dark, html[data-theme="datarank"] {
  --chart-grid:           rgba(255,255,255,0.06);
  --chart-tooltip-bg:     #1A1A26;
  --chart-tooltip-border: rgba(255,255,255,0.12);
  --shadow-sm:         0 1px 3px rgba(0,0,0,0.40);
  --shadow-md:         0 4px 16px rgba(0,0,0,0.50);
  --shadow-lg:         0 8px 32px rgba(0,0,0,0.60);
  --shadow-card-soft:  0 4px 28px 0 rgba(0,0,0,0.15);
  --code-bg: #0D0D1A;
}

/* Light defaults compartilhados */
html[data-theme]:not(.dark):not([data-theme="datarank"]) {
  --chart-grid:           rgba(0,0,0,0.06);
  --chart-tooltip-bg:     #FFFFFF;
  --chart-tooltip-border: #D8D8F0;
  --shadow-sm:         0 1px 3px rgba(0,0,0,0.08);
  --shadow-md:         0 4px 12px rgba(0,0,0,0.10);
  --shadow-lg:         0 8px 24px rgba(0,0,0,0.12);
  --shadow-card-soft:  0 4px 28px 0 rgba(0,0,0,0.06);
  --code-bg: #1E1E2E;
  --code-text: #CDD6F4; /* default light code */
}


/* ═══════════════════════════════════════════════════════════════
   MI TOOL — Mobile Intelligence & ASO
   Brand: Azul #1A88FF | Light-first | Sidebar sempre dark
   ═══════════════════════════════════════════════════════════════ */
html[data-theme="mi-tool"] {
  /* Brand */
  --primary:             #1A88FF;
  --primary-foreground:  #FFFFFF;
  --ring:                #1A88FF;
  --brand-dark:          #0050E5;
  --secondary:           #07C6C3;
  --secondary-foreground:#FFFFFF;
  --accent:              #FF0167;
  --accent-foreground:   #FFFFFF;
  --accent-dark:         #CC004F;

  /* Surfaces — Light */
  --background:          #FFFFFF;
  --foreground:          #0D0D1A;
  --card:                #F4F4FF;
  --card-foreground:     #0D0D1A;
  --popover:             #EAEAF8;
  --popover-foreground:  #0D0D1A;
  --muted:               #EAEAF8;
  --muted-foreground:    #5A5A78;

  /* Text extra */
  --text-muted:          #9090B0;

  /* Borders */
  --border:              rgba(0,0,0,0.08);
  --input:               rgba(0,0,0,0.16);

  /* Sidebar — SEMPRE dark, mesmo em light mode */
  --sidebar-bg:          #07070C;
  --sidebar-active-bg:   rgba(26,136,255,0.15);
  --sidebar-active-border:#1A88FF;

  /* Shadows — light */
  --shadow-glow:         0 4px 20px rgba(26,136,255,0.40);
  --shadow-cta-glow:     0 4px 14px 0 rgba(26,136,255,0.35);

  /* Charts */
  --chart-1:             #1A88FF;
  --chart-6:             #0050E5;
  --chart-my-app:        #1A88FF;
  --chart-band:          rgba(26,136,255,0.12);

  /* Code */
  --code-text:           #BFDBFE;

  /* Radius */
  --radius: 0.5rem;
}

html[data-theme="mi-tool"].dark {
  /* Surfaces — Dark */
  --background:          #0A0A10;
  --foreground:          #F0F6FC;
  --card:                #111119;
  --card-foreground:     #F0F6FC;
  --popover:             #1A1A26;
  --popover-foreground:  #F0F6FC;
  --muted:               #1A1A26;
  --muted-foreground:    rgba(255,255,255,0.60);

  /* Text extra */
  --text-muted:          rgba(255,255,255,0.35);

  /* Borders */
  --border:              rgba(255,255,255,0.08);
  --input:               rgba(255,255,255,0.15);

  /* Sidebar */
  --sidebar-bg:          #07070C;
  --sidebar-active-bg:   rgba(26,136,255,0.18);
  --sidebar-group:       rgba(255,255,255,0.30);
}


/* ═══════════════════════════════════════════════════════════════
   DATARANK — Analytics & Rankings
   Brand: Roxo #8243FF | DARK-FIRST | Sidebar sempre dark
   ÚNICO PRODUTO QUE COMEÇA NO ESCURO
   ═══════════════════════════════════════════════════════════════ */
html[data-theme="datarank"] {
  /* Brand */
  --primary:             #8243FF;
  --primary-foreground:  #FFFFFF;
  --ring:                #8243FF;
  --brand-dark:          #6530CC;
  --secondary:           #07C6C3;
  --secondary-foreground:#FFFFFF;
  --accent:              #FF0167;
  --accent-foreground:   #FFFFFF;
  --accent-dark:         #CC004F;

  /* Surfaces — DARK (padrão para DataRank) */
  --background:          #0A0A10;
  --foreground:          #F0F6FC;
  --card:                #111119;
  --card-foreground:     #F0F6FC;
  --popover:             #1A1A26;
  --popover-foreground:  #F0F6FC;
  --muted:               #1A1A26;
  --muted-foreground:    rgba(255,255,255,0.60);

  /* Text extra */
  --text-muted:          rgba(255,255,255,0.35);

  /* Borders */
  --border:              rgba(255,255,255,0.08);
  --input:               rgba(255,255,255,0.15);

  /* Sidebar */
  --sidebar-bg:          #07070C;
  --sidebar-active-bg:   rgba(130,67,255,0.15);
  --sidebar-active-border:#8243FF;

  /* Shadows */
  --shadow-glow:         0 4px 20px rgba(130,67,255,0.40);
  --shadow-cta-glow:     0 4px 14px 0 rgba(130,67,255,0.35);

  /* Charts */
  --chart-1:             #8243FF;
  --chart-6:             #6530CC;
  --chart-my-app:        #8243FF;
  --chart-band:          rgba(130,67,255,0.12);

  /* Code */
  --code-text:           #C8B3FF;

  /* Radius */
  --radius: 0.5rem;
}

/* Light é o OVERRIDE para DataRank (não o default) */
html[data-theme="datarank"].light {
  --background:          #FFFFFF;
  --foreground:          #0D0D1A;
  --card:                #F4F4FF;
  --card-foreground:     #0D0D1A;
  --popover:             #EAEAF8;
  --popover-foreground:  #0D0D1A;
  --muted:               #EAEAF8;
  --muted-foreground:    #5A5A78;
  --text-muted:          #9090B0;
  --border:              rgba(0,0,0,0.08);
  --input:               rgba(0,0,0,0.16);
  --sidebar-bg:          #0D0D1A;
  --sidebar-active-bg:   rgba(130,67,255,0.18);

  /* Override shadows */
  --shadow-sm:         0 1px 3px rgba(0,0,0,0.08);
  --shadow-md:         0 4px 12px rgba(0,0,0,0.10);
  --shadow-lg:         0 8px 24px rgba(0,0,0,0.12);
  --shadow-card-soft:  0 4px 28px 0 rgba(0,0,0,0.06);
  --chart-grid:        rgba(0,0,0,0.06);
  --chart-tooltip-bg:  #FFFFFF;
  --chart-tooltip-border: #D8D8F0;
  --code-bg:           #1E1E2E;
  --code-text:         #CDD6F4;
}


/* ═══════════════════════════════════════════════════════════════
   ADS INTELLIGENCE — AI & GEO Advertising
   Brand: Azul Royal #5667EA | Light-first | Sidebar sempre dark
   Multi-acento: Lima (Google), Roxo Elétrico (TikTok)
   ═══════════════════════════════════════════════════════════════ */
html[data-theme="ads-intelligence"] {
  /* Brand */
  --primary:             #5667EA;
  --primary-foreground:  #FFFFFF;
  --ring:                #5667EA;
  --brand-dark:          #3D4EC8;
  --secondary:           #07C6C3;
  --secondary-foreground:#FFFFFF;
  --accent:              #FF0167;
  --accent-foreground:   #FFFFFF;
  --accent-dark:         #CC004F;

  /* Accents extras exclusivos de Ads */
  --accent-lime:         #B8E62E;   /* Google Ads */
  --accent-tiktok:       #8F4BE8;   /* TikTok */
  --accent-info:         #38A9D4;   /* links/info */

  /* Surfaces — Light */
  --background:          #FFFFFF;
  --foreground:          #0D0D1A;
  --card:                #F4F4FF;
  --card-foreground:     #0D0D1A;
  --popover:             #EAEAF8;
  --popover-foreground:  #0D0D1A;
  --muted:               #EAEAF8;
  --muted-foreground:    #5A5A78;
  --text-muted:          #9090B0;

  /* Borders */
  --border:              rgba(0,0,0,0.08);
  --input:               rgba(0,0,0,0.16);

  /* Sidebar */
  --sidebar-bg:          #07070C;
  --sidebar-active-bg:   rgba(86,103,234,0.15);
  --sidebar-active-border:#5667EA;

  /* Shadows */
  --shadow-glow:         0 4px 20px rgba(86,103,234,0.40);
  --shadow-cta-glow:     0 4px 14px 0 rgba(86,103,234,0.35);

  /* Charts */
  --chart-1:             #5667EA;
  --chart-6:             #3D4EC8;
  --chart-my-app:        #5667EA;
  --chart-band:          rgba(86,103,234,0.12);

  /* Code */
  --code-text:           #A5B4FC;

  /* Radius */
  --radius: 0.5rem;
}

html[data-theme="ads-intelligence"].dark {
  --background:          #0A0A10;
  --foreground:          #F0F6FC;
  --card:                #111119;
  --card-foreground:     #F0F6FC;
  --popover:             #1A1A26;
  --popover-foreground:  #F0F6FC;
  --muted:               #1A1A26;
  --muted-foreground:    rgba(255,255,255,0.60);
  --text-muted:          rgba(255,255,255,0.35);
  --border:              rgba(255,255,255,0.08);
  --input:               rgba(255,255,255,0.15);
  --sidebar-bg:          #07070C;
  --sidebar-active-bg:   rgba(86,103,234,0.18);
  --sidebar-group:       rgba(255,255,255,0.30);
}


/* ═══════════════════════════════════════════════════════════════
   RANK COMMUNITY — Comunidade & Engajamento
   Brand: Roxo #7C3AED + Âmbar #F59E0B | Light-first | Sidebar dark-purple
   Superfícies dark: purple-tinted (ÚNICAS — não usar genéricas)
   ═══════════════════════════════════════════════════════════════ */
html[data-theme="rankcommunity"] {
  /* Brand */
  --primary:             #7C3AED;
  --primary-foreground:  #FFFFFF;
  --ring:                #7C3AED;
  --brand-dark:          #6D28D9;
  --secondary:           #07C6C3;
  --secondary-foreground:#FFFFFF;
  --accent:              #F59E0B;   /* ÂMBAR — diferente dos outros produtos! */
  --accent-foreground:   #FFFFFF;
  --accent-dark:         #D97706;

  /* Surfaces — Light */
  --background:          #FFFFFF;
  --foreground:          #0F172A;
  --card:                #F8FAFC;
  --card-foreground:     #0F172A;
  --popover:             #F1F5F9;
  --popover-foreground:  #0F172A;
  --muted:               #F1F5F9;
  --muted-foreground:    #475569;
  --text-muted:          #94A3B8;

  /* Borders — light (slate, não purple) */
  --border:              #E2E8F0;
  --input:               #CBD5E1;

  /* Sidebar — escura mesmo em light mode! Deep purple */
  --sidebar-bg:          #1E1242;
  --sidebar-text:        rgba(255,255,255,0.60);
  --sidebar-active-bg:   rgba(124,58,237,0.22);
  --sidebar-active-border:#A78BFA;  /* roxo claro — melhor contraste no dark */
  --sidebar-hover-bg:    rgba(255,255,255,0.07);
  --sidebar-group:       rgba(255,255,255,0.35);

  /* Shadows — light */
  --shadow-sm:         0 1px 3px rgba(0,0,0,0.08);
  --shadow-md:         0 4px 12px rgba(0,0,0,0.10);
  --shadow-lg:         0 8px 24px rgba(0,0,0,0.12);
  --shadow-card-soft:  0 4px 28px 0 rgba(0,0,0,0.15);
  --shadow-glow:       0 4px 20px rgba(124,58,237,0.40);
  --shadow-cta-glow:   0 4px 14px 0 rgba(124,58,237,0.35);

  /* Charts — âmbar como série 2 (energy accent) */
  --chart-1:             #7C3AED;
  --chart-2:             #F59E0B;   /* âmbar, não teal */
  --chart-3:             #14B8A6;
  --chart-6:             #6D28D9;
  --chart-my-app:        #7C3AED;
  --chart-band:          rgba(124,58,237,0.12);
  --chart-grid:          rgba(0,0,0,0.06);   /* light grid */
  --chart-tooltip-bg:    #FFFFFF;
  --chart-tooltip-border:#E2E8F0;

  /* Code — light */
  --code-bg:             #F1F5F9;
  --code-text:           #3730A3;

  /* Gradientes exclusivos do Community */
  --gradient-brand:      linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%);
  --gradient-energy:     linear-gradient(135deg, #F59E0B 0%, #7C3AED 100%);
  --gradient-hero:       linear-gradient(135deg, #F59E0B 0%, #7C3AED 50%, #14B8A6 100%);

  /* Radius */
  --radius: 0.5rem;
}

html[data-theme="rankcommunity"].dark {
  /* Superfícies PURPLE-TINTED — NÃO usar as genéricas #0A0A10 */
  --background:          #0A0614;
  --foreground:          #F1F0FF;
  --card:                #110A22;
  --card-foreground:     #F1F0FF;
  --popover:             #1A1030;
  --popover-foreground:  #F1F0FF;
  --muted:               #1A1030;
  --muted-foreground:    #9B8EC4;
  --text-muted:          #5A4E7A;

  /* Borders — brand-tinted no dark (diferente dos outros!) */
  --border:              rgba(124,58,237,0.15);
  --input:               rgba(124,58,237,0.28);

  /* Sidebar — ainda mais escura no dark */
  --sidebar-bg:          #070414;
  --sidebar-text:        rgba(255,255,255,0.55);
  --sidebar-active-bg:   rgba(124,58,237,0.20);
  --sidebar-active-border:#A78BFA;
  --sidebar-group:       rgba(255,255,255,0.30);

  /* Shadows dark */
  --shadow-sm:         0 1px 3px rgba(0,0,0,0.50);
  --shadow-md:         0 4px 12px rgba(0,0,0,0.60);
  --shadow-lg:         0 8px 24px rgba(0,0,0,0.70);
  --shadow-card-soft:  0 4px 28px 0 rgba(0,0,0,0.40);

  /* Charts dark */
  --chart-grid:           rgba(255,255,255,0.06);
  --chart-tooltip-bg:     #1A1030;
  --chart-tooltip-border: rgba(124,58,237,0.25);

  /* Code dark */
  --code-bg:   #0A0614;
  --code-text: #EDE9FE;
}


/* ═══════════════════════════════════════════════════════════════
   RANKMYGEO — GEO Visibility & AI Engine Monitoring
   Brand: Teal #00A884 | Light-first | Sidebar dark-green
   Superfícies: verde sutil no light, texto verde escuro
   ═══════════════════════════════════════════════════════════════ */
html[data-theme="rankmygeo"] {
  /* Brand */
  --primary:             #00A884;
  --primary-foreground:  #FFFFFF;
  --ring:                #00A884;
  --brand-dark:          #008a6e;
  --secondary:           #07C6C3;
  --secondary-foreground:#FFFFFF;
  --accent:              #FF0167;
  --accent-foreground:   #FFFFFF;
  --accent-dark:         #CC004F;

  /* Accents extras do GEO */
  --accent-lime:         #B8E62E;   /* Gemini */
  --accent-emerald:      #2FBF71;   /* Perplexity */
  --accent-moss:         #24451A;   /* meta dark */

  /* Surfaces — Light com tint verde (ÚNICO — não usar genéricas) */
  --background:          #F7FAF0;   /* verde muito sutil */
  --foreground:          #172014;   /* verde escuro */
  --card:                #FFFFFF;
  --card-foreground:     #172014;
  --popover:             #EEF2E6;
  --popover-foreground:  #172014;
  --muted:               #EEF2E6;
  --muted-foreground:    #52624A;   /* verde médio */
  --text-muted:          #7B8874;

  /* Borders — verde/sage */
  --border:              #C5D4B7;
  --input:               #B5C8A5;

  /* Sidebar — deep green, mesmo em light mode */
  --sidebar-bg:          #172014;   /* mesmo tom do texto principal */
  --sidebar-text:        #C5D4B7;   /* sage — diferente dos outros */
  --sidebar-text-active: #FFFFFF;
  --sidebar-active-bg:   rgba(0,168,132,0.15);
  --sidebar-active-border:#00A884;

  /* Shadows */
  --shadow-glow:         0 4px 20px rgba(0,168,132,0.40);
  --shadow-cta-glow:     0 4px 14px 0 rgba(0,168,132,0.35);

  /* Charts */
  --chart-1:             #00A884;
  --chart-2:             #07C6C3;
  --chart-3:             #FF0167;
  --chart-6:             #008a6e;
  --chart-my-app:        #00A884;
  --chart-band:          rgba(0,168,132,0.12);

  /* Suporte GEO — badges de AI engine */
  --support-teal-bg:    #DDF8F0;   /* ChatGPT */
  --support-emerald-bg: #E4F8ED;   /* Perplexity */
  --support-lime-bg:    #EEFAD0;   /* Gemini */
  --support-moss-bg:    #E8F0E4;   /* meta */

  /* Code */
  --code-text:           #DDF8F0;

  /* Radius */
  --radius: 0.5rem;
}

html[data-theme="rankmygeo"].dark {
  --background:          #0A0A10;
  --foreground:          #F0F6FC;
  --card:                #111119;
  --card-foreground:     #F0F6FC;
  --popover:             #1A1A26;
  --popover-foreground:  #F0F6FC;
  --muted:               #1A1A26;
  --muted-foreground:    rgba(255,255,255,0.60);
  --text-muted:          rgba(255,255,255,0.35);
  --border:              rgba(255,255,255,0.08);
  --input:               rgba(255,255,255,0.15);

  /* Sidebar dark */
  --sidebar-bg:          #07070C;
  --sidebar-active-bg:   rgba(0,168,132,0.18);
  --sidebar-group:       rgba(255,255,255,0.30);
}
```

---

## 6. Adições ao index.css

No `@theme inline` do `index.css`, adicione os tokens que precisam gerar utilities Tailwind:

```css
@theme inline {
  /* Existentes — manter */
  --font-heading: 'Space Grotesk', sans-serif;
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  /* ... resto dos --color-* já existentes ... */

  /* ADICIONAR: */
  --font-data: 'Space Grotesk', sans-serif;  /* gera font-data utility */

  /* Cores de feedback — gera text-success, bg-success, etc. */
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-error:   var(--error);

  /* Texto muted extra */
  --color-text-muted: var(--text-muted);

  /* Shadows */
  --shadow-glow:         var(--shadow-glow);
  --shadow-glow-accent:  var(--shadow-glow-accent);
  --shadow-cta-glow:     var(--shadow-cta-glow);
  --shadow-card-soft:    var(--shadow-card-soft);

  /* Brand dark (hover) */
  --color-brand-dark: var(--brand-dark);

  /* Charts extras */
  --color-chart-6:            var(--chart-6);
  --color-chart-7:            var(--chart-7);
  --color-chart-8:            var(--chart-8);
  --color-chart-my-app:       var(--chart-my-app);
  --color-chart-competitor:   var(--chart-competitor);
  --color-chart-positive:     var(--chart-positive);
  --color-chart-negative:     var(--chart-negative);
  --color-chart-neutral:      var(--chart-neutral);
  --color-chart-band:         var(--chart-band);
  --color-chart-grid:         var(--chart-grid);
  --color-chart-axis:         var(--chart-axis);
  --color-chart-tooltip-bg:   var(--chart-tooltip-bg);

  /* Code */
  --color-code-bg:   var(--code-bg);
  --color-code-text: var(--code-text);
}
```

---

## 7. Checklist de implementação

### Fase A — themes.css (já acima)
- [ ] Substituir `src/styles/themes.css` pelo arquivo desta seção 5
- [ ] Verificar que `html[data-theme]` é setado corretamente em `ProductPreviewPage.tsx`
- [ ] DataRank: usar `.light` como override (não `.dark`) — inverter a lógica

### Fase B — index.css
- [ ] Adicionar `--font-data`, `--color-success/warning/error/info` ao `@theme inline`
- [ ] Adicionar `--color-chart-6..8` e tokens semânticos de chart
- [ ] Adicionar `--color-code-bg`, `--color-code-text`
- [ ] Adicionar `--color-brand-dark`

### Fase C — Sidebar nos componentes
- [ ] Sidebar deve usar `var(--sidebar-bg)` como background
- [ ] Item ativo: `background: var(--sidebar-active-bg)`, `border-left: 3px solid var(--sidebar-active-border)`
- [ ] Texto: `color: var(--sidebar-text)` (não `--foreground`)
- [ ] Texto ativo: `color: var(--sidebar-text-active)`
- [ ] Hover: `background: var(--sidebar-hover-bg)`
- [ ] Labels de grupo: `color: var(--sidebar-group)`

### Fase D — Componentes de feedback
- [ ] Alert: usar `--success`, `--warning`, `--error` ao invés de apenas `--destructive`
- [ ] Badge: adicionar variantes success, warning, info
- [ ] Progress: usar cor de brand

### Fase E — Gráficos
- [ ] Adicionar `--chart-6`, `--chart-7`, `--chart-8` ao `ChartContainer`
- [ ] Usar `--chart-my-app` para a linha do app do usuário
- [ ] Usar `--chart-competitor` para concorrentes
- [ ] Usar `--chart-band` para áreas de fundo (area charts)
- [ ] Usar `--chart-grid` nas linhas de grade do Recharts
- [ ] Usar `--chart-tooltip-bg/border` no tooltip customizado

---

*Documento gerado por análise cruzada: design-system-v2 × rankmyapp-ds × docs/*/index.html*
