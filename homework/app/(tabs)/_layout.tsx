import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "메인 진입점",
          headerTitle: "메인 진입점",
          headerStyle: { backgroundColor: "#4A90E2" },
        }}
      />
      <Tabs.Screen
        name="yongjun"
        options={{
          title: "용준",
          headerTitle: "용준",
          headerStyle: { backgroundColor: "#4A90E2" },
        }}
      />
      <Tabs.Screen
        name="seoyoung"
        options={{
          title: "서영",
          headerTitle: "서영",
          headerStyle: { backgroundColor: "#4A90E2" },
        }}
      />
      <Tabs.Screen
        name="eunseo"
        options={{
          title: "은서",
          headerTitle: "은서",
          headerStyle: { backgroundColor: "#4A90E2" },
        }}
      />
    </Tabs>
  );
}
