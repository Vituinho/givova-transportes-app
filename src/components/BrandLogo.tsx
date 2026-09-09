import { StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '@/constants/theme';

export function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <View accessibilityRole="image" accessibilityLabel="Givova Transportes" style={styles.row}>
      <View style={[styles.mark, inverse && styles.markInverse]}><Text style={[styles.g, inverse && styles.gInverse]}>G</Text></View>
      <View><Text style={[styles.name, inverse && styles.inverse]}>GIVOVA</Text><Text style={[styles.transport, inverse && styles.inverse]}>TRANSPORTES</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mark: { width: 38, height: 38, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brandOrange },
  markInverse: { backgroundColor: colors.white },
  g: { color: colors.white, fontWeight: '900', fontSize: 22 },
  gInverse: { color: colors.brandOrange },
  name: { color: colors.textPrimary, fontSize: 17, fontWeight: '900', letterSpacing: 1.1 },
  transport: { color: colors.textSecondary, fontSize: 8, fontWeight: '800', letterSpacing: 2 },
  inverse: { color: colors.white },
});
