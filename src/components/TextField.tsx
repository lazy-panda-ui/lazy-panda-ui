import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TextInputProps,
  Text,
  Pressable,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type TextFieldVariant = 'outlined' | 'filled' | 'standard';
export type TextFieldSize = 'small' | 'medium' | 'large';

export interface TextFieldProps extends Omit<TextInputProps, 'placeholderTextColor'> {
  /**
   * Label text for the input
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Visual variant of the input
   * @default 'outlined'
   */
  variant?: TextFieldVariant;
  /**
   * Size of the input
   * @default 'medium'
   */
  size?: TextFieldSize;
  /**
   * Whether the input is in a loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Icon to display at the start of the input
   */
  startIcon?: React.ReactNode;
  /**
   * Icon to display at the end of the input
   */
  endIcon?: React.ReactNode;
  /**
   * Whether to show a clear button when there is text
   * @default false
   */
  clearable?: boolean;
  /**
   * Styles for the container
   */
  containerStyle?: ViewStyle;
  /**
   * Styles for the input wrapper
   */
  inputWrapperStyle?: ViewStyle;
  /**
   * Styles for the input
   */
  inputStyle?: TextStyle;
  /**
   * Styles for the label
   */
  labelStyle?: TextStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  helperText,
  variant = 'outlined',
  size = 'medium',
  loading = false,
  startIcon,
  endIcon,
  clearable = false,
  containerStyle,
  inputWrapperStyle,
  inputStyle,
  labelStyle,
  style,
  value,
  onChangeText,
  editable = true,
  testID,
  ...props
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const getBackgroundColor = () => {
    if (error) return theme.colors.error + '10';
    if (variant === 'filled') {
      return isFocused ? theme.colors.primaryContainer : theme.colors.surfaceVariant;
    }
    if (variant === 'standard') return 'transparent';
    return theme.colors.surface;
  };

  const getBorderColor = () => {
    if (error) return theme.colors.error;
    return isFocused ? theme.colors.primary : theme.colors.outline;
  };

  const getVariantStyles = () => {
    const baseStyles = {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
    };

    switch (variant) {
      case 'filled':
        return {
          ...baseStyles,
          borderWidth: 0,
          borderBottomWidth: 2,
          borderRadius: theme.borderRadius.sm,
        };
      case 'standard':
        return {
          ...baseStyles,
          borderWidth: 0,
          borderBottomWidth: 1,
          borderRadius: 0,
        };
      default: // outlined
        return {
          ...baseStyles,
          borderWidth: 1,
          borderRadius: theme.borderRadius.md,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
          fontSize: theme.fontSize.caption,
        };
      case 'large':
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          fontSize: theme.fontSize.body1,
        };
      default: // medium
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          fontSize: theme.fontSize.body2,
        };
    }
  };

  const handleClear = () => {
    onChangeText?.('');
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: theme.spacing.md,
    },
    disabled: {
      opacity: 0.6,
    },
    helperText: {
      color: error ? theme.colors.error : theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.caption,
      marginTop: theme.spacing.xs,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.xs,
    },
    input: {
      color: editable ? theme.colors.onSurface : theme.colors.disabled,
      flex: 1,
      ...getSizeStyles(),
    },
    inputWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      ...getVariantStyles(),
    },
    label: {
      color: error ? theme.colors.error : theme.colors.onSurface,
      fontSize: theme.fontSize.caption,
      fontWeight: theme.fontWeight.medium,
      marginBottom: theme.spacing.xs,
    },
  });

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      <View style={[
        styles.inputWrapper,
        !editable && styles.disabled,
        inputWrapperStyle,
      ]}>
        {startIcon && (
          <View style={styles.iconContainer}>
            {startIcon}
          </View>
        )}
        <TextInput
          style={[styles.input, inputStyle, style]}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!loading && editable}
          placeholderTextColor={theme.colors.onSurfaceVariant}
          {...props}
        />
        {loading && (
          <View style={styles.iconContainer}>
            <ActivityIndicator color={theme.colors.primary} size="small" />
          </View>
        )}
        {!loading && clearable && value && (
          <Pressable
            style={styles.iconContainer}
            onPress={handleClear}
            disabled={!editable}
          >
            {/* You can replace this with an icon component */}
            <Text>✕</Text>
          </Pressable>
        )}
        {!loading && endIcon && (
          <View style={styles.iconContainer}>
            {endIcon}
          </View>
        )}
      </View>
      {(error || helperText) && (
        <Text style={styles.helperText}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};
