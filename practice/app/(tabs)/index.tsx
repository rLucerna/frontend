import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  FlatList,
  StatusBar,
  SafeAreaView,
  Alert
} from 'react-native';

export default function App() {
  const [text, setText] = useState('');

  // FlatList를 위한 샘플 데이터
  const DATA = [
    { id: '1', title: '항목 1' },
    { id: '2', title: '항목 2' },
    { id: '3', title: '항목 3' },
  ];

  return (
    <>
      {/* 1. StatusBar: 시스템 상단 바(시계, 배터리 등)의 상태를 제어합니다.
        - barStyle: 글자 색상 (default, light-content, dark-content)
        - backgroundColor: 배경색 (안드로이드 전용)
      */}
      <StatusBar barStyle="dark-content" />

      <View style={styles.centeredContent}>

        {/* 2. View: 레이아웃을 만드는 가장 기본적인 컴포넌트 (웹의 <div> 역할).
          - style: 레이아웃, 색상, 테두리 등 정의
        */}
        {/* <View style={styles.box}><Text>I am a View</Text></View> */}


        {/* 3. Text: 텍스트를 화면에 표시하는 유일한 방법.
          - numberOfLines: 줄 제한
          - onPress: 터치 이벤트 지원
        */}
        {/* <Text style={styles.textStyle} onPress={() => Alert.alert('Text Clicked!')}>
          안녕하세요! 리액트 네이티브입니다.
        </Text> */}


        {/* 4. Image: 이미지를 화면에 렌더링합니다.
          - source: 이미지 경로 (require 혹은 {uri})
          - resizeMode: 이미지 크기 조절 방식 (cover, contain, stretch, repeat, center)
        */}
        {/* <Image 
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
          style={styles.imageStyle} 
          resizeMode="contain"
        /> */}


        {/* 5. TextInput: 사용자로부터 텍스트 입력을 받습니다.
          - value: 입력값
          - onChangeText: 텍스트 변경 시 호출되는 콜백
          - placeholder: 힌트 텍스트
          - keyboardType: 키보드 종류 (numeric, email-address 등)
        */}
        {/* <TextInput
          style={styles.inputStyle}
          placeholder="여기에 입력하세요"
          value={text}
          onChangeText={setText}
        /> */}


        {/* 6. Button: 기본적인 클릭 상호작용을 처리합니다. (디자인 수정에 제약이 많음)
          - title: 버튼 내 텍스트 (필수)
          - onPress: 클릭 시 실행될 함수 (필수)
          - color: 버튼 색상
        */}
        {/* <Button 
          title="클릭하세요" 
          onPress={() => Alert.alert('입력한 값: ' + text)} 
          color="#841584"
        /> */}


        {/* 7. FlatList: 대량의 리스트 데이터를 효율적으로 보여줍니다. (화면에 보이는 것만 렌더링)
          - data: 렌더링할 데이터 배열
          - renderItem: 데이터를 컴포넌트로 변환하는 함수
          - keyExtractor: 각 아이템의 고유 키 추출
        */}
        {/* <FlatList
          data={DATA}
          renderItem={({item}) => (
            <View style={styles.listItem}><Text>{item.title}</Text></View>
          )}
          keyExtractor={item => item.id}
          style={{ width: '80%', maxHeight: 200 }}
        /> */}

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 화면 차지
    backgroundColor: '#f5f5f5',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center',     // 가로 중앙 정렬
    padding: 20,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  inputStyle: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});