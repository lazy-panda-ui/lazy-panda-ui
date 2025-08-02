import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface FabProps {
  icon?: React.ReactNode;
  label?: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const Fab: React.FC<FabProps> = ({ icon, label, onPress, style }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[styles(theme).fab, style]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
    >
      {(Boolean(icon)) && <View style={styles(theme).icon}>{icon}</View>}
      {(Boolean(label)) && <Text style={styles(theme).label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = (theme: any) => StyleSheet.create({
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 28,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'absolute',
    right: 24,
    bottom: 24,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
