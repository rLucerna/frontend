import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';

/**
 * 서영2 Router 모달 화면: 음악 플레이어 설정
 *
 * 이 파일은 expo-router의 파일 기반 모달입니다.
 * app/_layout.tsx에서 presentation: 'modal'로 등록되어 있어
 * 아래에서 위로 슬라이드되는 모달처럼 표시됩니다.
 *
 * React Native <Modal> 컴포넌트 방식과의 핵심 차이:
 * - 이 방식: 완전히 독립된 파일·라우트로 존재 → URL로 직접 접근 가능
 * - RN Modal: 하나의 파일 안에 있는 컴포넌트 → URL 없음
 */
export default function Seoyeong2ModalScreen() {
  /**
   * useRouter: 모달을 닫을 때 router.back()을 사용합니다.
   * 모달에서 뒤로가기 = 이전 화면(서영2 탭)으로 복귀
   */
  const router = useRouter();

  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [crossfadeEnabled, setCrossfadeEnabled] = useState(true);
  const [crossfadeSeconds, setCrossfadeSeconds] = useState(3);
  const [quality, setQuality] = useState<'normal' | 'high' | 'lossless'>('high');
  const [downloadOnWifi, setDownloadOnWifi] = useState(true);

  /**
   * 모달 닫기 핸들러
   *
   * router.back(): 현재 모달 라우트를 스택에서 제거하고 이전 화면으로 돌아갑니다.
   * - expo-router modal에서는 router.back()이 모달 닫기와 동일한 효과
   * - 또는 router.dismiss()를 사용할 수도 있습니다 (expo-router v3+)
   */
  const handleClose = () => {
    router.back();
  };

  /**
   * 반복 재생 모드 변경 핸들러
   * 'off' → 'all' → 'one' → 'off' 순으로 순환합니다.
   */
  const handleRepeatToggle = () => {
    if (repeatMode === 'off') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('off');
  };

  const repeatLabels = {
    off: { label: '반복 없음', icon: '🔁', color: '#AAA' },
    all: { label: '전체 반복', icon: '🔁', color: '#8E44AD' },
    one: { label: '한 곡 반복', icon: '🔂', color: '#8E44AD' },
  };

  const qualityOptions: Array<{ key: 'normal' | 'high' | 'lossless'; label: string; desc: string }> = [
    { key: 'normal', label: '일반 음질', desc: '128kbps · 데이터 절약' },
    { key: 'high', label: '고음질', desc: '320kbps · 권장' },
    { key: 'lossless', label: '무손실', desc: 'FLAC · 최고 음질' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 라우터 모달 설명 카드 */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>ℹ️ expo-router presentation: &apos;modal&apos;</Text>
          <Text style={styles.infoText}>
            {'이 화면은 별도 파일로 관리되는 Router 모달입니다.\n'}
            {'라우트: /modals/seoyeong2-modal\n'}
            {'파일: app/modals/seoyeong2-modal.tsx\n\n'}
            {'닫기 버튼은 router.back()을 사용합니다.'}
          </Text>
        </View>

        {/* 재생 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎵 재생 설정</Text>

          {/* 반복 재생 */}
          <TouchableOpacity style={styles.settingRow} onPress={handleRepeatToggle}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>{repeatLabels[repeatMode].icon}</Text>
              <View>
                <Text style={styles.settingLabel}>반복 재생</Text>
                <Text style={[styles.settingValue, { color: repeatLabels[repeatMode].color }]}>
                  {repeatLabels[repeatMode].label}
                </Text>
              </View>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          {/* 셔플 */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔀</Text>
              <View>
                <Text style={styles.settingLabel}>셔플 재생</Text>
                <Text style={styles.settingValue}>랜덤 순서로 재생</Text>
              </View>
            </View>
            <Switch
              value={shuffleEnabled}
              onValueChange={setShuffleEnabled}
              trackColor={{ true: '#8E44AD' }}
            />
          </View>

          {/* 크로스페이드 */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🌊</Text>
              <View>
                <Text style={styles.settingLabel}>크로스페이드</Text>
                <Text style={styles.settingValue}>
                  {crossfadeEnabled ? `곡 전환 시 ${crossfadeSeconds}초 페이드` : '사용 안 함'}
                </Text>
              </View>
            </View>
            <Switch
              value={crossfadeEnabled}
              onValueChange={setCrossfadeEnabled}
              trackColor={{ true: '#8E44AD' }}
            />
          </View>

          {crossfadeEnabled && (
            <View style={styles.sliderRow}>
              <Text style={styles.sliderLabel}>크로스페이드 시간: {crossfadeSeconds}초</Text>
              <View style={styles.secondsBtns}>
                {[1, 2, 3, 5, 7].map((sec) => (
                  <TouchableOpacity
                    key={sec}
                    style={[styles.secBtn, crossfadeSeconds === sec && styles.secBtnActive]}
                    onPress={() => setCrossfadeSeconds(sec)}
                  >
                    <Text style={[styles.secBtnText, crossfadeSeconds === sec && styles.secBtnTextActive]}>
                      {sec}s
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* 음질 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎧 스트리밍 음질</Text>
          {qualityOptions.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              style={[styles.qualityRow, quality === opt.key && styles.qualityRowActive]}
              onPress={() => setQuality(opt.key)}
            >
              <View>
                <Text style={[styles.qualityLabel, quality === opt.key && styles.qualityLabelActive]}>
                  {opt.label}
                </Text>
                <Text style={styles.qualityDesc}>{opt.desc}</Text>
              </View>
              {quality === opt.key && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>

        {/* 다운로드 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📥 다운로드 설정</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>📶</Text>
              <View>
                <Text style={styles.settingLabel}>Wi-Fi에서만 다운로드</Text>
                <Text style={styles.settingValue}>모바일 데이터 절약</Text>
              </View>
            </View>
            <Switch
              value={downloadOnWifi}
              onValueChange={setDownloadOnWifi}
              trackColor={{ true: '#8E44AD' }}
            />
          </View>
        </View>

        {/* 저장 & 닫기 버튼 */}
        <TouchableOpacity style={styles.saveButton} onPress={handleClose}>
          <Text style={styles.saveButtonText}>설정 저장 및 닫기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>취소 (router.back())</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const PURPLE = '#8E44AD';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F0FF' },
  container: { padding: 16, gap: 14 },

  infoCard: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    padding: 14,
  },
  infoTitle: { fontSize: 14, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
  infoText: { fontSize: 12, color: '#DCC8FF', lineHeight: 20 },

  section: { backgroundColor: '#fff', borderRadius: 14, padding: 16 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3EEFF',
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  settingIcon: { fontSize: 22 },
  settingLabel: { fontSize: 14, color: '#333', fontWeight: '600' },
  settingValue: { fontSize: 12, color: '#999', marginTop: 2 },
  settingArrow: { fontSize: 20, color: '#CCC' },

  sliderRow: { paddingVertical: 12 },
  sliderLabel: { fontSize: 13, color: '#666', marginBottom: 10 },
  secondsBtns: { flexDirection: 'row', gap: 8 },
  secBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  secBtnActive: { backgroundColor: PURPLE },
  secBtnText: { fontSize: 13, color: '#666', fontWeight: '600' },
  secBtnTextActive: { color: '#fff' },

  qualityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: '#FAFAFA',
  },
  qualityRowActive: { backgroundColor: '#F3EEFF', borderWidth: 1.5, borderColor: PURPLE },
  qualityLabel: { fontSize: 14, color: '#333', fontWeight: '600', marginBottom: 2 },
  qualityLabelActive: { color: PURPLE },
  qualityDesc: { fontSize: 12, color: '#999' },
  checkmark: { fontSize: 18, color: PURPLE, fontWeight: 'bold' },

  saveButton: {
    backgroundColor: PURPLE,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },

  closeButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  closeButtonText: { color: '#666', fontSize: 14 },
});
