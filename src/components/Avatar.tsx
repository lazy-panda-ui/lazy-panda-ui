import React from 'react';
import { Image, View, StyleSheet, ViewStyle, Text } from 'react-native';
import { useTheme, Theme } from '../theme/ThemeProvider';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  source?: { uri: string };
  label?: string;
  size?: AvatarSize;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({ source, label, size = 'md', style }) => {
  const theme = useTheme();

  const getFontSize = (size: AvatarSize, theme: Theme) => {
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

  const getStyles = (theme: Theme, size: AvatarSize) => {
    const dimension = theme.sizing[size];
    const fontSize = getFontSize(size, theme);

    return StyleSheet.create({
      container: {
        width: dimension,
        height: dimension,
        borderRadius: dimension / 2,
        backgroundColor: theme.colors.card,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: theme.colors.border,
      },
      image: {
        width: dimension,
        height: dimension,
        borderRadius: dimension / 2,
      },
      label: {
        color: theme.colors.text,
        fontWeight: theme.fontWeight.semibold,
        fontSize: fontSize,
      },
    });
  };

  const styles = getStyles(theme, size);

  return (
    <View style={[styles.container, style]}>
      {source ? (
        <Image source={source} style={styles.image} />
      ) : (
        <Text style={styles.label}>{label && label.length > 0 ? label[0] : '?'}</Text>
      )}
    </View>
  );
};
