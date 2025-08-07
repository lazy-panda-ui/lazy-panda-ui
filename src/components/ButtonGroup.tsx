import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Button } from './Button';
import { useTheme } from '../theme';

export type ButtonGroupSize = 'small' | 'medium' | 'large';
export type ButtonGroupVariant = 'outlined' | 'contained' | 'text';

export interface ButtonGroupProps {
  /**
   * Array of button configurations
   */
  buttons: { label: string; onPress: () => void; disabled?: boolean }[];
  /**
   * Index of the selected button
   */
  selectedIndex?: number;
  /**
   * Additional styles for the container
   */
  style?: ViewStyle;
  /**
   * Size of the button group
   * @default 'md'
   */
  size?: ButtonGroupSize;
  /**
   * Visual variant of the button group
   * @default 'outlined'
   */
  variant?: ButtonGroupVariant;
  /**
   * Direction of the button group
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * Whether the entire button group is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  selectedIndex,
  style,
  size = 'medium',
  variant = 'outlined',
  direction = 'horizontal',
  disabled = false,
  testID,
}) => {
  const theme = useTheme();

  const getVariantStyles = (isSelected: boolean): ViewStyle => {
    switch (variant) {
      case 'contained':
        return {
          backgroundColor: isSelected ? theme.colors.primaryContainer : theme.colors.surfaceVariant,
          borderWidth: 0,
        };
      case 'text':
        return {
          backgroundColor: isSelected ? theme.colors.primaryContainer : 'transparent',
          borderWidth: 0,
        };
      case 'outlined':
      default:
        return {
          backgroundColor: isSelected ? theme.colors.primaryContainer : theme.colors.surface,
          borderWidth: 1,
          borderColor: isSelected ? theme.colors.primary : theme.colors.outline,
        };
    }
  };

  const getSpacingForSize = (buttonSize: ButtonGroupSize): number => {
    switch (buttonSize) {
      case 'small':
        return theme.sizing.sm;
      case 'large':
        return theme.sizing.lg;
      default:
        return theme.sizing.md;
    }
  };

  const getButtonSpacing = () => {
    if (direction === 'horizontal') {
      return { marginLeft: -1 }; // Overlap borders
    }
    return { marginTop: -1 }; // Overlap borders
  };

  return (
    <View
      style={[
        styles().container,
        { flexDirection: direction === 'horizontal' ? 'row' : 'column' },
        style,
      ]}
      testID={testID}
    >
      {buttons.map((btn, idx) => {
        const isSelected = selectedIndex === idx;
        const btnStyles = [
          styles().button,
          { height: getSpacingForSize(size) },
          getVariantStyles(isSelected),
          idx !== 0 ? getButtonSpacing() : undefined,
        ].filter(Boolean) as ViewStyle[];

        let buttonVariant = variant;
        if (variant === 'text') {
          buttonVariant = 'text';
        } else if (isSelected) {
          buttonVariant = 'contained';
        }

        return (
          <Button
            key={btn.label}
            title={btn.label}
            onPress={btn.onPress}
            disabled={disabled || btn.disabled}
            style={btnStyles}
            testID={`${testID}-item-${idx}`}
            variant={buttonVariant}
            size={size}
          />
        );
      })}
    </View>
  );
};

const styles = () => StyleSheet.create({
  button: {
    borderRadius: 0,
    flex: 1,
  },
  container: {
    alignItems: 'stretch',
  },
  notFirstHorizontal: {
    marginLeft: -1, // Overlap borders
  },
  notFirstVertical: {
    marginTop: -1, // Overlap borders
  },
});
