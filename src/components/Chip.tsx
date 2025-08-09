import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, View, Animated, Platform } from 'react-native';
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
  const pressAnim = React.useRef(new Animated.Value(1)).current;

  const animate = React.useCallback((toValue: number) => {
    Animated.spring(pressAnim, { toValue, useNativeDriver: true }).start();
  }, [pressAnim]);

  const sizes = theme.chip.sizes[size];

  const backgroundColor = React.useMemo((): string => {
    if (disabled) return theme.colors.disabled;
    if (selected) {
      switch (variant) {
        case 'filled':
          return theme.chip.variants.filled.selectedBackground;
        case 'outlined':
          return theme.chip.variants.outlined.selectedBackground;
        case 'tonal':
          return theme.chip.variants.tonal.selectedBackground;
      }
    }
    switch (variant) {
      case 'filled':
        return theme.chip.variants.filled.background;
      case 'outlined':
        return theme.chip.variants.outlined.background;
      case 'tonal':
        return theme.chip.variants.tonal.background;
    }
  }, [disabled, selected, variant, theme.chip.variants, theme.colors.disabled]);

  const borderColor = React.useMemo((): string => {
    if (disabled) return theme.colors.disabled;
    if (selected) {
      switch (variant) {
        case 'filled':
          return theme.chip.variants.filled.selectedBorderColor;
        case 'outlined':
          return theme.chip.variants.outlined.selectedBorderColor;
        case 'tonal':
          return theme.chip.variants.tonal.selectedBorderColor;
      }
    }
    switch (variant) {
      case 'filled':
        return theme.chip.variants.filled.borderColor;
      case 'outlined':
        return theme.chip.variants.outlined.borderColor;
      case 'tonal':
        return theme.chip.variants.tonal.borderColor;
    }
  }, [disabled, selected, variant, theme.chip.variants, theme.colors.disabled]);

  const textColor = React.useMemo((): string => {
    if (disabled) return theme.colors.onDisabled;
    if (selected) {
      switch (variant) {
        case 'filled':
          return theme.chip.variants.filled.selectedText;
        case 'outlined':
          return theme.chip.variants.outlined.selectedText;
        case 'tonal':
          return theme.chip.variants.tonal.selectedText;
      }
    }
    switch (variant) {
      case 'filled':
        return theme.chip.variants.filled.text;
      case 'outlined':
        return theme.chip.variants.outlined.text;
      case 'tonal':
        return theme.chip.variants.tonal.text;
    }
  }, [disabled, selected, variant, theme.chip.variants, theme.colors.onDisabled]);

  

  const containerBase = styles(theme).container;
  const sizeStyle = React.useMemo(() => ({
    paddingVertical: Math.max(2, (sizes.minHeight - sizes.fontSize) / 2 - 2),
    paddingHorizontal: sizes.paddingX,
    minHeight: sizes.minHeight,
    borderWidth: theme.chip.borderWidth,
    borderRadius: theme.chip.borderRadius,
  }), [sizes.fontSize, sizes.minHeight, sizes.paddingX, theme.chip.borderRadius, theme.chip.borderWidth]);

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onPressIn={() => animate(theme.chip.animation.pressScale)}
      onPressOut={() => animate(1)}
      disabled={disabled}
      testID={testID}
      {...(Platform.OS === 'android' ? { android_ripple: { color: theme.chip.ripple.color } } : {})}
    >
      <Animated.View
        style={[
          containerBase,
          { backgroundColor, borderColor, transform: [{ scale: pressAnim }] },
          sizeStyle,
          style,
        ]}
      >
        {leftIcon && <View style={[styles(theme).icon, { marginRight: sizes.iconSpacing }]}>{leftIcon}</View>}
        <Text
          style={[
            styles(theme).label,
            { color: textColor, fontSize: sizes.fontSize },
            labelStyle,
          ]}
        >
          {label}
        </Text>
        {rightIcon && <View style={[styles(theme).icon, { marginLeft: sizes.iconSpacing }]}>{rightIcon}</View>}
        {closeable && !disabled && (
          <Pressable
            style={styles(theme).closeButton}
            onPress={onClose}
            hitSlop={{ top: theme.chip.close.hitSlop, right: theme.chip.close.hitSlop, bottom: theme.chip.close.hitSlop, left: theme.chip.close.hitSlop }}
          />
        )}
      </Animated.View>
    </Pressable>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  closeButton: {
    marginLeft: theme.spacing.xs,
    padding: theme.spacing.xs,
  },
  container: {
    alignItems: 'center',
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    flexDirection: 'row',
  },
  icon: {
    marginRight: theme.spacing.xs,
  },
  label: {
    fontWeight: theme.fontWeight.medium,
  },
});

const styles = createStyles;
