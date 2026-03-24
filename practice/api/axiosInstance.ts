/**
 * axios 인스턴스 설정 파일
 *
 * 모든 API 요청에서 공통으로 사용할 axios 인스턴스를 생성합니다.
 * baseURL, 타임아웃, 헤더 등 공통 설정을 한 곳에서 관리합니다.
 *
 * 사용법:
 *   import api from "../api/axiosInstance";
 *   const response = await api.get("/users");
 */

import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  // JSONPlaceholder: 무료 연습용 API 서버
  // 실제 프로젝트에서는 process.env.EXPO_PUBLIC_API_URL 등으로 교체합니다
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000, // 10초 타임아웃
  headers: {
    "Content-Type": "application/json",
  },
});

// ──────────────────────────────────────────
// 요청 인터셉터
// 모든 요청이 나가기 전에 실행됩니다
// ──────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // 콘솔에 요청 정보를 출력 (디버깅용)
    console.log(`[API 요청] ${config.method?.toUpperCase()} ${config.url}`);

    // 실제 프로젝트에서는 여기서 인증 토큰을 추가합니다:
    // const token = await SecureStore.getItemAsync("accessToken");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ──────────────────────────────────────────
// 응답 인터셉터
// 모든 응답이 도착한 후에 실행됩니다
// ──────────────────────────────────────────
api.interceptors.response.use(
  (response) => {
    console.log(`[API 응답] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // 에러 응답 공통 처리
    if (error.response) {
      console.log(
        `[API 에러] ${error.response.status} ${error.config?.url}`
      );

      // 상태 코드별 처리 예시
      switch (error.response.status) {
        case 401:
          console.log("인증이 필요합니다. 로그인 화면으로 이동해야 합니다.");
          break;
        case 404:
          console.log("요청한 데이터를 찾을 수 없습니다.");
          break;
        case 500:
          console.log("서버 오류가 발생했습니다.");
          break;
      }
    } else {
      console.log("[API 에러] 네트워크 오류 또는 타임아웃");
    }

    return Promise.reject(error);
  }
);

export default api;
