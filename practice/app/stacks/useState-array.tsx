import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Button,
} from 'react-native';

/**
 * useState 예시 2: 배열 State
 *
 * 배열 state는 직접 수정(push, splice 등)하면 안 됩니다.
 * 반드시 새 배열을 만들어 setState에 전달해야 합니다.
 *
 * 핵심 패턴:
 *   추가: [...prev, newItem]
 *   삭제: prev.filter(item => 조건)
 *   수정: prev.map(item => 조건 ? 변경 : item)
 */
export default function UseStateArrayScreen() {
  // 장보기 목록: 배열 state
  const [items, setItems] = useState<string[]>(['우유', '계란', '빵']);
  const [inputText, setInputText] = useState('');

  /**
   * 아이템 추가
   * 스프레드 연산자로 기존 배열을 펼치고, 새 아이템을 추가한 새 배열 생성
   */
  const handleAdd = () => {
    if (!inputText.trim()) return;
    // ✅ 새 배열 생성: [...기존배열, 새아이템]
    setItems(prev => [...prev, inputText.trim()]);
    setInputText('');
  };

  /**
   * 아이템 삭제
   * filter로 해당 인덱스를 제외한 새 배열 생성
   * ❌ items.splice(index, 1) → 직접 수정이므로 사용 금지!
   */
  const handleDelete = (index: number) => {
    // ✅ filter로 새 배열: 해당 index만 제외
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  /**
   * 전체 삭제
   * 빈 배열을 새로 전달
   */
  const handleClear = () => {
    setItems([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>장보기 리스트</Text>
        <Text style={styles.sub}>총 {items.length}개</Text>

        {/* 입력 영역 */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="추가할 항목 입력"
            onSubmitEditing={handleAdd}
          />
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Text style={styles.addBtnText}>추가</Text>
          </TouchableOpacity>
        </View>

        {/* 목록 */}
        {items.length === 0 ? (
          <Text style={styles.empty}>목록이 비어있습니다</Text>
        ) : (
          items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemText}>
                {index + 1}. {item}
              </Text>
              {/* 삭제 버튼: filter로 새 배열 생성 */}
              <TouchableOpacity onPress={() => handleDelete(index)}>
                <Text style={styles.deleteText}>삭제</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <Button title="전체 삭제" onPress={handleClear} color="#E74C3C" />
      </View>

      {/* 코드 설명 */}
      <View style={styles.section}>
        <Text style={styles.title}>배열 불변성 패턴</Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {'// ❌ 직접 수정 (리렌더링 안 됨!)\n'}
            {'items.push("포도");  // 같은 참조\n'}
            {'setItems(items);     // React: 변화 없음\n\n'}
            {'// ✅ 새 배열 생성\n'}
            {'// 추가\n'}
            {'setItems([...items, "포도"]);\n\n'}
            {'// 삭제\n'}
            {'setItems(items.filter((_, i) => i !== idx));\n\n'}
            {'// 수정\n'}
            {'setItems(items.map((item, i) =>\n'}
            {'  i === idx ? "수정값" : item\n'}
            {'));'}
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
  sub: { fontSize: 13, color: '#888' },
  inputRow: { flexDirection: 'row', gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  addBtn: {
    backgroundColor: '#3498DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  addBtnText: { color: '#fff', fontWeight: 'bold' },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemText: { fontSize: 15, color: '#333' },
  deleteText: { fontSize: 13, color: '#E74C3C' },
  empty: { fontSize: 14, color: '#BBB', textAlign: 'center', paddingVertical: 16 },
  codeBox: { backgroundColor: '#F0F4F8', borderRadius: 6, padding: 10 },
  code: { fontFamily: 'monospace', fontSize: 11, color: '#2C3E50' },
});
