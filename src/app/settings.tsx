import { BellRing, LockKeyhole } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { colors, typography } from '@/constants/theme';
import { registerForPushNotificationsAsync } from '@/services/notifications';

export default function SettingsScreen() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const enable = async () => { setLoading(true); setStatus(''); try { await registerForPushNotificationsAsync(); setStatus('Notificações ativadas neste dispositivo.'); } catch (error) { setStatus(error instanceof Error ? error.message : 'Não foi possível ativar as notificações.'); } finally { setLoading(false); } };
  return <Screen><Header title="Configurações" back /><View style={styles.card}><BellRing size={24} color={colors.brandOrangeDark} /><Text style={styles.title}>Atualizações de cargas</Text><Text style={styles.text}>Ative as notificações para receber atualizações quando a integração oficial estiver disponível. A permissão só é solicitada ao tocar no botão.</Text><Button label="Ativar notificações" onPress={enable} loading={loading} />{status ? <Text accessibilityRole="alert" style={styles.status}>{status}</Text> : null}</View><View style={styles.security}><LockKeyhole size={20} color={colors.success} /><View style={styles.securityCopy}><Text style={styles.securityTitle}>Armazenamento protegido</Text><Text style={styles.securityText}>Tokens de autenticação e notificações ficam no armazenamento seguro do sistema.</Text></View></View></Screen>;
}

const styles = StyleSheet.create({
  card: { gap: 13 }, title: { color: colors.textPrimary, ...typography.h2 }, text: { color: colors.textSecondary, ...typography.body }, status: { color: colors.textSecondary, ...typography.bodySmall, textAlign: 'center' }, security: { flexDirection: 'row', gap: 12, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 18 }, securityCopy: { flex: 1 }, securityTitle: { color: colors.success, ...typography.title }, securityText: { color: colors.textSecondary, ...typography.bodySmall, marginTop: 3 },
});
