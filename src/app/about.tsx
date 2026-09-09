import { Cpu, ShieldCheck, Truck, Warehouse } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { colors, fonts, radius, typography } from '@/constants/theme';

const topics = [
  { title: 'Atuação', text: 'Soluções de transporte alinhadas à rota, ao prazo e ao perfil de cada carga.', icon: Truck },
  { title: 'Estrutura', text: 'Operação organizada para conectar clientes, equipe e parceiros logísticos.', icon: Warehouse },
  { title: 'Segurança', text: 'Processos orientados ao cuidado com a carga e às exigências aplicáveis.', icon: ShieldCheck },
  { title: 'Tecnologia', text: 'Evolução digital para aproximar informações e atendimento do cliente.', icon: Cpu },
];

export default function AboutScreen() {
  return <Screen><Header title="Sobre a Givova" back /><View style={styles.hero}><Text style={styles.eyebrow}>Givova Transportes</Text><Text style={styles.title}>Logística com proximidade e responsabilidade.</Text><Text style={styles.description}>Uma apresentação objetiva da empresa, preparada para receber conteúdo institucional validado pela Givova.</Text></View><View style={styles.list}>{topics.map(({ title, text, icon: Icon }, index) => <View key={title} style={[styles.item, index < topics.length - 1 && styles.divider]}><Icon size={21} color={colors.brandOrangeDark} /><View style={styles.copy}><Text style={styles.itemTitle}>{title}</Text><Text style={styles.itemText}>{text}</Text></View></View>)}</View><Text style={styles.disclaimer}>Antes da publicação, este conteúdo deve ser revisado pela equipe institucional para incluir apenas informações verificadas.</Text></Screen>;
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.graphite, borderRadius: radius.lg, padding: 22, gap: 11 }, eyebrow: { color: colors.brandOrange, textTransform: 'uppercase', fontFamily: fonts.bold, letterSpacing: 1.1, fontSize: 11 }, title: { color: colors.white, ...typography.h1 }, description: { color: '#D6D3D0', ...typography.bodySmall }, list: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border }, item: { minHeight: 88, flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 14 }, divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border }, copy: { flex: 1 }, itemTitle: { color: colors.textPrimary, ...typography.title }, itemText: { color: colors.textSecondary, ...typography.bodySmall, marginTop: 3 }, disclaimer: { color: colors.textMuted, ...typography.caption, textAlign: 'center' },
});
