/**
 * 종합 실습 화면 — API + Zustand 연동
 *
 * API 호출로 데이터를 가져와 Zustand Store에 저장하고,
 * 화면에 표시하는 종합 실습 화면입니다.
 *
 * 학습 포인트:
 *   - useEffect + Store 액션으로 화면 진입 시 데이터 로딩
 *   - loading / error / data 3가지 상태에 따른 UI 분기
 *   - Store의 데이터를 FlatList로 렌더링
 *   - 유저 추가/삭제 액션 실행
 */

import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import useUserStore from "../../store/useUserStore";
import useCounterStore from "../../store/useCounterStore";

export default function CombinedPracticeScreen() {
  // ── User Store에서 상태와 액션 가져오기 ──
  const users = useUserStore((state) => state.users);
  const loading = useUserStore((state) => state.loading);
  const error = useUserStore((state) => state.error);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const addUser = useUserStore((state) => state.addUser);
  const deleteUser = useUserStore((state) => state.deleteUser);

  // ── Counter Store에서도 데이터 가져오기 (전역 상태 공유 확인용) ──
  const count = useCounterStore((state) => state.count);

  // ── 새 유저 입력 폼 상태 (로컬 상태) ──
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // ── 화면이 처음 나타날 때 유저 목록을 가져옵니다 ──
  useEffect(() => {
    fetchUsers();
  }, []);

  // ── 새 유저 추가 핸들러 ──
  const handleAddUser = async () => {
    if (!newName.trim() || !newEmail.trim()) {
      Alert.alert("입력 오류", "이름과 이메일을 모두 입력해주세요.");
      return;
    }

    await addUser({
      name: newName,
      email: newEmail,
      phone: "010-0000-0000",
      company: { name: "스터디" },
    });

    // 입력 필드 초기화
    setNewName("");
    setNewEmail("");
  };

  // ── 유저 삭제 핸들러 ──
  const handleDeleteUser = (id: number, name: string) => {
    Alert.alert("삭제 확인", `"${name}"을(를) 삭제하시겠습니까?`, [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => deleteUser(id),
      },
    ]);
  };

  // ── 로딩 중 UI ──
  if (loading && users.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>유저 목록을 불러오는 중...</Text>
      </View>
    );
  }

  // ── 에러 UI ──
  if (error && users.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchUsers}>
          <Text style={styles.retryButtonText}>다시 시도</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 상단: 전역 상태 공유 확인 */}
      <View style={styles.sharedStateBox}>
        <Text style={styles.sharedStateText}>
          Zustand 탭의 카운터 값: {count}
        </Text>
        <Text style={styles.sharedStateHint}>
          다른 탭에서 변경한 값이 여기서도 보입니다!
        </Text>
      </View>

      {/* 유저 추가 폼 */}
      <View style={styles.formBox}>
        <Text style={styles.formTitle}>새 유저 추가 (POST 요청)</Text>
        <TextInput
          style={styles.input}
          placeholder="이름"
          value={newName}
          onChangeText={setNewName}
        />
        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={newEmail}
          onChangeText={setNewEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddUser}
          disabled={loading}
        >
          <Text style={styles.addButtonText}>
            {loading ? "추가 중..." : "유저 추가"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 유저 목록 */}
      <Text style={styles.listTitle}>유저 목록 ({users.length}명)</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
              {item.company && (
                <Text style={styles.userCompany}>{item.company.name}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteUser(item.id, item.name)}
            >
              <Text style={styles.deleteButtonText}>삭제</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  errorText: {
    color: "#E74C3C",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  sharedStateBox: {
    margin: 16,
    padding: 12,
    backgroundColor: "#EBF5FB",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#AED6F1",
  },
  sharedStateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2980B9",
  },
  sharedStateHint: {
    fontSize: 12,
    color: "#5DADE2",
    marginTop: 4,
  },
  formBox: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#2ECC71",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 4,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  userCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
  },
  userEmail: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  userCompany: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
