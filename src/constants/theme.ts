export const colors = {
  brandOrange: '#F36F21',
  brandOrangeDark: '#C95214',
  white: '#FFFFFF',
  surface: '#FFFFFF',
  background: '#FAF9F7',
  backgroundSecondary: '#F2F0ED',
  textPrimary: '#211F1D',
  textSecondary: '#625E59',
  textMuted: '#918B84',
  border: '#E2DED9',
  borderStrong: '#CBC5BE',
  error: '#B42318',
  success: '#18794E',
  warning: '#A15C00',
  graphite: '#2C2A28',
  mutedOrange: '#FFF1E8',
  mutedSuccess: '#E9F7F0',
} as const;

export const spacing = { xxs: 4, xs: 8, sm: 12, md: 16, lg: 20, xl: 24, xxl: 32, xxxl: 40, huge: 48, hero: 64 } as const;
export const radius = { sm: 6, md: 8, lg: 12, full: 999 } as const;
export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extraBold: 'Inter_800ExtraBold',
} as const;
export const typography = {
  display: { fontFamily: fonts.extraBold, fontSize: 30, lineHeight: 37, letterSpacing: -0.8 },
  h1: { fontFamily: fonts.extraBold, fontSize: 26, lineHeight: 33, letterSpacing: -0.5 },
  h2: { fontFamily: fonts.bold, fontSize: 22, lineHeight: 29, letterSpacing: -0.3 },
  h3: { fontFamily: fonts.bold, fontSize: 19, lineHeight: 25, letterSpacing: -0.2 },
  title: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 22 },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 23 },
  bodySmall: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 19 },
  caption: { fontFamily: fonts.medium, fontSize: 11, lineHeight: 16 },
  button: { fontFamily: fonts.semibold, fontSize: 15, lineHeight: 20 },
  heading: { fontFamily: fonts.extraBold, fontSize: 26, lineHeight: 33, letterSpacing: -0.5 },
  section: { fontFamily: fonts.bold, fontSize: 20, lineHeight: 26, letterSpacing: -0.2 },
  card: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 22 },
  small: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 19 },
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
