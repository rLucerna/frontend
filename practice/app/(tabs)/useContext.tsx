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
 * useContext 탭 화면
 */
export default function UseContextTab() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>기본 형태</Text>
          <View style={styles.codeBox}>
            <Text style={styles.code}>
              {'// 1. Context 생성\n'}
              {'const MyCtx = createContext(기본값);\n\n'}
              {'// 2. Provider로 감싸기\n'}
              {'<MyCtx.Provider value={데이터}>\n'}
              {'  <ChildComponent />\n'}
              {'</MyCtx.Provider>\n\n'}
              {'// 3. 자식에서 사용\n'}
              {'const data = useContext(MyCtx);'}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>개념 & 용도</Text>
          <Text style={styles.desc}>
            useContext는 props 전달 없이 컴포넌트 트리 어디서든
            데이터에 접근할 수 있게 해주는 Hook입니다.{'\n\n'}
            라디오 방송처럼 Provider가 값을 송출하면,
            어디서든 useContext로 수신할 수 있습니다.{'\n\n'}
            주 용도: 테마, 인증 정보, 언어 설정 등{'\n'}
            앱 전체에서 공유하는 데이터에 적합합니다.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>useState와의 차이</Text>
          <Text style={styles.desc}>
            useState — 값을 만들고 관리 (상태 생성){'\n'}
            useContext — 값을 멀리 전달 (상태 공유){'\n\n'}
            둘은 대체 관계가 아니라 보완 관계입니다.{'\n'}
            useState로 만든 state를 useContext로 공유합니다.{'\n\n'}
            가까운 곳 → props 전달{'\n'}
            먼 곳 / 여러 곳 → Context로 공유
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>주의점</Text>
          <Text style={styles.desc}>
            • Context 값이 바뀌면 모든 구독자가 리렌더링{'\n'}
            • 자주 변하는 값에는 Zustand/Redux 권장{'\n'}
            • Context를 용도별로 분리하면 성능 개선
          </Text>
        </View>

        <Text style={styles.sectionLabel}>예시</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#1ABC9C' }]}
            onPress={() => router.push('/stacks/useContext-theme')}
          >
            <Text style={styles.btnTitle}>테마 전환</Text>
            <Text style={styles.btnSub}>다크모드/라이트모드 전환</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#16A085' }]}
            onPress={() => router.push('/stacks/useContext-user')}
          >
            <Text style={styles.btnTitle}>사용자 정보 공유</Text>
            <Text style={styles.btnSub}>로그인 상태를 여러 컴포넌트에서 사용</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#0E6655' }]}
            onPress={() => router.push('/stacks/useContext-counter')}
          >
            <Text style={styles.btnTitle}>전역 카운터</Text>
            <Text style={styles.btnSub}>Props Drilling vs Context 비교</Text>
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
