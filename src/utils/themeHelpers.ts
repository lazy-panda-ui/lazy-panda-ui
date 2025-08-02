import { Theme } from '../theme/ThemeProvider';
import { ViewStyle } from 'react-native';

interface VariantColors {
  background: string;
  surface: string;
  onBackground: string;
  onSurface: string;
  border: string;
}

export const getColorByVariant = (theme: Theme, variant: string, disabled: boolean): VariantColors => {
  if (disabled) {
    return {
      background: theme.colors.disabled,
      surface: theme.colors.surface,
      onBackground: theme.colors.onDisabled,
      onSurface: theme.colors.disabled,
      border: theme.colors.disabled,
    };
  }

  switch (variant) {
    case 'filled':
      return {
        background: theme.colors.primary,
        surface: theme.colors.primary,
        onBackground: theme.colors.onPrimary,
        onSurface: theme.colors.onPrimary,
        border: theme.colors.primary,
      };
    case 'tonal':
      return {
        background: theme.colors.primaryContainer,
        surface: theme.colors.primaryContainer,
        onBackground: theme.colors.onPrimaryContainer,
        onSurface: theme.colors.onPrimaryContainer,
        border: theme.colors.primaryContainer,
      };
    case 'outlined':
    default:
      return {
        background: theme.colors.surface,
        surface: theme.colors.surface,
        onBackground: theme.colors.primary,
        onSurface: theme.colors.primary,
        border: theme.colors.outline,
      };
  }
};

interface SizeStyle extends ViewStyle {
  fontSize?: number;
}

export const getSizeStyles = (size: string, theme: Theme): SizeStyle => {
  switch (size) {
    case 'small':
      return {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        fontSize: theme.fontSize.caption,
      };
    case 'large':
      return {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        fontSize: theme.fontSize.body1,
      };
    case 'medium':
    default:
      return {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        fontSize: theme.fontSize.body2,
      };
  }
};
