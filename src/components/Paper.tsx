import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useTheme, Theme } from '../theme';

export type PaperVariant = 'elevated' | 'outlined' | 'filled';
export type PaperRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type PaperElevation = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24;

export interface PaperProps {
  /**
   * Content to be rendered inside the paper
   */
  children: React.ReactNode;
  /**
   * Visual variant of the paper
   * @default 'elevated'
   */
  variant?: PaperVariant;
  /**
   * Border radius size
   * @default 'md'
   */
  radius?: PaperRadius;
  /**
   * Elevation level (affects shadow and elevation on Android)
   * @default 1
   */
  elevation?: PaperElevation;
  /**
   * Whether the paper is pressable
   * @default false
   */
  pressable?: boolean;
  /**
   * Callback when paper is pressed
   */
  onPress?: () => void;
  /**
   * Whether to center the content
   * @default false
   */
  center?: boolean;
  /**
   * Additional styles for the container
   */
  style?: ViewStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const Paper: React.FC<PaperProps> = ({
  children,
  variant = 'elevated',
  radius = 'md',
  elevation = 1,
  pressable = false,
  onPress,
  center = false,
  style,
  testID,
}) => {
  const theme = useTheme();

  const getElevationStyle = (level: PaperElevation) => {
    if (Platform.OS === 'ios') {
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: level / 2 },
        shadowOpacity: 0.15 + level * 0.01,
        shadowRadius: level,
      };
    }
    return {
      elevation: level,
    };
  };

  const containerStyle = [
    styles(theme).base,
    {
      borderRadius: radius === 'none' ? 0 : theme.borderRadius[radius],
    },
    variant === 'elevated' && getElevationStyle(elevation),
    variant === 'outlined' && styles(theme).outlined,
    variant === 'filled' && styles(theme).filled,
    center && styles(theme).centered,
    center && variant === 'elevated' && getElevationStyle(elevation),
    style,
  ];

  if (pressable) {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        activeOpacity={0.7}
        testID={testID}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={containerStyle}
      testID={testID}
    >
      {children}
    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  base: {
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
  },
  filled: {
    backgroundColor: theme.colors.surfaceVariant,
  },
  outlined: {
    borderColor: theme.colors.outline,
    borderWidth: 1,
  },
});
