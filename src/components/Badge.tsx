import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Theme } from '../theme/ThemeProvider';

type BadgeVariant = 'filled' | 'outlined' | 'dot';
type BadgeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';
type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps {
  value?: string | number;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  max?: number;
  showZero?: boolean;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({ 
  value = 0,
  variant = 'filled',
  color = 'primary',
  size = 'medium',
  max = 99,
  showZero = false,
  style 
}) => {
  const theme = useTheme();

  const getColor = (color: BadgeColor) => {
    return theme.colors[color];
  };

  const getSize = (size: BadgeSize) => {
    switch (size) {
      case 'small':
        return theme.sizing.xs;
      case 'large':
        return theme.sizing.md;
      default:
        return theme.sizing.sm;
    }
  };

  const getFontSize = (size: BadgeSize) => {
    switch (size) {
      case 'small':
        return theme.fontSize.caption;
      case 'large':
        return theme.fontSize.body1;
      default:
        return theme.fontSize.body2;
    }
  };

  const displayValue = () => {
    if (typeof value === 'number') {
      if (value === 0 && !showZero) return '';
      return value > max ? `${max}+` : value.toString();
    }
    return value;
  };

  const styles = StyleSheet.create({
    container: {
      minWidth: variant === 'dot' ? getSize(size) / 2 : getSize(size),
      height: variant === 'dot' ? getSize(size) / 2 : getSize(size),
      borderRadius: theme.borderRadius.full,
      backgroundColor: variant === 'outlined' ? theme.colors.background : getColor(color),
      borderWidth: variant === 'outlined' ? theme.spacing.xs / 4 : 0,
      borderColor: getColor(color),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: variant === 'dot' ? 0 : theme.spacing.xs,
    },
    text: {
      color: variant === 'outlined' ? getColor(color) : theme.colors.background,
      fontWeight: theme.fontWeight.semibold,
      fontSize: getFontSize(size),
      display: variant === 'dot' ? 'none' : 'flex',
    },
  });

  if (value === 0 && !showZero && variant !== 'dot') return null;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{displayValue()}</Text>
    </View>
  );
};
