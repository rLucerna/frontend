# React Native Navigation 학습 가이드

> 이 문서는 수업 중 헷갈리거나 까먹은 개념을 빠르게 다시 확인하기 위한 참고 문서입니다.

---

## 📌 목차

1. [Expo Router란?](#1-expo-router란)
1-1. [React Navigation vs Expo Router](#1-1-react-navigation-vs-expo-router)
2. [파일 기반 라우팅 구조](#2-파일-기반-라우팅-구조)
3. [Stack 네비게이터](#3-stack-네비게이터)
4. [Tab 네비게이터](#4-tab-네비게이터)
5. [Modal](#5-modal)
6. [화면 전환 방법: router vs Link](#6-화면-전환-방법-router-vs-link)
7. [파라미터 전달: useLocalSearchParams](#7-파라미터-전달-uselocalsearchparams)
8. [router.back() — 뒤로 가기](#8-routerback--뒤로-가기)
9. [useFocusEffect — 화면 포커스 감지](#9-usefocuseffect--화면-포커스-감지)
10. [이 앱의 전체 화면 구조](#10-이-앱의-전체-화면-구조)
11. [자주 하는 실수 & 주의사항](#11-자주-하는-실수--주의사항)

---

## 1. Expo Router란?

Expo Router는 **파일 시스템 기반**으로 네비게이션을 관리하는 라우팅 라이브러리입니다.
React Native의 React Navigation 위에서 동작하며, Next.js의 페이지 라우팅과 비슷한 개념을 모바일에 가져온 것입니다.

### 핵심 개념
- `app/` 폴더 안의 **파일 = 화면(라우트)**
- 폴더 구조가 URL 경로가 됩니다
- `_layout.tsx`는 해당 폴더의 **레이아웃(감싸는 구조)** 파일

```
app/
  _layout.tsx         → 루트 레이아웃 (Stack 네비게이터 정의)
  (tabs)/
    _layout.tsx       → 탭 레이아웃 (Tabs 네비게이터 정의)
    yongjun1.tsx      → /yongjun1 라우트 (화면)
  stacks/
    yongjun1-detail.tsx → /stacks/yongjun1-detail 라우트
  modals/
    seoyeong2-modal.tsx → /modals/seoyeong2-modal 라우트
```

---

## 1-1. React Navigation vs Expo Router

### React Navigation이란?

React Navigation은 React Native에서 **가장 널리 사용되는 네비게이션 라이브러리**입니다.
Stack, Tab, Drawer 등의 네비게이터를 코드로 직접 선언하고 설정하는 방식입니다.

```tsx
// React Navigation 방식 — 코드로 직접 라우트를 선언
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// 앱 최상단에서 NavigationContainer로 감싸야 합니다
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={HomeTabs} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

화면 이동은 `navigation` 객체를 통해 수행합니다.

```tsx
// 화면 이동 — navigation prop을 각 화면 컴포넌트가 받아야 함
function HomeScreen({ navigation }) {
  return (
    <Button
      title="상세로 이동"
      onPress={() => navigation.navigate('Detail', { id: 42 })}
    />
  );
}
```

---

### Expo Router란? (React Navigation과 비교)

Expo Router는 React Navigation을 **내부적으로 사용하면서**,
그 위에 **파일 기반 라우팅(File-based Routing)** 레이어를 추가한 라이브러리입니다.

즉, Expo Router를 쓴다는 것은 React Navigation을 쓰는 것과 같지만,
설정 방식이 완전히 다릅니다.

```
┌─────────────────────────────────┐
│          Expo Router            │  ← 파일 기반 라우팅 레이어
├─────────────────────────────────┤
│        React Navigation         │  ← 실제 네비게이션 엔진
├─────────────────────────────────┤
│         React Native            │  ← 모바일 렌더링
└─────────────────────────────────┘
```

Expo Router에서는 파일을 만들기만 하면 자동으로 라우트가 생성됩니다.

```
// Expo Router 방식 — 파일을 만들면 라우트가 자동 생성됨

app/
  _layout.tsx     ← Stack 설정만 여기서
  index.tsx       → / 라우트 자동 생성 (HomeScreen)
  profile.tsx     → /profile 라우트 자동 생성 (ProfileScreen)
  detail.tsx      → /detail 라우트 자동 생성 (DetailScreen)
```

화면 이동은 `useRouter` 훅 또는 `<Link>`로 수행합니다.

```tsx
// Expo Router — 어느 화면에서든 useRouter로 이동
import { useRouter } from 'expo-router';

function HomeScreen() {
  const router = useRouter();
  return (
    <Button
      title="상세로 이동"
      onPress={() => router.push({ pathname: '/detail', params: { id: 42 } })}
    />
  );
}
```

---

### 핵심 차이 비교표

| 구분 | React Navigation | Expo Router |
|------|-----------------|-------------|
| 라우트 정의 방식 | 코드(JSX)로 직접 선언 | 파일 시스템 기반 자동 생성 |
| 설정 위치 | `App.tsx` 등 진입 파일 | `app/_layout.tsx` |
| 화면 이동 | `navigation.navigate()` | `router.push()` 또는 `<Link>` |
| 파라미터 전달 | `navigation.navigate('Screen', { id })` | `router.push({ pathname, params })` |
| 파라미터 수신 | `route.params.id` | `useLocalSearchParams()` |
| 딥링크 설정 | 별도 설정 필요 | 파일 구조가 URL이므로 자동 지원 |
| 웹 지원 | 추가 설정 필요 | URL 기반이라 기본 지원 |
| 코드 양 | 라우트 수만큼 코드 증가 | 파일만 추가하면 됨 |

```tsx
// ── 같은 결과를 내는 두 방식 비교 ──

// ❶ React Navigation — 코드로 모든 라우트를 등록해야 함
const Stack = createStackNavigator();
<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Profile" component={ProfileScreen} />
  <Stack.Screen name="Detail" component={DetailScreen} />
  {/* 화면이 늘어날수록 여기도 계속 추가해야 함 */}
</Stack.Navigator>

// ❷ Expo Router — 파일만 만들면 끝
app/
  index.tsx    // HomeScreen
  profile.tsx  // ProfileScreen
  detail.tsx   // DetailScreen
  // 파일을 추가하면 자동으로 라우트 생성됨
```

---

### 왜 Expo Router가 등장했는가?

React Navigation은 훌륭한 라이브러리이지만, 사용하면서 반복되는 불편함이 있었습니다.

**React Navigation의 불편함:**

1. **보일러플레이트 코드가 많다**
   화면이 20개라면 `createStackNavigator`, `Stack.Screen` 설정도 20개 작성해야 합니다.

2. **딥링크 설정이 복잡하다**
   외부에서 특정 화면으로 직접 접근하려면 `linking` 설정을 별도로 작성해야 합니다.

3. **웹 + 모바일 동시 지원이 어렵다**
   모바일 앱과 웹을 같은 코드로 만들 때 URL 구조를 별도로 관리해야 합니다.

4. **`navigation` prop 전달 패턴**
   화면 컴포넌트가 `navigation`과 `route` prop에 의존하여 컴포넌트가 무거워집니다.

**Expo Router가 해결하는 것:**

```tsx
// React Navigation — 딥링크를 위한 별도 linking 설정
const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Home: 'home',
      Profile: 'profile/:id',
      Detail: 'detail/:id',
      // 화면마다 수동 등록...
    },
  },
};
<NavigationContainer linking={linking}>...</NavigationContainer>

// Expo Router — 파일 구조 = URL = 딥링크 (별도 설정 없음)
app/
  index.tsx          → myapp://
  profile/[id].tsx   → myapp://profile/123
  detail/[id].tsx    → myapp://detail/456
```

**요약하자면**, Expo Router는 Next.js(웹)에서 검증된 파일 기반 라우팅의 편의성을
React Native에 가져온 것입니다.

> React Navigation = 강력하고 유연한 엔진
> Expo Router = 그 엔진 위에 얹은 편리한 자동화 레이어

---

### 그렇다면 지금 우리는 왜 Expo Router를 쓰는가?

1. **Expo 프로젝트의 표준이 되고 있다**
   Expo가 공식적으로 Expo Router를 권장하며, 기본 템플릿에 포함되어 있습니다.

2. **코드가 단순하다**
   파일을 추가하는 것만으로 화면을 등록할 수 있어 빠른 개발이 가능합니다.

3. **React Navigation을 여전히 이해해야 한다**
   Expo Router 내부는 React Navigation이므로, 동작 원리와 개념(Stack, Tab, Modal 등)은
   React Navigation 개념과 동일합니다. Expo Router를 배우면 React Navigation도 이해하게 됩니다.

4. **실무에서 두 가지 모두 볼 수 있다**
   기존 프로젝트는 React Navigation, 새 프로젝트는 Expo Router를 사용하는 경향이 있습니다.

---

## 2. 파일 기반 라우팅 구조

### 특수 파일명 규칙

| 파일명 | 의미 |
|--------|------|
| `_layout.tsx` | 레이아웃 파일 (해당 폴더의 모든 화면을 감쌈) |
| `index.tsx` | 폴더의 기본(루트) 경로 |
| `[id].tsx` | 동적 라우트 (예: `/product/123`) |
| `(tabs)/` | 그룹 폴더 — URL에 포함되지 않음 |
| `+not-found.tsx` | 404 페이지 |

### 그룹 폴더 `(폴더명)`

소괄호로 묶인 폴더는 **URL 경로에 포함되지 않는 논리적 그룹**입니다.

```
app/(tabs)/yongjun1.tsx
→ URL: /yongjun1  (tabs가 경로에 포함되지 않음)
```

---

## 3. Stack 네비게이터

### 개념

화면을 **카드처럼 쌓아올리는** 방식의 네비게이션입니다.

```
[탭 화면] → push → [스택 화면 A] → push → [스택 화면 B]
                                   ← pop  ←
```

- 새 화면을 열면 → 스택에 추가(push)
- 뒤로가기 → 스택에서 제거(pop)
- 이전 화면은 메모리에 유지됨

### 설정 방법 (app/_layout.tsx)

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* 탭 그룹 */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* 스택 화면 등록 */}
      <Stack.Screen
        name="stacks/yongjun1-detail"
        options={{ title: '프로필 상세', headerBackTitle: '뒤로' }}
      />
    </Stack>
  );
}
```

### 주요 options

| 옵션 | 설명 |
|------|------|
| `title` | 헤더에 표시될 제목 |
| `headerShown` | 헤더 표시 여부 (기본값: true) |
| `headerBackTitle` | iOS 뒤로가기 버튼 텍스트 |
| `headerStyle` | 헤더 배경색 등 스타일 |
| `presentation` | 화면 등장 방식 (card/modal/fullScreenModal 등) |

---

## 4. Tab 네비게이터

### 개념

화면 하단의 **탭 바를 통해 화면을 전환**하는 방식입니다.

- 탭 간 이동 시 화면이 쌓이지 않고 **전환**됨
- 각 탭은 독립적인 스택을 유지 (탭을 나갔다 와도 상태 유지)

### 설정 방법 (app/(tabs)/_layout.tsx)

```tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#333' }}>
      <Tabs.Screen
        name="yongjun1"           // → app/(tabs)/yongjun1.tsx 파일과 연결
        options={{
          title: '용준1',          // 탭 바에 표시될 이름
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

### Stack vs Tab 핵심 차이

| 구분 | Stack | Tab |
|------|-------|-----|
| 화면 이동 방식 | 위에 쌓임 (push/pop) | 나란히 전환 |
| 뒤로가기 | ✅ 가능 | ❌ 없음 |
| 이전 상태 유지 | 유지됨 (pop 전까지) | 메모리에 계속 유지 |
| 사용 목적 | 상세 화면, 세부 흐름 | 주요 섹션 이동 |

---

## 5. Modal

모달은 현재 화면 위에 **새로운 화면을 띄우는** UI 패턴입니다.

### 5-1. React Native `<Modal>` 컴포넌트 (인라인 방식)

현재 파일 안에서 `useState`로 제어하는 방식입니다.

```tsx
import { Modal } from 'react-native';

const [visible, setVisible] = useState(false);

<Modal
  visible={visible}            // 표시 여부 (state로 제어)
  transparent={true}           // 배경 투명 여부
  animationType="fade"         // 등장 애니메이션: 'none' | 'slide' | 'fade'
  onRequestClose={() => setVisible(false)}  // 안드로이드 뒤로가기 처리
>
  <View>...</View>
</Modal>
```

### 6가지 모달 패턴 비교 (이 앱 기준)

| 탭 | 모달 종류 | 구현 방식 | 특징 |
|----|----------|----------|------|
| 용준1 | **팝업 모달** | RN Modal (transparent+fade) | 중앙 작은 다이얼로그 |
| 용준2 | **풀스크린 모달** | RN Modal (transparent:false+slide) | 전체 화면 덮음 |
| 서영1 | **바텀시트 모달** | RN Modal (flex-end+slide) | 하단에서 슬라이드 업 |
| 서영2 | **Router 모달** | expo-router (presentation:'modal') | 별도 파일, 독립 라우트 |
| 은서1 | **알럿 다이얼로그** | RN Modal (transparent+fade) | 확인/취소 액션 버튼 |
| 은서2 | **Router 풀스크린** | expo-router (presentation:'fullScreenModal') | 완전 전체화면 |

### 5-2. expo-router Router 모달 방식

별도 파일로 모달을 관리하는 방식입니다.

**1단계: _layout.tsx에 모달 라우트 등록**

```tsx
// app/_layout.tsx
<Stack.Screen
  name="modals/seoyeong2-modal"
  options={{
    presentation: 'modal',        // ← 모달 방식 지정
    title: '설정',
  }}
/>
```

**2단계: 모달 파일 생성**

```tsx
// app/modals/seoyeong2-modal.tsx
import { useRouter } from 'expo-router';

export default function MyModal() {
  const router = useRouter();

  return (
    <View>
      <Text>모달 내용</Text>
      <Button title="닫기" onPress={() => router.back()} />
    </View>
  );
}
```

**3단계: 열기**

```tsx
// 어떤 탭 화면에서든
router.push('/modals/seoyeong2-modal');
```

### presentation 옵션 차이

| 값 | 동작 |
|----|------|
| `'card'` | 일반 스택 화면 (기본값) |
| `'modal'` | 아래에서 슬라이드, iOS에서 이전 화면 살짝 보임 |
| `'fullScreenModal'` | 완전 전체화면, 이전 화면 완전히 가려짐 |
| `'transparentModal'` | 배경 투명 (오버레이 효과) |

---

## 6. 화면 전환 방법: router vs Link

### useRouter 훅 (명령형)

```tsx
import { useRouter } from 'expo-router';

const router = useRouter();

// 스택에 추가 (이전 화면 유지)
router.push('/stacks/yongjun1-detail');

// 파라미터와 함께 이동
router.push({
  pathname: '/stacks/yongjun1-detail',
  params: { userName: '홍용준', age: '25' },
});

// 현재 화면을 교체 (이전 화면 제거)
router.replace('/other-screen');

// 이전 화면으로 돌아가기
router.back();
```

### Link 컴포넌트 (선언형)

```tsx
import { Link } from 'expo-router';

// 기본 링크
<Link href="/stacks/yongjun1-detail">
  <Text>프로필 상세 보기</Text>
</Link>

// 파라미터 포함
<Link href={{ pathname: '/stacks/yongjun1-detail', params: { userName: '홍용준' } }}>
  <Text>이동</Text>
</Link>
```

### useRouter vs Link 언제 쓸까?

| 상황 | 추천 |
|------|------|
| 버튼 클릭 후 조건 분기 필요 | `useRouter` |
| 로그인 확인 후 이동 | `useRouter` |
| 단순한 터치 가능한 링크 | `Link` |
| 외부 URL 열기 | `Link` |
| 네비게이션 로직이 복잡한 경우 | `useRouter` |

---

## 7. 파라미터 전달: useLocalSearchParams

화면 간 데이터를 전달하고 받는 방법입니다.

### 보내기 (router.push)

```tsx
router.push({
  pathname: '/stacks/yongjun1-detail',
  params: {
    userName: '홍용준',
    age: 25,           // ⚠️ 숫자도 문자열로 변환되어 전달됨!
    isAdmin: true,     // ⚠️ boolean도 문자열 "true"로 전달됨!
  },
});
```

### 받기 (useLocalSearchParams)

```tsx
import { useLocalSearchParams } from 'expo-router';

const { userName, age, isAdmin } = useLocalSearchParams<{
  userName: string;
  age: string;       // 숫자도 string으로 받아야 함
  isAdmin: string;   // boolean도 string으로 받아야 함
}>();

// 타입 변환이 필요한 경우
const ageNumber = Number(age);          // "25" → 25
const isAdminBool = isAdmin === 'true'; // "true" → true
```

### ⚠️ 중요: 파라미터는 항상 문자열

모든 파라미터는 URL 쿼리스트링처럼 **문자열(string)로 직렬화**되어 전달됩니다.
숫자, boolean, 배열 등은 전달 시 문자열로 변환되므로, **받는 쪽에서 다시 변환**해야 합니다.

### useLocalSearchParams vs useGlobalSearchParams

```tsx
// useLocalSearchParams: 현재 화면에 직접 전달된 파라미터만 접근
const { id } = useLocalSearchParams();

// useGlobalSearchParams: 중첩된 네비게이터 어디서든 전역 파라미터 접근
// (탭 내부 화면에서 상위 스택 파라미터에 접근할 때 사용)
const { id } = useGlobalSearchParams();
```

---

## 8. router.back() — 뒤로 가기

### 기본 사용

```tsx
import { useRouter } from 'expo-router';

const router = useRouter();

// 스택에서 현재 화면 제거 → 이전 화면으로 복귀
const handleGoBack = () => {
  router.back();
};
```

### 동작 원리

```
[탭 화면] ← router.back() ← [스택 화면 A] ← router.back() ← [스택 화면 B]
```

- 스택의 맨 앞 화면을 제거합니다
- 스택에 화면이 하나뿐이면 아무 일도 일어나지 않습니다
- 헤더의 기본 뒤로가기 버튼도 내부적으로 `router.back()`을 호출합니다
- expo-router 모달에서도 동일하게 `router.back()`으로 닫습니다

### 뒤로 갈 수 있는지 확인

```tsx
import { useNavigationState } from '@react-navigation/native';

// 스택에 화면이 2개 이상이면 뒤로가기 가능
const canGoBack = router.canGoBack(); // expo-router에서 제공
```

---

## 9. useFocusEffect — 화면 포커스 감지

### 개념

화면이 **포커스(활성화)될 때마다** 실행되는 사이드 이펙트 훅입니다.

### useEffect와의 차이

```
useEffect(() => {}, [])  → 컴포넌트 최초 마운트 시 1회만 실행
useFocusEffect(cb)       → 화면이 포커스될 때마다 실행 (탭 전환 포함)
```

### 사용법

```tsx
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

useFocusEffect(
  useCallback(() => {
    // 화면 포커스 시 실행 (탭을 눌러 돌아올 때도 실행됨)
    console.log('화면이 활성화됨 - 데이터 갱신');
    fetchLatestData(); // API 재호출 등

    return () => {
      // 화면 언포커스 시 실행 (다른 탭으로 이동 시)
      console.log('화면이 비활성화됨');
      cancelRequest(); // 진행 중인 요청 취소 등
    };
  }, []) // ← useCallback 의존성 배열 (빈 배열 = 콜백 재생성 안 함)
);
```

### ⚠️ 반드시 useCallback으로 감싸야 하는 이유

```tsx
// ❌ 잘못된 예 — 무한 루프 발생!
useFocusEffect(() => {
  fetchData();
});

// ✅ 올바른 예
useFocusEffect(
  useCallback(() => {
    fetchData();
    return () => {};
  }, []) // 의존성이 변하지 않으면 함수가 재생성되지 않음
);
```

`useCallback` 없이 사용하면 매 렌더링마다 새 함수가 생성 → useFocusEffect가 다시 실행 → 무한 루프!

### 실제 활용 예시

```tsx
// ✅ 탭으로 돌아올 때 최신 데이터 로드
useFocusEffect(
  useCallback(() => {
    // 알림 목록 새로고침
    fetchNotifications();

    // 타이머 시작
    const timer = setInterval(fetchNotifications, 30000);

    return () => {
      // 다른 탭으로 이동하면 타이머 정지 (불필요한 API 호출 방지)
      clearInterval(timer);
    };
  }, [])
);
```

---

## 10. 이 앱의 전체 화면 구조

```
app/
├── _layout.tsx               ← 루트 Stack 네비게이터
│                                (모든 스택/모달 화면 등록)
│
├── (tabs)/                   ← 탭 그룹 (URL에 포함 안 됨)
│   ├── _layout.tsx           ← 탭 네비게이터 (6개 탭 정의)
│   ├── yongjun1.tsx          ← 용준1 탭: 팝업 모달 + 스택
│   ├── yongjun2.tsx          ← 용준2 탭: 풀스크린 모달 + 스택
│   ├── seoyeong1.tsx         ← 서영1 탭: 바텀시트 모달 + 스택
│   ├── seoyeong2.tsx         ← 서영2 탭: Router 모달 + 스택
│   ├── eunseo1.tsx           ← 은서1 탭: 알럿 다이얼로그 + 스택
│   └── eunseo2.tsx           ← 은서2 탭: Router 풀스크린 모달 + 스택
│
├── stacks/                   ← 스택 화면들
│   ├── yongjun1-detail.tsx   ← 프로필 상세 편집
│   ├── yongjun2-detail.tsx   ← 레시피 재료 & 조리법
│   ├── seoyeong1-detail.tsx  ← 여행지 상세 정보
│   ├── seoyeong2-detail.tsx  ← 아티스트 상세 정보
│   ├── eunseo1-detail.tsx    ← 주간 날씨 예보
│   └── eunseo2-detail.tsx    ← 책 상세 & 리뷰
│
├── modals/                   ← expo-router 모달 화면들
│   ├── seoyeong2-modal.tsx   ← 음악 설정 (presentation: modal)
│   └── eunseo2-modal.tsx     ← 독서 기록 작성 (presentation: fullScreenModal)
│
└── README.md                 ← 이 파일
```

### 네비게이션 흐름 요약

```
탭 화면
  │
  ├─ [모달 버튼] ──→ Modal (6가지 방식)
  │                    └─ 닫기 → 탭으로 복귀
  │
  └─ [스택 버튼] ──→ router.push('/stacks/xxx-detail', { params })
                       ├─ useLocalSearchParams()로 파라미터 수신
                       └─ router.back() → 탭으로 복귀
```

---

## 11. 자주 하는 실수 & 주의사항

### ❌ Tabs.Screen의 name이 파일명과 다른 경우

```tsx
// ❌ 파일명: yongjun1.tsx  →  name이 달라서 탭이 작동 안 함
<Tabs.Screen name="home" ... />

// ✅ 파일명과 일치시켜야 함
<Tabs.Screen name="yongjun1" ... />
```

### ❌ useFocusEffect를 useCallback 없이 사용

```tsx
// ❌ 무한 루프 발생!
useFocusEffect(() => { fetchData(); });

// ✅ 반드시 useCallback 사용
useFocusEffect(useCallback(() => { fetchData(); }, []));
```

### ❌ 파라미터를 숫자/boolean으로 받으려 할 때

```tsx
// ❌ 파라미터는 항상 string으로 옴
const { age } = useLocalSearchParams(); // age = "25" (string)
console.log(age + 1); // "251" (문자열 연결!)

// ✅ 명시적으로 변환
const ageNum = Number(age); // 25 (number)
```

### ❌ _layout.tsx에 스택 화면을 등록하지 않은 경우

```tsx
// router.push()를 해도 화면이 안 뜨거나 에러 발생
// → app/_layout.tsx의 <Stack>에 반드시 등록해야 함
<Stack.Screen name="stacks/my-screen" options={{ title: '...' }} />
```

### ❌ Modal의 onRequestClose를 처리하지 않은 경우

```tsx
// ❌ 안드로이드에서 경고 발생
<Modal visible={visible}>...</Modal>

// ✅ 안드로이드 하드웨어 뒤로가기 처리
<Modal visible={visible} onRequestClose={() => setVisible(false)}>
  ...
</Modal>
```

---

## 📚 추가 학습 자료

- [Expo Router 공식 문서](https://docs.expo.dev/router/introduction/)
- [React Navigation 공식 문서](https://reactnavigation.org/)
- [React Native 공식 문서](https://reactnative.dev/)

---

*이 README는 `app/README.md`에 위치합니다.*
