# React Hooks 학습 문서

> 이 문서는 React Native 프로젝트에서 React Hooks를 학습하기 위한 종합 가이드입니다.
> 지난 시간에 배운 Navigation(Stack, Tab, Modal)에 이어, 이번에는 **컴포넌트 내부의 상태와 동작**을 다룹니다.

---

## 목차

1. [Hooks란 무엇인가?](#1-hooks란-무엇인가)
2. [React Native에서의 Hooks](#2-react-native에서의-hooks)
3. [Hooks 이전에 알아야 할 기초 개념](#3-hooks-이전에-알아야-할-기초-개념)
4. [React Hooks 전체 목록](#4-react-hooks-전체-목록)
5. [핵심 Hooks 상세 학습](#5-핵심-hooks-상세-학습)
6. [useState 심화 — Props Drilling, Lifting State Up, Modal 연동](#6-usestate-심화)
7. [useEffect 다양한 활용 예시](#7-useeffect-다양한-활용-예시)
8. [전역 상태 관리로의 연결 — Zustand, Redux](#8-전역-상태-관리로의-연결)
9. [실습 가이드](#9-실습-가이드)
10. [실습 예제 아이디어](#10-실습-예제-아이디어)

---

## 1. Hooks란 무엇인가?

### 한 줄 요약

> **Hooks = 함수형 컴포넌트에서 상태(state)와 부수효과(side effect)를 사용할 수 있게 해주는 특별한 함수들**

### Hooks의 본질 — 왜 "Hook(갈고리)"인가?

"Hook"이라는 이름은 **React의 내부 기능에 "갈고리를 걸어서" 끌어다 쓴다**는 의미입니다.

React 내부에는 상태 관리, 생명주기 추적, 렌더링 최적화 같은 강력한 기능들이 있습니다.
원래 이 기능들은 클래스 컴포넌트에서만 접근할 수 있었는데,
Hooks가 등장하면서 **함수형 컴포넌트에서도 이 기능들에 "갈고리를 걸어" 사용**할 수 있게 되었습니다.

```
React 내부 시스템
┌──────────────────────────────────┐
│  상태 관리 시스템                    │ ← useState가 갈고리를 검
│  생명주기 추적 시스템                │ ← useEffect가 갈고리를 검
│  참조 저장 시스템                    │ ← useRef가 갈고리를 검
│  컨텍스트 시스템                     │ ← useContext가 갈고리를 검
│  메모이제이션 시스템                 │ ← useMemo/useCallback이 갈고리를 검
└──────────────────────────────────┘
         ↑ 갈고리(Hook)로 연결
┌──────────────────────────────────┐
│  우리가 작성하는 함수형 컴포넌트       │
│  function MyComponent() { ... }  │
└──────────────────────────────────┘
```

즉, 각 Hook은 **React 내부의 특정 기능 하나에 접근하는 전용 통로**입니다:

- `useState` → "상태를 기억하고 변경할 때 화면을 다시 그려줘"
- `useEffect` → "이 컴포넌트가 나타나거나 바뀔 때 이 작업을 실행해줘"
- `useRef` → "렌더링과 무관하게 이 값을 계속 기억해줘"

### Hooks가 해결한 문제

Hooks가 없던 시절, 함수형 컴포넌트는 props를 받아서 JSX를 반환하는 것밖에 못 했습니다.
"버튼을 눌렀을 때 숫자가 올라가는 것"조차 함수형 컴포넌트로는 불가능했습니다.

```jsx
// ❌ Hooks 이전 — 함수형 컴포넌트의 한계
function Counter() {
  let count = 0;           // 일반 변수는 렌더링할 때마다 0으로 초기화됨!
  return (
    <View>
      <Text>{count}</Text>  {/* 항상 0 */}
      <Button onPress={() => { count += 1 }} />  {/* 바꿔도 화면에 반영 안 됨 */}
    </View>
  );
}
// → 상태 유지가 안 되니까 "클래스 컴포넌트"를 써야 했음
```

```jsx
// ❌ 옛날 방식 — 클래스 컴포넌트 (복잡하고 어려움)
class Counter extends React.Component {
  state = { count: 0 };

  componentDidMount() {
    console.log('화면에 나타남');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('count 변경됨');
    }
  }

  componentWillUnmount() {
    console.log('화면에서 사라짐');
  }

  render() {
    return (
      <View>
        <Text>{this.state.count}</Text>
        <Button onPress={() => this.setState({ count: this.state.count + 1 })} />
      </View>
    );
  }
}
```

```jsx
// ✅ 현재 방식 — 함수형 컴포넌트 + Hooks (간결하고 직관적)
function Counter() {
  const [count, setCount] = useState(0);      // React가 이 값을 기억해줌!

  useEffect(() => {
    console.log('화면에 나타남 또는 count 변경됨');
    return () => console.log('정리 작업');
  }, [count]);

  return (
    <View>
      <Text>{count}</Text>
      <Button onPress={() => setCount(count + 1)} />
      {/* setCount 호출 → React가 새 값으로 기억 → 컴포넌트 다시 실행 → 화면 업데이트 */}
    </View>
  );
}
```

**Hooks 덕분에:**

- 일반 변수와 달리 **렌더링 사이에도 값이 유지**됨 (useState)
- 값이 바뀌면 **자동으로 화면이 업데이트**됨 (useState의 setState)
- 컴포넌트의 **생명주기(나타남/업데이트/사라짐)에 반응**할 수 있음 (useEffect)
- 이 모든 것이 **짧고 읽기 쉬운 함수** 안에서 가능

### Hooks의 동작 원리 — React가 기억하는 방식

```jsx
function MyComponent() {
  const [name, setName] = useState('용준');    // Hook 호출 #1
  const [age, setAge] = useState(20);          // Hook 호출 #2
  const inputRef = useRef(null);               // Hook 호출 #3
  // ...
}
```

React는 내부적으로 이 컴포넌트의 Hook들을 **호출 순서대로 배열에 저장**합니다:

```
MyComponent의 Hook 저장소:
[0] → useState('용준')  → { state: '용준', setState: setName }
[1] → useState(20)      → { state: 20, setState: setAge }
[2] → useRef(null)      → { current: null }
```

컴포넌트가 리렌더링되면 함수가 다시 실행되는데,
React는 **같은 순서의 Hook에 저장된 값을 다시 꺼내줍니다**:

```
첫 렌더링:  useState('용준') → '용준' 저장, 반환
두번째 렌더링: useState('용준') → 초기값 무시, 저장된 '용준' 반환
setName('서영') 호출 후 렌더링: useState('용준') → 초기값 무시, 저장된 '서영' 반환
```

> **이것이 바로 Hooks를 조건문이나 반복문 안에서 호출하면 안 되는 이유입니다!**
> 순서가 바뀌면 React가 어떤 Hook에 어떤 값을 돌려줘야 하는지 혼동합니다.

### Hooks의 핵심 규칙 (반드시 지키기!)


| 규칙                | 설명                           | 예시                        |
| ----------------- | ---------------------------- | ------------------------- |
| **최상위에서만 호출**     | if문, for문, 중첩 함수 안에서 호출 금지   | `if (x) { useState() }` ❌ |
| **함수형 컴포넌트 안에서만** | 일반 JS 함수에서 사용 불가             | 커스텀 Hook(`useXxx`)은 가능    |
| **이름은 use로 시작**   | 커스텀 Hook을 만들 때 반드시 `use` 접두사 | `useCounter`, `useAuth`   |


```jsx
// ❌ 잘못된 사용 — 조건문 안에서 Hook 호출
function BadExample() {
  if (someCondition) {
    const [value, setValue] = useState(0); // 🚫 에러!
    // someCondition이 false면 이 Hook이 건너뛰어짐
    // → React의 Hook 순서가 어긋남 → 버그 발생!
  }
}

// ✅ 올바른 사용 — 최상위에서 호출 후 조건부 로직
function GoodExample() {
  const [value, setValue] = useState(0); // ✅ 항상 실행됨

  if (someCondition) {
    // value를 사용하는 로직 (Hook 호출이 아닌 일반 로직은 OK)
  }
}
```

---

## 2. React Native에서의 Hooks

### React Hooks = React Native Hooks

React Native는 React 위에 만들어진 프레임워크이므로, **React의 모든 Hooks를 그대로 사용**합니다.

```
React Hooks (useState, useEffect, useRef, ...)
    ↓ 그대로 사용
React Native (View, Text, Button, ...)
    ↓ 그대로 사용
Expo (expo-router, expo-camera, ...)
```

### React Native / Expo에서 추가로 사용하는 Hooks


| Hook                   | 출처           | 용도                          |
| ---------------------- | ------------ | --------------------------- |
| `useWindowDimensions`  | react-native | 화면 크기(width/height) 가져오기    |
| `useColorScheme`       | react-native | 다크모드/라이트모드 감지               |
| `useRouter`            | expo-router  | 화면 이동 (push, back, replace) |
| `useLocalSearchParams` | expo-router  | URL 파라미터 수신                 |
| `useFocusEffect`       | expo-router  | 탭 포커스 시 실행 (지난 시간 배움!)      |
| `useSegments`          | expo-router  | 현재 URL 세그먼트 확인              |


> 지난 시간에 이미 `useRouter`, `useLocalSearchParams`, `useFocusEffect`를 사용해 봤습니다!
> 이것들도 모두 **Hook**이었습니다.

---

## 3. Hooks 이전에 알아야 할 기초 개념

Hooks를 제대로 이해하려면 아래 개념들을 먼저 정리해야 합니다.

### 3-1. 컴포넌트 (Component)

> **컴포넌트 = 화면의 부품. JSX를 반환하는 함수.**

```jsx
// 이것이 하나의 "컴포넌트"
function Greeting() {
  return <Text>안녕하세요!</Text>;
}

// 다른 컴포넌트 안에서 재사용
function App() {
  return (
    <View>
      <Greeting />     {/* 컴포넌트를 태그처럼 사용 */}
      <Greeting />     {/* 여러 번 재사용 가능 */}
    </View>
  );
}
```

### 3-2. Props (속성)

> **Props = 부모가 자식에게 전달하는 읽기 전용 데이터**

```jsx
// 부모 컴포넌트
function Parent() {
  return <Child name="용준" age={20} />;
  //             ^^^^^^^^  ^^^^^^
  //             props로 전달!
}

// 자식 컴포넌트 — props를 매개변수로 받음
function Child({ name, age }) {
  return <Text>{name}은 {age}살입니다.</Text>;
  // ⚠ props는 읽기 전용! name = "다른이름" ← 불가능!
}
```

**핵심 특성:**

- 부모 → 자식 방향으로만 전달 (**단방향 데이터 흐름**)
- 자식은 받은 props를 **수정할 수 없음** (읽기 전용)
- 부모가 props를 바꾸면 자식이 **자동으로 다시 렌더링**됨

#### 부모가 props를 바꾸면 자식이 왜 다시 렌더링되는가?

React의 리렌더링은 **위에서 아래로 전파**됩니다. 정확한 동작 순서는 다음과 같습니다:

```
1. 부모의 state가 변경됨 (예: setName("서영") 호출)
2. → 부모 컴포넌트 함수가 다시 실행됨 (리렌더링)
3. → 부모의 return문에서 <Child name={name} /> 를 다시 평가
4. → 이때 name은 새로운 값 "서영"
5. → React가 자식 컴포넌트도 새 props로 다시 실행 (리렌더링)
```

```jsx
function Parent() {
  const [name, setName] = useState('용준');
  // setName('서영') 호출 시:
  // 1. Parent 함수 전체가 다시 실행됨
  // 2. name = '서영'으로 바뀐 상태
  // 3. 아래 JSX에서 Child에 '서영'이 전달됨
  // 4. Child도 다시 실행되어 '서영은 20살입니다.' 표시

  return <Child name={name} age={20} />;
}

function Child({ name, age }) {
  // 부모가 리렌더링되면 이 함수도 다시 실행됨
  console.log('Child 렌더링됨! name:', name);
  return <Text>{name}은 {age}살입니다.</Text>;
}
```

**핵심 규칙:**

> 부모 컴포넌트가 리렌더링되면, **그 안에 포함된 모든 자식 컴포넌트도 기본적으로 리렌더링됩니다.**
> props가 실제로 바뀌지 않았더라도 리렌더링됩니다!
> (이를 방지하려면 `React.memo`를 사용해야 하는데, 이는 성능 최적화 주제에서 다룹니다)

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Button onPress={() => setCount(count + 1)} title="클릭" />
      {/* count가 바뀌면 Parent가 리렌더링 →
          Child도 리렌더링됨 (name props는 안 바뀌었는데도!) */}
      <Child name="용준" />
    </View>
  );
}
```

### 3-3. State (상태)

> **State = 컴포넌트가 스스로 관리하는, 변할 수 있는 데이터**

```jsx
function Counter() {
  // [현재값, 변경함수] = useState(초기값)
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>카운트: {count}</Text>
      <Button title="+1" onPress={() => setCount(count + 1)} />
      {/* setCount 호출 → count 변경 → 화면 자동 업데이트 */}
    </View>
  );
}
```

**Props vs State 비교:**


| 구분     | Props   | State          |
| ------ | ------- | -------------- |
| 누가 관리? | 부모 컴포넌트 | 자기 자신          |
| 수정 가능? | ❌ 읽기 전용 | ✅ setState로 변경 |
| 방향     | 부모 → 자식 | 컴포넌트 내부        |
| 변경 시   | 자식 리렌더링 | 자기 자신 리렌더링     |


#### State를 Props로 전달하기

State와 Props는 서로 다른 개념이지만, **부모의 state를 자식에게 props로 전달할 수 있습니다.**
실제로 이것이 React에서 가장 흔한 데이터 전달 패턴입니다:

```jsx
function Parent() {
  // 부모의 state
  const [userName, setUserName] = useState('용준');

  return (
    <View>
      <TextInput value={userName} onChangeText={setUserName} />
      {/* 부모의 state인 userName을 자식의 props인 name으로 전달 */}
      <Child name={userName} />
    </View>
  );
}

function Child({ name }) {
  // name은 이 컴포넌트 입장에서는 "props" (읽기 전용)
  // 하지만 원래는 부모의 "state"
  // → 부모에서 userName이 바뀌면 이 name도 바뀜 → Child 리렌더링
  return <Text>안녕, {name}!</Text>;
}
```

```
Parent의 state: userName = '용준'
    ↓ props로 전달
Child의 props: name = '용준'  (읽기 전용)

사용자가 TextInput에 '서영' 입력
→ setUserName('서영') 호출
→ Parent의 state 변경 → Parent 리렌더링
→ <Child name={'서영'} /> 다시 평가
→ Child도 리렌더링 → "안녕, 서영!" 표시
```

### 3-4. 리렌더링 (Re-rendering)

> **리렌더링 = state나 props가 바뀌면 컴포넌트 함수가 다시 실행되는 것**

```
사용자가 버튼 클릭
  → setCount(count + 1) 호출
  → state가 변경됨
  → React가 컴포넌트 함수를 다시 실행 (리렌더링)
  → 새로운 JSX 생성
  → 화면에 반영
```

⚠ **리렌더링 ≠ 화면 전체 새로고침**
React는 변경된 부분만 효율적으로 업데이트합니다 (Virtual DOM).

#### State 변경의 전파 — 자식에서 부모의 state를 바꾸면?

앞서 부모의 state를 자식에게 props로 전달할 수 있다고 했습니다.
그런데 만약 **자식 컴포넌트에서 부모의 state를 변경**하면 어떻게 될까요?

부모의 state 변경 함수(setState)도 props로 전달할 수 있습니다.
이 경우, 자식이 호출한 setState가 **부모의 state를 변경**하고,
결과적으로 **부모부터 시작하여 하위 전체가 리렌더링**됩니다.

```jsx
function Parent() {
  const [score, setScore] = useState(0);

  return (
    <View>
      <Text>부모 화면 — 현재 점수: {score}</Text>
      {/* state 변경 함수를 자식에게 props로 전달 */}
      <Child score={score} onScoreChange={setScore} />
      <AnotherChild score={score} />
    </View>
  );
}

function Child({ score, onScoreChange }) {
  return (
    <Button
      title={`점수: ${score} (클릭하여 +1)`}
      onPress={() => onScoreChange(score + 1)}
      // ↑ 자식에서 부모의 setScore를 호출!
    />
  );
}

function AnotherChild({ score }) {
  return <Text>다른 자식도 같은 점수를 봄: {score}</Text>;
}
```

```
리렌더링 전파 흐름:

1. Child에서 onScoreChange(1) 호출 (= 부모의 setScore(1))
2. → Parent의 score state가 0 → 1로 변경
3. → Parent 리렌더링 (score = 1)
4. → Parent 안의 모든 자식도 리렌더링
     → Child 리렌더링 (새 score props: 1)
     → AnotherChild 리렌더링 (새 score props: 1)
5. → 모든 화면이 업데이트된 점수를 표시

핵심: state의 "소유자"인 Parent부터 리렌더링이 시작되어 아래로 전파!
```

> **이 패턴을 "Lifting State Up(상태 끌어올리기)"이라고 합니다.**
> 6장에서 더 자세히 다룹니다.

### 3-5. Virtual DOM — React Native의 화면 업데이트 방식

> **Virtual DOM = 실제 화면을 직접 바꾸는 대신, 가상의 복사본에서 변경점을 계산한 후 최소한의 변경만 적용하는 방식**

#### 왜 Virtual DOM이 필요한가?

화면(UI)을 직접 수정하는 것은 비용이 큰 작업입니다.
예를 들어, 1000개의 리스트 중 1개만 바뀌었는데 전체를 다시 그리면 매우 비효율적입니다.
React는 이 문제를 Virtual DOM으로 해결합니다.

#### 작동 방식 (3단계)

```
[1단계: 가상 트리 생성]
state/props 변경 → 컴포넌트 함수 다시 실행 → 새로운 Virtual DOM 트리 생성

[2단계: 비교 (Diffing)]
이전 Virtual DOM vs 새 Virtual DOM을 비교하여 "뭐가 바뀌었는지" 찾음

[3단계: 최소 업데이트 (Reconciliation)]
실제로 바뀐 부분만 네이티브 화면에 적용
```

#### React Native에서의 구체적 흐름

```
[React Native 렌더링 파이프라인]

1. JavaScript 스레드:
   컴포넌트 함수 실행 → JSX 생성 → Virtual DOM 트리 생성

2. Diffing (비교):
   이전 Virtual DOM        새 Virtual DOM
   ┌─ View ─┐              ┌─ View ─┐
   │ Text:"0" │    비교→    │ Text:"1" │  ← 여기만 다름!
   │ Button   │             │ Button   │
   └──────────┘             └──────────┘

3. Bridge / Fabric:
   변경된 부분만 네이티브 측에 전달
   "Text의 내용을 '0'에서 '1'로 바꿔줘"

4. 네이티브 스레드:
   실제 iOS UILabel / Android TextView 업데이트
```

**React(웹)과 React Native의 차이:**


| 구분             | React (웹)            | React Native                   |
| -------------- | -------------------- | ------------------------------ |
| Virtual DOM 비교 | 동일                   | 동일                             |
| 실제 업데이트 대상     | HTML DOM (div, span) | 네이티브 위젯 (UIView, Android View) |
| 렌더링 엔진         | 브라우저 렌더러             | Fabric (네이티브 렌더러)              |


> **핵심:** Virtual DOM 덕분에 `setCount(count + 1)` 한 번 호출했을 때,
> 전체 화면을 다시 그리는 것이 아니라 **Text의 숫자 "0" → "1"만 교체**됩니다.
> 나머지 View, Button 등은 그대로 유지됩니다.

### 3-6. 생명주기 (Lifecycle)

> **생명주기 = 컴포넌트가 화면에 나타나고, 업데이트되고, 사라지는 과정**

```
[마운트]         [업데이트]           [언마운트]
화면에 나타남  →  state/props 변경  →  화면에서 사라짐
                  → 리렌더링
```

Hooks에서는 `useEffect`로 생명주기를 다룹니다:

```jsx
useEffect(() => {
  // 마운트 시 실행 (화면에 나타날 때)
  console.log('나타남!');

  return () => {
    // 언마운트 시 실행 (화면에서 사라질 때) — 정리 함수
    console.log('사라짐!');
  };
}, []); // [] = 마운트/언마운트 시에만
```

### 3-7. 부수효과 (Side Effect)

> **부수효과 = 컴포넌트의 "렌더링" 외의 모든 작업**

렌더링 = JSX를 반환하는 것. 그 외 작업은 전부 "부수효과":

- API 호출 (데이터 가져오기)
- 타이머 설정 (setTimeout, setInterval)
- 이벤트 리스너 등록 (키보드, 스크롤)
- 로컬 스토리지 접근
- console.log

→ 이런 작업들은 `useEffect` 안에서 처리합니다.

---

## 4. React Hooks 전체 목록

### 카테고리별 정리

#### 🟢 필수 (거의 모든 컴포넌트에서 사용)


| Hook          | 한 줄 설명                  | 사용 빈도 |
| ------------- | ----------------------- | ----- |
| **useState**  | 컴포넌트의 상태(변하는 값)를 만들고 관리 | ★★★★★ |
| **useEffect** | 마운트/업데이트/언마운트 시 부수효과 실행 | ★★★★★ |


#### 🟡 자주 사용 (필요할 때 가져다 씀)


| Hook            | 한 줄 설명                      | 사용 빈도 |
| --------------- | --------------------------- | ----- |
| **useRef**      | 리렌더링 없이 값 저장 / DOM 요소 접근    | ★★★★☆ |
| **useCallback** | 함수를 메모이제이션 (불필요한 재생성 방지)    | ★★★☆☆ |
| **useMemo**     | 계산 결과를 메모이제이션 (불필요한 재계산 방지) | ★★★☆☆ |
| **useContext**  | 전역 데이터를 props 없이 받아오기       | ★★★☆☆ |


#### 🟠 특수 상황


| Hook                    | 한 줄 설명                        | 사용 빈도 |
| ----------------------- | ----------------------------- | ----- |
| **useReducer**          | 복잡한 상태 로직을 reducer 패턴으로 관리    | ★★☆☆☆ |
| **useImperativeHandle** | 부모가 자식 컴포넌트의 메서드를 직접 호출       | ★☆☆☆☆ |
| **useLayoutEffect**     | useEffect와 비슷하지만 화면 그리기 전에 실행 | ★☆☆☆☆ |


#### ⚪ 거의 사용 안 함


| Hook                 | 한 줄 설명                       |
| -------------------- | ---------------------------- |
| useDebugValue        | 커스텀 Hook 디버깅 라벨 (개발자 도구용)    |
| useId                | 서버/클라이언트 일관된 고유 ID 생성        |
| useDeferredValue     | 긴급하지 않은 UI 업데이트 지연           |
| useTransition        | UI 전환 중 로딩 상태 관리             |
| useSyncExternalStore | 외부 저장소 구독 (라이브러리 제작용)        |
| useInsertionEffect   | CSS-in-JS 라이브러리용 (거의 쓸 일 없음) |


> **이번 학습에서 집중할 Hooks:**
> `useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`, `useContext`, `useReducer`

---

## 5. 핵심 Hooks 상세 학습

### 5-1. useState — 상태 관리의 기본

#### 기본 사용법

```jsx
const [값, 값변경함수] = useState(초기값);
```

```jsx
function Profile() {
  const [name, setName] = useState('');        // 문자열 상태
  const [age, setAge] = useState(0);           // 숫자 상태
  const [isStudent, setIsStudent] = useState(true);  // boolean 상태
  const [hobbies, setHobbies] = useState([]);  // 배열 상태
  const [user, setUser] = useState({           // 객체 상태
    name: '',
    email: '',
  });

  return (
    <View>
      <TextInput value={name} onChangeText={setName} />
      <Text>이름: {name}</Text>
    </View>
  );
}
```

#### React의 얕은 비교 (Shallow Comparison)

불변성을 이해하기 전에, React가 **state 변경을 어떻게 감지하는지** 먼저 알아야 합니다.

React는 `setState`가 호출되면 **이전 state와 새 state를 `Object.is()`로 비교**합니다.
이 비교는 **값의 내용이 아니라 메모리 주소(참조)**를 비교합니다. 이것을 **얕은 비교(Shallow Comparison)**라고 합니다.

```
[원시 타입 (숫자, 문자열, boolean)]
Object.is(0, 0)         → true  (같은 값 → 리렌더링 안 함)
Object.is(0, 1)         → false (다른 값 → 리렌더링!)
Object.is('용준', '용준') → true  (같은 값 → 리렌더링 안 함)

[참조 타입 (객체, 배열)]
const arr = [1, 2, 3];
arr.push(4);             // 내용은 [1,2,3,4]로 바뀜
Object.is(arr, arr)      → true  (같은 메모리 주소 → 리렌더링 안 함! 😱)

const newArr = [...arr, 4];  // 새 배열 생성
Object.is(arr, newArr)   → false (다른 메모리 주소 → 리렌더링!)
```

```
쉽게 비유하면:

원시 타입은 "값"을 비교:
  "용준" === "용준" → 같다!
  0 === 1 → 다르다!

참조 타입은 "주소"를 비교 (내용이 아님!):
  집A의 주소 === 집A의 주소 → 같다! (집 안 가구가 바뀌어도 주소는 같음)
  집A의 주소 === 집B의 주소 → 다르다! (내용이 똑같아도 주소가 다르면 다름)
```

> **이것이 배열이나 객체 state를 직접 수정하면 안 되는 핵심 이유입니다.**
> 직접 수정하면 메모리 주소가 바뀌지 않아서 React가 "변화 없음"으로 판단합니다.

#### 불변성 규칙 (매우 중요!)

> **state를 직접 수정하면 안 된다! 반드시 setState 함수로 새 값을 전달해야 한다.**

```jsx
// ❌ 직접 수정 — 화면이 업데이트되지 않음!
const [items, setItems] = useState(['사과', '바나나']);
// 현재 state: ['사과', '바나나']   (메모리 주소: 0x001)

items.push('포도');
// 배열 내용: ['사과', '바나나', '포도']
// 하지만 메모리 주소는 여전히: 0x001

setItems(items);
// React: Object.is(0x001, 0x001) → true → "바뀐 거 없네" → 리렌더링 안 함!
// 결과 state: 내부적으로는 ['사과', '바나나', '포도']이지만 화면에 반영 안 됨!
```

```jsx
// ✅ 새 배열을 만들어서 교체
const [items, setItems] = useState(['사과', '바나나']);
// 현재 state: ['사과', '바나나']   (메모리 주소: 0x001)

setItems([...items, '포도']);
// 새 배열 생성: ['사과', '바나나', '포도']  (메모리 주소: 0x002)
// React: Object.is(0x001, 0x002) → false → "바뀌었다!" → 리렌더링!
// 결과 state: ['사과', '바나나', '포도'] ✅ 화면에 반영됨!
```

```jsx
// ✅ 객체의 경우도 마찬가지
const [user, setUser] = useState({ name: '용준', age: 20 });
// 현재 state: { name: '용준', age: 20 }   (메모리 주소: 0x003)

// ❌ 직접 수정
user.age = 21;
setUser(user);
// React: Object.is(0x003, 0x003) → true → 리렌더링 안 함!
// 결과 state: 화면에는 여전히 age: 20으로 보임

// ✅ 새 객체 생성
setUser({ ...user, age: 21 });
// 새 객체 생성: { name: '용준', age: 21 }  (메모리 주소: 0x004)
// React: Object.is(0x003, 0x004) → false → 리렌더링!
// 결과 state: { name: '용준', age: 21 } ✅ 화면에 age: 21 반영됨!
```

**배열 state 조작 패턴 정리:**

```jsx
const [items, setItems] = useState(['사과', '바나나', '포도']);

// 추가
setItems([...items, '딸기']);
// 결과: ['사과', '바나나', '포도', '딸기']

// 삭제 (인덱스 1의 '바나나' 제거)
setItems(items.filter((_, index) => index !== 1));
// 결과: ['사과', '포도']

// 수정 (인덱스 0의 '사과' → '수박')
setItems(items.map((item, index) => index === 0 ? '수박' : item));
// 결과: ['수박', '바나나', '포도']
```

#### 함수형 업데이트

이전 state에 기반하여 업데이트할 때는 **함수형 업데이트**를 사용합니다:

```jsx
// ⚠ 주의가 필요한 경우 — 원시 타입
const [count, setCount] = useState(0);

// 빠르게 두 번 클릭하면?
setCount(count + 1);  // count = 0이라면 → 1
setCount(count + 1);  // count = 여전히 0 → 1 (의도: 2)
// 결과 state: 1 (의도한 2가 아님!)

// ✅ 함수형 업데이트 — 항상 최신 값 기반
setCount(prev => prev + 1);  // prev = 0 → 1
setCount(prev => prev + 1);  // prev = 1 → 2 ✅
// 결과 state: 2
```

```jsx
// ✅ 함수형 업데이트 — 객체 state인 경우
const [user, setUser] = useState({ name: '용준', age: 20, score: 0 });

// 여러 필드를 순차적으로 업데이트할 때
setUser(prev => ({ ...prev, age: prev.age + 1 }));
// prev = { name: '용준', age: 20, score: 0 }
// 결과: { name: '용준', age: 21, score: 0 }

setUser(prev => ({ ...prev, score: prev.score + 10 }));
// prev = { name: '용준', age: 21, score: 0 }  (위의 업데이트가 반영된 최신 값)
// 결과: { name: '용준', age: 21, score: 10 }

// 배열 state에서 함수형 업데이트
const [todos, setTodos] = useState([
  { id: 1, text: '공부', done: false },
  { id: 2, text: '운동', done: false },
]);

// 특정 todo의 done 토글
setTodos(prev =>
  prev.map(todo =>
    todo.id === 1 ? { ...todo, done: !todo.done } : todo
  )
);
// 결과: [{ id: 1, text: '공부', done: true }, { id: 2, text: '운동', done: false }]

// 새 todo 추가
setTodos(prev => [...prev, { id: 3, text: '독서', done: false }]);
// 결과: [{ id: 1, text: '공부', done: true }, { id: 2, text: '운동', done: false }, { id: 3, text: '독서', done: false }]
```

---

### 5-2. useEffect — 부수효과 처리

#### useEffect란 무엇인가?

> **useEffect = 컴포넌트의 렌더링 이후에 실행되는 부수효과(Side Effect)를 등록하는 Hook**

useEffect는 "이 컴포넌트가 화면에 그려진 후(또는 특정 값이 바뀐 후)에 이 작업을 실행해줘"라고 React에 알려주는 역할을 합니다.

#### 왜 useEffect가 필요한가?

컴포넌트 함수의 본래 역할은 **JSX를 반환하는 것(렌더링)** 뿐입니다.
하지만 실제 앱에서는 렌더링 외에도 많은 작업이 필요합니다:

```jsx
// ❌ 컴포넌트 함수 본문에서 직접 API 호출 — 문제 발생!
function UserProfile() {
  const [user, setUser] = useState(null);

  // 이 코드는 렌더링할 때마다 매번 실행됨!
  fetch('/api/user').then(res => res.json()).then(data => {
    setUser(data);  // setState 호출 → 리렌더링 → 또 fetch → 또 setState → 무한 루프!
  });

  return <Text>{user?.name}</Text>;
}

// ✅ useEffect 안에서 API 호출 — 제어 가능!
function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 마운트 시 딱 1번만 실행됨
    fetch('/api/user').then(res => res.json()).then(data => {
      setUser(data);
    });
  }, []); // 빈 배열 → 최초 1번만

  return <Text>{user?.name}</Text>;
}
```

#### useEffect의 구성 요소

```jsx
useEffect(
  () => {                    // ① 효과 함수 (Effect Function)
    // 실행할 부수효과 코드
    console.log('실행!');

    return () => {           // ② 정리 함수 (Cleanup Function) — 선택적
      // 이전 효과를 정리하는 코드
      console.log('정리!');
    };
  },
  [dependency1, dependency2] // ③ 의존성 배열 (Dependency Array) — 선택적
);
```


| 구성 요소  | 역할                                 | 필수 여부 |
| ------ | ---------------------------------- | ----- |
| 효과 함수  | 실제로 실행할 부수효과 코드                    | ✅ 필수  |
| 정리 함수  | 이전 효과를 정리 (타이머 해제, 구독 취소 등)        | ❌ 선택  |
| 의존성 배열 | "이 값이 바뀔 때만 효과를 다시 실행해줘"라고 알려주는 배열 | ❌ 선택  |


#### useEffect의 실행 타이밍

```
컴포넌트 렌더링 흐름:

1. 컴포넌트 함수 실행 (state 읽기, JSX 생성)
2. React가 화면을 업데이트 (Virtual DOM → 실제 화면)
3. ✨ useEffect의 효과 함수 실행 ← 화면이 그려진 "후에" 실행!

즉, useEffect는 화면 업데이트를 "방해하지 않고" 나중에 실행됩니다.
```

#### useEffect를 사용하는 대표적인 경우


| 상황       | 예시                      |
| -------- | ----------------------- |
| 데이터 불러오기 | API 호출, AsyncStorage 읽기 |
| 구독 설정/해제 | 이벤트 리스너, WebSocket 연결   |
| 타이머      | setTimeout, setInterval |
| 값 변화에 반응 | 검색어 바뀔 때 필터링, 디바운스      |
| 디버깅      | state 변화 로그             |


#### 의존성 배열에 따른 동작 차이 (상세)

```jsx
// ──────────────────────────────────────
// 1️⃣ 의존성 배열 자체가 없음 → 매 렌더링마다 실행
// ──────────────────────────────────────
useEffect(() => {
  console.log('매번 실행됨');
  // 어떤 state든 바뀌어서 리렌더링이 되면 이 코드가 실행됨
  // ⚠ 주의: 여기서 setState를 하면 무한 루프!
});
// 사용 시기: 거의 사용하지 않음. 디버깅 목적으로만 간혹 사용.

// ──────────────────────────────────────
// 2️⃣ 빈 배열 [] → 마운트 시 1번만 실행, 언마운트 시 정리
// ──────────────────────────────────────
useEffect(() => {
  console.log('컴포넌트가 화면에 나타남!');
  // 딱 1번만 실행 → API 초기 데이터 로딩, 이벤트 리스너 등록 등

  return () => {
    console.log('컴포넌트가 화면에서 사라짐!');
    // 정리: 이벤트 리스너 해제, 타이머 취소 등
  };
}, []);
// 사용 시기: 초기 데이터 로딩, 일회성 이벤트 구독

// ──────────────────────────────────────
// 3️⃣ 값이 있는 배열 [a, b] → 해당 값이 변경될 때만 실행
// ──────────────────────────────────────
useEffect(() => {
  console.log(`검색어가 변경됨: ${searchText}`);
  // searchText가 바뀔 때만 실행
  // 다른 state(count 등)가 바뀌어도 실행 안 됨!

  return () => {
    console.log('이전 검색 효과 정리');
    // 새 효과 실행 전에 이전 효과의 정리 함수가 먼저 실행됨
  };
}, [searchText]);
// 사용 시기: 특정 값에 반응해야 할 때 (검색, 필터, ID 변경 등)
```

**의존성 배열 동작 시각화:**

```
렌더링 흐름: 마운트 → count변경 → searchText변경 → count변경 → 언마운트

의존성 없음:   ✅ 실행   ✅ 실행    ✅ 실행       ✅ 실행    정리
빈 배열 []:   ✅ 실행   -          -             -          정리
[searchText]: ✅ 실행   -          정리→✅실행    -          정리
[count]:      ✅ 실행   정리→✅실행  -            정리→✅실행  정리

정리 함수 실행 순서:
  1. 의존성 값 변경 감지
  2. 이전 효과의 정리 함수 실행 (있으면)
  3. 새로운 효과 함수 실행
```

**정리 함수가 필요한 이유:**

```jsx
// 정리 함수가 없으면 문제가 되는 예시
useEffect(() => {
  const timer = setInterval(() => {
    console.log('틱!');
  }, 1000);

  // 정리 함수가 없으면?
  // → 컴포넌트가 사라져도 타이머가 계속 동작!
  // → 메모리 누수 + 에러 발생 가능

  return () => {
    clearInterval(timer); // ✅ 컴포넌트 사라질 때 타이머 정리
  };
}, []);
```

---

### 5-3. useRef — 렌더링과 무관한 값 저장

#### useRef란 무엇인가?

> **useRef = 렌더링에 영향을 주지 않으면서 값을 기억하는 "상자"를 만드는 Hook**

#### useRef의 구조

```jsx
const myRef = useRef(초기값);
```

useRef는 `{ current: 초기값 }` 형태의 **객체 하나를 반환**합니다.

```jsx
const countRef = useRef(0);
// countRef = { current: 0 }   ← 이 객체가 반환됨

// current에 접근하여 값을 읽고 쓸 수 있음
console.log(countRef.current);  // 0
countRef.current = 5;           // 값 변경 (리렌더링 발생하지 않음!)
console.log(countRef.current);  // 5
```

`**current`란?**

- useRef가 반환하는 객체의 유일한 속성
- 어떤 타입의 값이든 저장 가능 (숫자, 문자, 객체, 컴포넌트 참조 등)
- **이 값을 바꿔도 컴포넌트가 리렌더링되지 않음** (useState와의 핵심 차이!)
- 컴포넌트가 리렌더링되어도 **current의 값은 유지됨** (일반 변수와의 핵심 차이!)

#### useRef vs useState vs 일반 변수 비교


| 구분           | useState    | useRef          | 일반 변수 (let) |
| ------------ | ----------- | --------------- | ----------- |
| 값 변경 시 리렌더링? | ✅ 리렌더링됨     | ❌ 안 됨           | ❌ 안 됨       |
| 리렌더링 후 값 유지? | ✅ 유지됨       | ✅ 유지됨           | ❌ 초기화됨!     |
| 용도           | 화면에 보여줄 데이터 | 내부 로직용 값, 요소 접근 | 임시 계산용      |
| 접근 방식        | `value`     | `ref.current`   | `variable`  |


```jsx
function Example() {
  const [stateVal, setStateVal] = useState(0);  // 리렌더링 시 유지, 변경 시 리렌더링
  const refVal = useRef(0);                      // 리렌더링 시 유지, 변경해도 리렌더링 안 함
  let normalVal = 0;                             // 리렌더링 시 0으로 초기화!

  const handleClick = () => {
    setStateVal(stateVal + 1);     // 화면에 반영됨
    refVal.current += 1;           // 화면에 반영 안 됨 (값은 저장됨)
    normalVal += 1;                // 다음 렌더링에서 0으로 돌아감
    console.log('state:', stateVal, 'ref:', refVal.current, 'normal:', normalVal);
  };

  return <Button title="클릭" onPress={handleClick} />;
}
```

#### 용도 1: 리렌더링 없이 값 저장 (상세)

화면에 보여줄 필요는 없지만 컴포넌트가 기억해야 하는 값에 사용합니다.
주로 **타이머 ID, 이전 값, 실행 횟수** 등을 저장할 때 씁니다.

```jsx
function StopWatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // ✅ interval ID를 useRef로 저장
  // → ID 자체는 화면에 표시할 필요 없음
  // → 하지만 정지할 때 clearInterval에 필요하므로 기억해야 함
  const intervalRef = useRef(null);

  const start = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    // intervalRef.current에 타이머 ID가 저장됨
  };

  const stop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);  // 저장된 ID로 타이머 정지
    intervalRef.current = null;
  };

  // 컴포넌트가 사라질 때 타이머 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <View>
      <Text>{seconds}초</Text>
      <Button title={isRunning ? '정지' : '시작'} onPress={isRunning ? stop : start} />
    </View>
  );
}
```

```jsx
// 이전 값 기억하기
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);

  useEffect(() => {
    prevCountRef.current = count; // 렌더링 후 현재 값을 저장
  }, [count]);

  return (
    <View>
      <Text>현재: {count}, 이전: {prevCountRef.current}</Text>
      <Button title="+1" onPress={() => setCount(c => c + 1)} />
    </View>
  );
}
```

#### 용도 2: 컴포넌트/요소 직접 접근 (상세)

React Native에서 특정 컴포넌트의 메서드를 직접 호출해야 할 때 사용합니다.
예: TextInput에 자동 포커스, ScrollView 위치 이동 등.

```jsx
function AutoFocusForm() {
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  useEffect(() => {
    // 화면이 나타나면 이름 입력란에 자동 포커스
    nameInputRef.current?.focus();
  }, []);

  const handleNameSubmit = () => {
    // 이름 입력 후 Enter → 이메일 입력란으로 포커스 이동
    emailInputRef.current?.focus();
  };

  return (
    <View>
      <TextInput
        ref={nameInputRef}          // ref 연결
        placeholder="이름"
        onSubmitEditing={handleNameSubmit}
        returnKeyType="next"
      />
      <TextInput
        ref={emailInputRef}         // ref 연결
        placeholder="이메일"
        returnKeyType="done"
      />
    </View>
  );
}
```

```jsx
// ScrollView 맨 위로 스크롤
function LongList() {
  const scrollRef = useRef(null);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View>
      <ScrollView ref={scrollRef}>
        {/* 긴 콘텐츠 */}
      </ScrollView>
      <Button title="맨 위로" onPress={scrollToTop} />
    </View>
  );
}
```

---

### 5-4. useCallback & useMemo — 성능 최적화

#### 메모이제이션(Memoization)이란?

> **메모이제이션 = 한 번 계산한 결과를 기억해두고, 같은 입력이 들어오면 다시 계산하지 않고 기억한 결과를 돌려주는 기법**

```
일반 방식:
  요청 "3 + 5" → 계산 → 8
  요청 "3 + 5" → 또 계산 → 8    ← 똑같은 계산을 반복!

