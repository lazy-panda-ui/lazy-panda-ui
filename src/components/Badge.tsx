import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Animated, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type BadgeVariant = 'filled' | 'outlined' | 'dot' | 'tonal';
export type BadgeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';
export type BadgeSize = 'small' | 'medium' | 'large';
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export type BadgeAlignment = 'inside' | 'outside';

export interface BadgeProps {
  /**
   * The content to display inside the badge
   */
  value?: string | number;
  /**
   * The visual style variant of the badge
   * @default 'filled'
   */
  variant?: BadgeVariant;
  /**
   * The color scheme of the badge
   * @default 'primary'
   */
  color?: BadgeColor;
  /**
   * The size of the badge
   * @default 'medium'
   */
  size?: BadgeSize;
  /**
   * Maximum value to show. If value is greater, shows {max}+
   * @default 99
   */
  max?: number;
  /**
   * Whether to show zero value
   * @default false
   */
  showZero?: boolean;
  /**
   * Custom styles for the badge container
   */
  style?: ViewStyle;
  /**
   * Custom styles for the badge text
   */
  textStyle?: TextStyle;
  /**
   * Content to be wrapped by the badge
   */
  children?: React.ReactNode;
  /**
   * Position of the badge relative to its children
   * @default 'top-right'
   */
  position?: BadgePosition;
  /**
   * Whether the badge should be inside or outside its children
   * @default 'outside'
   */
  alignment?: BadgeAlignment;
  /**
   * Whether to show a pulse animation
   * @default false
   */
  showPulse?: boolean;
  /**
   * Whether to show the badge
   * @default true
   */
  visible?: boolean;
  /**
   * Callback when badge is pressed
   */
  onPress?: () => void;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  value = 0,
  variant = 'filled',
  color = 'primary',
  size = 'medium',
  max = 99,
  showZero = false,
  style,
  textStyle,
  children,
  position = 'top-right',
  alignment = 'outside',
  showPulse = false,
  visible = true,
  onPress,
  testID,
}) => {
  const theme = useTheme();
  const [pulseAnim] = React.useState(new Animated.Value(1));

  React.useEffect(() => {
    if (showPulse) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
    return () => {
      pulseAnim.stopAnimation();
    };
  }, [showPulse, pulseAnim]);

  const getColor = (color: BadgeColor) => {
    return theme.colors[color];
  };

  const getSize = () => {
    switch (size) {
      case 'small':
        return {
          height: 16,
          minWidth: variant === 'dot' ? 8 : 16,
          paddingHorizontal: variant === 'dot' ? 0 : 4,
        };
      case 'large':
        return {
          height: 24,
          minWidth: variant === 'dot' ? 12 : 24,
          paddingHorizontal: variant === 'dot' ? 0 : 8,
        };
      default:
        return {
          height: 20,
          minWidth: variant === 'dot' ? 10 : 20,
          paddingHorizontal: variant === 'dot' ? 0 : 6,
        };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 10;
      case 'large':
        return 14;
      default:
        return 12;
    }
  };

  const getBackgroundColor = () => {
    if (variant === 'outlined') return theme.colors.background;
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
    return getColor(color);
  };

  const getTextColor = () => {
    if (variant === 'outlined') return getColor(color);
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
    return theme.colors.background;
  };

  const getPositionStyle = () => {
    const positionStyle: ViewStyle = {};
    const offset = alignment === 'inside' ? '0%' : '50%';

    switch (position) {
      case 'top-left':
        positionStyle.top = 0;
        positionStyle.left = 0;
        positionStyle.transform = [{ translateX: -parseInt(offset) }, { translateY: -parseInt(offset) }];
        break;
      case 'bottom-right':
        positionStyle.bottom = 0;
        positionStyle.right = 0;
        positionStyle.transform = [{ translateX: parseInt(offset) }, { translateY: parseInt(offset) }];
        break;
      case 'bottom-left':
        positionStyle.bottom = 0;
        positionStyle.left = 0;
        positionStyle.transform = [{ translateX: -parseInt(offset) }, { translateY: parseInt(offset) }];
        break;
      default: // top-right
        positionStyle.top = 0;
        positionStyle.right = 0;
        positionStyle.transform = [{ translateX: parseInt(offset) }, { translateY: -parseInt(offset) }];
    }

    return positionStyle;
  };

  const displayValue = () => {
    if (typeof value === 'number') {
      if (value === 0 && !showZero) return '';
      return value > max ? `${max}+` : value.toString();
    }
    return value;
  };

  const sizeStyle = getSize();
  const fontSize = getFontSize();
  const backgroundColor = getBackgroundColor();


  const styles = StyleSheet.create({
    container: {
      ...sizeStyle,
      alignItems: 'center',
      backgroundColor,
      borderColor: getColor(color),
      borderRadius: theme.borderRadius.full,
      borderWidth: variant === 'outlined' ? 1 : 0,
      justifyContent: 'center',
      position: children ? 'absolute' : 'relative',
      ...(children && getPositionStyle()),
    },
    text: {
      color: getTextColor(),
      display: variant === 'dot' ? 'none' : 'flex',
      fontSize,
      fontWeight: theme.fontWeight.semibold,
    },
    wrapper: {
      position: 'relative',
    },
  });

  if (!visible || (value === 0 && !showZero && variant !== 'dot')) return null;

  const BadgeContent = (
    <Animated.View 
      style={[
        styles.container,
        style,
        showPulse && { transform: [{ scale: pulseAnim }] },
      ]}
      testID={testID}
    >
      <Text style={[styles.text, textStyle]}>{displayValue()}</Text>
    </Animated.View>
  );

  if (children) {
    return (
      <View style={styles.wrapper}>
        {children}
        {BadgeContent}
      </View>
    );
  }

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        {BadgeContent}
      </Pressable>
    );
  }

  return BadgeContent;
};
