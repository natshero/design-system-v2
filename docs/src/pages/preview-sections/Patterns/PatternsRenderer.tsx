import React from 'react'
import { ComponentRenderer } from '../Components/ComponentRenderer'

interface PatternsRendererProps {
  id: string
  label: string
}

export const PatternsRenderer: React.FC<PatternsRendererProps> = ({ id, label }) => {
  return <ComponentRenderer id={id} label={label} category="Patterns" />
}
