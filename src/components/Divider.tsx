import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Text,
  TextStyle,
  Animated,
} from 'react-native';
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
  spacing = 'md',
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
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [animated, animatedValue]);

  const getThicknessValue = (thickness: DividerThickness): number => {
    switch (thickness) {
      case 'hairline':
        return StyleSheet.hairlineWidth;
      case 'thin':
        return 1;
      case 'thick':
        return 3;
      default:
        return 2;
    }
  };

  const getInsetValue = (inset: DividerInset): number => {
    switch (inset) {
      case 'xs':
        return theme.spacing.xs;
      case 'sm':
        return theme.spacing.sm;
      case 'md':
        return theme.spacing.md;
      case 'lg':
        return theme.spacing.lg;
      case 'xl':
        return theme.spacing.xl;
      default:
        return 0;
    }
  };

  const getDividerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: color || theme.colors.outline,
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
          borderColor: color || theme.colors.outline,
        };
      case 'dotted':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderStyle: 'dotted' as const,
          borderWidth: getThicknessValue(thickness),
          borderColor: color || theme.colors.outline,
        };
      case 'gradient':
        return {
          ...baseStyle,
          backgroundColor: undefined,
        };
      default:
        return baseStyle;
    }
  };



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

  const styles = StyleSheet.create({
    arrow: {
      borderRightWidth: getThicknessValue(thickness),
      borderTopWidth: getThicknessValue(thickness),
      height: 8,
      transform: [{ rotate: '45deg' }],
      width: 8,
    },
    arrowContainer: {
      padding: theme.spacing.xs,
    },
    container: {
      alignItems: 'center',
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
      marginBottom: orientation === 'vertical' ? getInsetValue(inset) : undefined,
      marginHorizontal: orientation === 'vertical' ? theme.spacing[spacing] : 0,
      marginLeft: orientation === 'horizontal' ? getInsetValue(inset) : undefined,
      marginRight: orientation === 'horizontal' ? getInsetValue(inset) : undefined,
      marginTop: orientation === 'vertical' ? getInsetValue(inset) : undefined,
      marginVertical: orientation === 'horizontal' ? theme.spacing[spacing] : 0,
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
      backgroundColor: theme.colors.background,
      fontSize: theme.fontSize.caption,
      fontWeight: theme.fontWeight.medium,
      paddingHorizontal: theme.spacing.sm,
    },
    textContainer: {
      height: '100%',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.md,
      position: 'absolute',
      width: '100%',
    },
  });

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
              backgroundColor: color || theme.colors.outline,
              opacity: 0.5,
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
            { color: textProps.color || theme.colors.outline },
            textProps.style,
          ]}
        >
          {textProps.text}
        </Text>
      )}
      {showArrow && !customArrow && (
        <View style={styles.arrowContainer}>
          <View style={[styles.arrow, { borderColor: color || theme.colors.outline }]} />
        </View>
      )}
    </View>
  );


};
