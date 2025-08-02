import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Theme } from '../theme/ThemeProvider';

export interface PaperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: number;
}

export const Paper: React.FC<PaperProps> = ({ children, style, elevation = 2 }) => {
  const theme = useTheme();
  return (
    <View style={[styles(theme, elevation).paper, style]}>{children}</View>
  );
};

const styles = (theme: Theme, elevation: number) => StyleSheet.create({  paper: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: elevation },
    shadowOpacity: 0.1 * elevation,
    shadowRadius: 2 * elevation,
    elevation,
  },
});
