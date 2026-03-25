import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';

export default function Yongjun2Tab() {
  const [input, setInput] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState<string[]>([
    '리액트 숙제 제출하기',
    '운동 30분 하기',
    '책 20페이지 읽기',
  ]);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isModalVisible) {
      inputRef.current?.focus();
    }
  }, [isModalVisible]);

  const saveTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks((prev) => [...prev, trimmed]);
    setInput('');
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Task manager</Text>

        <TouchableOpacity
          style={styles.newTaskButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.newTaskButtonText}>+ 새 할일</Text>
        </TouchableOpacity>

        <FlatList
          data={tasks}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({ item, index }) => (
            <Text style={styles.taskItem}>
              {index + 1}. {item}
            </Text>
          )}
        />
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>작업 만들기</Text>
            <TextInput
              ref={inputRef}
              style={styles.modalInput}
              placeholder="새 할 일을 입력하세요"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={saveTask}
              returnKeyType="done"
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
                <Text style={styles.saveButtonText}>저장</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setIsModalVisible(false);
                  setInput('');
                }}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
  },
  newTaskButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#E9EDF2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  newTaskButtonText: {
    color: '#34495E',
    fontSize: 15,
    fontWeight: '700',
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    color: '#2C3E50',
    fontSize: 14,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
  },
  modalInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 15,
    color: '#2C3E50',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#34495E',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  cancelButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '700',
  },
});
