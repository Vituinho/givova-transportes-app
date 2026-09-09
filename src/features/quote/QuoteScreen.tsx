import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Check, CheckCircle2, ChevronLeft, ChevronRight, ClipboardCheck, PackagePlus } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, FormProvider, useForm, useFormContext, type FieldPath } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View, type KeyboardTypeOptions, type TextInputProps } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Input } from '@/components/ui/Input';
import { Screen } from '@/components/ui/Screen';
import { ErrorState } from '@/components/ui/States';
import { colors, radius } from '@/constants/theme';
import { useQuote } from '@/hooks/useQuote';
import { quoteSchema, quoteStepFields, type QuoteFormData } from '@/schemas/quote';
import { getUserMessage, IntegrationUnavailableError } from '@/services/api';

const steps = ['Rota', 'Carga', 'Cliente', 'Observações', 'Confirmar'] as const;

const defaultValues: QuoteFormData = {
  originCity: '', originState: '', destinationCity: '', destinationState: '', cargoType: '', weight: '', volumes: '', dimensions: '', invoiceValue: '', collectionDate: '', name: '', company: '', email: '', phone: '', whatsapp: '', notes: '', acceptPrivacy: false,
};

type FormInputProps = TextInputProps & { name: FieldPath<QuoteFormData>; label: string; keyboardType?: KeyboardTypeOptions; hint?: string };

function FormInput({ name, label, ...props }: FormInputProps) {
  const { control } = useFormContext<QuoteFormData>();
  return <Controller control={control} name={name} render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => <Input ref={ref} label={label} value={typeof value === 'string' ? value : ''} onChangeText={(text) => onChange(name.endsWith('State') ? text.toUpperCase().slice(0, 2) : text)} onBlur={onBlur} error={error?.message} {...props} />} />;
}

function RouteStep() {
  return <View style={styles.fields}><Text style={styles.stepTitle}>Origem e destino</Text><Text style={styles.stepDescription}>Informe o ponto de partida e para onde a carga deve seguir.</Text><FormInput name="originCity" label="Cidade de origem" placeholder="Ex.: São Paulo" autoCapitalize="words" /><FormInput name="originState" label="Estado de origem" placeholder="UF" autoCapitalize="characters" maxLength={2} /><View style={styles.routeDivider}><View style={styles.routeLine} /><Text style={styles.routeDividerText}>Destino</Text><View style={styles.routeLine} /></View><FormInput name="destinationCity" label="Cidade de destino" placeholder="Ex.: Curitiba" autoCapitalize="words" /><FormInput name="destinationState" label="Estado de destino" placeholder="UF" autoCapitalize="characters" maxLength={2} /></View>;
}

function CargoStep() {
  return <View style={styles.fields}><Text style={styles.stepTitle}>Informações da carga</Text><Text style={styles.stepDescription}>Use valores aproximados quando a informação final ainda não estiver disponível.</Text><FormInput name="cargoType" label="Tipo da carga" placeholder="Ex.: colchões, equipamentos" /><View style={styles.twoColumns}><View style={styles.column}><FormInput name="weight" label="Peso" placeholder="Ex.: 250 kg" keyboardType="decimal-pad" /></View><View style={styles.column}><FormInput name="volumes" label="Volumes" placeholder="Ex.: 4" keyboardType="number-pad" /></View></View><FormInput name="dimensions" label="Dimensões" placeholder="Ex.: 120 × 80 × 90 cm" /><FormInput name="invoiceValue" label="Valor aproximado da NF" placeholder="R$ 0,00" keyboardType="decimal-pad" /><FormInput name="collectionDate" label="Data prevista para coleta" placeholder="DD/MM/AAAA" keyboardType="numbers-and-punctuation" /></View>;
}

function ClientStep() {
  return <View style={styles.fields}><Text style={styles.stepTitle}>Seus dados</Text><Text style={styles.stepDescription}>A equipe usará estes canais para retornar sobre a solicitação.</Text><FormInput name="name" label="Nome" placeholder="Nome completo" autoCapitalize="words" /><FormInput name="company" label="Empresa" placeholder="Razão social ou nome fantasia" autoCapitalize="words" /><FormInput name="email" label="E-mail" placeholder="voce@empresa.com.br" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} /><FormInput name="phone" label="Telefone" placeholder="(00) 0000-0000" keyboardType="phone-pad" /><FormInput name="whatsapp" label="WhatsApp" placeholder="(00) 00000-0000" keyboardType="phone-pad" /></View>;
}

function NotesStep() {
  return <View style={styles.fields}><Text style={styles.stepTitle}>Algo mais que devemos saber?</Text><Text style={styles.stepDescription}>Este campo é opcional. Inclua restrições, horários ou particularidades relevantes.</Text><FormInput name="notes" label="Observações adicionais" placeholder="Descreva detalhes importantes da operação" multiline maxLength={1000} /></View>;
}

