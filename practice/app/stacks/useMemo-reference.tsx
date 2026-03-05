import React, { useState, useMemo, memo, useRef } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

/**
 * useMemo 예시 3: 참조 동일성 유지
 *
 * 자식 컴포넌트에 객체/배열을 props로 전달할 때
 * useMemo 없이: 매 렌더링마다 새 객체 생성 → 자식 리렌더링
 * useMemo 사용: 같은 참조 유지 → React.memo가 작동하여 리렌더링 방지
 *
 * useCallback이 함수 참조를 유지하듯,
 * useMemo는 객체/배열 참조를 유지합니다.
 */

// React.memo로 감싼 자식
const UserCard = memo(function UserCard({ user }: { user: { name: string; role: string } }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <View style={styles.childBox}>
      <Text style={styles.childText}>{user.name} ({user.role})</Text>
      <Text style={styles.childRender}>렌더링: {renderCount.current}회</Text>
    </View>
  );
});

export default function UseMemoReferenceScreen() {
  const [name] = useState('용준');
  const [role] = useState('학생');
  const [counter, setCounter] = useState(0);

  /**
   * ❌ useMemo 없이: 매 렌더링마다 새 객체 생성
   * { name, role } → 내용은 같지만 매번 새 참조
   * → React.memo 자식: "props 바뀜!" → 리렌더링
   */
  const userWithout = { name, role };

  /**
   * ✅ useMemo 사용: name이나 role이 바뀔 때만 새 객체
   * → 같은 참조 유지 → React.memo 작동 → 리렌더링 방지
   */
  const userWith = useMemo(() => ({ name, role }), [name, role]);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>참조 동일성 비교</Text>
        <Text style={styles.desc}>
          아래 버튼으로 부모를 리렌더링시킨 후{'\n'}
          두 자식의 렌더링 횟수를 비교하세요.
        </Text>

        <Text style={styles.counterText}>counter: {counter}</Text>
        <Button
          title="부모 리렌더링 (+1)"
          onPress={() => setCounter(c => c + 1)}
          color="#E74C3C"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>useMemo 없이 (매번 새 객체)</Text>
        <UserCard user={userWithout} />
        <Text style={styles.hint}>
          매 렌더링마다 {'{ name, role }'} 새 객체 생성{'\n'}
          → 내용은 같지만 참조가 다름 → memo 무효
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>useMemo 사용 (같은 참조 유지)</Text>
        <UserCard user={userWith} />
        <Text style={styles.hint}>
          name, role이 안 바뀌면 같은 객체 참조 유지{'\n'}
          → memo 유효 → 리렌더링 방지
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'// ❌ 매번 새 객체\n'}
            {'const user = { name, role };\n\n'}
            {'// ✅ 참조 유지\n'}
            {'const user = useMemo(\n'}
            {'  () => ({ name, role }),\n'}
            {'  [name, role]\n'}
            {');\n\n'}
            {'// useCallback = 함수 참조 유지\n'}
            {'// useMemo = 값(객체/배열) 참조 유지'}
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
  counterText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#E74C3C' },
  childBox: {
    backgroundColor: '#FDEDEC',
    borderRadius: 8,
    padding: 12,
    gap: 4,
  },
  childText: { fontSize: 15, fontWeight: 'bold', color: '#2C3E50' },
  childRender: { fontSize: 13, color: '#E74C3C' },
  hint: { fontSize: 12, color: '#888', lineHeight: 18 },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
