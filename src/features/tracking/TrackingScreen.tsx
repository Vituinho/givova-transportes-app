import { useLocalSearchParams } from 'expo-router';
import { Check, Clock3, MapPin, PackageSearch, Route, Search } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Input } from '@/components/ui/Input';
import { Screen } from '@/components/ui/Screen';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/States';
import { colors, iconSizes, radius, typography } from '@/constants/theme';
import { useTracking } from '@/hooks/useTracking';
import { trackingCodeSchema, type TrackingResult } from '@/schemas/tracking';
import { getUserMessage, IntegrationUnavailableError } from '@/services/api';

function TrackingDetails({ result }: { result: TrackingResult }) {
  return (
    <View style={styles.result}>
      <Card style={styles.summary}>
        <View style={styles.summaryTop}><Badge label={result.status} tone="success" /><Text style={styles.code}>{result.code}</Text></View>
        <View style={styles.routeRow}><View style={styles.routePoint}><MapPin size={18} color={colors.brandOrange} /><Text style={styles.routeLabel}>Origem</Text><Text style={styles.routeValue}>{result.origin || 'Não informada'}</Text></View><Route size={20} color={colors.textSecondary} /><View style={styles.routePoint}><MapPin size={18} color={colors.brandOrangeDark} /><Text style={styles.routeLabel}>Destino</Text><Text style={styles.routeValue}>{result.destination || 'Não informado'}</Text></View></View>
        <View style={styles.dates}><Text style={styles.meta}>Atualizado: {new Date(result.lastUpdatedAt).toLocaleString('pt-BR')}</Text>{result.estimatedDeliveryAt ? <Text style={styles.meta}>Previsão: {new Date(result.estimatedDeliveryAt).toLocaleDateString('pt-BR')}</Text> : null}</View>
      </Card>
      <Text style={styles.timelineTitle}>Histórico da carga</Text>
      {result.events.map((event, index) => <View key={event.id} style={styles.event}><View style={styles.timelineRail}>{index < result.events.length - 1 ? <View style={[styles.line, event.completed && styles.lineComplete]} /> : null}<View style={[styles.dot, event.completed && styles.dotComplete]}>{event.completed ? <Check size={14} color={colors.white} /> : <Clock3 size={13} color={colors.textSecondary} />}</View></View><View style={styles.eventCopy}><Text style={styles.eventLabel}>{event.label}</Text>{event.description ? <Text style={styles.eventDescription}>{event.description}</Text> : null}<Text style={styles.eventDate}>{new Date(event.occurredAt).toLocaleString('pt-BR')}</Text></View></View>)}
    </View>
  );
}

export default function TrackingScreen() {
  const params = useLocalSearchParams<{ code?: string }>();
  const [code, setCode] = useState(params.code ?? '');
  const [validationError, setValidationError] = useState('');
  const tracking = useTracking();

  const submit = () => {
    const parsed = trackingCodeSchema.safeParse(code);
    if (!parsed.success) { setValidationError(parsed.error.issues[0]?.message ?? 'Digite um código válido.'); return; }
    setValidationError('');
    tracking.mutate(parsed.data);
  };

  const integrationPending = tracking.error instanceof IntegrationUnavailableError;

  return (
    <Screen keyboard>
      <Header title="Rastrear carga" subtitle="Acompanhe a sua operação" />
      <View style={styles.intro}><View style={styles.introIcon}><PackageSearch size={iconSizes.large} color={colors.brandOrangeDark} /></View><View style={styles.introCopy}><Text style={styles.title}>Rastreie sua carga</Text><Text style={styles.description}>Use o código informado pela Givova.</Text></View></View>
      <View style={styles.search}><Input label="Código de rastreamento" placeholder="Digite o código" autoCapitalize="characters" autoCorrect={false} returnKeyType="search" value={code} onChangeText={setCode} onSubmitEditing={submit} error={validationError} /><Button label="Rastrear" onPress={submit} loading={tracking.isPending} icon={<Search size={19} color={colors.white} />} /></View>
      {tracking.isPending ? <LoadingState title="Consultando sua carga" /> : tracking.data ? <TrackingDetails result={tracking.data} /> : integrationPending ? <EmptyState title="Rastreamento online em integração" description="A consulta será habilitada assim que a API oficial da Givova estiver conectada. Nenhum status simulado é exibido." icon={PackageSearch} /> : tracking.isError ? <ErrorState title="Não foi possível rastrear" description={getUserMessage(tracking.error)} actionLabel="Tentar novamente" onAction={submit} /> : <View style={styles.guarantee}><Text style={styles.guaranteeTitle}>Informação confiável</Text><Text style={styles.guaranteeText}>Este aplicativo mostra somente dados recebidos do sistema oficial. Não criamos etapas ou previsões fictícias.</Text></View>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { flexDirection: 'row', alignItems: 'center', gap: 13 },
  introIcon: { width: 48, height: 48, borderRadius: radius.md, backgroundColor: colors.mutedOrange, alignItems: 'center', justifyContent: 'center' },
  introCopy: { flex: 1, gap: 2 },
  title: { color: colors.textPrimary, ...typography.heading },
  description: { color: colors.textSecondary, ...typography.body },
  search: { gap: 14 },
  guarantee: { borderLeftWidth: 3, borderLeftColor: colors.brandOrange, paddingLeft: 15, gap: 4 }, guaranteeTitle: { color: colors.textPrimary, fontWeight: '800', fontSize: 15 }, guaranteeText: { color: colors.textSecondary, fontSize: 13, lineHeight: 19 }, result: { gap: 18 }, summary: { gap: 18 }, summaryTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }, code: { color: colors.textSecondary, fontSize: 12, fontWeight: '700' }, routeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 }, routePoint: { flex: 1, gap: 3 }, routeLabel: { color: colors.textSecondary, fontSize: 11 }, routeValue: { color: colors.textPrimary, fontWeight: '700', fontSize: 14 }, dates: { gap: 4 }, meta: { color: colors.textSecondary, fontSize: 12 }, timelineTitle: { color: colors.textPrimary, fontSize: 19, fontWeight: '800' }, event: { flexDirection: 'row', gap: 13, minHeight: 82 }, timelineRail: { width: 28, alignItems: 'center' }, line: { position: 'absolute', top: 28, width: 2, height: 58, backgroundColor: colors.border }, lineComplete: { backgroundColor: colors.brandOrange }, dot: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: colors.border, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }, dotComplete: { backgroundColor: colors.brandOrange, borderColor: colors.brandOrange }, eventCopy: { flex: 1, paddingBottom: 14 }, eventLabel: { color: colors.textPrimary, fontWeight: '700', fontSize: 15 }, eventDescription: { color: colors.textSecondary, fontSize: 13, lineHeight: 18, marginTop: 3 }, eventDate: { color: colors.textSecondary, fontSize: 11, marginTop: 5 },
});
