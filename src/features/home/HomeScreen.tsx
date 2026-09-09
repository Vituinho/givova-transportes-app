import { router } from 'expo-router';
import { ArrowRight, Headphones, MapPinned, MessageCircle, PackagePlus, Truck } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Input } from '@/components/ui/Input';
import { Screen } from '@/components/ui/Screen';
import { Section } from '@/components/ui/Section';
import { services } from '@/constants/services';
import { colors, radius } from '@/constants/theme';

const quickActions = [
  { label: 'Cotação', icon: PackagePlus, action: () => router.push('/(tabs)/quote') },
  { label: 'Rastrear', icon: MapPinned, action: () => router.push('/(tabs)/track') },
  { label: 'Atendimento', icon: MessageCircle, action: () => router.push('/contact') },
  { label: 'Serviços', icon: Truck, action: () => router.push('/(tabs)/services') },
];

export default function HomeScreen() {
  const [code, setCode] = useState('');
  const goToTracking = () => router.push({ pathname: '/(tabs)/track', params: code.trim() ? { code: code.trim() } : undefined });

  return (
    <Screen>
      <Header title="Olá!" subtitle="Como podemos ajudar hoje?" notifications />
      <View style={styles.hero}>
        <View style={styles.heroMark} />
        <BrandLogo inverse />
        <View style={styles.heroCopy}><Text style={styles.heroTitle}>Transporte que acompanha o ritmo do seu negócio.</Text><Text style={styles.heroText}>Cotação, atendimento e acompanhamento de carga no seu celular.</Text></View>
        <View style={styles.heroActions}><Button label="Solicitar cotação" variant="outline" onPress={() => router.push('/(tabs)/quote')} /><Button label="Rastrear carga" variant="ghost" onPress={() => router.push('/(tabs)/track')} icon={<MapPinned size={19} color={colors.white} />} /></View>
      </View>
      <Section title="Acesso rápido"><View style={styles.quickGrid}>{quickActions.map(({ label, icon: Icon, action }) => <Pressable key={label} accessibilityRole="button" accessibilityLabel={label} onPress={action} style={({ pressed }) => [styles.quickAction, pressed && styles.pressed]}><View style={styles.quickIcon}><Icon size={22} color={colors.brandOrangeDark} /></View><Text style={styles.quickLabel}>{label}</Text></Pressable>)}</View></Section>
      <Card style={styles.trackingCard}>
        <View style={styles.trackingHeading}><View style={styles.trackBadge}><MapPinned size={22} color={colors.white} /></View><View style={styles.flex}><Text style={styles.cardTitle}>Rastreie sua carga</Text><Text style={styles.cardText}>Consulte usando o código recebido da Givova.</Text></View></View>
        <Input label="Código de rastreamento" value={code} onChangeText={setCode} autoCapitalize="characters" returnKeyType="search" onSubmitEditing={goToTracking} placeholder="Digite o código" />
        <Button label="Rastrear" onPress={goToTracking} />
      </Card>
      <Section title="Soluções para sua operação" eyebrow="Logística sob medida" description="Escolha o modal e o formato mais adequados à sua necessidade.">
        <Pressable onPress={() => router.push(`/service/${services[0].slug}`)} style={styles.featuredService}><Truck size={34} color={colors.white} /><View style={styles.flex}><Text style={styles.featuredTitle}>{services[0].title}</Text><Text style={styles.featuredText}>{services[0].shortDescription}</Text></View><ArrowRight size={21} color={colors.white} /></Pressable>
        <View style={styles.serviceList}>{services.slice(1).map(({ slug, title, icon: Icon }) => <Pressable key={slug} onPress={() => router.push(`/service/${slug}`)} style={({ pressed }) => [styles.serviceRow, pressed && styles.pressed]}><View style={styles.serviceIcon}><Icon size={20} color={colors.brandOrangeDark} /></View><Text style={styles.serviceTitle}>{title}</Text><ArrowRight size={18} color={colors.textSecondary} /></Pressable>)}</View>
      </Section>
      <Section title="Relações que movem confiança" eyebrow="Clientes e parceiros"><Card><Text style={styles.partnerLabel}>Cliente em destaque</Text><Text style={styles.ortobom}>ORTOBOM</Text><View style={styles.divider} /><Text style={styles.partnerLabel}>Parceiros estratégicos</Text><Text style={styles.partners}>Tokio Marine Seguradora  ·  Buonny  ·  DBFrete  ·  TecnoRisk</Text><Pressable onPress={() => router.push('/clients')} style={styles.inlineLink}><Text style={styles.inlineLinkText}>Conhecer relações institucionais</Text><ArrowRight size={17} color={colors.brandOrangeDark} /></Pressable></Card></Section>
      <Card style={styles.helpCard}><Headphones size={28} color={colors.brandOrange} /><View style={styles.flex}><Text style={styles.cardTitle}>Precisa falar com a equipe?</Text><Text style={styles.cardText}>Acesse os canais oficiais configurados no aplicativo.</Text></View><Pressable accessibilityLabel="Abrir contato" onPress={() => router.push('/contact')}><ArrowRight size={22} color={colors.brandOrangeDark} /></Pressable></Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 }, hero: { backgroundColor: colors.brandOrange, borderRadius: radius.lg, padding: 22, gap: 22, overflow: 'hidden' }, heroMark: { position: 'absolute', width: 190, height: 190, borderRadius: 95, backgroundColor: 'rgba(255,255,255,0.10)', right: -55, top: -70 }, heroCopy: { gap: 8 }, heroTitle: { color: colors.white, fontSize: 29, lineHeight: 34, fontWeight: '900', letterSpacing: -0.8, maxWidth: 340 }, heroText: { color: 'rgba(255,255,255,0.88)', fontSize: 15, lineHeight: 22, maxWidth: 320 }, heroActions: { gap: 8 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, quickAction: { width: '48%', minHeight: 94, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 14, justifyContent: 'space-between' }, quickIcon: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.mutedOrange }, quickLabel: { color: colors.textPrimary, fontWeight: '700', fontSize: 14 }, pressed: { opacity: 0.7 },
  trackingCard: { gap: 16, borderColor: '#F7C8AB' }, trackingHeading: { flexDirection: 'row', gap: 12, alignItems: 'center' }, trackBadge: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.brandOrange, alignItems: 'center', justifyContent: 'center' }, cardTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: '800' }, cardText: { color: colors.textSecondary, fontSize: 13, lineHeight: 18, marginTop: 3 },
  featuredService: { backgroundColor: colors.graphite, borderRadius: radius.lg, padding: 20, minHeight: 132, flexDirection: 'row', alignItems: 'flex-end', gap: 14 }, featuredTitle: { color: colors.white, fontSize: 20, fontWeight: '800', marginBottom: 4 }, featuredText: { color: '#D5D5D5', fontSize: 13, lineHeight: 18 }, serviceList: { backgroundColor: colors.white, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' }, serviceRow: { minHeight: 64, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border }, serviceIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.mutedOrange, alignItems: 'center', justifyContent: 'center' }, serviceTitle: { flex: 1, color: colors.textPrimary, fontWeight: '700', fontSize: 14 },
  partnerLabel: { color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1, fontSize: 11, fontWeight: '800' }, ortobom: { fontSize: 25, fontWeight: '900', color: colors.textPrimary, marginTop: 7, letterSpacing: 0.5 }, divider: { height: 1, backgroundColor: colors.border, marginVertical: 18 }, partners: { color: colors.textPrimary, fontSize: 14, lineHeight: 23, marginTop: 8 }, inlineLink: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 }, inlineLinkText: { color: colors.brandOrangeDark, fontWeight: '700', fontSize: 13 }, helpCard: { flexDirection: 'row', alignItems: 'center', gap: 13 },
});
