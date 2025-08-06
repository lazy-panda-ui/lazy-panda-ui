---
sidebar_position: 1
title: Theme Customization
description: Learn how to customize themes in Lazy Panda UI
---

# Theme Customization

Lazy Panda UI comes with a powerful theming system that allows you to customize the look and feel of your application. The theming system is built on top of React's Context API and provides a way to customize colors, spacing, typography, and more.

## Theme Interface

The theme interface is defined as follows:

```typescript
interface Theme {
  colors: {
    // Primary colors
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;

    // Secondary colors
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;

    // Background colors
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;

    // Utility colors
    outline: string;
    card: string;
    text: string;
    border: string;

    // Status colors
    error: string;
    onError: string;
    success: string;
    onSuccess: string;
    warning: string;
    onWarning: string;
    info: string;
    onInfo: string;
    disabled: string;
    onDisabled: string;
  };

  spacing: {
    xs: number; // 4
    sm: number; // 8
    md: number; // 16
    lg: number; // 24
    xl: number; // 32
  };

  fontSize: {
    h1: number;      // 32
    h2: number;      // 28
    h3: number;      // 24
    h4: number;      // 20
    h5: number;      // 18
    h6: number;      // 16
    subtitle1: number; // 16
    subtitle2: number; // 14
    body1: number;    // 16
    body2: number;    // 14
    caption: number;  // 12
    overline: number; // 12
  };

  borderRadius: {
    xs: number; // 4
    sm: number; // 8
    md: number; // 12
    lg: number; // 16
    xl: number; // 24
    full: number; // 9999
  };

  sizing: {
    xs: number; // 24
    sm: number; // 32
    md: number; // 40
    lg: number; // 48
    xl: number; // 56
  };

  iconSize: {
    xs: number; // 16
    sm: number; // 20
    md: number; // 24
    lg: number; // 32
    xl: number; // 40
  };

  fontWeight: {
    light: "300";
    regular: "400";
    medium: "500";
    semibold: "600";
    bold: "700";
  };
}
```

## Using the Theme Provider

To use the theme in your application, wrap your app with the `ThemeProvider`:

```tsx
import { ThemeProvider, lightTheme } from '@lazy-panda-ui/lazy-panda-ui';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Available Themes

### Light Theme (Default)

The light theme is the default theme and provides a clean, bright appearance suitable for most applications.

```tsx
import { ThemeProvider, lightTheme } from '@lazy-panda-ui/lazy-panda-ui';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Dark Theme

The dark theme provides a darker color scheme that's easier on the eyes in low-light conditions.

```tsx
import { ThemeProvider, darkTheme } from '@lazy-panda-ui/lazy-panda-ui';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Creating Custom Themes

You can create custom themes by using the `createTheme` function. This function merges your custom values with the default theme.

### Basic Theme Customization

```tsx
import { createTheme, ThemeProvider } from '@lazy-panda-ui/lazy-panda-ui';

const customTheme = createTheme({
  colors: {
    primary: '#FF0000',
    onPrimary: '#FFFFFF',
  },
  spacing: {
    md: 20,
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Advanced Theme Customization

You can customize any part of the theme:

```tsx
import { createTheme, ThemeProvider } from '@lazy-panda-ui/lazy-panda-ui';

const customTheme = createTheme({
  colors: {
    primary: '#6200EE',
    onPrimary: '#FFFFFF',
    primaryContainer: '#E9DDFF',
    onPrimaryContainer: '#21005E',
    secondary: '#625B71',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E8DEF8',
    onSecondaryContainer: '#1E192B',
    background: '#FFFBFF',
    onBackground: '#1C1B1F',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 32,
    xl: 64,
  },
  fontSize: {
    h1: 36,
    body1: 18,
  },
  borderRadius: {
    sm: 4,
    md: 8,
  },
});
```

## Using Theme Values in Components

You can access theme values in your components using the `useTheme` hook:

```tsx
import { useTheme } from '@lazy-panda-ui/lazy-panda-ui';
import { View, Text, StyleSheet } from 'react-native';

function MyComponent() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ 
        color: theme.colors.primary,
        fontSize: theme.fontSize.body1,
        fontWeight: theme.fontWeight.medium,
      }}>
        Hello World
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
});
```

## Color System

The color system follows Material Design principles with semantic color naming:

- `primary`: The primary brand color
- `onPrimary`: Text/icons that appear on primary color
- `primaryContainer`: A lighter/darker version of primary for containers
- `onPrimaryContainer`: Text/icons that appear on primaryContainer
- `secondary`: The secondary brand color
- `surfaceVariant`: Alternative surface color for components
- `onSurfaceVariant`: Text/icons that appear on surfaceVariant

### Status Colors

- `error`: For error states and destructive actions
- `success`: For success states and completed actions
- `warning`: For warning states and cautionary actions
- `info`: For informational states and neutral actions

## Spacing System

The spacing system uses a consistent scale:

- `xs`: 4 - For very small gaps
- `sm`: 8 - For small gaps
- `md`: 16 - For medium gaps (default)
- `lg`: 24 - For large gaps
- `xl`: 32 - For extra large gaps

## Typography System

The typography system provides consistent text sizes:

- Headings: `h1` through `h6`
- Body text: `body1` (primary) and `body2` (secondary)
- Other: `subtitle1`, `subtitle2`, `caption`, `overline`

## Best Practices

1. **Color Usage**:
   - Use semantic color tokens (e.g., `primary`, `onPrimary`) instead of direct color values
   - Use appropriate color pairs (e.g., `primary` with `onPrimary`)

2. **Spacing**:
   - Use theme spacing values for consistency
   - Combine spacing values for larger gaps

3. **Typography**:
   - Use the predefined font sizes for consistent text hierarchy
   - Combine with appropriate font weights

4. **Dark Mode Support**:
   - Test your custom theme in both light and dark modes
   - Ensure sufficient contrast ratios

## Migration Guide

If you're migrating from an older version or a different design system:

1. Replace direct color values with theme tokens
2. Update spacing values to use theme spacing
3. Standardize font sizes using theme typography
4. Update border radiuses to use theme values

## Examples

### Custom Button Theme

```tsx
import { createTheme } from '@lazy-panda-ui/lazy-panda-ui';

const theme = createTheme({
  colors: {
    primary: '#0066CC',
    onPrimary: '#FFFFFF',
    primaryContainer: '#CCE0FF',
    onPrimaryContainer: '#003366',
  },
  borderRadius: {
    sm: 6,
    md: 10,
  },
});
```

### Custom Card Theme

```tsx
import { createTheme } from '@lazy-panda-ui/lazy-panda-ui';

const theme = createTheme({
  colors: {
    surface: '#FFFFFF',
    onSurface: '#1C1B1F',
    surfaceVariant: '#F3F3F3',
  },
  spacing: {
    md: 20,
    lg: 28,
  },
  borderRadius: {
    md: 16,
  },
});
```