메모이제이션:
  요청 "3 + 5" → 계산 → 8 (결과를 기억📝)
  요청 "3 + 5" → 기억된 8 바로 반환 ← 계산 생략!
```

#### useCallback — 함수 메모이제이션

> **useCallback = 함수를 기억해두고, 의존성이 바뀌지 않으면 이전과 동일한 함수를 재사용하는 Hook**

**왜 함수를 메모이제이션하는가?**

컴포넌트가 리렌더링될 때마다 함수 내부의 모든 함수가 **새로 생성**됩니다.
함수 내용이 완전히 같더라도, JavaScript에서 새로 만든 함수는 **다른 참조(주소)**를 가집니다.

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ 매 렌더링마다 handlePress가 새로 생성됨
  const handlePress = () => {
    console.log('클릭!');
  };
  // 1st 렌더링: handlePress = 함수@0x001
  // 2nd 렌더링: handlePress = 함수@0x002  ← 내용은 같지만 새 함수!
  // 3rd 렌더링: handlePress = 함수@0x003  ← 또 새 함수!

  // → Child에게 매번 "다른" 함수가 props로 전달됨
  // → Child가 React.memo를 써도 매번 리렌더링됨! (props가 바뀌었으니까)
  return <Child onPress={handlePress} />;
}
```

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ✅ useCallback으로 함수를 기억
  const handlePress = useCallback(() => {
    console.log('클릭!');
  }, []); // 의존성이 변하지 않는 한 같은 함수 재사용
  // 1st 렌더링: handlePress = 함수@0x001  (생성 및 기억)
  // 2nd 렌더링: handlePress = 함수@0x001  ← 같은 함수 재사용!
  // 3rd 렌더링: handlePress = 함수@0x001  ← 같은 함수 재사용!

  // → Child에게 항상 "같은" 함수가 전달됨
  // → Child가 React.memo를 사용하면 불필요한 리렌더링 방지!
  return <Child onPress={handlePress} />;
}
```

**useCallback으로 얻는 이득:**

1. **자식 컴포넌트의 불필요한 리렌더링 방지** (React.memo와 함께 사용 시)
2. **useEffect의 불필요한 재실행 방지** (의존성 배열에 함수가 포함된 경우)
3. 대규모 앱에서 **렌더링 성능 개선**

#### useMemo — 계산 결과 메모이제이션

> **useMemo = 계산 결과를 기억해두고, 의존성이 바뀌지 않으면 이전 결과를 재사용하는 Hook**

```jsx
function StudentList({ students, filter }) {
  // ❌ 매 렌더링마다 필터링 재계산 (학생이 10000명이면...?)
  const filtered = students.filter(s => s.grade === filter);

  // ✅ filter나 students가 바뀔 때만 재계산
  const filtered = useMemo(
    () => students.filter(s => s.grade === filter),
    [students, filter]
  );
  // students = 10000명, filter = 'A'
  // 1st: 10000명 필터링 계산 → 결과 기억
  // 다른 state 변경으로 리렌더링 → 기억한 결과 바로 반환 (재계산 안 함!)
  // filter가 'B'로 변경 → 다시 계산 → 새 결과 기억

  return filtered.map(s => <Text key={s.id}>{s.name}</Text>);
}
```

**useMemo로 얻는 이득:**

1. **무거운 계산의 반복 실행 방지** (정렬, 필터링, 복잡한 변환)
2. **참조 동일성 유지** (객체/배열을 자식에게 전달할 때)

**useMemo를 주로 사용하는 경우:**

- 대량의 데이터 필터링/정렬 (수백~수천 개 항목)
- 복잡한 계산 (수학 연산, 데이터 가공)
- 자식 컴포넌트에 전달하는 객체/배열 생성

**useEffect vs useMemo 비교:**


| 구분              | useEffect             | useMemo               |
| --------------- | --------------------- | --------------------- |
| **역할**          | 부수효과 실행 (API, 이벤트 등)  | 계산 결과 캐싱              |
| **실행 시점**       | 렌더링 **후** (화면 업데이트 후) | 렌더링 **중** (화면 업데이트 전) |
| **반환값**         | 없음 (undefined)        | 계산된 값을 반환             |
| **정리 함수**       | ✅ 있음 (return)         | ❌ 없음                  |
| **용도**          | 외부 시스템과 상호작용          | 렌더링에 필요한 값 계산         |
| **setState 호출** | ✅ 가능 (흔히 사용)          | ❌ 하면 안 됨              |


```jsx
// useEffect: 렌더링 후에 검색 API 호출
useEffect(() => {
  fetchSearchResults(query).then(setResults);
}, [query]);

