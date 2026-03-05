import { ActivityCard, VolunteerActivityData } from '@/components/ActivityCard';
import { ActivityTabButton } from '@/components/ActivityTabButton';
import { SearchTabButton } from '@/components/SearchTabButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function eunseoScreen() {
    const router=useRouter();
    // 기본 헤더 삭제
    useLayoutEffect(() => {
    }, []);

    const [activeTab, setActiveTab] = useState('normal'); // 검색(normal) / AI검색(ai)
    const [activityType, setActivityType] = useState('volunteering') //봉사(volunteering) / 기부(donation) 
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 관리
    const [isOptionOpen, setIsOpen] = useState(false); // 옵션 토글 오픈 관리 / 열림 (true) / 닫힘 (false)
    const [isSortOpen, setIsSortOpen] = useState(false); // 정렬 옵션 오픈 관리
    const [selectedSort, setSelectedSort] = useState('최신순'); // 정렬 옵션 state 관리

    const categories = ['카테고리 1', '카테고리 2', '카테고리 3', '카테고리 4', '카테고리 5'];
    const sortOption = ['최신순', '정렬 1', '정렬 2'];

    // 검색결과 개수
    let searchResultCount = 10;

    // 검색어 출력
    const handleSearch = () => {
        console.log("검색어 : ", searchQuery);
    }
    // 옵션 버튼 클릭 시 state 변경
    const optionToggleDropdown = () => {
        setIsOpen(!isOptionOpen);
    }
    // 정렬 버튼 클릭 시 state 변경
    const sortToggleDropdown = () => {
        setIsSortOpen(!isSortOpen);
    }

    const handleCardPress=()=>{
        router.push('/VolunteeringDetail');
    }

    const volunteerExample: VolunteerActivityData = {
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

    return (
        <SafeAreaView style={styles.searchContainer}>
            {/*검색/AI검색 네비게이션 */}
            <View style={styles.searchTabContainer}>
                {/*검색 버튼*/}
                <SearchTabButton
                    label="검색" isActive={activeTab === 'normal'} onPress={() => setActiveTab('normal')} />

                {/* AI검색 버튼 */}
                <SearchTabButton
                    label="AI검색" isActive={activeTab === 'ai'} onPress={() => setActiveTab('ai')} />
            </View>

            {/* 봉사/기부 탭 */}
           <View style={styles.activityTabContainer}>
                {/* 봉사 버튼 */}
                <ActivityTabButton
                    label="봉사" isActive={activityType === 'volunteering'} onPress={() => setActivityType('volunteering')} />
                {/* 기부 버튼 */}
                <ActivityTabButton
                    label="기부" isActive={activityType === 'donation'} onPress={() => setActivityType('donation')} />
            </View>

            {/* 검색창 */}
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder=' 검색어를 입력하세요'
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery} />
                {/* 검색버튼 */}
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>검색</Text>
                </TouchableOpacity>
            </View>

            {/* 옵션(카테고리) */}
            <View style={styles.toggleContainer}>
                {/*옵션 버튼 */}
                <TouchableOpacity style={styles.toggleButton} onPress={optionToggleDropdown}>
                    <Text style={styles.toggleButtonText}>옵션</Text>
                    {/* 위, 아래 삼각형 아이콘 */}
                    <MaterialCommunityIcons
                        name={isOptionOpen ? 'chevron-up' : 'chevron-down'}
                        size={24}
                        color='#666' />
                </TouchableOpacity>

                {/* 카테고리 리스트 */}
                {isOptionOpen && (
                    <View style={styles.dropdownContainer}>
                        {categories.map((category) => (
                            <TouchableOpacity style={styles.categoryItem}>
                                <Text style={styles.categoryItemText}>{category}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            {/* 검색 결과 개수 / 정렬기준 옵션 */}
            <View style={[styles.toggleContainer, {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }]} >
                {/* 검색 결과 개수 */}
                <Text style={styles.toggleButtonText}> 총 {searchResultCount}건</Text>

                {/* 정렬 기준 옵션 */}
                <View style={{ width: '30%' }}></View>
                <TouchableOpacity style={styles.toggleButton} onPress={sortToggleDropdown}>
                    <Text style={styles.toggleButtonText} numberOfLines={1}>{selectedSort}</Text>
                    <MaterialCommunityIcons
                        name={isSortOpen ? 'chevron-up' : 'chevron-down'}
                        size={24}
                        color='#666' />
                </TouchableOpacity>
                
            </View>
            
            <View style={{justifyContent:'center'}}>
                <ActivityCard 
                activityType="volunteering" 
                data={volunteerExample}
                onPress={handleCardPress} />
            </View>

            {isSortOpen && (
                    <View style={styles.sortDropdownContainer}>
                        {sortOption.map((option) => (
                            <TouchableOpacity style={styles.categoryItem}>
                                <Text style={styles.categoryItemText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchTabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        width: '100%',
        marginTop: 50,
    },

    activityTabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20,
    },

    searchBarContainer: {
        flexDirection: 'row',
        marginTop: 30,
        marginHorizontal: 20,
    },
    searchBar: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderTopLeftRadius: 13,
        borderBottomLeftRadius: 13,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    searchButton: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#007AFF',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 13,
        borderBottomRightRadius: 13,
        marginLeft: -15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    toggleContainer: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 20,
        overflow:'visible',
    },
    toggleButton: {
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        flexWrap: 'nowrap',
    },
    toggleButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    dropdownContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    categoryItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRightWidth: 1,
        borderRightColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    categoryItemText: {
        fontSize: 14,
        color: '#555',
    },
    sortDropdownContainer: {
        width: '30%',
        flexDirection: 'column',
        marginTop: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        position: 'absolute',
        top: 43,
        right: 16,
        zIndex: 9999,
    },
});