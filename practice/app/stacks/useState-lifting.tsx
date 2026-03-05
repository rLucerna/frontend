import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

/**
 * useState 예시 4: Lifting State Up (상태 끌어올리기)
 *
 * 두 자식 컴포넌트가 같은 데이터를 공유해야 할 때,
 * state를 공통 부모로 올려서 관리합니다.
 *
 * 이 예시: 섭씨/화씨 온도 변환기
 * - 섭씨 입력 → 화씨 자동 계산
 * - 화씨 입력 → 섭씨 자동 계산
 * - 두 입력란이 항상 동기화됨 (같은 state를 공유하므로)
 */

// ─── 자식 컴포넌트: 온도 입력란 ───
// props로 label, value, onChangeText를 받음
// 자체 state 없이 부모의 state를 사용
type TempInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

function TemperatureInput({ label, value, onChangeText }: TempInputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        placeholder="온도 입력"
      />
    </View>
  );
}

// ─── 부모 컴포넌트 ───
export default function UseStateLiftingScreen() {
  /**
   * Lifting State Up의 핵심:
   * celsius state를 부모가 관리하고,
   * 두 자식에게 각각 적절한 값으로 변환하여 전달
   */
  const [celsius, setCelsius] = useState('');

  // 섭씨 → 화씨 변환: °F = °C × 9/5 + 32
  const toFahrenheit = (c: string) => {
    if (c === '') return '';
    return String(Math.round(Number(c) * 9 / 5 + 32));
  };

  // 화씨 → 섭씨 변환: °C = (°F - 32) × 5/9
  const toCelsius = (f: string) => {
    if (f === '') return '';
    return String(Math.round((Number(f) - 32) * 5 / 9));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>온도 변환기 (Lifting State Up)</Text>
        <Text style={styles.desc}>
          두 입력란이 하나의 state(celsius)를 공유합니다.{'\n'}
          어느 쪽을 수정하든 다른 쪽도 동기화됩니다.
        </Text>

        {/* 섭씨 입력: celsius state를 그대로 전달 */}
        <TemperatureInput
          label="섭씨 (°C)"
          value={celsius}
          onChangeText={setCelsius}
        />

        {/* 화씨 입력: celsius를 화씨로 변환하여 표시
            화씨 입력 시 역변환하여 celsius state 업데이트 */}
        <TemperatureInput
          label="화씨 (°F)"
          value={toFahrenheit(celsius)}
          onChangeText={(f) => setCelsius(toCelsius(f))}
        />

        {/* 결과 메시지 */}
        {celsius !== '' && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>
              {Number(celsius) >= 100
                ? '물이 끓습니다!'
                : Number(celsius) <= 0
                  ? '물이 얼어요!'
                  : `${celsius}°C = ${toFahrenheit(celsius)}°F`}
            </Text>
          </View>
        )}
      </View>

      {/* 구조 설명 */}
      <View style={styles.section}>
        <Text style={styles.title}>데이터 흐름</Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'부모 (celsius state 관리)\n'}
            {' ├─ 섭씨 Input  ← celsius 그대로\n'}
            {' └─ 화씨 Input  ← celsius × 9/5 + 32\n\n'}
            {'섭씨 입력 → setCelsius(입력값)\n'}
            {'화씨 입력 → setCelsius(역변환(입력값))\n\n'}
            {'→ state 하나로 두 자식이 항상 동기화!'}
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
  inputGroup: { gap: 4 },
  label: { fontSize: 13, color: '#888' },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  resultBox: {
    backgroundColor: '#EBF5FB',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  resultText: { fontSize: 16, fontWeight: 'bold', color: '#2980B9' },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
