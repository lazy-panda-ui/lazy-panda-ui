import React from 'react';
import { Text, TextStyle, StyleSheet, StyleProp } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'
  | 'button';

export interface TypographyProps {
  /**
   * Content to display
   */
  children: React.ReactNode;

  /**
   * Typography variant
   * @default 'body1'
   */
  variant?: TypographyVariant;

  /**
   * Text color
   */
  color?: string;

  /**
   * Font weight
   */
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

  /**
   * Text alignment
   * @default 'left'
   */
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';

  /**
   * Apply italics
   * @default false
   */
  italic?: boolean;

  /**
   * Number of lines to show
   */
  numberOfLines?: number;

  /**
   * Whether the text is selectable
   * @default false
   */
  selectable?: boolean;

  /**
   * Custom styles
   */
  style?: StyleProp<TextStyle>;
}

const getVariantStyle = (theme: ReturnType<typeof useTheme>, variant: TypographyVariant): TextStyle => {
  switch (variant) {
    case 'h1':
      return {
        fontSize: theme.fontSize.h1,
        fontWeight: theme.fontWeight.light,
        letterSpacing: -1.5,
      };
    case 'h2':
      return {
        fontSize: theme.fontSize.h2,
        fontWeight: theme.fontWeight.light,
        letterSpacing: -0.5,
      };
    case 'h3':
      return {
        fontSize: theme.fontSize.h3,
        fontWeight: theme.fontWeight.regular,
        letterSpacing: 0,
      };
    case 'h4':
      return {
        fontSize: theme.fontSize.h4,
        fontWeight: theme.fontWeight.regular,
        letterSpacing: 0.25,
      };
    case 'h5':
      return {
        fontSize: theme.fontSize.h5,
        fontWeight: theme.fontWeight.regular,
        letterSpacing: 0,
      };
    case 'h6':
      return {
        fontSize: theme.fontSize.h6,
        fontWeight: theme.fontWeight.medium,
        letterSpacing: 0.15,
      };
    case 'subtitle1':
      return {
        fontSize: theme.fontSize.subtitle1,
        fontWeight: theme.fontWeight.regular,
        letterSpacing: 0.15,
      };
    case 'subtitle2':
      return {
        fontSize: theme.fontSize.subtitle2,
        fontWeight: theme.fontWeight.medium,
        letterSpacing: 0.1,
      };
    case 'body1':
      return {
        fontSize: theme.fontSize.body1,
        fontWeight: theme.fontWeight.regular,
        letterSpacing: 0.5,
      };
    case 'body2':
      return {
        fontSize: theme.fontSize.body2,
        fontWeight: theme.fontWeight.regular,
        letterSpacing: 0.25,
      };
    case 'button':
      return {
        fontSize: theme.fontSize.body2,
        fontWeight: theme.fontWeight.medium,
        letterSpacing: 1.25,
        textTransform: 'uppercase',
      };
    case 'caption':
      return {
        fontSize: theme.fontSize.caption,
        fontWeight: theme.fontWeight.regular,
        letterSpacing: 0.4,
      };
    case 'overline':
      return {
        fontSize: theme.fontSize.overline,
        fontWeight: theme.fontWeight.regular,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
      };
    default:
      return {};
  }
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  color,
  weight,
  align = 'left',
  italic = false,
  numberOfLines,
  selectable = false,
  style,
}) => {
  const theme = useTheme();

  const variantStyle = React.useMemo(
    () => getVariantStyle(theme, variant),
    [theme, variant]
  );

  return (
    <Text
      style={[
        styles.base,
        variantStyle,
        {
          color: color || theme.colors.text,
          fontWeight: weight || variantStyle.fontWeight,
          textAlign: align,
          fontStyle: italic ? 'italic' : 'normal',
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      selectable={selectable}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    margin: 0,
  },
});
