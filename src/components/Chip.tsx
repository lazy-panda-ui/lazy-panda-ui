import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme, Theme } from '../theme/ThemeProvider';
import { getColorByVariant, getSizeStyles } from '../utils/themeHelpers';

export type ChipVariant = 'filled' | 'outlined' | 'tonal';
export type ChipSize = 'small' | 'medium' | 'large';

export interface ChipProps {
  label: string;
  onPress?: () => void;
  selected?: boolean;
  variant?: ChipVariant;
  size?: ChipSize;
  disabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export const Chip: React.FC<ChipProps> = ({ 
  label, 
  onPress, 
  selected, 
  variant = 'outlined',
  size = 'medium',
  disabled = false,
  style,
  labelStyle
}) => {
  const theme = useTheme();
  const variantColors = getColorByVariant(theme, variant, disabled);
  const sizeStyles = getSizeStyles(size, theme);

  const chipStyle = [
    styles(theme).chip,
    {
      backgroundColor: selected ? variantColors.background : variantColors.surface,
      borderColor: variantColors.border,
      ...sizeStyles,
    },
    disabled && styles(theme).disabled,
    style,
  ];

  const textStyle = [
    styles(theme).label,
    {
      color: selected ? variantColors.onBackground : variantColors.onSurface,
      fontSize: sizeStyles.fontSize,
    },
    disabled && styles(theme).disabledText,
    labelStyle,
  ];

  return (
    <TouchableOpacity
      style={chipStyle}
      onPress={onPress}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled || !onPress}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing.xs,
  },
  selected: {
    backgroundColor: theme.colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    fontWeight: theme.fontWeight.medium,
  },
  disabledText: {
    color: theme.colors.disabled,
  },
});
