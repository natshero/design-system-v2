export const esES = {
  ds: {
    common: {
      close:   'Cerrar',
      confirm: 'Confirmar',
      cancel:  'Cancelar',
      clear:   'Limpiar',
      search:  'Buscar...',
    },
    modal: {
      confirmDefault: 'Confirmar',
      cancelDefault:  'Cancelar',
      closeAriaLabel: 'Cerrar',
    },
    datepicker: {
      placeholder: 'Selecciona un período',
      presets: {
        today:       'Hoy',
        yesterday:   'Ayer',
        last7days:   'Últimos 7 días',
        last15days:  'Últimos 15 días',
        lastMonth:   'Último mes',
        last3months: 'Últimos 3 meses',
        last6months: 'Últimos 6 meses',
        lastYear:    'Último año',
      },
      dateFormat:        'DD/MM/YYYY',
      presetsTitle:      'Período',
      apply:             'Aplicar',
      statusSelectStart: 'Seleccione la fecha de inicio',
      statusSelectEnd:   'Clic para definir la fecha de fin',
      statusReady:       'Confirme el período seleccionado',
    },
    pagination: {
      ariaLabel: 'Paginación',
      previous:  'Página anterior',
      next:      'Página siguiente',
    },
    search: {
      clearAriaLabel: 'Limpiar búsqueda',
      placeholder:    'Buscar...',
    },
    select: {
      searchPlaceholder: 'Buscar...',
      noResults:         'Sin resultados',
    },
    multiselect: {
      searchPlaceholder: 'Buscar...',
      noOptions:         'Sin opciones',
      clearSelection:    'Limpiar selección ({{count}})',
    },
    rangeSlider: {
      minAriaLabel: 'Valor mínimo',
      maxAriaLabel: 'Valor máximo',
    },
    breadcrumb: {
      ariaLabel: 'Navegación',
    },
    toast: {
      containerAriaLabel: 'Notificaciones',
      closeAriaLabel:     'Cerrar',
    },
    docs: {
      search:       'Buscar...',
      backToHome:   'Volver al inicio',
      toggleTheme:  'Cambiar tema',
      lightMode:    'Modo claro',
      darkMode:     'Modo oscuro',
      available:    'Disponible',
      comingSoon:   'Próximamente',
      copyCode:     'Copiar',
      copied:       '¡Copiado!',
      viewTable:    'Ver datos como tabla',
      noData:       'Sin datos para mostrar',
      errorLoad:    'Error al cargar datos',
      retry:        'Reintentar',
    },
  },
} as const
