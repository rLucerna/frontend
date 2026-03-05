import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

/**
 * useMemo 예시 1: 리스트 필터링
 *
 * 대량의 데이터를 검색어로 필터링할 때
 * useMemo로 불필요한 재계산을 방지합니다.
 *
 * 검색어나 데이터가 바뀔 때만 필터링을 다시 수행하고,
 * 다른 state(예: 카운터)가 바뀔 때는 이전 결과를 재사용합니다.
 */

// 가상 데이터: 100개의 과일 목록
const FRUITS = Array.from({ length: 100 }, (_, i) => {
  const names = ['사과', '바나나', '포도', '딸기', '수박', '참외', '키위', '망고', '배', '감'];
  return `${names[i % names.length]} ${Math.floor(i / names.length) + 1}호`;
});

export default function UseMemoFilterScreen() {
  const [searchText, setSearchText] = useState('');
  const [counter, setCounter] = useState(0);

  /**
   * useMemo로 필터링 결과를 메모이제이션
   *
   * 의존성: [searchText]
   * → searchText가 바뀔 때만 100개 데이터를 다시 필터링
   * → counter가 바뀌어도(리렌더링) 이전 결과를 재사용
   *
   * useMemo 없이: 매 렌더링마다 100개 필터링 반복
   * useMemo 사용: 검색어 변경 시에만 필터링
   */
  const filteredFruits = useMemo(() => {
    console.log('필터링 실행!'); // 콘솔에서 실행 횟수 확인
    if (!searchText.trim()) return FRUITS;
    return FRUITS.filter(fruit =>
      fruit.includes(searchText.trim())
    );
  }, [searchText]); // searchText가 바뀔 때만 재계산

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>과일 검색 ({FRUITS.length}개)</Text>

        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="검색어 입력 (예: 사과, 바나나)"
        />

        <Text style={styles.result}>
          검색 결과: {filteredFruits.length}개
        </Text>
      </View>

      {/* 관련 없는 state: 리렌더링되지만 필터링은 재실행 안 됨 */}
      <View style={styles.section}>
        <Text style={styles.title}>useMemo 효과 확인</Text>
        <Text style={styles.desc}>
          아래 버튼을 눌러도 필터링은 재실행되지 않습니다.{'\n'}
          (콘솔에서 "필터링 실행!" 로그 확인)
        </Text>
        <Text style={styles.counterText}>counter: {counter}</Text>
        <Text
          style={styles.counterBtn}
          onPress={() => setCounter(c => c + 1)}
        >
          counter +1 (필터링 재실행 안 됨)
        </Text>
      </View>

      {/* 필터된 목록 (처음 20개만 표시) */}
      <View style={styles.section}>
        <Text style={styles.title}>
          목록 (처음 20개 표시)
        </Text>
        {filteredFruits.slice(0, 20).map((fruit, i) => (
          <Text key={i} style={styles.item}>{fruit}</Text>
        ))}
        {filteredFruits.length > 20 && (
          <Text style={styles.more}>... +{filteredFruits.length - 20}개 더</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  result: { fontSize: 14, fontWeight: 'bold', color: '#E74C3C' },
  counterText: { fontSize: 16, fontFamily: 'monospace', color: '#E74C3C', textAlign: 'center' },
  counterBtn: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#E74C3C',
    borderRadius: 8,
    padding: 12,
    textAlign: 'center',
    overflow: 'hidden',
  },
  item: {
    fontSize: 14,
    color: '#333',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  more: { fontSize: 13, color: '#BBB', textAlign: 'center', paddingTop: 4 },
});
