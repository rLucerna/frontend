/**
 * API 실습 화면
 *
 * JSONPlaceholder의 /posts 엔드포인트를 사용하여
 * GET, POST, PUT, PATCH, DELETE 메서드를 실습합니다.
 *
 * JSONPlaceholder: https://jsonplaceholder.typicode.com
 *   - 무료 연습용 가짜(Fake) REST API 서버
 *   - POST/PUT/DELETE는 실제로 데이터가 저장되지는 않지만,
 *     실제 서버처럼 응답을 반환합니다 (학습 용도로 적합)
 *
 * 학습 포인트:
 *   - 메서드별 역할 차이 직접 확인 (GET, POST, PUT, PATCH, DELETE)
 *   - URL, Headers, Body가 실제로 어떻게 구성되는지 확인
 *   - 입력값을 바꾸면 코드 미리보기가 실시간으로 업데이트됨
 *   - 응답 결과(response body)를 직접 확인
 */

import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// ────────────────────────────────────────────────────────────
// 타입 정의
// ────────────────────────────────────────────────────────────

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// 입력 필드 한 개의 정의
interface FieldDef {
  key: string;
  label: string;
  placeholder: string;
  defaultValue: string;
  multiline?: boolean;
  group: "경로 파라미터" | "쿼리 파라미터" | "요청 바디";
}

// 메서드 버튼 한 개의 설정 전체
interface MethodConfig {
  id: string;
  method: HttpMethod;
  title: string;
  shortDescription: string; // 버튼에 표시되는 짧은 설명
  fullDescription: string;  // 모달에 표시되는 상세 설명
  fields: FieldDef[];
  // 현재 입력값들을 받아서 각각을 반환하는 함수들
  getUrl: (v: Record<string, string>) => string;
  getHeaders: () => Record<string, string>;
  getBody: (v: Record<string, string>) => Record<string, any> | null;
  getCodeSnippet: (v: Record<string, string>) => string;
  execute: (v: Record<string, string>) => Promise<any>;
}

// ────────────────────────────────────────────────────────────
// 메서드별 설정 목록
// ────────────────────────────────────────────────────────────

