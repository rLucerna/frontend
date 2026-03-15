import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

/**
 * useState 예시 6: 독립적 State
 *
 * 각 컴포넌트가 자기만의 state를 가지는 패턴입니다.
 * 같은 컴포넌트를 여러 번 렌더링해도 각각의 state는 독립적입니다.
 *
 * 이전 예시(Props 전달, Lifting State Up)와 비교:
 * - Props 전달: 부모 state → 자식에게 공유
 * - Lifting Up: 공통 부모에서 state 관리 → 자식 간 동기화
 * - 독립적: 각자 자기 state 소유 → 서로 영향 없음
 */

// ─── 독립 카운터 컴포넌트 ───
// 각 인스턴스가 자체 count state를 가짐
function IndependentCounter({ label, color }: { label: string; color: string }) {
  /**
   * 이 state는 이 컴포넌트 인스턴스에만 속합니다.
   * 같은 컴포넌트를 3번 렌더링하면 3개의 별도 state가 생깁니다.
   * 하나를 변경해도 다른 것에 영향을 주지 않습니다.
   */
  const [count, setCount] = useState(0);

  return (
    <View style={[styles.counterBox, { borderLeftColor: color }]}>
      <Text style={[styles.counterLabel, { color }]}>{label}</Text>
      <Text style={styles.counterValue}>{count}</Text>
      <View style={styles.row}>
        <Button title="-1" onPress={() => setCount(prev => prev - 1)} />
        <Button title="리셋" onPress={() => setCount(0)} />
        <Button title="+1" onPress={() => setCount(prev => prev + 1)} />
      </View>
    </View>
  );
}

export default function UseStateIndependentScreen() {
  // 부모에서 관리하는 state는 없음!
  // 각 IndependentCounter가 자체 state를 소유

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>독립적 State</Text>
        <Text style={styles.desc}>
          같은 컴포넌트를 3번 사용했지만,{'\n'}
          각각의 count state는 완전히 독립적입니다.{'\n'}
          하나를 변경해도 다른 카운터에 영향이 없습니다.
        </Text>

        {/* 같은 컴포넌트이지만 각각 독립된 state를 가짐 */}
        <IndependentCounter label="카운터 A" color="#E74C3C" />
        <IndependentCounter label="카운터 B" color="#3498DB" />
        <IndependentCounter label="카운터 C" color="#2ECC71" />
      </View>

      {/* 비교 설명 */}
      <View style={styles.section}>
        <Text style={styles.title}>State 공유 방식 비교</Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'[독립적 State] (이 화면)\n'}
            {'  Counter A → count: 5   (자기만의 state)\n'}
            {'  Counter B → count: 0   (자기만의 state)\n'}
            {'  Counter C → count: -2  (자기만의 state)\n'}
            {'  → 서로 영향 없음!\n\n'}
            {'[Props 전달] (예시 5)\n'}
            {'  부모 → score: 10  (부모가 소유)\n'}
            {'   ├─ Display: 10   (읽기만)\n'}
            {'   └─ Control: +10  (부모 state 변경)\n\n'}
            {'[Lifting State Up] (예시 4)\n'}
            {'  부모 → celsius: 25  (부모가 소유)\n'}
            {'   ├─ 섭씨 Input: 25     (동기화)\n'}
            {'   └─ 화씨 Input: 77     (동기화)'}
          </Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12, paddingBottom: 32 },
  section: { backgroundColor: '#fff', borderRadius: 10, padding: 16, gap: 10 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  desc: { fontSize: 13, color: '#666', lineHeight: 20 },
  counterBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    gap: 8,
    borderLeftWidth: 3,
  },
  counterLabel: { fontSize: 13, fontWeight: 'bold' },
  counterValue: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: '#2C3E50' },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
