import { Tabs } from 'expo-router';
import { Home, MapPinned, Menu, PackagePlus } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

import { colors, fonts } from '@/constants/theme';

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
      <Tabs.Screen name="track" options={{ title: 'Rastrear', tabBarIcon: ({ color, size }) => <MapPinned color={color} size={size} strokeWidth={2.2} /> }} />
      <Tabs.Screen name="quote" options={{ title: 'Cotação', tabBarIcon: ({ color, size }) => <PackagePlus color={color} size={size} strokeWidth={2.2} /> }} />
      <Tabs.Screen name="more" options={{ title: 'Mais', tabBarIcon: ({ color, size }) => <Menu color={color} size={size} /> }} />
      <Tabs.Screen name="services" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: { height: 68, paddingTop: 7, paddingBottom: 7, backgroundColor: colors.white, borderTopColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth },
  label: { fontSize: 11, fontFamily: fonts.medium },
});
