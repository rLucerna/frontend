import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  SafeAreaView, StatusBar, Modal // Modal 추가
} from 'react-native';
import { useRouter, Stack } from 'expo-router'; 

export default function FindAccountScreen() {
  const router = useRouter(); 
  const [activeTab, setActiveTab] = useState<'ID' | 'PW'>('ID');
  const [isSent, setIsSent] = useState(false); 
  const [isVerified, setIsVerified] = useState(false); 
  const [timeLeft, setTimeLeft] = useState(180);
  
  // 안내창(모달) 상태 관리
  const [modalVisible, setModalVisible] = useState(false);
  const [resultMsg, setResultMsg] = useState('');

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined; 
    if (isSent && timeLeft > 0 && !isVerified) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [isSent, timeLeft, isVerified]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const resetStatus = () => {
    setIsSent(false);
    setIsVerified(false);
    setTimeLeft(180);
  };

  const handleFindInfo = () => {
    const msg = activeTab === 'ID' 
      ? '서영 님의 아이디는\n"seoyoung_41"입니다.' 
      : '임시 비밀번호가\n발송되었습니다.';
    setResultMsg(msg);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />
      
      {/* ★ 커스텀 안내창 (Modal) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{activeTab === 'ID' ? '아이디 찾기' : '비밀번호 찾기'}</Text>
            <Text style={styles.modalText}>{resultMsg}</Text>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => {
                setModalVisible(false);
                router.back();
              }}
            >
              <Text style={styles.modalCloseBtnText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.onlyCloseHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backBtn}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'ID' && styles.activeTab]} 
          onPress={() => { setActiveTab('ID'); resetStatus(); }}
        >
          <Text style={[styles.tabText, activeTab === 'ID' && styles.activeTabText]}>ID 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'PW' && styles.activeTab]} 
          onPress={() => { setActiveTab('PW'); resetStatus(); }}
        >
          <Text style={[styles.tabText, activeTab === 'PW' && styles.activeTabText]}>PW 찾기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formPadding}>
        <View style={styles.rowInputGroup}>
          <TextInput style={styles.underlineInput} placeholder="휴대전화 번호" placeholderTextColor="#ccc" keyboardType="phone-pad" />
          <TouchableOpacity 
            style={[styles.capsuleBtn, isSent && { backgroundColor: '#F0BB78' }]} 
            onPress={() => setIsSent(true)} 
            disabled={isSent}
          >
            <Text style={styles.capsuleBtnText}>{isSent ? '발송됨' : '인증번호 발송'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowInputGroup}>
          <TextInput style={styles.underlineInput} placeholder="인증번호 입력" placeholderTextColor="#ccc" keyboardType="number-pad" />
          <TouchableOpacity 
            style={[styles.capsuleBtn, isVerified && { backgroundColor: '#F0BB78' }]} 
            onPress={() => setIsVerified(true)} 
            disabled={isVerified}
          >
            <Text style={styles.capsuleBtnText}>{isVerified ? '인증됨' : '확인'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.timerTextOutside}>{isVerified ? '인증 완료' : isSent ? formatTime(timeLeft) : '03:00'}</Text>

        <TouchableOpacity 
          style={[styles.actionBtn, (!isVerified || timeLeft === 0) && { backgroundColor: '#ccc' }]} 
          disabled={!isVerified || timeLeft === 0}
          onPress={handleFindInfo}
        >
          <Text style={styles.actionBtnText}>{activeTab === 'ID' ? '아이디 찾기' : '비밀번호 찾기'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  onlyCloseHeader: { flexDirection: 'row', justifyContent: 'flex-end', padding: 20 },
  backBtn: { fontSize: 24, color: '#333', fontWeight: '300' },
  tabContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee' },
  tabButton: { flex: 1, paddingVertical: 18, alignItems: 'center' },
  activeTab: { backgroundColor: '#A4B465', borderBottomWidth: 3, borderBottomColor: '#626F47' },
  tabText: { fontSize: 15, color: '#999' },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  formPadding: { padding: 30 },
  rowInputGroup: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10, borderBottomWidth: 1.5, borderBottomColor: '#333' },
  underlineInput: { flex: 1, height: 45, fontSize: 15, color: '#333' },
  capsuleBtn: { backgroundColor: '#F5ECD5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15, marginBottom: 5, marginLeft: 10, minWidth: 85, alignItems: 'center' },
  capsuleBtnText: { fontSize: 11, fontWeight: 'bold', color: '#626F47' },
  timerTextOutside: { color: '#E74C3C', fontSize: 12, marginTop: 5, fontWeight: '600' },
  actionBtn: { marginTop: 50, width: '100%', height: 55, backgroundColor: '#626F47', justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  actionBtnText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },

  // ★ 모달 스타일 추가
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { width: '80%', backgroundColor: 'white', borderRadius: 15, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#626F47' },
  modalText: { fontSize: 15, textAlign: 'center', marginBottom: 20, lineHeight: 22, color: '#333' },
  modalCloseBtn: { backgroundColor: '#626F47', borderRadius: 8, paddingHorizontal: 30, paddingVertical: 10 },
  modalCloseBtnText: { color: 'white', fontWeight: 'bold', fontSize: 15 }
});