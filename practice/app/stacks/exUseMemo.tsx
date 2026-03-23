import { useState, useMemo } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function UseMemoExample() {
    const [useMemoOn, setUseMemoOn] = useState(true);
    const [numbers, setNumbers] = useState([2, 4, 6, 8, 10]);
    const [count, setCount] = useState(0);

    //useMemo 사용
    const totalWithMemo = useMemo(() => {
        if (useMemoOn) {
            Alert.alert('useMemo O', '재계산 실행');
        }
        // reduce는 값을 누적헤서 계산
        return numbers.reduce((sum, n) => sum + n, 0);
    }, [numbers, useMemoOn])



    //useMemo 사용X => 리렌더링 될때마다 실행
    const totalWithoutMemo = (() => {
        if (!useMemoOn) {
            Alert.alert('useMemo X', '재계산 실행');
        }
        return numbers.reduce((sum, n) => sum + n, 0);
    })();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>useMemo 비교</Text>
            <Text style={styles.label}>현재 state</Text>
            <Text style={styles.mode}>{useMemoOn ? 'useMemo O' : 'useMemo X'}</Text>
            <View style={styles.gap} />
            <Button
                title={`모드 전환 (현재 state : ${useMemoOn ? 'O' : 'X'})`}
                onPress={() => setUseMemoOn(s => !s)} />

            <Text style={styles.result}>합계 : {useMemoOn ? totalWithMemo : totalWithoutMemo}</Text>

            <View style={styles.gap} />
            <Text style={styles.label}>count를 올렸을 때 Alert가 울리는지 확인</Text>
            <Button
                title={`count:${count} (증가)`}
                onPress={() => {
                    setCount(c => c + 1);
                    if (!useMemoOn) Alert.alert('useMemo X', '리렌더마다 재계산됨!');
                    if (useMemoOn) Alert.alert('useMemo O', '재계산 안 함!');
                }}
            />
        </View>

    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20
    },
    label: {
        fontSize: 15,
        color: '#555',
        marginBottom: 6
    },
    result: {
        fontSize: 22,
        fontWeight: '500',
        color: '#2563eb'
    },
    gap: { height: 16 },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    mode: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2563eb',
    },
});