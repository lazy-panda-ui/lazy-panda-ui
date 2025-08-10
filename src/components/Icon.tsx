import React from 'react';
import { Text, View, ViewStyle, TextStyle } from 'react-native';
import { useTheme, Theme } from '../theme';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
// Removed IconColor type; use string directly in props.

export interface IconProps {
  /**
   * Icon name or glyph (string, SVG, or custom component)
   */
  name?: string;
  /**
   * Custom icon component (SVG, etc.)
   */
  component?: React.ReactNode;
  /**
   * Size of the icon (theme size or px)
   * @default 'md'
   */
  size?: IconSize;
  /**
   * Color of the icon (theme color key or custom string)
   * @default 'default'
   */
  color?: string;
  /**
   * Additional style
   */
  style?: ViewStyle | TextStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  component,
  size = 'md',
  color = 'default',
  style,
  testID,
}) => {
  const theme = useTheme();
  const iconSize = typeof size === 'number' ? size : theme.icon.sizes[size] ?? theme.icon.sizes.md;
  const iconColor = theme.icon.colors[color as keyof Theme['icon']['colors']] ?? color;

  // Memoize style for performance
  const iconStyle = React.useMemo(() => ({
    fontSize: iconSize,
    color: iconColor,
    width: iconSize,
    height: iconSize,
    textAlign: 'center' as TextStyle['textAlign'],
    ...style,
  }), [iconSize, iconColor, style]);

  // Render custom component (SVG, etc.)
  if (component) {
    return (
      <View style={iconStyle} testID={testID}>
        {component}
      </View>
    );
  }

  // Render glyph as text (for font icons)
  if (name) {
    return (
      <Text style={iconStyle} testID={testID}>
        {name}
      </Text>
    );
  }

  // Fallback: empty view
  return <View style={iconStyle} testID={testID} />;
};
