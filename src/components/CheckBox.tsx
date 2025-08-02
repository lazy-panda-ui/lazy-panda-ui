import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme, Theme } from '../theme/ThemeProvider';

export interface CheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  testID?: string;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, disabled, testID }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[styles(theme).box, checked && styles(theme).checked, disabled && styles(theme).disabled]}
      onPress={function() { return !disabled && onChange(!checked) }}
      activeOpacity={0.7}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      testID={testID}
    >
      {(Boolean(checked)) && <View style={styles(theme).indicator} />}
    </TouchableOpacity>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  checked: {
    backgroundColor: theme.colors.primary,
  },
  indicator: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  disabled: {
    opacity: 0.5,
  },
});