// useMemo: 렌더링 중에 이미 있는 데이터 필터링
const filteredResults = useMemo(
  () => results.filter(r => r.score > 50),
  [results]
);
```

> **요약:** useCallback = 함수를 기억, useMemo = 값을 기억
> 둘 다 **성능 최적화** 용도이며, 없어도 동작은 합니다.
> 성능 문제가 실제로 발생할 때 적용하는 것이 좋습니다.

---

### 5-5. useContext — Props 없이 데이터 공유

#### useContext란 무엇인가?

> **useContext = React의 Context 시스템에서 값을 꺼내 쓰는 Hook**

Context란 **컴포넌트 트리 전체에 데이터를 "방송"하는 시스템**입니다.
라디오 방송처럼, Provider가 값을 송출하면 어디서든 useContext로 수신할 수 있습니다.

```
일반 props:  소포 배달 — A → B → C → D (중간에 다 거쳐야 함)
Context:     라디오 방송 — A가 송출, D가 직접 수신 (B, C는 관여 안 함)
```

#### useContext 사용 3단계

```jsx
import { createContext, useContext, useState } from 'react';

// ─── 1단계: Context 생성 (방송 채널 만들기) ───
const UserContext = createContext(null);
// 'null'은 Provider 없이 사용될 때의 기본값

