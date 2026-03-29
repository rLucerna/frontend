import React, { useState, useCallback, useRef } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

/**
 * useCallback 예시 3: 의존성 변경 관찰
 *
 * 의존성 배열의 값이 바뀌면 useCallback이 새 함수를 생성합니다.
 * 함수가 재생성될 때마다 함수 ID를 증가시켜 시각적으로 확인합니다.
 */
export default function UseCallbackDepsScreen() {
  const [multiplier, setMultiplier] = useState(1);
  const [unrelated, setUnrelated] = useState(0);

  // 함수 재생성 횟수 추적
  const fnIdRef = useRef(0);

  /**
   * 의존성: [multiplier]
   * → multiplier가 바뀔 때만 새 함수가 생성됨
   * → unrelated가 바뀌어도 같은 함수를 재사용
   */
  const calculate = useCallback((value: number) => {
    return value * multiplier;
  }, [multiplier]);

  // 함수가 재생성되었는지 추적
  const prevFnRef = useRef(calculate);
  if (prevFnRef.current !== calculate) {
    fnIdRef.current += 1;
    prevFnRef.current = calculate;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>의존성 변경 관찰</Text>
        <Text style={styles.desc}>
          useCallback의 의존성인 multiplier가 바뀔 때만{'\n'}
          함수가 새로 생성됩니다.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>함수 재생성 횟수</Text>
          <Text style={styles.infoValue}>{fnIdRef.current}번</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>calculate(10) 결과</Text>
          <Text style={styles.infoValue}>{calculate(10)}</Text>
        </View>
      </View>

      {/* 의존성 값 변경: 함수 재생성됨 */}
      <View style={styles.section}>
        <Text style={styles.title}>의존성 변경 (함수 재생성)</Text>
        <Text style={styles.stateText}>multiplier: {multiplier}</Text>
        <View style={styles.row}>
          <Button title="×1" onPress={() => setMultiplier(1)} />
          <Button title="×2" onPress={() => setMultiplier(2)} />
          <Button title="×5" onPress={() => setMultiplier(5)} />
          <Button title="×10" onPress={() => setMultiplier(10)} />
        </View>
        <Text style={styles.hint}>
          multiplier가 바뀌면 함수 재생성 횟수가 증가합니다.
        </Text>
      </View>

      {/* 관련 없는 state 변경: 함수 재생성 안 됨 */}
      <View style={styles.section}>
        <Text style={styles.title}>관련 없는 state (함수 유지)</Text>
        <Text style={styles.stateText}>unrelated: {unrelated}</Text>
        <Button title="+1" onPress={() => setUnrelated(c => c + 1)} />
        <Text style={styles.hint}>
          이 값을 바꿔도 함수 재생성 횟수는 변하지 않습니다.{'\n'}
          useCallback이 이전 함수를 그대로 재사용합니다.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'const calc = useCallback((value) => {\n'}
            {'  return value * multiplier;\n'}
            {'}, [multiplier]);\n'}
            {'// multiplier 변경 → 새 함수 생성\n'}
            {'// 다른 state 변경 → 같은 함수 재사용'}
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
  infoBox: {
    backgroundColor: '#F5EEF8',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: { fontSize: 14, color: '#666' },
  infoValue: { fontSize: 16, fontWeight: 'bold', color: '#9B59B6' },
  stateText: { fontSize: 16, fontFamily: 'monospace', color: '#333' },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  hint: { fontSize: 12, color: '#888', lineHeight: 18 },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
