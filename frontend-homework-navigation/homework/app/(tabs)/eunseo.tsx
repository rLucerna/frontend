
import {View, Text, StyleSheet, Modal} from 'react-native' 
import { useRouter} from 'expo-router';



export default function eunseoScreen() {

    return (
        <View style={styles.content}>
            <Text>
                은서 화면. 이 tab 화면을 기준으로 modal이나 stack을 쌓아 주세요 
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
