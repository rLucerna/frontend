import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator,
  StyleSheet, ScrollView,
} from 'react-native';

/**
 * useEffect 예시 2: API 데이터 로딩
 *
 * JSONPlaceholder(무료 테스트 API)에서 유저 목록을 가져옵니다.
 * https://jsonplaceholder.typicode.com/users
 *
 * 핵심 패턴:
 * 1. loading/data/error 3가지 state
 * 2. useEffect 안에서 async 함수 정의 후 호출
 * 3. 의존성 배열로 재호출 시점 제어
 */

type User = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
};

export default function UseEffectApiScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 현재 보여줄 유저 수 (의존성 변경 테스트용)
  const [limit, setLimit] = useState(5);

  /**
   * API 호출 useEffect
   *
   * 의존성: [limit]
   * → limit이 바뀔 때마다 API를 다시 호출합니다.
   *
   * ⚠ useEffect의 콜백 함수 자체는 async가 될 수 없습니다.
   *   내부에 async 함수를 선언하고 즉시 호출합니다.
   */
  useEffect(() => {
    // async 함수를 내부에서 정의
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        // JSONPlaceholder: 무료 REST API (테스트용)
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
        );

        // 네트워크 에러 체크
        if (!response.ok) {
          throw new Error(`HTTP 에러: ${response.status}`);
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 에러');
      } finally {
        setLoading(false);
      }
    };

    // 정의한 async 함수를 즉시 호출
    fetchUsers();
  }, [limit]); // limit이 바뀔 때마다 재호출

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>API 데이터 로딩</Text>
        <Text style={styles.desc}>
          JSONPlaceholder에서 유저 {limit}명을 가져옵니다.
        </Text>

        {/* limit 변경 버튼: 의존성 변경 → useEffect 재실행 */}
        <View style={styles.row}>
          {[3, 5, 10].map(n => (
            <TouchableOpacity
              key={n}
              style={[styles.chip, limit === n && styles.chipActive]}
              onPress={() => setLimit(n)}
            >
              <Text style={[styles.chipText, limit === n && styles.chipTextActive]}>
                {n}명
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 로딩 상태 */}
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2ECC71" />
          <Text style={styles.loadingText}>데이터 로딩 중...</Text>
        </View>
      )}

      {/* 에러 상태 */}
      {error && (
        <View style={[styles.section, { backgroundColor: '#FDEDEC' }]}>
          <Text style={{ color: '#E74C3C', fontWeight: 'bold' }}>에러: {error}</Text>
        </View>
      )}

      {/* 데이터 표시 */}
      {!loading && !error && users.map(user => (
        <View key={user.id} style={styles.userCard}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userInfo}>{user.email}</Text>
          <Text style={styles.userInfo}>{user.company.name}</Text>
        </View>
      ))}

      {/* 코드 설명 */}
      <View style={styles.section}>
        <Text style={styles.title}>핵심 패턴</Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'useEffect(() => {\n'}
            {'  const fetchData = async () => {\n'}
            {'    setLoading(true);\n'}
            {'    try {\n'}
            {'      const res = await fetch(url);\n'}
            {'      const data = await res.json();\n'}
            {'      setData(data);\n'}
            {'    } catch (err) {\n'}
            {'      setError(err.message);\n'}
            {'    } finally {\n'}
            {'      setLoading(false);\n'}
            {'    }\n'}
            {'  };\n'}
            {'  fetchData();\n'}
            {'}, [dependency]);'}
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
  desc: { fontSize: 13, color: '#666' },
  row: { flexDirection: 'row', gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  chipActive: { backgroundColor: '#2ECC71' },
  chipText: { fontSize: 14, color: '#666' },
  chipTextActive: { color: '#fff', fontWeight: 'bold' },
  center: { alignItems: 'center', padding: 20, gap: 8 },
  loadingText: { fontSize: 13, color: '#888' },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    gap: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#2ECC71',
  },
  userName: { fontSize: 15, fontWeight: 'bold', color: '#2C3E50' },
  userInfo: { fontSize: 13, color: '#888' },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