// ─── 2단계: Provider로 감싸기 (방송 시작) ───
function App() {
  const [user, setUser] = useState({ name: '용준', role: 'student' });

  return (
    // value에 넣은 값이 모든 하위 컴포넌트에서 접근 가능
    <UserContext.Provider value={{ user, setUser }}>
      <Header />
      <MainContent />
    </UserContext.Provider>
  );
}

// ─── 3단계: useContext로 값 사용 (방송 수신) ───
function DeepNestedComponent() {
  // props 전달 없이 직접 접근!
  const { user, setUser } = useContext(UserContext);

  return (
    <View>
      <Text>환영합니다, {user.name}님!</Text>
      <Button
        title="역할 변경"
        onPress={() => setUser({ ...user, role: 'admin' })}
      />
    </View>
  );
}
```

#### Props 전달 vs Context 비교

```
[Props 방식 — 5단계를 거쳐 전달]
App (user state)
 └─ Header         ← user props 전달 (사용 안 함, 넘기기만)
     └─ NavBar      ← user props 전달 (사용 안 함, 넘기기만)
         └─ Menu    ← user props 전달 (사용 안 함, 넘기기만)
             └─ Avatar ← user props 전달 (드디어 사용!)

[Context 방식 — 직접 접근]
App (UserContext.Provider)
 └─ Header
     └─ NavBar
         └─ Menu
             └─ Avatar ← useContext(UserContext) (직접 가져옴!)
