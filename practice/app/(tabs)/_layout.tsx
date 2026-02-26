import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

/**
 * 탭 네비게이터 레이아웃 (Tab Navigator Layout)
 *
 * Tabs 컴포넌트: 하단 탭 바를 통해 여러 화면을 전환합니다.
 * - 각 Tabs.Screen의 name은 반드시 해당 파일명(확장자 제외)과 일치해야 합니다.
 * - 예: name="yongjun1" → app/(tabs)/yongjun1.tsx 파일이 해당 탭 화면이 됩니다.
 *
 * Stack vs Tab 네비게이터 차이:
 * - Stack: 화면이 위에 쌓임, 뒤로가기 가능
 * - Tab: 화면들이 나란히 존재, 탭 전환 시 화면이 쌓이지 않고 전환됨
 *        (탭 간 이동 시 이전 상태가 메모리에 유지됩니다)
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // 탭 바 스타일
        tabBarActiveTintColor: '#333',
        tabBarInactiveTintColor: '#AAAAAA',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E8E8E8',
          height: 64,
          paddingBottom: 10,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        // 헤더는 각 탭 화면에서 개별 설정
        headerShown: true,
        headerTitleStyle: { fontWeight: 'bold', fontSize: 16 },
        headerTintColor: '#fff',
      }}
    >
      {/* =============================================
          용준 탭 (파란색 계열)
      ============================================= */}
      <Tabs.Screen
        name="yongjun1"
        options={{
          title: '용준1',
          headerTitle: '용준1 — 프로필 관리',
          headerStyle: { backgroundColor: '#4A90E2' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="yongjun2"
        options={{
          title: '용준2',
          headerTitle: '용준2 — 레시피 탐색',
          headerStyle: { backgroundColor: '#3A7BD5' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />

      {/* =============================================
          서영 탭 (보라색 계열)
      ============================================= */}
      <Tabs.Screen
        name="seoyeong1"
        options={{
          title: '서영1',
          headerTitle: '서영1 — 여행 일기',
          headerStyle: { backgroundColor: '#9B59B6' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="airplane-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="seoyeong2"
        options={{
          title: '서영2',
          headerTitle: '서영2 — 음악 플레이리스트',
          headerStyle: { backgroundColor: '#8E44AD' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes-outline" size={size} color={color} />
          ),
        }}
      />

      {/* =============================================
          은서 탭 (오렌지 계열)
      ============================================= */}
      <Tabs.Screen
        name="eunseo1"
        options={{
          title: '은서1',
          headerTitle: '은서1 — 날씨 정보',
          headerStyle: { backgroundColor: '#E67E22' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="partly-sunny-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="eunseo2"
        options={{
          title: '은서2',
          headerTitle: '은서2 — 독서 기록',
          headerStyle: { backgroundColor: '#D35400' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />

      {/* =============================================
          공통 실습 탭
          Stack · 인라인 Modal(props 전달) · 파일 기반 Modal
          의 기본 원리를 평이한 화면으로 학습합니다.
      ============================================= */}
      <Tabs.Screen
        name="common"
        options={{
          title: '공통',
          headerTitle: '공통 실습',
          headerStyle: { backgroundColor: '#2C3E50' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
