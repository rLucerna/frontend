import React from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  Image, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform
} from 'react-native';
import { useRouter } from 'expo-router'; 

export default function SeoyoungTab() {
  const router = useRouter(); 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <View style={styles.centeredWrapper}>
          <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={styles.logoImage} resizeMode="contain" />
          
          <TextInput style={styles.input} placeholder="아이디 (이메일)" placeholderTextColor="#aaa" autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="비밀번호" secureTextEntry placeholderTextColor="#aaa" />
          
          <TouchableOpacity style={styles.loginButton} onPress={() => alert('로그인 시도')}>
            <Text style={styles.loginButtonText}>로그인하기</Text>
          </TouchableOpacity>

          <View style={styles.subLinkContainer}>
            {/* 탭 화면 위에 옆으로 밀려오는 Stack을 쌓습니다 */}
            <TouchableOpacity onPress={() => router.push('/findAccount')}>
              <Text style={styles.subLinkText}>ID & PW 찾기</Text>
            </TouchableOpacity>
            
            <Text style={styles.subLinkDivider}>|</Text>
            
            {/* 탭 화면 위에 아래에서 위로 올라오는 Modal을 쌓습니다 */}
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.subLinkText}>회원가입하기</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.snsContainer}>
             <Text style={styles.snsGuideText}>SNS 계정으로 로그인하기</Text>
             <View style={styles.snsIconContainer}>
                <TouchableOpacity style={[styles.snsIcon, { backgroundColor: '#03C75A' }]}><Image source={{ uri: 'https://cdn.pixabay.com/photo/2021/11/14/04/55/naver-6792945_1280.png' }} style={styles.snsImage} resizeMode="contain" /></TouchableOpacity>
                <TouchableOpacity style={[styles.snsIcon, { backgroundColor: '#FEE500' }]}><Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/KakaoTalk_logo.svg/512px-KakaoTalk_logo.svg.png' }} style={[styles.snsImage, { width: '60%', height: '60%' }]} resizeMode="contain" /></TouchableOpacity>
                <TouchableOpacity style={[styles.snsIcon, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee' }]}><Image source={{ uri: 'https://www.gstatic.com/images/branding/product/2x/googleg_96dp.png' }} style={[styles.snsImage, { width: '60%', height: '60%' }]} resizeMode="contain" /></TouchableOpacity>
             </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centeredWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 35 },
  logoImage: { width: 80, height: 80, marginBottom: 40 },
  input: { width: '100%', height: 55, borderWidth: 1, borderColor: '#eee', paddingHorizontal: 15, marginBottom: 12, borderRadius: 8, backgroundColor: '#fafafa' },
  loginButton: { width: '100%', height: 55, backgroundColor: '#626F47', justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  subLinkContainer: { flexDirection: 'row', marginTop: 20 },
  subLinkText: { fontSize: 13, color: '#666' },
  subLinkDivider: { marginHorizontal: 10, color: '#eee' },
  snsContainer: { marginTop: 60, alignItems: 'center' },
  snsGuideText: { fontSize: 13, color: '#aaa', marginBottom: 15 },
  snsIconContainer: { flexDirection: 'row' },
  snsIcon: { width: 48, height: 48, borderRadius: 24, marginHorizontal: 10, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  snsImage: { width: '100%', height: '100%' },
});