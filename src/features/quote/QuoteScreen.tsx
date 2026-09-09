import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Check, CheckCircle2, ChevronLeft, ClipboardCheck, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, FormProvider, useForm, useFormContext, type FieldPath } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View, type KeyboardTypeOptions, type TextInputProps } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Input } from '@/components/ui/Input';
import { Screen } from '@/components/ui/Screen';
import { ErrorState } from '@/components/ui/States';
import { colors, fonts, radius, typography } from '@/constants/theme';
import { useQuote } from '@/hooks/useQuote';
import { quoteSchema, quoteStepFields, type QuoteFormData } from '@/schemas/quote';
import { getUserMessage, IntegrationUnavailableError } from '@/services/api';

const steps = ['Rota', 'Carga', 'Contato', 'Revisão'] as const;

const defaultValues: QuoteFormData = {
  originCity: '', originState: '', destinationCity: '', destinationState: '', cargoType: '', weight: '', volumes: '', dimensions: '', invoiceValue: '', collectionDate: '', name: '', company: '', email: '', phone: '', whatsapp: '', notes: '', acceptPrivacy: false,
};

type FormInputProps = TextInputProps & { name: FieldPath<QuoteFormData>; label: string; keyboardType?: KeyboardTypeOptions; hint?: string };

function FormInput({ name, label, ...props }: FormInputProps) {
  const { control } = useFormContext<QuoteFormData>();
  return <Controller control={control} name={name} render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => <Input ref={ref} label={label} value={typeof value === 'string' ? value : ''} onChangeText={(text) => onChange(name.endsWith('State') ? text.toUpperCase().slice(0, 2) : text)} onBlur={onBlur} error={error?.message} {...props} />} />;
}

function StepHeading({ title, description }: { title: string; description: string }) {
  return <View style={styles.stepHeading}><Text style={styles.stepTitle}>{title}</Text><Text style={styles.stepDescription}>{description}</Text></View>;
}

function RouteStep() {
  return <View style={styles.fields}><StepHeading title="Rota" description="Informe o ponto de partida e o destino da carga." /><Text style={styles.question}>De onde sua carga sai?</Text><FormInput name="originCity" label="Cidade" placeholder="Ex.: São Paulo" autoCapitalize="words" /><FormInput name="originState" label="UF" placeholder="SP" autoCapitalize="characters" maxLength={2} /><View style={styles.routeDivider} /><Text style={styles.question}>Para onde ela vai?</Text><FormInput name="destinationCity" label="Cidade" placeholder="Ex.: Curitiba" autoCapitalize="words" /><FormInput name="destinationState" label="UF" placeholder="PR" autoCapitalize="characters" maxLength={2} /></View>;
}

function CargoStep() {
  const [showDimensions, setShowDimensions] = useState(false);
  return <View style={styles.fields}><StepHeading title="Carga" description="Valores aproximados já ajudam nossa equipe a avaliar a operação." /><FormInput name="cargoType" label="Tipo da carga" placeholder="Ex.: equipamentos" /><View style={styles.twoColumns}><View style={styles.column}><FormInput name="weight" label="Peso" placeholder="Ex.: 250 kg" keyboardType="decimal-pad" /></View><View style={styles.column}><FormInput name="volumes" label="Volumes" placeholder="Ex.: 4" keyboardType="number-pad" /></View></View><FormInput name="invoiceValue" label="Valor aproximado da NF" placeholder="R$ 0,00" keyboardType="decimal-pad" /><FormInput name="collectionDate" label="Data prevista para coleta" placeholder="DD/MM/AAAA" keyboardType="numbers-and-punctuation" />{showDimensions ? <FormInput name="dimensions" label="Dimensões (opcional)" placeholder="Ex.: 120 × 80 × 90 cm" /> : <Pressable accessibilityRole="button" onPress={() => setShowDimensions(true)} style={styles.additional}><Plus size={17} color={colors.brandOrangeDark} /><Text style={styles.additionalText}>Adicionar dimensões</Text></Pressable>}</View>;
}

function ContactStep() {
  return <View style={styles.fields}><StepHeading title="Contato" description="Usaremos estes dados para retornar sobre a sua solicitação." /><FormInput name="company" label="Empresa" placeholder="Razão social ou nome fantasia" autoCapitalize="words" /><FormInput name="name" label="Nome" placeholder="Nome completo" autoCapitalize="words" /><FormInput name="phone" label="Telefone" placeholder="(00) 00000-0000" keyboardType="phone-pad" /><FormInput name="email" label="E-mail" placeholder="voce@empresa.com.br" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} /></View>;
}

