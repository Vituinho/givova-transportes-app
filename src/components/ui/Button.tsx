import { ActivityIndicator, Pressable, StyleSheet, Text, type PressableProps } from 'react-native';
import type { ReactNode } from 'react';

import { colors, radius } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

type ButtonProps = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
};

export function Button({ label, variant = 'primary', loading, icon, fullWidth = true, disabled, style, ...props }: ButtonProps) {
  const isDisabled = disabled || loading;
  const foreground = variant === 'primary' ? colors.white : variant === 'secondary' ? colors.brandOrangeDark : colors.textPrimary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={props.accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
      {...props}
    >
      {loading ? <ActivityIndicator color={foreground} /> : icon}
      <Text style={[styles.label, { color: foreground }]}>{loading ? 'Aguarde…' : label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: 52, borderRadius: radius.md, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  fullWidth: { width: '100%' },
  primary: { backgroundColor: colors.brandOrange },
  secondary: { backgroundColor: colors.mutedOrange },
  outline: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
  ghost: { backgroundColor: 'transparent' },
  label: { fontSize: 15, fontWeight: '700', letterSpacing: 0.2 },
  disabled: { opacity: 0.48 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
});
