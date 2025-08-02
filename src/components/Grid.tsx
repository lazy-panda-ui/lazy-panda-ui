import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  LayoutChangeEvent,
  useWindowDimensions,
  StyleProp,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type GridAlignment = 'flex-start' | 'center' | 'flex-end' | 'stretch';
export type GridJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
export type GridSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface GridBreakpoints {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface GridProps {
  /**
   * Grid items
   */
  children: React.ReactNode;
  /**
   * Number of columns. Can be responsive using breakpoints object
   * @default 12
   */
  columns?: number | GridBreakpoints;
  /**
   * Spacing between items. Uses theme spacing values
   * @default 'md'
   */
  spacing?: GridSpacing;
  /**
   * Vertical alignment of items
   * @default 'stretch'
   */
  alignItems?: GridAlignment;
  /**
   * Horizontal alignment of items
   * @default 'start'
   */
  justifyContent?: GridJustify;
  /**
   * Flow direction of items
   * @default 'row'
   */
  direction?: GridDirection;
  /**
   * How items should wrap
   * @default 'wrap'
   */
  wrap?: GridWrap;
  /**
   * Whether to maintain equal height columns
   * @default false
   */
  equalHeight?: boolean;
  /**
   * Additional styles for the container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Additional styles for each item wrapper
   */
  itemStyle?: StyleProp<ViewStyle>;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 12,
  spacing = 'md',
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  direction = 'row',
  wrap = 'wrap',
  equalHeight = false,
  containerStyle,
  itemStyle,
  testID,
}) => {
  const theme = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const [containerWidth, setContainerWidth] = React.useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const getColumnCount = () => {
    if (typeof columns === 'number') return columns;

    // Responsive columns based on breakpoints
    const breakpoints = {
      xl: 1200,
      lg: 992,
      md: 768,
      sm: 576,
      xs: 0,
    };

    const currentBreakpoint = Object.entries(breakpoints).find(
      ([, value]) => windowWidth >= value
    )?.[0] as keyof GridBreakpoints;

    return columns[currentBreakpoint] || 12;
  };

  const getSpacing = () => {
    switch (spacing) {
      case 'none':
        return 0;
      case 'xs':
        return theme.spacing.xs;
      case 'sm':
        return theme.spacing.sm;
      case 'lg':
        return theme.spacing.lg;
      case 'xl':
        return theme.spacing.xl;
      default:
        return theme.spacing.md;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: direction as ViewStyle['flexDirection'],
      flexWrap: wrap as ViewStyle['flexWrap'],
      alignItems,
      justifyContent: justifyContent,
      margin: -(getSpacing() / 2),
      width: containerWidth > 0 ? containerWidth : '100%',
    },
    item: {
      padding: getSpacing() / 2,
      ...(equalHeight && {
        flex: 1,
        alignSelf: 'stretch',
      }),
    },
    itemContent: {
      width: `${100 / getColumnCount()}%`,
      ...(equalHeight && {
        height: '100%',
      }),
    },
  });

  const childArray = React.Children.toArray(children);

  return (
    <View 
      style={[styles.container, containerStyle]}
      testID={testID}
      onLayout={handleLayout}
    >
      {childArray.map((child, index) => {
        const key = React.isValidElement(child) && child.key != null
          ? child.key
          : `grid-item-${index}`;

        return (
          <View key={key} style={[styles.item, itemStyle]}>
            <View style={styles.itemContent}>
              {child}
            </View>
          </View>
        );
      })}
    </View>
  );
};
