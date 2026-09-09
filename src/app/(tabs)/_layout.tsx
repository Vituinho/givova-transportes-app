import { Tabs } from 'expo-router';
import { Home, MapPinned, Menu, PackagePlus, Truck } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { colors, shadow } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.brandOrangeDark,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarLabelStyle: styles.label,
      tabBarStyle: styles.bar,
      tabBarHideOnKeyboard: true,
    }}>
      <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }} />
      <Tabs.Screen name="quote" options={{ title: 'Cotação', tabBarIcon: ({ color, size }) => <PackagePlus color={color} size={size} /> }} />
      <Tabs.Screen name="track" options={{ title: 'Rastrear', tabBarIcon: ({ focused }) => <View style={[styles.trackIcon, focused && styles.trackIconActive]}><MapPinned color={colors.white} size={25} /></View> }} />
      <Tabs.Screen name="services" options={{ title: 'Serviços', tabBarIcon: ({ color, size }) => <Truck color={color} size={size} /> }} />
      <Tabs.Screen name="more" options={{ title: 'Mais', tabBarIcon: ({ color, size }) => <Menu color={color} size={size} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: { height: 74, paddingTop: 7, paddingBottom: 9, backgroundColor: colors.white, borderTopColor: colors.border, ...shadow },
  label: { fontSize: 11, fontWeight: '600' },
  trackIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.brandOrange, alignItems: 'center', justifyContent: 'center', marginTop: -22, borderWidth: 4, borderColor: colors.white },
  trackIconActive: { backgroundColor: colors.brandOrangeDark },
});
