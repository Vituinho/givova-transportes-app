import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

type TrackingSearchProps = {
  code: string;
  onChangeCode: (value: string) => void;
  onSubmit: () => void;
  error?: string;
  loading?: boolean;
};

export function TrackingSearch({ code, onChangeCode, onSubmit, error, loading }: TrackingSearchProps) {
  return (
    <View style={styles.wrap}>
      <Input
        label="Código da carga ou documento"
        placeholder="Digite o código"
        autoCapitalize="characters"
        autoCorrect={false}
        returnKeyType="search"
        value={code}
        onChangeText={onChangeCode}
        onSubmitEditing={onSubmit}
        error={error}
      />
      <Button label="Rastrear carga" onPress={onSubmit} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({ wrap: { gap: 12 } });
