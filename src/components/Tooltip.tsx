import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface TooltipProps {
  children: React.ReactNode;
  text: string;
  style?: ViewStyle;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, text, style }) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  // Always render a Text node with testID for the trigger for testability
  let trigger;
  if (typeof children === 'string') {
    trigger = <Text testID="tooltip-trigger">{children}</Text>;
  } else if (React.isValidElement(children)) {
    // Only add testID if the child supports it, otherwise wrap in Text
    if (children.props && typeof children.props === 'object' && 'testID' in children.props) {
      trigger = React.cloneElement(children as React.ReactElement<any>, { testID: 'tooltip-trigger' });
    } else {
      trigger = <Text testID="tooltip-trigger">{children}</Text>;
    }
  } else {
    // fallback
    trigger = <Text testID="tooltip-trigger">Tooltip</Text>;
  }
  return (
    <View style={style}>
      <TouchableOpacity
        onPressIn={() => { setVisible(true); }}
        onPressOut={() => { setVisible(false); }}
        activeOpacity={1}
      >
        {trigger}
      </TouchableOpacity>
      {visible && (
        <View style={styles(theme).tooltip} testID="tooltip-content">
          <Text style={styles(theme).text}>{text}</Text>
        </View>
      )}
    </View>
  );
};

const styles = (theme: any) => StyleSheet.create({
  tooltip: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.sm,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 100,
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.fontSize.body2,
  },
});
