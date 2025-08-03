import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme, Theme } from '../theme';

export type StackSpacing = keyof Theme['spacing'] | number;
export type StackAlignment = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export interface StackProps {
  /**
   * Content to be stacked
   */
  children: React.ReactNode;
  /**
   * Direction of the stack
   * @default 'column'
   */
  direction?: 'row' | 'column';
  /**
   * Spacing between items, can be theme spacing token or custom number
   * @default 'sm'
   */
  spacing?: StackSpacing;
  /**
   * Whether to reverse the order of items
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to wrap items to next line (only for row direction)
   * @default false
   */
  wrap?: boolean;
  /**
   * Alignment of items along the cross axis
   * @default 'stretch'
   */
  align?: StackAlignment;
  /**
   * Alignment of items along the main axis
   * @default 'start'
   */
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  /**
   * Whether to show dividers between items
   * @default false
   */
  divider?: boolean;
  /**
   * Color of the divider
   * @default theme.colors.outline
   */
  dividerColor?: string;
  /**
   * Additional styles for the container
   */
  style?: ViewStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'column',
  spacing = 'sm',
  reverse = false,
  wrap = false,
  align = 'stretch',
  justify = 'start',
  divider = false,
  dividerColor,
  style,
  testID,
}) => {
  const theme = useTheme();
  const childArray = React.Children.toArray(children).filter(child => child !== null);

  const getSpacing = (spacingValue: StackSpacing): number => {
    if (typeof spacingValue === 'number') return spacingValue;
    return theme.spacing[spacingValue];
  };

  const getFlexAlign = (alignment: StackAlignment): ViewStyle['alignItems'] => {
    switch (alignment) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      default:
        return alignment;
    }
  };

  const getFlexJustify = (justification: StackProps['justify']): ViewStyle['justifyContent'] => {
    if (!justification) return 'flex-start';
    switch (justification) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      default:
        return justification;
    }
  };

  const getFlexDirection = () => {
    if (direction === 'row') {
      return reverse ? 'row-reverse' : 'row';
    }
    return reverse ? 'column-reverse' : 'column';
  };

  const containerStyle: ViewStyle = {
    flexDirection: getFlexDirection(),
    flexWrap: wrap && direction === 'row' ? 'wrap' : 'nowrap',
    alignItems: getFlexAlign(align),
    justifyContent: getFlexJustify(justify),
  };

  const spacingValue = getSpacing(spacing);
  const dividerThickness = 1;
  const dividerStyle: ViewStyle = {
    backgroundColor: dividerColor || theme.colors.outline,
    ...(direction === 'row'
      ? { width: dividerThickness, height: '100%' }
      : { height: dividerThickness, width: '100%' }),
  };

  return (
    <View style={[containerStyle, style]} testID={testID}>
      {childArray.map((child, idx) => {
        const key = React.isValidElement(child) && child.key != null ? child.key : `stack-item-${idx}`;
        const isLastItem = idx === childArray.length - 1;

        const itemSpacing: ViewStyle = {
          ...(direction === 'row'
            ? { marginRight: isLastItem ? 0 : spacingValue }
            : { marginBottom: isLastItem ? 0 : spacingValue }),
          ...(wrap && direction === 'row' ? { marginBottom: spacingValue } : {}),
        };

        return (
          <React.Fragment key={key}>
            <View style={itemSpacing}>{child}</View>
            {divider && !isLastItem && <View style={dividerStyle} />}
          </React.Fragment>
        );
      })}
    </View>
  );
};
