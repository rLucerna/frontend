import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

/**
 * 용준2 탭 화면
 * 학습 주제: 풀스크린 모달(RN Modal) + Stack 화면 전환 + 파라미터 전달
 */
export default function Yongjun2Screen() {
  /**
   * useRouter: expo-router 네비게이션 훅
   * Link 컴포넌트와 useRouter의 차이:
   * - <Link href="..."> : JSX 요소로 선언적 네비게이션, 터치 가능한 링크 생성
   * - useRouter()       : 훅으로 명령형(imperative) 네비게이션, 로직 안에서 사용
   */
  const router = useRouter();
  const [recipeModalVisible, setRecipeModalVisible] = useState(false);

  /**
   * 풀스크린 모달 열기 버튼 핸들러
   *
   * React Native <Modal>을 전체 화면으로 표시합니다.
   * - transparent: false → 배경을 완전히 덮음 (풀스크린 효과)
   * - animationType: "slide" → 아래에서 위로 슬라이드 (iOS 모달 기본 동작과 유사)
   * - 팝업 모달(용준1)과의 차이: 배경이 보이지 않고 전체 화면을 차지합니다
   */
  const handleOpenRecipeModal = () => {
    setRecipeModalVisible(true);
  };

  /** 풀스크린 모달 닫기 핸들러 */
  const handleCloseRecipeModal = () => {
    setRecipeModalVisible(false);
  };

  /**
   * 레시피 상세 스택 화면 이동 핸들러
   *
   * router.push({ pathname, params }): 스택에 새 화면 추가
   * - '/stacks/yongjun2-detail' → app/stacks/yongjun2-detail.tsx
   * - params: 레시피 이름, 분량, 조리시간 등을 다음 화면에 전달
   */
  const handleOpenRecipeDetail = () => {
    router.push({
      pathname: '/stacks/yongjun2-detail',
      params: {
        recipeName: '김치찌개',
        servings: '2',
        cookTime: '30분',
        fromTab: '용준2',
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 학습 안내 카드 */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📚 용준2 학습 주제</Text>
          <Text style={styles.infoText}>
            {'• 풀스크린 모달 (Full Screen Modal)\n'}
            {'• Stack 화면 전환 (router.push)\n'}
            {'• 파라미터 전달 (params)\n\n'}
            {'💡 용준1의 팝업 모달과 비교해보세요!\n'}
            {'    팝업: 배경이 보이고 중앙에 작게\n'}
            {'    풀스크린: 배경을 완전히 덮음'}
          </Text>
        </View>

        {/* ── 모달 섹션 ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.badge}>모달 종류 2</Text>
            <Text style={styles.sectionTitle}>풀스크린 모달 (Full Screen)</Text>
          </View>
          <Text style={styles.sectionDesc}>
            화면 전체를 덮는 모달입니다.{'\n'}
            transparent: false로 배경을 완전히 가립니다.{'\n'}
            아래에서 위로 슬라이드되어 나타납니다.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.modalButton]}
            onPress={handleOpenRecipeModal}
          >
            <Text style={styles.buttonText}>🍳  오늘의 추천 레시피 전체 보기</Text>
          </TouchableOpacity>
        </View>

        {/* ── 스택 섹션 ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.badge, styles.badgeGreen]}>스택 전환</Text>
            <Text style={styles.sectionTitle}>Stack 화면 전환</Text>
          </View>
          <Text style={styles.sectionDesc}>
            김치찌개 레시피 재료·조리법 화면으로 이동합니다.{'\n'}
            레시피 이름·분량·조리시간을 파라미터로 전달합니다.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.stackButton]}
            onPress={handleOpenRecipeDetail}
          >
            <Text style={styles.buttonText}>📋  김치찌개 레시피 상세 보기</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* =============================================
          풀스크린 모달 (Full Screen Modal)
          - transparent: false → 배경 완전히 덮음
          - animationType: "slide" → 아래에서 슬라이드 업
          - SafeAreaView로 노치·홈바 영역 처리
      ============================================= */}
      <Modal
        visible={recipeModalVisible}
        transparent={false}
        animationType="slide"
        onRequestClose={handleCloseRecipeModal}
      >
        <SafeAreaView style={styles.fullscreenModal}>
          {/* 모달 헤더 */}
          <View style={styles.fullscreenHeader}>
            <Text style={styles.fullscreenTitle}>🍳 오늘의 추천 레시피</Text>
            <TouchableOpacity onPress={handleCloseRecipeModal} style={styles.closeXBtn}>
              <Text style={styles.closeX}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.fullscreenContent}>
            <View style={styles.recipeHero}>
              <Text style={styles.recipeEmoji}>🥘</Text>
              <Text style={styles.recipeName}>부대찌개</Text>
              <Text style={styles.recipeMeta}>👤 2인분  •  ⏱ 25분  •  ⭐ 4.8</Text>
            </View>

            <View style={styles.recipeSection}>
              <Text style={styles.recipeSectionTitle}>재료</Text>
              {['스팸 1캔', '소시지 100g', '햄 100g', '두부 반모', '김치 200g', '라면사리 1개', '체다치즈 1장', '육수 500ml'].map((item, i) => (
                <Text key={i} style={styles.recipeItem}>• {item}</Text>
              ))}
            </View>

            <View style={styles.recipeSection}>
              <Text style={styles.recipeSectionTitle}>조리법</Text>
              {[
                '냄비에 육수를 붓고 중불로 가열합니다',
                '스팸, 소시지, 햄을 넣고 끓입니다',
                '김치와 두부를 추가합니다',
                '15분간 끓인 뒤 라면사리를 넣습니다',
                '치즈를 올리고 1분 더 끓여 완성합니다',
              ].map((step, i) => (
                <View key={i} style={styles.stepRow}>
                  <View style={styles.stepBadge}><Text style={styles.stepNum}>{i + 1}</Text></View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.fullscreenCloseBtn} onPress={handleCloseRecipeModal}>
              <Text style={styles.fullscreenCloseBtnText}>모달 닫기</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const BLUE2 = '#3A7BD5';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EEF4FF' },
  container: { padding: 16, gap: 14 },

  infoCard: { backgroundColor: BLUE2, borderRadius: 14, padding: 16 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  infoText: { fontSize: 13, color: '#DCE9FF', lineHeight: 22 },

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
    backgroundColor: BLUE2,
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
  modalButton: { backgroundColor: BLUE2 },
  stackButton: { backgroundColor: '#27AE60' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  // 풀스크린 모달
  fullscreenModal: { flex: 1, backgroundColor: '#fff' },
  fullscreenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: BLUE2,
  },
  fullscreenTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  closeXBtn: { padding: 4 },
  closeX: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  fullscreenContent: { flex: 1, padding: 16 },

  recipeHero: {
    backgroundColor: '#EEF4FF',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  recipeEmoji: { fontSize: 64, marginBottom: 8 },
  recipeName: { fontSize: 24, fontWeight: 'bold', color: '#222', marginBottom: 6 },
  recipeMeta: { fontSize: 13, color: '#777' },

  recipeSection: { marginBottom: 20 },
  recipeSectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: BLUE2,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#EEF4FF',
    paddingBottom: 6,
  },
  recipeItem: { fontSize: 14, color: '#444', paddingVertical: 5, paddingLeft: 4 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 10 },
  stepBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: BLUE2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNum: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  stepText: { flex: 1, fontSize: 14, color: '#444', lineHeight: 22 },

  fullscreenCloseBtn: {
    backgroundColor: BLUE2,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  fullscreenCloseBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
