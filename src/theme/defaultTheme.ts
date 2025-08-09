import { Theme } from './types';

// Shared theme values that don't change between light and dark modes
export const baseTheme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fontSize: {
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    h6: 16,
    subtitle1: 16,
    subtitle2: 14,
    body1: 16,
    body2: 14,
    caption: 12,
    overline: 12,
  },
  borderRadius: {
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    full: 9999,
  },
  sizing: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
  },
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  },
  fontWeight: {
    light: "300" as const,
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  drawer: {
    backdrop: {
      color: '#000000',
      opacity: 0.5,
    },
    container: {
      backgroundColor: 'transparent', // Will use surface color from theme
      borderRadius: 0,
      shadow: {
        color: '#000000',
        offset: {
          width: 0,
          height: 2,
        },
        opacity: 0.25,
        radius: 3.84,
        elevation: 5,
      },
    },
    header: {
      borderColor: 'transparent', // Will use border color from theme
      borderWidth: 1,
      padding: 16,
      minHeight: 56,
    },
    content: {
      padding: 16,
    },
    footer: {
      borderColor: 'transparent', // Will use border color from theme
      borderWidth: 1,
      padding: 16,
      minHeight: 56,
    },
    animation: {
      duration: 300,
      easing: 'easeInOut' as const,
    },
    sizes: {
      sm: 0.25,
      md: 0.4,
      lg: 0.6,
      xl: 0.8,
    },
  },
} as const;
// Color palettes
const lightPalette: Theme['colors'] = {
  primary: '#007AFF',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EAF3FF',
  onPrimaryContainer: '#004C99',
  secondary: '#5856D6',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#EAEAFF',
  onSecondaryContainer: '#353480',
  background: '#FFFFFF',
  onBackground: '#000000',
  surface: '#FFFFFF',
  onSurface: '#000000',
  surfaceVariant: '#F2F2F7',
  onSurfaceVariant: '#1C1C1E',
  outline: '#C7C7CC',
  card: '#F2F2F7',
  text: '#000000',
  border: '#C7C7CC',
  error: '#FF3B30',
  onError: '#FFFFFF',
  success: '#34C759',
  onSuccess: '#FFFFFF',
  warning: '#FF9500',
  onWarning: '#FFFFFF',
  info: '#5856D6',
  onInfo: '#FFFFFF',
  disabled: '#E5E5EA',
  onDisabled: '#8E8E93',
};

const darkPalette: Theme['colors'] = {
  primary: '#60A5FA',
  onPrimary: '#FFFFFF',
  primaryContainer: '#1E3A8A',
  onPrimaryContainer: '#BFDBFE',
  secondary: '#818CF8',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#312E81',
  onSecondaryContainer: '#E0E7FF',
  background: '#1E1E1E',
  onBackground: '#FFFFFF',
  surface: '#2D2D2D',
  onSurface: '#FFFFFF',
  surfaceVariant: '#3D3D3D',
  onSurfaceVariant: '#E5E5E5',
  outline: '#6B7280',
  card: '#2D2D2D',
  text: '#FFFFFF',
  border: '#4B5563',
  error: '#EF4444',
  onError: '#FFFFFF',
  success: '#10B981',
  onSuccess: '#FFFFFF',
  warning: '#F59E0B',
  onWarning: '#FFFFFF',
  info: '#3B82F6',
  onInfo: '#FFFFFF',
  disabled: '#4B5563',
  onDisabled: '#9CA3AF',
};

