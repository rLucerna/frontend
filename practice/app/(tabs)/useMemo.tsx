import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

/**
 * useMemo 탭 화면
 */
export default function UseMemoTab() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>기본 형태</Text>
          <View style={styles.codeBox}>
            <Text style={styles.code}>
              {'const value = useMemo(() => {\n'}
              {'  return 무거운계산(a, b);\n'}
              {'}, [a, b]);'}
            </Text>
          </View>
          <Text style={styles.desc}>
            • 첫 번째 인자: 계산 함수 (값을 반환){'\n'}
            • 두 번째 인자: 의존성 배열{'\n'}
            • 반환값: 계산된 결과 값
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>개념 & 용도</Text>
          <Text style={styles.desc}>
            useMemo는 계산 결과를 메모이제이션(기억)하여
            의존성이 바뀌지 않으면 이전 결과를 재사용합니다.{'\n\n'}
            렌더링 중에 실행되며, 무거운 계산의 반복 실행을 방지합니다.{'\n\n'}
            주 용도:{'\n'}
            • 대량 데이터 필터링/정렬{'\n'}
            • 복잡한 수학 연산{'\n'}
            • 자식에게 전달하는 객체/배열의 참조 유지
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>useCallback vs useMemo</Text>
          <Text style={styles.desc}>
            useCallback — 함수를 기억 (함수 자체를 반환){'\n'}
            useMemo    — 값을 기억 (계산 결과를 반환){'\n\n'}
            useCallback(fn, deps) ≡ useMemo(() ={'>'} fn, deps)
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>주의점</Text>
          <Text style={styles.desc}>
            • useMemo 안에서 setState 호출 금지{'\n'}
            • 성능 문제가 실제로 있을 때만 사용{'\n'}
            • React가 캐시를 버릴 수 있으므로{'\n'}
              useMemo 없이도 동작하도록 코드 작성
          </Text>
        </View>

        <Text style={styles.sectionLabel}>예시</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#E74C3C' }]}
            onPress={() => router.push('/stacks/useMemo-filter')}
          >
            <Text style={styles.btnTitle}>리스트 필터링</Text>
            <Text style={styles.btnSub}>검색어로 대량 데이터 필터</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#C0392B' }]}
            onPress={() => router.push('/stacks/useMemo-calc')}
          >
            <Text style={styles.btnTitle}>무거운 계산</Text>
            <Text style={styles.btnSub}>피보나치 + useMemo 유무 비교</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#A93226' }]}
            onPress={() => router.push('/stacks/useMemo-reference')}
          >
            <Text style={styles.btnTitle}>참조 동일성 유지</Text>
            <Text style={styles.btnSub}>객체/배열 참조 안정화</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F7FA' },
  container: { padding: 16, gap: 12, paddingBottom: 32 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, gap: 8 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#2C3E50' },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 12, color: '#2C3E50' },
  desc: { fontSize: 13, color: '#555', lineHeight: 20 },
  sectionLabel: { fontSize: 14, fontWeight: 'bold', color: '#2C3E50', marginTop: 4 },
  buttonGroup: { gap: 8 },
  btn: { borderRadius: 10, padding: 14, gap: 2 },
  btnTitle: { fontSize: 15, fontWeight: 'bold', color: '#fff' },
  btnSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
});