const summaryGroups: { title: string; rows: [string, keyof QuoteFormData][] }[] = [
  { title: 'Rota', rows: [['Origem', 'originCity'], ['UF de origem', 'originState'], ['Destino', 'destinationCity'], ['UF de destino', 'destinationState']] },
  { title: 'Carga', rows: [['Tipo', 'cargoType'], ['Peso', 'weight'], ['Volumes', 'volumes'], ['Dimensões', 'dimensions'], ['Valor da NF', 'invoiceValue'], ['Coleta', 'collectionDate']] },
  { title: 'Contato', rows: [['Nome', 'name'], ['Empresa', 'company'], ['E-mail', 'email'], ['Telefone', 'phone'], ['WhatsApp', 'whatsapp']] },
];

function ConfirmationStep() {
  const { watch, control } = useFormContext<QuoteFormData>();
  const values = watch();
  return <View style={styles.fields}><Text style={styles.stepTitle}>Revise sua solicitação</Text><Text style={styles.stepDescription}>Confira os dados antes de enviar para a equipe Givova.</Text>{summaryGroups.map((group) => <Card key={group.title} style={styles.summaryCard}><Text style={styles.summaryTitle}>{group.title}</Text>{group.rows.map(([label, name]) => <View key={name} style={styles.summaryRow}><Text style={styles.summaryLabel}>{label}</Text><Text style={styles.summaryValue}>{String(values[name] || 'Não informado')}</Text></View>)}</Card>)}{values.notes ? <Card style={styles.summaryCard}><Text style={styles.summaryTitle}>Observações</Text><Text style={styles.notes}>{values.notes}</Text></Card> : null}<Controller control={control} name="acceptPrivacy" render={({ field: { value, onChange }, fieldState: { error } }) => <View><Pressable accessibilityRole="checkbox" accessibilityState={{ checked: value }} onPress={() => onChange(!value)} style={styles.checkboxRow}><View style={[styles.checkbox, value && styles.checkboxChecked]}>{value ? <Check size={16} color={colors.white} /> : null}</View><Text style={styles.checkboxText}>Li e aceito a <Text onPress={() => router.push('/legal/privacy')} style={styles.link}>Política de Privacidade</Text>.</Text></Pressable>{error ? <Text style={styles.privacyError}>{error.message}</Text> : null}</View>} /></View>;
}

function SuccessView({ protocol, onReset }: { protocol?: string; onReset: () => void }) {
  return <View style={styles.success}><View style={styles.successIcon}><CheckCircle2 size={42} color={colors.success} /></View><Text style={styles.successTitle}>Solicitação enviada</Text><Text style={styles.successText}>Recebemos os dados da sua cotação. A equipe Givova seguirá o atendimento pelos contatos informados.</Text>{protocol ? <View style={styles.protocol}><Text style={styles.protocolLabel}>Protocolo</Text><Text selectable style={styles.protocolValue}>{protocol}</Text></View> : null}<Button label="Nova cotação" onPress={onReset} /><Button label="Voltar ao início" variant="ghost" onPress={() => router.replace('/(tabs)')} /></View>;
}

