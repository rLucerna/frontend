import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

/**
 * useRef 예시 3: 스톱워치
 *
 * useRef의 두 가지 활용을 함께 보여줍니다:
 * 1. interval ID 저장 (리렌더링 없이 값 기억)
 * 2. 렌더링 횟수 추적
 *
 * interval ID를 useState로 저장하면?
 * → ID 변경 시 불필요한 리렌더링 발생
 * → useRef로 저장하면 리렌더링 없이 ID를 기억
 */
export default function UseRefStopwatchScreen() {
  const [time, setTime] = useState(0);       // 경과 시간 (10ms 단위)
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  /**
   * interval ID를 useRef로 저장
   * → 시작/정지 시 ID가 필요하지만 화면에 보여줄 필요는 없음
   * → 리렌더링 없이 값을 유지해야 하는 전형적인 useRef 사용 사례
   */
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 10); // 10ms 간격
  };

  const stop = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    setLaps(prev => [time, ...prev]);
  };

  // 시간 포맷: 00:00.00
  const formatTime = (t: number) => {
    const min = Math.floor(t / 6000);
    const sec = Math.floor((t % 6000) / 100);
    const ms = t % 100;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={[styles.timer, isRunning && { color: '#E67E22' }]}>
          {formatTime(time)}
        </Text>

        <View style={styles.row}>
          {!isRunning ? (
            <>
              <Button title="시작" onPress={start} color="#2ECC71" />
              {time > 0 && <Button title="리셋" onPress={reset} color="#E74C3C" />}
            </>
          ) : (
            <>
              <Button title="랩" onPress={lap} color="#3498DB" />
              <Button title="정지" onPress={stop} color="#E74C3C" />
            </>
          )}
        </View>
      </View>

      {/* 랩 타임 목록 */}
      {laps.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.title}>랩 타임</Text>
          {laps.map((lapTime, index) => (
            <View key={index} style={styles.lapRow}>
              <Text style={styles.lapLabel}>랩 {laps.length - index}</Text>
              <Text style={styles.lapTime}>{formatTime(lapTime)}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.title}>useRef 활용 포인트</Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'// interval ID를 useRef로 저장\n'}
            {'const intervalRef = useRef(null);\n\n'}
            {'// 시작: ID 저장\n'}
            {'intervalRef.current = setInterval(...);\n\n'}
            {'// 정지: 저장된 ID로 타이머 해제\n'}
            {'clearInterval(intervalRef.current);\n\n'}
            {'// 왜 useState가 아닌 useRef?\n'}
            {'// → ID는 화면에 표시 안 함\n'}
            {'// → ID 변경 시 리렌더링 불필요'}
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
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2C3E50',
    fontFamily: 'monospace',
  },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 16 },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lapLabel: { fontSize: 14, color: '#888' },
  lapTime: { fontSize: 14, fontFamily: 'monospace', color: '#2C3E50' },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
