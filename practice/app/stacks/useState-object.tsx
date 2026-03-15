import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

/**
 * useState 예시 3: 객체 State
 *
 * 객체 state도 배열과 마찬가지로 직접 수정 금지!
 * 스프레드 연산자로 새 객체를 만들어 전달합니다.
 *
 * 핵심 패턴: { ...prev, 수정할필드: 새값 }
 */
export default function UseStateObjectScreen() {
  /**
   * 프로필 객체 state
   * 여러 필드를 하나의 state 객체로 관리
   */
  const [profile, setProfile] = useState({
    name: '홍길동',
    email: 'hong@example.com',
    age: 20,
  });

  /**
   * 특정 필드만 업데이트하는 함수
   *
   * { ...prev }로 기존 필드를 복사한 뒤
   * [field]: value 로 해당 필드만 덮어씁니다.
   *
   * ❌ profile.name = '새이름'  → 직접 수정 (리렌더링 안 됨!)
   * ✅ setProfile({ ...profile, name: '새이름' })  → 새 객체 생성
   */
  const updateField = (field: string, value: string | number) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  /**
   * 리셋: 완전히 새 객체로 교체
   */
  const handleReset = () => {
    setProfile({ name: '', email: '', age: 0 });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>프로필 편집 (객체 State)</Text>

        {/* 이름 필드 */}
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(text) => updateField('name', text)}
          placeholder="이름"
        />

        {/* 이메일 필드 */}
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          value={profile.email}
          onChangeText={(text) => updateField('email', text)}
          placeholder="이메일"
          keyboardType="email-address"
        />

        {/* 나이 필드 */}
        <Text style={styles.label}>나이</Text>
        <View style={styles.row}>
          <Button title="-" onPress={() => updateField('age', Math.max(0, profile.age - 1))} />
          <Text style={styles.ageText}>{profile.age}</Text>
          <Button title="+" onPress={() => updateField('age', profile.age + 1)} />
        </View>

        <Button title="전체 초기화" onPress={handleReset} color="#E74C3C" />
      </View>

      {/* 현재 state 미리보기 */}
      <View style={styles.section}>
        <Text style={styles.title}>현재 State 값</Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'{\n'}
            {`  name: "${profile.name}",\n`}
            {`  email: "${profile.email}",\n`}
            {`  age: ${profile.age}\n`}
            {'}'}
          </Text>
        </View>
      </View>

      {/* 패턴 설명 */}
      <View style={styles.section}>
        <Text style={styles.title}>객체 불변성 패턴</Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'// ❌ 직접 수정\n'}
            {'profile.name = "새이름";\n'}
            {'setProfile(profile); // 같은 참조 → 변화 감지 못 함\n\n'}
            {'// ✅ 스프레드로 새 객체 생성\n'}
            {'setProfile(prev => ({\n'}
            {'  ...prev,           // 기존 필드 복사\n'}
            {'  name: "새이름"     // 이 필드만 덮어쓰기\n'}
            {'}));'}
          </Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12, paddingBottom: 32 },
  section: { backgroundColor: '#fff', borderRadius: 10, padding: 16, gap: 10 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  label: { fontSize: 13, color: '#666', marginTop: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 },
  ageText: { fontSize: 24, fontWeight: 'bold', color: '#3498DB', minWidth: 40, textAlign: 'center' },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
