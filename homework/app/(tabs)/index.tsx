import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.content}>
      <Text>
        기본 진입점 화면. 모듈화 작업 시 components 폴더 아래에 추가. 용도를
        구분하기 위해 새로운 폴더를 만들고 그 아래에 추가해도 상관없음.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
