export const colors = {
  brandOrange: '#F36F21',
  brandOrangeDark: '#C94E0D',
  white: '#FFFFFF',
  surface: '#FFFFFF',
  background: '#F8F7F5',
  textPrimary: '#292724',
  textSecondary: '#68635E',
  textMuted: '#918B84',
  border: '#E7E2DD',
  borderStrong: '#D8D1CA',
  error: '#B42318',
  success: '#18794E',
  warning: '#A15C00',
  graphite: '#303030',
  mutedOrange: '#FFF0E6',
  mutedSuccess: '#E9F7F0',
} as const;

export const spacing = { xxs: 4, xs: 8, sm: 12, md: 16, lg: 20, xl: 24, xxl: 32, xxxl: 40, huge: 48, hero: 64 } as const;
export const radius = { sm: 8, md: 12, lg: 16, full: 999 } as const;
export const typography = {
  display: { fontSize: 30, lineHeight: 36, fontWeight: '900' as const, letterSpacing: -0.7 },
  heading: { fontSize: 24, lineHeight: 30, fontWeight: '800' as const, letterSpacing: -0.4 },
  section: { fontSize: 20, lineHeight: 26, fontWeight: '800' as const, letterSpacing: -0.2 },
  card: { fontSize: 16, lineHeight: 22, fontWeight: '700' as const },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' as const },
  small: { fontSize: 13, lineHeight: 19, fontWeight: '400' as const },
  caption: { fontSize: 11, lineHeight: 16, fontWeight: '500' as const },
} as const;
export const iconSizes = { small: 16, normal: 20, large: 24, hero: 32 } as const;
export const controls = { buttonHeight: 52, inputHeight: 54, touchTarget: 44 } as const;
export const layout = { containerPadding: 20, screenTop: 12, screenBottom: 118, sectionGap: 28 } as const;
export const shadow = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.045,
  shadowRadius: 8,
  elevation: 2,
} as const;
