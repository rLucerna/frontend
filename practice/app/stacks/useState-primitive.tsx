import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';

/**
 * useState 예시 1: 원시값 State
 *
 * 원시값(숫자, 문자열, boolean)은 값 자체를 비교하므로
 * setState에 새 값만 전달하면 됩니다.
 * 배열/객체와 달리 불변성을 신경 쓸 필요가 없습니다.
 */
export default function UseStatePrimitiveScreen() {
  // ── 숫자 state ──
  // 카운터: 숫자를 증가/감소시키는 가장 기본적인 useState 패턴
  const [count, setCount] = useState(0);

  // ── 문자열 state ──
  // TextInput과 연동: value와 onChangeText로 양방향 바인딩
  const [name, setName] = useState('');

  // ── boolean state ──
  // 토글: true/false를 반전시키는 패턴
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* ── 숫자 카운터 ── */}
      <View style={styles.section}>
        <Text style={styles.title}>숫자 State (number)</Text>
        <Text style={styles.value}>{count}</Text>

        <View style={styles.row}>
          {/* 함수형 업데이트: 이전 값(prev)을 기반으로 새 값 계산 */}
          <Button title="-1" onPress={() => setCount(prev => prev - 1)} />
          <Button title="리셋" onPress={() => setCount(0)} />
          <Button title="+1" onPress={() => setCount(prev => prev + 1)} />
        </View>

        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'const [count, setCount] = useState(0);\n'}
            {'setCount(prev => prev + 1); // 함수형 업데이트'}
          </Text>
        </View>
      </View>

      {/* ── 문자열 입력 ── */}
      <View style={styles.section}>
        <Text style={styles.title}>문자열 State (string)</Text>

        {/* TextInput의 value를 state와 연결하면
            입력할 때마다 setName이 호출되어 state가 업데이트됨 */}
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="이름을 입력하세요"
        />

        {/* state가 변경되면 리렌더링되어 아래 Text도 자동 업데이트 */}
        <Text style={styles.result}>
          입력값: {name || '(비어있음)'}  ({name.length}자)
        </Text>

        <Button title="초기화" onPress={() => setName('')} />

        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {"const [name, setName] = useState('');\n"}
            {'<TextInput value={name} onChangeText={setName} />'}
          </Text>
        </View>
      </View>

      {/* ── boolean 토글 ── */}
      <View style={[
        styles.section,
        { backgroundColor: isDarkMode ? '#2C3E50' : '#fff' },
      ]}>
        <Text style={[styles.title, isDarkMode && { color: '#fff' }]}>
          boolean State (boolean)
        </Text>

        <Text style={[styles.result, isDarkMode && { color: '#ECF0F1' }]}>
          다크모드: {isDarkMode ? 'ON' : 'OFF'}
        </Text>

        {/* prev => !prev: 이전 boolean 값을 반전 */}
        <Button
          title={isDarkMode ? '라이트모드로' : '다크모드로'}
          onPress={() => setIsDarkMode(prev => !prev)}
        />

        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'const [isDark, setIsDark] = useState(false);\n'}
            {'setIsDark(prev => !prev); // 반전 토글'}
          </Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16, paddingBottom: 32 },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    gap: 10,
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  value: { fontSize: 48, fontWeight: 'bold', textAlign: 'center', color: '#3498DB' },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  result: { fontSize: 14, color: '#555' },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10, marginTop: 4 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
