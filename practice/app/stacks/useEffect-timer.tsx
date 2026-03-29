import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

/**
 * useEffect 예시 3: 타이머 & 정리 함수 (Cleanup)
 *
 * setInterval로 1초마다 카운트하는 타이머입니다.
 * useEffect의 정리 함수(cleanup)로 타이머를 해제합니다.
 *
 * 정리 함수가 없으면:
 * - 컴포넌트가 사라져도 타이머가 계속 동작
 * - 메모리 누수 + 에러 발생
 */
export default function UseEffectTimerScreen() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  /**
   * useRef로 interval ID 저장
   * → 렌더링과 무관한 값이므로 useRef 사용
   * → useState로 저장하면 ID 변경 시 불필요한 리렌더링 발생
   */
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /**
   * 타이머 useEffect
   *
   * 의존성: [isRunning]
   * → isRunning이 true가 되면 타이머 시작
   * → isRunning이 false가 되면 정리 함수에서 타이머 해제
   *
   * 정리 함수의 실행 시점:
   * 1. isRunning이 바뀔 때 (이전 effect 정리 → 새 effect 실행)
   * 2. 컴포넌트가 언마운트될 때
   */
  useEffect(() => {
    if (isRunning) {
      // 타이머 시작: 1초마다 seconds 증가
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    // 정리 함수: 타이머 해제
    // isRunning이 false로 바뀌거나, 화면을 떠날 때 실행
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  // 시:분:초 형식으로 변환
  const formatTime = (totalSec: number) => {
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleStartStop = () => setIsRunning(prev => !prev);

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>타이머</Text>

        <Text style={[styles.timer, isRunning && styles.timerRunning]}>
          {formatTime(seconds)}
        </Text>

        <Text style={styles.status}>
          상태: {isRunning ? '실행 중' : '정지'}
        </Text>

        <View style={styles.row}>
          <Button
            title={isRunning ? '정지' : '시작'}
            onPress={handleStartStop}
            color={isRunning ? '#E74C3C' : '#2ECC71'}
          />
          <Button title="리셋" onPress={handleReset} />
        </View>
      </View>

      {/* 정리 함수 설명 */}
      <View style={styles.section}>
        <Text style={styles.title}>정리 함수 (Cleanup)</Text>
        <Text style={styles.desc}>
          정리 함수가 실행되는 시점:{'\n\n'}
          1. 의존성 값(isRunning)이 바뀔 때{'\n'}
             → 이전 effect의 정리 함수 실행{'\n'}
             → 새 effect 실행{'\n\n'}
          2. 컴포넌트가 화면에서 사라질 때(언마운트){'\n'}
             → 정리 함수 실행{'\n\n'}
          정리 함수가 없으면 타이머가 영원히 동작하여{'\n'}
          메모리 누수와 에러가 발생합니다.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>코드 구조</Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'useEffect(() => {\n'}
            {'  if (isRunning) {\n'}
            {'    // 타이머 시작\n'}
            {'    ref.current = setInterval(...);\n'}
            {'  }\n\n'}
            {'  // 정리 함수\n'}
            {'  return () => {\n'}
            {'    clearInterval(ref.current);\n'}
            {'  };\n'}
            {'}, [isRunning]);'}
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
  desc: { fontSize: 13, color: '#555', lineHeight: 20 },
  timer: {
    fontSize: 56,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2C3E50',
    fontFamily: 'monospace',
  },
  timerRunning: { color: '#2ECC71' },
  status: { fontSize: 14, textAlign: 'center', color: '#888' },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 16 },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
