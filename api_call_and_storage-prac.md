# 4주차: API 호출과 전역 상태관리 학습 가이드

> 이 문서는 수업 중 헷갈리거나 까먹은 개념을 빠르게 다시 확인하기 위한 참고 문서입니다.

---

## 📌 목차

1. [HTTP 기초](#1-http-기초)
   1-1. [클라이언트와 서버](#1-1-클라이언트와-서버)
   1-2. [HTTP란?](#1-2-http란)
   1-3. [요청(Request)의 구조](#1-3-요청request의-구조)
   1-4. [응답(Response)의 구조](#1-4-응답response의-구조)
   1-5. [HTTP 메서드](#1-5-http-메서드)
   1-6. [상태 코드(Status Code)](#1-6-상태-코드status-code)
   1-7. [JSON이란?](#1-7-json이란)
2. [동기와 비동기 프로그래밍](#2-동기와-비동기-프로그래밍)
   2-1. [동기(Synchronous) 방식](#2-1-동기synchronous-방식)
   2-2. [비동기(Asynchronous) 방식](#2-2-비동기asynchronous-방식)
   2-3. [왜 비동기가 필요한가?](#2-3-왜-비동기가-필요한가)
   2-4. [Promise](#2-4-promise)
   2-5. [async / await](#2-5-async--await)
   2-6. [에러 핸들링: try-catch](#2-6-에러-핸들링-try-catch)
3. [fetch API](#3-fetch-api)
   3-1. [fetch란?](#3-1-fetch란)
   3-2. [fetch의 기본 구조](#3-2-fetch의-기본-구조)
   3-3. [GET 요청](#3-3-get-요청)
   3-4. [POST 요청](#3-4-post-요청)
   3-5. [fetch의 특징과 주의점](#3-5-fetch의-특징과-주의점)
4. [axios](#4-axios)
   4-1. [axios란?](#4-1-axios란)
   4-2. [설치](#4-2-설치)
   4-3. [axios의 기본 구조](#4-3-axios의-기본-구조)
   4-4. [GET 요청](#4-4-get-요청)
   4-5. [POST 요청](#4-5-post-요청)
   4-6. [axios 인스턴스](#4-6-axios-인스턴스)
   4-7. [인터셉터(Interceptor)](#4-7-인터셉터interceptor)
   4-8. [fetch vs axios 비교](#4-8-fetch-vs-axios-비교)
5. [useEffect + API 조합 패턴](#5-useeffect--api-조합-패턴)
   5-1. [컴포넌트에서 API를 호출하는 시점](#5-1-컴포넌트에서-api를-호출하는-시점)
   5-2. [로딩 / 에러 / 데이터 상태 관리 패턴](#5-2-로딩--에러--데이터-상태-관리-패턴)
   5-3. [환경변수로 API URL 관리하기](#5-3-환경변수로-api-url-관리하기)
6. [전역 상태관리](#6-전역-상태관리)
   6-1. [props drilling 문제](#6-1-props-drilling-문제)
   6-2. [전역 상태관리가 필요한 이유](#6-2-전역-상태관리가-필요한-이유)
   6-3. [전역 상태관리 라이브러리 종류](#6-3-전역-상태관리-라이브러리-종류)
7. [Zustand](#7-zustand)
   7-1. [Zustand란?](#7-1-zustand란)
   7-2. [설치](#7-2-설치)
   7-3. [Store 만들기](#7-3-store-만들기)
   7-4. [컴포넌트에서 Store 사용하기](#7-4-컴포넌트에서-store-사용하기)
   7-5. [API와 Zustand 연동하기](#7-5-api와-zustand-연동하기)
   7-6. [Zustand 사용 시 주의사항](#7-6-zustand-사용-시-주의사항)
8. [종합 정리](#8-종합-정리)

---

## 1. HTTP 기초

### 1-1. 클라이언트와 서버

우리가 만드는 앱(React Native 앱)은 **클라이언트**입니다.
클라이언트는 사용자가 직접 보고 조작하는 프로그램이고, **서버**는 데이터를 저장하고 처리하는 프로그램입니다.

```
┌──────────────┐                    ┌──────────────┐
│   클라이언트   │  ── 요청(Request) ──▶  │     서버      │
│  (우리 앱)    │  ◀── 응답(Response) ──  │  (백엔드)     │
└──────────────┘                    └──────────────┘
```

**실생활 비유:**
- 클라이언트 = 음식점에서 주문하는 손님
- 서버 = 주문을 받아서 음식을 만들어주는 주방
- 요청 = 주문서 ("김치찌개 1개 주세요")
- 응답 = 나온 음식 (김치찌개 + 영수증)

앱에서 회원 목록을 보여주고 싶다면, 앱이 서버에 "회원 목록을 달라"고 **요청**하고, 서버가 회원 데이터를 **응답**으로 보내줍니다.

---

### 1-2. HTTP란?

**HTTP(HyperText Transfer Protocol)** 는 클라이언트와 서버가 데이터를 주고받기 위한 **약속(규칙)** 입니다.

웹과 앱에서 데이터를 전송할 때 가장 널리 쓰이는 프로토콜이며, 우리가 배울 `fetch`와 `axios`도 모두 HTTP를 기반으로 동작합니다.

**핵심 특징:**
- **요청-응답 구조**: 항상 클라이언트가 먼저 요청하고, 서버가 응답합니다 (서버가 먼저 보내지 않음)
- **무상태(Stateless)**: 서버는 이전 요청을 기억하지 않습니다. 매 요청은 독립적입니다
- **텍스트 기반**: 사람이 읽을 수 있는 텍스트 형태로 데이터를 주고받습니다

---

### 1-3. 요청(Request)의 구조

HTTP 요청은 크게 4가지 부분으로 구성됩니다:

```
┌─────────────────────────────────────────────────────┐
│ 1. URL (어디로 보낼 것인가?)                           │
│    https://api.example.com/users                     │
├─────────────────────────────────────────────────────┤
│ 2. Method (무엇을 할 것인가?)                          │
│    GET, POST, PUT, DELETE 등                         │
├─────────────────────────────────────────────────────┤
│ 3. Headers (부가 정보)                                │
│    Content-Type: application/json                    │
│    Authorization: Bearer abc123                      │
├─────────────────────────────────────────────────────┤
│ 4. Body (보낼 데이터) — POST, PUT 등에서만 사용         │
│    { "name": "홍길동", "email": "hong@test.com" }     │
└─────────────────────────────────────────────────────┘
```

#### URL (Uniform Resource Locator)

서버의 **어떤 자원(데이터)** 에 접근할지를 나타내는 주소입니다.

```
https://api.example.com/users/123?sort=name
└─┬──┘ └──────┬───────┘└───┬──┘└┬┘ └───┬──┘
 프로토콜    도메인(서버주소)   경로   ID  쿼리파라미터
```

- **프로토콜**: `https` (보안 연결) 또는 `http`
- **도메인**: 서버의 주소 (예: `api.example.com`)
- **경로(Path)**: 서버 내에서 어떤 자원인지 (예: `/users` → 사용자 목록)
- **쿼리 파라미터**: `?key=value` 형태로 추가 조건 전달 (예: `?sort=name`)

#### Headers (헤더)

요청에 대한 **부가 정보**를 담는 곳입니다. 편지의 봉투에 적는 정보라고 생각하면 됩니다.

```
자주 쓰이는 헤더:

Content-Type: application/json     → "보내는 데이터가 JSON 형식이에요"
Authorization: Bearer abc123token  → "나는 인증된 사용자예요 (토큰)"
Accept: application/json           → "응답도 JSON으로 주세요"
```

#### Body (본문)

서버에 **실제로 전달하고 싶은 데이터**입니다. GET 요청에서는 보통 Body를 사용하지 않고, POST나 PUT처럼 데이터를 보내야 할 때 사용합니다.

```json
{
  "name": "홍길동",
  "email": "hong@example.com",
  "age": 25
}
```

---

### 1-4. 응답(Response)의 구조

서버가 보내는 응답도 비슷한 구조를 가집니다:

```
┌─────────────────────────────────────────────────────┐
│ 1. Status Code (처리 결과)                            │
│    200 OK / 404 Not Found / 500 Server Error         │
├─────────────────────────────────────────────────────┤
│ 2. Headers (부가 정보)                                │
│    Content-Type: application/json                    │
├─────────────────────────────────────────────────────┤
│ 3. Body (응답 데이터)                                 │
│    { "id": 1, "name": "홍길동" }                      │
└─────────────────────────────────────────────────────┘
```

---

### 1-5. HTTP 메서드

HTTP 메서드는 서버에게 **"무엇을 할 것인지"** 알려주는 동사입니다.

| 메서드 | 의미 | 용도 | Body 사용 |
|--------|------|------|-----------|
| **GET** | 조회 (Read) | 데이터를 가져올 때 | X |
| **POST** | 생성 (Create) | 새 데이터를 만들 때 | O |
| **PUT** | 전체 수정 (Update) | 기존 데이터를 통째로 바꿀 때 | O |
| **PATCH** | 부분 수정 (Update) | 기존 데이터의 일부만 바꿀 때 | O |
| **DELETE** | 삭제 (Delete) | 데이터를 지울 때 | X (보통) |

**실생활 비유:**
```
GET    /users       → "회원 목록 보여주세요"
GET    /users/3     → "3번 회원 정보 보여주세요"
POST   /users       → "새 회원을 등록해주세요" + { name: "홍길동" }
PUT    /users/3     → "3번 회원 정보를 이걸로 바꿔주세요" + { name: "김길동", age: 30 }
PATCH  /users/3     → "3번 회원 이름만 바꿔주세요" + { name: "김길동" }
DELETE /users/3     → "3번 회원을 삭제해주세요"
```

> 이처럼 URL + 메서드의 조합으로 "어떤 자원에 무슨 작업을 할지"를 표현하는 설계 방식을 **REST API**라고 부릅니다. 대부분의 서버가 이 방식을 따릅니다.

---

### 1-6. 상태 코드(Status Code)

서버의 응답에는 **숫자 코드**가 포함되어 있어서, 요청이 성공했는지 실패했는지를 알려줍니다.

```
2xx → 성공
4xx → 클라이언트(우리) 쪽 문제
5xx → 서버 쪽 문제
```

| 코드 | 의미 | 설명 |
|------|------|------|
| **200** | OK | 요청 성공 |
| **201** | Created | 새로운 데이터 생성 성공 (POST 후 자주 봄) |
| **204** | No Content | 성공했지만 보내줄 데이터 없음 (DELETE 후 자주 봄) |
| **400** | Bad Request | 요청 형식이 잘못됨 (필수 값 누락 등) |
| **401** | Unauthorized | 인증 안 됨 (로그인 필요) |
| **403** | Forbidden | 인증은 됐지만 권한 없음 |
| **404** | Not Found | 해당 자원을 찾을 수 없음 (URL이 잘못됨) |
| **500** | Internal Server Error | 서버 내부 오류 (서버 개발자가 고쳐야 함) |

---

### 1-7. JSON이란?

**JSON(JavaScript Object Notation)** 은 데이터를 주고받을 때 가장 널리 쓰이는 **텍스트 형식**입니다.
HTTP 통신에서 Body에 담기는 데이터는 거의 대부분 JSON 형식입니다.

```json
{
  "name": "홍길동",
  "age": 25,
  "hobbies": ["독서", "코딩"],
  "address": {
    "city": "서울",
    "zipcode": "12345"
  }
}
```

**JavaScript 객체와의 차이:**
- JSON의 키(key)는 반드시 **쌍따옴표(`"`)**로 감싸야 합니다
- JSON은 **문자열(텍스트)**이고, JavaScript 객체는 **메모리에 있는 데이터**입니다
- 변환 방법:
  - 객체 → JSON 문자열: `JSON.stringify(obj)`
  - JSON 문자열 → 객체: `JSON.parse(jsonString)`

```javascript
// JavaScript 객체 → JSON 문자열
const user = { name: "홍길동", age: 25 };
const jsonString = JSON.stringify(user);
// 결과: '{"name":"홍길동","age":25}' (텍스트)

// JSON 문자열 → JavaScript 객체
const parsed = JSON.parse(jsonString);
// 결과: { name: "홍길동", age: 25 } (객체)
```

---

## 2. 동기와 비동기 프로그래밍

### 2-1. 동기(Synchronous) 방식

**동기 방식**은 코드가 **위에서 아래로 한 줄씩, 순서대로** 실행되는 방식입니다.
한 작업이 끝나야 다음 작업이 시작됩니다.

```
실생활 비유: 카페에서 줄 서서 기다리기

1. 1번 손님 주문 → 음료 제조 → 음료 받음
2. (1번이 끝나야) 2번 손님 주문 → 음료 제조 → 음료 받음
3. (2번이 끝나야) 3번 손님 주문 → ...
```

```javascript
// 동기 방식 예시
console.log("1번: 시작");
console.log("2번: 작업 중...");  // 1번이 끝나야 실행
console.log("3번: 끝");          // 2번이 끝나야 실행

// 출력 결과 (항상 이 순서):
// 1번: 시작
// 2번: 작업 중...
// 3번: 끝
```

동기 방식은 직관적이고 이해하기 쉽지만, **시간이 오래 걸리는 작업이 있으면 그 동안 아무것도 못 합니다.**

---

### 2-2. 비동기(Asynchronous) 방식

**비동기 방식**은 시간이 오래 걸리는 작업을 **기다리지 않고**, 다음 코드를 먼저 실행하는 방식입니다.
오래 걸리는 작업이 끝나면, 그때 결과를 처리합니다.

```
실생활 비유: 카페에서 진동벨 받기

1. 1번 손님 주문 → 진동벨 받음 → 자리에 가서 다른 일 함
2. 2번 손님 주문 → 진동벨 받음 → 자리에 가서 다른 일 함
3. (삐삐삐!) 1번 손님 진동벨 울림 → 음료 받으러 감
4. (삐삐삐!) 2번 손님 진동벨 울림 → 음료 받으러 감
```

```javascript
// 비동기 방식 예시
console.log("1번: 시작");

setTimeout(() => {
  console.log("2번: 3초 후 실행되는 작업");
}, 3000);  // 3초 뒤에 실행

console.log("3번: 바로 실행");

// 출력 결과:
// 1번: 시작
// 3번: 바로 실행       ← 2번을 기다리지 않고 먼저 실행!
// 2번: 3초 후 실행되는 작업  ← 3초 뒤에 실행
```

> `setTimeout`은 "일정 시간 뒤에 함수를 실행해줘"라는 의미입니다. 여기서는 비동기 동작을 보여주기 위한 예시로 사용했습니다.

---

### 2-3. 왜 비동기가 필요한가?

**API 호출은 네트워크를 통해 서버에 요청을 보내고 응답을 받는 작업**이기 때문에, 시간이 얼마나 걸릴지 알 수 없습니다. (네트워크 상태, 서버 처리 시간 등에 따라 다름)

만약 이것을 동기 방식으로 처리하면:

```
동기 방식으로 API를 호출하면?

1. 앱 실행
2. 서버에 회원 목록 요청 ──── 서버 응답 대기 중... (3초)
   │                         이 동안 앱이 완전히 멈춤!
   │                         화면 스크롤도 안 됨!
   │                         버튼 터치도 안 됨!
   │
3. 응답 도착 → 화면에 표시
```

```
비동기 방식으로 API를 호출하면?

1. 앱 실행
2. 서버에 회원 목록 요청 → "로딩 중..." 표시 → 다른 UI 정상 동작
   │                                            (스크롤 가능, 버튼 터치 가능)
3. 응답 도착 → "로딩 중..." 을 회원 목록으로 교체
```

이것이 바로 **앱에서 API 호출을 비동기로 처리해야 하는 이유**입니다.

---

### 2-4. Promise

`Promise`는 JavaScript에서 비동기 작업을 다루기 위한 **객체**입니다.
"지금은 결과가 없지만, **나중에 결과를 알려줄게**"라는 **약속(Promise)**입니다.

```
Promise의 3가지 상태:

Pending (대기중)  →  작업이 아직 진행 중
Fulfilled (이행됨)  →  작업이 성공적으로 완료됨
Rejected (거부됨)   →  작업이 실패함
```

```javascript
// Promise 기본 사용법
const myPromise = new Promise((resolve, reject) => {
  // 비동기 작업 수행
  const success = true;

  if (success) {
    resolve("성공한 결과!");   // 성공 시 → Fulfilled 상태
  } else {
    reject("실패한 이유...");   // 실패 시 → Rejected 상태
  }
});

// Promise 결과 처리
myPromise
  .then((result) => {
    console.log(result);  // "성공한 결과!"
  })
  .catch((error) => {
    console.log(error);   // "실패한 이유..."
  });
```

**`.then()`** 은 성공했을 때 실행되고, **`.catch()`** 는 실패했을 때 실행됩니다.

> Promise를 직접 만들 일은 많지 않습니다. 보통 `fetch`나 `axios` 같은 라이브러리가 내부적으로 Promise를 반환하기 때문에, 우리는 **Promise를 사용하는 방법**만 알면 됩니다.

---

### 2-5. async / await

`async`와 `await`는 Promise를 **더 읽기 쉽게** 사용하기 위한 문법입니다.
`.then().catch()`를 쓰는 대신, **마치 동기 코드처럼** 비동기 코드를 작성할 수 있습니다.

#### 기본 규칙

```javascript
// 규칙 1: await를 쓰려면, 그 함수 앞에 반드시 async를 붙여야 합니다
async function 함수이름() {
  // 규칙 2: 비동기 작업(Promise를 반환하는 작업) 앞에 await를 붙입니다
  const result = await 비동기작업();
  // await 가 붙으면 → 이 작업이 끝날 때까지 기다린 다음 → 다음 줄 실행
}
```

#### Promise 방식 vs async/await 방식 비교

```javascript
// Promise 방식 (.then 체이닝)
function getUserWithPromise() {
  fetch("https://api.example.com/users/1")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.name);  // "홍길동"
    })
    .catch((error) => {
      console.log("에러 발생:", error);
    });
}

// async/await 방식 (훨씬 읽기 쉬움!)
async function getUserWithAsync() {
  try {
    const response = await fetch("https://api.example.com/users/1");
    const data = await response.json();
    console.log(data.name);  // "홍길동"
  } catch (error) {
    console.log("에러 발생:", error);
  }
}
```

두 코드는 **완전히 같은 동작**을 합니다. 하지만 `async/await` 방식이 위에서 아래로 자연스럽게 읽히기 때문에, 실무에서도 거의 항상 `async/await`를 사용합니다.

#### 화살표 함수에서의 async

```javascript
// 일반 함수
async function fetchData() {
  const result = await someAsyncWork();
}

// 화살표 함수 — async 위치가 다릅니다
const fetchData = async () => {
  const result = await someAsyncWork();
};
```

#### await를 쓰지 않으면 어떻게 될까?

```javascript
async function example() {
  // await 없이 호출하면 → Promise 객체 자체가 반환됨
  const result = fetch("https://api.example.com/users");
  console.log(result);  // Promise { <pending> }  ← 데이터가 아님!

  // await 를 붙이면 → Promise가 완료될 때까지 기다린 후 결과를 반환
  const result2 = await fetch("https://api.example.com/users");
  console.log(result2);  // Response 객체 ← 실제 응답 데이터!
}
```

---

### 2-6. 에러 핸들링: try-catch

네트워크 요청은 언제든지 실패할 수 있습니다 (인터넷 끊김, 서버 다운, 잘못된 URL 등).
**`try-catch`** 로 에러를 잡아서 앱이 크래시(종료)되지 않게 해야 합니다.

```javascript
async function fetchUsers() {
  try {
    // try 블록: "이 안의 코드를 시도해봐"
    const response = await fetch("https://api.example.com/users");
    const data = await response.json();
    console.log("유저 목록:", data);
  } catch (error) {
    // catch 블록: "try에서 에러가 나면 여기로 와"
    console.log("에러 발생:", error.message);
    // 사용자에게 "네트워크 오류입니다" 같은 메시지를 보여줄 수 있음
  }
}
```

```
try-catch 동작 흐름:

[try 블록 시작]
    │
    ├── 성공 → try 블록 끝까지 실행 → catch 건너뜀 → 끝
    │
    └── 에러 발생! → try 블록 중단 → catch 블록 실행 → 끝
```

> **반드시 기억하세요:** API 호출 코드에는 항상 try-catch를 감싸야 합니다. 이것은 선택이 아니라 **필수**입니다.

---

## 3. fetch API

### 3-1. fetch란?

`fetch`는 JavaScript에 **기본으로 내장된** HTTP 요청 함수입니다.
별도의 설치 없이 바로 사용할 수 있습니다.

```javascript
// fetch는 Promise를 반환합니다
const response = await fetch("https://api.example.com/users");
```

---

### 3-2. fetch의 기본 구조

```javascript
fetch(url, options)
```

**인자 설명:**

| 인자 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `url` | string | O | 요청을 보낼 서버 주소 |
| `options` | object | X | 요청에 대한 추가 설정 (메서드, 헤더, 바디 등) |

**options 객체의 주요 속성:**

```javascript
fetch(url, {
  method: "POST",           // HTTP 메서드 (기본값: "GET")
  headers: {                // 헤더 정보
    "Content-Type": "application/json",
  },
  body: JSON.stringify({    // 보낼 데이터 (문자열로 변환해야 함!)
    name: "홍길동",
    age: 25,
  }),
});
```

> **중요:** fetch의 body에는 **반드시 문자열**을 넣어야 합니다. JavaScript 객체를 그대로 넣으면 안 되고, `JSON.stringify()`로 변환해야 합니다.

---

### 3-3. GET 요청

```javascript
// GET 요청 — 데이터 조회
// GET은 기본값이므로 method를 명시하지 않아도 됩니다
async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // response.ok로 성공 여부 확인 (상태 코드 200~299이면 true)
    if (!response.ok) {
      throw new Error(`HTTP 에러! 상태 코드: ${response.status}`);
    }

    // 응답 본문을 JSON으로 변환 (이것도 비동기 작업이므로 await 필요!)
    const data = await response.json();

    console.log(data);
    // [{ id: 1, name: "Leanne Graham", ... }, { id: 2, ... }, ...]
  } catch (error) {
    console.log("에러:", error.message);
  }
}
```

> **주의:** `response.json()`도 비동기 작업이므로 `await`를 붙여야 합니다. 빼먹기 쉬운 부분입니다!

---

### 3-4. POST 요청

```javascript
// POST 요청 — 새 데이터 생성
async function createUser() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",                          // 메서드 지정
      headers: {
        "Content-Type": "application/json",    // "JSON 형식으로 보냅니다"
      },
      body: JSON.stringify({                   // 객체를 JSON 문자열로 변환
        name: "홍길동",
        email: "hong@example.com",
        phone: "010-1234-5678",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP 에러! 상태 코드: ${response.status}`);
    }

    const data = await response.json();
    console.log("생성된 유저:", data);
    // { id: 11, name: "홍길동", email: "hong@example.com", phone: "010-1234-5678" }
  } catch (error) {
    console.log("에러:", error.message);
  }
}
```

---

### 3-5. fetch의 특징과 주의점

```
fetch의 특징:

✅ 장점
- JavaScript에 내장되어 있어서 설치 불필요
- 가볍고 간단함

⚠️ 주의점 (단점)
- 응답을 받은 후 response.json()으로 직접 변환해야 함
- body에 넣을 데이터를 JSON.stringify()로 직접 변환해야 함
- HTTP 에러(404, 500 등)가 발생해도 catch로 가지 않음!
  → response.ok 또는 response.status로 직접 확인해야 함
- 요청 타임아웃 설정이 불편함
```

> 세 번째 주의점이 특히 중요합니다. fetch는 **네트워크 자체가 실패**(인터넷 끊김)했을 때만 에러를 던지고, **서버가 404나 500 등의 에러 응답을 보내도 에러로 취급하지 않습니다.** 그래서 `response.ok`를 직접 확인해야 합니다.

---

## 4. axios

### 4-1. axios란?

**axios**는 HTTP 요청을 보내기 위한 **외부 라이브러리**입니다.
fetch보다 더 편리한 기능들을 제공하며, 실무에서 가장 많이 쓰이는 HTTP 클라이언트입니다.

---

### 4-2. 설치

```bash
npm install axios
```

```javascript
// 사용할 파일에서 import
import axios from "axios";
```

---

### 4-3. axios의 기본 구조

axios는 HTTP 메서드에 대응하는 함수를 제공합니다:

```javascript
axios.get(url, config)              // GET 요청
axios.post(url, data, config)       // POST 요청
axios.put(url, data, config)        // PUT 요청
axios.patch(url, data, config)      // PATCH 요청
axios.delete(url, config)           // DELETE 요청
```

**인자 설명:**

| 인자 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `url` | string | O | 요청을 보낼 서버 주소 |
| `data` | object | X | 서버에 보낼 데이터 (POST, PUT, PATCH에서 사용) |
| `config` | object | X | 추가 설정 (헤더, 타임아웃 등) |

**config 객체의 주요 속성:**

```javascript
{
  headers: {                          // 헤더 설정
    "Authorization": "Bearer token123",
  },
  params: {                           // URL 쿼리 파라미터 (?key=value)
    page: 1,
    limit: 10,
  },
  timeout: 5000,                      // 타임아웃 (5초, 밀리초 단위)
}
```

**fetch와의 핵심 차이:**
- axios는 **data를 객체 그대로 넘기면 됩니다** (`JSON.stringify()` 불필요!)
- axios는 **응답도 자동으로 JSON 변환**됩니다 (`.json()` 호출 불필요!)
- axios는 **HTTP 에러(404, 500 등)도 catch로 넘깁니다** (`response.ok` 확인 불필요!)

---

### 4-4. GET 요청

```javascript
import axios from "axios";

// GET 요청 — 데이터 조회
async function getUsers() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");

    // response.data에 응답 데이터가 들어있음 (자동 JSON 변환 완료!)
    console.log(response.data);
    // [{ id: 1, name: "Leanne Graham", ... }, { id: 2, ... }, ...]

    // response 객체에는 다른 정보도 있음
    console.log(response.status);     // 200
    console.log(response.headers);    // 응답 헤더
  } catch (error) {
    // HTTP 에러(404, 500 등)도 여기로 옵니다!
    console.log("에러:", error.message);
  }
}

// 쿼리 파라미터가 있는 GET 요청
async function getUsersPaginated() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users", {
      params: {                    // ?_page=1&_limit=5 로 자동 변환됨
        _page: 1,
        _limit: 5,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log("에러:", error.message);
  }
}
```

---

### 4-5. POST 요청

```javascript
import axios from "axios";

// POST 요청 — 새 데이터 생성
async function createUser() {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",  // URL
      {                                               // data (객체 그대로!)
        name: "홍길동",
        email: "hong@example.com",
        phone: "010-1234-5678",
      }
    );

    console.log("생성된 유저:", response.data);
    console.log("상태 코드:", response.status);  // 201
  } catch (error) {
    console.log("에러:", error.message);
  }
}

// 헤더를 추가해야 하는 POST 요청 (예: 인증 토큰)
async function createUserWithAuth() {
  try {
    const response = await axios.post(
      "https://api.example.com/users",    // URL
      {                                    // data
        name: "홍길동",
      },
      {                                    // config (세 번째 인자)
        headers: {
          Authorization: "Bearer my-token-123",
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log("에러:", error.message);
  }
}
```

> **fetch와 비교**: fetch는 `body: JSON.stringify(data)` + `headers: {"Content-Type": "application/json"}` 을 매번 써야 하지만, axios는 객체만 넘기면 됩니다. 훨씬 간편합니다.

---

### 4-6. axios 인스턴스

실무에서는 **같은 서버에 여러 번 요청**을 보냅니다.
매번 URL 전체와 헤더를 쓰는 것은 비효율적이므로, **인스턴스**를 만들어 공통 설정을 한 곳에서 관리합니다.

```javascript
import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://api.example.com",    // 기본 URL (모든 요청의 앞에 자동으로 붙음)
  timeout: 10000,                         // 타임아웃 10초
  headers: {
    "Content-Type": "application/json",
  },
});

// 인스턴스를 사용한 요청 — baseURL이 자동으로 앞에 붙음
async function getUsers() {
  // 실제 요청 URL: https://api.example.com/users
  const response = await api.get("/users");
  return response.data;
}

async function createUser(userData) {
  // 실제 요청 URL: https://api.example.com/users
  const response = await api.post("/users", userData);
  return response.data;
}

async function deleteUser(userId) {
  // 실제 요청 URL: https://api.example.com/users/3
  const response = await api.delete(`/users/${userId}`);
  return response.data;
}
```

> 인스턴스를 별도 파일(예: `api/axiosInstance.ts`)에 만들어두고 내보내면(export), 프로젝트 어디서든 import해서 사용할 수 있습니다. 이것이 실무에서의 표준 패턴입니다.

---

### 4-7. 인터셉터(Interceptor)

인터셉터는 **요청을 보내기 전** 또는 **응답을 받은 후**에 자동으로 실행되는 함수입니다.
로그인 토큰 자동 추가, 에러 공통 처리 등에 사용됩니다.

```
요청 흐름:

[코드에서 API 호출]
      │
      ▼
[요청 인터셉터] ← 요청이 나가기 전에 가로채서 수정 가능
      │
      ▼
[서버로 요청 전송]
      │
      ▼
[서버에서 응답]
      │
      ▼
[응답 인터셉터] ← 응답이 코드로 도착하기 전에 가로채서 처리 가능
      │
      ▼
[코드에서 응답 사용]
```

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
});

// 요청 인터셉터: 모든 요청에 자동으로 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = "my-auth-token";  // 실제로는 저장소에서 가져옴
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("요청 보냄:", config.url);
    return config;  // 반드시 config를 반환해야 함!
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 공통 에러 처리
api.interceptors.response.use(
  (response) => {
    // 성공 응답은 그대로 반환
    return response;
  },
  (error) => {
    // 에러 응답 공통 처리
    if (error.response?.status === 401) {
      console.log("인증 만료! 로그인 화면으로 이동해야 합니다");
    }
    return Promise.reject(error);
  }
);
```

> 인터셉터는 지금 당장 이해하지 않아도 괜찮습니다. "이런 기능이 있구나" 정도만 기억하고, 실무에서 필요할 때 활용하면 됩니다.

---

### 4-8. fetch vs axios 비교

| 기준 | fetch | axios |
|------|-------|-------|
| 설치 | 불필요 (내장) | `npm install axios` 필요 |
| JSON 변환 | `response.json()` 수동 호출 | `response.data` 자동 변환 |
| 데이터 전송 | `JSON.stringify()` 필요 | 객체 그대로 전달 |
| HTTP 에러 처리 | `response.ok` 수동 확인 | 자동으로 catch로 전달 |
| 타임아웃 | 별도 구현 필요 | `timeout` 옵션으로 간단 설정 |
| 인스턴스 | 없음 | `axios.create()`로 공통 설정 관리 |
| 인터셉터 | 없음 | 요청/응답 가로채기 가능 |
| 브라우저 지원 | 대부분 지원 | 모든 환경 지원 |

```javascript
// 같은 POST 요청을 fetch와 axios로 비교

// fetch 방식
const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "홍길동" }),
});
if (!response.ok) throw new Error("에러!");
const data = await response.json();

// axios 방식
const response = await axios.post("https://api.example.com/users", {
  name: "홍길동",
});
const data = response.data;
```

> **결론:** 학습 목적으로 fetch를 이해하되, 실무에서는 axios를 사용하는 것을 추천합니다.

---

## 5. useEffect + API 조합 패턴

### 5-1. 컴포넌트에서 API를 호출하는 시점

React Native에서 **화면이 처음 나타날 때 서버에서 데이터를 가져오는 것**은 가장 흔한 패턴입니다.
3주차에서 배운 `useEffect`와 API 호출을 조합합니다.

```tsx
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function UserListScreen() {
  const [users, setUsers] = useState([]);

  // useEffect로 "화면이 처음 나타날 때" API 호출
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
      } catch (error) {
        console.log("에러:", error.message);
      }
    };

    fetchUsers();
  }, []);  // 빈 배열 [] = 컴포넌트가 처음 마운트될 때 한 번만 실행

  return (
    <View>
      {users.map((user) => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </View>
  );
}
```

**왜 useEffect 안에서 별도 함수를 만드나요?**

```javascript
// ❌ useEffect의 콜백 자체를 async로 만들면 안 됩니다!
useEffect(async () => {        // 이렇게 하면 안 됨!
  const data = await fetchData();
}, []);

// ✅ 내부에 async 함수를 만들어서 즉시 호출합니다
useEffect(() => {
  const loadData = async () => {
    const data = await fetchData();
  };
  loadData();                  // 함수 정의 후 바로 실행
}, []);
```

> useEffect의 콜백 함수는 cleanup 함수를 반환할 수 있는데, async 함수는 Promise를 반환하기 때문에 충돌합니다. 그래서 내부에 별도의 async 함수를 만듭니다.

---

### 5-2. 로딩 / 에러 / 데이터 상태 관리 패턴

실제 앱에서는 API 호출 중에 **로딩 표시**, 에러 시 **에러 메시지**, 성공 시 **데이터 표시**를 해야 합니다.
이것은 매우 자주 쓰이는 패턴이므로 꼭 기억하세요.

```tsx
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import axios from "axios";

export default function UserListScreen() {
  // 3가지 상태를 관리합니다
  const [users, setUsers] = useState([]);         // 데이터
  const [loading, setLoading] = useState(true);   // 로딩 중 여부
  const [error, setError] = useState(null);        // 에러 메시지

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);     // 요청 시작 → 로딩 ON
        setError(null);        // 이전 에러 초기화

        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);  // 성공 → 데이터 저장

      } catch (err) {
        setError("데이터를 불러오는데 실패했습니다.");  // 실패 → 에러 저장

      } finally {
        setLoading(false);    // 성공이든 실패든 → 로딩 OFF
      }
    };

    fetchUsers();
  }, []);

  // --- 화면 렌더링 ---

  // 1. 로딩 중일 때
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>로딩 중...</Text>
      </View>
    );
  }

  // 2. 에러가 있을 때
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  // 3. 데이터가 있을 때 (정상)
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        유저 목록
      </Text>
      {users.map((user) => (
        <Text key={user.id} style={{ fontSize: 16, marginBottom: 5 }}>
          {user.name} — {user.email}
        </Text>
      ))}
    </View>
  );
}
```

```
화면 상태 흐름:

[컴포넌트 마운트]
      │
      ▼
loading: true  →  "로딩 중..." 표시
      │
      ├── API 성공 → loading: false, data: [...] → 유저 목록 표시
      │
      └── API 실패 → loading: false, error: "..." → 에러 메시지 표시
```

> **`finally`** 블록은 try가 성공하든 catch가 실행되든 **무조건 실행**되는 코드입니다. 로딩 상태를 끄는 데 딱 맞습니다.

---

### 5-3. 환경변수로 API URL 관리하기

API URL을 코드 곳곳에 직접 쓰면, 서버 주소가 바뀔 때 모든 파일을 수정해야 합니다.
**환경변수(.env)** 파일에 URL을 저장하고, 코드에서는 변수로 참조하는 것이 좋은 습관입니다.

```bash
# .env 파일 (프로젝트 루트에 생성)
EXPO_PUBLIC_API_URL=https://api.example.com
```

```javascript
// 코드에서 사용
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const response = await axios.get(`${API_URL}/users`);
```

> **Expo에서의 규칙:** 환경변수 이름이 반드시 `EXPO_PUBLIC_`으로 시작해야 앱에서 접근할 수 있습니다. 그리고 `.env` 파일은 `.gitignore`에 추가하여 git에 올라가지 않도록 합니다 (API 키 등 민감한 정보 보호).

---

## 6. 전역 상태관리

### 6-1. props drilling 문제

1주차에서 부모 → 자식으로 props를 전달하는 방법을 배웠습니다.
하지만 컴포넌트 구조가 깊어지면 **중간 컴포넌트들이 자신은 사용하지도 않는 데이터를 단순히 전달만 해야 하는** 문제가 생깁니다.

```
props drilling 예시:

App (유저 이름: "홍길동")
  │
  └── HomePage (props: userName="홍길동")  ← 이 컴포넌트는 안 쓰는데 받아야 함
        │
        └── Sidebar (props: userName="홍길동")  ← 이것도 안 쓰는데 받아야 함
              │
              └── UserProfile (props: userName="홍길동")  ← 여기서만 실제로 사용!
```

```tsx
// ❌ props drilling — 중간 컴포넌트가 불필요하게 props를 전달
function App() {
  const userName = "홍길동";
  return <HomePage userName={userName} />;
}

function HomePage({ userName }) {
  // userName을 쓰지 않지만, 자식에게 전달하기 위해 받아야 함
  return <Sidebar userName={userName} />;
}

function Sidebar({ userName }) {
  // 여기서도 안 쓰지만 전달해야 함
  return <UserProfile userName={userName} />;
}

function UserProfile({ userName }) {
  // 실제로 사용하는 곳은 여기뿐!
  return <Text>{userName}</Text>;
}
```

이 구조의 문제점:
- 중간 컴포넌트들이 불필요한 props를 가짐
- 컴포넌트 구조가 바뀌면 props 전달 경로도 전부 수정해야 함
- 어떤 데이터가 어디서 사용되는지 파악하기 어려움

---

### 6-2. 전역 상태관리가 필요한 이유

**전역 상태(Global State)** 는 앱 어디서든 접근할 수 있는 공유 데이터입니다.
전역 저장소를 사용하면, props를 일일이 전달하지 않아도 **필요한 컴포넌트에서 바로 데이터를 가져올 수 있습니다.**

```
전역 저장소 사용 시:

┌──────────────────────────────────┐
│     전역 저장소 (Store)            │
│     userName: "홍길동"            │
└──────┬──────────────┬────────────┘
       │              │
       │              │  (중간 컴포넌트를 거치지 않고 직접 접근!)
       │              │
  App  │     HomePage │     Sidebar      UserProfile
       │              │                      │
       │              │                      ▼
       │              │              store에서 직접 꺼내 씀
```

**전역 상태로 관리하기 좋은 데이터:**
- 로그인한 유저 정보
- 앱 테마 (다크모드 / 라이트모드)
- 서버에서 받아온 공통 데이터
- 장바구니, 알림 카운트 등

---

### 6-3. 전역 상태관리 라이브러리 종류

| 라이브러리 | 특징 | 학습 난이도 |
|-----------|------|-----------|
| **Context API** | React 내장, 간단한 상태에 적합 | 낮음 |
| **Zustand** | 간결하고 직관적, 보일러플레이트 최소 | 낮음 |
| **Redux** | 가장 오래되고 널리 쓰임, 보일러플레이트 많음 | 높음 |
| **Recoil** | Facebook 개발, atom 기반 | 중간 |
| **Jotai** | atom 기반, Zustand와 비슷한 컨셉 | 낮음 |
| **MobX** | 옵저버 패턴, 자동 추적 | 중간 |

> 우리는 **Zustand**를 사용합니다. 코드가 간결하고, 학습 곡선이 낮으며, 최근 실무에서도 많이 채택되고 있습니다.

---

## 7. Zustand

### 7-1. Zustand란?

Zustand(독일어로 "상태"라는 뜻)는 React 애플리케이션을 위한 **작고 빠르고 간결한 전역 상태관리 라이브러리**입니다.

**Zustand의 핵심 컨셉:**
- **Store**: 상태(데이터)와 그 상태를 변경하는 함수(액션)를 한 곳에 모아둔 저장소
- **Hook**: 컴포넌트에서 Store에 접근하기 위해 사용하는 커스텀 훅

```
Zustand 동작 흐름:

[Store 생성]  →  상태(state)와 액션(action) 정의
      │
      ▼
[컴포넌트에서 Hook으로 접근]  →  useStore()
      │
      ▼
[액션 호출]  →  상태 변경  →  해당 상태를 구독 중인 컴포넌트만 자동 리렌더링
```

---

### 7-2. 설치

```bash
npm install zustand
```

---

### 7-3. Store 만들기

#### 기본 구조 전체 해부

```typescript
// store/useCounterStore.ts
import { create } from "zustand";

// ① 타입 정의 — Store 안에 무엇이 들어있는지 TypeScript에게 알려줍니다
interface CounterState {
  count: number;            // 상태(데이터): 화면에 표시되는 값
  increase: () => void;     // 액션(함수): 상태를 바꾸는 행동
  decrease: () => void;
  reset: () => void;
  setCount: (n: number) => void;
}

// ② Store 생성
//    create<CounterState>(...) 의 제네릭(<CounterState>)은
//    "이 Store는 CounterState 모양을 가진다"는 선언입니다
const useCounterStore = create<CounterState>((set, get) => ({

  // ③ 초기 상태값 선언
  count: 0,

  // ④ 액션 정의
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  setCount: (n) => set({ count: n }),
}));

export default useCounterStore;
```

**전체 구조를 한 문장으로:** `create`에 콜백을 넘기면 그 콜백의 반환값이 곧 Store의 초기 상태+액션 묶음이 됩니다. `set`과 `get`은 Zustand가 콜백의 인자로 자동으로 주입해 주는 내장 도구입니다.

---

#### `set` — 상태를 바꾸는 유일한 방법

Zustand에서 상태를 바꾸려면 반드시 `set`을 사용해야 합니다. 직접 값을 덮어쓰면 화면이 갱신되지 않습니다.

**형태 1: 객체를 직접 전달 — 값이 확정되어 있을 때**

```javascript
// count를 무조건 0으로 바꾼다
reset: () => set({ count: 0 }),

// 여러 상태를 한 번에 바꿀 수도 있다
initialize: () => set({ count: 0, loading: false, error: null }),
```

`set`은 전달한 키만 갱신합니다(얕은 병합). Store 전체를 교체하지 않으므로 나머지 상태는 그대로 유지됩니다.

**형태 2: 콜백 함수를 전달 — 현재 상태를 기반으로 바꿀 때**

```javascript
// 현재 count에서 +1
increase: () => set((state) => ({ count: state.count + 1 })),

// 배열에 항목 추가 — 기존 배열을 스프레드로 복사하고 새 항목 추가
addItem: (item) => set((state) => ({ items: [...state.items, item] })),

// 배열에서 항목 제거
removeItem: (id) => set((state) => ({
  items: state.items.filter((item) => item.id !== id),
})),
```

`set((state) => ...)` 패턴에서 `state`는 **현재 Store의 전체 스냅샷**입니다. 여기서 변경하고 싶은 키만 담긴 객체를 반환하면 Zustand가 나머지는 건드리지 않고 해당 키만 덮어씁니다.

**`set`을 쓰지 말아야 할 것 (절대 금지):**

```javascript
// ❌ 직접 수정 — React/Zustand가 변경을 감지하지 못합니다
increase: () => { count++ },

// ❌ Store 외부에서 직접 수정
useCounterStore.getState().count = 10,  // 작동은 하지만 리렌더링 안 됨
```

---

#### `state` — 현재 Store 전체를 보는 창

`set((state) => ...)` 콜백 안의 `state`는 **호출 시점의 Store 상태 전체**입니다.

```javascript
// state 안에는 Store에 선언한 모든 것이 들어 있습니다
increase: () => set((state) => {
  console.log(state.count);     // 현재 count 값
  console.log(state.increase);  // 액션 함수도 들어 있습니다
  return { count: state.count + 1 };
}),
```

여러 상태를 함께 읽고 계산이 복잡해질 때 특히 유용합니다:

```javascript
// count가 10 이상일 때만 증가
safeIncrease: () => set((state) => {
  if (state.count >= 10) return {};           // 아무것도 변경하지 않음
  return { count: state.count + 1 };
}),
```

> 반환값이 빈 객체 `{}`이면 Zustand는 상태를 변경하지 않습니다.

---

#### `get` — 액션 안에서 현재 상태 읽기

`get`은 `set`처럼 콜백 형태가 아니라 **함수를 직접 호출**해서 현재 Store 전체를 가져옵니다. 비동기 액션처럼 콜백 패턴을 쓰기 어려운 상황에서 특히 유용합니다.

```typescript
const useCounterStore = create<CounterState>((set, get) => ({
  count: 0,

  // get()을 쓰면 비동기 흐름 안에서도 언제든 최신 상태를 읽을 수 있습니다
  fetchAndDouble: async () => {
    await someApiCall();
    const current = get().count;   // 비동기 작업 완료 후 최신 count 읽기
    set({ count: current * 2 });
  },

  // 조건 분기가 복잡할 때도 유용합니다
  incrementIfOdd: () => {
    const { count } = get();       // 현재 상태 구조분해
    if (count % 2 !== 0) {
      set({ count: count + 1 });
    }
  },
}));
```

**`set(state => ...)` vs `get()` 비교:**

| 상황 | 권장 방법 |
|---|---|
| 단순 상태 계산 (동기) | `set((state) => ({ ... }))` |
| 비동기 함수 안에서 최신 상태 읽기 | `get()` |
| 조건 분기가 많아 콜백이 길어질 때 | `get()` |

---

#### Store 외부에서 상태·액션 접근하기 — `getState()` / `setState()`

컴포넌트나 Hook 밖(예: 유틸 함수, 이벤트 리스너)에서도 Store에 접근할 수 있습니다.

```typescript
// 컴포넌트 밖에서 현재 상태 읽기
const currentCount = useCounterStore.getState().count;

// 컴포넌트 밖에서 액션 실행
useCounterStore.getState().increase();

// 컴포넌트 밖에서 상태 직접 변경 (권장하지 않지만 가능)
useCounterStore.setState({ count: 99 });
```

> 주의: `getState()`로 읽은 값은 React 구독이 아니라 그냥 일반 변수처럼 한 번만 읽힙니다. 컴포넌트 안에서는 항상 `useCounterStore((state) => state.count)` 형태를 사용해야 상태 변경 시 리렌더링이 일어납니다.

---

#### `subscribe` — 상태 변화를 감시하기

특정 상태가 바뀔 때 사이드 이펙트(로그, 분석, 저장 등)를 실행하고 싶을 때 사용합니다.

```typescript
// count가 바뀔 때마다 콘솔에 출력
const unsubscribe = useCounterStore.subscribe(
  (state) => state.count,          // 감시할 상태 선택
  (newCount, prevCount) => {        // 변경 전/후 값 제공
    console.log(`카운터: ${prevCount} → ${newCount}`);
  }
);

// 더 이상 감시가 필요 없으면 해제
unsubscribe();
```

---

#### 최종 정리 — 자주 쓰는 API 한눈에 보기

```typescript
create<State>((set, get) => ({ ... }))   // Store 생성

// Store 내부 (액션 정의할 때)
set({ key: value })                       // 값 직접 교체
set((state) => ({ key: state.key + 1 })) // 현재 상태 기반 계산
get()                                     // 현재 Store 전체 스냅샷

// Store 외부 (컴포넌트 밖)
useMyStore.getState()                     // 현재 상태 읽기
useMyStore.setState({ key: value })       // 상태 변경
useMyStore.subscribe(selector, listener)  // 상태 변화 감시

// 컴포넌트 안
useMyStore((state) => state.key)          // 선택적 구독 (권장)
useMyStore()                              // 전체 구독 (비권장)
```

---

#### 전체 예시: 위 개념을 모두 녹인 Store

```typescript
import { create } from "zustand";

interface CounterState {
  count: number;
  history: number[];
  increase: () => void;
  decrease: () => void;
  reset: () => void;
  setCount: (n: number) => void;
  incrementIfOdd: () => void;
  fetchAndSet: () => Promise<void>;
}

const useCounterStore = create<CounterState>((set, get) => ({
  count: 0,
  history: [],

  // 현재 상태 기반 계산 → set(state => ...) 패턴
  increase: () =>
    set((state) => ({
      count: state.count + 1,
      history: [...state.history, state.count + 1],
    })),

  decrease: () =>
    set((state) => ({
      count: state.count - 1,
      history: [...state.history, state.count - 1],
    })),

  // 확정값 → set({...}) 패턴
  reset: () => set({ count: 0, history: [] }),

  setCount: (n) => set({ count: n }),

  // 조건 분기 → get() 패턴
  incrementIfOdd: () => {
    const { count } = get();
    if (count % 2 !== 0) {
      set((state) => ({ count: state.count + 1 }));
    }
  },

  // 비동기 → get()으로 최신 상태 읽기
  fetchAndSet: async () => {
    set({ count: 0 });  // 초기화
    await new Promise((r) => setTimeout(r, 1000));  // API 호출 대신 1초 대기
    const { count } = get();   // 1초 후 최신 count
    console.log("비동기 완료, 현재 count:", count);
    set({ count: count + 100 });
  },
}));

export default useCounterStore;
```

---

### 7-4. 컴포넌트에서 Store 사용하기

```tsx
// app/(tabs)/counter.tsx
import { View, Text, Button } from "react-native";
import useCounterStore from "../../store/useCounterStore";

export default function CounterScreen() {
  // Store에서 필요한 상태와 액션만 가져옵니다
  const count = useCounterStore((state) => state.count);
  const increase = useCounterStore((state) => state.increase);
  const decrease = useCounterStore((state) => state.decrease);
  const reset = useCounterStore((state) => state.reset);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 48 }}>{count}</Text>
      <Button title="+" onPress={increase} />
      <Button title="-" onPress={decrease} />
      <Button title="초기화" onPress={reset} />
    </View>
  );
}
```

**선택적 구독(Selective Subscription):**

```javascript
// ✅ 필요한 것만 가져오기 (권장)
const count = useCounterStore((state) => state.count);
// → count가 바뀔 때만 이 컴포넌트가 리렌더링됩니다

// ❌ 전체 Store 가져오기 (비권장)
const store = useCounterStore();
// → Store의 어떤 값이든 바뀌면 이 컴포넌트가 리렌더링됩니다
```

> **중요:** `useCounterStore((state) => state.count)` 처럼 **필요한 값만 선택해서 가져오는 것**이 성능상 좋습니다. 전체 Store를 가져오면 불필요한 리렌더링이 발생할 수 있습니다.

---

### 7-5. API와 Zustand 연동하기

실무에서 가장 흔한 패턴: **API로 데이터를 가져와서 Store에 저장하고, 여러 화면에서 공유**합니다.

```typescript
// store/useUserStore.ts
import { create } from "zustand";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;     // API 호출 액션
  addUser: (user: User) => void;
}

const useUserStore = create<UserState>((set) => ({
  // --- 상태 ---
  users: [],
  loading: false,
  error: null,

  // --- 액션 ---
  fetchUsers: async () => {
    set({ loading: true, error: null });     // 로딩 시작

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      set({ users: response.data, loading: false });   // 성공 → 데이터 저장
    } catch (error) {
      set({ error: "데이터를 불러오지 못했습니다.", loading: false }); // 실패
    }
  },

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],   // 기존 배열에 새 유저 추가
    })),
}));

export default useUserStore;
```

```tsx
// app/(tabs)/user-list.tsx — 유저 목록 화면
import { useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import useUserStore from "../../store/useUserStore";

export default function UserListScreen() {
  const users = useUserStore((state) => state.users);
  const loading = useUserStore((state) => state.loading);
  const error = useUserStore((state) => state.error);
  const fetchUsers = useUserStore((state) => state.fetchUsers);

  // 화면이 처음 나타날 때 유저 목록을 가져옵니다
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text style={{ color: "red" }}>{error}</Text>;
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18 }}>{item.name}</Text>
          <Text style={{ color: "gray" }}>{item.email}</Text>
        </View>
      )}
    />
  );
}
```

```tsx
// app/(tabs)/user-count.tsx — 다른 화면에서도 같은 데이터에 접근 가능!
import { View, Text } from "react-native";
import useUserStore from "../../store/useUserStore";

export default function UserCountScreen() {
  // 같은 Store의 데이터를 다른 화면에서 바로 접근!
  // props로 전달받지 않아도 됩니다
  const userCount = useUserStore((state) => state.users.length);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>총 유저 수: {userCount}명</Text>
    </View>
  );
}
```

---

### 7-6. Zustand 사용 시 주의사항

```
1. set 함수 외에 상태을 직접 수정하지 마세요
   ❌ state.count = 10;
   ✅ set({ count: 10 });

2. 배열이나 객체를 수정할 때는 새로운 배열/객체를 만드세요
   ❌ set((state) => { state.users.push(newUser); })
   ✅ set((state) => ({ users: [...state.users, newUser] }))

3. 필요한 상태만 선택적으로 구독하세요
   ❌ const store = useUserStore();
   ✅ const users = useUserStore((state) => state.users);

4. Store는 기능 단위로 분리하세요
   ✅ useUserStore — 유저 관련
   ✅ useCartStore — 장바구니 관련
   ❌ useEverythingStore — 모든 것을 하나에 넣지 마세요
```

---

## 8. 종합 정리

이번 주차에서 배운 내용의 전체 흐름입니다:

```
[HTTP 기초]
  클라이언트-서버 구조, 요청/응답, 메서드, 상태코드, JSON
      │
      ▼
[동기/비동기]
  동기 vs 비동기 개념, Promise, async/await, try-catch
      │
      ▼
[API 호출]
  fetch (내장) → axios (라이브러리) → 인스턴스, 인터셉터
      │
      ▼
[Hook + API 조합]
  useEffect로 데이터 fetching, 로딩/에러/데이터 상태 패턴
      │
      ▼
[전역 상태관리]
  props drilling 문제 → 전역 저장소 필요성 → Zustand
      │
      ▼
[Zustand + API 연동]
  Store에서 API 호출 → 여러 화면에서 공유 데이터 사용
```

**핵심 기억 사항:**
1. API 호출은 **비동기**로 처리한다 (async/await)
2. 에러 핸들링은 **try-catch**로 반드시 감싼다
3. fetch보다 **axios**가 실무에서 편리하다
4. **axios 인스턴스**로 공통 설정을 관리한다
5. **useEffect + API**로 화면 진입 시 데이터를 가져온다
6. **로딩/에러/데이터** 3가지 상태를 항상 관리한다
7. props drilling을 피하려면 **Zustand** 같은 전역 저장소를 사용한다
8. Store에서 **필요한 상태만 선택적으로 구독**한다
