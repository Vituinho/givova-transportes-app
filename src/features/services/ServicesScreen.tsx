import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { services } from '@/constants/services';
import { colors, fonts, typography } from '@/constants/theme';

export default function ServicesScreen() {
  const transportServices = services.filter((service) => service.slug !== 'rastreamento');
  return (
    <Screen>
      <Header title="Nossas soluções" back />
      <View style={styles.intro}><Text style={styles.title}>Transporte para diferentes operações.</Text><Text style={styles.description}>Conheça as soluções e solicite uma avaliação para a sua carga.</Text></View>
      <View style={styles.list}>{transportServices.map(({ slug, title, shortDescription }, index) => (
        <Pressable key={slug} accessibilityRole="button" onPress={() => router.push(`/service/${slug}`)} style={({ pressed }) => [styles.item, index < transportServices.length - 1 && styles.divider, pressed && styles.pressed]}>
          <View style={styles.number}><Text style={styles.numberText}>{String(index + 1).padStart(2, '0')}</Text></View>
          <View style={styles.copy}><Text style={styles.itemTitle}>{title}</Text><Text style={styles.itemDescription}>{shortDescription}</Text></View>
          <ArrowRight size={19} color={colors.textMuted} />
        </Pressable>
      ))}</View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { gap: 7 },
  title: { color: colors.textPrimary, ...typography.h1 },
  description: { color: colors.textSecondary, ...typography.body },
  list: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
  item: { minHeight: 96, flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 15 },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  number: { width: 28, alignSelf: 'stretch', paddingTop: 2 },
  numberText: { color: colors.brandOrangeDark, fontFamily: fonts.bold, fontSize: 11, letterSpacing: 0.8 },
  copy: { flex: 1, gap: 4 },
  itemTitle: { color: colors.textPrimary, ...typography.title },
  itemDescription: { color: colors.textSecondary, ...typography.bodySmall },
  pressed: { opacity: 0.55 },
});
