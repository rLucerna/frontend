import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function KeyBoardScreen() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    // KeyBoard API로 이벤트리스너 등록
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));

    return () => {
      show.remove();
      hide.remove();
    };
  }, []) // 마운트될 때 한번만 실행

  return (
    <View style={styles.container}>
      <Text style={[styles.status, { color: keyboardOpen ? '#6C63FF' : '#333' }]}>{keyboardOpen ? '키보드 열림' : "키보드 닫힘"}</Text>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder="키보드 이벤트리스너 확인"
          placeholderTextColor="#bbb"
        />
      </View>
    </View>
  )



}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80, // 전체를 살짝 위로
    backgroundColor: '#f5f5f5',
    gap: 20,
  },
  status: {
  fontSize: 20,
  fontWeight: '600',
  backgroundColor: '#fff',
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 16,
  overflow: 'hidden',
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 8,
  elevation: 3,
},
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 280,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#aaa',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
});

/*export default function InputWatchExample() {
  const [input, setInput] = useState('');
  const [length, setLength] = useState(0);

  useEffect(() => {
    setLength(input.length);
  }, [input]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="입력하세요"
        value={input}
        onChangeText={setInput}
      />
      
      <Text style={styles.info}>글자 수: {length}</Text>
      <Text style={styles.preview}>입력: {input}</Text>
    </SafeAreaView>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: '#3498db',
    fontWeight: 'bold',
  },
  preview: {
    fontSize: 14,
    color: '#666',
  },
});*/