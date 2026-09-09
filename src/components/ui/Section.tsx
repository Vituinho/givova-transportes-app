import type { PropsWithChildren, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, typography } from '@/constants/theme';

type SectionProps = PropsWithChildren<{ title: string; eyebrow?: string; action?: ReactNode; description?: string }>;

export function Section({ title, eyebrow, action, description, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.headingRow}>
        <View style={styles.headingCopy}>
          {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
          <Text style={styles.title}>{title}</Text>
          {description ? <Text style={styles.description}>{description}</Text> : null}
        </View>
        {action}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 14 },
  headingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
  headingCopy: { flex: 1, gap: 4 },
  eyebrow: { color: colors.brandOrangeDark, fontFamily: fonts.bold, fontSize: 11, letterSpacing: 1.1, textTransform: 'uppercase' },
  title: { color: colors.textPrimary, ...typography.section },
  description: { color: colors.textSecondary, ...typography.small },
});
