import React from 'react'
import { DisplayRenderer } from './categories/DisplayRenderer'
import { FeedbackRenderer } from './categories/FeedbackRenderer'
import { InputsRenderer } from './categories/InputsRenderer'
import { LayoutRenderer } from './categories/LayoutRenderer'
import { NavigationRenderer } from './categories/NavigationRenderer'
import { OverlayRenderer } from './categories/OverlayRenderer'
import { PatternsShowcaseRenderer } from './categories/PatternsShowcaseRenderer'

interface ComponentRendererProps {
  id: string
  label: string
  category?: string
}

const INPUT_COMPONENTS = new Set([
  'button',
  'input',
  'textarea',
  'select',
  'native-select',
  'combobox',
  'radio-group',
  'checkbox',
  'switch',
  'toggle',
  'slider',
  'input-otp',
  'field',
  'input-group',
  'button-group',
  'daterangepicker',
  'command',
])

const DISPLAY_COMPONENTS = new Set([
  'badge',
  'avatar',
  'card',
  'accordion',
  'carousel',
  'collapsible',
  'table',
  'kbd',
  'item',
])

const FEEDBACK_COMPONENTS = new Set([
  'alert',
  'toast',
  'progress',
  'spinner',
  'skeleton',
  'empty-state',
])

const NAVIGATION_COMPONENTS = new Set([
  'tabs',
  'sidebar-comp',
  'breadcrumb-comp',
  'pagination',
  'menubar',
  'navigation-menu',
])

const OVERLAY_COMPONENTS = new Set([
  'modal',
  'tooltip',
  'dropdown-menu',
  'alert-dialog',
  'context-menu',
  'drawer',
  'hover-card',
  'popover',
  'sheet',
])

const LAYOUT_COMPONENTS = new Set([
  'aspect-ratio',
  'resizable',
  'scroll-area',
])

const PATTERN_COMPONENTS = new Set([
  'metric-card',
  'datatable',
  'appshell',
  'page-header',
])

function ComponentFallback({ id, label }: Pick<ComponentRendererProps, 'id' | 'label'>) {
  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="space-y-3">
        <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight font-display leading-tight text-foreground">
          {label}
        </h1>
        <p className="text-[17px] text-muted-foreground">
          Secao em desenvolvimento. Em breve teremos demonstracoes completas deste showcase.
        </p>
      </div>
      <div className="rounded-xl border border-border bg-card/20 p-8 text-center text-muted-foreground">
        <p className="text-sm">Em desenvolvimento</p>
        <code className="mt-2 block text-[11px] text-primary font-mono">{id}</code>
      </div>
    </section>
  )
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  id,
  label,
  category = 'Components',
}) => {
  let content: React.ReactNode = <ComponentFallback id={id} label={label} />

  if (INPUT_COMPONENTS.has(id)) {
    content = <InputsRenderer id={id} label={label} category={category} />
  } else if (DISPLAY_COMPONENTS.has(id)) {
    content = <DisplayRenderer id={id} label={label} category={category} />
  } else if (FEEDBACK_COMPONENTS.has(id)) {
    content = <FeedbackRenderer id={id} label={label} category={category} />
  } else if (NAVIGATION_COMPONENTS.has(id)) {
    content = <NavigationRenderer id={id} label={label} category={category} />
  } else if (OVERLAY_COMPONENTS.has(id)) {
    content = <OverlayRenderer id={id} label={label} category={category} />
  } else if (LAYOUT_COMPONENTS.has(id)) {
    content = <LayoutRenderer id={id} label={label} category={category} />
  } else if (PATTERN_COMPONENTS.has(id)) {
    content = <PatternsShowcaseRenderer id={id} label={label} category={category} />
  }

  return <>{content}</>
}
