import React from 'react';
import { Pressable, StyleSheet, ViewStyle, Animated, Easing, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type CheckBoxSize = 'small' | 'medium' | 'large';
export type CheckBoxVariant = 'filled' | 'outlined' | 'minimal';

export interface CheckBoxProps {
  /**
   * Whether the checkbox is checked
   */
  checked: boolean;
  /**
   * Callback when the checkbox state changes
   */
  onChange: (checked: boolean) => void;
  /**
   * Size of the checkbox
   * @default 'medium'
   */
  size?: CheckBoxSize;
  /**
   * Visual variant of the checkbox
   * @default 'filled'
   */
  variant?: CheckBoxVariant;
  /**
   * Whether the checkbox is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Color for the checkbox when checked
   */
  activeColor?: string;
  /**
   * Additional styles for the container
   */
  style?: ViewStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
}

const createStyles = (borderRadius: number, borderWidth: number, disabledOpacity: number) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      borderRadius,
      borderWidth,
      justifyContent: 'center',
      overflow: 'hidden',
    },
    disabled: {
      opacity: disabledOpacity,
    },
    indicator: {
      borderRadius: Math.max(2, borderRadius - 2),
    },
  });

export const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onChange,
  size = 'medium',
  variant = 'filled',
  disabled = false,
  activeColor,
  style,
  testID,
}) => {
  const theme = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: checked ? 1 : 0,
      duration: theme.checkbox.animation.duration,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [checked, scaleAnim, theme.checkbox.animation.duration]);

  const getSize = React.useCallback(() => {
    return theme.checkbox.sizes[size];
  }, [size, theme.checkbox.sizes]);

  const boxSize = React.useMemo(() => getSize(), [getSize]);
  const indicatorSize = React.useMemo(() => boxSize * 0.5, [boxSize]);
  const styles = React.useMemo(
    () => createStyles(theme.checkbox.borderRadius, theme.checkbox.borderWidth, theme.checkbox.disabledOpacity),
    [theme.checkbox.borderRadius, theme.checkbox.borderWidth, theme.checkbox.disabledOpacity]
  );

  const getBorderColor = React.useCallback(() => {
    if (disabled) return theme.colors.disabled;
    if (variant === 'outlined' && checked) return activeColor || theme.checkbox.variants.outlined.selectedBorderColor;
    if (variant === 'outlined') return theme.checkbox.variants.outlined.borderColor;
    return theme.checkbox.variants.filled.borderColor;
  }, [activeColor, checked, disabled, theme.checkbox.variants.outlined.borderColor, theme.checkbox.variants.outlined.selectedBorderColor, theme.checkbox.variants.filled.borderColor, theme.colors.disabled, variant]);

  const getBackgroundColor = React.useCallback(() => {
    if (disabled) return theme.colors.disabled;
    if (variant === 'filled') return checked ? (activeColor || theme.checkbox.variants.filled.backgroundChecked) : theme.checkbox.variants.filled.backgroundUnchecked;
    if (variant === 'outlined') return theme.checkbox.variants.outlined.background;
    return theme.checkbox.variants.minimal.background;
  }, [activeColor, checked, disabled, theme.checkbox.variants.filled.backgroundChecked, theme.checkbox.variants.filled.backgroundUnchecked, theme.checkbox.variants.minimal.background, theme.checkbox.variants.outlined.background, theme.colors.disabled, variant]);

  const containerStyle = React.useMemo(() => [
    styles.container,
    {
      width: boxSize,
      height: boxSize,
      borderColor: getBorderColor(),
      backgroundColor: getBackgroundColor(),
    },
    disabled && styles.disabled,
    style,
  ], [
    styles,
    boxSize,
    disabled,
    getBackgroundColor,
    getBorderColor,
    style,
  ]);

  const indicatorStyle = React.useMemo(() => [
    styles.indicator,
    {
      width: indicatorSize,
      height: indicatorSize,
      backgroundColor:
        variant === 'filled'
          ? theme.checkbox.variants.filled.indicatorColor
          : activeColor || theme.checkbox.variants.outlined.indicatorColor,
      transform: [{ scale: scaleAnim }],
    },
  ], [
    styles,
    indicatorSize,
    variant,
    theme.checkbox.variants.filled.indicatorColor,
    theme.checkbox.variants.outlined.indicatorColor,
    activeColor,
    scaleAnim,
  ]);

  const handlePress = React.useCallback(() => {
    if (!disabled) {
      onChange(!checked);
    }
  }, [disabled, onChange, checked]);

  return (
    <Pressable
      style={containerStyle}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      testID={testID}
      {...(Platform.OS === 'android' ? { android_ripple: { color: theme.checkbox.ripple.color } } : {})}
    >
      <Animated.View style={indicatorStyle} />
    </Pressable>
  );
};
  
