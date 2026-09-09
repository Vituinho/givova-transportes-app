import { forwardRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { colors, controls, radius } from '@/constants/theme';

type InputProps = TextInputProps & {
  label: string;
  error?: string;
  hint?: string;
};

export const Input = forwardRef<TextInput, InputProps>(function Input({ label, error, hint, multiline, style, ...props }, ref) {
  const [focused, setFocused] = useState(false);
  const filled = typeof props.value === 'string' && props.value.length > 0;
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={ref}
        accessibilityLabel={label}
        accessibilityHint={hint}
        placeholderTextColor={colors.textSecondary}
        multiline={multiline}
        {...props}
        onFocus={(event) => { setFocused(true); props.onFocus?.(event); }}
        onBlur={(event) => { setFocused(false); props.onBlur?.(event); }}
        style={[styles.input, filled && styles.inputFilled, focused && styles.inputFocused, props.editable === false && styles.inputDisabled, multiline && styles.multiline, error && styles.inputError, style]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: { gap: 7 },
  label: { color: colors.textPrimary, fontSize: 14, fontWeight: '600' },
  input: { minHeight: controls.inputHeight, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 15, backgroundColor: colors.white, color: colors.textPrimary, fontSize: 16 },
  inputFilled: { borderColor: colors.borderStrong },
  inputFocused: { borderColor: colors.brandOrange, borderWidth: 2, paddingHorizontal: 14 },
  inputDisabled: { backgroundColor: '#EFEBE7', color: colors.textMuted },
  multiline: { minHeight: 116, paddingTop: 14, textAlignVertical: 'top' },
  inputError: { borderColor: colors.error },
  error: { color: colors.error, fontSize: 13 },
  hint: { color: colors.textSecondary, fontSize: 13 },
});
