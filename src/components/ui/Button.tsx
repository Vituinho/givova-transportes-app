import { ActivityIndicator, Pressable, StyleSheet, Text, type PressableProps } from 'react-native';
import type { ReactNode } from 'react';

import { colors, controls, radius } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

type ButtonProps = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  inverted?: boolean;
};

export function Button({ label, variant = 'primary', loading, icon, fullWidth = true, inverted, disabled, style, ...props }: ButtonProps) {
  const isDisabled = disabled || loading;
  const foreground = inverted || variant === 'primary' || variant === 'danger' ? colors.white : variant === 'secondary' ? colors.brandOrangeDark : colors.textPrimary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={props.accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      android_ripple={!isDisabled ? { color: 'rgba(255,255,255,0.18)' } : undefined}
      style={(state) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        state.pressed && !isDisabled && styles.pressed,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}
    >
      {loading ? <ActivityIndicator color={foreground} /> : icon}
      <Text style={[styles.label, { color: isDisabled ? colors.textMuted : foreground }]}>{loading ? 'Aguarde…' : label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: controls.buttonHeight, borderRadius: radius.md, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, overflow: 'hidden' },
  fullWidth: { width: '100%' },
  primary: { backgroundColor: colors.brandOrange },
  secondary: { backgroundColor: colors.mutedOrange },
  outline: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: colors.error },
  label: { fontSize: 15, fontWeight: '700', letterSpacing: 0.2 },
  disabled: { backgroundColor: '#EFEBE7', borderColor: colors.border },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
});
