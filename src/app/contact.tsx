import { Mail, MessageCircle, Phone, Send } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { company } from '@/config/company';
import { colors, fonts, typography } from '@/constants/theme';
import { contactLinks } from '@/lib/links';

export default function ContactScreen() {
  const [message, setMessage] = useState('');
  const run = async (action: () => Promise<void>) => { setMessage(''); try { await action(); } catch (error) { setMessage(error instanceof Error ? error.message : 'Não foi possível abrir este canal.'); } };
  return <Screen><Header title="Fale com a Givova" back /><View style={styles.intro}><Text style={styles.eyebrow}>Atendimento</Text><Text style={styles.title}>Escolha o melhor canal.</Text><Text style={styles.description}>O aplicativo utiliza somente contatos oficiais configurados.</Text></View><View style={styles.actions}><Button label={company.whatsapp ? 'Abrir WhatsApp' : 'WhatsApp — aguardando configuração'} onPress={() => run(contactLinks.whatsapp)} disabled={!company.whatsapp} icon={<MessageCircle size={19} color={company.whatsapp ? colors.white : colors.textMuted} />} /><Button label={company.phone ? 'Ligar para a Givova' : 'Telefone — aguardando configuração'} variant="outline" onPress={() => run(contactLinks.phone)} disabled={!company.phone} icon={<Phone size={19} color={company.phone ? colors.textPrimary : colors.textMuted} />} /><Button label={company.email ? 'Enviar e-mail' : 'E-mail — aguardando configuração'} variant="outline" onPress={() => run(contactLinks.email)} disabled={!company.email} icon={<Mail size={19} color={company.email ? colors.textPrimary : colors.textMuted} />} /><Button label={company.website ? 'Visitar o site' : 'Site — aguardando configuração'} variant="outline" onPress={() => run(contactLinks.website)} disabled={!company.website} icon={<Send size={19} color={company.website ? colors.textPrimary : colors.textMuted} />} /></View>{message ? <Text accessibilityRole="alert" style={styles.error}>{message}</Text> : null}<View style={styles.note}><Text style={styles.noteTitle}>Contatos oficiais</Text><Text style={styles.noteText}>Telefone, e-mail, site e WhatsApp devem ser preenchidos nas variáveis públicas de ambiente antes da distribuição.</Text></View></Screen>;
}

const styles = StyleSheet.create({
  intro: { gap: 8 }, eyebrow: { color: colors.brandOrangeDark, fontFamily: fonts.bold, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }, title: { color: colors.textPrimary, ...typography.h1 }, description: { color: colors.textSecondary, ...typography.body }, actions: { gap: 10 }, error: { color: colors.error, ...typography.bodySmall, textAlign: 'center' }, note: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 17 }, noteTitle: { color: colors.textPrimary, ...typography.title }, noteText: { color: colors.textSecondary, ...typography.bodySmall, marginTop: 5 },
});
