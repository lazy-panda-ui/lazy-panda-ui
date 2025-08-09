import React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  Pressable,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

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

  const padding = React.useMemo(() => theme.card.sizes[size].padding, [size, theme.card.sizes]);

  const shadowStyle = React.useMemo<ViewStyle>(() => {
    if (variant !== 'elevated' || disabled) return {};
    const s = theme.card.variants.elevated.shadow;
    return Platform.select({
      ios: {
        shadowColor: s.color,
        shadowOffset: { width: 0, height: s.offsetY },
        shadowOpacity: s.opacity,
        shadowRadius: s.radius,
      },
      android: { elevation: elevation ?? s.elevation },
      default: {},
    }) as ViewStyle;
  }, [disabled, elevation, theme.card.variants.elevated.shadow, variant]);

  const baseBackground = React.useMemo(() => {
    if (disabled) return theme.colors.disabled;
    switch (variant) {
      case 'outlined':
        return theme.card.variants.outlined.backgroundColor;
      case 'filled':
        return theme.card.variants.filled.backgroundColor;
      case 'tonal':
        return theme.card.variants.tonal.backgroundColor;
      case 'elevated':
      default:
        return theme.card.variants.elevated.backgroundColor;
    }
  }, [disabled, theme.card.variants, theme.colors.disabled, variant]);

  const styles = React.useMemo(() => StyleSheet.create({
    card: {
      backgroundColor: baseBackground,
      borderColor: variant === 'outlined' ? theme.card.variants.outlined.borderColor : undefined,
      borderRadius: theme.card.borderRadius,
      borderWidth: variant === 'outlined' ? theme.card.variants.outlined.borderWidth : 0,
      marginVertical: theme.spacing.sm,
      overflow: 'hidden',
      padding: padding,
      ...shadowStyle,
    },
    container: {
      opacity: disabled ? theme.card.disabledOpacity : 1,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      backgroundColor: theme.card.loadingOverlay.backgroundColor,
      justifyContent: 'center',
      opacity: theme.card.loadingOverlay.opacity,
    },
  }), [baseBackground, disabled, padding, shadowStyle, theme.card.borderRadius, theme.card.disabledOpacity, theme.card.loadingOverlay.backgroundColor, theme.card.loadingOverlay.opacity, theme.card.variants.outlined.borderColor, theme.card.variants.outlined.borderWidth, theme.spacing.sm, variant]);

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
      <View style={[styles.card, style]}
        {...(onPress && Platform.OS === 'android' ? { android_ripple: { color: theme.card.ripple.color } } : {})}
      >
        <View style={contentStyle}>{children}</View>
        {loading && (
          <View style={[styles.loadingOverlay, loadingOverlayStyle]}>
            {LoadingComponent || <ActivityIndicator color={theme.colors.onSurface} />}
          </View>
        )}
      </View>
    </CardContainer>
  );
};
