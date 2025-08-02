import React from 'react';
import { StyleSheet, View, ViewStyle, Pressable, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { getColorByVariant } from '../utils/themeHelpers';

export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'tonal';
export type CardSize = 'small' | 'medium' | 'large';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  style?: ViewStyle;
  elevation?: number;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  size = 'medium',
  style,
  elevation = 2,
  disabled = false,
  loading = false,
  onPress,
  testID,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const theme = useTheme();

  const getPadding = (size: CardSize) => {
    switch (size) {
      case 'small':
        return theme.spacing.sm;
      case 'large':
        return theme.spacing.lg;
      default:
        return theme.spacing.md;
    }
  };

  const getElevation = (variant: CardVariant, elevation: number) => {
    if (variant !== 'elevated' || disabled) return 0;
    return elevation;
  };

  const variantColors = getColorByVariant(theme, variant, disabled);

  const styles = StyleSheet.create({
    container: {
      opacity: disabled ? 0.6 : 1,
    },
    card: {
      backgroundColor: variantColors.surface,
      borderRadius: theme.borderRadius.md,
      padding: getPadding(size),
      borderWidth: variant === 'outlined' ? 1 : 0,
      borderColor: variantColors.border,
      marginVertical: theme.spacing.sm,
      overflow: 'hidden',
      ...(variant === 'elevated' && {
        shadowColor: theme.colors.text,
        shadowOffset: { width: 0, height: elevation },
        shadowOpacity: 0.1 * elevation,
        shadowRadius: elevation,
        elevation: getElevation(variant, elevation),
      }),
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: variantColors.surface,
      opacity: 0.7,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const CardContainer = onPress ? Pressable : View;

  return (
    <CardContainer
      style={[styles.container, style]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled || loading}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled, busy: loading }}
    >
      <View style={styles.card}>
        {children}
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator color={variantColors.onSurface} />
          </View>
        )}
      </View>
    </CardContainer>
  );
};
