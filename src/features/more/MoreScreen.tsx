import { router } from 'expo-router';
import { Bell, Building2, ChevronRight, CircleHelp, FileText, Handshake, Headphones, Info, Settings, ShieldCheck, Truck } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandLogo } from '@/components/BrandLogo';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { colors, radius } from '@/constants/theme';

const groups = [
  { title: 'Givova', items: [
    { label: 'Sobre a Givova', icon: Building2, route: '/about' }, { label: 'Serviços', icon: Truck, route: '/(tabs)/services' }, { label: 'Clientes e parceiros', icon: Handshake, route: '/clients' }, { label: 'Contato', icon: Headphones, route: '/contact' },
  ] },
  { title: 'Informações e preferências', items: [
    { label: 'Política de Privacidade', icon: ShieldCheck, route: '/legal/privacy' }, { label: 'Termos de Uso', icon: FileText, route: '/legal/terms' }, { label: 'Configurações', icon: Settings, route: '/settings' }, { label: 'Sobre o aplicativo', icon: Info, route: '/app-info' },
  ] },
] as const;

export default function MoreScreen() {
  return <Screen><Header title="Mais" subtitle="Institucional, contato e preferências" /><View style={styles.brandCard}><BrandLogo /><Text style={styles.brandText}>A Givova mais perto de você.</Text><View style={styles.future}><Bell size={15} color={colors.brandOrangeDark} /><Text style={styles.futureText}>Área do cliente e notificações preparadas para as próximas integrações.</Text></View></View>{groups.map((group) => <View key={group.title} style={styles.group}><Text style={styles.groupTitle}>{group.title}</Text><View style={styles.menu}>{group.items.map(({ label, icon: Icon, route }, index) => <Pressable key={label} accessibilityRole="button" onPress={() => router.push(route)} style={({ pressed }) => [styles.row, index < group.items.length - 1 && styles.border, pressed && styles.pressed]}><View style={styles.icon}><Icon size={20} color={colors.brandOrangeDark} /></View><Text style={styles.label}>{label}</Text><ChevronRight size={19} color={colors.textSecondary} /></Pressable>)}</View></View>)}<View style={styles.help}><CircleHelp size={20} color={colors.textSecondary} /><Text style={styles.helpText}>Informações de contato são lidas da configuração do ambiente para evitar dados incorretos.</Text></View></Screen>;
}

const styles = StyleSheet.create({
  brandCard: { backgroundColor: colors.white, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: 20, gap: 14 }, brandText: { color: colors.textPrimary, fontSize: 19, fontWeight: '800' }, future: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 12, borderRadius: radius.md, backgroundColor: colors.mutedOrange }, futureText: { flex: 1, color: colors.textSecondary, fontSize: 12, lineHeight: 17 }, group: { gap: 9 }, groupTitle: { color: colors.textSecondary, fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 }, menu: { backgroundColor: colors.white, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' }, row: { minHeight: 62, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 12 }, border: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border }, icon: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.mutedOrange, alignItems: 'center', justifyContent: 'center' }, label: { flex: 1, color: colors.textPrimary, fontSize: 14, fontWeight: '700' }, pressed: { opacity: 0.7 }, help: { flexDirection: 'row', gap: 10, paddingHorizontal: 8 }, helpText: { flex: 1, color: colors.textSecondary, fontSize: 12, lineHeight: 18 },
});