// Builder to derive a full Theme from a palette + shared metrics
const buildTheme = (colors: Theme['colors'], opts?: { isDark?: boolean }): Theme => {
  const isDark = !!opts?.isDark;

  return {
    ...baseTheme,
    colors,
    badge: {
      sizes: {
        small: { height: 16, minWidth: 16, dot: 8, paddingX: 4 },
        medium: { height: 20, minWidth: 20, dot: 10, paddingX: 6 },
        large: { height: 24, minWidth: 24, dot: 12, paddingX: 8 },
      },
      fontSizes: { small: 10, medium: 12, large: 14 },
      borderWidth: 1,
    },
    avatar: {
      sizes: { xs: 24, sm: 32, md: 40, lg: 48, xl: 56 },
      fontSizes: {
        xs: baseTheme.fontSize.caption,
        sm: baseTheme.fontSize.body2,
        md: baseTheme.fontSize.body1,
        lg: baseTheme.fontSize.h5,
        xl: baseTheme.fontSize.h4,
      },
      background: colors.card,
      foreground: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
      roundedFactor: 4,
    },
    autocomplete: {
      input: {
        backgroundColor: colors.surface,
        borderColor: colors.outline,
        borderWidth: 1,
        borderRadius: baseTheme.borderRadius.md,
        padding: baseTheme.spacing.sm,
        placeholderColor: colors.outline,
        textColor: colors.onSurface,
        fontSize: baseTheme.fontSize.body1,
      },
      list: {
        backgroundColor: colors.card,
        borderRadius: baseTheme.borderRadius.md,
        maxHeight: baseTheme.sizing.xl * 2,
        borderColor: colors.outline,
        borderWidth: 0,
      },
      item: {
        padding: baseTheme.spacing.sm,
        dividerColor: colors.outline,
  dividerWidth: 1,
        textColor: colors.onSurface,
        fontSize: baseTheme.fontSize.body1,
      },
    },
    appBar: {
      heights: { small: 48, medium: 56, large: 64 },
      paddingX: baseTheme.spacing.md,
      action: {
        borderRadius: baseTheme.borderRadius.sm,
        spacing: baseTheme.spacing.xs,
      },
      title: {
        fontSize: baseTheme.fontSize.h6,
        fontWeight: baseTheme.fontWeight.medium,
      },
      subtitle: {
        fontSize: baseTheme.fontSize.caption,
        opacity: 0.8,
      },
      variants: {
        primary: { background: colors.primary, foreground: colors.onPrimary, borderColor: colors.outline, elevation: 4 },
        secondary: { background: colors.secondary, foreground: colors.onSecondary, borderColor: colors.outline, elevation: 4 },
        surface: { background: colors.surface, foreground: colors.onSurface, borderColor: colors.outline, elevation: 0 },
        elevated: { background: colors.surfaceVariant, foreground: colors.onSurface, borderColor: colors.outline, elevation: 2 },
        transparent: { background: 'transparent', foreground: colors.onSurface, borderColor: colors.outline, elevation: 0 },
      },
    },
    alert: {
      padding: baseTheme.spacing.md,
      borderRadius: baseTheme.borderRadius.md,
      borderWidth: 1,
      iconSize: baseTheme.iconSize.md,
      type: {
        info: { bg: colors.info, fg: colors.onInfo, border: colors.info },
        success: { bg: colors.success, fg: colors.onSuccess, border: colors.success },
        warning: { bg: colors.warning, fg: colors.onWarning, border: colors.warning },
        error: { bg: colors.error, fg: colors.onError, border: colors.error },
      },
    },
    accordion: {
      container: {
        backgroundColor: colors.surface,
        borderRadius: baseTheme.borderRadius.md,
        borderColor: colors.outline,
        borderWidth: 1,
      },
      header: {
        backgroundColor: colors.surface,
        borderColor: colors.outline,
        borderWidth: 0,
        padding: baseTheme.spacing.md,
        minHeight: baseTheme.sizing.lg,
        titleColor: colors.onSurface,
        subtitleColor: colors.onSurfaceVariant,
      },
      content: {
        backgroundColor: colors.surface,
        padding: baseTheme.spacing.md,
      },
      icon: {
        size: baseTheme.iconSize.md,
        color: colors.onSurfaceVariant,
      },
      animation: {
        duration: 200,
        easing: 'easeInOut',
      },
    },
    drawer: {
      ...baseTheme.drawer,
      backdrop: {
        color: baseTheme.drawer.backdrop.color,
        opacity: isDark ? 0.6 : baseTheme.drawer.backdrop.opacity,
      },
      container: {
        ...baseTheme.drawer.container,
        backgroundColor: colors.surface,
      },
      header: {
        ...baseTheme.drawer.header,
        borderColor: colors.outline,
        backgroundColor: colors.surface,
      },
      content: {
        ...baseTheme.drawer.content,
        backgroundColor: colors.surface,
      },
      footer: {
        ...baseTheme.drawer.footer,
        borderColor: colors.outline,
        backgroundColor: colors.surface,
      },
    },
  };
};

// Light/Dark themes derived from palettes
export const lightTheme: Theme = buildTheme(lightPalette, { isDark: false });
export const darkTheme: Theme = buildTheme(darkPalette, { isDark: true });

// Default theme is light theme
export const defaultTheme = lightTheme;
