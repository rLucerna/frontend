import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

/**
 * 공통 실습 파일 기반 모달
 *
 * 이 파일 자체가 하나의 독립적인 라우트입니다.
 * URL 경로: /modals/common-modal
 *
 * 등장 방식:
 * - _layout.tsx에서 presentation: 'modal' 로 등록
 * - 아래에서 위로 슬라이드되어 나타납니다 (iOS 기본 modal 동작)
 *
 * 인라인 Modal(<Modal> 컴포넌트)과의 차이:
 * - 인라인: 같은 파일 안에서 state로 제어, URL 없음
 * - 파일 기반: 별도 파일, 독립 URL(/modals/common-modal), 딥링크 가능
 */
export default function CommonModalScreen() {
  /**
   * useRouter: 이 모달을 닫을 때 router.back()을 사용합니다.
   * presentation: 'modal' 방식에서 닫기 = router.back() 입니다.
   */
  const router = useRouter();

  /**
   * 모달 닫기 핸들러
   * router.back(): 현재 모달 라우트를 스택에서 제거 → 이전 화면으로 복귀
   */
  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <Text style={styles.sectionTitle}>[ 파일 기반 Router Modal ]</Text>

        <Text style={styles.body}>현재 라우트 경로:</Text>
        <Text style={styles.path}>/modals/common-modal</Text>

        <Text style={styles.body}>파일 위치:</Text>
        <Text style={styles.path}>app/modals/common-modal.tsx</Text>

        <Text style={styles.hint}>
          이 화면은 별도 파일로 존재하는 독립적인 라우트입니다.{'\n\n'}
          _layout.tsx 등록:{'\n'}
          {'<Stack.Screen\n'}
          {'  name="modals/common-modal"\n'}
          {"  options={{ presentation: 'modal' }}\n"}
          {'/>'}
          {'\n\n'}
          열기: router.push(&apos;/modals/common-modal&apos;){'\n'}
          닫기: router.back()
        </Text>

        <View style={styles.divider} />

        <Button title="닫기 (router.back())" onPress={handleClose} />

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
    gap: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  body: {
    fontSize: 13,
    color: '#555',
  },
  path: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#2C3E50',
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 6,
    fontWeight: 'bold',
  },
  hint: {
    fontSize: 12,
    color: '#777',
    lineHeight: 19,
    fontFamily: 'monospace',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#EBEBEB',
    marginVertical: 4,
  },
});
