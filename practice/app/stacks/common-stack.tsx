import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

/**
 * 공통 실습 스택 화면
 *
 * 학습 포인트:
 * 1. useLocalSearchParams — 이전 화면(params)에서 전달한 값 수신
 * 2. router.back()       — 이전 화면으로 복귀 (스택 pop)
 */
export default function CommonStackScreen() {
  /**
   * useRouter: 네비게이션 제어 훅
   */
  const router = useRouter();

  /**
   * useLocalSearchParams: 이전 화면에서 router.push()의 params로 전달한 값을 수신
   *
   * 보낸 쪽 (common.tsx):
   *   router.push({
   *     pathname: '/stacks/common-stack',
   *     params: { title: '...', from: '공통 실습 탭' },
   *   });
   *
   * ⚠ 모든 파라미터는 string으로 변환되어 전달됩니다.
   *   숫자나 boolean이 필요하면 Number() / boolean 변환이 필요합니다.
   */
  const { title, from } = useLocalSearchParams<{
    title: string;
    from: string;
  }>();

  /**
   * router.back(): 스택에서 이 화면을 제거하고 이전 화면으로 돌아갑니다.
   * 헤더의 기본 뒤로가기 버튼과 동일한 동작입니다.
   */
  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* 파라미터 수신 결과 */}
        <Text style={styles.sectionTitle}>[ useLocalSearchParams 수신 결과 ]</Text>

        <Text style={styles.label}>params.title</Text>
        <Text style={styles.value}>{title}</Text>

        <Text style={styles.label}>params.from</Text>
        <Text style={styles.value}>{from}</Text>

        <Text style={styles.hint}>
          이 값들은 공통 실습 탭에서{'\n'}
          router.push()의 params 객체로 전달되었습니다.{'\n\n'}
          useLocalSearchParams() 훅으로 수신했습니다.
        </Text>

        <View style={styles.divider} />

        {/* router.back() 설명 */}
        <Text style={styles.sectionTitle}>[ router.back() ]</Text>
        <Text style={styles.hint}>
          아래 버튼은 router.back()을 호출합니다.{'\n'}
          스택에서 이 화면이 제거되고 이전 화면으로 돌아갑니다.{'\n'}
          헤더의 &apos;뒤로&apos; 버튼과 동일한 동작입니다.
        </Text>

        <Button title="← 뒤로 가기 (router.back())" onPress={handleGoBack} />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  hint: {
    fontSize: 12,
    color: '#777',
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#EBEBEB',
    marginVertical: 8,
  },
});
