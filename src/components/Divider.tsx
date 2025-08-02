import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Theme } from '../theme/ThemeProvider';

export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerThickness = 'thin' | 'regular' | 'thick';

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
   * Color of the divider, defaults to theme.colors.outline
   */
  color?: string;
  /**
   * Spacing around the divider
   * @default 'md'
   */
  spacing?: keyof Theme['spacing'];
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
  spacing = 'md',
  style,
  testID,
}) => {
  const theme = useTheme();

  const getThicknessValue = (thickness: DividerThickness): number => {
    switch (thickness) {
      case 'thin':
        return StyleSheet.hairlineWidth;
      case 'thick':
        return 2;
      default:
        return 1;
    }
  };

  const getBorderStyle = (variant: DividerVariant) => {
    switch (variant) {
      case 'dashed':
        return {
          borderStyle: 'dashed' as const,
          borderWidth: getThicknessValue(thickness),
          backgroundColor: undefined,
        };
      case 'dotted':
        return {
          borderStyle: 'dotted' as const,
          borderWidth: getThicknessValue(thickness),
          backgroundColor: undefined,
        };
      default:
        return {
          backgroundColor: color || theme.colors.outline,
          height: orientation === 'horizontal' ? getThicknessValue(thickness) : undefined,
          width: orientation === 'vertical' ? getThicknessValue(thickness) : undefined,
          flexGrow: 1,
        };
    }
  };

  const styles = StyleSheet.create({
    divider: {
      alignSelf: 'stretch',
      ...(orientation === 'horizontal' ? {
        marginVertical: theme.spacing[spacing],
      } : {
        marginHorizontal: theme.spacing[spacing],
      }),
      ...getBorderStyle(variant),
    },
  });

  return (
    <View 
      style={[styles.divider, style]}
      testID={testID}
      accessibilityRole="none"
    />
  );
};