const METHOD_CONFIGS: MethodConfig[] = [
  // ── 1. GET - 목록 조회 ─────────────────────────────────────
  {
    id: "get-list",
    method: "GET",
    title: "목록 조회",
    shortDescription: "게시글 목록을 가져옵니다",
    fullDescription:
      "게시글 전체 목록을 가져옵니다. 쿼리 파라미터로 개수 제한이나 특정 유저의 게시글만 필터링할 수 있습니다.",
    fields: [
      {
        key: "_limit",
        label: "가져올 개수 (_limit)",
        placeholder: "예: 5",
        defaultValue: "5",
        group: "쿼리 파라미터",
      },
      {
        key: "userId",
        label: "유저 ID 필터 (userId, 선택)",
        placeholder: "예: 1 — 비워두면 전체 조회",
        defaultValue: "",
        group: "쿼리 파라미터",
      },
    ],
    getUrl: (v) => {
      const params: string[] = [];
      if (v._limit) params.push(`_limit=${v._limit}`);
      if (v.userId) params.push(`userId=${v.userId}`);
      return `${BASE_URL}/posts${params.length ? "?" + params.join("&") : ""}`;
    },
    getHeaders: () => ({}),
    getBody: () => null,
    getCodeSnippet: (v) => {
      const hasParams = v._limit || v.userId;
      const paramLines: string[] = [];
      if (v._limit) paramLines.push(`    _limit: "${v._limit}",`);
      if (v.userId) paramLines.push(`    userId: "${v.userId}",`);
      return [
        `const response = await axios.get(`,
        `  "${BASE_URL}/posts"${hasParams ? "," : ""}`,
        ...(hasParams
          ? [`  {`, `    params: {`, ...paramLines, `    },`, `  }`]
          : []),
        `);`,
        ``,
        `// response.data 에 배열로 담겨 옵니다`,
        `console.log(response.data);`,
      ].join("\n");
    },
    execute: async (v) => {
      const params: Record<string, string> = {};
      if (v._limit) params._limit = v._limit;
      if (v.userId) params.userId = v.userId;
      const res = await axios.get(`${BASE_URL}/posts`, { params });
      return res.data;
    },
  },

  // ── 2. GET - 단건 조회 ─────────────────────────────────────
  {
    id: "get-single",
    method: "GET",
    title: "단건 조회",
    shortDescription: "특정 ID의 게시글 1개를 가져옵니다",
    fullDescription:
      "URL 경로에 조회할 게시글의 ID를 포함하여 특정 게시글 1개를 가져옵니다. (1~100 사이의 ID를 사용하세요)",
    fields: [
      {
        key: "id",
        label: "게시글 ID",
        placeholder: "예: 1",
        defaultValue: "1",
        group: "경로 파라미터",
      },
    ],
    getUrl: (v) => `${BASE_URL}/posts/${v.id || "1"}`,
    getHeaders: () => ({}),
    getBody: () => null,
    getCodeSnippet: (v) =>
      [
        `const response = await axios.get(`,
        `  "${BASE_URL}/posts/${v.id || "1"}"`,
        `);`,
        ``,
        `console.log(response.data);`,
      ].join("\n"),
    execute: async (v) => {
      const res = await axios.get(`${BASE_URL}/posts/${v.id || "1"}`);
      return res.data;
    },
  },

  // ── 3. POST - 생성 ─────────────────────────────────────────
  {
    id: "post-create",
    method: "POST",
    title: "생성",
    shortDescription: "새 게시글을 생성합니다",
    fullDescription:
      "새 게시글을 생성합니다. 요청 바디에 title, body, userId를 담아 전송하며, 서버가 새로 만들어진 게시글(id 포함)을 응답으로 돌려줍니다.\n\n※ JSONPlaceholder는 연습용 서버라 실제로 저장되지는 않지만, 실제와 동일한 응답을 반환합니다.",
    fields: [
      {
        key: "title",
        label: "제목 (title)",
        placeholder: "예: 새 게시글 제목",
        defaultValue: "새 게시글 제목",
        group: "요청 바디",
      },
      {
        key: "body",
        label: "내용 (body)",
        placeholder: "예: 게시글 내용입니다.",
        defaultValue: "게시글 내용입니다.",
        multiline: true,
        group: "요청 바디",
      },
      {
        key: "userId",
        label: "작성자 ID (userId)",
        placeholder: "예: 1",
        defaultValue: "1",
        group: "요청 바디",
      },
    ],
    getUrl: () => `${BASE_URL}/posts`,
    getHeaders: () => ({ "Content-Type": "application/json" }),
    getBody: (v) => ({
      title: v.title,
      body: v.body,
      userId: Number(v.userId) || 1,
    }),
    getCodeSnippet: (v) =>
      [
        `const response = await axios.post(`,
        `  "${BASE_URL}/posts",`,
        `  {`,
        `    title: "${v.title}",`,
        `    body: "${v.body}",`,
        `    userId: ${v.userId || "1"},`,
        `  }`,
        `);`,
        ``,
        `// 201 Created — 생성된 게시글이 응답으로 옵니다`,
        `console.log(response.data);`,
        `console.log(response.status); // 201`,
      ].join("\n"),
    execute: async (v) => {
      const res = await axios.post(`${BASE_URL}/posts`, {
        title: v.title,
        body: v.body,
        userId: Number(v.userId) || 1,
      });
      return res.data;
    },
  },

  // ── 4. PUT - 전체 수정 ─────────────────────────────────────
  {
    id: "put-update",
    method: "PUT",
    title: "전체 수정",
    shortDescription: "게시글의 모든 필드를 교체합니다",
    fullDescription:
      "특정 게시글의 데이터를 통째로 교체합니다. 수정하지 않는 필드도 모두 포함해서 보내야 합니다. 보내지 않은 필드는 사라질 수 있습니다.\n\nPATCH와의 차이: PUT은 전체 교체, PATCH는 일부만 수정",
    fields: [
      {
        key: "id",
        label: "게시글 ID",
        placeholder: "예: 1",
        defaultValue: "1",
        group: "경로 파라미터",
      },
      {
        key: "title",
        label: "제목 (title)",
        placeholder: "예: PUT으로 수정한 제목",
        defaultValue: "PUT으로 수정한 제목",
        group: "요청 바디",
      },
      {
        key: "body",
        label: "내용 (body)",
        placeholder: "예: PUT으로 수정한 내용입니다.",
        defaultValue: "PUT으로 수정한 내용입니다.",
        multiline: true,
        group: "요청 바디",
      },
      {
        key: "userId",
        label: "작성자 ID (userId)",
        placeholder: "예: 1",
        defaultValue: "1",
        group: "요청 바디",
      },
    ],
    getUrl: (v) => `${BASE_URL}/posts/${v.id || "1"}`,
    getHeaders: () => ({ "Content-Type": "application/json" }),
    getBody: (v) => ({
      title: v.title,
      body: v.body,
      userId: Number(v.userId) || 1,
    }),
    getCodeSnippet: (v) =>
      [
        `const response = await axios.put(`,
        `  "${BASE_URL}/posts/${v.id || "1"}",`,
        `  {`,
        `    title: "${v.title}",`,
        `    body: "${v.body}",`,
        `    userId: ${v.userId || "1"},`,
        `  }`,
        `);`,
        ``,
        `// 모든 필드가 교체된 게시글이 응답으로 옵니다`,
        `console.log(response.data);`,
      ].join("\n"),
    execute: async (v) => {
      const res = await axios.put(`${BASE_URL}/posts/${v.id || "1"}`, {
        title: v.title,
        body: v.body,
        userId: Number(v.userId) || 1,
      });
      return res.data;
    },
  },

  // ── 5. PATCH - 부분 수정 ───────────────────────────────────
  {
    id: "patch-update",
    method: "PATCH",
    title: "부분 수정",
    shortDescription: "게시글의 일부 필드만 수정합니다",
    fullDescription:
      "특정 게시글의 일부 필드만 수정합니다. 수정할 필드만 요청 바디에 포함하면 됩니다. 나머지 필드는 기존 값이 그대로 유지됩니다.\n\nPUT과의 차이: PUT은 전체 교체, PATCH는 일부만 수정",
    fields: [
      {
        key: "id",
        label: "게시글 ID",
        placeholder: "예: 1",
        defaultValue: "1",
        group: "경로 파라미터",
      },
      {
        key: "title",
        label: "새 제목 (title만 수정)",
        placeholder: "예: PATCH로 수정한 제목",
        defaultValue: "PATCH로 수정한 제목",
        group: "요청 바디",
      },
    ],
    getUrl: (v) => `${BASE_URL}/posts/${v.id || "1"}`,
    getHeaders: () => ({ "Content-Type": "application/json" }),
    getBody: (v) => ({ title: v.title }),
    getCodeSnippet: (v) =>
      [
        `// title 필드만 수정 — 나머지는 기존 값 유지`,
        `const response = await axios.patch(`,
        `  "${BASE_URL}/posts/${v.id || "1"}",`,
        `  {`,
        `    title: "${v.title}",`,
        `  }`,
        `);`,
        ``,
        `console.log(response.data);`,
      ].join("\n"),
    execute: async (v) => {
      const res = await axios.patch(`${BASE_URL}/posts/${v.id || "1"}`, {
        title: v.title,
      });
      return res.data;
    },
  },

  // ── 6. DELETE - 삭제 ───────────────────────────────────────
  {
    id: "delete",
    method: "DELETE",
    title: "삭제",
    shortDescription: "게시글을 삭제합니다",
    fullDescription:
      "특정 게시글을 삭제합니다. Body 없이 URL에 ID만 포함하여 요청합니다. 성공하면 빈 객체 {}를 응답하며 상태 코드는 200입니다.",
    fields: [
      {
        key: "id",
        label: "게시글 ID",
        placeholder: "예: 1",
        defaultValue: "1",
        group: "경로 파라미터",
      },
    ],
    getUrl: (v) => `${BASE_URL}/posts/${v.id || "1"}`,
    getHeaders: () => ({}),
    getBody: () => null,
    getCodeSnippet: (v) =>
      [
        `const response = await axios.delete(`,
        `  "${BASE_URL}/posts/${v.id || "1"}"`,
        `);`,
        ``,
        `// 성공 시 빈 객체 {} 응답, 상태 코드 200`,
        `console.log(response.data);   // {}`,
        `console.log(response.status); // 200`,
      ].join("\n"),
    execute: async (v) => {
      const res = await axios.delete(`${BASE_URL}/posts/${v.id || "1"}`);
      return res.data;
    },
  },
];

