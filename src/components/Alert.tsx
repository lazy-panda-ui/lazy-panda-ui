import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Theme } from '../theme/ThemeProvider';

export type AlertType = 'success' | 'info' | 'warning' | 'error';
export interface AlertProps {
  message: string;
  type?: AlertType;
  style?: ViewStyle;
}

const getTypeColor = (theme: Theme, type: AlertType) => {
  switch (type) {
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'error':
      return theme.colors.error;
    case 'info':
    default:
      return theme.colors.info;
  }
};

export const Alert: React.FC<AlertProps> = ({ message, type = 'info', style }) => {
  const theme = useTheme();
  return (
    <View style={[styles(theme, type).container, style]}>
      <Text style={styles(theme, type).text}>{message}</Text>
    </View>
  );
};

const styles = (theme: Theme, type: AlertType) => StyleSheet.create({
  container: {
    backgroundColor: getTypeColor(theme, type),
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginVertical: theme.spacing.sm,
  },
  text: {
    color: '#fff',
    fontWeight: theme.fontWeight.medium,
    fontSize: theme.fontSize.body1,
  },
});
