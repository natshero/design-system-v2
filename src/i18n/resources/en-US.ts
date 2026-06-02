export const enUS = {
  ds: {
    common: {
      close:   'Close',
      confirm: 'Confirm',
      cancel:  'Cancel',
      clear:   'Clear',
      search:  'Search...',
    },
    modal: {
      confirmDefault: 'Confirm',
      cancelDefault:  'Cancel',
      closeAriaLabel: 'Close',
    },
    datepicker: {
      placeholder: 'Select a period',
      presets: {
        today:       'Today',
        yesterday:   'Yesterday',
        last7days:   'Last 7 days',
        last15days:  'Last 15 days',
        lastMonth:   'Last month',
        last3months: 'Last 3 months',
        last6months: 'Last 6 months',
        lastYear:    'Last year',
      },
      dateFormat:        'MM/DD/YYYY',
      presetsTitle:      'Period',
      apply:             'Apply',
      statusSelectStart: 'Select a start date',
      statusSelectEnd:   'Click to set end date',
      statusReady:       'Confirm the selected period',
    },
    pagination: {
      ariaLabel: 'Pagination',
      previous:  'Previous page',
      next:      'Next page',
    },
    search: {
      clearAriaLabel: 'Clear search',
      placeholder:    'Search...',
    },
    select: {
      searchPlaceholder: 'Search...',
      noResults:         'No results',
    },
    multiselect: {
      searchPlaceholder: 'Search...',
      noOptions:         'No options',
      clearSelection:    'Clear selection ({{count}})',
    },
    rangeSlider: {
      minAriaLabel: 'Minimum value',
      maxAriaLabel: 'Maximum value',
    },
    breadcrumb: {
      ariaLabel: 'Breadcrumb',
    },
    toast: {
      containerAriaLabel: 'Notifications',
      closeAriaLabel:     'Close',
    },
    docs: {
      search:       'Search...',
      backToHome:   'Back to home',
      toggleTheme:  'Toggle theme',
      lightMode:    'Light mode',
      darkMode:     'Dark mode',
      available:    'Available',
      comingSoon:   'Coming soon',
      copyCode:     'Copy',
      copied:       'Copied!',
      viewTable:    'View data as table',
      noData:       'No data to display',
      errorLoad:    'Failed to load data',
      retry:        'Try again',
    },
  },
} as const
