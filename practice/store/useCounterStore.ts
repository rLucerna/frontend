/**
 * Zustand 기초 예시: 카운터 Store
 *
 * Zustand의 기본 사용법을 보여주는 가장 간단한 Store입니다.
 *
 * Zustand Store 구조:
 *   const useStore = create((set) => ({
 *     상태: 초기값,
 *     액션: () => set({ 상태: 새값 }),
 *   }));
 *
 * 컴포넌트에서 사용:
 *   const 상태 = useStore((state) => state.상태);
 *   const 액션 = useStore((state) => state.액션);
 */

import { create } from "zustand";

// 1. Store의 타입 정의 (TypeScript)
interface CounterState {
  // 상태 (데이터)
  count: number;

  // 액션 (상태를 변경하는 함수)
  increase: () => void;
  decrease: () => void;
  reset: () => void;
  setCount: (value: number) => void;
}

// 2. Store 생성
const useCounterStore = create<CounterState>((set) => ({
  // ── 상태 초기값 ──
  count: 0,

  // ── 액션 정의 ──

  // 현재 값을 기반으로 변경할 때: set((state) => ({ ... }))
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),

  // 특정 값으로 직접 변경할 때: set({ ... })
  reset: () => set({ count: 0 }),
  setCount: (value) => set({ count: value }),
}));

export default useCounterStore;
