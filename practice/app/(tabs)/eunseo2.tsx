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
 * 은서2 탭 화면
 * 학습 주제: expo-router FullScreen 모달 (presentation: 'fullScreenModal') + Stack 화면 전환
 *
 * 서영2(Router Modal)와의 차이:
 * - 서영2: presentation: 'modal'     → 아래에서 슬라이드, 이전 화면이 살짝 보임
 * - 은서2: presentation: 'fullScreenModal' → 완전히 전체화면을 덮는 모달
 */
export default function Eunseo2Screen() {
  /**
   * useRouter: expo-router 네비게이션 훅
   */
  const router = useRouter();

  /**
   * expo-router 풀스크린 Router 모달 열기 버튼 핸들러
   *
   * router.push()로 이동하지만, _layout.tsx에서
   * presentation: 'fullScreenModal'로 등록되어 전체화면 모달로 표시됩니다.
   *
   * app/_layout.tsx에 등록된 방식:
   * <Stack.Screen
   *   name="modals/eunseo2-modal"
   *   options={{ presentation: 'fullScreenModal' }}
   * />
   *
   * presentation 옵션별 동작 차이:
   * - 'card'            : 일반 스택 화면 (기본값)
   * - 'modal'           : 아래에서 슬라이드, 이전 화면 살짝 보임 (iOS)
   * - 'fullScreenModal' : 완전 전체화면, 이전 화면 완전히 가려짐
   * - 'transparentModal': 투명 배경 모달 (오버레이 효과)
   */
  const handleOpenBookReviewFullscreen = () => {
    // router.push로 풀스크린 모달 라우트로 이동
    router.push('/modals/eunseo2-modal');
  };

  /**
   * 책 상세 스택 화면 이동 핸들러
   *
   * router.push({ pathname, params }): 스택에 책 상세 화면 추가
   * - '/stacks/eunseo2-detail' → app/stacks/eunseo2-detail.tsx
   * - params: 책 제목·저자·장르·평점을 다음 화면에 전달
   */
  const handleOpenBookDetail = () => {
    router.push({
      pathname: '/stacks/eunseo2-detail',
      params: {
        bookTitle: '어린 왕자',
        author: '앙투안 드 생텍쥐페리',
        genre: '소설',
        rating: '5',
        fromTab: '은서2',
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 학습 안내 카드 */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📚 은서2 학습 주제</Text>
          <Text style={styles.infoText}>
            {'• Router 풀스크린 모달 (presentation: fullScreenModal)\n'}
            {'• Stack 화면 전환 (router.push)\n'}
            {'• 파라미터 전달 (params)\n\n'}
            {'💡 서영2 Router 모달과 비교해보세요!\n'}
            {'    서영2: 이전 화면이 살짝 뒤에 보임\n'}
            {'    은서2: 이전 화면을 완전히 덮음'}
          </Text>
        </View>

        {/* ── 모달 섹션 ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.badge}>모달 종류 6</Text>
            <Text style={styles.sectionTitle}>Router 풀스크린 모달</Text>
          </View>
          <Text style={styles.sectionDesc}>
            expo-router의 presentation: &apos;fullScreenModal&apos; 방식입니다.{'\n'}
            서영2의 일반 Router 모달과 비교해{'\n'}
            화면이 덮히는 방식의 차이를 확인해보세요.{'\n'}
            별도 파일(modals/eunseo2-modal.tsx)로 관리됩니다.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.modalButton]}
            onPress={handleOpenBookReviewFullscreen}
          >
            <Text style={styles.buttonText}>📝  독서 기록 작성 (풀스크린 모달)</Text>
          </TouchableOpacity>
        </View>

        {/* ── 스택 섹션 ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.badge, styles.badgeGreen]}>스택 전환</Text>
            <Text style={styles.sectionTitle}>Stack 화면 전환</Text>
          </View>
          <Text style={styles.sectionDesc}>
            "어린 왕자" 책 상세 및 리뷰 화면으로 이동합니다.{'\n'}
            책 제목·저자·장르·평점을 파라미터로 전달합니다.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.stackButton]}
            onPress={handleOpenBookDetail}
          >
            <Text style={styles.buttonText}>📖  어린 왕자 상세 리뷰 보기</Text>
          </TouchableOpacity>
        </View>

        {/* 전체 모달 타입 요약 */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>📋 6가지 모달 요약</Text>
          {[
            { tab: '용준1', type: 'Popup', desc: 'RN Modal · 중앙 팝업' },
            { tab: '용준2', type: 'FullScreen', desc: 'RN Modal · 전체화면' },
            { tab: '서영1', type: 'BottomSheet', desc: 'RN Modal · 하단 시트' },
            { tab: '서영2', type: 'Router Modal', desc: 'expo-router · modal' },
            { tab: '은서1', type: 'Alert Dialog', desc: 'RN Modal · 알럿' },
            { tab: '은서2', type: 'Router FS', desc: 'expo-router · fullScreen' },
          ].map((item, i) => (
            <View key={i} style={[styles.summaryRow, i === 5 && styles.summaryRowLast]}>
              <Text style={styles.summaryTab}>{item.tab}</Text>
              <Text style={styles.summaryType}>{item.type}</Text>
              <Text style={styles.summaryDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const ORANGE2 = '#D35400';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF6EC' },
  container: { padding: 16, gap: 14 },

  infoCard: { backgroundColor: ORANGE2, borderRadius: 14, padding: 16 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  infoText: { fontSize: 13, color: '#FFE5C8', lineHeight: 22 },

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
    backgroundColor: ORANGE2,
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
  modalButton: { backgroundColor: ORANGE2 },
  stackButton: { backgroundColor: '#27AE60' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  // 요약 카드
  summaryCard: {
    backgroundColor: '#FFF6EC',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFDDB8',
  },
  summaryTitle: { fontSize: 14, fontWeight: 'bold', color: '#555', marginBottom: 12 },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE8C8',
    gap: 8,
  },
  summaryRowLast: { borderBottomWidth: 0 },
  summaryTab: { width: 44, fontSize: 12, fontWeight: 'bold', color: ORANGE2 },
  summaryType: { width: 90, fontSize: 12, color: '#333', fontWeight: '600' },
  summaryDesc: { flex: 1, fontSize: 11, color: '#777' },
});
