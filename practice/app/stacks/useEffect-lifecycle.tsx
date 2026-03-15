import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

/**
 * useEffect 예시 1: 생명주기 관찰
 *
 * 의존성 배열에 따라 useEffect가 언제 실행되는지
 * 로그를 화면에 표시하여 직접 확인합니다.
 *
 * - []: 마운트 시 1번
 * - [count]: count가 바뀔 때마다
 * - 없음: 매 렌더링마다
 */
export default function UseEffectLifecycleScreen() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  // 로그 추가 유틸
  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 20));
  };

  /**
   * 의존성 배열이 빈 배열 []:
   * 마운트(화면 나타남) 시 1번만 실행
   * 정리 함수는 언마운트(화면 사라짐) 시 실행
   */
  useEffect(() => {
    addLog('마운트됨 (deps: [])');
    return () => {
      // 이 화면을 떠날 때 실행됨
      console.log('언마운트됨!');
    };
  }, []);

  /**
   * 의존성 배열에 count:
   * count가 변경될 때만 실행
   * text가 변경되어도 이 effect는 실행되지 않음
   */
  useEffect(() => {
    addLog(`count 변경 감지: ${count} (deps: [count])`);
  }, [count]);

  /**
   * 의존성 배열 없음:
   * 매 렌더링(어떤 state든 변경)마다 실행
   * ⚠ 여기서 setState를 호출하면 무한 루프!
   */
  useEffect(() => {
    addLog('렌더링 발생 (deps: 없음)');
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>생명주기 관찰</Text>
        <Text style={styles.desc}>
          버튼을 눌러 state를 변경하고{'\n'}
          어떤 useEffect가 실행되는지 로그를 확인하세요.
        </Text>

        {/* count 변경: [count] effect + deps 없음 effect 둘 다 실행 */}
        <View style={styles.row}>
          <Text style={styles.stateText}>count: {count}</Text>
          <Button title="+1" onPress={() => setCount(prev => prev + 1)} />
        </View>

        {/* text 변경: deps 없음 effect만 실행 ([count] effect는 실행 안 됨) */}
        <View style={styles.row}>
          <Text style={styles.stateText}>text: "{text}"</Text>
          <Button title="A 추가" onPress={() => setText(prev => prev + 'A')} />
        </View>
      </View>

      {/* 실행 로그 */}
      <View style={styles.section}>
        <Text style={styles.title}>실행 로그 (최근 20개)</Text>
        {logs.map((log, i) => (
          <Text key={i} style={[styles.log, i === 0 && styles.logLatest]}>
            {log}
          </Text>
        ))}
        {logs.length === 0 && (
          <Text style={styles.empty}>아직 로그가 없습니다</Text>
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12, paddingBottom: 32 },
  section: { backgroundColor: '#fff', borderRadius: 10, padding: 16, gap: 8 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  desc: { fontSize: 13, color: '#666', lineHeight: 20 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stateText: { fontSize: 15, color: '#333', fontFamily: 'monospace' },
  log: { fontSize: 12, fontFamily: 'monospace', color: '#666', paddingVertical: 2 },
  logLatest: { color: '#2ECC71', fontWeight: 'bold' },
  empty: { fontSize: 13, color: '#BBB', textAlign: 'center' },
});
