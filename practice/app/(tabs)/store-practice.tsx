/**
 * Zustand 기초 실습 화면 — 카운터
 *
 * Zustand의 기본 사용법을 익히는 실습 화면입니다.
 * 카운터 Store를 만들고, 컴포넌트에서 상태를 읽고 변경하는 방법을 배웁니다.
 *
 * 학습 포인트:
 *   - Store에서 상태와 액션을 가져오는 방법
 *   - 선택적 구독: (state) => state.count
 *   - 여러 컴포넌트에서 같은 Store를 공유하는 것 확인
 */

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useCounterStore from "../../store/useCounterStore";

export default function StorePracticeScreen() {
  // Store에서 상태와 액션을 가져옵니다
  // 선택적 구독: 필요한 것만 가져와서 불필요한 리렌더링을 방지합니다
  const count = useCounterStore((state) => state.count);
  const increase = useCounterStore((state) => state.increase);
  const decrease = useCounterStore((state) => state.decrease);
  const reset = useCounterStore((state) => state.reset);
  const setCount = useCounterStore((state) => state.setCount);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zustand 카운터</Text>
      <Text style={styles.subtitle}>전역 상태관리 기초 실습</Text>

      {/* 카운터 표시 */}
      <View style={styles.counterBox}>
        <Text style={styles.counterValue}>{count}</Text>
      </View>

      {/* 기본 동작 버튼 */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.decreaseButton]}
          onPress={decrease}
        >
          <Text style={styles.buttonText}>- 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.increaseButton]}
          onPress={increase}
        >
          <Text style={styles.buttonText}>+ 1</Text>
        </TouchableOpacity>
      </View>

      {/* 추가 동작 버튼 */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={reset}
        >
          <Text style={styles.buttonText}>초기화</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.setButton]}
          onPress={() => setCount(100)}
        >
          <Text style={styles.buttonText}>100으로 설정</Text>
        </TouchableOpacity>
      </View>

      {/* 설명 영역 */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>이 화면에서 배우는 것</Text>
        <Text style={styles.infoText}>
          1. useCounterStore로 Store에 접근합니다{"\n"}
          2. (state) =&gt; state.count 로 count만 선택적 구독합니다{"\n"}
          3. increase, decrease 등 액션을 호출하여 상태를 변경합니다{"\n"}
          4. 상태가 바뀌면 이 화면이 자동으로 리렌더링됩니다
        </Text>
        <Text style={[styles.infoText, { marginTop: 10, color: "#007AFF" }]}>
          팁: "종합 실습" 탭으로 이동해도 카운터 값이 유지됩니다!{"\n"}
          이것이 전역 상태의 장점입니다.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  counterBox: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  counterValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#007AFF",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    minWidth: 130,
    alignItems: "center",
  },
  increaseButton: {
    backgroundColor: "#2ECC71",
  },
  decreaseButton: {
    backgroundColor: "#E74C3C",
  },
  resetButton: {
    backgroundColor: "#95A5A6",
  },
  setButton: {
    backgroundColor: "#8E44AD",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoBox: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dee2e6",
    width: "100%",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
  },
});
