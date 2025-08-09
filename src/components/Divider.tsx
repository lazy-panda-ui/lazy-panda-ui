import React from 'react';
import { View, StyleSheet, ViewStyle, Text, TextStyle, Animated } from 'react-native';
import { useTheme, Theme } from '../theme';

export type DividerVariant = 'solid' | 'dashed' | 'dotted' | 'gradient';
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerThickness = 'hairline' | 'thin' | 'regular' | 'thick';
export type DividerAlignment = 'start' | 'center' | 'end';
export type DividerInset = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface DividerTextProps {
  /**
   * Text content
   */
  text: string;
  /**
   * Color of the text
   */
  color?: string;
  /**
   * Custom styles for the text
   */
  style?: TextStyle;
}

export interface DividerProps {
  /**
   * Visual style variant of the divider
   * @default 'solid'
   */
  variant?: DividerVariant;
  /**
   * Orientation of the divider
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;
  /**
   * Thickness of the divider
   * @default 'regular'
   */
  thickness?: DividerThickness;
  /**
   * Color of the divider
   * @default theme.colors.outline
   */
  color?: string;
  /**
   * Secondary color for gradient variant
   * Only applies when variant is 'gradient'
   */
  gradientColor?: string;
  /**
   * Spacing around the divider
   * @default 'md'
   */
  spacing?: keyof Theme['spacing'];
  /**
   * Inset from the edges
   * @default 'none'
   */
  inset?: DividerInset;
  /**
   * Alignment of the divider content
   * @default 'center'
   */
  alignment?: DividerAlignment;
  /**
   * Props for the divider text (for text dividers)
   */
  textProps?: DividerTextProps;
  /**
   * Whether to show arrow at the end
   * @default false
   */
  showArrow?: boolean;
  /**
   * Custom arrow component
   */
  customArrow?: React.ReactNode;
  /**
   * Whether the divider should take up full width/height
   * @default true
   */
  fullSize?: boolean;
  /**
   * Length of the divider (in pixels)
   * Only applies when fullSize is false
   */
  length?: number;
  /**
   * Whether to animate the divider on mount
   * @default false
   */
  animated?: boolean;
  /**
   * Additional styles for the divider
   */
  style?: ViewStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const Divider: React.FC<DividerProps> = ({
  variant = 'solid',
  orientation = 'horizontal',
  thickness = 'regular',
  color,
  gradientColor,
  // spacing prop kept for backward-compat; theme.divider.spacing now used
  // deprecated: spacing (use theme.divider.spacing)
  inset = 'none',
  alignment = 'center',
  textProps,
  showArrow = false,
  customArrow,
  fullSize = true,
  length,
  animated = false,
  style,
  testID,
}) => {
  const theme = useTheme();
  const animatedValue = React.useRef(new Animated.Value(animated ? 0 : 1)).current;

  React.useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: theme.divider.animation.duration,
        useNativeDriver: true,
      }).start();
    }
  }, [animated, animatedValue, theme.divider.animation.duration]);

  const getThicknessValue = React.useCallback((t: DividerThickness): number => {
    const map = theme.divider.thickness;
    return map[t];
  }, [theme.divider.thickness]);

  const getInsetValue = React.useCallback((i: DividerInset): number => {
    if (i === 'none') return 0;
    return theme.divider.inset[i];
  }, [theme.divider.inset]);

  const getDividerStyle = React.useCallback((): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: color || theme.divider.colors.line,
      height: orientation === 'horizontal' ? getThicknessValue(thickness) : length || '100%',
      width: orientation === 'vertical' ? getThicknessValue(thickness) : length || '100%',
    };

    if (!fullSize) {
      if (orientation === 'horizontal') {
        baseStyle.width = length || 100;
      } else {
        baseStyle.height = length || 100;
      }
    }

    switch (variant) {
      case 'dashed':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderStyle: 'dashed' as const,
          borderWidth: getThicknessValue(thickness),
          borderColor: color || theme.divider.colors.line,
        };
      case 'dotted':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderStyle: 'dotted' as const,
          borderWidth: getThicknessValue(thickness),
          borderColor: color || theme.divider.colors.line,
        };
      case 'gradient':
        return {
          ...baseStyle,
          backgroundColor: undefined,
        };
      default:
        return baseStyle;
    }
  }, [color, fullSize, getThicknessValue, length, orientation, theme.divider.colors.line, thickness, variant]);



  const getAlignment = () => {
    switch (alignment) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      default:
        return 'center';
    }
  };

  const styles = React.useMemo(() => StyleSheet.create({
    arrow: {
      borderRightWidth: getThicknessValue(thickness),
      borderTopWidth: getThicknessValue(thickness),
      height: theme.divider.arrow.size,
      transform: [{ rotate: '45deg' }],
      width: theme.divider.arrow.size,
    },
    arrowContainer: {
      padding: theme.divider.arrow.padding,
    },
    container: {
      alignItems: 'center',
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
      marginBottom: orientation === 'vertical' ? getInsetValue(inset) : undefined,
      marginHorizontal: orientation === 'vertical' ? theme.divider.spacing.horizontal : 0,
      marginLeft: orientation === 'horizontal' ? getInsetValue(inset) : undefined,
      marginRight: orientation === 'horizontal' ? getInsetValue(inset) : undefined,
      marginTop: orientation === 'vertical' ? getInsetValue(inset) : undefined,
      marginVertical: orientation === 'horizontal' ? theme.divider.spacing.vertical : 0,
    },
    divider: {
      flexGrow: fullSize ? 1 : 0,
      flexShrink: 0,
      ...getDividerStyle(),
    },
    gradientContainer: {
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
    text: {
      backgroundColor: theme.divider.colors.textBackground,
      fontSize: theme.divider.text.fontSize,
      fontWeight: theme.divider.text.fontWeight,
      paddingHorizontal: theme.divider.text.paddingX,
    },
    textContainer: {
      height: '100%',
      justifyContent: 'center',
      paddingHorizontal: theme.divider.spacing.horizontal,
      position: 'absolute',
      width: '100%',
    },
  }), [fullSize, getDividerStyle, getInsetValue, getThicknessValue, inset, orientation, thickness, theme.divider.arrow.padding, theme.divider.arrow.size, theme.divider.colors.textBackground, theme.divider.spacing.horizontal, theme.divider.spacing.vertical, theme.divider.text.fontSize, theme.divider.text.fontWeight, theme.divider.text.paddingX]);

  const renderDivider = () => {
    const dividerComponent = (
      <Animated.View
        style={[
          styles.divider,
          animated && {
            opacity: animatedValue,
            transform: [
              orientation === 'horizontal'
                ? { scaleX: animatedValue }
                : { scaleY: animatedValue },
            ],
          },
          style,
        ]}
      />
    );

  if (variant === 'gradient' && gradientColor) {
      return (
        <View style={styles.container}>
          <View style={[
            styles.gradientContainer,
            {
        backgroundColor: gradientColor || color || theme.divider.colors.line,
        opacity: theme.divider.variants.gradient.overlayOpacity,
            }
          ]} />
          {dividerComponent}
        </View>
      );
    }

    return dividerComponent;
  };

  return (
    <View
      style={[
        styles.container,
        { justifyContent: getAlignment() },
      ]}
      testID={testID}
    >
      {showArrow && customArrow}
      {renderDivider()}
  {textProps && (
        <Text
          style={[
            styles.text,
    { color: textProps.color || theme.divider.colors.text },
            textProps.style,
          ]}
        >
          {textProps.text}
        </Text>
      )}
      {showArrow && !customArrow && (
        <View style={styles.arrowContainer}>
          <View style={[styles.arrow, { borderColor: color || theme.divider.colors.line }]} />
        </View>
      )}
    </View>
  );


};
