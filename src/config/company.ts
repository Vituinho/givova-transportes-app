import { env } from '@/config/env';

export const company = {
  name: 'Givova Transportes',
  shortName: 'Givova',
  phone: env.phone,
  whatsapp: env.whatsappNumber,
  email: env.email,
  website: env.siteUrl,
  address: '',
  socials: { instagram: '', linkedin: '' },
} as const;

export const whatsappMessage =
  'Olá! Vim pelo aplicativo da Givova Transportes e gostaria de atendimento.';
