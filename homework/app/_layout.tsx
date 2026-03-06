import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* 여기에 스택 추가 */}
        <Stack.Screen name="VolunteeringDetail"
          options={{
            title: "봉사 상세 정보"
          }} />

      </Stack>



      <StatusBar style="auto" />
    </>
  );
}
