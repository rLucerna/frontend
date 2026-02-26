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
 * 서영2 스택 화면: 아티스트 상세 정보
 */
export default function Seoyeong2DetailScreen() {
  /**
   * useRouter: router.back()으로 서영2 탭으로 복귀
   */
  const router = useRouter();

  /**
   * useLocalSearchParams: 서영2 탭에서 전달한 아티스트 파라미터 수신
   * - artistName: 아티스트명
   * - genre: 음악 장르
   * - debutYear: 데뷔 연도 (문자열로 전달됨)
   * - fromTab: 보낸 탭 이름
   */
  const { artistName, genre, debutYear, fromTab } = useLocalSearchParams<{
    artistName: string;
    genre: string;
    debutYear: string;
    fromTab: string;
  }>();

  /**
   * 뒤로 가기 핸들러
   * router.back(): 스택에서 현재 화면 제거 후 서영2 탭으로 복귀
   */
  const handleGoBack = () => {
    router.back();
  };

  const albums = [
    { title: 'Dark & Wild', year: '2014', tracks: 14, emoji: '🌑' },
    { title: 'The Most Beautiful Moment in Life', year: '2015', tracks: 10, emoji: '🌸' },
    { title: 'Wings', year: '2016', tracks: 15, emoji: '🦋' },
    { title: 'Love Yourself: Tear', year: '2018', tracks: 11, emoji: '💜' },
    { title: 'Map of the Soul: 7', year: '2020', tracks: 20, emoji: '🗺️' },
    { title: 'BE', year: '2020', tracks: 8, emoji: '🌌' },
  ];

  const songs = [
    { title: 'Dynamite', views: '1.8억', emoji: '💥' },
    { title: 'Butter', views: '7억', emoji: '🧈' },
    { title: 'Boy With Luv', views: '12억', emoji: '💌' },
    { title: 'DNA', views: '14억', emoji: '🧬' },
    { title: 'Fake Love', views: '10억', emoji: '💔' },
  ];

  const members = ['RM', 'Jin', 'Suga', 'J-Hope', 'Jimin', 'V', 'Jung Kook'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 파라미터 수신 표시 */}
        <View style={styles.paramCard}>
          <Text style={styles.paramTitle}>📨 useLocalSearchParams로 수신한 파라미터</Text>
          <Text style={styles.paramText}>보낸 탭: <Text style={styles.paramValue}>{fromTab}</Text></Text>
          <Text style={styles.paramText}>아티스트: <Text style={styles.paramValue}>{artistName}</Text></Text>
          <Text style={styles.paramText}>장르: <Text style={styles.paramValue}>{genre}</Text></Text>
          <Text style={styles.paramText}>데뷔: <Text style={styles.paramValue}>{debutYear}년</Text></Text>
        </View>

        {/* 아티스트 헤더 */}
        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>🎤</Text>
          <Text style={styles.heroTitle}>{artistName}</Text>
          <Text style={styles.heroSub}>{genre}  •  데뷔 {debutYear}년  •  멤버 {members.length}명</Text>
          <View style={styles.memberChips}>
            {members.map((m, i) => (
              <View key={i} style={styles.chip}>
                <Text style={styles.chipText}>{m}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 인기 음악 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🔥 인기 뮤직비디오</Text>
          {songs.map((song, i) => (
            <View key={i} style={styles.songRow}>
              <Text style={styles.songRank}>{i + 1}</Text>
              <Text style={styles.songEmoji}>{song.emoji}</Text>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songViews}>조회 {song.views}</Text>
            </View>
          ))}
        </View>

        {/* 앨범 목록 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>💿 앨범 목록</Text>
          {albums.map((album, i) => (
            <View key={i} style={styles.albumRow}>
              <Text style={styles.albumEmoji}>{album.emoji}</Text>
              <View style={styles.albumInfo}>
                <Text style={styles.albumTitle}>{album.title}</Text>
                <Text style={styles.albumMeta}>{album.year}  •  {album.tracks}트랙</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>← 뒤로 가기 (router.back())</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const PURPLE2 = '#8E44AD';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F0FF' },
  container: { padding: 16, gap: 14 },

  paramCard: {
    backgroundColor: '#EEE0FF',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: PURPLE2,
  },
  paramTitle: { fontSize: 13, fontWeight: 'bold', color: PURPLE2, marginBottom: 8 },
  paramText: { fontSize: 13, color: '#555', marginBottom: 4 },
  paramValue: { fontWeight: 'bold', color: '#222' },

  heroCard: {
    backgroundColor: PURPLE2,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
  },
  heroEmoji: { fontSize: 56, marginBottom: 8 },
  heroTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
  heroSub: { fontSize: 13, color: '#DCC8FF', marginBottom: 14 },
  memberChips: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6 },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chipText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3EEFF',
  },

  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    gap: 8,
  },
  songRank: { width: 20, fontSize: 14, color: '#999', fontWeight: 'bold' },
  songEmoji: { fontSize: 20 },
  songTitle: { flex: 1, fontSize: 14, color: '#333', fontWeight: '600' },
  songViews: { fontSize: 12, color: '#999' },

  albumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    gap: 12,
  },
  albumEmoji: { fontSize: 32 },
  albumInfo: { flex: 1 },
  albumTitle: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 2 },
  albumMeta: { fontSize: 12, color: '#999' },

  backButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  backButtonText: { color: '#666', fontSize: 14 },
});
