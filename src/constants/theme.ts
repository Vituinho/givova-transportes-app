export const colors = {
  brandOrange: '#F36F21',
  brandOrangeDark: '#C94E0D',
  white: '#FFFFFF',
  surface: '#FFFFFF',
  background: '#F7F5F2',
  textPrimary: '#252525',
  textSecondary: '#656565',
  border: '#E6E0DA',
  error: '#B42318',
  success: '#18794E',
  warning: '#A15C00',
  graphite: '#303030',
  mutedOrange: '#FFF0E6',
  mutedSuccess: '#E9F7F0',
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 } as const;
export const radius = { sm: 8, md: 14, lg: 22, full: 999 } as const;
export const shadow = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 3,
} as const;
