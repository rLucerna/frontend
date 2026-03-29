import React, { useState, useMemo } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

/**
 * useMemo 예시 2: 무거운 계산 (피보나치)
 *
 * 의도적으로 느린 피보나치 계산을 수행하여
 * useMemo의 캐싱 효과를 체감합니다.
 *
 * useMemo 없이: 다른 state가 바뀌어도 매번 재계산 → 버벅임
 * useMemo 사용: n이 바뀔 때만 재계산 → 부드러움
 */

/**
 * 의도적으로 느린 피보나치 (재귀)
 * n=35 이상이면 눈에 띄게 느려짐
 */
function slowFibonacci(n: number): number {
  if (n <= 1) return n;
  return slowFibonacci(n - 1) + slowFibonacci(n - 2);
}

export default function UseMemoCalcScreen() {
  const [fibN, setFibN] = useState(10);
  const [counter, setCounter] = useState(0);

  /**
   * useMemo로 피보나치 계산 결과를 캐싱
   *
   * 의존성: [fibN]
   * → fibN이 바뀔 때만 재계산
   * → counter가 바뀌어도 이전 결과 재사용
   */
  const fibResult = useMemo(() => {
    const start = Date.now();
    const result = slowFibonacci(fibN);
    const elapsed = Date.now() - start;
    return { result, elapsed };
  }, [fibN]);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>피보나치 계산 (useMemo)</Text>

        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>fibonacci({fibN})</Text>
          <Text style={styles.resultValue}>{fibResult.result.toLocaleString()}</Text>
          <Text style={styles.resultTime}>계산 시간: {fibResult.elapsed}ms</Text>
        </View>

        <Text style={styles.label}>n 값 선택:</Text>
        <View style={styles.row}>
          {[10, 20, 30, 35, 38].map(n => (
            <Button
              key={n}
              title={`${n}`}
              onPress={() => setFibN(n)}
              color={fibN === n ? '#E74C3C' : '#999'}
            />
          ))}
        </View>
        <Text style={styles.hint}>
          n이 30 이상이면 체감될 정도로 느려집니다.{'\n'}
          38 이상은 수 초 이상 걸릴 수 있습니다.
        </Text>
      </View>

      {/* useMemo 효과 확인 */}
      <View style={styles.section}>
        <Text style={styles.title}>useMemo 효과 확인</Text>
        <Text style={styles.desc}>
          아래 버튼을 눌러도 피보나치 재계산이 발생하지 않습니다.{'\n'}
          화면이 즉시 업데이트됩니다.
        </Text>
        <Text style={styles.counterText}>counter: {counter}</Text>
        <Button
          title="counter +1 (재계산 없이 즉시 반응)"
          onPress={() => setCounter(c => c + 1)}
          color="#E74C3C"
        />
      </View>

      <View style={styles.section}>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'const result = useMemo(() => {\n'}
            {'  return slowFibonacci(n); // 무거운 계산\n'}
            {'}, [n]);\n'}
            {'// n이 안 바뀌면 → 이전 결과 재사용\n'}
            {'// n이 바뀌면 → 재계산'}
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
  label: { fontSize: 13, color: '#888' },
  resultBox: {
    backgroundColor: '#FDEDEC',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  resultLabel: { fontSize: 14, color: '#888' },
  resultValue: { fontSize: 28, fontWeight: 'bold', color: '#E74C3C' },
  resultTime: { fontSize: 13, color: '#C0392B' },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 4 },
  hint: { fontSize: 12, color: '#888', lineHeight: 18 },
  counterText: { fontSize: 16, fontFamily: 'monospace', color: '#E74C3C', textAlign: 'center' },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
