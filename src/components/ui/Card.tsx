import { StyleSheet, View, type ViewProps } from 'react-native';

import { colors, radius, shadow } from '@/constants/theme';

type CardProps = ViewProps & { elevated?: boolean };

export function Card({ elevated, style, ...props }: CardProps) {
  return <View style={[styles.base, elevated && styles.elevated, style]} {...props} />;
}

const styles = StyleSheet.create({
  base: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: 18 },
  elevated: shadow,
});
