import { Handshake } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { colors, fonts, typography } from '@/constants/theme';

export default function ClientsScreen() {
  const partners = ['Tokio Marine Seguradora', 'Buonny', 'DBFrete', 'TecnoRisk'];
  return <Screen><Header title="Clientes e parceiros" back /><Text style={styles.intro}>Clientes e fornecedores estratégicos são apresentados em grupos distintos.</Text><Card style={styles.client}><Text style={styles.eyebrow}>Cliente em destaque</Text><Text style={styles.name}>ORTOBOM</Text></Card><View style={styles.section}><View style={styles.heading}><Handshake size={21} color={colors.brandOrangeDark} /><Text style={styles.title}>Parceiros estratégicos</Text></View><View style={styles.partnerList}>{partners.map((partner, index) => <View key={partner} style={[styles.partner, index < partners.length - 1 && styles.partnerDivider]}><Text style={styles.partnerName}>{partner}</Text><Text style={styles.partnerType}>Parceiro estratégico</Text></View>)}</View></View><Text style={styles.note}>Os nomes permanecem em texto até que logotipos oficiais e autorizações de uso sejam fornecidos.</Text></Screen>;
}

const styles = StyleSheet.create({
  intro: { color: colors.textSecondary, ...typography.body }, client: { backgroundColor: colors.graphite, borderColor: colors.graphite, minHeight: 142, justifyContent: 'center' }, eyebrow: { color: '#CFCBC7', ...typography.caption, textTransform: 'uppercase', letterSpacing: 1 }, name: { color: colors.white, fontSize: 30, fontFamily: fonts.extraBold, letterSpacing: 1, marginTop: 8 }, section: { gap: 10 }, heading: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 2 }, title: { color: colors.textPrimary, ...typography.h2 }, partnerList: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border }, partner: { paddingVertical: 14 }, partnerDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border }, partnerName: { color: colors.textPrimary, ...typography.title }, partnerType: { color: colors.textMuted, ...typography.caption, marginTop: 3 }, note: { color: colors.textMuted, ...typography.caption, textAlign: 'center' },
});
