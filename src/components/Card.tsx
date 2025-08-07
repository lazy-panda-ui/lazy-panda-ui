import React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { getColorByVariant } from '../utils/themeHelpers';

export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'tonal';
export type CardSize = 'small' | 'medium' | 'large';

export interface CardProps {
  /**
   * Content to be rendered inside the card
   */
  children: React.ReactNode;

  /**
   * Visual variant of the card
   * @default 'elevated'
   */
  variant?: CardVariant;

  /**
   * Size of the card that determines padding
   * @default 'medium'
   */
  size?: CardSize;

  /**
   * Elevation level for shadow (only applies to 'elevated' variant)
   * @default 2
   */
  elevation?: number;

  /**
   * Whether the card is in a disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to show a loading indicator
   * @default false
   */
  loading?: boolean;

  /**
   * Called when the card is pressed
   */
  onPress?: () => void;

  /**
   * Additional styles for the card
   */
  style?: ViewStyle;

  /**
   * Additional styles for the container
   */
  containerStyle?: ViewStyle;

  /**
   * Additional styles for the content wrapper
   */
  contentStyle?: ViewStyle;

  /**
   * Additional styles for the loading overlay
   */
  loadingOverlayStyle?: ViewStyle;

  /**
   * Custom loading indicator component
   */
  LoadingComponent?: React.ReactNode;

  /**
   * The label used by screen readers to describe the card
   */
  accessibilityLabel?: string;

  /**
   * Additional description for screen readers about the action that will be performed
   */
  accessibilityHint?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  size = 'medium',
  elevation = 2,
  disabled = false,
  loading = false,
  onPress,
  containerStyle,
  contentStyle,
  loadingOverlayStyle,
  LoadingComponent,
  accessibilityLabel,
  accessibilityHint,
  testID,
  style,
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
    card: {
      backgroundColor: variantColors.surface,
      borderColor: variantColors.border,
      borderRadius: theme.borderRadius.md,
      borderWidth: variant === 'outlined' ? 1 : 0,
      marginVertical: theme.spacing.sm,
      overflow: 'hidden',
      padding: getPadding(size),
      ...(variant === 'elevated' && {
        shadowColor: theme.colors.text,
        shadowOffset: { width: 0, height: elevation },
        shadowOpacity: 0.1 * elevation,
        shadowRadius: elevation,
        elevation: getElevation(variant, elevation),
      }),
    },
    container: {
      opacity: disabled ? 0.6 : 1,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      backgroundColor: variantColors.surface,
      justifyContent: 'center',
      opacity: 0.7,
    },
  });

  const CardContainer = onPress ? Pressable : View;

  return (
    <CardContainer
      style={[styles.container, containerStyle]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled || loading}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled, busy: loading }}
    >
      <View style={[styles.card, style]}>
        <View style={contentStyle}>{children}</View>
        {loading && (
          <View style={[styles.loadingOverlay, loadingOverlayStyle]}>
            {LoadingComponent || <ActivityIndicator color={variantColors.onSurface} />}
          </View>
        )}
      </View>
    </CardContainer>
  );
};
