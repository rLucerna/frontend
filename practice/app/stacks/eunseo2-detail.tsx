import React, { useState } from 'react';
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
 * 은서2 스택 화면: 책 상세 & 리뷰
 */
export default function Eunseo2DetailScreen() {
  /**
   * useRouter: router.back()으로 은서2 탭으로 복귀
   */
  const router = useRouter();
  const [myRating, setMyRating] = useState(0);

  /**
   * useLocalSearchParams: 은서2 탭에서 전달한 책 파라미터 수신
   * - bookTitle: 책 제목
   * - author: 저자명
   * - genre: 장르
   * - rating: 평점 (숫자지만 문자열로 전달됨)
   * - fromTab: 보낸 탭 이름
   */
  const { bookTitle, author, genre, rating, fromTab } = useLocalSearchParams<{
    bookTitle: string;
    author: string;
    genre: string;
    rating: string;
    fromTab: string;
  }>();

  /**
   * 뒤로 가기 핸들러
   * router.back(): 스택에서 현재 화면 제거 후 은서2 탭으로 복귀
   */
  const handleGoBack = () => {
    router.back();
  };

  /**
   * 별점 선택 핸들러
   * 사용자가 선택한 별의 index+1을 평점으로 저장합니다.
   */
  const handleSelectRating = (star: number) => {
    setMyRating(star);
  };

  const reviews = [
    {
      user: '독서왕김씨',
      rating: 5,
      text: '어른이 되어서 읽으니 더 깊이 느껴지는 책입니다. 어린왕자의 순수함이 인상적이에요.',
      date: '2024.12.10',
    },
    {
      user: '책벌레박씨',
      rating: 5,
      text: '짧지만 강렬한 메시지. 매년 한 번씩 꼭 읽는 책입니다.',
      date: '2024.11.25',
    },
    {
      user: '이학생',
      rating: 4,
      text: '학교 과제로 읽었는데 생각보다 좋았어요. 사막 여우와의 대화가 가장 인상적이었습니다.',
      date: '2024.11.08',
    },
  ];

  const synopsis = `어린 왕자는 자신의 별 B612에서 아름다운 장미 한 송이와 함께 살고 있었습니다. 하지만 장미의 까다로운 요구에 지쳐 여러 별을 여행하게 됩니다. 어른들의 이상한 세계를 목격한 후, 지구에 도착해 사막에서 조종사를 만납니다. 여우와의 만남을 통해 '길들임'의 의미와 진정한 관계에 대해 배우게 됩니다.`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 파라미터 수신 표시 */}
        <View style={styles.paramCard}>
          <Text style={styles.paramTitle}>📨 useLocalSearchParams로 수신한 파라미터</Text>
          <Text style={styles.paramText}>보낸 탭: <Text style={styles.paramValue}>{fromTab}</Text></Text>
          <Text style={styles.paramText}>책 제목: <Text style={styles.paramValue}>{bookTitle}</Text></Text>
          <Text style={styles.paramText}>저자: <Text style={styles.paramValue}>{author}</Text></Text>
          <Text style={styles.paramText}>평점: <Text style={styles.paramValue}>{rating} (string → {'⭐'.repeat(Number(rating))})</Text></Text>
        </View>

        {/* 책 헤더 */}
        <View style={styles.heroCard}>
          <View style={styles.bookCover}>
            <Text style={styles.bookCoverEmoji}>📗</Text>
          </View>
          <Text style={styles.heroTitle}>{bookTitle}</Text>
          <Text style={styles.heroAuthor}>{author}</Text>
          <Text style={styles.heroMeta}>{genre}  •  평점 {'⭐'.repeat(Number(rating))}</Text>
        </View>

        {/* 줄거리 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📖 줄거리</Text>
          <Text style={styles.synopsisText}>{synopsis}</Text>
        </View>

        {/* 내 별점 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>⭐ 내 별점 남기기</Text>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleSelectRating(star)}>
                <Text style={[styles.star, myRating >= star && styles.starActive]}>
                  {myRating >= star ? '⭐' : '☆'}
                </Text>
              </TouchableOpacity>
            ))}
            {myRating > 0 && (
              <Text style={styles.ratingLabel}>{myRating}점</Text>
            )}
          </View>
        </View>

        {/* 독자 리뷰 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>💬 독자 리뷰</Text>
          {reviews.map((review, i) => (
            <View key={i} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewUser}>{review.user}</Text>
                <Text style={styles.reviewRating}>{'⭐'.repeat(review.rating)}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
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

const ORANGE2 = '#D35400';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF6EC' },
  container: { padding: 16, gap: 14 },

  paramCard: {
    backgroundColor: '#FFE8CC',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: ORANGE2,
  },
  paramTitle: { fontSize: 13, fontWeight: 'bold', color: ORANGE2, marginBottom: 8 },
  paramText: { fontSize: 13, color: '#555', marginBottom: 4 },
  paramValue: { fontWeight: 'bold', color: '#222' },

  heroCard: {
    backgroundColor: ORANGE2,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
  },
  bookCover: {
    width: 80,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookCoverEmoji: { fontSize: 44 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  heroAuthor: { fontSize: 14, color: '#FFD4A8', marginBottom: 6 },
  heroMeta: { fontSize: 13, color: '#FFCFA0' },

  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF6EC',
  },
  synopsisText: { fontSize: 14, color: '#444', lineHeight: 24 },

  starRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  star: { fontSize: 32, color: '#DDD' },
  starActive: { color: '#F1C40F' },
  ratingLabel: { fontSize: 16, color: '#F39C12', fontWeight: 'bold', marginLeft: 8 },

  reviewCard: {
    backgroundColor: '#FFF8F0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  reviewUser: { fontSize: 13, fontWeight: 'bold', color: '#333', flex: 1 },
  reviewRating: { fontSize: 12 },
  reviewDate: { fontSize: 11, color: '#AAA' },
  reviewText: { fontSize: 13, color: '#555', lineHeight: 20 },

  backButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  backButtonText: { color: '#666', fontSize: 14 },
});
