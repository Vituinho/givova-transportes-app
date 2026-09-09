import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '@/constants/theme';

export function Badge({ label, tone = 'orange' }: { label: string; tone?: 'orange' | 'success' | 'neutral' }) {
  const toneStyle = tone === 'success' ? styles.success : tone === 'neutral' ? styles.neutral : styles.orange;
  return <View style={[styles.badge, toneStyle]}><Text style={[styles.label, tone === 'success' && styles.successText]}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 5 },
  orange: { backgroundColor: colors.mutedOrange },
  success: { backgroundColor: colors.mutedSuccess },
  neutral: { backgroundColor: colors.background },
  label: { color: colors.brandOrangeDark, fontSize: 12, fontFamily: fonts.semibold },
  successText: { color: colors.success },
});
