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
    alignItems: 'center',
    flexDirection: 'row',
  },
  inner: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: theme.spacing.lg,
  },
  label: {
    color: theme.colors.text,
  },
  outer: {
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderRadius: 10,
    borderWidth: 2,
    height: 20,
    justifyContent: 'center',
    marginRight: 8,
    width: 20,
  },
  selectedOuter: {
    borderColor: theme.colors.secondary,
  },
});
