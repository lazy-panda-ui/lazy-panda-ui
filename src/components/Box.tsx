import React from 'react';
import { View, ViewStyle } from 'react-native';

export interface BoxProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export const Box: React.FC<BoxProps> = ({ children, style }) => (
  <View style={style}>{children}</View>
);
