import Constants from 'expo-constants';
import { router } from 'expo-router';
import { Building2, ChevronRight, FileText, Handshake, Headphones, Mail, MessageCircle, Phone, Settings, ShieldCheck, Truck } from 'lucide-react-native';
import { useState, type ComponentType } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { company } from '@/config/company';
import { colors, fonts, typography } from '@/constants/theme';
import { contactLinks } from '@/lib/links';

type MenuItem = {
  label: string;
  icon: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  route?: '/solutions' | '/about' | '/clients' | '/contact' | '/legal/privacy' | '/legal/terms' | '/settings';
  action?: () => Promise<void>;
  disabled?: boolean;
};

function MenuRow({ item, onAction, divided }: { item: MenuItem; onAction: (item: MenuItem) => void; divided: boolean }) {
  const Icon = item.icon;
  return <Pressable accessibilityRole="button" disabled={item.disabled} onPress={() => onAction(item)} style={({ pressed }) => [styles.row, divided && styles.divider, item.disabled && styles.disabled, pressed && styles.pressed]}><Icon size={20} color={item.disabled ? colors.textMuted : colors.brandOrangeDark} strokeWidth={2} /><Text style={styles.label}>{item.label}</Text>{item.disabled ? <Text style={styles.unavailable}>Não configurado</Text> : <ChevronRight size={19} color={colors.textMuted} />}</Pressable>;
}

export default function MoreScreen() {
  const [message, setMessage] = useState('');
  const groups: { title: string; items: MenuItem[] }[] = [
    { title: 'Atendimento', items: [
      { label: 'Falar pelo WhatsApp', icon: MessageCircle, action: contactLinks.whatsapp, disabled: !company.whatsapp },
      { label: 'Ligar', icon: Phone, action: contactLinks.phone, disabled: !company.phone },
      { label: 'Enviar e-mail', icon: Mail, action: contactLinks.email, disabled: !company.email },
      { label: 'Outros canais', icon: Headphones, route: '/contact' },
    ] },
    { title: 'Givova', items: [
      { label: 'Nossas soluções', icon: Truck, route: '/solutions' },
      { label: 'Sobre a Givova', icon: Building2, route: '/about' },
      { label: 'Clientes e parceiros', icon: Handshake, route: '/clients' },
    ] },
    { title: 'Legal', items: [
      { label: 'Política de Privacidade', icon: ShieldCheck, route: '/legal/privacy' },
      { label: 'Termos de Uso', icon: FileText, route: '/legal/terms' },
    ] },
    { title: 'Aplicativo', items: [{ label: 'Configurações', icon: Settings, route: '/settings' }] },
  ];

  const run = async (item: MenuItem) => {
    setMessage('');
    if (item.route) { router.push(item.route); return; }
    if (!item.action) return;
    try { await item.action(); } catch (error) { setMessage(error instanceof Error ? error.message : 'Não foi possível abrir este canal.'); }
  };

  return (
    <Screen contentContainerStyle={styles.screen}>
      <Header title="Mais" />
      {groups.map((group) => <View key={group.title} style={styles.group}><Text style={styles.groupTitle}>{group.title}</Text><View style={styles.list}>{group.items.map((item, index) => <MenuRow key={item.label} item={item} onAction={run} divided={index < group.items.length - 1} />)}</View></View>)}
      {message ? <Text accessibilityRole="alert" style={styles.error}>{message}</Text> : null}
      <View style={styles.version}><Text style={styles.versionLabel}>Givova Transportes</Text><Text style={styles.versionValue}>Versão {Constants.expoConfig?.version ?? '1.0.0'}</Text></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { gap: 28 },
  group: { gap: 8 },
  groupTitle: { color: colors.textMuted, fontFamily: fonts.bold, fontSize: 11, lineHeight: 16, textTransform: 'uppercase', letterSpacing: 1 },
  list: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
  row: { minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: 13, paddingHorizontal: 2 },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  label: { color: colors.textPrimary, ...typography.title, flex: 1 },
  unavailable: { color: colors.textMuted, ...typography.caption },
  disabled: { opacity: 0.72 },
  pressed: { opacity: 0.55 },
  error: { color: colors.error, ...typography.bodySmall },
  version: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 16, flexDirection: 'row', justifyContent: 'space-between' },
  versionLabel: { color: colors.textSecondary, ...typography.bodySmall },
  versionValue: { color: colors.textMuted, ...typography.bodySmall },
});
