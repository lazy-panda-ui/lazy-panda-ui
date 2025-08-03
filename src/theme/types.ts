import { ViewStyle, TextStyle } from 'react-native';
import { baseTheme } from './base';

export interface ComponentStyles {
  alert?: {
    container?: ViewStyle;
    content?: ViewStyle;
    iconContainer?: ViewStyle;
    text?: TextStyle;
    dismissButton?: ViewStyle;
    dismissIcon?: TextStyle;
    variants?: {
      success?: { container?: ViewStyle; text?: TextStyle };
      info?: { container?: ViewStyle; text?: TextStyle };
      warning?: { container?: ViewStyle; text?: TextStyle };
      error?: { container?: ViewStyle; text?: TextStyle };
    };
  };
  card?: {
    container?: ViewStyle;
    content?: ViewStyle;
    loadingOverlay?: ViewStyle;
    variants?: {
      elevated?: ViewStyle;
      outlined?: ViewStyle;
      filled?: ViewStyle;
      tonal?: ViewStyle;
    };
  };
  list?: {
    container?: ViewStyle;
    item?: ViewStyle;
    selectedItem?: ViewStyle;
    disabledItem?: ViewStyle;
    iconContainer?: ViewStyle;
    textContainer?: ViewStyle;
    label?: TextStyle;
    subtitle?: TextStyle;
  };
}

export interface Theme {
  colors: typeof baseTheme.colors;
  spacing: typeof baseTheme.spacing;
  borderRadius: typeof baseTheme.borderRadius;
  fontSizes: typeof baseTheme.fontSizes;
  sizes: typeof baseTheme.sizes;
  fontWeight: {
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  components?: ComponentStyles;
}
