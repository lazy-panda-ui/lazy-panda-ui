import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
  AccessibilityRole,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

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
  containerStyle?: ViewStyle;
  
  /**
   * Additional styles for the content wrapper
   */
  contentStyle?: ViewStyle;
  
  /**
   * Additional styles for the message text
   */
  messageStyle?: TextStyle;
  
  /**
   * Additional styles for the icon wrapper
   */
  iconStyle?: ViewStyle;
  
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

const getTypeColor = (theme: ReturnType<typeof useTheme>, type: AlertType): string => {
  switch (type) {
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'error':
      return theme.colors.error;
    case 'info':
    default:
      return theme.colors.info;
  }
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
  accessibilityRole = 'alert',
  accessibilityLabel,
  testID,
}) => {
  const theme = useTheme();

  const handleDismiss = () => {
    onDismiss?.();
  };

  const Container = dismissible ? Pressable : View;
  const styles = React.useMemo(() => createStyles(theme, type), [theme, type]);

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
          <Text style={styles.dismissIcon}>×</Text>
        </Pressable>
      )}
    </Container>
  );
};

const createStyles = (theme: ReturnType<typeof useTheme>, type: AlertType) => StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: getTypeColor(theme, type),
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    marginVertical: theme.spacing.sm,
    overflow: 'hidden',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    padding: theme.spacing.md,
  },
  dismissButton: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: theme.spacing.sm,
  },
  dismissIcon: {
    color: theme.colors.onPrimary,
    fontSize: theme.fontSize.h6,
    lineHeight: theme.fontSize.h6,
  },
  iconContainer: {
    marginRight: theme.spacing.sm,
  },
  text: {
    color: theme.colors.onPrimary,
    flex: 1,
    fontSize: theme.fontSize.body1,
    fontWeight: theme.fontWeight.medium,
  },
});
