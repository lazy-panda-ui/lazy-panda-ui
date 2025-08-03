import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  Animated,
} from 'react-native';
import { useTheme, Theme } from '../theme';

export type ChipVariant = 'filled' | 'outlined' | 'tonal';
export type ChipSize = 'small' | 'medium' | 'large';

export interface ChipProps {
  /**
   * Text content of the chip
   */
  label: string;
  /**
   * Icon to show before the label
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to show after the label
   */
  rightIcon?: React.ReactNode;
  /**
   * Callback when the chip is pressed
   */
  onPress?: () => void;
  /**
   * Whether the chip is selected
   * @default false
   */
  selected?: boolean;
  /**
   * Visual variant of the chip
   * @default 'outlined'
   */
  variant?: ChipVariant;
  /**
   * Size of the chip
   * @default 'medium'
   */
  size?: ChipSize;
  /**
   * Whether the chip is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the chip is closeable
   * @default false
   */
  closeable?: boolean;
  /**
   * Callback when the close button is pressed
   */
  onClose?: () => void;
  /**
   * Additional styles for the container
   */
  style?: ViewStyle;
  /**
   * Additional styles for the label
   */
  labelStyle?: TextStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  leftIcon,
  rightIcon,
  onPress,
  selected = false,
  variant = 'outlined',
  size = 'medium',
  disabled = false,
  closeable = false,
  onClose,
  style,
  labelStyle,
  testID,
}) => {
  const theme = useTheme();
  const [pressAnim] = React.useState(new Animated.Value(1));

  const animate = (toValue: number) => {
    Animated.spring(pressAnim, {
      toValue,
      useNativeDriver: true,
    }).start();
  };

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.disabled;
    if (selected) {
      switch (variant) {
        case 'tonal':
          return theme.colors.secondaryContainer;
        case 'outlined':
          return theme.colors.surface;
        default:
          return theme.colors.primary;
      }
    }
    switch (variant) {
      case 'tonal':
        return theme.colors.surfaceVariant;
      case 'filled':
        return theme.colors.surfaceVariant;
      default:
        return theme.colors.surface;
    }
  };

  const getBorderColor = () => {
    if (disabled) return theme.colors.disabled;
    if (selected) {
      return variant === 'outlined'
        ? theme.colors.primary
        : 'transparent';
    }
    return variant === 'outlined'
      ? theme.colors.outline
      : 'transparent';
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.onDisabled;
    if (selected) {
      switch (variant) {
        case 'tonal':
          return theme.colors.onSecondaryContainer;
        case 'outlined':
          return theme.colors.primary;
        default:
          return theme.colors.onPrimary;
      }
    }
    return theme.colors.onSurface;
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 16;
      default:
        return 14;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
          minHeight: 24,
        };
      case 'large':
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          minHeight: 40,
        };
      default:
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          minHeight: 32,
        };
    }
  };

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      onPressIn={() => animate(0.96)}
      onPressOut={() => animate(1)}
      disabled={disabled}
      activeOpacity={0.7}
      testID={testID}
    >
      <Animated.View
        style={[
          styles(theme).container,
          {
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
            transform: [{ scale: pressAnim }],
          },
          getSizeStyle(),
          style,
        ]}
      >
        {leftIcon && <View style={styles(theme).icon}>{leftIcon}</View>}
        <Text
          style={[
            styles(theme).label,
            {
              color: getTextColor(),
              fontSize: getFontSize(),
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
        {rightIcon && <View style={styles(theme).icon}>{rightIcon}</View>}
        {closeable && !disabled && (
          <TouchableOpacity
            style={styles(theme).closeButton}
            onPress={onClose}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            {/* Add your close icon here */}
          </TouchableOpacity>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: theme.borderRadius.full,
  },
  label: {
    fontWeight: theme.fontWeight.medium,
  },
  icon: {
    marginRight: theme.spacing.xs,
  },
  closeButton: {
    marginLeft: theme.spacing.xs,
    padding: theme.spacing.xs,
  },
});

const styles = createStyles;
