import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

// ─────────────────────────────────────────────
//  인라인 모달 컴포넌트 (같은 파일 안에 정의)
//
//  props로 데이터를 받는 재사용 가능한 컴포넌트입니다.
//  부모 화면이 visible / message / onClose 를 내려줍니다.
// ─────────────────────────────────────────────
type InlineModalProps = {
  visible: boolean;   // 부모의 state값 — 표시 여부를 부모가 제어
  message: string;    // 부모에서 전달하는 메시지 (props 전달 예시)
  onClose: () => void; // 닫기 동작을 부모에게 위임 (콜백 props)
};

function InlineModal({ visible, message, onClose }: InlineModalProps) {
  /**
   * React Native <Modal> 컴포넌트
   * - visible    : 표시 여부. 부모 state에서 내려온 props로 결정
   * - transparent: true → 배경이 투명하여 아래 화면이 보임
   * - animationType: 'fade' | 'slide' | 'none'
   * - onRequestClose: 안드로이드 하드웨어 뒤로가기 처리
   */
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>인라인 모달</Text>

          {/* props로 전달받은 message를 그대로 표시 */}
          <Text style={styles.label}>전달받은 message props:</Text>
          <Text style={styles.propValue}>"{message}"</Text>

          <Text style={styles.hint}>
            이 값은 부모 화면의 state에서{'\n'}props로 내려온 문자열입니다.
          </Text>

          <Button title="닫기 (onClose 콜백 호출)" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

// ─────────────────────────────────────────────
//  공통 실습 화면 (메인 컴포넌트)
// ─────────────────────────────────────────────
export default function CommonScreen() {
  /**
   * useRouter: expo-router 네비게이션 훅
   * - router.push()  : 스택에 화면 추가
   * - router.back()  : 이전 화면으로 복귀
   */
  const router = useRouter();

  // ── 인라인 모달 관련 state ──
  const [inlineModalVisible, setInlineModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('안녕하세요!');

  // ── 스택 화면 파라미터용 state ──
  const [stackTitle, setStackTitle] = useState('나의 첫 스택');

  // ── useFocusEffect 확인용 state ──
  const [focusCount, setFocusCount] = useState(0);

  /**
   * useFocusEffect: 이 탭이 활성화될 때마다 실행됩니다.
   * - useEffect(() => {}, [])와 차이: 탭 전환 후 돌아올 때도 재실행
   * - useCallback으로 감싸지 않으면 무한 루프 발생 주의!
   */
  useFocusEffect(
    useCallback(() => {
      setFocusCount((n) => n + 1);
      return () => {
        // 화면을 떠날 때 실행되는 정리 함수 (clean-up)
      };
    }, [])
  );

  /**
   * 인라인 모달 열기
   * setInlineModalVisible(true) → InlineModal의 visible prop이 true가 됨
   */
  const handleOpenInlineModal = () => {
    setInlineModalVisible(true);
  };

  /**
   * 인라인 모달 닫기 (InlineModal의 onClose props로 전달)
   * setInlineModalVisible(false) → InlineModal이 사라짐
   */
  const handleCloseInlineModal = () => {
    setInlineModalVisible(false);
  };

  /**
   * 파일 기반 Router 모달 열기
   *
   * router.push()를 사용하지만 _layout.tsx에서
   * presentation: 'modal' 로 등록되어 있어 모달처럼 동작합니다.
   *
   * 등록 위치: app/_layout.tsx
   * → <Stack.Screen name="modals/common-modal" options={{ presentation: 'modal' }} />
   *
   * 파일 경로: app/modals/common-modal.tsx
   */
  const handleOpenFileModal = () => {
    router.push('/modals/common-modal');
  };

  /**
   * 스택 화면 이동
   *
   * router.push({ pathname, params }):
   * - pathname: 이동할 파일 경로 (app/ 기준)
   * - params: 다음 화면에 전달할 데이터 (항상 string으로 직렬화됨)
   *
   * 받는 쪽: app/stacks/common-stack.tsx 에서
   *           useLocalSearchParams() 로 수신
   */
  const handleOpenStack = () => {
    router.push({
      pathname: '/stacks/common-stack',
      params: {
        title: stackTitle,      // TextInput에서 입력한 값
        from: '공통 실습 탭',   // 어떤 화면에서 왔는지 출처 전달
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* ── useFocusEffect 확인 ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>[ useFocusEffect ]</Text>
          <Text style={styles.body}>
            이 탭에 포커스된 횟수: <Text style={styles.bold}>{focusCount}회</Text>
          </Text>
          <Text style={styles.hint}>
            다른 탭으로 갔다가 돌아오면 숫자가 올라갑니다.{'\n'}
            useFocusEffect는 탭 전환 시에도 다시 실행됩니다.
          </Text>
        </View>

        <View style={styles.divider} />

        {/* ── 섹션 1: 인라인 Modal + Props ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>[ 인라인 Modal + Props 전달 ]</Text>
          <Text style={styles.body}>모달에 전달할 메시지 (props.message):</Text>

          {/*
            TextInput: 사용자가 입력한 값을 modalMessage state에 저장
            이 값이 InlineModal 컴포넌트의 message prop으로 전달됩니다.
          */}
          <TextInput
            style={styles.input}
            value={modalMessage}
            onChangeText={setModalMessage}
            placeholder="모달에 표시할 메시지 입력"
          />

          <Text style={styles.hint}>
            ↑ 입력한 값이 모달 컴포넌트의 props.message로 전달됩니다.
          </Text>

          <Button title="인라인 모달 열기" onPress={handleOpenInlineModal} />

          <Text style={styles.code}>
            {'<InlineModal\n'}
            {'  visible={inlineModalVisible}\n'}
            {'  message={modalMessage}  ← state 전달\n'}
            {'  onClose={handleCloseInlineModal}\n'}
            {'/>'}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* ── 섹션 2: 파일 기반 Router Modal ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>[ 파일 기반 Router Modal ]</Text>
          <Text style={styles.body}>
            router.push()로 별도 파일 라우트를 모달로 엽니다.{'\n'}
            _layout.tsx에서 presentation: &apos;modal&apos; 로 등록합니다.
          </Text>

          <Button title="파일 기반 모달 열기" onPress={handleOpenFileModal} />

          <Text style={styles.code}>
            {'// _layout.tsx\n'}
            {"<Stack.Screen name=\"modals/common-modal\"\n"}
            {"  options={{ presentation: 'modal' }} />\n\n"}
            {'// 호출\n'}
            {"router.push('/modals/common-modal')"}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* ── 섹션 3: Stack 화면 전환 + 파라미터 ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>[ Stack 화면 전환 + 파라미터 ]</Text>
          <Text style={styles.body}>스택 화면에 전달할 title (params.title):</Text>

          {/*
            TextInput: 입력한 값을 스택 화면의 params.title로 전달
          */}
          <TextInput
            style={styles.input}
            value={stackTitle}
            onChangeText={setStackTitle}
            placeholder="스택 화면의 제목 입력"
          />

          <Button title="스택 화면 열기" onPress={handleOpenStack} />

          <Text style={styles.code}>
            {'router.push({\n'}
            {"  pathname: '/stacks/common-stack',\n"}
            {'  params: {\n'}
            {'    title: stackTitle,  ← 입력한 값\n'}
            {"    from: '공통 실습 탭',\n"}
            {'  },\n'}
            {'})'}
          </Text>
          <Text style={styles.hint}>
            받는 쪽: useLocalSearchParams() 로 수신{'\n'}
            ⚠ 모든 params 값은 string으로 직렬화됩니다.
          </Text>
        </View>

      </ScrollView>

      {/*
        InlineModal 컴포넌트 렌더링
        - visible, message, onClose 를 props로 전달
        - 이 컴포넌트는 위에 같은 파일 안에 정의되어 있습니다
      */}
      <InlineModal
        visible={inlineModalVisible}
        message={modalMessage}
        onClose={handleCloseInlineModal}
      />
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────
//  스타일 — 의도적으로 plain하게 유지
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  section: {
    paddingVertical: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  hint: {
    fontSize: 12,
    color: '#888',
    lineHeight: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#555',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 6,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#EBEBEB',
    marginVertical: 4,
  },

  // 인라인 모달 스타일
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    gap: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    color: '#666',
  },
  propValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C3E50',
    backgroundColor: '#F0F4F8',
    padding: 8,
    borderRadius: 6,
  },
});
