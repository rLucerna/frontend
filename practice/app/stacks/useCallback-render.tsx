import React, { useState, useCallback, memo, useRef } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

/**
 * useCallback 예시 1: 렌더링 횟수 비교
 *
 * useCallback 유무에 따라 자식 컴포넌트의 리렌더링 횟수가
 * 어떻게 달라지는지 비교합니다.
 *
 * React.memo: props가 바뀌지 않으면 리렌더링을 건너뛰는 HOC
 * useCallback: 함수 참조를 유지하여 React.memo가 작동하게 함
 */

// ─── React.memo로 감싼 자식 ───
// props가 바뀌지 않으면 리렌더링을 건너뜀
const ChildWithMemo = memo(function ChildWithMemo({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  // 렌더링 횟수를 useRef로 추적
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <View style={styles.childBox}>
      <Text style={styles.childLabel}>{label}</Text>
      <Text style={styles.childRender}>렌더링: {renderCount.current}회</Text>
      <Button title="클릭" onPress={onPress} />
    </View>
  );
});

export default function UseCallbackRenderScreen() {
  const [count, setCount] = useState(0);

  /**
   * ❌ useCallback 없이: 매 렌더링마다 새 함수 생성
   * → React.memo 자식에게 "다른" props로 인식됨
   * → 자식도 매번 리렌더링
   */
  const handleWithout = () => {
    console.log('without useCallback');
  };

  /**
   * ✅ useCallback 사용: 의존성이 같으면 같은 함수 참조 유지
   * → React.memo 자식에게 "같은" props로 인식됨
   * → 자식 리렌더링 방지!
   */
  const handleWith = useCallback(() => {
    console.log('with useCallback');
  }, []); // 의존성 없음 → 항상 같은 함수

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>부모 state 변경</Text>
        <Text style={styles.desc}>
          이 버튼을 눌러 부모를 리렌더링시킨 후{'\n'}
          아래 두 자식의 렌더링 횟수를 비교하세요.
        </Text>
        <Text style={styles.value}>count: {count}</Text>
        <Button title="부모 리렌더링 (+1)" onPress={() => setCount(c => c + 1)} />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>자식 렌더링 비교</Text>

        {/* useCallback 없이: 매번 새 함수 → memo 무효 → 매번 리렌더링 */}
        <ChildWithMemo
          label="useCallback 없이 (매번 리렌더링)"
          onPress={handleWithout}
        />

        {/* useCallback 사용: 같은 함수 참조 → memo 유효 → 리렌더링 방지 */}
        <ChildWithMemo
          label="useCallback 사용 (리렌더링 방지)"
          onPress={handleWith}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'// ❌ 매번 새 함수\n'}
            {'const fn = () => {}; // 렌더링마다 새 참조\n\n'}
            {'// ✅ 같은 함수 유지\n'}
            {'const fn = useCallback(() => {}, []);\n\n'}
            {'// React.memo + useCallback = 불필요한 리렌더링 방지'}
          </Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12, paddingBottom: 32 },
  section: { backgroundColor: '#fff', borderRadius: 10, padding: 16, gap: 8 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  desc: { fontSize: 13, color: '#666', lineHeight: 20 },
  value: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#9B59B6' },
  childBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    gap: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#9B59B6',
  },
  childLabel: { fontSize: 13, fontWeight: 'bold', color: '#555' },
  childRender: { fontSize: 15, fontWeight: 'bold', color: '#9B59B6' },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
