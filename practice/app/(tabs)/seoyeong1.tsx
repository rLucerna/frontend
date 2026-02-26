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
 * 서영1 탭 화면
 * 학습 주제: 바텀시트 모달(RN Modal) + Stack 화면 전환 + useFocusEffect
 */
export default function Seoyeong1Screen() {
  /**
   * useRouter: expo-router 네비게이션 훅
   * 이 화면에서는 router.push()로 여행지 상세 화면으로 이동합니다.
   */
  const router = useRouter();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [lastFocusedTime, setLastFocusedTime] = useState('');

  /**
   * useFocusEffect: 화면 포커스 라이프사이클 훅
   *
   * 실제 활용 예시: 탭을 눌러 돌아올 때 최신 데이터 재조회
   * - 여행 앱: 탭 전환 시 새로운 여행 추천 목록 갱신
   * - SNS 앱: 피드로 돌아올 때 새 게시물 로드
   *
   * useCallback 의존성 배열이 [] 이므로 함수는 변하지 않지만,
   * 화면이 포커스될 때마다 콜백이 실행됩니다.
   */
  useFocusEffect(
    useCallback(() => {
      // 포커스 시: 마지막 방문 시간 업데이트 (실제 앱에서는 API 재호출)
      const now = new Date().toLocaleTimeString('ko-KR');
      setLastFocusedTime(now);
      console.log('[서영1] 화면 포커스 - 여행 데이터 갱신 시각:', now);

      return () => {
        // 언포커스 시: 불필요한 요청 취소 등
        console.log('[서영1] 화면 언포커스');
      };
    }, [])
  );

  /**
   * 바텀시트 모달 열기 버튼 핸들러
   *
   * 바텀시트(Bottom Sheet) 구현 방법:
   * - React Native <Modal> + justifyContent: 'flex-end' 조합
   * - animationType: "slide" → 아래에서 자연스럽게 슬라이드 업
   * - transparent: true → 위 빈 영역에 반투명 오버레이 표시
   * - 배경(오버레이) 클릭 시 닫히도록 TouchableOpacity 처리
   */
  const handleOpenTravelBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  /** 바텀시트 모달 닫기 핸들러 */
  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  /**
   * 여행지 상세 스택 화면 이동 핸들러
   *
   * router.push({ pathname, params }): 스택에 여행지 상세 화면 추가
   * - '/stacks/seoyeong1-detail' → app/stacks/seoyeong1-detail.tsx
   * - params: 여행지 정보(목적지, 국가, 여행일수, 계절)를 다음 화면에 전달
   */
  const handleOpenDestinationDetail = () => {
    router.push({
      pathname: '/stacks/seoyeong1-detail',
      params: {
        destination: '제주도',
        country: '대한민국',
        days: '3',
        season: '봄',
        fromTab: '서영1',
      },
    });
  };

  const destinations = [
    { name: '제주도', country: '대한민국', emoji: '🏝️' },
    { name: '부산', country: '대한민국', emoji: '🌊' },
    { name: '경주', country: '대한민국', emoji: '⛩️' },
    { name: '강릉', country: '대한민국', emoji: '🌊' },
    { name: '전주', country: '대한민국', emoji: '🏯' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 학습 안내 카드 */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📚 서영1 학습 주제</Text>
          <Text style={styles.infoText}>
            {'• 바텀시트 모달 (Bottom Sheet Modal)\n'}
            {'• Stack 화면 전환 (router.push)\n'}
            {'• useFocusEffect (데이터 갱신)\n\n'}
            {'마지막 포커스: '}
            <Text style={styles.highlight}>{lastFocusedTime || '—'}</Text>
            {'\n(다른 탭을 갔다가 돌아오면 시간이 갱신됩니다)'}
          </Text>
        </View>

        {/* ── 모달 섹션 ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.badge}>모달 종류 3</Text>
            <Text style={styles.sectionTitle}>바텀시트 모달 (Bottom Sheet)</Text>
          </View>
          <Text style={styles.sectionDesc}>
            화면 하단에서 위로 올라오는 시트입니다.{'\n'}
            Modal + justifyContent: flex-end 로 구현합니다.{'\n'}
            배경 터치 또는 취소 버튼으로 닫을 수 있습니다.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.modalButton]}
            onPress={handleOpenTravelBottomSheet}
          >
            <Text style={styles.buttonText}>✈️  새 여행 기록 추가하기</Text>
          </TouchableOpacity>
        </View>

        {/* ── 스택 섹션 ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.badge, styles.badgeGreen]}>스택 전환</Text>
            <Text style={styles.sectionTitle}>Stack 화면 전환</Text>
          </View>
          <Text style={styles.sectionDesc}>
            제주도 여행지 상세 정보 화면으로 이동합니다.{'\n'}
            여행지·국가·여행일수·계절을 파라미터로 전달합니다.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.stackButton]}
            onPress={handleOpenDestinationDetail}
          >
            <Text style={styles.buttonText}>🗺️  제주도 여행지 상세 보기</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* =============================================
          바텀시트 모달 (Bottom Sheet Modal)
          구현 원리:
          1. Modal의 배경 View를 flex:1, justifyContent:'flex-end' 로 설정
             → 자식 요소(시트)가 화면 하단에 붙음
          2. transparent: true → 시트 위 빈 영역이 반투명하게 보임
          3. animationType: "slide" → 아래에서 위로 자연스럽게 등장
          4. 빈 영역(TouchableOpacity) 클릭 시 닫힘 처리
      ============================================= */}
      <Modal
        visible={bottomSheetVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseBottomSheet}
      >
        {/* 반투명 배경: 클릭 시 닫힘 */}
        <TouchableOpacity
          style={styles.sheetOverlay}
          activeOpacity={1}
          onPress={handleCloseBottomSheet}
        >
          {/* 시트 본문: 클릭해도 닫히지 않도록 이벤트 전파 차단 */}
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <View style={styles.bottomSheet}>
              {/* 드래그 핸들 */}
              <View style={styles.sheetHandle} />
              <Text style={styles.sheetTitle}>✈️ 여행지를 선택하세요</Text>

              {destinations.map((dest, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.sheetItem}
                  onPress={handleCloseBottomSheet}
                >
                  <Text style={styles.sheetEmoji}>{dest.emoji}</Text>
                  <View>
                    <Text style={styles.sheetItemText}>{dest.name}</Text>
                    <Text style={styles.sheetItemSub}>{dest.country}</Text>
                  </View>
                  <Text style={styles.sheetArrow}>›</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity style={styles.sheetCancelBtn} onPress={handleCloseBottomSheet}>
                <Text style={styles.sheetCancelText}>취소</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const PURPLE = '#9B59B6';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F0FF' },
  container: { padding: 16, gap: 14 },

  infoCard: { backgroundColor: PURPLE, borderRadius: 14, padding: 16 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  infoText: { fontSize: 13, color: '#EAD9FF', lineHeight: 22 },
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
    backgroundColor: PURPLE,
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
  modalButton: { backgroundColor: PURPLE },
  stackButton: { backgroundColor: '#27AE60' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  // 바텀시트 스타일
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.48)',
    justifyContent: 'flex-end',   // ← 핵심: 하단 정렬
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 36,
  },
  sheetHandle: {
    width: 44,
    height: 5,
    backgroundColor: '#DDD',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 18,
  },
  sheetTitle: { fontSize: 17, fontWeight: 'bold', color: '#222', marginBottom: 14 },
  sheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3',
    gap: 14,
  },
  sheetEmoji: { fontSize: 28, width: 36 },
  sheetItemText: { fontSize: 15, color: '#222', fontWeight: '600' },
  sheetItemSub: { fontSize: 12, color: '#999' },
  sheetArrow: { marginLeft: 'auto', fontSize: 20, color: '#CCC' },
  sheetCancelBtn: {
    marginTop: 14,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  sheetCancelText: { fontSize: 15, color: '#555', fontWeight: '600' },
});
