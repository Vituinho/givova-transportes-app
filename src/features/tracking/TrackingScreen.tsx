import { useLocalSearchParams } from 'expo-router';
import { Check, ChevronRight, PackageSearch } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TrackingSearch } from '@/components/TrackingSearch';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/States';
import { colors, fonts, typography } from '@/constants/theme';
import { useTracking } from '@/hooks/useTracking';
import { trackingCodeSchema, type TrackingResult } from '@/schemas/tracking';
import { getUserMessage, IntegrationUnavailableError } from '@/services/api';

const developmentPreview: TrackingResult = {
  code: 'GIV-284731',
  status: 'Em trânsito',
  origin: 'São Paulo, SP',
  destination: 'Curitiba, PR',
  lastUpdatedAt: '2026-09-09T14:35:00.000Z',
  estimatedDeliveryAt: '2026-09-11T18:00:00.000Z',
  events: [
    { id: 'preview-1', label: 'Coleta realizada', description: 'Carga recebida para transporte.', occurredAt: '2026-09-08T12:20:00.000Z', completed: true },
    { id: 'preview-2', label: 'Em trânsito', description: 'Carga seguindo para a unidade de destino.', occurredAt: '2026-09-09T14:35:00.000Z', completed: false },
    { id: 'preview-3', label: 'Unidade de destino', occurredAt: '2026-09-10T14:35:00.000Z', completed: false },
    { id: 'preview-4', label: 'Saiu para entrega', occurredAt: '2026-09-11T12:00:00.000Z', completed: false },
    { id: 'preview-5', label: 'Entregue', occurredAt: '2026-09-11T18:00:00.000Z', completed: false },
  ],
};

