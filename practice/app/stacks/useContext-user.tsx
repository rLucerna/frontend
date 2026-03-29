import React, { createContext, useContext, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';

/**
 * useContext 예시 2: 사용자 정보 공유
 *
 * 로그인 상태와 사용자 정보를 Context로 관리합니다.
 * 여러 단계 깊이의 자식 컴포넌트에서 props 없이 사용자 정보에 접근합니다.
 *
 * Props Drilling 없이:
 * Page → Section → Card → UserName (모두 직접 접근)
 */

// ─── Context 생성 ───
type UserContextType = {
  user: { name: string; role: string } | null;
  login: (name: string) => void;
  logout: () => void;
  changeRole: (role: string) => void;
};

const UserContext = createContext<UserContextType | null>(null);

function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('UserProvider 필요');
  return ctx;
}

// ─── 깊이 3: 가장 깊은 컴포넌트 ───
function UserGreeting() {
  const { user } = useUser();
  return (
    <View style={styles.deepBox}>
      <Text style={styles.deepLabel}>UserGreeting (깊이 3)</Text>
      <Text style={styles.deepText}>
        {user ? `안녕하세요, ${user.name} (${user.role})님!` : '로그인이 필요합니다'}
      </Text>
      <Text style={styles.hint}>
        이 컴포넌트는 3단계 깊이지만{'\n'}
        useContext로 직접 user에 접근합니다.{'\n'}
        중간 컴포넌트(Section, Card)는 user를 모릅니다.
      </Text>
    </View>
  );
}

// ─── 깊이 2 ───
function InfoCard() {
  // 이 컴포넌트는 user를 사용하지 않음 → 전달만 안 하면 됨
  return (
    <View style={styles.cardBox}>
      <Text style={styles.cardLabel}>InfoCard (깊이 2) — user props 없음</Text>
      <UserGreeting />
    </View>
  );
}

// ─── 깊이 1 ───
function MainSection() {
  return (
    <View style={styles.sectionBox}>
      <Text style={styles.sectionLabel}>MainSection (깊이 1) — user props 없음</Text>
      <InfoCard />
    </View>
  );
}

// ─── 로그인/로그아웃 컨트롤 ───
function AuthControl() {
  const { user, login, logout, changeRole } = useUser();
  const [nameInput, setNameInput] = useState('');

  if (user) {
    return (
      <View style={styles.controlBox}>
        <Text style={styles.controlLabel}>로그인됨: {user.name}</Text>
        <View style={styles.row}>
          <Button
            title={user.role === '학생' ? '관리자로' : '학생으로'}
            onPress={() => changeRole(user.role === '학생' ? '관리자' : '학생')}
          />
          <Button title="로그아웃" onPress={logout} color="#E74C3C" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.controlBox}>
      <TextInput
        style={styles.input}
        value={nameInput}
        onChangeText={setNameInput}
        placeholder="이름을 입력하세요"
      />
      <Button
        title="로그인"
        onPress={() => { if (nameInput.trim()) login(nameInput.trim()); }}
        color="#1ABC9C"
      />
    </View>
  );
}

// ─── Provider ───
export default function UseContextUserScreen() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  const value: UserContextType = {
    user,
    login: (name) => setUser({ name, role: '학생' }),
    logout: () => setUser(null),
    changeRole: (role) => setUser(prev => prev ? { ...prev, role } : null),
  };

  return (
    <UserContext.Provider value={value}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.section}>
          <Text style={styles.title}>사용자 정보 공유</Text>
          <Text style={styles.desc}>
            로그인하면 3단계 깊이의 컴포넌트까지{'\n'}
            props 전달 없이 사용자 정보가 공유됩니다.
          </Text>
          <AuthControl />
        </View>

        {/* 3단계 중첩 구조 */}
        <MainSection />

        <View style={styles.section}>
          <View style={styles.codeBox}>
            <Text style={styles.code}>
              {'[Props Drilling 없는 구조]\n'}
              {'Provider (user state)\n'}
              {' └─ MainSection  ← user props 없음\n'}
              {'     └─ InfoCard  ← user props 없음\n'}
              {'         └─ UserGreeting ← useContext 직접 접근!'}
            </Text>
          </View>
        </View>

      </ScrollView>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12, paddingBottom: 32 },
  section: { backgroundColor: '#fff', borderRadius: 10, padding: 16, gap: 8 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  desc: { fontSize: 13, color: '#666', lineHeight: 20 },
  controlBox: { backgroundColor: '#F0FAF8', borderRadius: 8, padding: 12, gap: 8 },
  controlLabel: { fontSize: 14, fontWeight: 'bold', color: '#1ABC9C' },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 10, fontSize: 14 },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  sectionBox: {
    backgroundColor: '#E8F8F5',
    borderRadius: 10,
    padding: 12,
    gap: 8,
  },
  sectionLabel: { fontSize: 12, color: '#1ABC9C', fontWeight: 'bold' },
  cardBox: {
    backgroundColor: '#D1F2EB',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  cardLabel: { fontSize: 12, color: '#16A085', fontWeight: 'bold' },
  deepBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    gap: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#1ABC9C',
  },
  deepLabel: { fontSize: 12, color: '#0E6655', fontWeight: 'bold' },
  deepText: { fontSize: 15, fontWeight: 'bold', color: '#2C3E50' },
  hint: { fontSize: 11, color: '#999', lineHeight: 16 },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
