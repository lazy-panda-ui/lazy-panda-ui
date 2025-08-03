import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  LayoutChangeEvent,
  useWindowDimensions,
  StyleProp,
} from 'react-native';
import { useTheme, Theme } from '../theme';

export type GridAlignment = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
export type GridJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
export type GridSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type GridDisplay = 'flex' | 'none';

export interface GridBreakpoints {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface GridItemProps {
  /**
   * Number of columns to span
   * @default 12
   */
  cols?: number | GridBreakpoints;
  /**
   * Order of the item in the layout sequence
   */
  orderIndex?: number;
  /**
   * Whether to hide the item
   * @default 'flex'
   */
  display?: GridDisplay;
  /**
   * Content to render
   */
  children: React.ReactNode;
  /**
   * Additional styles
   */
  style?: StyleProp<ViewStyle>;
}

export const GridItem: React.FC<GridItemProps> = ({
  cols = 12,
  orderIndex,
  display = 'flex',
  children,
  style,
}) => {
  const { width } = useWindowDimensions();
  const colsValue = typeof cols === 'number' ? cols : getResponsiveColumns(cols, width);

  return (
    <View
      style={[
        {
          flex: 0,
          flexBasis: `${(colsValue / 12) * 100}%`,
          maxWidth: `${(colsValue / 12) * 100}%`,
          display: display === 'none' ? 'none' : 'flex',
        },
        orderIndex !== undefined && { zIndex: orderIndex },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export interface GridProps {
  /**
   * Grid items
   */
  children: React.ReactNode;
  /**
   * Container width behavior
   * @default false
   */
  container?: boolean;
  /**
   * Number of columns for layout
   * @default 12
   */
  columns?: number;
  /**
   * Spacing between items. Uses theme spacing values
   * @default 'md'
   */
  spacing?: GridSpacing;
  /**
   * Row spacing between items
   * @default spacing
   */
  rowSpacing?: GridSpacing;
  /**
   * Column spacing between items
   * @default spacing
   */
  columnSpacing?: GridSpacing;
  /**
   * Vertical alignment of items
   * @default 'stretch'
   */
  alignItems?: GridAlignment;
  /**
   * Horizontal alignment of items
   * @default 'flex-start'
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
   * Whether to disallow grid item gutters
   * @default false
   */
  disableGutters?: boolean;
  /**
   * Additional styles for the container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Test ID for testing
   */
  testID?: string;
}

// Helper functions
const getSpacingValue = (theme: Theme, spacing: GridSpacing): number => {
  switch (spacing) {
    case 'none': return 0;
    case 'xs': return theme.spacing.xs;
    case 'sm': return theme.spacing.sm;
    case 'lg': return theme.spacing.lg;
    case 'xl': return theme.spacing.xl;
    default: return theme.spacing.md;
  }
};

const getResponsiveColumns = (breakpoints: GridBreakpoints, screenWidth: number): number => {
  if (screenWidth >= 1280 && breakpoints.xl) return breakpoints.xl;
  if (screenWidth >= 1024 && breakpoints.lg) return breakpoints.lg;
  if (screenWidth >= 768 && breakpoints.md) return breakpoints.md;
  if (screenWidth >= 640 && breakpoints.sm) return breakpoints.sm;
  return breakpoints.xs || 12;
};

export const Grid: React.FC<GridProps> = ({
  children,
  container = false,
  columns = 12,
  spacing = 'md',
  rowSpacing,
  columnSpacing,
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  direction = 'row',
  wrap = 'wrap',
  equalHeight = false,
  disableGutters = false,
  style,
  testID,
}) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const containerStyles = StyleSheet.create({
    container: {
      flexDirection: direction,
      flexWrap: wrap,
      alignItems,
      justifyContent,
      width: container ? '100%' : undefined,
      marginHorizontal: disableGutters ? 0 : -getSpacingValue(theme, columnSpacing || spacing) / 2,
      marginVertical: disableGutters ? 0 : -getSpacingValue(theme, rowSpacing || spacing) / 2,
    },
    item: {
      paddingHorizontal: disableGutters ? 0 : getSpacingValue(theme, columnSpacing || spacing) / 2,
      paddingVertical: disableGutters ? 0 : getSpacingValue(theme, rowSpacing || spacing) / 2,
      height: equalHeight ? '100%' : undefined,
    },
  });

  return (
    <View
      style={[containerStyles.container, style]}
      testID={testID}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        return (
          <View style={containerStyles.item}>{child}</View>
        );
      })}
    </View>
  );
};
