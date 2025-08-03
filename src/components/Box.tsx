import React from 'react';
import {
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleProp,
  View,
  ViewStyle
} from 'react-native';
import { Theme, useTheme } from '../theme';

export type BoxVariant = 'elevated' | 'outlined' | 'filled' | 'tonal';
export type BoxFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type BoxAlignment = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type BoxJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type SpacingValue = keyof Theme['spacing'];
export type SpacingType = 'none' | SpacingValue;

export interface BoxProps {
  /**
   * Content to be rendered inside the box
   */
  children?: React.ReactNode;
  /**
   * Visual variant of the box
   * @default 'filled'
   */
  variant?: BoxVariant;
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * Flex direction for children
   * @default 'column'
   */
  direction?: BoxFlexDirection;
  /**
   * Cross-axis alignment of children
   * @default 'stretch'
   */
  align?: BoxAlignment;
  /**
   * Main-axis alignment of children
   * @default 'flex-start'
   */
  justify?: BoxJustify;
  /**
   * Whether the box should grow to fill available space
   * @default false
   */
  grow?: boolean;
  /**
   * Whether the box should shrink to fit
   * @default false
   */
  shrink?: boolean;
  /**
   * Predefined padding size
   * @default 'none'
   */
  padding?: SpacingType;
  /**
   * Predefined margin size
   * @default 'none'
   */
  margin?: SpacingType;
  /**
   * Whether box should wrap children
   * @default false
   */
  wrap?: boolean;
  /**
   * Gap between children
   * @default 0
   */
  gap?: number;
  /**
   * Box elevation (shadow)
   * @default 0
   */
  elevation?: number;
  /**
   * Border radius
   */
  radius?: number;
  /**
   * Custom styles
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Callback when box is pressed
   */
  onPress?: () => void;
  /**
   * Callback when box layout changes
   */
  onLayout?: (event: LayoutChangeEvent) => void;
  /**
   * Test ID for testing
   */
  testID?: string;
  /**
   * Whether the box is pressable
   * @default false
   */
  pressable?: boolean;
  /**
   * Whether to show ripple effect on Android
   * @default true
   */
  ripple?: boolean;
  /**
   * Accessibility label
   */
  accessibilityLabel?: string;
}

export const Box: React.FC<BoxProps> = ({
  children,
  variant = 'filled',
  backgroundColor,
  direction = 'column',
  align = 'stretch',
  justify = 'flex-start',
  grow = false,
  shrink = false,
  padding = 'none',
  margin = 'none',
  wrap = false,
  gap = 0,
  elevation = 0,
  radius,
  style,
  onPress,
  onLayout,
  testID,
  pressable = false,
  ripple = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();

  const boxStyle = React.useMemo(() => {
    const baseStyle: ViewStyle = {
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      ...(Platform.OS === 'web' ? { gap } : {}),
      flexGrow: grow ? 1 : undefined,
      flexShrink: shrink ? 1 : undefined,
      padding: padding === 'none' ? 0 : theme.spacing[padding as SpacingValue],
      margin: margin === 'none' ? 0 : theme.spacing[margin as SpacingValue],
      borderRadius: radius ?? theme.borderRadius.md,
    };

    if (backgroundColor) {
      baseStyle.backgroundColor = backgroundColor;
    } else {
      switch (variant) {
        case 'elevated':
          baseStyle.backgroundColor = theme.colors.surface;
          baseStyle.elevation = elevation;
          if (Platform.OS === 'ios') {
            baseStyle.shadowColor = '#000';
            baseStyle.shadowOffset = { width: 0, height: elevation };
            baseStyle.shadowOpacity = 0.25;
            baseStyle.shadowRadius = elevation;
          }
          break;
        case 'outlined':
          baseStyle.backgroundColor = theme.colors.surface;
          baseStyle.borderWidth = 1;
          baseStyle.borderColor = theme.colors.outline;
          break;
        case 'filled':
          baseStyle.backgroundColor = theme.colors.surfaceVariant;
          break;
        case 'tonal':
          baseStyle.backgroundColor = theme.colors.secondaryContainer;
          break;
      }
    }

    return [baseStyle, style];
  }, [
    theme,
    variant,
    backgroundColor,
    direction,
    align,
    justify,
    grow,
    shrink,
    padding,
    margin,
    wrap,
    gap,
    elevation,
    radius,
    style,
  ]);

  const content = (
    <View 
      style={boxStyle}
      onLayout={onLayout}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </View>
  );

  if (pressable || onPress) {
    return (
      <Pressable
        onPress={onPress}
        android_ripple={ripple ? { color: theme.colors.onSurface, foreground: true } : null}
        style={({ pressed }) => [
          boxStyle,
          pressed && { opacity: Platform.OS === 'ios' ? 0.7 : 1 },
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return content;
};
