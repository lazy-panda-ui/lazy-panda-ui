import React from 'react';
import { Modal, View, StyleSheet, ViewStyle, Text } from 'react-native';
import { useTheme, Theme } from '../theme';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
  style?: ViewStyle;
}

export const Dialog: React.FC<DialogProps> = ({ open, onClose, children, style, title }) => {
  const theme = useTheme();
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles(theme).overlay}>
        <View style={[styles(theme).dialog, style]}>
          {typeof title === 'string' && (
            <Text testID="dialog-title" style={styles(theme).title}>{title}</Text>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  dialog: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    elevation: 4,
    maxWidth: '90%',
    minWidth: 250,
    padding: theme.spacing.lg,
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.h4,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.sm,
  },
});
