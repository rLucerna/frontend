import { VolunteerActivityData } from '@/components/ActivityCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApplyModal } from '@/components/ApplyModal';

export default function VolunteeringDetail() {
    const router = useRouter();
    const [isApplyModalVisible, setIsApplyModalVisible] = useState(false);

    // 더미데이터
    const data: VolunteerActivityData = {
        status: '모집중',
        ageGroup: '성인',
        title: '노인요양원 봉사활동',
        period: '2024.03.01 ~ 03.31',
        volunteerHours: 8,
        date: '2024.03.15',
        field: '요양/간병',
        currentApplicants: 12,
        maxApplicants: 20,
        location: '서울시 강남구',
        reward: '봉사시간 인증서',
    };

    // 모달 띄우기
    const handleApplyPress=()=>{
        setIsApplyModalVisible(true);
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* 뒤로가기 버튼 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialCommunityIcons
                        name="chevron-left"
                        size={32}
                        color="#333" />
                </TouchableOpacity>
            </View>

            {/* 상세보기 */}
            <View style={styles.contentContainer}>
                {/* 모집 상태, 연령대 */}
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>{data.status}</Text>
                    <View style={styles.ageBadge}>
                        <Text style={styles.ageText}>{data.ageGroup}</Text>
                    </View>
                </View>

                {/* 활동 제목 */}
                <Text style={styles.titleText}>{data.title}</Text>

                {/* 구분선 */}
                <View style={styles.divider}></View>

                {/* 세부 정보 컨테이너 */}
                {/* 기본 정보*/}
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>기본정보</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>봉사 분야</Text>
                        <Text style={styles.value}>{data.field}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>모집 기간</Text>
                        <Text style={styles.value}>{data.period}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>봉사 시간</Text>
                        <Text style={styles.value}>{data.volunteerHours}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>봉사 날짜</Text>
                        <Text style={styles.value}>{data.date}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>모집 인원</Text>
                        <Text style={styles.value}>{data.currentApplicants} / {data.maxApplicants}명</Text>
                    </View>
                </View>

                {/*기타 정보 */}
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>위치</Text>
                        <Text style={styles.value}>{data.location}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>보상</Text>
                        <Text style={styles.value}>{data.reward}</Text>
                    </View>
                </View>
            </View>

            {/* 신청하기 버튼 (고정) */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.applyButton}>
                    <Text style={styles.applyButtonText} onPress={handleApplyPress}>신청하기</Text>
                </TouchableOpacity>
            </View>

            <ApplyModal
             visible={isApplyModalVisible} 
            status="success"
            onClose={()=>setIsApplyModalVisible(false)}/>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    ageBadge: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    ageText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    },
    titleText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginBottom: 20,
    },
    infoContainer: { marginBottom: 24, },
    infoTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    value: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    buttonContainer: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    applyButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },

})