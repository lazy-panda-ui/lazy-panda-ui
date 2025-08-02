import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Theme } from '../theme/ThemeProvider';

export interface AppBarProps {
  title: string;
  style?: ViewStyle;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export const AppBar: React.FC<AppBarProps> = ({ title, style, left, right }) => {
  const theme = useTheme();
  return (
    <View style={[styles(theme).container, style]}>
      <View style={styles(theme).side}>{left}</View>
      <Text style={styles(theme).title}>{title}</Text>
      <View style={styles(theme).side}>{right}</View>
    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    elevation: 4,
  },
  title: {
    color: '#fff',
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.h4,
    flex: 1,
    textAlign: 'center',
  },
  side: {
    width: theme.sizing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
