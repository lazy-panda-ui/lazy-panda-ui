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

  const sizePadding = React.useMemo(() => (padding === 'none' ? 0 : theme.spacing[padding]), [padding, theme.spacing]);
  const sizeMargin = React.useMemo(() => (margin === 'none' ? 0 : theme.spacing[margin]), [margin, theme.spacing]);
  const borderRadiusValue = React.useMemo(() => (radius ?? theme.box.defaults.radius), [radius, theme.box.defaults.radius]);
  const gapValue = React.useMemo(() => (Platform.OS === 'web' ? gap ?? theme.box.defaults.gap : 0), [gap, theme.box.defaults.gap]);

  const variantStyle = React.useMemo((): ViewStyle => {
    if (backgroundColor) return { backgroundColor };
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: theme.box.variants.outlined.backgroundColor,
          borderColor: theme.box.variants.outlined.borderColor,
          borderWidth: theme.box.variants.outlined.borderWidth,
        };
      case 'tonal':
        return { backgroundColor: theme.box.variants.tonal.backgroundColor };
      case 'elevated':
        return {
          backgroundColor: theme.box.variants.elevated.backgroundColor,
          ...Platform.select({
            ios: {
              shadowColor: theme.box.variants.elevated.shadow.color,
              shadowOpacity: theme.box.variants.elevated.shadow.opacity,
              shadowRadius: theme.box.variants.elevated.shadow.radius,
              shadowOffset: { width: 0, height: elevation || theme.box.variants.elevated.shadow.offsetY },
            },
            android: { elevation: elevation || theme.box.variants.elevated.shadow.elevation },
            default: {},
          }),
        } as ViewStyle;
      case 'filled':
      default:
        return { backgroundColor: theme.box.variants.filled.backgroundColor };
    }
  }, [backgroundColor, elevation, theme.box.variants, variant]);

  const baseStyle = React.useMemo<ViewStyle>(() => ({
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...(Platform.OS === 'web' ? { gap: gapValue } : {}),
    flexGrow: grow ? 1 : undefined,
    flexShrink: shrink ? 1 : undefined,
    padding: sizePadding,
    margin: sizeMargin,
    borderRadius: borderRadiusValue,
  }), [align, borderRadiusValue, direction, gapValue, grow, justify, sizeMargin, sizePadding, shrink, wrap]);

  const boxStyle = React.useMemo(() => [baseStyle, variantStyle, style], [baseStyle, variantStyle, style]);

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
        android_ripple={ripple ? { color: theme.box.ripple.color, foreground: true } : null}
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
