import React, { createContext, useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

/**
 * useContext 예시 3: Props Drilling vs Context 비교
 *
 * 동일한 전역 카운터를 두 가지 방식으로 구현하여
 * Props Drilling의 문제점과 Context의 해결 방식을 비교합니다.
 *
 * 좌: Props Drilling (props를 5단계 전달)
 * 우: Context (직접 접근)
 */

// ─── Context 방식 ───
const CounterContext = createContext({ count: 0, increment: () => {} });

// Context 방식: 깊은 자식
function ContextDeepChild() {
  // 중간 컴포넌트를 거치지 않고 직접 접근!
  const { count, increment } = useContext(CounterContext);
  return (
    <View style={styles.leafBox}>
      <Text style={styles.leafLabel}>Context (깊이 3)</Text>
      <Text style={styles.leafValue}>{count}</Text>
      <Button title="+1" onPress={increment} color="#1ABC9C" />
    </View>
  );
}

function ContextMiddle2() {
  // 이 컴포넌트는 count를 모름! props 전달 안 함
  return (
    <View style={styles.middleBox}>
      <Text style={styles.middleLabel}>중간2 — props 없음</Text>
      <ContextDeepChild />
    </View>
  );
}

function ContextMiddle1() {
  return (
    <View style={styles.middleBox}>
      <Text style={styles.middleLabel}>중간1 — props 없음</Text>
      <ContextMiddle2 />
    </View>
  );
}

// ─── Props Drilling 방식 ───
function PropsDeepChild({
  count,
  increment,
}: {
  count: number;
  increment: () => void;
}) {
  return (
    <View style={styles.leafBox}>
      <Text style={styles.leafLabel}>Props (깊이 3)</Text>
      <Text style={styles.leafValue}>{count}</Text>
      <Button title="+1" onPress={increment} color="#E74C3C" />
    </View>
  );
}

function PropsMiddle2({
  count,
  increment,
}: {
  count: number;
  increment: () => void;
}) {
  // count, increment를 사용하지 않고 그냥 넘김!
  return (
    <View style={styles.middleBox}>
      <Text style={styles.middleLabel}>중간2 — count, increment props 전달만</Text>
      <PropsDeepChild count={count} increment={increment} />
    </View>
  );
}

function PropsMiddle1({
  count,
  increment,
}: {
  count: number;
  increment: () => void;
}) {
  return (
    <View style={styles.middleBox}>
      <Text style={styles.middleLabel}>중간1 — count, increment props 전달만</Text>
      <PropsMiddle2 count={count} increment={increment} />
    </View>
  );
}

// ─── 메인 화면 ───
export default function UseContextCounterScreen() {
  const [propsCount, setPropsCount] = useState(0);
  const [contextCount, setContextCount] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>Props Drilling vs Context</Text>
        <Text style={styles.desc}>
          두 카운터는 같은 기능이지만{'\n'}
          데이터 전달 방식이 다릅니다.
        </Text>
      </View>

      {/* Props Drilling 방식 */}
      <View style={[styles.section, { backgroundColor: '#FDEDEC' }]}>
        <Text style={[styles.title, { color: '#E74C3C' }]}>
          Props Drilling 방식
        </Text>
        <Text style={styles.desc}>
          부모 → 중간1 → 중간2 → 자식{'\n'}
          중간 컴포넌트가 안 쓰는 props를 전달만 함
        </Text>
        <PropsMiddle1
          count={propsCount}
          increment={() => setPropsCount(c => c + 1)}
        />
      </View>

      {/* Context 방식 */}
      <CounterContext.Provider
        value={{
          count: contextCount,
          increment: () => setContextCount(c => c + 1),
        }}
      >
        <View style={[styles.section, { backgroundColor: '#E8F8F5' }]}>
          <Text style={[styles.title, { color: '#1ABC9C' }]}>
            Context 방식
          </Text>
          <Text style={styles.desc}>
            Provider → (중간 컴포넌트 건너뜀) → 자식{'\n'}
            중간 컴포넌트는 카운터를 모름
          </Text>
          <ContextMiddle1 />
        </View>
      </CounterContext.Provider>

      <View style={styles.section}>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'[Props Drilling]\n'}
            {'Parent(count) → Mid1(count) → Mid2(count) → Child(count)\n'}
            {'→ Mid1, Mid2가 count를 사용 안 하는데도 전달해야 함\n\n'}
            {'[Context]\n'}
            {'Provider(count) → Mid1 → Mid2 → Child(useContext)\n'}
            {'→ Mid1, Mid2는 count를 모름, Child만 접근'}
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
  middleBox: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 8,
    padding: 10,
    gap: 6,
  },
  middleLabel: { fontSize: 11, color: '#888' },
  leafBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    gap: 4,
    alignItems: 'center',
  },
  leafLabel: { fontSize: 12, fontWeight: 'bold', color: '#666' },
  leafValue: { fontSize: 28, fontWeight: 'bold', color: '#2C3E50' },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
