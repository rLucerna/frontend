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
 * 용준2 스택 화면: 레시피 재료 & 조리법
 */
export default function Yongjun2DetailScreen() {
  /**
   * useRouter: expo-router 네비게이션 훅
   * router.back()으로 용준2 탭으로 복귀합니다.
   */
  const router = useRouter();

  /**
   * useLocalSearchParams: 용준2 탭에서 전달한 레시피 파라미터 수신
   * - recipeName: 레시피 이름
   * - servings: 분량 (인원 수, 문자열로 전달됨)
   * - cookTime: 조리 시간
   * - fromTab: 어느 탭에서 왔는지
   */
  const { recipeName, servings, cookTime, fromTab } = useLocalSearchParams<{
    recipeName: string;
    servings: string;
    cookTime: string;
    fromTab: string;
  }>();

  /**
   * 뒤로 가기 핸들러
   * router.back(): 스택에서 현재 화면을 제거하고 이전 화면(용준2 탭)으로 복귀
   */
  const handleGoBack = () => {
    router.back();
  };

  const ingredients = [
    { name: '김치', amount: '200g', emoji: '🥬' },
    { name: '돼지고기', amount: '150g', emoji: '🥩' },
    { name: '두부', amount: '반모', emoji: '🟧' },
    { name: '대파', amount: '1대', emoji: '🌿' },
    { name: '고춧가루', amount: '2큰술', emoji: '🌶️' },
    { name: '된장', amount: '1큰술', emoji: '🫙' },
    { name: '마늘', amount: '3쪽', emoji: '🧄' },
    { name: '물', amount: '300ml', emoji: '💧' },
  ];

  const steps = [
    '돼지고기를 한 입 크기로 썰어 냄비에 볶습니다',
    '김치를 넣고 함께 1~2분 볶습니다',
    '물을 붓고 센 불로 끓입니다',
    '끓기 시작하면 두부를 넣고 중불로 줄입니다',
    '고춧가루, 된장으로 간을 맞춥니다',
    '대파를 넣고 5분 더 끓입니다',
    '마늘을 마지막에 넣고 2분 후 완성입니다',
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 파라미터 수신 표시 */}
        <View style={styles.paramCard}>
          <Text style={styles.paramTitle}>📨 useLocalSearchParams로 수신한 파라미터</Text>
          <Text style={styles.paramText}>보낸 탭: <Text style={styles.paramValue}>{fromTab}</Text></Text>
          <Text style={styles.paramText}>레시피: <Text style={styles.paramValue}>{recipeName}</Text></Text>
          <Text style={styles.paramText}>분량: <Text style={styles.paramValue}>{servings}인분</Text></Text>
          <Text style={styles.paramText}>조리시간: <Text style={styles.paramValue}>{cookTime}</Text></Text>
        </View>

        {/* 레시피 헤더 */}
        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>🍲</Text>
          <Text style={styles.heroTitle}>{recipeName}</Text>
          <Text style={styles.heroMeta}>👤 {servings}인분  •  ⏱ {cookTime}  •  ⭐ 4.9</Text>
        </View>

        {/* 재료 목록 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🥕 재료</Text>
          {ingredients.map((item, i) => (
            <View key={i} style={styles.ingredientRow}>
              <Text style={styles.ingredientEmoji}>{item.emoji}</Text>
              <Text style={styles.ingredientName}>{item.name}</Text>
              <Text style={styles.ingredientAmount}>{item.amount}</Text>
            </View>
          ))}
        </View>

        {/* 조리법 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>👨‍🍳 조리법</Text>
          {steps.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepNum}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
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

const BLUE2 = '#3A7BD5';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EEF4FF' },
  container: { padding: 16, gap: 14 },

  paramCard: {
    backgroundColor: '#E8F0FF',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: BLUE2,
  },
  paramTitle: { fontSize: 13, fontWeight: 'bold', color: BLUE2, marginBottom: 8 },
  paramText: { fontSize: 13, color: '#555', marginBottom: 4 },
  paramValue: { fontWeight: 'bold', color: '#222' },

  heroCard: {
    backgroundColor: BLUE2,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },
  heroEmoji: { fontSize: 60, marginBottom: 8 },
  heroTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
  heroMeta: { fontSize: 13, color: '#C5D8FF' },

  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF4FF',
  },

  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  ingredientEmoji: { fontSize: 22, width: 32 },
  ingredientName: { flex: 1, fontSize: 14, color: '#333' },
  ingredientAmount: { fontSize: 14, color: BLUE2, fontWeight: '600' },

  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, gap: 10 },
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

  backButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  backButtonText: { color: '#666', fontSize: 14 },
});
