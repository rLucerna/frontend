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
 * useRef 탭 화면
 */
export default function UseRefTab() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>기본 형태</Text>
          <View style={styles.codeBox}>
            <Text style={styles.code}>
              {'const myRef = useRef(초기값);\n'}
              {'// myRef = { current: 초기값 }\n'}
              {'myRef.current = 새값; // 리렌더링 안 됨!'}
            </Text>
          </View>
          <Text style={styles.desc}>
            • useRef는 {'{ current: 값 }'} 객체를 반환{'\n'}
            • current에 어떤 타입이든 저장 가능{'\n'}
            • current를 바꿔도 리렌더링이 발생하지 않음
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>개념 & 용도</Text>
          <Text style={styles.desc}>
            useRef는 렌더링에 영향을 주지 않으면서
            값을 기억하는 "상자"를 만드는 Hook입니다.{'\n\n'}
            두 가지 주요 용도:{'\n'}
            1. 리렌더링 없이 값 저장 (타이머 ID, 클릭 횟수 등){'\n'}
            2. DOM/컴포넌트 요소에 직접 접근 (포커스, 스크롤 등){'\n\n'}
            일반 변수(let)와 달리 리렌더링되어도 값이 유지됩니다.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>useState vs useRef</Text>
          <Text style={styles.desc}>
            useState — 값 변경 시 리렌더링 O, 화면에 보여줄 데이터{'\n'}
            useRef   — 값 변경 시 리렌더링 X, 내부 로직용 데이터{'\n'}
            let 변수  — 리렌더링 시 초기화됨, 임시 계산용
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>주의점</Text>
          <Text style={styles.desc}>
            • ref.current를 렌더링 중에 읽거나 쓰지 말 것{'\n'}
              (useEffect나 이벤트 핸들러 안에서 접근){'\n'}
            • ref 값이 바뀌어도 화면이 업데이트되지 않음{'\n'}
            • 화면에 보여줘야 하는 값은 useState 사용
          </Text>
        </View>

        <Text style={styles.sectionLabel}>예시</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#E67E22' }]}
            onPress={() => router.push('/stacks/useRef-counter')}
          >
            <Text style={styles.btnTitle}>렌더링 없는 카운터</Text>
            <Text style={styles.btnSub}>useRef vs useState 비교</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#D35400' }]}
            onPress={() => router.push('/stacks/useRef-focus')}
          >
            <Text style={styles.btnTitle}>입력란 포커스 이동</Text>
            <Text style={styles.btnSub}>ref로 TextInput 제어</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#BA4A00' }]}
            onPress={() => router.push('/stacks/useRef-stopwatch')}
          >
            <Text style={styles.btnTitle}>스톱워치</Text>
            <Text style={styles.btnSub}>interval ID를 ref에 저장</Text>
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
