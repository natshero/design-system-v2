/**
 * @rankmyapp/ds — tailwind.preset.ts
 * Preset Tailwind para apps que consomem o DS.
 *
 * Uso no tailwind.config.ts do app consumidor:
 *   import { tailwindPreset } from '@rankmyapp/ds/tailwind'
 *   export default { presets: [tailwindPreset], content: [...] }
 *
 * O preset mapeia as CSS vars do DS para utilities Tailwind.
 * Os valores reais vêm do tema ativo (html[data-theme="mi-tool"] etc.).
 */

import type { Config } from 'tailwindcss'

export const tailwindPreset: Partial<Config> = {
  darkMode: ['selector', '.dark'],
  theme: {
    extend: {
      colors: {
        // Brand — respondem ao data-theme ativo
        primary:     'var(--primary)',
        'primary-fg':'var(--primary-foreground)',
        secondary:   'var(--secondary)',
        accent:      'var(--accent)',

        // Surfaces
        background:  'var(--background)',
        card:        'var(--card)',
        popover:     'var(--popover)',
        muted:       'var(--muted)',

        // Foregrounds
        foreground:        'var(--foreground)',
        'muted-foreground':'var(--muted-foreground)',
        'card-foreground': 'var(--card-foreground)',

        // Semânticos
        destructive: 'var(--destructive)',
        success:     'var(--success)',
        warning:     'var(--warning)',
        error:       'var(--error)',

        // Borders & inputs
        border: 'var(--border)',
        input:  'var(--input)',
        ring:   'var(--ring)',

        // Sidebar
        sidebar:    'var(--sidebar)',
        'sidebar-fg':'var(--sidebar-foreground)',

        // Charts
        'chart-1': 'var(--chart-1)',
        'chart-2': 'var(--chart-2)',
        'chart-3': 'var(--chart-3)',
        'chart-4': 'var(--chart-4)',
        'chart-5': 'var(--chart-5)',
        'chart-6': 'var(--chart-6)',
        'chart-7': 'var(--chart-7)',
        'chart-8': 'var(--chart-8)',
      },

      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        '2xl':'var(--radius-2xl)',
        '3xl':'var(--radius-3xl)',
        '4xl':'var(--radius-4xl)',
      },

      fontFamily: {
        display: ['Space Grotesk', 'ui-sans-serif', 'sans-serif'],
        sans:    ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
        data:    ['Space Grotesk', 'ui-sans-serif', 'sans-serif'],
      },

      screens: {
        md:   '1024px',
        lg:   '1440px',
        xl:   '1920px',
        '2xl':'2560px',
      },
    },
  },
}
