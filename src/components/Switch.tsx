import React from 'react';
import {
  View,
  StyleSheet,
  Switch as RNSwitch,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type SwitchSize = 'small' | 'medium' | 'large';
export type SwitchVariant = 'default' | 'tonal' | 'outline';

export interface SwitchProps {
  /**
   * Whether the switch is turned on
   */
  value: boolean;
  /**
   * Callback when the switch value changes
   */
  onValueChange: (value: boolean) => void;
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
   * Whether the switch is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Color for the switch when on
   */
  activeColor?: string;
  /**
   * Color for the track when off
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
  value,
  onValueChange,
  size = 'medium',
  variant = 'default',
  disabled = false,
  activeColor,
  inactiveColor,
  style,
  testID,
}) => {
  const theme = useTheme();

  const getTrackColor = () => {
    if (disabled) {
      return theme.colors.disabled;
    }
    return value ? (activeColor || theme.colors.primary) : (inactiveColor || theme.colors.outline);
  };

  const getThumbColor = () => {
    if (disabled) {
      return theme.colors.onDisabled;
    }
    return value ? theme.colors.onPrimary : theme.colors.onSurface;
  };

  const trackSize = getSizeStyles(size);

  return (
    <View style={[styles.container, style]} testID={testID}>
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{
          false: getTrackColor(),
          true: getTrackColor(),
        }}
        thumbColor={getThumbColor()}
        style={[
          {
            width: trackSize.width,
            height: trackSize.height,
            opacity: disabled ? 0.6 : 1,
          },
          variant === 'outline' && {
            borderWidth: 2,
            borderColor: value ? (activeColor || theme.colors.primary) : theme.colors.outline,
            borderRadius: 16,
            padding: 2,
          },
        ]}
      />
    </View>
  );
};

const getSizeStyles = (size: SwitchSize): ViewStyle => {
  switch (size) {
    case 'small':
      return { width: 36, height: 20 };
    case 'large':
      return { width: 56, height: 32 };
    default:
      return { width: 46, height: 26 };
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineContainer: {
    borderRadius: 16,
    padding: 2,
  },
});
