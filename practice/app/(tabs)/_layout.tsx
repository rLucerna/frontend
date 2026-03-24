import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

/**
 * 4주차 실습용 탭 레이아웃
 *
 * 3개의 탭으로 구성:
 * 1. API 실습: fetch와 axios 사용법 비교
 * 2. Zustand 실습: 전역 상태관리 기초 (카운터)
 * 3. 종합 실습: API + Zustand 연동 (유저 목록)
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        headerStyle: { backgroundColor: "#f8f9fa" },
      }}
    >
      <Tabs.Screen
        name="api-practice"
        options={{
          title: "API 실습",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cloud-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="store-practice"
        options={{
          title: "Zustand 실습",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="combined-practice"
        options={{
          title: "종합 실습",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="layers-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
