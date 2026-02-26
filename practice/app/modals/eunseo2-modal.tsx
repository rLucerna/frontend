import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';

/**
 * 은서2 Router 풀스크린 모달 화면: 독서 기록 작성
 *
 * 이 파일은 expo-router의 presentation: 'fullScreenModal' 모달입니다.
 * app/_layout.tsx에서 등록:
 * <Stack.Screen name="modals/eunseo2-modal" options={{ presentation: 'fullScreenModal' }} />
 *
 * 서영2 모달(presentation: 'modal')과의 차이:
 * - 'modal':           아래에서 슬라이드, iOS에서 이전 화면이 살짝 뒤에 보임
 * - 'fullScreenModal': 완전히 전체 화면을 덮음, 이전 화면이 보이지 않음
 */
export default function Eunseo2ModalScreen() {
  /**
   * useRouter: 풀스크린 모달을 닫을 때 router.back() 사용
   * 풀스크린 모달도 동일하게 router.back()으로 닫습니다.
   */
  const router = useRouter();

  const [searchText, setSearchText] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [readStatus, setReadStatus] = useState<'reading' | 'done' | 'wish'>('done');

  /**
   * 풀스크린 모달 닫기 핸들러
   *
   * router.back(): 스택에서 현재 풀스크린 모달을 제거하고 이전 화면으로 복귀
   * - 서영2 모달과 동일한 방식 → 모달 종류(modal/fullScreenModal)에 관계없이
   *   router.back()으로 닫을 수 있습니다.
   */
  const handleClose = () => {
    router.back();
  };

  /**
   * 독서 기록 저장 핸들러
   * 저장 후 모달을 닫고 이전 화면으로 돌아갑니다.
   */
  const handleSave = () => {
    if (!selectedBook || selectedRating === 0) return;
    console.log('[은서2] 독서 기록 저장:', { selectedBook, selectedRating, reviewText, readStatus });
    // 저장 완료 후 router.back()으로 모달 닫기
    router.back();
  };

  /**
   * 책 검색 결과 선택 핸들러
   */
  const handleSelectBook = (book: string) => {
    setSelectedBook(book);
    setSearchText(book);
  };

  const bookSuggestions = [
    '어린 왕자 - 생텍쥐페리',
    '1984 - 조지 오웰',
    '데미안 - 헤르만 헤세',
    '노인과 바다 - 헤밍웨이',
    '채식주의자 - 한강',
  ].filter((b) => searchText && b.toLowerCase().includes(searchText.toLowerCase()));

  const statusOptions: Array<{ key: 'reading' | 'done' | 'wish'; label: string; icon: string }> = [
    { key: 'wish', label: '읽고 싶어요', icon: '📌' },
    { key: 'reading', label: '읽는 중', icon: '📖' },
    { key: 'done', label: '다 읽었어요', icon: '✅' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        {/* 풀스크린 모달 설명 카드 */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>ℹ️ expo-router presentation: &apos;fullScreenModal&apos;</Text>
          <Text style={styles.infoText}>
            {'이 화면은 전체화면 Router 모달입니다.\n'}
            {'라우트: /modals/eunseo2-modal\n'}
            {'파일: app/modals/eunseo2-modal.tsx\n\n'}
            {'서영2 Router 모달(modal)과 비교:\n'}
            {'→ 이 화면은 이전 화면을 완전히 덮습니다.'}
          </Text>
        </View>

        {/* 책 검색 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔍 책 검색</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="책 제목이나 저자를 검색하세요"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#AAA"
          />
          {bookSuggestions.length > 0 && (
            <View style={styles.suggestions}>
              {bookSuggestions.map((book, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.suggestionItem}
                  onPress={() => handleSelectBook(book)}
                >
                  <Text style={styles.suggestionIcon}>📚</Text>
                  <Text style={styles.suggestionText}>{book}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {selectedBook !== '' && (
            <View style={styles.selectedBook}>
              <Text style={styles.selectedIcon}>📗</Text>
              <Text style={styles.selectedText}>{selectedBook}</Text>
            </View>
          )}
        </View>

        {/* 독서 상태 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 독서 상태</Text>
          <View style={styles.statusRow}>
            {statusOptions.map((opt) => (
              <TouchableOpacity
                key={opt.key}
                style={[styles.statusBtn, readStatus === opt.key && styles.statusBtnActive]}
                onPress={() => setReadStatus(opt.key)}
              >
                <Text style={styles.statusIcon}>{opt.icon}</Text>
                <Text style={[styles.statusLabel, readStatus === opt.key && styles.statusLabelActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 별점 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ 별점</Text>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setSelectedRating(star)}>
                <Text style={[styles.star, selectedRating >= star && styles.starActive]}>
                  {selectedRating >= star ? '⭐' : '☆'}
                </Text>
              </TouchableOpacity>
            ))}
            {selectedRating > 0 && (
              <Text style={styles.ratingLabel}>{selectedRating}.0 / 5.0</Text>
            )}
          </View>
        </View>

        {/* 리뷰 작성 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✍️ 리뷰 작성</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="이 책에 대한 솔직한 감상을 적어주세요..."
            value={reviewText}
            onChangeText={setReviewText}
            multiline
            textAlignVertical="top"
            placeholderTextColor="#AAA"
          />
          <Text style={styles.charCount}>{reviewText.length} / 500자</Text>
        </View>

        {/* 저장 버튼 */}
        <TouchableOpacity
          style={[styles.saveButton, (!selectedBook || selectedRating === 0) && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!selectedBook || selectedRating === 0}
        >
          <Text style={styles.saveButtonText}>
            {!selectedBook ? '책을 선택하세요' : selectedRating === 0 ? '별점을 선택하세요' : '독서 기록 저장하기'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
          <Text style={styles.cancelButtonText}>취소 (router.back())</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const ORANGE2 = '#D35400';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF6EC' },
  container: { padding: 16, gap: 14 },

  infoCard: { backgroundColor: ORANGE2, borderRadius: 14, padding: 14 },
  infoTitle: { fontSize: 14, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
  infoText: { fontSize: 12, color: '#FFD4A8', lineHeight: 20 },

  section: { backgroundColor: '#fff', borderRadius: 14, padding: 16 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF6EC',
  },

  searchInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },
  suggestions: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 10,
    overflow: 'hidden',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    backgroundColor: '#FAFAFA',
  },
  suggestionIcon: { fontSize: 18 },
  suggestionText: { fontSize: 14, color: '#333' },
  selectedBook: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    backgroundColor: '#FFF6EC',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FFDDB8',
  },
  selectedIcon: { fontSize: 24 },
  selectedText: { fontSize: 14, color: '#333', fontWeight: '600', flex: 1 },

  statusRow: { flexDirection: 'row', gap: 8 },
  statusBtn: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    gap: 4,
  },
  statusBtnActive: { backgroundColor: '#FFF6EC', borderWidth: 1.5, borderColor: ORANGE2 },
  statusIcon: { fontSize: 22 },
  statusLabel: { fontSize: 11, color: '#888', textAlign: 'center' },
  statusLabelActive: { color: ORANGE2, fontWeight: 'bold' },

  starRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  star: { fontSize: 36, color: '#DDD' },
  starActive: { color: '#F1C40F' },
  ratingLabel: { fontSize: 15, color: '#F39C12', fontWeight: 'bold', marginLeft: 6 },

  reviewInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#333',
    height: 120,
    backgroundColor: '#FAFAFA',
  },
  charCount: { fontSize: 12, color: '#BBB', textAlign: 'right', marginTop: 4 },

  saveButton: {
    backgroundColor: ORANGE2,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonDisabled: { backgroundColor: '#CCC' },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },

  cancelButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  cancelButtonText: { color: '#666', fontSize: 14 },
});
