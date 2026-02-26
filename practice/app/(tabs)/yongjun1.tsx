import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

/**
 * 용준1 탭 화면
 * 학습 주제: 팝업 모달(RN Modal) + Stack 화면 전환 + useFocusEffect + 파라미터 전달
 */
export default function Yongjun1Screen() {
  /**
   * useRouter: expo-router에서 제공하는 네비게이션 훅
   * - router.push()   → 새 화면을 스택에 추가 (이전 화면 유지)
   * - router.replace() → 현재 화면을 새 화면으로 교체 (이전 화면 제거)
   * - router.back()   → 스택에서 현재 화면 제거 (이전 화면으로 복귀)
   */
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [visitCount, setVisitCount] = useState(0);

  /**
   * useFocusEffect: 화면이 포커스될 때마다 실행되는 훅
   *
   * - expo-router / @react-navigation에서 제공
   * - 탭을 전환했다가 다시 이 탭으로 돌아올 때도 재실행됩니다.
   * - useEffect(() => {}, [])와 차이: useEffect는 최초 마운트 시에만 실행되지만,
   *   useFocusEffect는 화면이 포커스될 때마다(탭 전환 포함) 실행됩니다.
   * - 반드시 useCallback으로 감싸야 무한 루프를 방지할 수 있습니다.
   * - return 함수 = 화면이 언포커스될 때(다른 탭으로 이동 시) 실행되는 정리 함수
   */
  useFocusEffect(
    useCallback(() => {
      // 화면 포커스 시 → 방문 횟수 증가 (실제 앱에서는 데이터 새로고침 등에 활용)
      setVisitCount((prev) => prev + 1);
      console.log('[용준1] 화면 포커스됨 - 데이터 갱신 가능 시점');

      return () => {
        // 화면 언포커스 시 → 정리 작업 (타이머 취소, 구독 해제 등)
        console.log('[용준1] 화면 언포커스됨');
      };
    }, [])
  );

  /**
   * 팝업 모달 열기 버튼 핸들러
   *
   * React Native의 <Modal> 컴포넌트를 state로 제어합니다.
   * - transparent: true → 배경이 투명하여 아래 화면이 보임
   * - animationType: "fade" → 페이드 인/아웃 애니메이션
   * - visible: state 값으로 표시/숨김을 제어합니다
   */
  const handleOpenProfileModal = () => {
    setModalVisible(true);
  };

  /** 팝업 모달 닫기 핸들러 */
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  /**
   * 프로필 상세 스택 화면 이동 핸들러
   *
   * router.push(): 현재 스택에 새 화면을 추가합니다.
   * - pathname: 이동할 파일 경로 (app 폴더 기준)
   *   '/stacks/yongjun1-detail' → app/stacks/yongjun1-detail.tsx
   * - params: 다음 화면으로 전달할 데이터 (키-값 쌍)
   *   받는 쪽에서 useLocalSearchParams() 훅으로 수신합니다.
   */
  const handleOpenProfileDetail = () => {
    router.push({
      pathname: '/stacks/yongjun1-detail',
      params: {
        userName: '홍용준',
        userEmail: 'yongjun@example.com',
        userJob: '프론트엔드 개발자',
        fromTab: '용준1',
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 학습 안내 카드 */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📚 용준1 학습 주제</Text>
          <Text style={styles.infoText}>
            {'• 팝업 모달 (React Native Modal)\n'}
            {'• Stack 화면 전환 (router.push)\n'}
            {'• 파라미터 전달 (params)\n'}
            {'• useFocusEffect (포커스 감지)\n\n'}
            {'이 탭 방문 횟수: '}
            <Text style={styles.highlight}>{visitCount}회</Text>
            {'\n(다른 탭을 갔다가 돌아와보세요!)'}
          </Text>
        </View>

        {/* ── 모달 섹션 ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.badge}>모달 종류 1</Text>
            <Text style={styles.sectionTitle}>팝업 모달 (Popup Modal)</Text>
          </View>
          <Text style={styles.sectionDesc}>
            화면 중앙에 나타나는 작은 다이얼로그입니다.{'\n'}
            React Native의 {'<Modal>'} 컴포넌트를 직접 사용합니다.{'\n'}
            배경이 반투명하여 뒤 화면이 보입니다.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.modalButton]}
            onPress={handleOpenProfileModal}
          >
            <Text style={styles.buttonText}>👤  프로필 정보 팝업 열기</Text>
          </TouchableOpacity>
        </View>

        {/* ── 스택 섹션 ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.badge, styles.badgeGreen]}>스택 전환</Text>
            <Text style={styles.sectionTitle}>Stack 화면 전환</Text>
          </View>
          <Text style={styles.sectionDesc}>
            router.push()로 새 화면을 스택에 쌓습니다.{'\n'}
            params로 데이터(이름, 이메일, 직업)를 함께 전달하며,{'\n'}
            상세 화면에서 useLocalSearchParams()로 수신합니다.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.stackButton]}
            onPress={handleOpenProfileDetail}
          >
            <Text style={styles.buttonText}>✏️  프로필 상세 편집 화면으로 이동</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* =============================================
          팝업 모달 (Popup Modal)
          React Native <Modal> 컴포넌트 속성:
          - visible        : 모달 표시 여부 (boolean state로 제어)
          - transparent    : true → 배경을 투명하게 하여 아래 화면이 보임
          - animationType  : 등장 애니메이션 ('none' | 'slide' | 'fade')
          - onRequestClose : 안드로이드 하드웨어 뒤로가기 버튼 눌렸을 때 처리
      ============================================= */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        {/* 반투명 배경 오버레이 */}
        <View style={styles.modalOverlay}>
          {/* 팝업 카드 */}
          <View style={styles.popupCard}>
            <Text style={styles.modalTitle}>👤 프로필 정보</Text>

            {[
              { label: '이름', value: '홍용준' },
              { label: '이메일', value: 'yongjun@example.com' },
              { label: '직업', value: '프론트엔드 개발자' },
              { label: '소개', value: 'React Native를 공부하는 개발자입니다 😊' },
            ].map((item) => (
              <View key={item.label} style={styles.profileRow}>
                <Text style={styles.profileLabel}>{item.label}</Text>
                <Text style={styles.profileValue}>{item.value}</Text>
              </View>
            ))}

            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const BLUE = '#4A90E2';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EEF4FF' },
  container: { padding: 16, gap: 14 },

  infoCard: {
    backgroundColor: BLUE,
    borderRadius: 14,
    padding: 16,
  },
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  infoText: { fontSize: 13, color: '#DCE9FF', lineHeight: 22 },
  highlight: { fontWeight: 'bold', color: '#FFE082' },

  section: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  badge: {
    backgroundColor: '#4A90E2',
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    overflow: 'hidden',
  },
  badgeGreen: { backgroundColor: '#27AE60' },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#222' },
  sectionDesc: { fontSize: 13, color: '#555', lineHeight: 20, marginBottom: 14 },

  button: { borderRadius: 10, padding: 14, alignItems: 'center' },
  modalButton: { backgroundColor: BLUE },
  stackButton: { backgroundColor: '#27AE60' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  // 모달 스타일
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.52)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  popupCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
    textAlign: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  profileLabel: { width: 54, fontSize: 13, color: '#999', fontWeight: '600' },
  profileValue: { flex: 1, fontSize: 13, color: '#333' },
  closeButton: {
    marginTop: 18,
    backgroundColor: BLUE,
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
  },
  closeButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