```

#### 어떤 경우에 useContext를 사용하는가?


| 상황                            | 적합한 도구               | 이유                            |
| ----------------------------- | -------------------- | ----------------------------- |
| 바로 아래 자식에게 전달                 | **useState + props** | 간단하고 명확함                      |
| 2~3단계 깊이 전달                   | **useState + props** | Context보다 추적이 쉬움              |
| 4단계 이상 깊이 전달 (Props Drilling) | **useContext**       | 중간 컴포넌트가 불필요한 props를 받지 않아도 됨 |
| 앱 전체에서 공유하는 데이터               | **useContext**       | 테마, 인증, 언어 설정 등               |
| 자주 변경되는 복잡한 상태                | **Zustand/Redux**    | Context는 값 변경 시 모든 구독자가 리렌더링됨 |


#### useState vs useContext — 용도의 차이

이 둘은 **대체 관계가 아니라 보완 관계**입니다:

```
useState  = "값을 만들고 관리하는 것" (상태 생성)
useContext = "값을 멀리 전달하는 것" (상태 공유)
```

```jsx
// useState만 사용: 값을 만들고, props로 전달
function App() {
  const [theme, setTheme] = useState('light');  // ← 값을 만듦
  return <Header theme={theme} />;              // ← props로 전달
}

// useState + useContext: 값을 만들고, Context로 공유
function App() {
  const [theme, setTheme] = useState('light');  // ← 값을 만듦 (useState)
  return (
    <ThemeContext.Provider value={theme}>        // ← Context로 공유 (useContext)
      <Header />  {/* props 없이 어디서든 theme 접근 가능 */}
    </ThemeContext.Provider>
  );
}
```

> **핵심:** useContext는 useState를 **대체**하는 것이 아닙니다.
> useState로 만든 state를 **멀리 전달하는 방법**이 props냐 Context냐의 차이입니다.
>
> - **가까운 곳:** props로 전달 (간단하고 추적 쉬움)
> - **먼 곳 / 여러 곳:** Context로 공유 (Props Drilling 방지)

#### useContext의 주의사항

```jsx
// ⚠ Context 값이 바뀌면, 이 Context를 사용하는
// 모든 컴포넌트가 리렌더링됩니다!

