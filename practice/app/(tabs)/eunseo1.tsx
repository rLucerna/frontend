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
 * 은서1 탭 화면
 * 학습 주제: 알럿 다이얼로그 모달(RN Modal) + Stack 화면 전환 + useFocusEffect
 */
export default function Eunseo1Screen() {
  /**
   * useRouter: expo-router 네비게이션 훅
   */
  const router = useRouter();
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [weatherUpdatedAt, setWeatherUpdatedAt] = useState('');
  const [locationAllowed, setLocationAllowed] = useState<boolean | null>(null);

  /**
   * useFocusEffect: 날씨 앱 활용 예시
   *
   * 날씨 앱에서 탭을 전환했다가 돌아올 때:
   * → 최신 날씨 데이터를 자동으로 갱신
   * → 실제 앱: fetch('/api/weather') 등 API 호출
   * → 이 예시: 현재 시각을 업데이트하여 시뮬레이션
   */
  useFocusEffect(
    useCallback(() => {
      // 포커스 시: 날씨 데이터 갱신 시각 업데이트
      const now = new Date().toLocaleTimeString('ko-KR');
      setWeatherUpdatedAt(now);
      console.log('[은서1] 날씨 데이터 갱신:', now);

      return () => {
        console.log('[은서1] 화면 언포커스 - 날씨 갱신 일시정지');
      };
    }, [])
  );

  /**
   * 알럿 다이얼로그 모달 열기 버튼 핸들러
   *
   * 알럿 다이얼로그(Alert Dialog) 패턴:
   * - 사용자의 결정이 필요한 상황에서 사용 (확인/취소, 권한 요청 등)
   * - React Native 기본 Alert.alert()와의 차이:
   *   ✅ 완전한 UI 커스터마이징 가능 (색상, 폰트, 레이아웃 등)
   *   ✅ 커스텀 버튼 배치 가능
   *   ❌ Alert.alert()보다 코드가 많음
   * - animationType: "fade" → 자연스러운 페이드 인/아웃
   */
  const handleOpenLocationAlert = () => {
    setAlertModalVisible(true);
  };

  /**
   * 알럿 다이얼로그 - 허용 버튼 핸들러
   * 위치 권한을 허용하고 모달을 닫습니다.
   */
  const handleAlertConfirm = () => {
    setAlertModalVisible(false);
    setLocationAllowed(true);
    console.log('[은서1] 위치 권한 허용됨');
  };

  /**
   * 알럿 다이얼로그 - 거부 버튼 핸들러
   * 위치 권한을 거부하고 모달을 닫습니다.
   */
  const handleAlertDeny = () => {
    setAlertModalVisible(false);
    setLocationAllowed(false);
    console.log('[은서1] 위치 권한 거부됨');
  };

  /**
   * 주간 날씨 예보 스택 화면 이동 핸들러
   *
   * router.push({ pathname, params }): 스택에 날씨 예보 화면 추가
   * - '/stacks/eunseo1-detail' → app/stacks/eunseo1-detail.tsx
   * - params: 도시·현재 기온·날씨 상태를 다음 화면에 전달
   */
  const handleOpenWeatherDetail = () => {
    router.push({
      pathname: '/stacks/eunseo1-detail',
      params: {
        city: '서울',
        currentTemp: '12',
        weather: '맑음',
        fromTab: '은서1',
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 학습 안내 카드 */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📚 은서1 학습 주제</Text>
          <Text style={styles.infoText}>
            {'• 알럿 다이얼로그 모달 (Alert Dialog)\n'}
            {'• Stack 화면 전환 (router.push)\n'}
            {'• useFocusEffect (데이터 자동 갱신)\n\n'}
            {'날씨 마지막 갱신: '}
            <Text style={styles.highlight}>{weatherUpdatedAt || '—'}</Text>
            {locationAllowed !== null && (
              `\n위치 권한: ${locationAllowed ? '✅ 허용됨' : '❌ 거부됨'}`
            )}
          </Text>
        </View>

        {/* ── 모달 섹션 ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.badge}>모달 종류 5</Text>
            <Text style={styles.sectionTitle}>알럿 다이얼로그 모달</Text>
          </View>
          <Text style={styles.sectionDesc}>
            확인/거부 버튼이 있는 알럿 다이얼로그입니다.{'\n'}
            RN 기본 Alert.alert()보다 완전한 커스터마이징이{'\n'}
            가능하며, 권한 요청 UI를 시뮬레이션합니다.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.modalButton]}
            onPress={handleOpenLocationAlert}
          >
            <Text style={styles.buttonText}>📍  위치 권한 요청 알럿 열기</Text>
          </TouchableOpacity>
        </View>

        {/* ── 스택 섹션 ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.badge, styles.badgeGreen]}>스택 전환</Text>
            <Text style={styles.sectionTitle}>Stack 화면 전환</Text>
          </View>
          <Text style={styles.sectionDesc}>
            서울 주간 날씨 예보 화면으로 이동합니다.{'\n'}
            도시·기온·날씨 상태를 파라미터로 전달합니다.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.stackButton]}
            onPress={handleOpenWeatherDetail}
          >
            <Text style={styles.buttonText}>🌤️  서울 주간 날씨 예보 보기</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* =============================================
          알럿 다이얼로그 모달 (Alert Dialog Modal)
          - animationType: "fade" → 페이드 효과로 자연스럽게 등장
          - transparent: true → 뒤 화면이 반투명하게 보임
          - 확인 / 거부 두 가지 액션 버튼
          - React Native Alert.alert()과 달리 완전한 커스터마이징 가능
      ============================================= */}
      <Modal
        visible={alertModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleAlertDeny}
      >
        <View style={styles.alertOverlay}>
          <View style={styles.alertCard}>
            <Text style={styles.alertIcon}>📍</Text>
            <Text style={styles.alertTitle}>위치 접근 권한 요청</Text>
            <Text style={styles.alertMessage}>
              {'정확한 날씨 정보 제공을 위해\n현재 위치 접근이 필요합니다.\n위치 정보 사용을 허용하시겠습니까?'}
            </Text>
            <View style={styles.alertButtons}>
              <TouchableOpacity
                style={[styles.alertBtn, styles.alertDenyBtn]}
                onPress={handleAlertDeny}
              >
                <Text style={styles.alertDenyText}>거부</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.alertBtn, styles.alertConfirmBtn]}
                onPress={handleAlertConfirm}
              >
                <Text style={styles.alertConfirmText}>허용</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const ORANGE = '#E67E22';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF6EC' },
  container: { padding: 16, gap: 14 },

  infoCard: { backgroundColor: ORANGE, borderRadius: 14, padding: 16 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  infoText: { fontSize: 13, color: '#FFE5C8', lineHeight: 22 },
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
    backgroundColor: ORANGE,
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
  modalButton: { backgroundColor: ORANGE },
  stackButton: { backgroundColor: '#27AE60' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  // 알럿 다이얼로그
  alertOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.52)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 36,
  },
  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  alertIcon: { fontSize: 52, marginBottom: 12 },
  alertTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 10 },
  alertMessage: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  alertButtons: { flexDirection: 'row', gap: 10, width: '100%' },
  alertBtn: { flex: 1, borderRadius: 10, padding: 14, alignItems: 'center' },
  alertDenyBtn: { backgroundColor: '#F0F0F0' },
  alertConfirmBtn: { backgroundColor: ORANGE },
  alertDenyText: { color: '#555', fontWeight: 'bold', fontSize: 15 },
  alertConfirmText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
