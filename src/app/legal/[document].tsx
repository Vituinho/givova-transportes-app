import { useLocalSearchParams } from 'expo-router';
import { FileWarning } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { colors } from '@/constants/theme';

export default function LegalScreen() {
  const { document } = useLocalSearchParams<{ document: string }>();
  const privacy = document === 'privacy';
  const title = privacy ? 'Política de Privacidade' : 'Termos de Uso';
  return <Screen><Header title={title} back /><Card style={styles.warning}><View style={styles.icon}><FileWarning size={25} color={colors.warning} /></View><View style={styles.copy}><Text style={styles.warningTitle}>Documento jurídico pendente</Text><Text style={styles.warningText}>Esta tela está pronta para receber a versão oficial aprovada pela Givova. Nenhum texto jurídico genérico será apresentado como definitivo.</Text></View></Card><View style={styles.content}><Text style={styles.heading}>Antes da publicação</Text><Text style={styles.paragraph}>{privacy ? 'A política deverá explicar quais dados são coletados na cotação, rastreamento, atendimento e notificações; finalidade, base legal, retenção, compartilhamento e direitos do titular conforme a LGPD.' : 'Os termos deverão definir condições de uso, responsabilidades, disponibilidade dos serviços digitais, propriedade intelectual e canais oficiais de contato.'}</Text><Text style={styles.paragraph}>A versão aprovada deve informar data de vigência, responsável pelo tratamento e canal para solicitações.</Text></View></Screen>;
}

const styles = StyleSheet.create({
  warning: { backgroundColor: '#FFF8E7', borderColor: '#F0D08A', flexDirection: 'row', gap: 12 }, icon: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFE9B1', alignItems: 'center', justifyContent: 'center' }, copy: { flex: 1 }, warningTitle: { color: colors.warning, fontSize: 15, fontWeight: '800' }, warningText: { color: colors.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 4 }, content: { gap: 12 }, heading: { color: colors.textPrimary, fontSize: 21, fontWeight: '800' }, paragraph: { color: colors.textSecondary, fontSize: 15, lineHeight: 23 },
});
