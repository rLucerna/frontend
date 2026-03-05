import React, { useState, useCallback, memo, useRef } from 'react';
import {
  View, Text, TouchableOpacity, TextInput,
  StyleSheet, ScrollView, Button,
} from 'react-native';

/**
 * useCallback 예시 2: 리스트 + 자식 최적화
 *
 * 리스트 아이템마다 삭제 함수를 전달할 때
 * useCallback으로 함수 참조를 안정화하여
 * 변경되지 않은 아이템의 리렌더링을 방지합니다.
 */

// ─── React.memo로 감싼 아이템 컴포넌트 ───
const TodoItem = memo(function TodoItem({
  text,
  onDelete,
}: {
  text: string;
  onDelete: () => void;
}) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemText}>{text}</Text>
        <Text style={styles.itemRender}>렌더링: {renderCount.current}회</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>삭제</Text>
      </TouchableOpacity>
    </View>
  );
});

export default function UseCallbackListScreen() {
  const [items, setItems] = useState(['React 공부', 'RN 실습', '복습하기']);
  const [newItem, setNewItem] = useState('');
  const [unrelatedCount, setUnrelatedCount] = useState(0);

  /**
   * useCallback으로 삭제 함수를 메모이제이션
   *
   * 의존성: [] (빈 배열)
   * → 함수 내에서 setItems의 함수형 업데이트를 사용하므로
   *   items를 의존성에 넣지 않아도 됩니다.
   */
  const handleDelete = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleAdd = () => {
    if (!newItem.trim()) return;
    setItems(prev => [...prev, newItem.trim()]);
    setNewItem('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>할 일 리스트 (최적화)</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={newItem}
            onChangeText={setNewItem}
            placeholder="할 일 추가"
            onSubmitEditing={handleAdd}
          />
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Text style={styles.addText}>추가</Text>
          </TouchableOpacity>
        </View>

        {items.map((item, index) => (
          <TodoItem
            key={`${item}-${index}`}
            text={item}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </View>

      {/* 관련 없는 state 변경 */}
      <View style={styles.section}>
        <Text style={styles.title}>관련 없는 state 변경 테스트</Text>
        <Text style={styles.desc}>
          이 버튼을 누르면 부모가 리렌더링되지만{'\n'}
          React.memo + useCallback 덕분에{'\n'}
          리스트 아이템은 리렌더링되지 않습니다.
        </Text>
        <Text style={styles.value}>count: {unrelatedCount}</Text>
        <Button
          title="관련 없는 state +1"
          onPress={() => setUnrelatedCount(c => c + 1)}
        />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12, paddingBottom: 32 },
  section: { backgroundColor: '#fff', borderRadius: 10, padding: 16, gap: 8 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  desc: { fontSize: 13, color: '#666', lineHeight: 20 },
  value: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#9B59B6' },
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
    backgroundColor: '#9B59B6',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  addText: { color: '#fff', fontWeight: 'bold' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  itemText: { fontSize: 14, color: '#333' },
  itemRender: { fontSize: 11, color: '#9B59B6' },
  deleteBtn: { padding: 6 },
  deleteText: { fontSize: 13, color: '#E74C3C' },
});
