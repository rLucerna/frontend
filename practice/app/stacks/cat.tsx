import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function UseStateArrayStack() {
  const [meows, setMeows] = useState<string[]>([]);

  const lastClickTimeRef = useRef<number>(0);

  const handleCatClick = () => {
    lastClickTimeRef.current = Date.now();
    setMeows((prev) => [...prev, '야옹~']);
  };

  const handleReset = () => {
    if (meows.length === 0) {
      return;
    }

    Alert.alert(
      '리스트 초기화',
      '모든 기록을 삭제할까요?',
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '삭제', 
          style: 'destructive', 
          onPress: () => setMeows([]) 
        },
      ]
    );
  };

  useEffect(() => {
    if (meows.length > 0) {
      console.log(`현재 횟수: ${meows.length}`);
    }
  }, [meows]);

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ title: '배열 초기화 연습', headerTitleAlign: 'center' }} />
      
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>고양이를 눌러보세요!</Text>
        
        <TouchableOpacity 
          style={styles.catButton} 
          onPress={handleCatClick} 
          activeOpacity={0.6}
        >
          <Text style={styles.catEmoji}>🐈</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{meows.length}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.resetButton} 
          onPress={handleReset}
        >
          <Text style={styles.resetButtonText}>리스트 다 삭제</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <View style={styles.list}>
          {meows.length === 0 ? (
            <Text style={styles.emptyText}>..</Text>
          ) : (
            meows.map((item, index) => (
              <View key={index} style={styles.meowItem}>
                <Text style={styles.meowText}>{index + 1}. {item} 🐱</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDFCF0' },
  container: { padding: 30, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 30, color: '#444' },
  catButton: {
    width: 150, height: 150, backgroundColor: '#fff', borderRadius: 75,
    justifyContent: 'center', alignItems: 'center', elevation: 5,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 4,
  },
  catEmoji: { fontSize: 80 },
  badge: {
    position: 'absolute', right: 5, top: 5, backgroundColor: '#FF6B6B',
    borderRadius: 20, minWidth: 35, height: 35,
    justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5,
  },
  badgeText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  
  resetButton: {
    marginTop: 25,
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  resetButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 14,
  },

  divider: { width: '100%', height: 1, backgroundColor: '#EEE', marginVertical: 30 },
  list: { width: '100%', gap: 10 },
  meowItem: {
    backgroundColor: '#fff', padding: 15, borderRadius: 12,
    borderLeftWidth: 5, borderLeftColor: '#FFD93D',
  },
  meowText: { fontSize: 16, color: '#555', fontWeight: '500' },
  emptyText: { color: '#AAA', textAlign: 'center', marginTop: 20, fontSize: 15 },
});