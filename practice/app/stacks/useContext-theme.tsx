import React, { createContext, useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

/**
 * useContext 예시 1: 테마 전환
 *
 * Context를 사용하여 다크/라이트 테마를 전역적으로 공유합니다.
 * Provider 하위의 모든 컴포넌트가 props 없이 테마에 접근할 수 있습니다.
 *
 * 구조:
 * ThemeProvider (theme state + Context)
 *   └─ Header (useContext로 직접 접근)
 *   └─ Content (useContext로 직접 접근)
 *   └─ Footer (useContext로 직접 접근)
 */

// ─── 1단계: Context 생성 ───
type ThemeType = {
  isDark: boolean;
  toggle: () => void;
  colors: {
    bg: string;
    text: string;
    card: string;
    accent: string;
  };
};

const ThemeContext = createContext<ThemeType | null>(null);

// ─── 헬퍼 Hook: Context를 안전하게 사용 ───
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('ThemeProvider 안에서만 사용 가능');
  return ctx;
}

// ─── 자식 컴포넌트들 (props 전달 없이 테마 접근) ───
function Header() {
  const { colors } = useTheme();
  return (
    <View style={[styles.box, { backgroundColor: colors.card }]}>
      <Text style={[styles.boxTitle, { color: colors.text }]}>Header</Text>
      <Text style={{ color: colors.text, fontSize: 12 }}>
        useContext(ThemeContext)로 테마 접근
      </Text>
    </View>
  );
}

function Content() {
  const { isDark, colors } = useTheme();
  return (
    <View style={[styles.box, { backgroundColor: colors.card }]}>
      <Text style={[styles.boxTitle, { color: colors.text }]}>Content</Text>
      <Text style={{ color: colors.text, fontSize: 13 }}>
        현재 테마: {isDark ? '다크' : '라이트'}{'\n'}
        이 컴포넌트는 부모로부터 props를 받지 않습니다.{'\n'}
        Context를 통해 직접 테마에 접근합니다.
      </Text>
    </View>
  );
}

function Footer() {
  const { toggle, colors } = useTheme();
  return (
    <View style={[styles.box, { backgroundColor: colors.card }]}>
      <Text style={[styles.boxTitle, { color: colors.text }]}>Footer</Text>
      <Button title="테마 전환" onPress={toggle} color={colors.accent} />
    </View>
  );
}

// ─── 2단계: Provider로 감싸기 ───
export default function UseContextThemeScreen() {
  const [isDark, setIsDark] = useState(false);

  // Context에 제공할 값
  const themeValue: ThemeType = {
    isDark,
    toggle: () => setIsDark(prev => !prev),
    colors: isDark
      ? { bg: '#1a1a2e', text: '#ECF0F1', card: '#16213e', accent: '#e94560' }
      : { bg: '#F5F7FA', text: '#2C3E50', card: '#fff', accent: '#1ABC9C' },
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: themeValue.colors.bg },
        ]}
      >
        <Text style={[styles.title, { color: themeValue.colors.text }]}>
          테마 전환 (useContext)
        </Text>
        <Text style={[styles.desc, { color: themeValue.colors.text }]}>
          Header, Content, Footer 모두{'\n'}
          props 전달 없이 Context로 테마에 접근합니다.
        </Text>

        {/* 자식들은 테마 관련 props를 받지 않음! */}
        <Header />
        <Content />
        <Footer />

        <View style={[styles.box, { backgroundColor: themeValue.colors.card }]}>
          <Text style={[styles.boxTitle, { color: themeValue.colors.text }]}>
            코드 구조
          </Text>
          <View style={styles.codeBox}>
            <Text style={styles.code}>
              {'<ThemeContext.Provider value={theme}>\n'}
              {'  <Header />   ← props 없음!\n'}
              {'  <Content />  ← props 없음!\n'}
              {'  <Footer />   ← props 없음!\n'}
              {'</ThemeContext.Provider>\n\n'}
              {'// 각 자식 내부에서:\n'}
              {'const { colors } = useContext(ThemeContext);'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12, paddingBottom: 32 },
  title: { fontSize: 18, fontWeight: 'bold' },
  desc: { fontSize: 13, lineHeight: 20 },
  box: { borderRadius: 10, padding: 14, gap: 8 },
  boxTitle: { fontSize: 15, fontWeight: 'bold' },
  codeBox: { backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
