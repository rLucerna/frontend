import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ActivityTabButtonProps{
    label:string;
    isActive:boolean;
    onPress:()=>void;
}

export function ActivityTabButton({ label, isActive, onPress }: ActivityTabButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.tab, isActive && styles.activeTab]}
      onPress={onPress}>
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
   tab: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginHorizontal: 8,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
});