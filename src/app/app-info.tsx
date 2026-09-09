import Constants from 'expo-constants';
import { Smartphone } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { BrandLogo } from '@/components/BrandLogo';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { colors, radius, typography } from '@/constants/theme';

export default function AppInfoScreen() {
  return <Screen><Header title="Sobre o aplicativo" back /><View style={styles.hero}><View style={styles.logo}><BrandLogo /></View><Text style={styles.title}>Givova Transportes</Text><Text style={styles.version}>Versão {Constants.expoConfig?.version ?? '1.0.0'}</Text></View><View style={styles.content}><View style={styles.row}><Smartphone size={22} color={colors.brandOrange} /><View style={styles.copy}><Text style={styles.heading}>Produto mobile multiplataforma</Text><Text style={styles.text}>Construído com React Native e Expo para oferecer uma experiência consistente em Android e iOS.</Text></View></View><Text style={styles.note}>© {new Date().getFullYear()} Givova Transportes. Informações legais e de copyright devem ser confirmadas antes da publicação.</Text></View></Screen>;
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: 28, gap: 7 }, logo: { marginBottom: 14 }, title: { color: colors.textPrimary, ...typography.h2 }, version: { color: colors.textSecondary, ...typography.bodySmall }, content: { gap: 22 }, row: { flexDirection: 'row', gap: 12 }, copy: { flex: 1 }, heading: { color: colors.textPrimary, ...typography.title }, text: { color: colors.textSecondary, ...typography.bodySmall, marginTop: 4 }, note: { color: colors.textMuted, ...typography.caption, textAlign: 'center' },
});