function App() {
  const [user, setUser] = useState({ name: '용준', age: 20 });
  const [theme, setTheme] = useState('light');

  // ❌ 하나의 Context에 모든 것을 넣으면...
  // user만 바뀌어도 theme만 사용하는 컴포넌트까지 리렌더링!
  return (
    <AppContext.Provider value={{ user, theme }}>
      <ThemeDisplay />  {/* theme만 쓰는데 user 바뀌면 리렌더링됨 😫 */}
    </AppContext.Provider>
  );

  // ✅ Context를 분리하면 각자 필요한 것만 구독
  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={theme}>
        <ThemeDisplay />  {/* theme만 구독 → user 바뀌어도 리렌더링 안 됨 */}
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}
```

> 이런 리렌더링 문제 때문에 **자주 변하는 복잡한 상태**에는
> Context 대신 **Zustand** 같은 전역 상태 라이브러리를 사용합니다.
> (8장에서 다룹니다)

---

### 5-6. useReducer — 복잡한 상태 로직

```jsx
// useState로 복잡해지는 경우
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
// → state가 서로 연관되어 있으면 관리가 복잡...

// useReducer로 정리
const initialState = { items: [], loading: false, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function ItemList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadItems = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await fetchItems();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  };

  return (
    <View>
      {state.loading && <Text>로딩 중...</Text>}
      {state.error && <Text>에러: {state.error}</Text>}
      {state.items.map(item => <Text key={item.id}>{item.name}</Text>)}
    </View>
  );
}
```

> useReducer는 Redux의 축소판이라고 생각하면 됩니다.
> `(현재 상태, 액션) → 새로운 상태` 패턴입니다.

---

## 6. useState 심화

### 6-1. Props Drilling 문제

> **Props Drilling = 중간 컴포넌트들이 사용하지도 않는 props를 자식에게 전달만 하는 것**

```
App (user state 관리)
 │
 ├─ Header ← user props 전달 (사용 안 함, 그냥 넘김)
 │   └─ UserAvatar ← user props 전달 (여기서 사용!)
 │
 └─ Main ← user props 전달 (사용 안 함, 그냥 넘김)
     └─ Sidebar ← user props 전달 (사용 안 함, 그냥 넘김)
         └─ UserMenu ← user props 전달 (여기서 사용!)