const summaryGroups: { title: string; rows: [string, keyof QuoteFormData][] }[] = [
  { title: 'Rota', rows: [['Origem', 'originCity'], ['UF', 'originState'], ['Destino', 'destinationCity'], ['UF', 'destinationState']] },
  { title: 'Carga', rows: [['Tipo', 'cargoType'], ['Peso', 'weight'], ['Volumes', 'volumes'], ['Valor da NF', 'invoiceValue'], ['Coleta', 'collectionDate'], ['Dimensões', 'dimensions']] },
  { title: 'Contato', rows: [['Empresa', 'company'], ['Nome', 'name'], ['Telefone', 'phone'], ['E-mail', 'email']] },
];

function ConfirmationStep() {
  const { watch, control } = useFormContext<QuoteFormData>();
  const values = watch();
  return <View style={styles.fields}><StepHeading title="Revisão" description="Confira os dados antes de solicitar a cotação." /><View style={styles.summary}>{summaryGroups.map((group, index) => <View key={group.title} style={[styles.summaryGroup, index < summaryGroups.length - 1 && styles.summaryDivider]}><Text style={styles.summaryTitle}>{group.title}</Text>{group.rows.map(([label, name]) => values[name] ? <View key={name} style={styles.summaryRow}><Text style={styles.summaryLabel}>{label}</Text><Text style={styles.summaryValue}>{String(values[name])}</Text></View> : null)}</View>)}</View><FormInput name="notes" label="Observações (opcional)" placeholder="Restrições, horários ou detalhes da operação" multiline maxLength={1000} /><Controller control={control} name="acceptPrivacy" render={({ field: { value, onChange }, fieldState: { error } }) => <View><Pressable accessibilityRole="checkbox" accessibilityState={{ checked: value }} onPress={() => onChange(!value)} style={styles.checkboxRow}><View style={[styles.checkbox, value && styles.checkboxChecked]}>{value ? <Check size={15} color={colors.white} /> : null}</View><Text style={styles.checkboxText}>Li e aceito a <Text onPress={() => router.push('/legal/privacy')} style={styles.link}>Política de Privacidade</Text>.</Text></Pressable>{error ? <Text style={styles.privacyError}>{error.message}</Text> : null}</View>} /></View>;
}

function SuccessView({ protocol }: { protocol?: string }) {
  return <View style={styles.success}><CheckCircle2 size={48} color={colors.success} strokeWidth={1.8} /><Text style={styles.successTitle}>Recebemos sua solicitação.</Text><Text style={styles.successText}>Nossa equipe entrará em contato após analisar os dados informados.</Text>{protocol ? <View style={styles.protocol}><Text style={styles.protocolLabel}>Protocolo</Text><Text selectable style={styles.protocolValue}>{protocol}</Text></View> : null}<Button label="Voltar ao início" onPress={() => router.replace('/(tabs)')} /><Button label="Falar com atendimento" variant="outline" onPress={() => router.push('/contact')} /></View>;
}

