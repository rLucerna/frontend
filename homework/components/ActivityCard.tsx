import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// 봉사활동 데이터
export interface VolunteerActivityData {
    status: '모집중' | '모집 마감' | '모집 예정', // 모집 상태
    ageGroup: '청소년' | '성인', // 청소년 / 성인
    title: string, // 봉사 이름
    period: string, // 모집기간
    volunteerHours: number, // 봉사시간
    date: string, // 날짜
    field: string, // 분야
    currentApplicants: number, // 현재 신청 인원
    maxApplicants: number, // 최대 신청 인원
    location: string, // 장소
    reward: string, // 보상
}

// 기부활동 데이터
export interface DonationActivityData {

}

type ActivityDataProps = { activityType: 'volunteering'; data: VolunteerActivityData; onPress?:()=>void;  } |
{ activityType: 'donation'; data: DonationActivityData;onPress?:()=>void };

export function ActivityCard({ activityType, data, onPress }: ActivityDataProps) {
    if (activityType === 'volunteering') {
        return (
        <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
            {/* 제목 부분 View */}
            <View style={styles.titleContainer}>
                <Text>{data.status}</Text>
                <View>
                    <Text>{data.ageGroup}</Text>
                </View>
                <Text>{data.title}</Text>
            </View>

            {/* 내용 부분 View */}
            <View style={styles.contentContainer}>
                <Text>모집 기한 : {data.period}</Text>
                <Text>봉사 시간 : {data.volunteerHours}시간</Text>
                <Text>봉사 날짜 : {data.date}</Text>
                <Text>봉사 분야 : {data.field}</Text>
                <Text>인원 : {data.currentApplicants} / {data.maxApplicants}</Text>
                <Text>장소 : {data.location}</Text>
                <Text>보상 : {data.reward}</Text>
            </View>
        </TouchableOpacity>
        )
    }

return null;

}
const styles = StyleSheet.create({
    cardContainer: {
         backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 10,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    titleContainer: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingBottom: 12,
        flexDirection: 'column',
        gap: 8,
    },
    contentContainer: {
        marginTop: 12,
        gap: 8,
    },

})