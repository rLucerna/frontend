import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function twoScreens() {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <View style={styles.container}>
            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[styles.tabBtn, activeTab === 'home' && styles.tabBtnActive]}
                    onPress={() => setActiveTab('home')}
                >
                    <Text style={[styles.tabText, activeTab === 'home' && styles.tabTextActive]}>홈</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabBtn, activeTab === 'profile' && styles.tabBtnActive]}
                    onPress={() => setActiveTab('profile')}
                >
                    <Text style={[styles.tabText, activeTab === 'profile' && styles.tabTextActive]}>프로필</Text>

                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                {activeTab==='home'&&(
                    <View>
                        <Text style={styles.title}>홈</Text>
                        <Text style={styles.desc}>홈화면입니다</Text>
                    </View>
                )}
                {activeTab==='profile'&&(
                    <View>
                        <Text style={styles.title}>프로필</Text>
                        <Text style={styles.desc}>이름 : 홍길동</Text>
                        <Text style={styles.desc}>이메일 : hongGilDong@gmail.com</Text>
                    </View>
                )}

            </View>
        
        </View>

        

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    tabBtn: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabBtnActive: { borderBottomColor: '#4f46e5' },
    tabText: { fontSize: 16, color: '#888' },
    tabTextActive: { color: '#4f46e5', fontWeight: '600' },
    content: { padding: 24 },
    title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
    desc: { fontSize: 16, color: '#555', lineHeight: 24 },
});