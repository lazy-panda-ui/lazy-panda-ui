import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

type ButtonVariant = 'contained' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  testID?: string;
}


export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled,
  variant = 'contained',
  size = 'medium',
  style,
  textStyle,
  testID
}) => {
  const theme = useTheme();
  let styleArray: ViewStyle[] = [];
  if (Array.isArray(style)) {
    styleArray = style;
  } else if (style) {
    styleArray = [style];
  }

  const getPadding = (size: ButtonSize) => {
    switch (size) {
      case 'small':
        return { vertical: theme.spacing.xs, horizontal: theme.spacing.md };
      case 'large':
        return { vertical: theme.spacing.md, horizontal: theme.spacing.xl };
      default:
        return { vertical: theme.spacing.sm, horizontal: theme.spacing.lg };
    }
  };

  const getFontSize = (size: ButtonSize) => {
    switch (size) {
      case 'small':
        return theme.fontSize.body2;
      case 'large':
        return theme.fontSize.h6;
      default:
        return theme.fontSize.body1;
    }
  };

  const padding = getPadding(size);

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.md,
      minHeight: theme.sizing.md,
      backgroundColor: variant === 'contained' ? theme.colors.primary : theme.colors.background,
      borderWidth: variant === 'outlined' ? theme.spacing.xs / 2 : 0,
      borderColor: theme.colors.primary,
      paddingVertical: padding.vertical,
      paddingHorizontal: padding.horizontal,
    },
    text: {
      fontSize: getFontSize(size),
      fontWeight: theme.fontWeight.semibold,
      textAlign: 'center',
      color: variant === 'contained' ? theme.colors.background : theme.colors.primary,
    },
    disabled: {
      backgroundColor: variant === 'contained' ? theme.colors.disabled : theme.colors.background,
      borderColor: variant === 'outlined' ? theme.colors.disabled : undefined,
    },
    disabledText: {
      color: theme.colors.disabled,
    }
  });

  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? styles.disabled : undefined,
        ...styleArray,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={variant === 'contained' ? 0.7 : 0.5}
      testID={testID}
    >
      <Text style={[
        styles.text,
        disabled && styles.disabledText,
        textStyle
      ]}>{title}</Text>
    </TouchableOpacity>
  );
};
