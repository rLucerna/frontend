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
 * useState 탭 화면
 *
 * useState의 개념, 구조, 용도, 주의점을 설명하고
 * 6가지 예시 화면으로 이동하는 버튼을 제공합니다.
 */
export default function UseStateTab() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* ── 기본 형태 ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>기본 형태</Text>
          <View style={styles.codeBox}>
            <Text style={styles.code}>
              {'const [value, setValue] = useState(초기값);'}
            </Text>
          </View>
          <Text style={styles.desc}>
            • value — 현재 상태 값{'\n'}
            • setValue — 상태를 변경하는 함수{'\n'}
            • 초기값 — 컴포넌트 최초 렌더링 시 사용되는 값
          </Text>
        </View>

        {/* ── 개념 & 용도 ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>개념 & 용도</Text>
          <Text style={styles.desc}>
            useState는 컴포넌트가 "기억해야 할 값"을 만드는 Hook입니다.
            일반 변수(let)는 리렌더링되면 초기화되지만,
            useState로 만든 값은 리렌더링 사이에도 유지됩니다.{'\n\n'}
            setValue를 호출하면 React가 새 값을 기억하고,
            컴포넌트를 다시 실행(리렌더링)하여 화면을 업데이트합니다.
          </Text>
        </View>

        {/* ── 핵심 사용 방식 ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>핵심 사용 방식</Text>
          <Text style={styles.desc}>
            1. 원시값: useState(0), useState(''), useState(false){'\n'}
            2. 배열: useState([]) → 추가/삭제 시 새 배열 생성{'\n'}
            3. 객체: useState({'{}'}){' → '}수정 시 스프레드로 새 객체 생성{'\n\n'}
            불변성 규칙: state를 직접 수정하지 말고,
            반드시 setState로 새 값을 전달해야 합니다.
          </Text>
        </View>

        {/* ── 주의점 ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>주의점</Text>
          <Text style={styles.desc}>
            • 배열/객체를 직접 수정(push, splice 등)하면{'\n'}
              React가 변화를 감지하지 못합니다 (얕은 비교){'\n'}
            • 이전 값 기반 업데이트 시 함수형 업데이트 사용:{'\n'}
              setValue(prev {'=> '}prev + 1){'\n'}
            • setState는 비동기적으로 처리됩니다
          </Text>
        </View>

        {/* ── 예시 버튼 ── */}
        <Text style={styles.sectionLabel}>예시</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#3498DB' }]}
            onPress={() => router.push('/stacks/useState-primitive')}
          >
            <Text style={styles.btnTitle}>원시값 State</Text>
            <Text style={styles.btnSub}>숫자 · 문자열 · boolean</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#2980B9' }]}
            onPress={() => router.push('/stacks/useState-array')}
          >
            <Text style={styles.btnTitle}>배열 State</Text>
            <Text style={styles.btnSub}>장보기 리스트 추가/삭제</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#2471A3' }]}
            onPress={() => router.push('/stacks/useState-object')}
          >
            <Text style={styles.btnTitle}>객체 State</Text>
            <Text style={styles.btnSub}>프로필 편집 폼</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#1F618D' }]}
            onPress={() => router.push('/stacks/useState-lifting')}
          >
            <Text style={styles.btnTitle}>Lifting State Up</Text>
            <Text style={styles.btnSub}>자식 간 state 공유</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#1A5276' }]}
            onPress={() => router.push('/stacks/useState-props')}
          >
            <Text style={styles.btnTitle}>부모→자식 전달</Text>
            <Text style={styles.btnSub}>state를 props로 전달</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#154360' }]}
            onPress={() => router.push('/stacks/useState-independent')}
          >
            <Text style={styles.btnTitle}>독립적 State</Text>
            <Text style={styles.btnSub}>각 컴포넌트 고유 state</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F7FA' },
  container: { padding: 16, gap: 12, paddingBottom: 32 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    gap: 8,
  },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#2C3E50' },
  codeBox: {
    backgroundColor: '#F0F4F8',
    borderRadius: 6,
    padding: 10,
  },
  code: { fontFamily: 'monospace', fontSize: 13, color: '#2C3E50' },
  desc: { fontSize: 13, color: '#555', lineHeight: 20 },
  sectionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 4,
  },
  buttonGroup: { gap: 8 },
  btn: {
    borderRadius: 10,
    padding: 14,
    gap: 2,
  },
  btnTitle: { fontSize: 15, fontWeight: 'bold', color: '#fff' },
  btnSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
});
