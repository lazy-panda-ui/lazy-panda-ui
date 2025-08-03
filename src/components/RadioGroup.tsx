import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Theme } from '../theme';

export interface RadioGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  style?: ViewStyle;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onChange, style }) => {
  const theme = useTheme();
  return (
    <View style={[styles(theme).container, style]}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={styles(theme).item}
          onPress={() => onChange(option)}
          accessibilityRole="radio"
          accessibilityState={{ selected: value === option }}
        >
          <View style={[styles(theme).outer, value === option && styles(theme).selectedOuter]}>
            {value === option && <View style={styles(theme).inner} />}
          </View>
          <Text style={styles(theme).label}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  outer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedOuter: {
    borderColor: theme.colors.secondary,
  },
  inner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  label: {
    color: theme.colors.text,
  },
});
