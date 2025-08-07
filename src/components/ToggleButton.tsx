import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import type { Theme } from '../theme/types';

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

const styles = (theme: Theme) => StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    justifyContent: 'center',
    padding: theme.spacing.sm,
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.fontSize.body1,
    fontWeight: theme.fontWeight.semibold,
  },
  selected: {
    backgroundColor: theme.colors.primary,
  },
});
