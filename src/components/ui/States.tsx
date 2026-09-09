import type { LucideIcon } from 'lucide-react-native';
import { CircleAlert, Inbox, LoaderCircle } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/theme';

type StateProps = { title: string; description: string; actionLabel?: string; onAction?: () => void; icon?: LucideIcon };

function StateView({ title, description, actionLabel, onAction, icon: Icon = Inbox }: StateProps) {
  return <View style={styles.wrap}><View style={styles.icon}><Icon size={28} color={colors.brandOrange} /></View><Text style={styles.title}>{title}</Text><Text style={styles.description}>{description}</Text>{actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} fullWidth={false} /> : null}</View>;
}

export function EmptyState(props: StateProps) { return <StateView {...props} />; }
export function ErrorState(props: StateProps) { return <StateView icon={CircleAlert} {...props} />; }
export function LoadingState({ title = 'Carregando informações' }: { title?: string }) { return <View style={styles.wrap}><LoaderCircle size={30} color={colors.brandOrange} /><Text style={styles.title}>{title}</Text><Text style={styles.description}>Isso deve levar apenas alguns segundos.</Text></View>; }

const styles = StyleSheet.create({
  wrap: { paddingVertical: 28, paddingHorizontal: 18, alignItems: 'center', gap: 10 },
  icon: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.mutedOrange, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.textPrimary, fontSize: 18, fontWeight: '800', textAlign: 'center' },
  description: { color: colors.textSecondary, fontSize: 14, lineHeight: 20, textAlign: 'center', maxWidth: 310 },
});
