import React, { useMemo } from 'react';
import { Image, View, StyleSheet, ViewStyle, Text, ImageSourcePropType, Pressable, ImageStyle, TextStyle } from 'react-native';
import type { StyleProp } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarVariant = 'circular' | 'rounded' | 'square';

export interface AvatarProps {
  /**
   * Image source for the avatar
   */
  source?: ImageSourcePropType;
  /**
   * Text to show when image is not provided
   */
  label?: string;
  /**
   * Size of the avatar
   * @default 'md'
   */
  size?: AvatarSize;
  /**
   * Shape of the avatar
   * @default 'circular'
   */
  variant?: AvatarVariant;
  /**
   * Custom styles for the container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Custom styles for the image
   */
  imageStyle?: StyleProp<ImageStyle>;
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Background color for the avatar when showing text
   */
  backgroundColor?: string;
  /**
   * Text color for the label
   */
  textColor?: string;
  /**
   * Callback when avatar is pressed
   */
  onPress?: () => void;
  /**
   * Test ID for testing
   */
  testID?: string;
  /**
   * Whether to show a border
   * @default false
   */
  showBorder?: boolean;
  /**
   * Color of the border
   */
  borderColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  label,
  size = 'md',
  variant = 'circular',
  style,
  imageStyle,
  labelStyle,
  backgroundColor,
  textColor,
  onPress,
  testID,
  showBorder = false,
  borderColor,
}) => {
  const theme = useTheme();
  const tokens = theme.avatar;
  const dimension = tokens.sizes[size];
  const fontSize = tokens.fontSizes[size];
  const borderRadius = useMemo(() => {
    switch (variant) {
      case 'rounded':
        return dimension / tokens.roundedFactor;
      case 'square':
        return 0;
      default:
        return dimension / 2;
    }
  }, [dimension, tokens.roundedFactor, variant]);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: backgroundColor || tokens.background,
      borderRadius: borderRadius,
      height: dimension,
      justifyContent: 'center',
      overflow: 'hidden',
      width: dimension,
      ...(showBorder && {
        borderWidth: tokens.borderWidth,
        borderColor: borderColor || tokens.borderColor,
      }),
    },
    image: {
      borderRadius: borderRadius,
      height: dimension,
      width: dimension,
    },
    label: {
      color: textColor || tokens.foreground,
      fontSize: fontSize,
      fontWeight: theme.fontWeight.semibold,
    },
  }), [backgroundColor, borderColor, borderRadius, dimension, fontSize, showBorder, textColor, theme.fontWeight.semibold, tokens]);

  const Component = onPress ? Pressable : View;

  return (
    <Component 
      style={[styles.container, style]}
      onPress={onPress}
      testID={testID}
    >
      {source ? (
  <Image source={source} style={[styles.image, imageStyle]} />
      ) : (
  <Text style={[styles.label, labelStyle]}>{label && label.length > 0 ? label[0] : '?'}</Text>
      )}
    </Component>
  );
};
