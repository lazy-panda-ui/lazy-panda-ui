import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Button } from './Button';
import { Theme, useTheme } from '../theme';

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

  const getVariantStyles = React.useCallback((isSelected: boolean): ViewStyle => {
    if (variant === 'contained') {
      return {
        backgroundColor: isSelected
          ? theme.buttonGroup.variants.contained.selectedBackground
          : theme.buttonGroup.variants.contained.background,
        borderWidth: 0,
      };
    }
    if (variant === 'text') {
      return {
        backgroundColor: isSelected
          ? theme.buttonGroup.variants.text.selectedBackground
          : theme.buttonGroup.variants.text.background,
        borderWidth: 0,
      };
    }
    // outlined
    return {
      backgroundColor: isSelected
        ? theme.buttonGroup.variants.outlined.selectedBackground
        : theme.buttonGroup.variants.outlined.background,
      borderWidth: theme.buttonGroup.variants.outlined.borderWidth,
      borderColor: isSelected
        ? theme.buttonGroup.variants.outlined.selectedBorderColor
        : theme.buttonGroup.variants.outlined.borderColor,
    };
  }, [theme.buttonGroup.variants, variant]);

  const getHeightForSize = React.useCallback((buttonSize: ButtonGroupSize): number => {
    const t = theme.buttonGroup.sizes[buttonSize];
    return t.height;
  }, [theme.buttonGroup.sizes]);

  const getButtonSpacing = React.useCallback(() => {
    if (direction === 'horizontal') {
      return { marginLeft: theme.buttonGroup.overlap.horizontal };
    }
    return { marginTop: theme.buttonGroup.overlap.vertical };
  }, [direction, theme.buttonGroup.overlap.horizontal, theme.buttonGroup.overlap.vertical]);

  return (
    <View
      style={React.useMemo(() => ([
        styles(theme).container,
        { flexDirection: direction === 'horizontal' ? 'row' : 'column' },
        style,
      ]), [direction, style, theme])}
      testID={testID}
    >
      {buttons.map((btn, idx) => {
        const isSelected = selectedIndex === idx;
        const btnStyles = [
          styles(theme).button,
          { height: getHeightForSize(size) },
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

const styles = (theme: Theme) => StyleSheet.create({
  button: {
    borderRadius: theme.buttonGroup.item.borderRadius,
    flex: theme.buttonGroup.item.flex,
  },
  container: {
    alignItems: 'stretch',
  },
});
