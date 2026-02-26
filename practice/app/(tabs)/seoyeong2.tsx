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
 * 서영2 탭 화면
 * 학습 주제: expo-router Router 모달 (presentation: 'modal') + Stack 화면 전환
 *
 * Router 모달 vs React Native Modal 비교:
 * ┌──────────────────┬───────────────────────────────┬─────────────────────────────┐
 * │                  │ expo-router Modal              │ React Native <Modal>        │
 * ├──────────────────┼───────────────────────────────┼─────────────────────────────┤
 * │ 구현 방식        │ 별도 파일 + 라우트 등록        │ 현재 파일 내 컴포넌트       │
 * │ 상태 관리        │ URL/라우트로 관리              │ useState로 관리             │
 * │ 딥링크 지원      │ ✅ 가능                       │ ❌ 불가                     │
 * │ 뒤로가기         │ router.back() 또는 스와이프    │ onRequestClose 콜백          │
 * │ 코드 분리        │ 파일로 완전 분리               │ 같은 파일에 함께 있음       │
 * └──────────────────┴───────────────────────────────┴─────────────────────────────┘
 */
export default function Seoyeong2Screen() {
  /**
   * useRouter: expo-router 네비게이션 훅
   */
  const router = useRouter();

  /**
   * expo-router 방식 Router 모달 열기 버튼 핸들러
   *
   * router.push()를 사용하지만, 해당 라우트가 _layout.tsx에
   * presentation: 'modal'로 등록되어 있어 모달처럼 표시됩니다.
   *
   * app/_layout.tsx에 등록된 방식:
   * <Stack.Screen
   *   name="modals/seoyeong2-modal"
   *   options={{ presentation: 'modal' }}
   * />
   *
   * 'modal' presentation:
   * - iOS: 아래에서 위로 슬라이드, 이전 화면이 살짝 뒤에 보임
   * - Android: 일반 화면 전환
   */
  const handleOpenMusicSettingsModal = () => {
    // router.push로 모달 라우트로 이동 (presentation: 'modal' 설정 덕에 모달로 표시)
    router.push('/modals/seoyeong2-modal');
  };

  /**
   * 아티스트 상세 스택 화면 이동 핸들러
   *
   * router.push({ pathname, params }): 스택에 아티스트 상세 화면 추가
   * - '/stacks/seoyeong2-detail' → app/stacks/seoyeong2-detail.tsx
   * - params: 아티스트명, 장르, 데뷔연도를 다음 화면에 전달
   */
  const handleOpenArtistDetail = () => {
    router.push({
      pathname: '/stacks/seoyeong2-detail',
      params: {
        artistName: 'BTS',
        genre: 'K-Pop',
        debutYear: '2013',
        fromTab: '서영2',
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 학습 안내 카드 */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📚 서영2 학습 주제</Text>
          <Text style={styles.infoText}>
            {'• Router 모달 (expo-router presentation: modal)\n'}
            {'• Stack 화면 전환 (router.push)\n'}
            {'• 파라미터 전달 (params)\n\n'}
            {'💡 서영1(바텀시트)과의 차이:\n'}
            {'    이 모달은 별도 파일로 관리되며\n'}
            {'    독립적인 URL 라우트를 가집니다.'}
          </Text>
        </View>

        {/* ── 모달 섹션 ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.badge}>모달 종류 4</Text>
            <Text style={styles.sectionTitle}>Router 모달 (presentation: modal)</Text>
          </View>
          <Text style={styles.sectionDesc}>
            expo-router의 파일 기반 모달입니다.{'\n'}
            router.push()로 이동하지만, _layout.tsx에서{'\n'}
            presentation: &apos;modal&apos; 옵션으로 모달처럼 표시됩니다.{'\n'}
            별도 파일(modals/seoyeong2-modal.tsx)로 분리되어 있습니다.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.modalButton]}
            onPress={handleOpenMusicSettingsModal}
          >
            <Text style={styles.buttonText}>🎵  음악 플레이어 설정 모달 열기</Text>
          </TouchableOpacity>
        </View>

        {/* ── 스택 섹션 ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.badge, styles.badgeGreen]}>스택 전환</Text>
            <Text style={styles.sectionTitle}>Stack 화면 전환</Text>
          </View>
          <Text style={styles.sectionDesc}>
            BTS 아티스트 상세 정보 화면으로 이동합니다.{'\n'}
            아티스트명·장르·데뷔연도를 파라미터로 전달합니다.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.stackButton]}
            onPress={handleOpenArtistDetail}
          >
            <Text style={styles.buttonText}>🎤  BTS 아티스트 정보 보기</Text>
          </TouchableOpacity>
        </View>

        {/* 비교 설명 카드 */}
        <View style={styles.compareCard}>
          <Text style={styles.compareTitle}>🔍 모달 방식 비교</Text>
          <View style={styles.compareRow}>
            <Text style={styles.compareLabel}>용준1 팝업</Text>
            <Text style={styles.compareValue}>RN Modal · state 제어</Text>
          </View>
          <View style={styles.compareRow}>
            <Text style={styles.compareLabel}>용준2 풀스크린</Text>
            <Text style={styles.compareValue}>RN Modal · transparent:false</Text>
          </View>
          <View style={styles.compareRow}>
            <Text style={styles.compareLabel}>서영1 바텀시트</Text>
            <Text style={styles.compareValue}>RN Modal · flex-end 정렬</Text>
          </View>
          <View style={[styles.compareRow, styles.compareRowHighlight]}>
            <Text style={[styles.compareLabel, { color: '#8E44AD' }]}>서영2 Router</Text>
            <Text style={[styles.compareValue, { color: '#8E44AD' }]}>expo-router · 별도 파일</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const PURPLE2 = '#8E44AD';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F0FF' },
  container: { padding: 16, gap: 14 },

  infoCard: { backgroundColor: PURPLE2, borderRadius: 14, padding: 16 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  infoText: { fontSize: 13, color: '#EAD9FF', lineHeight: 22 },

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
    backgroundColor: PURPLE2,
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
  modalButton: { backgroundColor: PURPLE2 },
  stackButton: { backgroundColor: '#27AE60' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  // 비교 카드
  compareCard: {
    backgroundColor: '#FAF6FF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8D9FF',
  },
  compareTitle: { fontSize: 14, fontWeight: 'bold', color: '#555', marginBottom: 12 },
  compareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6FF',
  },
  compareRowHighlight: {
    borderBottomWidth: 0,
    backgroundColor: '#F0E6FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  compareLabel: { fontSize: 13, color: '#333', fontWeight: '600' },
  compareValue: { fontSize: 12, color: '#666' },
});
