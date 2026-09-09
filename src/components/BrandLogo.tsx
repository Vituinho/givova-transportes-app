import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius } from '@/constants/theme';

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
  g: { color: colors.white, fontFamily: fonts.extraBold, fontSize: 21 },
  gInverse: { color: colors.brandOrange },
  name: { color: colors.textPrimary, fontSize: 16, fontFamily: fonts.extraBold, letterSpacing: 1.2 },
  transport: { color: colors.textSecondary, fontSize: 8, fontFamily: fonts.bold, letterSpacing: 1.8 },
  inverse: { color: colors.white },
});
