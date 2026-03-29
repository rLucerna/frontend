import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

/**
 * useRef 예시 1: 렌더링 없는 카운터
 *
 * useState와 useRef로 카운터를 나란히 비교합니다.
 * - useState: 값 변경 → 리렌더링 → 화면 업데이트
 * - useRef: 값 변경 → 리렌더링 없음 → 화면 안 바뀜
 *
 * 렌더링 횟수도 useRef로 추적하여 차이를 보여줍니다.
 */
export default function UseRefCounterScreen() {
  // useState 카운터: 값 변경 시 리렌더링 발생
  const [stateCount, setStateCount] = useState(0);

  // useRef 카운터: 값 변경해도 리렌더링 안 됨
  const refCount = useRef(0);

  // 렌더링 횟수 추적 (useRef로!)
  // useState로 추적하면 렌더링 추적 자체가 리렌더링을 유발 → 무한루프
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>렌더링 횟수</Text>
        <Text style={styles.renderCount}>
          이 컴포넌트는 {renderCount.current}번 렌더링되었습니다
        </Text>
      </View>

      {/* useState 카운터 */}
      <View style={styles.section}>
        <Text style={styles.title}>useState 카운터</Text>
        <Text style={styles.value}>{stateCount}</Text>
        <View style={styles.row}>
          <Button title="+1" onPress={() => setStateCount(prev => prev + 1)} />
        </View>
        <Text style={styles.hint}>
          버튼 클릭 → setStateCount 호출 → 리렌더링 → 화면 업데이트{'\n'}
          → 렌더링 횟수 증가
        </Text>
      </View>

      {/* useRef 카운터 */}
      <View style={styles.section}>
        <Text style={styles.title}>useRef 카운터</Text>
        <Text style={styles.value}>{refCount.current}</Text>
        <View style={styles.row}>
          <Button
            title="+1 (ref)"
            onPress={() => {
              refCount.current += 1;
              // ref.current를 바꿨지만 리렌더링이 발생하지 않으므로
              // 화면에 표시된 숫자는 바뀌지 않음!
              console.log('ref 값:', refCount.current);
            }}
          />
        </View>
        <Text style={styles.hint}>
          버튼 클릭 → ref.current 변경 → 리렌더링 없음!{'\n'}
          화면에 표시된 값은 변하지 않습니다.{'\n'}
          (useState 버튼을 누르면 리렌더링되어 ref 값도 보임)
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>비교 정리</Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'useState:\n'}
            {'  setValue(1) → 리렌더링 O → 화면 업데이트 O\n\n'}
            {'useRef:\n'}
            {'  ref.current = 1 → 리렌더링 X → 화면 업데이트 X\n\n'}
            {'let 변수:\n'}
            {'  value = 1 → 리렌더링 X + 리렌더링 시 초기화!'}
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
  renderCount: {
    fontSize: 14,
    color: '#E67E22',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  value: { fontSize: 48, fontWeight: 'bold', textAlign: 'center', color: '#E67E22' },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  hint: { fontSize: 12, color: '#888', lineHeight: 18 },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
