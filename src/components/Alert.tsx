import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
  AccessibilityRole,
} from 'react-native';
import type { StyleProp } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type AlertType = 'success' | 'info' | 'warning' | 'error';
export type AlertVariant = 'solid' | 'outlined' | 'soft';

export interface AlertProps {
  /**
   * The message to display in the alert
   */
  message: string;
  
  /**
   * The type of alert that determines its appearance
   * @default 'info'
   */
  type?: AlertType;
  
  /**
   * Custom icon to display before the message
   */
  icon?: React.ReactNode;
  
  /**
   * Whether the alert is dismissible
   * @default false
   */
  dismissible?: boolean;
  
  /**
   * Called when the alert is dismissed
   */
  onDismiss?: () => void;
  
  /**
   * Additional styles for the container
   */
  containerStyle?: StyleProp<ViewStyle>;
  
  /**
   * Additional styles for the content wrapper
   */
  contentStyle?: StyleProp<ViewStyle>;
  
  /**
   * Additional styles for the message text
   */
  messageStyle?: StyleProp<TextStyle>;
  
  /**
   * Additional styles for the icon wrapper
   */
  iconStyle?: StyleProp<ViewStyle>;

  /**
   * Variant for visual style
   * @default 'solid'
   */
  variant?: AlertVariant;

  /**
   * Custom close icon when dismissible
   */
  closeIcon?: React.ReactNode;
  
  /**
   * The role tells the screen reader what kind of element the user is focused on
   * @default 'alert'
   */
  accessibilityRole?: AccessibilityRole;
  
  /**
   * The label used by screen readers to describe the alert
   */
  accessibilityLabel?: string;
  
  /**
   * Test ID for testing
   */
  testID?: string;
}

const getTypeTokens = (theme: ReturnType<typeof useTheme>, type: AlertType) => {
  const t = theme.alert.type;
  return t[type];
};

export const Alert: React.FC<AlertProps> = ({
  message,
  type = 'info',
  icon,
  dismissible = false,
  onDismiss,
  containerStyle,
  contentStyle,
  messageStyle,
  iconStyle,
  variant = 'solid',
  closeIcon,
  accessibilityRole = 'alert',
  accessibilityLabel,
  testID,
}) => {
  const theme = useTheme();

  const handleDismiss = useCallback(() => {
    onDismiss?.();
  }, [onDismiss]);

  const Container = dismissible ? Pressable : View;
  const styles = useMemo(() => createStyles(theme, type, variant), [theme, type, variant]);

  return (
    <Container
      style={[styles.container, containerStyle]}
      onPress={dismissible ? handleDismiss : undefined}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel || message}
      testID={testID}
    >
      <View style={[styles.content, contentStyle]}>
        {icon && (
          <View style={[styles.iconContainer, iconStyle]}>
            {icon}
          </View>
        )}
        <Text style={[styles.text, messageStyle]}>{message}</Text>
      </View>
      {dismissible && (
        <Pressable
          onPress={handleDismiss}
          style={styles.dismissButton}
          accessibilityRole="button"
          accessibilityLabel="Dismiss alert"
        >
          {closeIcon ?? <Text style={styles.dismissIcon}>×</Text>}
        </Pressable>
      )}
    </Container>
  );
};

const createStyles = (
  theme: ReturnType<typeof useTheme>,
  type: AlertType,
  variant: AlertVariant
) => {
  const { bg, fg, border } = getTypeTokens(theme, type);
  const base: ViewStyle = {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: theme.spacing.sm,
    overflow: 'hidden',
    borderRadius: theme.alert.borderRadius,
  };

  let containerByVariant: ViewStyle;
  if (variant === 'outlined') {
    containerByVariant = {
      backgroundColor: 'transparent',
      borderWidth: theme.alert.borderWidth,
      borderColor: border,
    };
  } else if (variant === 'soft') {
    containerByVariant = { backgroundColor: theme.colors.surfaceVariant, borderWidth: 0 };
  } else {
    containerByVariant = { backgroundColor: bg, borderWidth: 0 };
  }

  return StyleSheet.create({
    container: {
      ...base,
      ...containerByVariant,
    },
    content: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      padding: theme.alert.padding,
    },
    dismissButton: {
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'center',
      padding: theme.spacing.sm,
    },
    dismissIcon: {
      color: variant === 'outlined' ? border : fg,
      fontSize: theme.fontSize.h6,
      lineHeight: theme.fontSize.h6,
    },
    iconContainer: {
      marginRight: theme.spacing.sm,
    },
    text: {
      color: variant === 'outlined' || variant === 'soft' ? theme.colors.onSurface : fg,
      flex: 1,
      fontSize: theme.fontSize.body1,
      fontWeight: theme.fontWeight.medium,
    },
  });
};