export default function QuoteScreen() {
  const [step, setStep] = useState(0);
  const form = useForm<QuoteFormData>({ resolver: zodResolver(quoteSchema), defaultValues, mode: 'onTouched' });
  const quote = useQuote();

  const next = async () => { if (await form.trigger(quoteStepFields[step])) setStep((current) => Math.min(current + 1, steps.length - 1)); };
  const back = () => setStep((current) => Math.max(current - 1, 0));
  const reset = () => { form.reset(defaultValues); quote.reset(); setStep(0); };

  if (quote.isSuccess) return <Screen scroll={false}><Header title="Cotação" /><SuccessView protocol={quote.data.protocol} onReset={reset} /></Screen>;

  return (
    <FormProvider {...form}>
      <Screen keyboard>
        <Header title="Solicitar cotação" subtitle="Um passo de cada vez" />
        <View accessibilityLabel={`Etapa ${step + 1} de ${steps.length}: ${steps[step]}`} style={styles.progressWrap}><View style={styles.progressLabels}>{steps.map((label, index) => <Text key={label} style={[styles.progressLabel, index === step && styles.progressLabelActive]}>{index + 1}</Text>)}</View><View style={styles.progressTrack}><View style={[styles.progressValue, { width: `${((step + 1) / steps.length) * 100}%` }]} /></View><Text style={styles.progressText}>Etapa {step + 1} de {steps.length} · {steps[step]}</Text></View>
        <Card style={styles.formCard}>{step === 0 ? <RouteStep /> : step === 1 ? <CargoStep /> : step === 2 ? <ClientStep /> : step === 3 ? <NotesStep /> : <ConfirmationStep />}</Card>
        {quote.isError ? <ErrorState title={quote.error instanceof IntegrationUnavailableError ? 'Envio online em integração' : 'Não foi possível enviar'} description={quote.error instanceof IntegrationUnavailableError ? 'O formulário está pronto, mas a API oficial ainda precisa ser configurada. Seus dados não foram enviados nem armazenados.' : getUserMessage(quote.error)} /> : null}
        <View style={styles.actions}>{step > 0 ? <Button label="Voltar" variant="outline" fullWidth={false} onPress={back} icon={<ChevronLeft size={18} color={colors.textPrimary} />} /> : null}<View style={styles.actionPrimary}>{step < steps.length - 1 ? <Button label="Continuar" onPress={next} icon={<ChevronRight size={18} color={colors.white} />} /> : <Button label="Enviar solicitação" onPress={form.handleSubmit((data) => quote.mutate(data))} loading={quote.isPending} icon={<ClipboardCheck size={19} color={colors.white} />} />}</View></View>
        <View style={styles.safety}><PackagePlus size={17} color={colors.textSecondary} /><Text style={styles.safetyText}>Os dados só são enviados ao tocar em “Enviar solicitação”.</Text></View>
      </Screen>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  progressWrap: { gap: 8 }, progressLabels: { flexDirection: 'row', justifyContent: 'space-between' }, progressLabel: { width: 28, height: 28, borderRadius: 14, textAlign: 'center', lineHeight: 28, overflow: 'hidden', backgroundColor: colors.white, color: colors.textSecondary, fontSize: 12, fontWeight: '800' }, progressLabelActive: { backgroundColor: colors.brandOrange, color: colors.white }, progressTrack: { height: 5, borderRadius: 3, backgroundColor: colors.border, overflow: 'hidden' }, progressValue: { height: '100%', backgroundColor: colors.brandOrange }, progressText: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' }, formCard: { padding: 19 }, fields: { gap: 17 }, stepTitle: { color: colors.textPrimary, fontSize: 23, fontWeight: '900', letterSpacing: -0.4 }, stepDescription: { color: colors.textSecondary, fontSize: 14, lineHeight: 20, marginTop: -10 }, twoColumns: { flexDirection: 'row', gap: 10 }, column: { flex: 1 }, routeDivider: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 1 }, routeLine: { height: 1, backgroundColor: colors.border, flex: 1 }, routeDividerText: { color: colors.textSecondary, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }, summaryCard: { gap: 9, padding: 14, backgroundColor: colors.background }, summaryTitle: { color: colors.brandOrangeDark, fontSize: 14, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.7 }, summaryRow: { flexDirection: 'row', gap: 12 }, summaryLabel: { width: 92, color: colors.textSecondary, fontSize: 12 }, summaryValue: { flex: 1, color: colors.textPrimary, fontSize: 13, fontWeight: '600', textAlign: 'right' }, notes: { color: colors.textPrimary, fontSize: 13, lineHeight: 19 }, checkboxRow: { minHeight: 54, flexDirection: 'row', alignItems: 'center', gap: 11 }, checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: colors.border, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }, checkboxChecked: { backgroundColor: colors.brandOrange, borderColor: colors.brandOrange }, checkboxText: { color: colors.textPrimary, flex: 1, fontSize: 13, lineHeight: 19 }, link: { color: colors.brandOrangeDark, fontWeight: '800' }, privacyError: { color: colors.error, fontSize: 12, marginLeft: 35 }, actions: { flexDirection: 'row', alignItems: 'center', gap: 10 }, actionPrimary: { flex: 1 }, safety: { flexDirection: 'row', justifyContent: 'center', gap: 7 }, safetyText: { color: colors.textSecondary, fontSize: 12 }, success: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 15, paddingHorizontal: 8 }, successIcon: { width: 78, height: 78, borderRadius: 39, backgroundColor: colors.mutedSuccess, alignItems: 'center', justifyContent: 'center' }, successTitle: { color: colors.textPrimary, fontSize: 28, fontWeight: '900', textAlign: 'center' }, successText: { color: colors.textSecondary, fontSize: 15, lineHeight: 22, textAlign: 'center', marginBottom: 6 }, protocol: { width: '100%', padding: 14, backgroundColor: colors.background, borderRadius: radius.md, alignItems: 'center', marginBottom: 7 }, protocolLabel: { color: colors.textSecondary, fontSize: 11, textTransform: 'uppercase' }, protocolValue: { color: colors.textPrimary, fontSize: 18, fontWeight: '800', marginTop: 3 },
});