// ────────────────────────────────────────────────────────────
// 메서드별 색상
// ────────────────────────────────────────────────────────────

const METHOD_COLORS: Record<HttpMethod, { bg: string; light: string }> = {
  GET:    { bg: "#2ECC71", light: "#f0fff4" },
  POST:   { bg: "#3498DB", light: "#f0f7ff" },
  PUT:    { bg: "#E67E22", light: "#fff8f0" },
  PATCH:  { bg: "#9B59B6", light: "#fdf5ff" },
  DELETE: { bg: "#E74C3C", light: "#fff5f5" },
};

// ────────────────────────────────────────────────────────────
// 컴포넌트
// ────────────────────────────────────────────────────────────

export default function ApiPracticeScreen() {
  // 현재 모달에 열려있는 메서드 설정
  const [activeConfig, setActiveConfig] = useState<MethodConfig | null>(null);
  // 각 입력 필드의 현재 값
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  // API 실행 상태
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── 모달 열기: 해당 메서드의 기본값으로 inputs 초기화 ──
  const openModal = (config: MethodConfig) => {
    const defaults: Record<string, string> = {};
    config.fields.forEach((f) => {
      defaults[f.key] = f.defaultValue;
    });
    setFieldValues(defaults);
    setResponse(null);
    setError(null);
    setActiveConfig(config);
  };

  // ── 모달 닫기 ──
  const closeModal = () => {
    setActiveConfig(null);
    setResponse(null);
    setError(null);
    setLoading(false);
  };

  // ── 입력값 변경 핸들러 ──
  const updateField = (key: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
  };

  // ── API 실행 ──
  const handleExecute = async () => {
    if (!activeConfig) return;
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const data = await activeConfig.execute(fieldValues);
      setResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      if (err.response) {
        // HTTP 에러 응답 (4xx, 5xx)
        setError(
          `HTTP ${err.response.status} ${err.response.statusText}\n\n` +
            JSON.stringify(err.response.data, null, 2)
        );
      } else if (err.request) {
        // 요청은 보냈으나 응답 없음 (네트워크 문제)
        setError("서버로부터 응답이 없습니다.\n인터넷 연결을 확인하세요.");
      } else {
        // 요청 설정 자체의 오류
        setError(`요청 중 오류가 발생했습니다:\n${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // fields를 group별로 묶기
  const groupFields = (fields: FieldDef[]) => {
    const map: Record<string, FieldDef[]> = {};
    fields.forEach((f) => {
      if (!map[f.group]) map[f.group] = [];
      map[f.group].push(f);
    });
    return Object.entries(map);
  };

  // ────────────────────────────────────────────────────────────
  // 렌더링
  // ────────────────────────────────────────────────────────────

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <Text style={styles.screenTitle}>API 호출 실습</Text>
      <Text style={styles.screenSubtitle}>
        대상: JSONPlaceholder /posts (GET, POST, PUT, PATCH, DELETE)
      </Text>
      <Text style={styles.screenHint}>
        버튼을 눌러 코드 미리보기, 요청 구조, 실행 결과를 확인하세요
      </Text>

      {/* 메서드 버튼 목록 */}
      <View style={styles.buttonList}>
        {METHOD_CONFIGS.map((config) => {
          const color = METHOD_COLORS[config.method];
          return (
            <TouchableOpacity
              key={config.id}
              style={[styles.methodButton, { backgroundColor: color.bg }]}
              onPress={() => openModal(config)}
              activeOpacity={0.8}
            >
              <View style={styles.methodButtonLeft}>
                <View style={styles.methodBadgeWrap}>
                  <Text style={styles.methodBadgeText}>{config.method}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.methodButtonTitle}>{config.title}</Text>
                  <Text style={styles.methodButtonDesc} numberOfLines={1}>
                    {config.shortDescription}
                  </Text>
                </View>
              </View>
              <Text style={styles.methodButtonArrow}>›</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 팝업 모달 */}
      <Modal
        visible={activeConfig !== null}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        {/* 어두운 배경 컨테이너 */}
        <View style={styles.backdrop}>
          {/* 배경 탭 영역 — absoluteFill로 깔아서 카드 바깥 탭 시 닫힘 */}
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={closeModal}
          />
          {/* 팝업 카드 — 일반 View라서 ScrollView 터치 이벤트가 막히지 않음 */}
          <View style={styles.card}>
            {activeConfig && (
              <>
                {/* 카드 헤더 */}
                <View
                  style={[
                    styles.cardHeader,
                    { backgroundColor: METHOD_COLORS[activeConfig.method].bg },
                  ]}
                >
                  <View style={styles.cardHeaderBadge}>
                    <Text style={styles.cardHeaderBadgeText}>
                      {activeConfig.method}
                    </Text>
                  </View>
                  <Text style={styles.cardHeaderTitle}>
                    {activeConfig.title}
                  </Text>
                  <TouchableOpacity onPress={closeModal} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Text style={styles.closeBtn}>✕</Text>
                  </TouchableOpacity>
                </View>

                {/* 스크롤 가능한 내용 */}
                <ScrollView
                  style={styles.cardBody}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  {/* 설명 */}
                  <Text style={styles.cardDescription}>
                    {activeConfig.fullDescription}
                  </Text>

                  {/* ── 코드 미리보기 ── */}
                  <SectionLabel>코드 미리보기</SectionLabel>
                  <View style={styles.codeBlock}>
                    <Text style={styles.codeText}>
                      {activeConfig.getCodeSnippet(fieldValues)}
                    </Text>
                  </View>

                  {/* ── 요청 정보 ── */}
                  <SectionLabel>요청 정보</SectionLabel>
                  <View style={styles.infoTable}>
                    <InfoRow
                      label="URL"
                      value={activeConfig.getUrl(fieldValues)}
                      mono
                    />
                    <InfoRow
                      label="Method"
                      value={activeConfig.method}
                      mono
                      last={
                        Object.keys(activeConfig.getHeaders()).length === 0 &&
                        activeConfig.getBody(fieldValues) === null
                      }
                    />
                    {Object.entries(activeConfig.getHeaders()).map(
                      ([k, val], i, arr) => (
                        <InfoRow
                          key={k}
                          label={i === 0 ? "Headers" : ""}
                          value={`${k}: ${val}`}
                          mono
                          last={
                            i === arr.length - 1 &&
                            activeConfig.getBody(fieldValues) === null
                          }
                        />
                      )
                    )}
                    {activeConfig.getBody(fieldValues) !== null && (
                      <InfoRow
                        label="Body"
                        value={JSON.stringify(
                          activeConfig.getBody(fieldValues),
                          null,
                          2
                        )}
                        mono
                        last
                      />
                    )}
                  </View>

                  {/* ── 입력값 ── */}
                  {activeConfig.fields.length > 0 && (
                    <>
                      <SectionLabel>입력값 수정</SectionLabel>
                      <Text style={styles.inputHint}>
                        값을 바꾸면 위의 코드 미리보기와 요청 정보가 실시간으로 업데이트됩니다
                      </Text>
                      {groupFields(activeConfig.fields).map(
                        ([groupName, fields]) => (
                          <View key={groupName}>
                            <Text style={styles.inputGroupLabel}>
                              {groupName}
                            </Text>
                            {fields.map((field) => (
                              <View key={field.key} style={styles.inputWrap}>
                                <Text style={styles.inputLabel}>
                                  {field.label}
                                </Text>
                                <TextInput
                                  style={[
                                    styles.input,
                                    field.multiline && styles.inputMultiline,
                                  ]}
                                  value={fieldValues[field.key] ?? ""}
                                  onChangeText={(t) =>
                                    updateField(field.key, t)
                                  }
                                  placeholder={field.placeholder}
                                  placeholderTextColor="#aaa"
                                  multiline={field.multiline}
                                  textAlignVertical={
                                    field.multiline ? "top" : "center"
                                  }
                                />
                              </View>
                            ))}
                          </View>
                        )
                      )}
                    </>
                  )}

                  {/* ── 실행 버튼 ── */}
                  <TouchableOpacity
                    style={[
                      styles.execButton,
                      {
                        backgroundColor:
                          METHOD_COLORS[activeConfig.method].bg,
                      },
                    ]}
                    onPress={handleExecute}
                    disabled={loading}
                    activeOpacity={0.8}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.execButtonText}>실행하기</Text>
                    )}
                  </TouchableOpacity>

                  {/* ── 응답 결과 ── */}
                  <SectionLabel>응답 결과 (Response Body)</SectionLabel>
                  <View
                    style={[
                      styles.responseBox,
                      response
                        ? {
                            borderColor:
                              METHOD_COLORS[activeConfig.method].bg,
                            backgroundColor:
                              METHOD_COLORS[activeConfig.method].light,
                          }
                        : styles.responseEmpty,
                    ]}
                  >
                    {loading ? (
                      <View style={styles.responseLoading}>
                        <ActivityIndicator
                          color={METHOD_COLORS[activeConfig.method].bg}
                        />
                        <Text style={styles.responseLoadingText}>
                          응답을 기다리는 중...
                        </Text>
                      </View>
                    ) : response ? (
                      <Text style={styles.responseText}>{response}</Text>
                    ) : (
                      <Text style={styles.responsePlaceholder}>
                        실행 버튼을 누르면 응답 결과가 여기에 표시됩니다
                      </Text>
                    )}
                  </View>

                  {/* ── 오류 메세지 ── */}
                  {error && (
                    <>
                      <SectionLabel>오류 메세지</SectionLabel>
                      <View style={styles.errorBox}>
                        <Text style={styles.errorLabel}>
                          ⚠ 오류가 발생했습니다
                        </Text>
                        <Text style={styles.errorText}>{error}</Text>
                      </View>
                    </>
                  )}

                  <View style={{ height: 24 }} />
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// ────────────────────────────────────────────────────────────
// 보조 컴포넌트
// ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return <Text style={styles.sectionLabel}>{children}</Text>;
}

function InfoRow({
  label,
  value,
  mono = false,
  last = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  last?: boolean;
}) {
  return (
    <View style={[styles.infoRow, last && styles.infoRowLast]}>
      <Text style={styles.infoKey}>{label}</Text>
      <Text style={[styles.infoVal, mono && styles.infoValMono]}>
        {value}
      </Text>
    </View>
  );
}

// ────────────────────────────────────────────────────────────
// 스타일
// ────────────────────────────────────────────────────────────

const MONO_FONT = Platform.OS === "ios" ? "Menlo" : "monospace";

const styles = StyleSheet.create({
  // ── 메인 화면 ──
  screen: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  screenContent: {
    padding: 16,
    paddingBottom: 40,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  screenHint: {
    fontSize: 12,
    color: "#999",
    marginBottom: 20,
  },

  // ── 메서드 버튼 ──
  buttonList: {
    gap: 10,
  },
  methodButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 14,
  },
  methodButtonLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  methodBadgeWrap: {
    backgroundColor: "rgba(0,0,0,0.18)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 64,
    alignItems: "center",
  },
  methodBadgeText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 0.5,
  },
  methodButtonTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 2,
  },
  methodButtonDesc: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
  },
  methodButtonArrow: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 24,
    fontWeight: "300",
    marginLeft: 8,
  },

  // ── 모달 배경 ──
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  // ── 팝업 카드 ──
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    width: "100%",
    maxHeight: "90%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  cardHeaderBadge: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  cardHeaderBadgeText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 0.5,
  },
  cardHeaderTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    flex: 1,
  },
  closeBtn: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 20,
    fontWeight: "600",
  },
  cardBody: {
    flexGrow: 1,
  },
  cardDescription: {
    margin: 16,
    marginBottom: 8,
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 14,
  },

  // ── 섹션 레이블 ──
  sectionLabel: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    fontSize: 11,
    fontWeight: "700",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  // ── 코드 블록 ──
  codeBlock: {
    marginHorizontal: 16,
    backgroundColor: "#1e1e2e",
    borderRadius: 10,
    padding: 14,
  },
  codeText: {
    fontFamily: MONO_FONT,
    fontSize: 12,
    color: "#cdd6f4",
    lineHeight: 20,
  },

  // ── 요청 정보 테이블 ──
  infoTable: {
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e9ecef",
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "flex-start",
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoKey: {
    width: 64,
    fontSize: 11,
    fontWeight: "700",
    color: "#999",
    paddingTop: 2,
    textTransform: "uppercase",
  },
  infoVal: {
    flex: 1,
    fontSize: 12,
    color: "#333",
    lineHeight: 18,
  },
  infoValMono: {
    fontFamily: MONO_FONT,
  },

  // ── 입력 필드 ──
  inputHint: {
    marginHorizontal: 16,
    marginBottom: 10,
    fontSize: 12,
    color: "#888",
    lineHeight: 18,
  },
  inputGroupLabel: {
    marginHorizontal: 16,
    marginBottom: 6,
    fontSize: 12,
    fontWeight: "600",
    color: "#aaa",
  },
  inputWrap: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#dee2e6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    backgroundColor: "#fdfdfd",
    color: "#222",
  },
  inputMultiline: {
    minHeight: 80,
  },

  // ── 실행 버튼 ──
  execButton: {
    margin: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  execButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // ── 응답 결과 ──
  responseBox: {
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1.5,
    minHeight: 80,
  },
  responseEmpty: {
    borderColor: "#dee2e6",
    backgroundColor: "#f8f9fa",
  },
  responseText: {
    fontFamily: MONO_FONT,
    fontSize: 12,
    color: "#2d3436",
    lineHeight: 19,
  },
  responsePlaceholder: {
    textAlign: "center",
    color: "#bbb",
    fontSize: 13,
    marginTop: 14,
  },
  responseLoading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    paddingVertical: 8,
  },
  responseLoadingText: {
    color: "#888",
    fontSize: 13,
  },

  // ── 오류 메세지 ──
  errorBox: {
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1.5,
    borderColor: "#E74C3C",
    backgroundColor: "#fff5f5",
  },
  errorLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#E74C3C",
    marginBottom: 6,
  },
  errorText: {
    fontFamily: MONO_FONT,
    fontSize: 12,
    color: "#c0392b",
    lineHeight: 19,
  },
});
