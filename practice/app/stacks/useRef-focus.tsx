import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

/**
 * useRef 예시 2: 입력란 포커스 이동
 *
 * useRef로 TextInput 컴포넌트에 직접 접근하여
 * 포커스를 프로그래밍적으로 제어합니다.
 *
 * 실무 활용: 회원가입 폼에서 Enter 누르면 다음 입력란으로 자동 이동
 */
export default function UseRefFocusScreen() {
  /**
   * 각 TextInput에 대한 ref를 생성합니다.
   * ref를 TextInput의 ref prop에 연결하면
   * ref.current를 통해 해당 TextInput의 메서드(focus 등)에 접근할 수 있습니다.
   */
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const memoRef = useRef<TextInput>(null);

  /**
   * 화면이 나타나면 첫 번째 입력란에 자동 포커스
   */
  useEffect(() => {
    // ref.current?.focus(): ref가 연결된 TextInput에 포커스
    nameRef.current?.focus();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>자동 포커스 이동 폼</Text>
        <Text style={styles.desc}>
          각 입력란에서 키보드의 "다음" 버튼을 누르면{'\n'}
          ref.current.focus()로 다음 입력란으로 이동합니다.
        </Text>

        {/* 이름: 자동 포커스 + Enter 시 이메일로 이동 */}
        <Text style={styles.label}>이름</Text>
        <TextInput
          ref={nameRef}
          style={styles.input}
          placeholder="이름 입력 (자동 포커스)"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
        />

        {/* 이메일: Enter 시 전화번호로 이동 */}
        <Text style={styles.label}>이메일</Text>
        <TextInput
          ref={emailRef}
          style={styles.input}
          placeholder="이메일 입력"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => phoneRef.current?.focus()}
        />

        {/* 전화번호: Enter 시 메모로 이동 */}
        <Text style={styles.label}>전화번호</Text>
        <TextInput
          ref={phoneRef}
          style={styles.input}
          placeholder="전화번호 입력"
          keyboardType="phone-pad"
          returnKeyType="next"
          onSubmitEditing={() => memoRef.current?.focus()}
        />

        {/* 메모: 마지막 입력란 */}
        <Text style={styles.label}>메모</Text>
        <TextInput
          ref={memoRef}
          style={[styles.input, { height: 80 }]}
          placeholder="메모 입력 (마지막)"
          multiline
          returnKeyType="done"
          textAlignVertical="top"
        />
      </View>

      {/* 수동 포커스 이동 버튼 */}
      <View style={styles.section}>
        <Text style={styles.title}>수동 포커스 이동</Text>
        <View style={styles.row}>
          <Button title="이름" onPress={() => nameRef.current?.focus()} />
          <Button title="이메일" onPress={() => emailRef.current?.focus()} />
          <Button title="전화" onPress={() => phoneRef.current?.focus()} />
          <Button title="메모" onPress={() => memoRef.current?.focus()} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>핵심 코드</Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'const emailRef = useRef<TextInput>(null);\n\n'}
            {'// ref 연결\n'}
            {'<TextInput ref={emailRef} />\n\n'}
            {'// 포커스 이동\n'}
            {'emailRef.current?.focus();'}
          </Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12, paddingBottom: 32 },
  section: { backgroundColor: '#fff', borderRadius: 10, padding: 16, gap: 8 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  desc: { fontSize: 13, color: '#666', lineHeight: 20 },
  label: { fontSize: 13, color: '#888', marginTop: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
