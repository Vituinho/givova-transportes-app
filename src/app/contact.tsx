import { Mail, MessageCircle, Phone, Send, Smartphone } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { company } from '@/config/company';
import { colors } from '@/constants/theme';
import { contactLinks } from '@/lib/links';

export default function ContactScreen() {
  const [message, setMessage] = useState('');
  const run = async (action: () => Promise<void>) => { setMessage(''); try { await action(); } catch (error) { setMessage(error instanceof Error ? error.message : 'Não foi possível abrir este canal.'); } };
  return <Screen><Header title="Fale com a Givova" subtitle="Escolha o melhor canal" back /><View style={styles.intro}><View style={styles.icon}><Smartphone size={32} color={colors.white} /></View><Text style={styles.title}>Atendimento direto, quando você precisar.</Text><Text style={styles.description}>Os canais abaixo usam somente dados oficiais configurados para o aplicativo.</Text></View><View style={styles.actions}><Button label={company.whatsapp ? 'Abrir WhatsApp' : 'WhatsApp — aguardando configuração'} onPress={() => run(contactLinks.whatsapp)} disabled={!company.whatsapp} icon={<MessageCircle size={19} color={company.whatsapp ? colors.white : colors.textMuted} />} /><Button label={company.phone ? 'Ligar para a Givova' : 'Telefone — aguardando configuração'} variant="outline" onPress={() => run(contactLinks.phone)} disabled={!company.phone} icon={<Phone size={19} color={company.phone ? colors.textPrimary : colors.textMuted} />} /><Button label={company.email ? 'Enviar e-mail' : 'E-mail — aguardando configuração'} variant="outline" onPress={() => run(contactLinks.email)} disabled={!company.email} icon={<Mail size={19} color={company.email ? colors.textPrimary : colors.textMuted} />} /><Button label={company.website ? 'Visitar o site' : 'Site — aguardando configuração'} variant="outline" onPress={() => run(contactLinks.website)} disabled={!company.website} icon={<Send size={19} color={company.website ? colors.textPrimary : colors.textMuted} />} /></View>{message ? <Text accessibilityRole="alert" style={styles.error}>{message}</Text> : null}<Card style={styles.note}><Text style={styles.noteTitle}>Configuração segura</Text><Text style={styles.noteText}>Telefone, e-mail, site e WhatsApp não foram presumidos. Eles devem ser preenchidos nas variáveis públicas de ambiente antes da distribuição.</Text></Card></Screen>;
}

const styles = StyleSheet.create({
  intro: { gap: 11 }, icon: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.brandOrange, alignItems: 'center', justifyContent: 'center' }, title: { color: colors.textPrimary, fontSize: 27, lineHeight: 33, fontWeight: '900', maxWidth: 340 }, description: { color: colors.textSecondary, fontSize: 15, lineHeight: 22 }, actions: { gap: 10 }, error: { color: colors.error, fontSize: 13, textAlign: 'center' }, note: { backgroundColor: colors.mutedOrange, borderColor: '#F6C5A6' }, noteTitle: { color: colors.brandOrangeDark, fontWeight: '800', fontSize: 15 }, noteText: { color: colors.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 5 },
});
