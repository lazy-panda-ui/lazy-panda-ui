import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  Animated,
  Easing,
} from 'react-native';
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

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 2,
      justifyContent: 'center',
    },
    disabled: {
      opacity: 0.5,
    },
    indicator: {
      borderRadius: 2,
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
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [checked, scaleAnim]);

  const getSize = React.useCallback(() => {
    switch (size) {
      case 'small':
        return theme.spacing.lg;
      case 'large':
        return theme.spacing.xl * 1.5;
      default:
        return theme.spacing.xl;
    }
  }, [size, theme.spacing]);

  const boxSize = React.useMemo(() => getSize(), [getSize]);
  const indicatorSize = React.useMemo(() => boxSize * 0.5, [boxSize]);
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const getBorderColor = React.useCallback(() => {
    if (disabled) return theme.colors.disabled;
    if (checked) return activeColor || theme.colors.primary;
    return theme.colors.outline;
  }, [disabled, checked, activeColor, theme.colors]);

  const getBackgroundColor = React.useCallback(() => {
    if (variant === 'filled' && checked) {
      return activeColor || theme.colors.primary;
    }
    return theme.colors.surface;
  }, [variant, checked, activeColor, theme.colors]);

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
    checked,
    activeColor,
    theme.colors,
    variant,
    style,
  ]);

  const indicatorStyle = React.useMemo(() => [
    styles.indicator,
    {
      width: indicatorSize,
      height: indicatorSize,
      backgroundColor:
        variant === 'filled'
          ? theme.colors.onPrimary
          : activeColor || theme.colors.primary,
      transform: [{ scale: scaleAnim }],
    },
  ], [
    styles,
    indicatorSize,
    variant,
    theme.colors,
    activeColor,
    scaleAnim,
  ]);

  const handlePress = React.useCallback(() => {
    if (!disabled) {
      onChange(!checked);
    }
  }, [disabled, onChange, checked]);

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      testID={testID}
    >
      <Animated.View style={indicatorStyle} />
    </TouchableOpacity>
  );
};
  StyleSheet.create({
    container: {
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 2,
      justifyContent: 'center',
    },
    disabled: {
      opacity: 0.5,
    },
    indicator: {
      borderRadius: 2,
    },
  });
