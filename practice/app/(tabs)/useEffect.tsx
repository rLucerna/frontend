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
 * useEffect 탭 화면
 */
export default function UseEffectTab() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>기본 형태</Text>
          <View style={styles.codeBox}>
            <Text style={styles.code}>
              {'useEffect(() => {\n'}
              {'  // 효과 함수 (부수효과)\n'}
              {'  return () => { /* 정리 함수 */ };\n'}
              {'}, [의존성]);'}
            </Text>
          </View>
          <Text style={styles.desc}>
            • 효과 함수 — 렌더링 후 실행할 코드{'\n'}
            • 정리 함수 — 이전 효과를 정리 (선택){'\n'}
            • 의존성 배열 — 재실행 조건 (선택)
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>개념 & 용도</Text>
          <Text style={styles.desc}>
            useEffect는 컴포넌트가 화면에 그려진 후(렌더링 후)
            실행할 부수효과를 등록하는 Hook입니다.{'\n\n'}
            부수효과란 렌더링(JSX 반환) 외의 모든 작업:{'\n'}
            API 호출, 타이머, 이벤트 리스너, 로그 등입니다.{'\n\n'}
            컴포넌트 함수 본문에 직접 쓰면 매 렌더링마다 실행되어
            무한 루프가 발생할 수 있으므로, useEffect 안에서 제어합니다.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>의존성 배열에 따른 동작</Text>
          <Text style={styles.desc}>
            • 없음: 매 렌더링마다 실행{'\n'}
            • []: 마운트 시 1번, 언마운트 시 정리{'\n'}
            • [a, b]: a 또는 b가 바뀔 때만 재실행{'\n\n'}
            정리 함수는 새 효과 실행 전 + 언마운트 시 호출됩니다.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>주의점</Text>
          <Text style={styles.desc}>
            • 의존성 배열에 사용하는 값을 빠뜨리면 버그 발생{'\n'}
            • useEffect 안에서 직접 async 함수 선언 불가{'\n'}
              → 내부에 async 함수 정의 후 호출{'\n'}
            • 타이머/구독은 반드시 정리 함수에서 해제
          </Text>
        </View>

        <Text style={styles.sectionLabel}>예시</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#1E8449' }]}
            onPress={() => router.push('/stacks/exUseEffect')}
          >
            <Text style={styles.btnTitle}>useEffect 예제</Text>
            <Text style={styles.btnSub}>setInterval + cleanup 체험</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#27AE60' }]}
            onPress={() => router.push('/stacks/exUseState')}
          >
            <Text style={styles.btnTitle}>useState 예제</Text>
            <Text style={styles.btnSub}>JSONPlaceholder 유저 목록 조회</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#2ECC71' }]}
            onPress={() => router.push('/stacks/useEffect-lifecycle')}
          >
            <Text style={styles.btnTitle}>생명주기 관찰</Text>
            <Text style={styles.btnSub}>마운트 · 업데이트 · 언마운트 로그</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#27AE60' }]}
            onPress={() => router.push('/stacks/useEffect-api')}
          >
            <Text style={styles.btnTitle}>API 데이터 로딩</Text>
            <Text style={styles.btnSub}>JSONPlaceholder 유저 목록 조회</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#1E8449' }]}
            onPress={() => router.push('/stacks/useEffect-timer')}
          >
            <Text style={styles.btnTitle}>타이머 & 정리함수</Text>
            <Text style={styles.btnSub}>setInterval + cleanup 체험</Text>
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
