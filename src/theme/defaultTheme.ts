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
