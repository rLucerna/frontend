import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';

/**
 * useState 예시 5: 부모 → 자식 State 전달 (Props)
 *
 * 부모의 state를 자식에게 props로 전달하는 패턴입니다.
 * - 부모가 state를 변경하면 자식도 자동으로 리렌더링됩니다.
 * - 자식은 props를 읽기만 할 수 있고, 직접 수정할 수 없습니다.
 * - 자식이 부모의 state를 변경하려면 setState 함수를 props로 받아야 합니다.
 */

// ─── 자식 컴포넌트 1: 표시만 하는 자식 ───
// 부모의 state를 props로 받아 읽기만 함
type DisplayProps = {
  userName: string;
  score: number;
};

function ScoreDisplay({ userName, score }: DisplayProps) {
  return (
    <View style={styles.childBox}>
      <Text style={styles.childLabel}>ScoreDisplay (자식 1 - 읽기 전용)</Text>
      <Text style={styles.childValue}>{userName}의 점수: {score}점</Text>
      <Text style={styles.childHint}>
        이 컴포넌트는 props를 표시만 합니다.{'\n'}
        부모의 state가 변경되면 자동으로 업데이트됩니다.
      </Text>
    </View>
  );
}

// ─── 자식 컴포넌트 2: 부모의 state를 변경하는 자식 ───
// 부모의 setState 함수를 props로 받아 호출
type ControlProps = {
  onScoreChange: (delta: number) => void;
  onNameChange: (name: string) => void;
};

function ScoreControl({ onScoreChange, onNameChange }: ControlProps) {
  return (
    <View style={styles.childBox}>
      <Text style={styles.childLabel}>ScoreControl (자식 2 - 조작)</Text>

      <TextInput
        style={styles.input}
        placeholder="이름 변경"
        onChangeText={onNameChange}
      />

      <View style={styles.row}>
        {/* 부모의 setState를 호출하여 부모의 state 변경 */}
        <Button title="-10" onPress={() => onScoreChange(-10)} />
        <Button title="+10" onPress={() => onScoreChange(10)} />
      </View>

      <Text style={styles.childHint}>
        이 컴포넌트는 부모의 setState 함수를 props로 받아{'\n'}
        호출합니다. 자식에서 부모의 state를 변경할 수 있습니다.
      </Text>
    </View>
  );
}

// ─── 부모 컴포넌트 ───
export default function UseStatePropsScreen() {
  // 부모가 관리하는 state
  const [userName, setUserName] = useState('용준');
  const [score, setScore] = useState(0);

  /**
   * 점수 변경 함수
   * 이 함수를 자식에게 props로 전달합니다.
   * 자식이 이 함수를 호출하면 부모의 state가 변경됩니다.
   */
  const handleScoreChange = (delta: number) => {
    setScore(prev => prev + delta);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>부모 컴포넌트</Text>
        <Text style={styles.desc}>
          state: userName="{userName}", score={score}
        </Text>

        {/* 자식 1: state 값을 props로 전달 (읽기 전용) */}
        <ScoreDisplay userName={userName} score={score} />

        {/* 자식 2: setState 함수를 props로 전달 (수정 가능) */}
        <ScoreControl
          onScoreChange={handleScoreChange}
          onNameChange={setUserName}
        />
      </View>

      {/* 데이터 흐름 설명 */}
      <View style={styles.section}>
        <Text style={styles.title}>데이터 흐름</Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'Parent (userName, score state 소유)\n'}
            {' │\n'}
            {' ├─ ScoreDisplay\n'}
            {' │    props: userName, score (읽기 전용)\n'}
            {' │    → 부모 state 변경 시 자동 리렌더링\n'}
            {' │\n'}
            {' └─ ScoreControl\n'}
            {'      props: onScoreChange, onNameChange\n'}
            {'      → 부모의 setState를 호출하여 변경\n'}
            {'      → 부모 리렌더링 → ScoreDisplay도 리렌더링'}
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
  desc: { fontSize: 13, color: '#888' },
  childBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    gap: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#3498DB',
  },
  childLabel: { fontSize: 12, fontWeight: 'bold', color: '#3498DB' },
  childValue: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  childHint: { fontSize: 11, color: '#999', lineHeight: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
  },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
