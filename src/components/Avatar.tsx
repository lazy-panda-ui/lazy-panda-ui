import React from 'react';
import { Image, View, StyleSheet, ViewStyle, Text, ImageSourcePropType, Pressable, ImageStyle } from 'react-native';
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
  style?: ViewStyle;
  /**
   * Custom styles for the image
   */
  imageStyle?: ImageStyle;
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
  backgroundColor,
  textColor,
  onPress,
  testID,
  showBorder = false,
  borderColor,
}) => {
  const theme = useTheme();

  const getFontSize = () => {
    switch (size) {
      case 'xs':
        return theme.fontSize.caption;
      case 'sm':
        return theme.fontSize.body2;
      case 'lg':
        return theme.fontSize.h5;
      case 'xl':
        return theme.fontSize.h4;
      default:
        return theme.fontSize.body1;
    }
  };

  const getDimension = () => {
    switch (size) {
      case 'xs':
        return 24;
      case 'sm':
        return 32;
      case 'md':
        return 40;
      case 'lg':
        return 48;
      case 'xl':
        return 56;
    }
  };

  const getBorderRadius = () => {
    const dimension = getDimension();
    switch (variant) {
      case 'rounded':
        return dimension / 4;
      case 'square':
        return 0;
      default:
        return dimension / 2;
    }
  };

  const dimension = getDimension();
  const fontSize = getFontSize();
  const borderRadius = getBorderRadius();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: backgroundColor || theme.colors.card,
      borderRadius: borderRadius,
      height: dimension,
      justifyContent: 'center',
      overflow: 'hidden',
      width: dimension,
      ...(showBorder && {
        borderWidth: 1,
        borderColor: borderColor || theme.colors.border,
      }),
    },
    image: {
      borderRadius: borderRadius,
      height: dimension,
      width: dimension,
    },
    label: {
      color: textColor || theme.colors.text,
      fontSize: fontSize,
      fontWeight: theme.fontWeight.semibold,
    },
  });

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
        <Text style={styles.label}>{label && label.length > 0 ? label[0] : '?'}</Text>
      )}
    </Component>
  );
};
