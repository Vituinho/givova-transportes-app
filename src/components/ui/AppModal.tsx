import type { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { colors, radius } from '@/constants/theme';

type AppModalProps = PropsWithChildren<{ visible: boolean; onClose: () => void }>;

export function AppModal({ visible, onClose, children }: AppModalProps) {
  return <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}><View style={styles.overlay}><Pressable accessibilityLabel="Fechar modal" style={StyleSheet.absoluteFill} onPress={onClose} /><View style={styles.content}>{children}</View></View></Modal>;
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.42)', justifyContent: 'center', padding: 24 },
  content: { backgroundColor: colors.white, borderRadius: radius.lg, padding: 22, maxWidth: 520, width: '100%', alignSelf: 'center' },
});
