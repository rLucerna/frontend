import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

/**
 * 탭 네비게이터 레이아웃
 *
 * 각 탭은 하나의 React Hook에 대응합니다.
 * 탭을 전환하면 해당 Hook의 설명과 예시 버튼이 표시됩니다.
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#333',
        tabBarInactiveTintColor: '#AAA',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#E8E8E8',
          height: 64,
          paddingBottom: 10,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
        headerShown: true,
        headerTitleStyle: { fontWeight: 'bold', fontSize: 16 },
        headerTintColor: '#fff',
      }}
    >
      <Tabs.Screen
        name="useState"
        options={{
          title: 'useState',
          headerTitle: 'useState',
          headerStyle: { backgroundColor: '#3498DB' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="useEffect"
        options={{
          title: 'useEffect',
          headerTitle: 'useEffect',
          headerStyle: { backgroundColor: '#2ECC71' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="useRef"
        options={{
          title: 'useRef',
          headerTitle: 'useRef',
          headerStyle: { backgroundColor: '#E67E22' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pin-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="useCallback"
        options={{
          title: 'useCallback',
          headerTitle: 'useCallback',
          headerStyle: { backgroundColor: '#9B59B6' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="repeat-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="useMemo"
        options={{
          title: 'useMemo',
          headerTitle: 'useMemo',
          headerStyle: { backgroundColor: '#E74C3C' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="speedometer-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="useContext"
        options={{
          title: 'useContext',
          headerTitle: 'useContext',
          headerStyle: { backgroundColor: '#1ABC9C' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="globe-outline" size={size} color={color} />
          ),
        }}
      />
      {/* practice 탭은 메뉴에서 숨김 */}
      <Tabs.Screen
        name="practice"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
