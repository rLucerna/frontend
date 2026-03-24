/**
 * axios 예시 파일
 *
 * axios 라이브러리를 사용한 HTTP 요청 예시입니다.
 * axiosInstance.ts에서 생성한 인스턴스를 활용합니다.
 *
 * axios 메서드별 기본 구조:
 *   axios.get(url, config?)
 *   axios.post(url, data?, config?)
 *   axios.put(url, data?, config?)
 *   axios.patch(url, data?, config?)
 *   axios.delete(url, config?)
 *
 *   - url: 요청 주소 (string, 필수) — 인스턴스 사용 시 baseURL 이후 경로만 작성
 *   - data: 서버에 보낼 데이터 (object) — JSON.stringify 불필요! 객체 그대로 전달
 *   - config: 추가 설정 (headers, params, timeout 등)
 *
 * fetch와의 차이:
 *   - JSON 자동 변환 (stringify / parse 불필요)
 *   - HTTP 에러도 자동으로 catch로 전달 (response.ok 확인 불필요)
 *   - response.data에 바로 접근 가능
 */

import api from "./axiosInstance";

// ──────────────────────────────────────────
// GET 요청: 유저 목록 가져오기
// ──────────────────────────────────────────
export async function axiosGetUsers() {
  try {
    // api 인스턴스의 baseURL이 자동으로 앞에 붙습니다
    // 실제 요청 URL: https://jsonplaceholder.typicode.com/users
    const response = await api.get("/users");

    // response.data에 응답 데이터가 자동으로 JSON 변환되어 들어있음!
    // fetch처럼 response.json()을 호출할 필요 없음
    console.log("=== axios GET 결과 ===");
    console.log(`총 ${response.data.length}명의 유저를 가져왔습니다.`);
    console.log("첫 번째 유저:", response.data[0].name);
    console.log("상태 코드:", response.status);

    return response.data;
  } catch (error: any) {
    // axios는 HTTP 에러(404, 500 등)도 자동으로 catch로 보냅니다!
    // fetch처럼 response.ok를 확인할 필요 없음
    console.log("axios GET 에러:", error.message);
    throw error;
  }
}

// ──────────────────────────────────────────
// GET 요청: 쿼리 파라미터 사용하기
// ──────────────────────────────────────────
export async function axiosGetUsersWithParams(page: number, limit: number) {
  try {
    const response = await api.get("/users", {
      params: {
        // params 객체의 키-값이 자동으로 URL 쿼리 파라미터로 변환됩니다
        // 실제 요청 URL: /users?_page=1&_limit=5
        _page: page,
        _limit: limit,
      },
    });

    console.log("=== axios GET (파라미터) 결과 ===");
    console.log(`${response.data.length}명 조회됨 (page: ${page})`);

    return response.data;
  } catch (error: any) {
    console.log("axios GET 에러:", error.message);
    throw error;
  }
}

// ──────────────────────────────────────────
// POST 요청: 새 유저 생성하기
// ──────────────────────────────────────────
export async function axiosCreateUser(userData: {
  name: string;
  email: string;
  phone: string;
}) {
  try {
    // axios.post의 두 번째 인자에 객체를 그대로 전달!
    // JSON.stringify() 필요 없음, Content-Type도 자동 설정됨
    const response = await api.post("/users", userData);

    console.log("=== axios POST 결과 ===");
    console.log("생성된 유저:", response.data);
    console.log("상태 코드:", response.status); // 201 Created

    return response.data;
  } catch (error: any) {
    console.log("axios POST 에러:", error.message);
    throw error;
  }
}

// ──────────────────────────────────────────
// PUT 요청: 유저 정보 전체 수정
// ──────────────────────────────────────────
export async function axiosUpdateUser(
  userId: number,
  userData: { name: string; email: string; phone: string }
) {
  try {
    const response = await api.put(`/users/${userId}`, userData);

    console.log("=== axios PUT 결과 ===");
    console.log("수정된 유저:", response.data);

    return response.data;
  } catch (error: any) {
    console.log("axios PUT 에러:", error.message);
    throw error;
  }
}

// ──────────────────────────────────────────
// DELETE 요청: 유저 삭제
// ──────────────────────────────────────────
export async function axiosDeleteUser(userId: number) {
  try {
    const response = await api.delete(`/users/${userId}`);

    console.log("=== axios DELETE 결과 ===");
    console.log(`유저 ${userId} 삭제 완료 (상태 코드: ${response.status})`);

    return true;
  } catch (error: any) {
    console.log("axios DELETE 에러:", error.message);
    throw error;
  }
}
