import { createContext, useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserContext=createContext('');

function BookmarkButton(){
    const userName=useContext(UserContext); // props없이 바로 꺼낼 수 있음
    return (
        <TouchableOpacity style={styles.button}>
            <Text>{userName}의 북마크 추가</Text>
        </TouchableOpacity>
    );
}

function LectureCard(){
    return (
        <View>
            <Text style={styles.lectureTitle}>강의 목록</Text>
            <BookmarkButton/>
        </View>
    );
}

function LectureListScreen(){
    return (
        <View>
            <Text style={styles.screenTitle}>강의 목록</Text>
            <LectureCard/>
        </View>
    );
}



export default function ContextExample(){
    const [user,setUser]=useState('홍길동');

    // UserContext의 value에 state의 user값 전달
    // UserContext의 value 값을 BookmartButton의 userName에 전달
    return (
        <UserContext.Provider value={user}> 
            <SafeAreaView style={styles.container}>
                <LectureListScreen/>
                <TouchableOpacity 
                style={styles.loginButton} 
                onPress={()=> setUser('Hong Gildong')}>
                    <Text style={styles.loginText}>다른 유저로 변경</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </UserContext.Provider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    card: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10
    },
    lectureTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    },
    screenTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15
    },
    button: {
        backgroundColor: '#3498db',
        padding: 8,
        borderRadius: 5
    },
    loginButton: {
        backgroundColor: '#2ecc71',
        padding: 12,
        borderRadius: 8,
        marginTop: 20
    },
    loginText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

