import { createTheme } from './ThemeProvider';

// Example of creating a custom theme with dark mode colors
export const darkTheme = createTheme({
  colors: {
    // Base colors
    primary: '#60A5FA', // Brighter blue for dark mode
    onPrimary: '#FFFFFF',
    primaryContainer: '#1E3A8A',
    onPrimaryContainer: '#BFDBFE',

    // Secondary colors
    secondary: '#818CF8',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#312E81',
    onSecondaryContainer: '#E0E7FF',

    // Background and surface colors
    background: '#1E1E1E',
    onBackground: '#FFFFFF',
    surface: '#2D2D2D',
    onSurface: '#FFFFFF',
    surfaceVariant: '#3D3D3D',
    onSurfaceVariant: '#E5E5E5',

    // Other colors
    outline: '#6B7280',
    card: '#2D2D2D',
    text: '#FFFFFF',
    border: '#4B5563',

    // Status colors
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
  },
  // You can override other theme properties as needed
  spacing: {
    // Keep default spacing
  },
  fontSize: {
    // Keep default font sizes
  },
  borderRadius: {
    // Keep default border radiuses
  },
  // ... other theme properties
});

// Example of creating a high contrast theme
export const highContrastTheme = createTheme({
  colors: {
    primary: '#0000FF', // Pure blue
    onPrimary: '#FFFFFF',
    primaryContainer: '#000080', // Navy
    onPrimaryContainer: '#FFFFFF',
    secondary: '#800080', // Purple
    onSecondary: '#FFFFFF',
    secondaryContainer: '#4B0082', // Indigo
    onSecondaryContainer: '#FFFFFF',
    background: '#FFFFFF',
    onBackground: '#000000',
    surface: '#FFFFFF',
    onSurface: '#000000',
    surfaceVariant: '#F0F0F0',
    onSurfaceVariant: '#000000',
    outline: '#000000',
    card: '#FFFFFF',
    text: '#000000',
    border: '#000000',
    error: '#FF0000',
    onError: '#FFFFFF',
    success: '#008000',
    onSuccess: '#FFFFFF',
    warning: '#FFA500',
    onWarning: '#000000',
    info: '#0000FF',
    onInfo: '#FFFFFF',
    disabled: '#808080',
    onDisabled: '#000000',
  },
  // Increase spacing for better readability
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
  },
  // Increase font sizes for better readability
  fontSize: {
    h1: 36,
    h2: 32,
    h3: 28,
    h4: 24,
    h5: 20,
    h6: 18,
    subtitle1: 18,
    subtitle2: 16,
    body1: 18,
    body2: 16,
    caption: 14,
    overline: 14,
  },
  // Increase border radius for better visibility
  borderRadius: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 26,
    full: 9999,
  },
});
