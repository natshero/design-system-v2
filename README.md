# RankMyApp Design System

Biblioteca de componentes, tokens e theming multi-brand da RankMyApp, com uma app de documentacao separada para showcase e validacao.

## Estrutura

`src/`

Codigo publicavel da library: componentes, hooks, tema, tokens e entrypoints.

`docs/`

Aplicacao Vite usada como documentacao, playground e vitrine do DS.

`dist/`

Artefatos compilados do pacote NPM, incluindo bundle da library, tipos, `tokens`, `tailwind preset` e CSS.

`dist-docs/`

Build estatico da documentacao para deploy na Vercel.

## Scripts

`npm run dev`

Sobe a app de documentacao localmente.

`npm run build`

Atalho para `npm run build:lib`. Gera o pacote publicavel em `dist/`.

`npm run build:lib`

Empacota a library, gera declaracoes TypeScript, compila os subpath exports e copia os CSS publicos para `dist/`.

`npm run build:docs`

Gera a documentacao estaticamente em `dist-docs/`.

`npm run lint`

Executa o ESLint no repo.

`npm run preview`

Abre um preview da documentacao buildada.

## Consumo da library

### Componentes e estilos

```tsx
import "@rankmyapp/ds/styles";
import { Button, ThemeProvider } from "@rankmyapp/ds";

export function App() {
  return (
    <ThemeProvider initialProduct="rankmyapp" defaultMode="light">
      <Button>Salvar</Button>
    </ThemeProvider>
  );
}
```

### Tokens

```ts
import { productThemes, semanticThemeTokens } from "@rankmyapp/ds/tokens";
```

### Tailwind preset

```ts
import { tailwindPreset } from "@rankmyapp/ds/tailwind";

export default {
  presets: [tailwindPreset],
  content: ["./src/**/*.{ts,tsx}"],
};
```

## Theming

O DS usa CSS variables como contrato principal de design tokens.

- `src/theme/product-themes.ts` concentra os produtos suportados e seus metadados
- `src/theme/token-contract.ts` define o contrato semantico compartilhado pelo CSS e pelo Tailwind
- `src/styles/themes.css` contem os valores reais por produto e por modo

Produtos suportados hoje:

- `rankmyapp`
- `mi-tool`
- `portal`

O `ThemeProvider` nao persiste estado por padrao. Se um app consumidor quiser lembrar `product` e `mode` no navegador, ele precisa ativar isso explicitamente:

```tsx
<ThemeProvider persist initialProduct="mi-tool" defaultMode="dark">
  <App />
</ThemeProvider>
```

Isso evita que preferencias antigas vazem entre apps diferentes que usam a mesma library.

## Publicacao

Os entrypoints publicados hoje sao:

- `@rankmyapp/ds`
- `@rankmyapp/ds/styles`
- `@rankmyapp/ds/tokens`
- `@rankmyapp/ds/tailwind`

Todos apontam para artefatos compilados em `dist/`.

## Deploy da docs

O deploy da documentacao usa a Vercel com:

- `installCommand`: `npm install`
- `buildCommand`: `npm run build:docs`
- `outputDirectory`: `dist-docs`

Essa configuracao ja esta refletida em `vercel.json`.
