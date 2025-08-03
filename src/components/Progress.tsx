import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Theme } from '../theme';

export interface ProgressProps {
  value: number; // 0 to 1
  style?: ViewStyle;
}

export const Progress: React.FC<ProgressProps> = ({ value, style }) => {
  const theme = useTheme();
  return (
    <View style={[styles(theme).container, style]}>
      <View style={[styles(theme).bar, { width: Math.max(0, Math.min(1, value)) * 100 + '%' as unknown as number }]} />
    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  bar: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    height: 8,
  },
  container: {
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    height: 8,
    overflow: 'hidden',
    width: '100%',
  },
});
