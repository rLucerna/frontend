import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * 앱의 최상위 레이아웃 (Root Layout)
 *
 * 모든 Stack 화면(예시 스크린)을 여기에 등록합니다.
 * 탭에서 router.push('/stacks/xxx')로 이동하면
 * 해당 Stack.Screen이 화면 위에 쌓입니다.
 */
export default function RootLayout() {
  return (
    <>
      <Stack>
        {/* 탭 네비게이터 */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* ── useState 예시 화면들 ── */}
        <Stack.Screen
          name="stacks/useState-primitive"
          options={{ title: '원시값 State' }}
        />
        <Stack.Screen
          name="stacks/useState-array"
          options={{ title: '배열 State' }}
        />
        <Stack.Screen
          name="stacks/useState-object"
          options={{ title: '객체 State' }}
        />
        <Stack.Screen
          name="stacks/useState-lifting"
          options={{ title: 'Lifting State Up' }}
        />
        <Stack.Screen
          name="stacks/useState-props"
          options={{ title: '부모→자식 전달' }}
        />
        <Stack.Screen
          name="stacks/useState-independent"
          options={{ title: '독립적 State' }}
        />

        {/* ── useEffect 예시 화면들 ── */}
        <Stack.Screen
          name="stacks/useEffect-lifecycle"
          options={{ title: '생명주기 관찰' }}
        />
        <Stack.Screen
          name="stacks/useEffect-api"
          options={{ title: 'API 데이터 로딩' }}
        />
        <Stack.Screen
          name="stacks/useEffect-timer"
          options={{ title: '타이머 & 정리함수' }}
        />

        {/* ── useRef 예시 화면들 ── */}
        <Stack.Screen
          name="stacks/useRef-counter"
          options={{ title: '렌더링 없는 카운터' }}
        />
        <Stack.Screen
          name="stacks/useRef-focus"
          options={{ title: '입력란 포커스 이동' }}
        />
        <Stack.Screen
          name="stacks/useRef-stopwatch"
          options={{ title: '스톱워치' }}
        />

        {/* ── useCallback 예시 화면들 ── */}
        <Stack.Screen
          name="stacks/useCallback-render"
          options={{ title: '렌더링 횟수 비교' }}
        />
        <Stack.Screen
          name="stacks/useCallback-list"
          options={{ title: '리스트 최적화' }}
        />
        <Stack.Screen
          name="stacks/useCallback-deps"
          options={{ title: '의존성 변경 관찰' }}
        />

        {/* ── useMemo 예시 화면들 ── */}
        <Stack.Screen
          name="stacks/useMemo-filter"
          options={{ title: '리스트 필터링' }}
        />
        <Stack.Screen
          name="stacks/useMemo-calc"
          options={{ title: '무거운 계산' }}
        />
        <Stack.Screen
          name="stacks/useMemo-reference"
          options={{ title: '참조 동일성 유지' }}
        />

        {/* ── useContext 예시 화면들 ── */}
        <Stack.Screen
          name="stacks/useContext-theme"
          options={{ title: '테마 전환' }}
        />
        <Stack.Screen
          name="stacks/useContext-user"
          options={{ title: '사용자 정보 공유' }}
        />
        <Stack.Screen
          name="stacks/useContext-counter"
          options={{ title: 'Props Drilling vs Context' }}
        />
        <Stack.Screen
          name="stacks/yongjun2-hooks"
          options={{ title: 'yongjun2 hooks 숙제' }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
