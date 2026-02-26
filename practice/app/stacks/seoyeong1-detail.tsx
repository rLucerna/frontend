import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

/**
 * 서영1 스택 화면: 여행지 상세 정보
 */
export default function Seoyeong1DetailScreen() {
  /**
   * useRouter: expo-router 네비게이션 훅
   * router.back()으로 서영1 탭으로 복귀합니다.
   */
  const router = useRouter();

  /**
   * useLocalSearchParams: 서영1 탭에서 전달한 여행지 파라미터 수신
   * - destination: 여행지명
   * - country: 국가명
   * - days: 여행 일수 (숫자지만 문자열로 전달됨 → Number()로 변환 가능)
   * - season: 여행 계절
   * - fromTab: 보낸 탭 이름
   */
  const { destination, country, days, season, fromTab } = useLocalSearchParams<{
    destination: string;
    country: string;
    days: string;
    season: string;
    fromTab: string;
  }>();

  /**
   * 뒤로 가기 핸들러
   * router.back(): 스택에서 현재 화면을 제거하고 서영1 탭으로 복귀
   */
  const handleGoBack = () => {
    router.back();
  };

  const landmarks = [
    { name: '한라산', desc: '해발 1,947m 대한민국 최고봉', emoji: '🏔️' },
    { name: '성산일출봉', desc: '유네스코 세계자연유산', emoji: '🌋' },
    { name: '천지연폭포', desc: '23m 높이의 아름다운 폭포', emoji: '💧' },
    { name: '협재해수욕장', desc: '에메랄드빛 바다와 백사장', emoji: '🏖️' },
  ];

  const foods = [
    { name: '흑돼지', desc: '제주 대표 특산 먹거리', emoji: '🥓' },
    { name: '갈치조림', desc: '제주 은갈치로 만든 향토 음식', emoji: '🐟' },
    { name: '고기국수', desc: '돼지 육수와 국수의 조합', emoji: '🍜' },
    { name: '한라봉', desc: '제주 특산 감귤류 과일', emoji: '🍊' },
  ];

  const tips = [
    '렌터카 예약은 최소 1주일 전에 하세요',
    `${season}에는 날씨가 변덕스러울 수 있어 우비 준비 필수`,
    '올레길 트레킹은 편한 신발 착용 권장',
    '성수기에는 숙소 예약을 미리 해두세요',
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 파라미터 수신 표시 */}
        <View style={styles.paramCard}>
          <Text style={styles.paramTitle}>📨 useLocalSearchParams로 수신한 파라미터</Text>
          <Text style={styles.paramText}>보낸 탭: <Text style={styles.paramValue}>{fromTab}</Text></Text>
          <Text style={styles.paramText}>여행지: <Text style={styles.paramValue}>{destination}, {country}</Text></Text>
          <Text style={styles.paramText}>여행 일수: <Text style={styles.paramValue}>{days}박 {Number(days) + 1}일</Text></Text>
          <Text style={styles.paramText}>계절: <Text style={styles.paramValue}>{season}</Text></Text>
        </View>

        {/* 여행지 헤더 */}
        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>🏝️</Text>
          <Text style={styles.heroTitle}>{destination}</Text>
          <Text style={styles.heroSub}>{country}  •  {days}박 {Number(days) + 1}일  •  {season} 추천</Text>
        </View>

        {/* 주요 관광지 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🗺️ 주요 관광지</Text>
          {landmarks.map((item, i) => (
            <View key={i} style={styles.listRow}>
              <Text style={styles.listEmoji}>{item.emoji}</Text>
              <View>
                <Text style={styles.listName}>{item.name}</Text>
                <Text style={styles.listDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 추천 음식 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🍽️ 현지 음식</Text>
          {foods.map((item, i) => (
            <View key={i} style={styles.listRow}>
              <Text style={styles.listEmoji}>{item.emoji}</Text>
              <View>
                <Text style={styles.listName}>{item.name}</Text>
                <Text style={styles.listDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 여행 팁 */}
        <View style={styles.tipCard}>
          <Text style={styles.sectionTitle}>💡 여행 팁</Text>
          {tips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Text style={styles.tipDot}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>← 뒤로 가기 (router.back())</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const PURPLE = '#9B59B6';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F0FF' },
  container: { padding: 16, gap: 14 },

  paramCard: {
    backgroundColor: '#EEE0FF',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: PURPLE,
  },
  paramTitle: { fontSize: 13, fontWeight: 'bold', color: PURPLE, marginBottom: 8 },
  paramText: { fontSize: 13, color: '#555', marginBottom: 4 },
  paramValue: { fontWeight: 'bold', color: '#222' },

  heroCard: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
  },
  heroEmoji: { fontSize: 60, marginBottom: 8 },
  heroTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
  heroSub: { fontSize: 13, color: '#E0C8FF' },

  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3EEff',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    gap: 12,
  },
  listEmoji: { fontSize: 26, width: 34 },
  listName: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 2 },
  listDesc: { fontSize: 12, color: '#888' },

  tipCard: {
    backgroundColor: '#FFF8E6',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFE9A0',
  },
  tipRow: { flexDirection: 'row', marginBottom: 8, gap: 6 },
  tipDot: { fontSize: 14, color: '#F39C12', fontWeight: 'bold' },
  tipText: { flex: 1, fontSize: 13, color: '#555', lineHeight: 20 },

  backButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  backButtonText: { color: '#666', fontSize: 14 },
});
