import { router, useLocalSearchParams } from 'expo-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { ErrorState } from '@/components/ui/States';
import { services } from '@/constants/services';
import { colors, fonts, typography } from '@/constants/theme';

export default function ServiceDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <Screen><Header title="Serviço" back /><ErrorState title="Serviço não encontrado" description="Esta solução não está disponível neste endereço." actionLabel="Ver serviços" onAction={() => router.replace('/(tabs)/services')} /></Screen>;
  const Icon = service.icon;
  return <Screen><Header title="Nossas soluções" back /><View style={styles.hero}><Icon size={28} color={colors.brandOrangeDark} /><Text style={styles.title}>{service.title}</Text><Text style={styles.description}>{service.shortDescription}</Text></View><View style={styles.content}><Text style={styles.heading}>Como a Givova pode ajudar</Text><Text style={styles.body}>{service.description}</Text><View style={styles.points}><View style={styles.point}><CheckCircle2 size={18} color={colors.success} /><Text style={styles.pointText}>Análise conforme a rota e o perfil da operação</Text></View><View style={styles.point}><CheckCircle2 size={18} color={colors.success} /><Text style={styles.pointText}>Atendimento comercial para alinhar os detalhes</Text></View></View></View><Button label="Solicitar cotação" onPress={() => router.push('/(tabs)/quote')} icon={<ArrowRight size={19} color={colors.white} />} /><Button label="Falar com atendimento" variant="outline" onPress={() => router.push('/contact')} /></Screen>;
}

const styles = StyleSheet.create({
  hero: { gap: 11, paddingTop: 6 }, title: { color: colors.textPrimary, ...typography.h1 }, description: { color: colors.textSecondary, ...typography.body }, content: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 20, gap: 12 }, heading: { color: colors.textPrimary, ...typography.h2 }, body: { color: colors.textSecondary, ...typography.body }, points: { gap: 12, marginTop: 6 }, point: { flexDirection: 'row', alignItems: 'center', gap: 10 }, pointText: { flex: 1, color: colors.textPrimary, fontFamily: fonts.medium, fontSize: 13, lineHeight: 19 },
});
