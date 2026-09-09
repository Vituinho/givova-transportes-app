import { Handshake, Star } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { colors, radius } from '@/constants/theme';

export default function ClientsScreen() {
  const partners = ['Tokio Marine Seguradora', 'Buonny', 'DBFrete', 'TecnoRisk'];
  return <Screen><Header title="Clientes e parceiros" back /><Text style={styles.intro}>Clientes e fornecedores estratégicos são apresentados em grupos distintos.</Text><Card style={styles.client}><View style={styles.star}><Star size={23} color={colors.white} /></View><Text style={styles.eyebrow}>Cliente em destaque</Text><Text style={styles.name}>ORTOBOM</Text></Card><View style={styles.section}><View style={styles.heading}><Handshake size={23} color={colors.brandOrange} /><Text style={styles.title}>Parceiros estratégicos</Text></View><View style={styles.partnerList}>{partners.map((partner, index) => <View key={partner} style={[styles.partner, index < partners.length - 1 && styles.partnerDivider]}><Text style={styles.partnerName}>{partner}</Text><Text style={styles.partnerType}>Parceiro estratégico</Text></View>)}</View></View><Text style={styles.note}>Os nomes permanecem em texto até que logotipos oficiais e autorizações de uso sejam fornecidos.</Text></Screen>;
}

const styles = StyleSheet.create({
  intro: { color: colors.textSecondary, fontSize: 15, lineHeight: 22 }, client: { backgroundColor: colors.graphite, borderColor: colors.graphite, minHeight: 166, justifyContent: 'center' }, star: { width: 44, height: 44, borderRadius: radius.md, backgroundColor: colors.brandOrange, alignItems: 'center', justifyContent: 'center', marginBottom: 17 }, eyebrow: { color: '#CFCFCF', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: '800' }, name: { color: colors.white, fontSize: 32, fontWeight: '900', letterSpacing: 1, marginTop: 6 }, section: { gap: 10 }, heading: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 2 }, title: { color: colors.textPrimary, fontSize: 21, fontWeight: '800' }, partnerList: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border }, partner: { paddingVertical: 14 }, partnerDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border }, partnerName: { color: colors.textPrimary, fontWeight: '800', fontSize: 15 }, partnerType: { color: colors.textSecondary, fontSize: 11, marginTop: 3 }, note: { color: colors.textSecondary, textAlign: 'center', fontSize: 11, lineHeight: 17 },
});
