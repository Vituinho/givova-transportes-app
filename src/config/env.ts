const trimTrailingSlash = (value?: string) => value?.trim().replace(/\/$/, '') || '';

export const env = {
  apiUrl: trimTrailingSlash(process.env.EXPO_PUBLIC_API_URL),
  siteUrl: trimTrailingSlash(process.env.EXPO_PUBLIC_SITE_URL),
  whatsappNumber: process.env.EXPO_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || '',
  phone: process.env.EXPO_PUBLIC_PHONE?.trim() || '',
  email: process.env.EXPO_PUBLIC_EMAIL?.trim() || '',
} as const;
