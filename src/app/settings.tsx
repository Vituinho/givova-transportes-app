import { BellRing, LockKeyhole } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { colors } from '@/constants/theme';
import { registerForPushNotificationsAsync } from '@/services/notifications';

export default function SettingsScreen() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const enable = async () => { setLoading(true); setStatus(''); try { await registerForPushNotificationsAsync(); setStatus('Notificações ativadas neste dispositivo.'); } catch (error) { setStatus(error instanceof Error ? error.message : 'Não foi possível ativar as notificações.'); } finally { setLoading(false); } };
  return <Screen><Header title="Configurações" back /><Card style={styles.card}><View style={styles.icon}><BellRing size={25} color={colors.brandOrangeDark} /></View><Text style={styles.title}>Atualizações de cargas</Text><Text style={styles.text}>A infraestrutura está pronta para receber notificações reais quando o backend oficial estiver integrado. A permissão só é solicitada ao tocar no botão.</Text><Button label="Ativar notificações" onPress={enable} loading={loading} />{status ? <Text accessibilityRole="alert" style={styles.status}>{status}</Text> : null}</Card><View style={styles.security}><LockKeyhole size={20} color={colors.success} /><View style={styles.securityCopy}><Text style={styles.securityTitle}>Armazenamento protegido</Text><Text style={styles.securityText}>Tokens futuros de autenticação e o token push ficam no SecureStore do sistema, nunca em armazenamento aberto.</Text></View></View></Screen>;
}

const styles = StyleSheet.create({
  card: { gap: 13 }, icon: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.mutedOrange, alignItems: 'center', justifyContent: 'center' }, title: { color: colors.textPrimary, fontSize: 20, fontWeight: '800' }, text: { color: colors.textSecondary, fontSize: 14, lineHeight: 21 }, status: { color: colors.textSecondary, textAlign: 'center', fontSize: 12 }, security: { flexDirection: 'row', gap: 12, backgroundColor: colors.mutedSuccess, padding: 16, borderRadius: 14 }, securityCopy: { flex: 1 }, securityTitle: { color: colors.success, fontWeight: '800', fontSize: 14 }, securityText: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 3 },
});
