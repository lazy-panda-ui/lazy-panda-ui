import React from 'react';
import { View, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  style?: ViewStyle;
  borderRadius?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = 20, style, borderRadius }) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles(theme).skeleton,
        { width, height, borderRadius: borderRadius ?? theme.borderRadius } as ViewStyle,
        style,
      ]}
    />
  );
};

const styles = (theme: any) => StyleSheet.create({
  skeleton: {
    backgroundColor: theme.colors.border,
    opacity: 0.5,
  },
});
