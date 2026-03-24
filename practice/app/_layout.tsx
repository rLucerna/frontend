import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

/**
 * 4주차 실습: 앱의 최상위 레이아웃 (Root Layout)
 *
 * 탭 네비게이터를 감싸는 Stack 레이아웃입니다.
 */
export default function RootLayout() {
  return (
    <>
      <Stack>
        {/* 탭 네비게이터 */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* 유저 상세 화면 (종합 실습에서 사용) */}
        <Stack.Screen
          name="stacks/user-detail"
          options={{ title: "유저 상세", headerBackTitle: "뒤로" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
