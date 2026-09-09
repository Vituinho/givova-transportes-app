import type { LucideIcon } from 'lucide-react-native';
import { CircleAlert, Inbox, LoaderCircle } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { colors, typography } from '@/constants/theme';

type StateProps = { title: string; description: string; actionLabel?: string; onAction?: () => void; icon?: LucideIcon };

function StateView({ title, description, actionLabel, onAction, icon: Icon = Inbox }: StateProps) {
  return <View style={styles.wrap}><Icon size={26} color={colors.brandOrangeDark} /><Text style={styles.title}>{title}</Text><Text style={styles.description}>{description}</Text>{actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} fullWidth={false} /> : null}</View>;
}

export function EmptyState(props: StateProps) { return <StateView {...props} />; }
export function ErrorState(props: StateProps) { return <StateView icon={CircleAlert} {...props} />; }
export function LoadingState({ title = 'Carregando informações' }: { title?: string }) { return <View style={styles.wrap}><LoaderCircle size={30} color={colors.brandOrange} /><Text style={styles.title}>{title}</Text><Text style={styles.description}>Isso deve levar apenas alguns segundos.</Text></View>; }

const styles = StyleSheet.create({
  wrap: { paddingVertical: 24, gap: 10, alignItems: 'flex-start' },
  title: { color: colors.textPrimary, ...typography.h3 },
  description: { color: colors.textSecondary, ...typography.body, maxWidth: 340 },
});
