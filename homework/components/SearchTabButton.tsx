import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface SearchTabButtonProps {
    label: string;
    isActive: boolean;
    onPress: () => void;
}

export function SearchTabButton({ label, isActive, onPress }: SearchTabButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={onPress}>
                <Text style={[styles.tabText, isActive&&styles.activeTabText]}>
                    {label}
                </Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    tab: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#007AFF',
    },
    tabText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#007AFF',
    },

})