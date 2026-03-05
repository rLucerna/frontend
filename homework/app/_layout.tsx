import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack>
        {/* 1층: 기본 탭 화면 */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* 2층: 회원가입 (기본 헤더 숨김 설정 추가) */}
        <Stack.Screen 
          name="signup" 
          options={{ 
            presentation: 'modal', 
            headerShown: false // 상단 'signup' 문구를 지우는 핵심 코드!
          }} 
        />

        {/* 2층: 계정 찾기 */}
        <Stack.Screen 
          name="findAccount" 
          options={{ 
            headerTitle: "아이디/비밀번호 찾기" 
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}