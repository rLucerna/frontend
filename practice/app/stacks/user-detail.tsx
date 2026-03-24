/**
 * 유저 상세 화면
 *
 * 종합 실습 화면에서 유저를 선택했을 때 이동하는 상세 화면입니다.
 * Zustand Store에서 선택된 유저 데이터를 가져와 표시합니다.
 *
 * 학습 포인트:
 *   - 라우트 파라미터로 유저 ID 받기
 *   - Store 액션(fetchUserById)으로 상세 데이터 로딩
 *   - 화면 간 데이터 공유 (Store를 통해)
 */

import { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useUserStore from "../../store/useUserStore";

export default function UserDetailScreen() {
  // URL 파라미터에서 유저 ID를 가져옵니다
  const { id } = useLocalSearchParams<{ id: string }>();

  // Store에서 상태와 액션 가져오기
  const selectedUser = useUserStore((state) => state.selectedUser);
  const loading = useUserStore((state) => state.loading);
  const error = useUserStore((state) => state.error);
  const fetchUserById = useUserStore((state) => state.fetchUserById);
  const clearSelectedUser = useUserStore((state) => state.clearSelectedUser);

  // 화면 진입 시 유저 상세 정보를 가져옵니다
  useEffect(() => {
    if (id) {
      fetchUserById(Number(id));
    }

    // 화면을 떠날 때 선택된 유저를 초기화합니다 (cleanup)
    return () => {
      clearSelectedUser();
    };
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error || !selectedUser) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || "유저를 찾을 수 없습니다."}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {selectedUser.name.charAt(0)}
          </Text>
        </View>

        <Text style={styles.name}>{selectedUser.name}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>이메일</Text>
          <Text style={styles.value}>{selectedUser.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>전화번호</Text>
          <Text style={styles.value}>{selectedUser.phone}</Text>
        </View>

        {selectedUser.company && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>회사</Text>
            <Text style={styles.value}>{selectedUser.company.name}</Text>
          </View>
        )}
      </View>

      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>학습 포인트</Text>
        <Text style={styles.noteText}>
          이 화면은 URL 파라미터(id)를 받아서{"\n"}
          Store의 fetchUserById 액션을 호출합니다.{"\n"}
          Store에서 데이터를 가져오므로 props 전달이 필요 없습니다.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#E74C3C",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: {
    fontSize: 15,
    color: "#888",
    fontWeight: "500",
  },
  value: {
    fontSize: 15,
    color: "#333",
  },
  noteBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#EBF5FB",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#AED6F1",
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2980B9",
    marginBottom: 6,
  },
  noteText: {
    fontSize: 13,
    color: "#5DADE2",
    lineHeight: 20,
  },
});
