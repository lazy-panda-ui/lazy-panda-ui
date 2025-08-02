import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface ToggleButtonProps {
  selected: boolean;
  onPress: () => void;
  label: string;
  style?: ViewStyle;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({ selected, onPress, label, style }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      testID="toggle-button"
      style={[
        styles(theme).button,
        selected && styles(theme).selected,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles(theme).label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = (theme: any) => StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: theme.colors.primary,
  },
  label: {
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.body1,
  },
});
