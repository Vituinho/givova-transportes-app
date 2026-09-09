import { router } from 'expo-router';
import { ArrowRight, Building2, Headphones, MapPinned, MessageCircle, PackagePlus, Truck } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Input } from '@/components/ui/Input';
import { Screen } from '@/components/ui/Screen';
import { Section } from '@/components/ui/Section';
import { services } from '@/constants/services';
import { colors, iconSizes, radius, typography } from '@/constants/theme';

const quickActions = [
  { label: 'Serviços', icon: Truck, action: () => router.push('/(tabs)/services') },
  { label: 'WhatsApp', icon: MessageCircle, action: () => router.push('/contact') },
  { label: 'Contato', icon: Headphones, action: () => router.push('/contact') },
  { label: 'Sobre', icon: Building2, action: () => router.push('/about') },
];

export default function HomeScreen() {
  const [code, setCode] = useState('');
  const goToTracking = () => router.push({ pathname: '/(tabs)/track', params: code.trim() ? { code: code.trim() } : undefined });

  return (
    <Screen contentContainerStyle={styles.screen}>
      <Header brand notifications />
      <View style={styles.welcome}>
        <Text style={styles.greeting}>Olá!</Text>
        <Text style={styles.title}>Como podemos ajudar?</Text>
        <Text style={styles.intro}>Acompanhe uma carga ou peça uma cotação em poucos passos.</Text>
      </View>

      <View style={styles.primaryActions}>
        <View style={styles.trackingPanel}>
          <View style={styles.actionHeading}>
            <View style={styles.actionIcon}><MapPinned size={iconSizes.large} color={colors.brandOrangeDark} /></View>
            <View style={styles.flex}><Text style={styles.actionTitle}>Rastrear carga</Text><Text style={styles.actionText}>Consulte com o código da Givova.</Text></View>
          </View>
          <Input label="Código de rastreamento" value={code} onChangeText={setCode} autoCapitalize="characters" autoCorrect={false} returnKeyType="search" onSubmitEditing={goToTracking} placeholder="Digite o código" />
          <Button label="Rastrear agora" onPress={goToTracking} />
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Solicitar cotação" onPress={() => router.push('/(tabs)/quote')} style={({ pressed }) => [styles.quoteAction, pressed && styles.pressed]}>
          <View style={styles.quoteIcon}><PackagePlus size={iconSizes.large} color={colors.white} /></View>
          <View style={styles.flex}><Text style={styles.quoteTitle}>Solicitar cotação</Text><Text style={styles.quoteText}>Informe rota, carga e contato.</Text></View>
          <ArrowRight size={iconSizes.normal} color={colors.white} />
        </Pressable>
      </View>

      <Section title="Acesso rápido">
        <View style={styles.quickGrid}>{quickActions.map(({ label, icon: Icon, action }) => (
          <Pressable key={label} accessibilityRole="button" accessibilityLabel={label} onPress={action} style={({ pressed }) => [styles.quickAction, pressed && styles.pressed]}>
            <Icon size={iconSizes.normal} color={colors.brandOrangeDark} />
            <Text style={styles.quickLabel}>{label}</Text>
            <ArrowRight size={iconSizes.small} color={colors.textMuted} />
          </Pressable>
        ))}</View>
      </Section>

      <Section title="Soluções para sua operação" description="Conheça os serviços mais procurados.">
        <View style={styles.serviceList}>{services.slice(0, 3).map(({ slug, title, shortDescription, icon: Icon }, index) => (
          <Pressable key={slug} onPress={() => router.push(`/service/${slug}`)} style={({ pressed }) => [styles.serviceRow, index < 2 && styles.divider, pressed && styles.pressed]}>
            <Icon size={iconSizes.large} color={colors.brandOrangeDark} />
            <View style={styles.flex}><Text style={styles.serviceTitle}>{title}</Text><Text numberOfLines={1} style={styles.serviceText}>{shortDescription}</Text></View>
            <ArrowRight size={iconSizes.normal} color={colors.textMuted} />
          </Pressable>
        ))}</View>
        <Button label="Ver todos os serviços" variant="ghost" onPress={() => router.push('/(tabs)/services')} />
      </Section>

      <Pressable onPress={() => router.push('/clients')} style={({ pressed }) => [styles.institutional, pressed && styles.pressed]}>
        <View style={styles.flex}><Text style={styles.institutionalEyebrow}>Givova Transportes</Text><Text style={styles.institutionalTitle}>Relações construídas com confiança.</Text><Text style={styles.institutionalText}>Conheça clientes e parceiros estratégicos.</Text></View>
        <ArrowRight size={iconSizes.large} color={colors.white} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { gap: 24 },
  flex: { flex: 1 },
  welcome: { gap: 5 },
  greeting: { color: colors.brandOrangeDark, fontSize: 14, fontWeight: '800' },
  title: { color: colors.textPrimary, ...typography.heading },
  intro: { color: colors.textSecondary, ...typography.body, maxWidth: 340 },
  primaryActions: { gap: 12 },
  trackingPanel: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: 16, gap: 14 },
  actionHeading: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  actionIcon: { width: 44, height: 44, borderRadius: radius.md, backgroundColor: colors.mutedOrange, alignItems: 'center', justifyContent: 'center' },
  actionTitle: { color: colors.textPrimary, ...typography.card },
  actionText: { color: colors.textSecondary, ...typography.small },
  quoteAction: { minHeight: 78, backgroundColor: colors.brandOrange, borderRadius: radius.lg, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 13 },
  quoteIcon: { width: 42, height: 42, borderRadius: radius.md, backgroundColor: 'rgba(255,255,255,0.16)', alignItems: 'center', justifyContent: 'center' },
  quoteTitle: { color: colors.white, ...typography.card },
  quoteText: { color: 'rgba(255,255,255,0.86)', ...typography.small },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 18 },
  quickAction: { width: '47%', minHeight: 54, flexDirection: 'row', alignItems: 'center', gap: 9, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  quickLabel: { color: colors.textPrimary, fontSize: 14, fontWeight: '700', flex: 1 },
  serviceList: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
  serviceRow: { minHeight: 72, flexDirection: 'row', alignItems: 'center', gap: 13, paddingVertical: 10 },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  serviceTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: '700' },
  serviceText: { color: colors.textSecondary, ...typography.small, marginTop: 2 },
  institutional: { backgroundColor: colors.graphite, borderRadius: radius.lg, minHeight: 132, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 12 },
  institutionalEyebrow: { color: colors.brandOrange, fontSize: 11, lineHeight: 16, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' },
  institutionalTitle: { color: colors.white, fontSize: 19, lineHeight: 25, fontWeight: '800', marginTop: 5 },
  institutionalText: { color: '#D6D3D0', ...typography.small, marginTop: 3 },
  pressed: { opacity: 0.72 },
});
