import { router } from 'expo-router';
import { Bell, Building2, ChevronRight, CircleHelp, FileText, Handshake, Headphones, Info, Settings, ShieldCheck, Truck } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { colors } from '@/constants/theme';

const groups = [
  { title: 'Givova', items: [
    { label: 'Sobre a Givova', icon: Building2, route: '/about' }, { label: 'Serviços', icon: Truck, route: '/(tabs)/services' }, { label: 'Clientes e parceiros', icon: Handshake, route: '/clients' }, { label: 'Contato', icon: Headphones, route: '/contact' },
  ] },
  { title: 'Informações e preferências', items: [
    { label: 'Política de Privacidade', icon: ShieldCheck, route: '/legal/privacy' }, { label: 'Termos de Uso', icon: FileText, route: '/legal/terms' }, { label: 'Configurações', icon: Settings, route: '/settings' }, { label: 'Sobre o aplicativo', icon: Info, route: '/app-info' },
  ] },
] as const;

export default function MoreScreen() {
  return <Screen><Header title="Mais" subtitle="Givova, atendimento e preferências" /><View style={styles.future}><Bell size={18} color={colors.brandOrangeDark} /><Text style={styles.futureText}>Notificações e área do cliente estão preparadas para as próximas integrações.</Text></View>{groups.map((group) => <View key={group.title} style={styles.group}><Text style={styles.groupTitle}>{group.title}</Text><View style={styles.menu}>{group.items.map(({ label, icon: Icon, route }, index) => <Pressable key={label} accessibilityRole="button" onPress={() => router.push(route)} style={({ pressed }) => [styles.row, index < group.items.length - 1 && styles.border, pressed && styles.pressed]}><Icon size={20} color={colors.brandOrangeDark} /><Text style={styles.label}>{label}</Text><ChevronRight size={19} color={colors.textMuted} /></Pressable>)}</View></View>)}<View style={styles.help}><CircleHelp size={20} color={colors.textSecondary} /><Text style={styles.helpText}>Os canais de atendimento exibem apenas informações oficiais configuradas.</Text></View></Screen>;
}

const styles = StyleSheet.create({
  future: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingLeft: 14, borderLeftWidth: 3, borderLeftColor: colors.brandOrange }, futureText: { flex: 1, color: colors.textSecondary, fontSize: 13, lineHeight: 19 }, group: { gap: 8 }, groupTitle: { color: colors.textSecondary, fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 }, menu: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border }, row: { minHeight: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 2, gap: 13 }, border: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border }, label: { flex: 1, color: colors.textPrimary, fontSize: 15, fontWeight: '700' }, pressed: { opacity: 0.7 }, help: { flexDirection: 'row', gap: 10, paddingHorizontal: 2 }, helpText: { flex: 1, color: colors.textSecondary, fontSize: 12, lineHeight: 18 },
});
