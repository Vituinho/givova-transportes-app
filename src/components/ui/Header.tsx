import { Bell, ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandLogo } from '@/components/BrandLogo';
import { colors, radius } from '@/constants/theme';

type HeaderProps = { title?: string; subtitle?: string; back?: boolean; notifications?: boolean };

export function Header({ title, subtitle, back, notifications }: HeaderProps) {
  return (
    <View style={styles.row}>
      {back ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={() => router.back()} style={styles.iconButton}>
          <ChevronLeft size={23} color={colors.textPrimary} />
        </Pressable>
      ) : <BrandLogo />}
      <View style={styles.copy}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {notifications ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Notificações" onPress={() => router.push('/settings')} style={styles.iconButton}>
          <Bell size={21} color={colors.textPrimary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 12 },
  copy: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 19, fontWeight: '800' },
  subtitle: { color: colors.textSecondary, fontSize: 13, marginTop: 2 },
  iconButton: { width: 44, height: 44, borderRadius: radius.full, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
});
