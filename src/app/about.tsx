import { Cpu, ShieldCheck, Truck, Warehouse } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { colors, radius } from '@/constants/theme';

const topics = [
  { title: 'Atuação', text: 'Soluções de transporte alinhadas à rota, ao prazo e ao perfil de cada carga.', icon: Truck },
  { title: 'Estrutura', text: 'Operação organizada para conectar clientes, equipe e parceiros logísticos.', icon: Warehouse },
  { title: 'Segurança', text: 'Processos orientados ao cuidado com a carga e às exigências aplicáveis.', icon: ShieldCheck },
  { title: 'Tecnologia', text: 'Evolução digital para aproximar informações e atendimento do cliente.', icon: Cpu },
];

export default function AboutScreen() {
  return <Screen><Header title="Sobre a Givova" back /><View style={styles.hero}><Text style={styles.eyebrow}>Givova Transportes</Text><Text style={styles.title}>Logística com proximidade e responsabilidade.</Text><Text style={styles.description}>Uma apresentação objetiva da empresa, preparada para receber conteúdo institucional validado pela Givova.</Text></View><View style={styles.grid}>{topics.map(({ title, text, icon: Icon }) => <View key={title} style={styles.item}><View style={styles.icon}><Icon size={23} color={colors.brandOrangeDark} /></View><Text style={styles.itemTitle}>{title}</Text><Text style={styles.itemText}>{text}</Text></View>)}</View><Text style={styles.disclaimer}>Antes da publicação, este conteúdo deve ser revisado pela equipe institucional para incluir apenas informações verificadas.</Text></Screen>;
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.graphite, borderRadius: radius.lg, padding: 23, gap: 11 }, eyebrow: { color: colors.brandOrange, textTransform: 'uppercase', fontWeight: '800', letterSpacing: 1.2, fontSize: 12 }, title: { color: colors.white, fontSize: 29, lineHeight: 35, fontWeight: '900' }, description: { color: '#D6D6D6', fontSize: 14, lineHeight: 21 }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, item: { width: '48%', minHeight: 174, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: 16, gap: 8 }, icon: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.mutedOrange, alignItems: 'center', justifyContent: 'center' }, itemTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '800' }, itemText: { color: colors.textSecondary, fontSize: 12, lineHeight: 18 }, disclaimer: { color: colors.textSecondary, fontSize: 11, lineHeight: 17, textAlign: 'center' },
});
