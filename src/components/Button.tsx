import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  ActivityIndicator,
  View,
  Platform,
  Pressable,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type ButtonVariant = 'contained' | 'outlined' | 'text' | 'tonal' | 'elevated';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor = 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'onPress'> {
  /**
   * Text content of the button
   */
  title: string;
  /**
   * Icon to show before the text
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to show after the text
   */
  rightIcon?: React.ReactNode;
  /**
   * Called when button is pressed
   */
  onPress?: () => void | Promise<void>;
  /**
   * Called when button is long pressed
   */
  onLongPress?: () => void;
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Visual variant of the button
   * @default 'contained'
   */
  variant?: ButtonVariant;
  /**
   * Size of the button
   * @default 'medium'
   */
  size?: ButtonSize;
  /**
   * Color scheme of the button
   * @default 'primary'
   */
  color?: ButtonColor;
  /**
   * Whether to show a loading indicator
   * @default false
   */
  loading?: boolean;
  /**
   * Whether to stretch button to container width
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Whether to show ripple effect on Android
   * @default true
   */
  ripple?: boolean;
  /**
   * Custom styles for the button container
   */
  style?: ViewStyle | ViewStyle[];
  /**
   * Custom styles for the button text
   */
  textStyle?: TextStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
}


export const Button: React.FC<ButtonProps> = ({
  title,
  leftIcon,
  rightIcon,
  onPress,
  onLongPress,
  disabled = false,
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  loading = false,
  fullWidth = false,
  ripple = true,
  style,
  textStyle,
  testID,
  ...touchableProps
}) => {
  const theme = useTheme();
  const [isPressed, setIsPressed] = React.useState(false);

  const handlePress = async () => {
    if (loading || disabled || !onPress) return;
    try {
      await onPress();
    } catch (error) {
      console.error('Button onPress error:', error);
    }
  };

  const getBackgroundColor = React.useCallback(() => {
    if (disabled) return theme.colors.disabled;
    if (variant === 'contained') {
      return theme.colors[color];
    }
    if (variant === 'tonal') {
      switch (color) {
        case 'primary':
          return theme.colors.primaryContainer;
        case 'secondary':
          return theme.colors.secondaryContainer;
        default:
          return `${theme.colors[color]}20`;
      }
    }
    if (variant === 'elevated') {
      return isPressed ? theme.colors.surfaceVariant : theme.colors.surface;
    }
    return 'transparent';
  }, [disabled, variant, color, isPressed, theme.colors]);

  const getTextColor = React.useCallback(() => {
    if (disabled) return theme.colors.onDisabled;
    if (variant === 'contained') {
      return theme.colors.onPrimary;
    }
    if (variant === 'tonal') {
      switch (color) {
        case 'primary':
          return theme.colors.onPrimaryContainer;
        case 'secondary':
          return theme.colors.onSecondaryContainer;
        default:
          return theme.colors[color];
      }
    }
    return theme.colors[color];
  }, [disabled, variant, color, theme.colors]);

  const getSizeStyle = React.useCallback(() => {
    switch (size) {
      case 'small':
        return {
          minHeight: 32,
          paddingHorizontal: theme.spacing.md,
          gap: theme.spacing.xs,
        };
      case 'large':
        return {
          minHeight: 48,
          paddingHorizontal: theme.spacing.xl,
          gap: theme.spacing.md,
        };
      default:
        return {
          minHeight: 40,
          paddingHorizontal: theme.spacing.lg,
          gap: theme.spacing.sm,
        };
    }
  }, [size, theme.spacing]);

  const getFontSize = React.useCallback(() => {
    switch (size) {
      case 'small':
        return theme.fontSize.caption;
      case 'large':
        return theme.fontSize.body1;
      default:
        return theme.fontSize.body2;
    }
  }, [size, theme.fontSize]);

  const getShadow = React.useCallback((): ViewStyle => {
    if (variant !== 'elevated' || disabled) return {};
    
    return Platform.select({
      ios: {
        shadowColor: theme.colors.outline,
        shadowOffset: {
          width: 0,
          height: isPressed ? 1 : 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: isPressed ? 2 : 4,
      },
      android: {
        elevation: isPressed ? 2 : 4,
      },
      default: {},
    }) || {};
  }, [variant, disabled, isPressed, theme.colors.outline]);

  const styles = React.useMemo(() => StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.md,
      backgroundColor: getBackgroundColor(),
      borderWidth: variant === 'outlined' ? 1 : 0,
      borderColor: disabled ? theme.colors.disabled : theme.colors[color],
      width: fullWidth ? '100%' : undefined,
      ...getSizeStyle(),
      ...getShadow(),
    },
    text: {
      color: getTextColor(),
      fontSize: getFontSize(),
      fontWeight: theme.fontWeight.semibold,
      textAlign: 'center',
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }), [
    theme,
    getBackgroundColor,
    variant,
    disabled,
    color,
    fullWidth,
    getSizeStyle,
    getShadow,
    getTextColor,
    getFontSize,
  ]);

  const ButtonContent = (
    <>
      {loading ? (
        <ActivityIndicator
          size={size === 'small' ? 'small' : 'large'}
          color={getTextColor()}
        />
      ) : (
        <View style={styles.iconContainer}>
          {leftIcon}
          <Text style={[styles.text, textStyle]}>{title}</Text>
          {rightIcon}
        </View>
      )}
    </>
  );

  if (Platform.OS === 'android' && ripple) {
    return (
      <Pressable
        android_ripple={{
          color: variant === 'contained' ? theme.colors.onPrimary : theme.colors[color],
          borderless: false,
        }}
        onPress={handlePress}
        onLongPress={onLongPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        disabled={disabled || loading}
        testID={testID}
        style={[styles.button, style]}
        {...touchableProps}
      >
        {ButtonContent}
      </Pressable>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handlePress}
      onLongPress={onLongPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled || loading}
      activeOpacity={0.7}
      testID={testID}
      {...touchableProps}
    >
      {ButtonContent}
    </TouchableOpacity>
  );
};
