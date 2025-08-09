import React from 'react';
import { Modal, View, StyleSheet, ViewStyle, Text, Platform } from 'react-native';
import { useTheme, Theme } from '../theme';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
  style?: ViewStyle; // dialog container override
  size?: 'small' | 'medium' | 'large';
}

export const Dialog: React.FC<DialogProps> = ({ open, onClose, children, style, title, size = 'medium' }) => {
  const theme = useTheme();

  const s = React.useMemo(() => styles(theme), [theme]);

  const widthStyle = React.useMemo(() => ({ maxWidth: theme.dialog.sizes[size], minWidth: theme.dialog.minWidth }), [size, theme.dialog.minWidth, theme.dialog.sizes]);

  return (
    <Modal visible={open} transparent animationType={theme.dialog.animation.type} onRequestClose={onClose}>
  <View style={[s.overlay, { backgroundColor: theme.dialog.overlay.color, opacity: theme.dialog.overlay.opacity }]}>
        <View style={[s.dialog, widthStyle, style]}>
          {typeof title === 'string' && (
            <Text testID="dialog-title" style={s.title}>{title}</Text>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  dialog: {
    backgroundColor: theme.dialog.container.backgroundColor,
    borderRadius: theme.dialog.container.borderRadius,
    padding: theme.dialog.container.padding,
    ...Platform.select({
      ios: {
        shadowColor: theme.dialog.container.shadow.color,
        shadowOpacity: theme.dialog.container.shadow.opacity,
        shadowRadius: theme.dialog.container.shadow.radius,
        shadowOffset: { width: 0, height: theme.dialog.container.shadow.offsetY },
      },
      android: { elevation: theme.dialog.container.shadow.elevation },
      default: {},
    }),
  },
  overlay: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: theme.dialog.title.color,
    fontSize: theme.dialog.title.fontSize,
    fontWeight: theme.dialog.title.fontWeight,
    marginBottom: theme.dialog.title.marginBottom,
  },
});
