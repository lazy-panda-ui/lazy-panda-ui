import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Theme } from '../theme';

export interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  maxWidth?: number;
  padding?: keyof Theme['spacing'];
}

const defaultProps = {
  maxWidth: 1200,
  padding: 'lg' as const,
};

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  maxWidth = defaultProps.maxWidth,
  padding = defaultProps.padding,
}) => {
  const theme = useTheme();
  return (
    <View style={[styles(theme, maxWidth, padding).container, style]}>{children}</View>
  );
};

const styles = (theme: Theme, maxWidth: number, padding: keyof Theme['spacing']) => StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: maxWidth,
    alignSelf: 'center',
    paddingHorizontal: theme.spacing[padding],
  },
});