export default function QuoteScreen() {
  const [step, setStep] = useState(0);
  const form = useForm<QuoteFormData>({ resolver: zodResolver(quoteSchema), defaultValues, mode: 'onTouched' });
  const quote = useQuote();
  const next = async () => { if (await form.trigger(quoteStepFields[step])) setStep((current) => Math.min(current + 1, steps.length - 1)); };
  const back = () => setStep((current) => Math.max(current - 1, 0));

  if (quote.isSuccess) return <Screen scroll={false}><Header title="Cotação" /><SuccessView protocol={quote.data.protocol} /></Screen>;

  return (
    <FormProvider {...form}>
      <Screen key={`quote-step-${step}`} keyboard contentContainerStyle={styles.screen}>
        <Header title="Solicitar cotação" />
        <View accessibilityLabel={`Etapa ${step + 1} de ${steps.length}: ${steps[step]}`} style={styles.progress}><View style={styles.progressTop}><Text style={styles.progressText}>Etapa {step + 1} de {steps.length}</Text><Text style={styles.progressName}>{steps[step]}</Text></View><View style={styles.progressTrack}><View style={[styles.progressValue, { width: `${((step + 1) / steps.length) * 100}%` }]} /></View></View>
        <View style={styles.form}>{step === 0 ? <RouteStep /> : step === 1 ? <CargoStep /> : step === 2 ? <ContactStep /> : <ConfirmationStep />}</View>
        {quote.isError ? <ErrorState title={quote.error instanceof IntegrationUnavailableError ? 'Envio online em integração' : 'Não foi possível enviar'} description={quote.error instanceof IntegrationUnavailableError ? 'A API oficial ainda precisa ser configurada. Seus dados não foram enviados nem armazenados.' : getUserMessage(quote.error)} /> : null}
        <View style={styles.actions}>{step > 0 ? <Button label="Voltar" variant="outline" fullWidth={false} onPress={back} icon={<ChevronLeft size={18} color={colors.textPrimary} />} /> : null}<View style={styles.actionPrimary}>{step < steps.length - 1 ? <Button label="Continuar" onPress={next} /> : <Button label="Solicitar cotação" onPress={form.handleSubmit((data) => quote.mutate(data))} loading={quote.isPending} icon={<ClipboardCheck size={19} color={colors.white} />} />}</View></View>
        <Text style={styles.safety}>A cotação só é enviada na última etapa.</Text>
      </Screen>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  screen: { paddingBottom: 164, gap: 20 },
  progress: { gap: 9 },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressText: { color: colors.textSecondary, ...typography.bodySmall },
  progressName: { color: colors.brandOrangeDark, fontFamily: fonts.semibold, fontSize: 12 },
  progressTrack: { height: 3, backgroundColor: colors.border, overflow: 'hidden' },
  progressValue: { height: '100%', backgroundColor: colors.brandOrange },
  form: { paddingVertical: 4 },
  fields: { gap: 15 },
  stepHeading: { gap: 6, marginBottom: 3 },
  stepTitle: { color: colors.textPrimary, ...typography.h1 },
  stepDescription: { color: colors.textSecondary, ...typography.body },
  question: { color: colors.textPrimary, ...typography.title, marginTop: 4 },
  twoColumns: { flexDirection: 'row', gap: 10 },
  column: { flex: 1 },
  routeDivider: { height: 1, backgroundColor: colors.border, marginVertical: 4 },
  additional: { minHeight: 48, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 7 },
  additionalText: { color: colors.brandOrangeDark, fontFamily: fonts.semibold, fontSize: 13 },
  summary: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
  summaryGroup: { paddingVertical: 15, gap: 8 },
  summaryDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  summaryTitle: { color: colors.brandOrangeDark, fontFamily: fonts.bold, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 2 },
  summaryRow: { flexDirection: 'row', gap: 12 },
  summaryLabel: { width: 82, color: colors.textMuted, ...typography.bodySmall },
  summaryValue: { flex: 1, color: colors.textPrimary, fontFamily: fonts.medium, fontSize: 13, lineHeight: 19, textAlign: 'right' },
  checkboxRow: { minHeight: 54, flexDirection: 'row', alignItems: 'center', gap: 11 },
  checkbox: { width: 24, height: 24, borderRadius: radius.sm, borderWidth: 2, borderColor: colors.borderStrong, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: colors.brandOrange, borderColor: colors.brandOrange },
  checkboxText: { color: colors.textPrimary, flex: 1, ...typography.bodySmall },
  link: { color: colors.brandOrangeDark, fontFamily: fonts.bold },
  privacyError: { color: colors.error, fontFamily: fonts.regular, fontSize: 12, marginLeft: 35 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  actionPrimary: { flex: 1 },
  safety: { color: colors.textMuted, ...typography.caption, textAlign: 'center' },
  success: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, paddingHorizontal: 8 },
  successTitle: { color: colors.textPrimary, ...typography.h1, textAlign: 'center' },
  successText: { color: colors.textSecondary, ...typography.body, textAlign: 'center', marginBottom: 8 },
  protocol: { width: '100%', padding: 14, backgroundColor: colors.backgroundSecondary, borderRadius: radius.md, alignItems: 'center', marginBottom: 4 },
  protocolLabel: { color: colors.textMuted, ...typography.caption, textTransform: 'uppercase' },
  protocolValue: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 18, marginTop: 3 },
});
