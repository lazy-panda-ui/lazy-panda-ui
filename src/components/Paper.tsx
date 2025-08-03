import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Theme } from '../theme/ThemeProvider';

export type PaperRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';

export interface PaperProps {
  /**
   * Content to be rendered inside the paper
   */
  children: React.ReactNode;
  /**
   * Additional styles for the paper
   */
  style?: ViewStyle;
  /**
   * Elevation level (affects shadow and elevation on Android)
   * @default 2
   */
  elevation?: number;
  /**
   * Border radius size
   * @default 'md'
   */
  radius?: PaperRadius;
}

export const Paper: React.FC<PaperProps> = ({
  children,
  style,
  elevation = 2,
  radius = 'md'
}) => {
  const theme = useTheme();
  return (
    <View 
      style={[
        styles(theme, elevation, radius).paper,
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = (theme: Theme, elevation: number, radius: PaperRadius) => StyleSheet.create({
  paper: {
    backgroundColor: theme.colors.card,
    borderRadius: radius === 'none' ? 0 : theme.borderRadius[radius],
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: elevation },
    shadowOpacity: 0.1 * elevation,
    shadowRadius: 2 * elevation,
    elevation,
  },
});
