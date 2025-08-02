import React, { createContext, useContext, ReactNode } from 'react';

export interface Theme {
  colors: {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    outline: string;
    card: string;
    text: string;
    border: string;
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
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontSize: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
    subtitle1: number;
    subtitle2: number;
    body1: number;
    body2: number;
    caption: number;
    overline: number;
  };
  borderRadius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  sizing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  iconSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontWeight: {
    light: "300";
    regular: "400";
    medium: "500";
    semibold: "600";
    bold: "700";
  };
}

export const defaultTheme: Theme = {
  colors: {
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
  },
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
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
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
};

const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeProvider = ({ theme = defaultTheme, children }: { theme?: Theme; children: ReactNode }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

export const useTheme = function() { return useContext(ThemeContext) };
