import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text } from 'react-native';
import SliderRN from '@react-native-community/slider';
import { useTheme } from '../theme/ThemeProvider';

export interface SliderProps {
  /**
   * Current value of the slider
   */
  value: number;
  
  /**
   * Called when the value changes
   */
  onValueChange: (value: number) => void;
  
  /**
   * Called when slider interaction starts
   */
  onSlidingStart?: () => void;
  
  /**
   * Called when slider interaction ends
   */
  onSlidingComplete?: (value: number) => void;
  
  /**
   * Minimum value
   * @default 0
   */
  minimumValue?: number;
  
  /**
   * Maximum value
   * @default 100
   */
  maximumValue?: number;
  
  /**
   * Step value
   * @default 1
   */
  step?: number;
  
  /**
   * Whether to show min/max labels
   * @default false
   */
  showLabels?: boolean;
  
  /**
   * Whether to show the current value
   * @default false
   */
  showValue?: boolean;
  
  /**
   * Custom format for the value label
   */
  valueFormatter?: (value: number) => string;
  
  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Custom styles for container
   */
  style?: ViewStyle;
  
  /**
   * Custom styles for labels
   */
  labelStyle?: TextStyle;
  
  /**
   * Custom styles for the value display
   */
  valueStyle?: TextStyle;
  
  /**
   * Custom colors
   */
  colors?: {
    track?: string;
    thumb?: string;
    activeTrack?: string;
    disabledTrack?: string;
    disabledThumb?: string;
  };
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  onSlidingStart,
  onSlidingComplete,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  showLabels = false,
  showValue = false,
  valueFormatter = (v: number) => v.toString(),
  disabled = false,
  style,
  labelStyle,
  valueStyle,
  colors,
}) => {
  const theme = useTheme();

  const getTrackColor = () => {
    if (disabled) {
      return colors?.disabledTrack || theme.colors.surfaceVariant;
    }
    return colors?.track || theme.colors.border;
  };

  const getActiveTrackColor = () => {
    if (disabled) {
      return colors?.disabledTrack || theme.colors.surfaceVariant;
    }
    return colors?.activeTrack || theme.colors.primary;
  };

  const getThumbColor = () => {
    if (disabled) {
      return colors?.disabledThumb || theme.colors.surfaceVariant;
    }
    return colors?.thumb || theme.colors.primary;
  };

  return (
    <View style={[styles(theme).container, style]}>
      {showLabels && (
        <View style={styles(theme).labelContainer}>
          <Text style={[styles(theme).label, labelStyle]}>{minimumValue}</Text>
          {showValue && (
            <Text style={[styles(theme).value, valueStyle]}>
              {valueFormatter(value)}
            </Text>
          )}
          <Text style={[styles(theme).label, labelStyle]}>{maximumValue}</Text>
        </View>
      )}
      <SliderRN
        value={value}
        onValueChange={onValueChange}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        disabled={disabled}
        minimumTrackTintColor={getActiveTrackColor()}
        maximumTrackTintColor={getTrackColor()}
        thumbTintColor={getThumbColor()}
        style={styles(theme).slider}
      />
    </View>
  );
};

const styles = (theme: ReturnType<typeof useTheme>) => StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.fontSize.caption,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  slider: {
    height: 40,
    width: '100%',
  },
  value: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.caption,
    fontWeight: theme.fontWeight.medium,
  },
});
