import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import SliderRN from '@react-native-community/slider';
import { useTheme } from '../theme/ThemeProvider';

export interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  style?: ViewStyle;
}

export const Slider: React.FC<SliderProps> = ({ value, onValueChange, minimumValue = 0, maximumValue = 100, step = 1, style }) => {
  const theme = useTheme();
  return (
    <View style={style}>
      <SliderRN
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor={theme.colors.border}
        thumbTintColor={theme.colors.primary}
        style={styles(theme).slider}
      />
    </View>
  );
};

const styles = (theme: any) => StyleSheet.create({
  slider: {
    width: '100%',
    height: 40,
  },
});
