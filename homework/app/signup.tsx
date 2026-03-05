import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView
} from 'react-native';
import { useRouter } from 'expo-router'; 

export default function SignupScreen() {
  const router = useRouter(); 
  
  const [isSignupSent, setIsSignupSent] = useState(false);
  const [isSignupVerified, setIsSignupVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  // 타이머 로직 수정
  useEffect(() => {
    // 20번째 줄 오류 수정: ReturnType을 사용하여 환경에 맞는 타이머 타입 지정
    let timer: ReturnType<typeof setInterval> | undefined;

    if (isSignupSent && timeLeft > 0 && !isSignupVerified) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSignupSent, timeLeft, isSignupVerified]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.onlyCloseHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backBtn}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.signupScroll}>
        <Text style={styles.signupMainTitle}>회원가입</Text>
        
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>아이디</Text>
          <View style={styles.boxInputWrapper}>
            <TextInput style={styles.boxInput} placeholder="아이디를 입력해주세요." placeholderTextColor="#ccc" />
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>비밀번호</Text>
          <View style={styles.boxInputWrapper}>
            <TextInput style={styles.boxInput} placeholder="비밀번호를 입력해주세요." secureTextEntry placeholderTextColor="#ccc" />
          </View>
          <View style={[styles.boxInputWrapper, { marginTop: 10 }]}>
            <TextInput style={styles.boxInput} placeholder="비밀번호 재확인" secureTextEntry placeholderTextColor="#ccc" />
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>이름(닉네임)</Text>
          <View style={styles.boxInputWrapper}>
            <TextInput style={styles.boxInput} placeholder="이름을 입력해주세요." placeholderTextColor="#ccc" />
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>휴대전화</Text>
          <View style={styles.rowWrapper}>
            <View style={[styles.boxInputWrapper, { flex: 1 }]}>
              <TextInput style={styles.boxInput} placeholder="전화번호를 입력해주세요." keyboardType="phone-pad" placeholderTextColor="#ccc" />
            </View>
            <TouchableOpacity 
              style={[styles.verifyRequestBtn, isSignupSent && { backgroundColor: '#F0BB78' }]} 
              onPress={() => setIsSignupSent(true)}
              disabled={isSignupSent}
            >
              <Text style={styles.verifyRequestBtnText}>{isSignupSent ? '발송됨' : '인증번호 발송'}</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.rowWrapper, { marginTop: 10 }]}>
            <View style={[styles.boxInputWrapper, { flex: 1 }]}>
              <TextInput style={styles.boxInput} placeholder="인증번호를 입력해주세요." keyboardType="number-pad" placeholderTextColor="#ccc" />
            </View>
            <TouchableOpacity 
              style={[styles.verifyRequestBtn, isSignupVerified && { backgroundColor: '#F0BB78' }]} 
              onPress={() => setIsSignupVerified(true)}
              disabled={isSignupVerified || !isSignupSent}
            >
              <Text style={styles.verifyRequestBtnText}>{isSignupVerified ? '인증됨' : '확인'}</Text>
            </TouchableOpacity>
          </View>
          
          {isSignupSent && (
            <Text style={styles.outerTimerText}>
              {isSignupVerified ? '인증 완료' : formatTime(timeLeft)}
            </Text>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.signupFinalBtn, !isSignupVerified && { backgroundColor: '#ccc' }]}
          disabled={!isSignupVerified}
          onPress={() => alert('가입 완료!')}
        >
          <Text style={styles.signupFinalBtnText}>가입하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  onlyCloseHeader: { flexDirection: 'row', justifyContent: 'flex-end', padding: 20 },
  backBtn: { fontSize: 24, color: '#333', fontWeight: '300' },
  signupScroll: { paddingHorizontal: 25, paddingBottom: 40 },
  signupMainTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  inputSection: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  boxInputWrapper: { height: 55, borderWidth: 1, borderColor: '#ddd', borderRadius: 4, backgroundColor: '#fff', paddingHorizontal: 15, justifyContent: 'center' },
  boxInput: { fontSize: 15, color: '#000', height: '100%' },
  rowWrapper: { flexDirection: 'row' },
  verifyRequestBtn: { width: 110, marginLeft: 10, backgroundColor: '#626F47', borderRadius: 4, justifyContent: 'center', alignItems: 'center', height: 55 },
  verifyRequestBtnText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  signupFinalBtn: { height: 55, backgroundColor: '#626F47', borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginTop: 30 },
  signupFinalBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  outerTimerText: { fontSize: 12, color: '#E74C3C', fontWeight: '600', marginTop: 5, marginLeft: 2 },
});