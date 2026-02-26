import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

/**
 * 은서1 스택 화면: 주간 날씨 예보
 */
export default function Eunseo1DetailScreen() {
  /**
   * useRouter: router.back()으로 은서1 탭으로 복귀
   */
  const router = useRouter();

  /**
   * useLocalSearchParams: 은서1 탭에서 전달한 날씨 파라미터 수신
   * - city: 도시명
   * - currentTemp: 현재 기온 (숫자지만 문자열로 전달됨)
   * - weather: 날씨 상태
   * - fromTab: 보낸 탭 이름
   *
   * 파라미터는 항상 string 타입으로 전달되므로
   * 숫자가 필요하면 Number(currentTemp) 로 변환해야 합니다.
   */
  const { city, currentTemp, weather, fromTab } = useLocalSearchParams<{
    city: string;
    currentTemp: string;
    weather: string;
    fromTab: string;
  }>();

  /**
   * 뒤로 가기 핸들러
   * router.back(): 스택에서 현재 화면을 제거하고 은서1 탭으로 복귀
   */
  const handleGoBack = () => {
    router.back();
  };

  const weeklyForecast = [
    { day: '오늘', high: Number(currentTemp) + 3, low: Number(currentTemp) - 4, icon: '☀️', desc: weather },
    { day: '내일', high: 15, low: 7, icon: '⛅', desc: '구름 조금' },
    { day: '수', high: 13, low: 6, icon: '🌥️', desc: '흐림' },
    { day: '목', high: 10, low: 3, icon: '🌧️', desc: '비' },
    { day: '금', high: 9, low: 2, icon: '🌧️', desc: '비' },
    { day: '토', high: 14, low: 5, icon: '⛅', desc: '구름 조금' },
    { day: '일', high: 17, low: 8, icon: '☀️', desc: '맑음' },
  ];

  const airQuality = [
    { label: '미세먼지', value: '좋음', level: 1, color: '#27AE60' },
    { label: '초미세먼지', value: '보통', level: 2, color: '#F39C12' },
    { label: '오존', value: '좋음', level: 1, color: '#27AE60' },
    { label: '자외선', value: '낮음', level: 1, color: '#27AE60' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 파라미터 수신 표시 */}
        <View style={styles.paramCard}>
          <Text style={styles.paramTitle}>📨 useLocalSearchParams로 수신한 파라미터</Text>
          <Text style={styles.paramText}>보낸 탭: <Text style={styles.paramValue}>{fromTab}</Text></Text>
          <Text style={styles.paramText}>도시: <Text style={styles.paramValue}>{city}</Text></Text>
          <Text style={styles.paramText}>현재 기온: <Text style={styles.paramValue}>{currentTemp}°C → Number({currentTemp}) = {Number(currentTemp)}</Text></Text>
          <Text style={styles.paramText}>날씨: <Text style={styles.paramValue}>{weather}</Text></Text>
        </View>

        {/* 현재 날씨 카드 */}
        <View style={styles.heroCard}>
          <Text style={styles.heroCity}>{city}</Text>
          <Text style={styles.heroIcon}>☀️</Text>
          <Text style={styles.heroTemp}>{currentTemp}°</Text>
          <Text style={styles.heroDesc}>{weather}</Text>
          <Text style={styles.heroMinMax}>최고 {Number(currentTemp) + 3}° / 최저 {Number(currentTemp) - 4}°</Text>
        </View>

        {/* 7일 예보 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📅 7일 예보</Text>
          {weeklyForecast.map((day, i) => (
            <View key={i} style={styles.forecastRow}>
              <Text style={styles.forecastDay}>{day.day}</Text>
              <Text style={styles.forecastIcon}>{day.icon}</Text>
              <Text style={styles.forecastDesc}>{day.desc}</Text>
              <View style={styles.forecastTemps}>
                <Text style={styles.forecastHigh}>{day.high}°</Text>
                <Text style={styles.forecastSep}>/</Text>
                <Text style={styles.forecastLow}>{day.low}°</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 대기질 정보 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🌬️ 대기질 정보</Text>
          <View style={styles.airGrid}>
            {airQuality.map((item, i) => (
              <View key={i} style={[styles.airItem, { borderColor: item.color }]}>
                <Text style={styles.airLabel}>{item.label}</Text>
                <Text style={[styles.airValue, { color: item.color }]}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>← 뒤로 가기 (router.back())</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const ORANGE = '#E67E22';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF6EC' },
  container: { padding: 16, gap: 14 },

  paramCard: {
    backgroundColor: '#FFE8CC',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: ORANGE,
  },
  paramTitle: { fontSize: 13, fontWeight: 'bold', color: ORANGE, marginBottom: 8 },
  paramText: { fontSize: 13, color: '#555', marginBottom: 4 },
  paramValue: { fontWeight: 'bold', color: '#222' },

  heroCard: {
    backgroundColor: ORANGE,
    borderRadius: 14,
    padding: 28,
    alignItems: 'center',
  },
  heroCity: { fontSize: 16, color: '#FFE5C8', fontWeight: '600', marginBottom: 4 },
  heroIcon: { fontSize: 64, marginVertical: 8 },
  heroTemp: { fontSize: 56, fontWeight: '100', color: '#fff', marginBottom: 4 },
  heroDesc: { fontSize: 18, color: '#FFE5C8', marginBottom: 6 },
  heroMinMax: { fontSize: 14, color: '#FFCFA0' },

  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF6EC',
  },

  forecastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  forecastDay: { width: 36, fontSize: 13, fontWeight: '600', color: '#333' },
  forecastIcon: { fontSize: 22, width: 32 },
  forecastDesc: { flex: 1, fontSize: 13, color: '#777' },
  forecastTemps: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  forecastHigh: { fontSize: 14, fontWeight: 'bold', color: '#E74C3C' },
  forecastSep: { fontSize: 12, color: '#CCC' },
  forecastLow: { fontSize: 14, color: '#3498DB' },

  airGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  airItem: {
    width: '47%',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  airLabel: { fontSize: 12, color: '#888', marginBottom: 4 },
  airValue: { fontSize: 16, fontWeight: 'bold' },

  backButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  backButtonText: { color: '#666', fontSize: 14 },
});