```

```jsx
// 문제 상황: 3단계를 거쳐 props 전달
function App() {
  const [user, setUser] = useState({ name: '용준' });
  return <Header user={user} />;    // 1단계: 전달
}

function Header({ user }) {           // 안 씀! 그냥 넘김
  return <UserAvatar user={user} />;  // 2단계: 전달
}

function UserAvatar({ user }) {        // 드디어 사용!
  return <Text>{user.name}</Text>;
}
```

**문제점:**

- 중간 컴포넌트(Header)가 불필요한 props를 받아야 함
- 컴포넌트 계층이 깊어지면 유지보수 어려움
- props 이름이 바뀌면 모든 중간 컴포넌트 수정 필요

**해결 방법:**

1. **useContext** — 중간 과정 없이 직접 접근
2. **Zustand / Redux** — 전역 상태 관리 라이브러리
3. **컴포넌트 구조 개선** — 합성(Composition) 패턴

### 6-2. Lifting State Up (상태 끌어올리기)

> **Lifting State Up = 여러 자식이 공유할 데이터를 가장 가까운 공통 부모로 올리는 것**

#### 예시 1: 섭씨 / 화씨 온도 동기화

```jsx
// ❌ 문제: 두 컴포넌트가 같은 값을 공유해야 하는데...
function TemperatureInput() {
  const [temp, setTemp] = useState('');  // 각자 별도 state
  return <TextInput value={temp} onChangeText={setTemp} />;
}

// 섭씨 입력기와 화씨 입력기가 동기화되지 않음!
```

```jsx
// ✅ 해결: 공통 부모로 state를 올림
function TemperatureCalculator() {
  // 부모가 섭씨 온도를 기준 state로 관리
  const [celsius, setCelsius] = useState('');

  return (
    <View>
      {/* 섭씨 입력: celsius state를 그대로 전달 */}
      <TemperatureInput
        label="섭씨 (°C)"
        value={celsius}
        onChangeText={setCelsius}
      />

      {/* 화씨 입력: celsius를 화씨로 변환(°F = °C × 9/5 + 32)하여 전달
          화씨 입력 시에는 역변환(°C = (°F - 32) × 5/9)하여 celsius state 업데이트 */}
      <TemperatureInput
        label="화씨 (°F)"
        value={celsius ? String(Number(celsius) * 9/5 + 32) : ''}
        onChangeText={(f) => setCelsius(f ? String((Number(f) - 32) * 5/9) : '')}
      />
    </View>
  );
}

function TemperatureInput({ label, value, onChangeText }) {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput value={value} onChangeText={onChangeText} />
    </View>
  );
}
```

```
[Before]                      [After — Lifting State Up]
CelsiusInput (자체 state)     Parent (celsius state 관리!)
FahrenheitInput (자체 state)   ├─ CelsiusInput (props로 받음)
→ 동기화 불가!                 └─ FahrenheitInput (props로 받음, 변환 계산 추가)
                               → 동기화 완료!
```

#### 예시 2: 선택된 항목 공유

두 자식 컴포넌트가 "현재 선택된 항목"을 공유해야 하는 경우:

```jsx
// ✅ 부모가 선택 상태를 관리하고 자식들에게 공유
function ProductPage() {
  // 선택된 상품 ID를 부모에서 관리 (Lifting State Up!)
  const [selectedId, setSelectedId] = useState(null);

  const products = [
    { id: 1, name: '사과', price: 1000 },
    { id: 2, name: '바나나', price: 2000 },
    { id: 3, name: '포도', price: 3000 },
  ];

  // 선택된 상품 객체 찾기
  const selectedProduct = products.find(p => p.id === selectedId);

  return (
    <View>
      {/* 자식 1: 상품 목록 — 선택 기능 */}
      <ProductList
        products={products}
        selectedId={selectedId}
        onSelect={setSelectedId}      // 부모의 setState를 props로 전달
      />

      {/* 자식 2: 상세 정보 — 선택된 상품 표시 */}
      <ProductDetail product={selectedProduct} />
    </View>
  );
}

