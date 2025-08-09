import React from 'react';
import { View, StyleSheet, ViewStyle, useWindowDimensions } from 'react-native';
import { useTheme, Theme } from '../theme';

export interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  maxWidth?: number; // overrides token-based maxWidth
  padding?: keyof Theme['spacing']; // overrides token-based padding
}

const defaultProps = {
  maxWidth: 1200,
  padding: 'lg' as const,
};

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  maxWidth = defaultProps.maxWidth,
  padding = defaultProps.padding,
}) => {
  const theme = useTheme();
  const { width: winWidth } = useWindowDimensions();

  // Pick breakpoint
  const bp = React.useMemo(() => {
    const { md, lg, xl } = theme.container.breakpoints;
    if (winWidth >= xl) return 'xl' as const;
    if (winWidth >= lg) return 'lg' as const;
    if (winWidth >= md) return 'md' as const;
    return 'sm' as const;
  }, [theme.container.breakpoints, winWidth]);

  // Resolve maxWidth and paddingX from tokens unless overridden
  const resolvedMaxWidth = React.useMemo(() => {
    if (maxWidth !== undefined && maxWidth !== defaultProps.maxWidth) return maxWidth;
    return theme.container.maxWidths[bp];
  }, [bp, maxWidth, theme.container.maxWidths]);

  const resolvedPaddingX = React.useMemo(() => {
    if (padding !== undefined && padding !== defaultProps.padding) return theme.spacing[padding];
    // Map bp to token padding scale
    const pxTokens = theme.container.paddingX;
    switch (bp) {
      case 'xl':
      case 'lg':
        return pxTokens.lg;
      case 'md':
        return pxTokens.md;
      default:
        return pxTokens.sm;
    }
  }, [bp, padding, theme.container.paddingX, theme.spacing]);

  const s = React.useMemo(() => styles(resolvedMaxWidth, resolvedPaddingX), [resolvedMaxWidth, resolvedPaddingX]);

  return <View style={[s.container, style]}>{children}</View>;
};

const styles = (maxWidth: number, paddingHorizontal: number) =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      maxWidth,
      paddingHorizontal,
      width: '100%',
    },
  });
