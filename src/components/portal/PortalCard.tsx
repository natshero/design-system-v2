import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface PortalCardProps {
  id: string
  name: string
  description: string
  icon: string
  colorClass: string
  available?: boolean
  stats?: string
  path?: string
}

export const PortalCard: React.FC<PortalCardProps> = ({
  name,
  description,
  icon,
  colorClass,
  available = true,
  stats,
  path
}) => {
  const navigate = useNavigate()

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        available ? 'cursor-pointer hover:border-primary/50' : 'opacity-60 cursor-default'
      }`}
      onClick={() => available && path && navigate(path)}
    >
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${colorClass}`}>
          {icon}
        </div>
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold tracking-tight">{name}</CardTitle>
          <CardDescription className="text-sm font-medium">{description}</CardDescription>
        </div>
      </CardHeader>
      
      <div className="mx-6 my-2 h-px bg-border" />
      
      <CardContent className="pb-4">
        <div className="flex flex-col gap-2">
          {available ? (
            <Badge variant="outline" className="w-fit border-emerald-500/30 text-emerald-500 bg-emerald-500/10 gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Disponível
            </Badge>
          ) : (
            <Badge variant="secondary" className="w-fit text-muted-foreground">
              Em breve
            </Badge>
          )}
          {stats && <span className="text-xs text-muted-foreground">{stats}</span>}
        </div>
      </CardContent>

      {available && (
        <CardFooter className="pt-0">
          <div className="flex items-center text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
            Acessar docs <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
