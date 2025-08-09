import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Animated, Pressable } from 'react-native';
import type { StyleProp } from 'react-native';
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
  style?: StyleProp<ViewStyle>;
  /**
   * Custom styles for the badge text
   */
  textStyle?: StyleProp<TextStyle>;
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

  const tokens = theme.badge;
  const sizeMetrics = tokens.sizes[size];
  const sizeStyle = useMemo(() => ({
    height: sizeMetrics.height,
    minWidth: variant === 'dot' ? sizeMetrics.dot : sizeMetrics.minWidth,
    paddingHorizontal: variant === 'dot' ? 0 : sizeMetrics.paddingX,
  }), [sizeMetrics, variant]);
  const fontSize = tokens.fontSizes[size];

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

  const backgroundColor = getBackgroundColor();
  const textColor = getTextColor();
  const borderColorValue = getColor(color);
  const hasChildren = !!children;
  const positionStyle = hasChildren ? getPositionStyle() : undefined;

  const styles = useMemo(() => StyleSheet.create({
    container: {
      ...sizeStyle,
      alignItems: 'center',
      backgroundColor,
      borderColor: borderColorValue,
      borderRadius: theme.borderRadius.full,
      borderWidth: variant === 'outlined' ? tokens.borderWidth : 0,
      justifyContent: 'center',
      position: hasChildren ? 'absolute' : 'relative',
      ...(hasChildren && positionStyle ? positionStyle : {}),
    },
    text: {
      color: textColor,
      display: variant === 'dot' ? 'none' : 'flex',
      fontSize,
      fontWeight: theme.fontWeight.semibold,
    },
    wrapper: {
      position: 'relative',
    },
  }), [backgroundColor, borderColorValue, fontSize, hasChildren, positionStyle, sizeStyle, textColor, theme.borderRadius.full, theme.fontWeight.semibold, tokens.borderWidth, variant]);

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
