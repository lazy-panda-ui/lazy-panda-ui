import React from 'react';
import { Text, TextStyle } from 'react-native';
import { Theme, useTheme } from '../theme/ThemeProvider';

export interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
  style?: TextStyle;
}

const variantStyles = (theme: Theme) => ({
  h1: { fontSize: theme.fontSize.h1, fontWeight: theme.fontWeight.bold, color: theme.colors.text },
  h2: { fontSize: theme.fontSize.h2, fontWeight: theme.fontWeight.bold, color: theme.colors.text },
  h3: { fontSize: theme.fontSize.h3, fontWeight: theme.fontWeight.bold, color: theme.colors.text },
  h4: { fontSize: theme.fontSize.h4, fontWeight: theme.fontWeight.semibold, color: theme.colors.text },
  h5: { fontSize: theme.fontSize.h5, fontWeight: theme.fontWeight.semibold, color: theme.colors.text },
  h6: { fontSize: theme.fontSize.h6, fontWeight: theme.fontWeight.semibold, color: theme.colors.text },
  subtitle1: { fontSize: theme.fontSize.subtitle1, fontWeight: theme.fontWeight.medium, color: theme.colors.text },
  subtitle2: { fontSize: theme.fontSize.subtitle2, fontWeight: theme.fontWeight.medium, color: theme.colors.text },
  body1: { fontSize: theme.fontSize.body1, fontWeight: theme.fontWeight.regular, color: theme.colors.text },
  body2: { fontSize: theme.fontSize.body2, fontWeight: theme.fontWeight.regular, color: theme.colors.text },
  caption: { fontSize: theme.fontSize.caption, fontWeight: theme.fontWeight.regular, color: theme.colors.text },
  overline: { fontSize: theme.fontSize.overline, fontWeight: theme.fontWeight.medium, color: theme.colors.text, textTransform: 'uppercase' },
});

export const Typography: React.FC<TypographyProps> = ({ children, variant = 'body1', style }) => {
  const theme = useTheme();
  return (
    <Text style={[variantStyles(theme)[variant], style]}>{children}</Text>
  );
};
