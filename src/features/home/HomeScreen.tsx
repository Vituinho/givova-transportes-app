import { router } from 'expo-router';
import { ChevronRight, Headphones, PackagePlus } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TrackingSearch } from '@/components/TrackingSearch';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { colors, fonts, typography } from '@/constants/theme';

const actions = [
  { title: 'Solicitar cotação', description: 'Informe rota, carga e contato.', icon: PackagePlus, route: '/(tabs)/quote' as const },
  { title: 'Falar com atendimento', description: 'Acesse os canais oficiais da Givova.', icon: Headphones, route: '/contact' as const },
];

export default function HomeScreen() {
  const [code, setCode] = useState('');
  const track = () => router.push({ pathname: '/(tabs)/track', params: code.trim() ? { code: code.trim() } : undefined });

  return (
    <Screen contentContainerStyle={styles.screen}>
      <Header brand notifications />
      <View style={styles.intro}>
        <Text style={styles.title}>Sua operação em movimento.</Text>
        <Text style={styles.subtitle}>Rastreie cargas e solicite cotações com agilidade.</Text>
      </View>

      <View style={styles.tracking}>
        <Text style={styles.eyebrow}>Rastreamento</Text>
        <Text style={styles.trackingTitle}>Onde está sua carga?</Text>
        <TrackingSearch code={code} onChangeCode={setCode} onSubmit={track} />
      </View>

      <View style={styles.actionList}>
        {actions.map(({ title, description, icon: Icon, route }, index) => (
          <Pressable key={title} accessibilityRole="button" onPress={() => router.push(route)} style={({ pressed }) => [styles.action, index === 0 && styles.actionDivider, pressed && styles.pressed]}>
            <Icon size={22} color={colors.brandOrangeDark} strokeWidth={2} />
            <View style={styles.actionCopy}><Text style={styles.actionTitle}>{title}</Text><Text style={styles.actionDescription}>{description}</Text></View>
            <ChevronRight size={20} color={colors.textMuted} />
          </Pressable>
        ))}
      </View>

      <View style={styles.note}>
        <View style={styles.noteRule} />
        <Text style={styles.noteText}>Informações operacionais são exibidas somente quando recebidas dos sistemas oficiais.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { gap: 30 },
  intro: { gap: 8, paddingTop: 6 },
  title: { color: colors.textPrimary, ...typography.display, maxWidth: 330 },
  subtitle: { color: colors.textSecondary, ...typography.body, maxWidth: 330 },
  tracking: { backgroundColor: colors.backgroundSecondary, borderRadius: 12, padding: 18, gap: 14 },
  eyebrow: { color: colors.brandOrangeDark, fontFamily: fonts.bold, fontSize: 11, lineHeight: 16, letterSpacing: 1, textTransform: 'uppercase' },
  trackingTitle: { color: colors.textPrimary, ...typography.h2, marginBottom: -2 },
  actionList: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
  action: { minHeight: 82, flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  actionDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  actionCopy: { flex: 1, gap: 3 },
  actionTitle: { color: colors.textPrimary, ...typography.title },
  actionDescription: { color: colors.textSecondary, ...typography.bodySmall },
  note: { flexDirection: 'row', gap: 12, paddingHorizontal: 2 },
  noteRule: { width: 2, backgroundColor: colors.brandOrange },
  noteText: { color: colors.textMuted, ...typography.bodySmall, flex: 1 },
  pressed: { opacity: 0.58 },
});
