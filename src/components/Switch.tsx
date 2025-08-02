import React from 'react';
import {
  Switch as RNSwitch,
  SwitchProps as RNSwitchProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type SwitchSize = 'small' | 'medium' | 'large';
export type SwitchVariant = 'default' | 'tonal' | 'outline';

export interface SwitchProps extends Omit<RNSwitchProps, 'trackColor' | 'thumbColor' | 'ios_backgroundColor'> {
  /**
   * Size of the switch
   * @default 'medium'
   */
  size?: SwitchSize;
  /**
   * Visual variant of the switch
   * @default 'default'
   */
  variant?: SwitchVariant;
  /**
   * Color for the switch when on. Defaults to theme.colors.primary
   */
  activeColor?: string;
  /**
   * Color for the track when off. Defaults to theme.colors.outline
   */
  inactiveColor?: string;
  /**
   * Additional styles for the container
   */
  style?: ViewStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  size = 'medium',
  variant = 'default',
  activeColor,
  inactiveColor,
  style,
  disabled,
  value,
  onValueChange,
  testID,
  ...rest
}) => {
  const theme = useTheme();

  const getTrackColor = (isActive: boolean) => {
    if (disabled) return theme.colors.disabled;
    
    if (isActive) {
      switch (variant) {
        case 'tonal':
          return activeColor || theme.colors.primaryContainer;
        case 'outline':
          return 'transparent';
        default:
          return activeColor || theme.colors.primary;
      }
    } else {
      switch (variant) {
        case 'tonal':
          return inactiveColor || theme.colors.surfaceVariant;
        case 'outline':
          return 'transparent';
        default:
          return inactiveColor || theme.colors.outline;
      }
    }
  };

  const getThumbColor = (isActive: boolean) => {
    if (disabled) return theme.colors.onDisabled;
    
    if (isActive) {
      switch (variant) {
        case 'tonal':
          return activeColor || theme.colors.onPrimaryContainer;
        case 'outline':
          return activeColor || theme.colors.primary;
        default:
          return theme.colors.onPrimary;
      }
    } else {
      return theme.colors.onSurface;
    }
  };

  const getSizeStyles = (size: SwitchSize): ViewStyle => {
    const scales = {
      small: 0.8,
      medium: 1,
      large: 1.2,
    };
    const scale = scales[size];
    
    return {
      transform: [{ scale }],
    };
  };

  const styles = StyleSheet.create({
    container: {
      opacity: disabled ? 0.6 : 1,
      ...getSizeStyles(size),
    },
    outline: {
      ...(variant === 'outline' && {
        borderWidth: 2,
        borderColor: value ? (activeColor || theme.colors.primary) : theme.colors.outline,
        borderRadius: 16,
        padding: 2,
      }),
    },
  });

  return (
    <View style={[styles.container, styles.outline, style]} testID={testID}>
      <RNSwitch
        value={value}
        onValueChange={disabled ? undefined : onValueChange}
        trackColor={{
          false: getTrackColor(false),
          true: getTrackColor(true),
        }}
        thumbColor={getThumbColor(value || false)}
        ios_backgroundColor={getTrackColor(false)}
        disabled={disabled}
        {...rest}
      />
    </View>
  );
};
