import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * 실습 탭 (숨김 처리됨)
 * _layout.tsx에서 href: null로 탭 바에서 숨김
 */
export default function PracticeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>실습 화면 (준비 중)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 16, color: '#999' },
});
