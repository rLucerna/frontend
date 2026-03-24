/**
 * fetch API 예시 파일
 *
 * JavaScript 내장 함수인 fetch를 사용한 HTTP 요청 예시입니다.
 * fetch의 기본 사용법, GET/POST 요청 방법을 보여줍니다.
 *
 * fetch 기본 구조:
 *   fetch(url, options?)
 *   - url: 요청을 보낼 서버 주소 (string, 필수)
 *   - options: 추가 설정 객체 (선택)
 *     - method: HTTP 메서드 ("GET", "POST", "PUT", "DELETE")
 *     - headers: 헤더 정보 객체
 *     - body: 보낼 데이터 (JSON.stringify로 문자열 변환 필요!)
 */

const BASE_URL = "https://jsonplaceholder.typicode.com";

// ──────────────────────────────────────────
// GET 요청: 유저 목록 가져오기
// ──────────────────────────────────────────
export async function fetchGetUsers() {
  try {
    // fetch의 기본 메서드는 GET이므로 options를 생략할 수 있습니다
    const response = await fetch(`${BASE_URL}/users`);

    // fetch는 HTTP 에러(404, 500)를 에러로 취급하지 않습니다!
    // 그래서 response.ok로 직접 확인해야 합니다
    if (!response.ok) {
      throw new Error(`HTTP 에러! 상태 코드: ${response.status}`);
    }

    // 응답 본문을 JSON으로 변환 (비동기이므로 await 필요!)
    const data = await response.json();

    console.log("=== fetch GET 결과 ===");
    console.log(`총 ${data.length}명의 유저를 가져왔습니다.`);
    console.log("첫 번째 유저:", data[0].name);

    return data;
  } catch (error: any) {
    console.log("fetch GET 에러:", error.message);
    throw error;
  }
}

// ──────────────────────────────────────────
// GET 요청: 특정 유저 1명 가져오기
// ──────────────────────────────────────────
export async function fetchGetUserById(userId: number) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP 에러! 상태 코드: ${response.status}`);
    }

    const data = await response.json();

    console.log("=== fetch GET (단건) 결과 ===");
    console.log(`유저 이름: ${data.name}, 이메일: ${data.email}`);

    return data;
  } catch (error: any) {
    console.log("fetch GET 에러:", error.message);
    throw error;
  }
}

// ──────────────────────────────────────────
// POST 요청: 새 유저 생성하기
// ──────────────────────────────────────────
export async function fetchCreateUser(userData: {
  name: string;
  email: string;
  phone: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST", // 메서드를 POST로 지정
      headers: {
        "Content-Type": "application/json", // "JSON 형식으로 보냅니다"
      },
      body: JSON.stringify(userData), // 객체를 JSON 문자열로 변환해서 전송!
    });

    if (!response.ok) {
      throw new Error(`HTTP 에러! 상태 코드: ${response.status}`);
    }

    const data = await response.json();

    console.log("=== fetch POST 결과 ===");
    console.log("생성된 유저:", data);

    return data;
  } catch (error: any) {
    console.log("fetch POST 에러:", error.message);
    throw error;
  }
}

// ──────────────────────────────────────────
// DELETE 요청: 유저 삭제하기
// ──────────────────────────────────────────
export async function fetchDeleteUser(userId: number) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP 에러! 상태 코드: ${response.status}`);
    }

    console.log("=== fetch DELETE 결과 ===");
    console.log(`유저 ${userId} 삭제 완료 (상태 코드: ${response.status})`);

    return true;
  } catch (error: any) {
    console.log("fetch DELETE 에러:", error.message);
    throw error;
  }
}