function TrackingDetails({ result, preview }: { result: TrackingResult; preview?: boolean }) {
  const currentIndex = Math.max(0, result.events.findIndex((event) => !event.completed));
  return (
    <View style={styles.result}>
      {preview ? <Text style={styles.preview}>Prévia de desenvolvimento</Text> : null}
      <View style={styles.shipment}>
        <View style={styles.statusRow}><Text style={styles.status}>{result.status}</Text><Text selectable style={styles.code}>{result.code}</Text></View>
        <View style={styles.route}>
          <View style={styles.routePoint}><Text style={styles.metaLabel}>Origem</Text><Text style={styles.routeValue}>{result.origin || 'Não informada'}</Text></View>
          <ChevronRight size={22} color={colors.textMuted} />
          <View style={[styles.routePoint, styles.destination]}><Text style={styles.metaLabel}>Destino</Text><Text style={styles.routeValue}>{result.destination || 'Não informado'}</Text></View>
        </View>
        {result.estimatedDeliveryAt ? <View style={styles.estimate}><Text style={styles.metaLabel}>Previsão</Text><Text style={styles.estimateValue}>{new Date(result.estimatedDeliveryAt).toLocaleDateString('pt-BR')}</Text></View> : null}
      </View>

      <View style={styles.timelineSection}>
        <Text style={styles.sectionLabel}>Acompanhamento</Text>
        {result.events.map((event, index) => {
          const current = index === currentIndex;
          const complete = event.completed;
          return (
            <View key={event.id} style={styles.event}>
              <View style={styles.rail}>
                {index < result.events.length - 1 ? <View style={[styles.line, (complete || current) && styles.lineActive]} /> : null}
                <View style={[styles.dot, complete && styles.dotComplete, current && styles.dotCurrent]}>{complete ? <Check size={10} color={colors.white} strokeWidth={3} /> : null}</View>
              </View>
              <View style={styles.eventCopy}>
                <Text style={[styles.eventTitle, !complete && !current && styles.eventFuture, current && styles.eventCurrent]}>{event.label}</Text>
                {event.description && (complete || current) ? <Text style={styles.eventDescription}>{event.description}</Text> : null}
                {(complete || current) ? <Text style={styles.eventDate}>{new Date(event.occurredAt).toLocaleString('pt-BR')}</Text> : null}
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.updated}><Text style={styles.metaLabel}>Última atualização</Text><Text style={styles.updatedValue}>{new Date(result.lastUpdatedAt).toLocaleString('pt-BR')}</Text></View>
    </View>
  );
}

export default function TrackingScreen() {
  const params = useLocalSearchParams<{ code?: string; preview?: string }>();
  const [code, setCode] = useState(params.code ?? '');
  const [validationError, setValidationError] = useState('');
  const tracking = useTracking();
  const preview = __DEV__ && params.preview === 'true';

  const submit = () => {
    const parsed = trackingCodeSchema.safeParse(code);
    if (!parsed.success) { setValidationError(parsed.error.issues[0]?.message ?? 'Digite um código válido.'); return; }
    setValidationError('');
    tracking.mutate(parsed.data);
  };

  const integrationPending = tracking.error instanceof IntegrationUnavailableError;
  const result = preview ? developmentPreview : tracking.data;

  return (
    <Screen keyboard contentContainerStyle={styles.screen}>
      <Header title="Rastrear carga" />
      {!result ? <View style={styles.intro}><Text style={styles.title}>Consulte o andamento da sua operação.</Text><Text style={styles.description}>Informe o código da carga ou documento recebido da Givova.</Text></View> : null}
      {!result ? <TrackingSearch code={code} onChangeCode={setCode} onSubmit={submit} error={validationError} loading={tracking.isPending} /> : null}
      {tracking.isPending ? <LoadingState title="Consultando sua carga" /> : result ? <TrackingDetails result={result} preview={preview} /> : integrationPending ? <EmptyState title="Rastreamento em integração" description="A consulta será habilitada quando a API oficial estiver conectada. Nenhum status simulado é exibido." icon={PackageSearch} /> : tracking.isError ? <ErrorState title="Não foi possível rastrear" description={getUserMessage(tracking.error)} actionLabel="Tentar novamente" onAction={submit} /> : <View style={styles.trust}><Text style={styles.trustTitle}>Dados oficiais</Text><Text style={styles.trustText}>O aplicativo não cria etapas ou previsões. Você verá somente informações recebidas da operação.</Text></View>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { gap: 28 },
  intro: { gap: 8, paddingTop: 10 },
  title: { color: colors.textPrimary, ...typography.h1, maxWidth: 340 },
  description: { color: colors.textSecondary, ...typography.body, maxWidth: 350 },
  trust: { borderTopWidth: 1, borderColor: colors.border, paddingTop: 18, gap: 5 },
  trustTitle: { color: colors.textPrimary, ...typography.title },
  trustText: { color: colors.textSecondary, ...typography.bodySmall },
  result: { gap: 30 },
  preview: { alignSelf: 'flex-start', color: colors.warning, fontFamily: fonts.semibold, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8 },
  shipment: { backgroundColor: colors.backgroundSecondary, padding: 18, borderRadius: 12, gap: 22 },
  statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  status: { color: colors.brandOrangeDark, fontFamily: fonts.bold, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.8 },
  code: { color: colors.textPrimary, fontFamily: fonts.semibold, fontSize: 13 },
  route: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  routePoint: { flex: 1, gap: 4 },
  destination: { alignItems: 'flex-end' },
  metaLabel: { color: colors.textMuted, ...typography.caption, textTransform: 'uppercase', letterSpacing: 0.7 },
  routeValue: { color: colors.textPrimary, fontFamily: fonts.semibold, fontSize: 15, lineHeight: 21 },
  estimate: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  estimateValue: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 15 },
  timelineSection: { gap: 4 },
  sectionLabel: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 15 },
  event: { flexDirection: 'row', minHeight: 72, gap: 14 },
  rail: { width: 20, alignItems: 'center' },
  line: { position: 'absolute', top: 17, width: 2, bottom: -2, backgroundColor: colors.border },
  lineActive: { backgroundColor: '#F2B08B' },
  dot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: colors.borderStrong, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  dotComplete: { backgroundColor: colors.brandOrange, borderColor: colors.brandOrange },
  dotCurrent: { borderWidth: 4, borderColor: colors.brandOrange, backgroundColor: colors.white },
  eventCopy: { flex: 1, paddingBottom: 16 },
  eventTitle: { color: colors.textPrimary, ...typography.title },
  eventCurrent: { color: colors.brandOrangeDark },
  eventFuture: { color: colors.textMuted, fontFamily: fonts.medium },
  eventDescription: { color: colors.textSecondary, ...typography.bodySmall, marginTop: 3 },
  eventDate: { color: colors.textMuted, ...typography.caption, marginTop: 5 },
  updated: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 17, gap: 5 },
  updatedValue: { color: colors.textPrimary, ...typography.bodySmall },
});
