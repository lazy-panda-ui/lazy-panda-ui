import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

export interface BackdropProps {
  open: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const Backdrop: React.FC<BackdropProps> = ({ open, style, children }) => {
  if (!open) return null;
  return (
    <View style={[styles.backdrop, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
