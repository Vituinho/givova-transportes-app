import * as Linking from 'expo-linking';
import { company, whatsappMessage } from '@/config/company';

async function openConfiguredUrl(url: string, unavailableMessage: string) {
  if (!url) throw new Error(unavailableMessage);
  await Linking.openURL(url);
}

export const contactLinks = {
  whatsapp: () => openConfiguredUrl(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`, 'O WhatsApp oficial ainda precisa ser configurado.'),
  phone: () => openConfiguredUrl(company.phone ? `tel:${company.phone}` : '', 'O telefone oficial ainda precisa ser configurado.'),
  email: () => openConfiguredUrl(company.email ? `mailto:${company.email}` : '', 'O e-mail oficial ainda precisa ser configurado.'),
  website: () => openConfiguredUrl(company.website, 'O endereço oficial do site ainda precisa ser configurado.'),
};
