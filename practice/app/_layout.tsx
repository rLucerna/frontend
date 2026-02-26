import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * 앱의 최상위 레이아웃 (Root Layout)
 *
 * Expo Router의 파일 기반 라우팅 시스템:
 * - app 폴더 내의 각 파일이 하나의 라우트(경로/화면)가 됩니다.
 * - _layout.tsx는 해당 폴더의 모든 화면을 감싸는 레이아웃 파일입니다.
 * - 이 파일이 앱 전체의 네비게이션 구조를 정의합니다.
 *
 * Stack 네비게이터:
 * - 화면을 카드처럼 쌓아올리는 방식의 네비게이션
 * - 새 화면이 열릴 때 → 스택에 추가 (push)
 * - 뒤로가기 시 → 스택에서 제거 (pop)
 * - 이전 화면은 스택에 유지되어 있어 빠르게 돌아올 수 있습니다
 */
export default function RootLayout() {
  return (
    <>
      <Stack>
        {/* =============================================
            탭 네비게이터 그룹
            (tabs) 폴더 전체가 하나의 탭 화면으로 등록됩니다.
            headerShown: false → 탭 자체의 상단 헤더는 숨김
            (각 탭 화면이 자체 헤더를 표시합니다)
        ============================================= */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* =============================================
            스택 화면들 (Stack Screens)
            각 탭에서 router.push()로 열리는 상세 화면들
            스택에 쌓이는 방식으로 표시되며, 헤더의 뒤로가기로 돌아올 수 있습니다
        ============================================= */}
        <Stack.Screen
          name="stacks/yongjun1-detail"
          options={{ title: '프로필 상세 편집', headerBackTitle: '뒤로' }}
        />
        <Stack.Screen
          name="stacks/yongjun2-detail"
          options={{ title: '오늘의 레시피', headerBackTitle: '뒤로' }}
        />
        <Stack.Screen
          name="stacks/seoyeong1-detail"
          options={{ title: '여행지 상세 정보', headerBackTitle: '뒤로' }}
        />
        <Stack.Screen
          name="stacks/seoyeong2-detail"
          options={{ title: '아티스트 상세', headerBackTitle: '뒤로' }}
        />
        <Stack.Screen
          name="stacks/eunseo1-detail"
          options={{ title: '주간 날씨 예보', headerBackTitle: '뒤로' }}
        />
        <Stack.Screen
          name="stacks/eunseo2-detail"
          options={{ title: '책 상세 & 리뷰', headerBackTitle: '뒤로' }}
        />

        {/* =============================================
            Router 모달 화면들 (Modal Screens via Expo Router)

            presentation 옵션으로 화면의 등장 방식을 결정합니다:
            - 'modal'            → 아래에서 위로 슬라이드, 이전 화면이 살짝 뒤에 보임
            - 'fullScreenModal'  → 완전히 전체화면을 덮는 모달
            - 'transparentModal' → 배경이 투명한 모달 (오버레이 효과)

            React Native의 <Modal> 컴포넌트와의 차이:
            - expo-router 방식: 별도 파일로 관리, 독립적인 라우트를 가짐
            - RN Modal 방식: 현재 화면 안에서 state로 제어
        ============================================= */}
        <Stack.Screen
          name="modals/seoyeong2-modal"
          options={{
            presentation: 'modal',
            title: '음악 플레이어 설정',
            headerStyle: { backgroundColor: '#8E44AD' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="modals/eunseo2-modal"
          options={{
            presentation: 'fullScreenModal',
            title: '독서 기록 작성',
            headerStyle: { backgroundColor: '#D35400' },
            headerTintColor: '#fff',
          }}
        />

        {/* =============================================
            공통 실습용 스택 & 모달
        ============================================= */}
        {/* 공통 스택: 파라미터(title, from)를 받아 표시하는 단순 화면 */}
        <Stack.Screen
          name="stacks/common-stack"
          options={{ title: '공통 스택 화면', headerBackTitle: '뒤로' }}
        />
        {/* 공통 파일 기반 모달: presentation: 'modal' 방식 */}
        <Stack.Screen
          name="modals/common-modal"
          options={{ presentation: 'modal', title: '파일 기반 모달' }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