function ProductList({ products, selectedId, onSelect }) {
  return (
    <View>
      {products.map(product => (
        <TouchableOpacity
          key={product.id}
          onPress={() => onSelect(product.id)}  // 부모의 state 변경
          style={{
            backgroundColor: selectedId === product.id ? '#E3F2FD' : '#fff',
          }}
        >
          <Text>{product.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function ProductDetail({ product }) {
  if (!product) return <Text>상품을 선택하세요</Text>;
  return (
    <View>
      <Text>선택된 상품: {product.name}</Text>
      <Text>가격: {product.price}원</Text>
    </View>
  );
}
```

```
데이터 흐름:
1. ProductList에서 '바나나' 클릭
2. → onSelect(2) 호출 = 부모의 setSelectedId(2) 실행
3. → ProductPage의 selectedId가 2로 변경 → 리렌더링
4. → ProductList: selectedId=2로 '바나나' 하이라이트
5. → ProductDetail: product = { name: '바나나', price: 2000 } 표시
```

### 6-3. useState + Modal 연동 패턴

지난 시간의 practice 프로젝트에서 이미 이 패턴을 사용했습니다:

```jsx
function ParentScreen() {
  // 모달 표시 여부를 state로 관리
  const [modalVisible, setModalVisible] = useState(false);
  // 모달에 전달할 데이터도 state
  const [modalMessage, setModalMessage] = useState('안녕하세요!');

  return (
    <View>
      {/* 입력값을 state에 저장 */}
      <TextInput
        value={modalMessage}
        onChangeText={setModalMessage}
      />

      {/* 버튼 클릭 → state 변경 → 모달 표시 */}
      <Button
        title="모달 열기"
        onPress={() => setModalVisible(true)}
      />

      {/* 모달 컴포넌트에 state를 props로 전달 */}
      <Modal visible={modalVisible}>
        <Text>{modalMessage}</Text>
        <Button
          title="닫기"
          onPress={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
}
```

**데이터 흐름:**

```
1. 사용자 입력 → setModalMessage("새 메시지") → state 업데이트
2. 버튼 클릭 → setModalVisible(true) → state 업데이트
3. state 변경 → 리렌더링 → Modal의 visible={true} → 모달 표시
4. 모달 안에서 modalMessage가 props로 표시됨
5. 닫기 클릭 → setModalVisible(false) → 모달 숨김
```

---

## 7. useEffect 다양한 활용 예시

### 예시 1: 데이터 로딩 (API 호출)

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 비동기 함수를 내부에서 정의하고 즉시 호출
    const loadUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]); // userId가 바뀔 때마다 다시 로딩

  if (loading) return <Text>로딩 중...</Text>;
  return <Text>{user?.name}</Text>;
}
```

### 예시 2: 입력값에 반응하기 (디바운스 검색)

```jsx
function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // 타이핑 멈춘 후 500ms 뒤에 검색 (디바운스)
    const timer = setTimeout(() => {
      console.log(`"${query}" 검색 실행!`);
      // 실제로는 API 호출
      setResults([`${query} 결과1`, `${query} 결과2`]);
    }, 500);

    // 정리 함수: query가 바뀌면 이전 타이머 취소
    return () => clearTimeout(timer);
  }, [query]); // query가 바뀔 때마다

  return (
    <View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="검색어 입력..."
      />
      {results.map((r, i) => <Text key={i}>{r}</Text>)}
    </View>
  );
}
```

### 예시 3: 이벤트 구독 & 해제

```jsx
import { Keyboard, AppState } from 'react-native';

function KeyboardAwareScreen() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    // 이벤트 리스너 등록
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // 정리 함수: 컴포넌트 언마운트 시 리스너 해제
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <View>
      <Text>키보드: {keyboardVisible ? '열림' : '닫힘'}</Text>
    </View>
  );
}
```

### 예시 4: 디버깅용 — state 변화 추적

```jsx
function DebugExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // count 변화 추적
  useEffect(() => {
    console.log(`[DEBUG] count 변경됨: ${count}`);
  }, [count]);

  // name 변화 추적
  useEffect(() => {
    console.log(`[DEBUG] name 변경됨: "${name}"`);
  }, [name]);

  return (
    <View>
      <Button title={`count: ${count}`} onPress={() => setCount(c => c + 1)} />
      <TextInput value={name} onChangeText={setName} placeholder="이름" />
    </View>
  );
}
```

### 예시 5: useFocusEffect와의 비교 (expo-router)

```jsx
import { useFocusEffect } from 'expo-router';

function TabScreen() {
  // useEffect: 컴포넌트 마운트 시 1번만 실행
  // → 탭에서 다른 탭 갔다가 돌아와도 재실행되지 않음!
  useEffect(() => {
    console.log('useEffect — 처음 1번만');
  }, []);

  // useFocusEffect: 탭이 포커스될 때마다 실행
  // → 다른 탭 갔다가 돌아오면 다시 실행됨!
  useFocusEffect(
    useCallback(() => {
      console.log('useFocusEffect — 포커스될 때마다');
      return () => console.log('포커스 잃을 때 정리');
    }, [])
  );
}
```

```
탭A 진입 → 탭B 이동 → 탭A 복귀

useEffect:      ✅ 실행          -          - (재실행 안 됨)
useFocusEffect: ✅ 실행    정리 실행    ✅ 다시 실행
```

---

## 8. 전역 상태 관리로의 연결

### 왜 전역 상태 관리가 필요한가?

```
[useState만 사용할 때의 한계]

App
├─ Header          ← user 정보 필요
│   └─ Avatar      ← user 정보 필요
├─ ProductList     ← cart 정보 필요
│   └─ ProductCard ← cart에 추가 기능 필요
└─ CartModal       ← cart 정보 필요
    └─ CartItem    ← cart 수정 기능 필요

→ user와 cart state를 App에 두고 모든 곳에 props로 전달해야 함
→ Props Drilling 지옥!
```

### 해결 순서

```
1단계: useState + props
  → 소규모 앱, 1~2단계 깊이의 데이터 전달
  → 이번 시간 학습!

2단계: useContext
  → 테마, 인증 등 전역적 데이터
  → Props Drilling 해결
  → 단점: Context 값 변경 시 모든 구독 컴포넌트 리렌더링

3단계: Zustand (추천!) 또는 Redux
  → 대규모 앱, 복잡한 상태 관리
  → 필요한 컴포넌트만 리렌더링 (성능 좋음)
  → 다음 시간 학습 예정!
```

### Zustand 맛보기

```jsx
// store.js — Zustand 스토어 정의
import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
}));

// 어디서든 사용 — props 전달 불필요!
function ProductCard({ product }) {
  const addItem = useCartStore(state => state.addItem);
  return <Button title="담기" onPress={() => addItem(product)} />;
}

function CartBadge() {
  const itemCount = useCartStore(state => state.items.length);
  return <Text>🛒 {itemCount}</Text>;
}
```

```
[Zustand 사용 시]

App
├─ Header
│   └─ CartBadge ← useCartStore로 직접 접근 ✅
├─ ProductList
│   └─ ProductCard ← useCartStore로 직접 접근 ✅
└─ CartModal
    └─ CartItem ← useCartStore로 직접 접근 ✅

→ Props Drilling 없음!
→ 필요한 컴포넌트만 구독!
```

### 정리 비교표


| 구분             | useState + props | useContext | Zustand    |
| -------------- | ---------------- | ---------- | ---------- |
| 복잡도            | 낮음               | 중간         | 중간         |
| Props Drilling | 발생               | 해결         | 해결         |
| 리렌더링 성능        | 좋음               | 구독자 전체 리렌더 | 필요한 것만 리렌더 |
| 보일러플레이트        | 없음               | 약간         | 적음         |
| 추천 규모          | 소규모              | 전역 설정류     | 중~대규모      |


---

## 9. 실습 가이드

> **이 섹션은 수업 시간에 함께 작성합니다.**



---

## 10. 실습 예제 아이디어

### 난이도별 추천 실습

#### 🟢 기초 (useState + useEffect)

**1. 할 일 목록 (To-Do List)**

- useState: 할 일 배열, 입력값
- 배열 불변성: `[...todos, newTodo]`, `todos.filter(...)`
- useEffect: 할 일 개수 변경 시 콘솔 로그

```
[기능 목록]
- 텍스트 입력 → 추가 버튼 → 목록에 추가
- 각 항목 완료 체크 토글
- 삭제 버튼
- 전체/완료/미완료 필터
- 남은 할 일 개수 표시
```

#### 🟡 중급 (Lifting State Up + Modal)

**2. 간단한 주문 시스템**

- 메뉴 목록 화면 + 장바구니 모달
- Lifting State Up: 부모가 장바구니 state 관리
- 자식(메뉴 카드)에서 "담기" → 부모의 setState 호출
- 모달에서 장바구니 내용 표시 + 수량 변경

```
[화면 구조]
Parent (cart state 관리)
 ├─ MenuList → MenuItem (담기 버튼)
 ├─ CartSummary (총 개수, 금액)
 └─ CartModal (장바구니 상세, visible state)
```

#### 🟡 중급 (useEffect 활용)

**3. 스톱워치 + 랩 타임**

- useState: 경과시간, 실행중여부, 랩타임 배열
- useEffect + setInterval: 타이머 구현
- useRef: interval ID 저장
- 정리 함수(cleanup)의 중요성 체험

```
[기능]
- 시작/정지/리셋 버튼
- 랩 타임 기록
- 최고/최저 랩 표시
```

#### 🟠 심화 (useContext / useReducer)

**4. 다크모드 토글 + 테마 적용**

- useContext: 테마 전역 공유
- Provider 패턴
- 모든 하위 컴포넌트에서 테마 접근

**5. 퀴즈 앱 (useReducer)**

- useReducer: 퀴즈 진행 상태 관리 (현재 문제, 점수, 완료 여부)
- dispatch로 상태 전이: NEXT_QUESTION, ANSWER, RESET
- 결과 화면에서 점수 표시

---

### 추천 실습 순서

```
1단계: 할 일 목록 (useState 기본 + 배열 불변성)
  ↓
2단계: 스톱워치 (useEffect + useRef + cleanup)
  ↓
3단계: 주문 시스템 (Lifting State Up + Modal)
  ↓
4단계: 다크모드 (useContext)
  ↓
5단계: 퀴즈 앱 (useReducer) → Zustand로 리팩토링!
```

---

> 📌 **다음 시간 예고: Zustand를 활용한 전역 상태 관리**
> 이번 시간의 useState/useContext 한계를 체감한 뒤, Zustand로 깔끔하게 해결하는 법을 배웁니다!

