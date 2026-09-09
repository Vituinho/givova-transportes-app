import { router } from 'expo-router';
import { ArrowRight, PackageOpen } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { services } from '@/constants/services';
import { colors, radius } from '@/constants/theme';

export default function ServicesScreen() {
  return <Screen><Header title="Serviços" subtitle="Soluções para diferentes operações" /><View style={styles.intro}><PackageOpen size={29} color={colors.brandOrange} /><Text style={styles.title}>Logística pensada para cada carga.</Text><Text style={styles.description}>Conheça as frentes de atuação e solicite uma cotação para receber uma avaliação adequada à sua operação.</Text></View><View style={styles.list}>{services.map(({ slug, title, shortDescription, icon: Icon }, index) => <Pressable key={slug} accessibilityRole="button" onPress={() => router.push(`/service/${slug}`)} style={({ pressed }) => [styles.item, index === 0 && styles.featured, pressed && styles.pressed]}><View style={[styles.icon, index === 0 && styles.iconFeatured]}><Icon size={25} color={index === 0 ? colors.white : colors.brandOrangeDark} /></View><View style={styles.copy}><Text style={[styles.itemTitle, index === 0 && styles.featuredText]}>{title}</Text><Text style={[styles.itemDescription, index === 0 && styles.featuredDescription]}>{shortDescription}</Text></View><ArrowRight size={20} color={index === 0 ? colors.white : colors.textSecondary} /></Pressable>)}</View></Screen>;
}

const styles = StyleSheet.create({
  intro: { gap: 9, paddingVertical: 8 }, title: { color: colors.textPrimary, fontSize: 27, lineHeight: 32, fontWeight: '900', maxWidth: 340 }, description: { color: colors.textSecondary, fontSize: 15, lineHeight: 22 }, list: { gap: 11 }, item: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: 17, minHeight: 112, flexDirection: 'row', alignItems: 'center', gap: 14 }, featured: { backgroundColor: colors.graphite, borderColor: colors.graphite, minHeight: 138 }, icon: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.mutedOrange, alignItems: 'center', justifyContent: 'center' }, iconFeatured: { backgroundColor: colors.brandOrange }, copy: { flex: 1, gap: 5 }, itemTitle: { color: colors.textPrimary, fontWeight: '800', fontSize: 17 }, itemDescription: { color: colors.textSecondary, fontSize: 13, lineHeight: 19 }, featuredText: { color: colors.white }, featuredDescription: { color: '#D4D4D4' }, pressed: { opacity: 0.75 },
});
