import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import type { StyleProp } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface BackdropProps {
  open: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  /** Override backdrop color (e.g., '#000000') */
  color?: string;
  /** Override backdrop opacity (0 - 1) */
  opacity?: number;
  /** If provided, backdrop becomes pressable and calls onPress */
  onPress?: () => void;
  /** Forward pointer events setting */
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
  /** Optional test id for testing */
  testID?: string;
}

export const Backdrop: React.FC<BackdropProps> = ({
  open,
  style,
  children,
  color,
  opacity,
  onPress,
  pointerEvents,
  testID,
}) => {
  const theme = useTheme();
  const tokens = theme.drawer.backdrop; // reuse drawer backdrop tokens for overlays

  const backgroundColor = useMemo(() => {
    const base = color || tokens.color || '#000000';
    const alpha = typeof opacity === 'number' ? opacity : tokens.opacity ?? 0.5;
    // Convert hex like #RRGGBB to rgba string
    const hex = base.replace('#', '');
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }
    // Fallback: assume it's already rgba or named color; append opacity via rgba if possible
    return base;
  }, [color, opacity, tokens.color, tokens.opacity]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        backdrop: {
          ...StyleSheet.absoluteFillObject,
          alignItems: 'center',
          backgroundColor,
          justifyContent: 'center',
          zIndex: 1000,
        },
      }),
    [backgroundColor]
  );

  if (!open) return null;

  const Container = onPress ? Pressable : View;

  return (
    <Container
      style={[styles.backdrop, style]}
      onPress={onPress}
      pointerEvents={pointerEvents}
      testID={testID}
    >
      {children}
    </Container>
  );
};
