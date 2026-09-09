import { router } from 'expo-router';
import { ArrowRight, PackageOpen } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { services } from '@/constants/services';
import { colors, iconSizes, radius, typography } from '@/constants/theme';

export default function ServicesScreen() {
  const [featured, ...remaining] = services;
  const FeaturedIcon = featured.icon;
  return (
    <Screen>
      <Header title="Serviços" subtitle="Soluções para diferentes operações" />
      <View style={styles.intro}><PackageOpen size={iconSizes.large} color={colors.brandOrangeDark} /><Text style={styles.title}>Logística pensada para cada carga.</Text><Text style={styles.description}>Escolha uma solução para entender como ela pode atender à sua operação.</Text></View>
      <Pressable accessibilityRole="button" onPress={() => router.push(`/service/${featured.slug}`)} style={({ pressed }) => [styles.featured, pressed && styles.pressed]}>
        <View style={styles.featuredIcon}><FeaturedIcon size={iconSizes.hero} color={colors.white} /></View>
        <View style={styles.flex}><Text style={styles.featuredLabel}>Solução em destaque</Text><Text style={styles.featuredTitle}>{featured.title}</Text><Text style={styles.featuredText}>{featured.shortDescription}</Text></View>
        <ArrowRight size={iconSizes.large} color={colors.white} />
      </Pressable>
      <View style={styles.list}>{remaining.map(({ slug, title, shortDescription, icon: Icon }, index) => (
        <Pressable key={slug} accessibilityRole="button" onPress={() => router.push(`/service/${slug}`)} style={({ pressed }) => [styles.item, index < remaining.length - 1 && styles.divider, pressed && styles.pressed]}>
          <Icon size={iconSizes.large} color={colors.brandOrangeDark} />
          <View style={styles.flex}><Text style={styles.itemTitle}>{title}</Text><Text style={styles.itemDescription}>{shortDescription}</Text></View>
          <ArrowRight size={iconSizes.normal} color={colors.textMuted} />
        </Pressable>
      ))}</View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  intro: { gap: 8 },
  title: { color: colors.textPrimary, ...typography.heading },
  description: { color: colors.textSecondary, ...typography.body },
  featured: { backgroundColor: colors.graphite, borderRadius: radius.lg, padding: 20, minHeight: 150, flexDirection: 'row', alignItems: 'center', gap: 14 },
  featuredIcon: { width: 54, height: 54, borderRadius: radius.md, backgroundColor: colors.brandOrange, alignItems: 'center', justifyContent: 'center' },
  featuredLabel: { color: colors.brandOrange, fontSize: 11, lineHeight: 16, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  featuredTitle: { color: colors.white, fontSize: 20, lineHeight: 25, fontWeight: '800', marginTop: 5 },
  featuredText: { color: '#D6D3D0', ...typography.small, marginTop: 4 },
  list: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
  item: { minHeight: 88, flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 13 },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  itemTitle: { color: colors.textPrimary, ...typography.card },
  itemDescription: { color: colors.textSecondary, ...typography.small, marginTop: 3 },
  pressed: { opacity: 0.72 },
});
