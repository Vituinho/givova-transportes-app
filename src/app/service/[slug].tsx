import { router, useLocalSearchParams } from 'expo-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { ErrorState } from '@/components/ui/States';
import { services } from '@/constants/services';
import { colors, radius } from '@/constants/theme';

export default function ServiceDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <Screen><Header title="Serviço" back /><ErrorState title="Serviço não encontrado" description="Esta solução não está disponível neste endereço." actionLabel="Ver serviços" onAction={() => router.replace('/(tabs)/services')} /></Screen>;
  const Icon = service.icon;
  return <Screen><Header title="Serviço" back /><View style={styles.hero}><View style={styles.icon}><Icon size={38} color={colors.white} /></View><Text style={styles.title}>{service.title}</Text><Text style={styles.description}>{service.shortDescription}</Text></View><Card style={styles.content}><Text style={styles.heading}>Como a Givova pode ajudar</Text><Text style={styles.body}>{service.description}</Text><View style={styles.point}><CheckCircle2 size={19} color={colors.success} /><Text style={styles.pointText}>Análise conforme a rota e o perfil da operação</Text></View><View style={styles.point}><CheckCircle2 size={19} color={colors.success} /><Text style={styles.pointText}>Atendimento comercial para alinhar os detalhes</Text></View></Card><Button label="Solicitar cotação" onPress={() => router.push('/(tabs)/quote')} icon={<ArrowRight size={19} color={colors.white} />} /><Button label="Falar com a Givova" variant="outline" onPress={() => router.push('/contact')} /></Screen>;
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.graphite, borderRadius: radius.lg, padding: 23, gap: 13 }, icon: { width: 66, height: 66, borderRadius: 33, backgroundColor: colors.brandOrange, alignItems: 'center', justifyContent: 'center' }, title: { color: colors.white, fontSize: 29, lineHeight: 34, fontWeight: '900' }, description: { color: '#D6D6D6', fontSize: 15, lineHeight: 22 }, content: { gap: 15 }, heading: { color: colors.textPrimary, fontSize: 20, fontWeight: '800' }, body: { color: colors.textSecondary, fontSize: 15, lineHeight: 23 }, point: { flexDirection: 'row', alignItems: 'center', gap: 10 }, pointText: { flex: 1, color: colors.textPrimary, fontSize: 13, lineHeight: 18 },
});
