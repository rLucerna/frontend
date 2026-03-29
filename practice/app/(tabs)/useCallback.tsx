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
 * useCallback 탭 화면
 */
export default function UseCallbackTab() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>기본 형태</Text>
          <View style={styles.codeBox}>
            <Text style={styles.code}>
              {'const fn = useCallback(() => {\n'}
              {'  // 기억할 함수\n'}
              {'}, [의존성]);'}
            </Text>
          </View>
          <Text style={styles.desc}>
            • 의존성이 바뀌지 않으면 이전 함수를 재사용{'\n'}
            • 의존성이 바뀌면 새 함수를 생성하고 기억{'\n'}
            • 반환값: 메모이제이션된 함수
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>개념 & 용도</Text>
          <Text style={styles.desc}>
            컴포넌트가 리렌더링될 때마다 내부의 모든 함수가
            새로 생성됩니다. 내용이 같아도 새 참조(주소)를 가집니다.{'\n\n'}
            useCallback은 함수를 메모이제이션(기억)하여
            의존성이 바뀌지 않는 한 같은 함수 참조를 재사용합니다.{'\n\n'}
            주 용도: React.memo로 감싼 자식에게 함수를 전달할 때
            불필요한 자식 리렌더링을 방지합니다.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>주의점</Text>
          <Text style={styles.desc}>
            • 성능 문제가 없다면 useCallback 없이도 동작함{'\n'}
            • React.memo와 함께 사용해야 효과가 있음{'\n'}
            • 의존성 배열을 정확히 작성해야 함{'\n'}
            • 과도한 사용은 오히려 메모리 낭비
          </Text>
        </View>

        <Text style={styles.sectionLabel}>예시</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#9B59B6' }]}
            onPress={() => router.push('/stacks/useCallback-render')}
          >
            <Text style={styles.btnTitle}>렌더링 횟수 비교</Text>
            <Text style={styles.btnSub}>useCallback 유무에 따른 차이</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#8E44AD' }]}
            onPress={() => router.push('/stacks/useCallback-list')}
          >
            <Text style={styles.btnTitle}>리스트 최적화</Text>
            <Text style={styles.btnSub}>자식 컴포넌트 리렌더링 방지</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#7D3C98' }]}
            onPress={() => router.push('/stacks/useCallback-deps')}
          >
            <Text style={styles.btnTitle}>의존성 변경 관찰</Text>
            <Text style={styles.btnSub}>의존성에 따른 함수 재생성</Text>
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
