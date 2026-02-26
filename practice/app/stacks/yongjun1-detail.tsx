import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

/**
 * 용준1 스택 화면: 프로필 상세 편집
 *
 * Stack 화면의 특징:
 * - 이전 화면(용준1 탭) 위에 쌓여서 표시됩니다.
 * - 헤더에 자동으로 '뒤로' 버튼이 생성됩니다.
 * - router.back()으로 이전 화면으로 돌아갈 수 있습니다.
 */
export default function Yongjun1DetailScreen() {
  /**
   * useRouter: expo-router 네비게이션 훅
   * 이 화면에서는 router.back()으로 이전 화면(용준1 탭)으로 돌아갑니다.
   */
  const router = useRouter();

  /**
   * useLocalSearchParams: 이전 화면에서 전달한 params를 수신하는 훅
   *
   * 이전 화면(용준1.tsx)에서 보낸 파라미터:
   * router.push({ pathname: '/stacks/yongjun1-detail', params: { userName, userEmail, ... } })
   *
   * useLocalSearchParams vs useGlobalSearchParams:
   * - useLocalSearchParams: 현재 화면의 라우트에 직접 전달된 파라미터만 접근
   * - useGlobalSearchParams: 중첩된 네비게이터에서도 상위 파라미터에 접근 가능
   * → 일반적으로는 useLocalSearchParams를 사용합니다.
   *
   * 주의: 모든 파라미터 값은 문자열(string)로 전달됩니다.
   *       숫자나 boolean은 문자열로 변환 후 전달되므로 수신 시 형변환이 필요합니다.
   */
  const { userName, userEmail, userJob, fromTab } = useLocalSearchParams<{
    userName: string;
    userEmail: string;
    userJob: string;
    fromTab: string;
  }>();

  /**
   * 뒤로 가기 버튼 핸들러
   *
   * router.back(): 스택에서 현재 화면을 제거하고 이전 화면으로 복귀합니다.
   * - 헤더의 기본 뒤로가기 버튼과 동일한 동작
   * - 안드로이드 하드웨어 뒤로가기 버튼과 동일한 동작
   * - 이전 화면이 없으면(스택의 첫 화면이면) 아무 일도 일어나지 않습니다.
   */
  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 파라미터 수신 표시 카드 */}
        <View style={styles.paramCard}>
          <Text style={styles.paramTitle}>📨 useLocalSearchParams로 수신한 파라미터</Text>
          <Text style={styles.paramText}>보낸 탭: <Text style={styles.paramValue}>{fromTab}</Text></Text>
          <Text style={styles.paramText}>이름: <Text style={styles.paramValue}>{userName}</Text></Text>
          <Text style={styles.paramText}>이메일: <Text style={styles.paramValue}>{userEmail}</Text></Text>
          <Text style={styles.paramText}>직업: <Text style={styles.paramValue}>{userJob}</Text></Text>
        </View>

        {/* 프로필 편집 폼 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✏️ 프로필 편집</Text>

          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.input}
            defaultValue={userName}
            placeholder="이름을 입력하세요"
          />

          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={styles.input}
            defaultValue={userEmail}
            placeholder="이메일을 입력하세요"
            keyboardType="email-address"
          />

          <Text style={styles.label}>직업</Text>
          <TextInput
            style={styles.input}
            defaultValue={userJob}
            placeholder="직업을 입력하세요"
          />

          <Text style={styles.label}>자기소개</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            defaultValue="React Native를 공부하는 개발자입니다 😊"
            placeholder="자기소개를 입력하세요"
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>저장하기</Text>
        </TouchableOpacity>

        {/* router.back() 커스텀 뒤로가기 버튼 */}
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>← 뒤로 가기 (router.back())</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const BLUE = '#4A90E2';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EEF4FF' },
  container: { padding: 16, gap: 14 },

  paramCard: {
    backgroundColor: '#E8F0FF',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: BLUE,
  },
  paramTitle: { fontSize: 13, fontWeight: 'bold', color: BLUE, marginBottom: 8 },
  paramText: { fontSize: 13, color: '#555', marginBottom: 4 },
  paramValue: { fontWeight: 'bold', color: '#222' },

  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16 },
  cardTitle: { fontSize: 17, fontWeight: 'bold', color: '#222', marginBottom: 14 },
  label: { fontSize: 12, color: '#999', marginTop: 12, marginBottom: 4, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },
  textArea: { height: 80 },

  saveButton: {
    backgroundColor: BLUE,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },

  backButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  backButtonText: { color: '#666', fontSize: 14 },
});
