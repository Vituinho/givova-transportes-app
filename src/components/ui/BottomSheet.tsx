import type { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius } from '@/constants/theme';

type BottomSheetProps = PropsWithChildren<{ visible: boolean; onClose: () => void }>;

export function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  return <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}><View style={styles.overlay}><Pressable accessibilityLabel="Fechar painel" style={styles.dismiss} onPress={onClose} /><SafeAreaView edges={['bottom']} style={styles.sheet}><View style={styles.handle} />{children}</SafeAreaView></View></Modal>;
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.38)', justifyContent: 'flex-end' },
  dismiss: { flex: 1 },
  sheet: { backgroundColor: colors.white, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, padding: 22, paddingTop: 12, maxHeight: '85%' },
  handle: { width: 44, height: 4, backgroundColor: colors.border, borderRadius: 4, alignSelf: 'center', marginBottom: 18 },
});
