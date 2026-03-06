import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface ApplyModalProps {
    visible: boolean;
    status: "success" | "failure"; // 신청 성공 or 실패
    onClose: () => void;
}

export function ApplyModal({ visible, status, onClose }: ApplyModalProps) {
    const isSuccess = status === 'success'; // 신청 성공인지 확인

    return (
        <Modal visible={visible} transparent animationType='fade'>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>

                    {/* 아이콘 */}
                    <MaterialCommunityIcons
                        name={isSuccess ? 'check-circle' : 'alert-circle'}
                        size={48}
                        color={isSuccess ? '#007AFF' : '#FF3B30'}
                        style={styles.icon}
                    />

                    {/* 제목 */}
                    <Text style={styles.modalTitle}>
                        {isSuccess ? '신청 완료' : '신청 실패'}
                    </Text>

                    {/* 메시지 */}
                    <Text style={styles.modalMessage}>
                        {isSuccess ? '신청되었습니다' : '신청되지 않았습니다'}
                    </Text>

                    {/* 버튼 */}
                    <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                        <Text style={styles.modalButtonText}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 24,
        paddingVertical: 32,
        width: '80%',
        alignItems: 'center',
    },
    icon: {
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
    },
    modalMessage: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    failureButton: {
        backgroundColor: '#FF3B30',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})