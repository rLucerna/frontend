/**
 * Zustand + API 연동 예시: 유저 Store
 *
 * API에서 데이터를 가져와 전역 상태로 관리하는 실무 패턴입니다.
 * 여러 화면에서 같은 유저 데이터를 공유할 수 있습니다.
 *
 * 핵심 포인트:
 *   - Store 안에서 async 액션으로 API 호출
 *   - loading, error 상태도 함께 관리
 *   - 컴포넌트에서는 useEffect + fetchUsers 조합으로 데이터 로딩
 */

import { create } from "zustand";
import api from "../api/axiosInstance";

// 유저 데이터 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
}

// Store 타입 정의
interface UserState {
  // ── 상태 ──
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;

  // ── 액션 ──
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
  addUser: (user: Omit<User, "id">) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  clearSelectedUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  // ── 상태 초기값 ──
  users: [],
  selectedUser: null,
  loading: false,
  error: null,

  // ── 액션: 전체 유저 목록 가져오기 ──
  fetchUsers: async () => {
    set({ loading: true, error: null });

    try {
      const response = await api.get("/users");
      set({ users: response.data, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "유저 목록을 불러오는데 실패했습니다.",
        loading: false,
      });
    }
  },

  // ── 액션: 특정 유저 1명 가져오기 ──
  fetchUserById: async (id: number) => {
    set({ loading: true, error: null });

    try {
      const response = await api.get(`/users/${id}`);
      set({ selectedUser: response.data, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "유저 정보를 불러오는데 실패했습니다.",
        loading: false,
      });
    }
  },

  // ── 액션: 새 유저 추가 ──
  addUser: async (userData) => {
    set({ loading: true, error: null });

    try {
      const response = await api.post("/users", userData);

      // 기존 배열에 새 유저를 추가 (새 배열 생성!)
      set((state) => ({
        users: [...state.users, response.data],
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || "유저 추가에 실패했습니다.",
        loading: false,
      });
    }
  },

  // ── 액션: 유저 삭제 ──
  deleteUser: async (id: number) => {
    set({ loading: true, error: null });

    try {
      await api.delete(`/users/${id}`);

      // 삭제된 유저를 배열에서 제거 (새 배열 생성!)
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || "유저 삭제에 실패했습니다.",
        loading: false,
      });
    }
  },

  // ── 액션: 선택된 유저 초기화 ──
  clearSelectedUser: () => set({ selectedUser: null }),
}));

export default useUserStore;
