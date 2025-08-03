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
import { useTheme, Theme } from '../theme/ThemeProvider';

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

const getTypeColor = (theme: Theme, type: AlertType) => {
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
  const styles = getStyles(theme, type);

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

const getStyles = (theme: Theme, type: AlertType) => StyleSheet.create({
  container: {
    backgroundColor: getTypeColor(theme, type),
    borderRadius: theme.borderRadius.md,
    marginVertical: theme.spacing.sm,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.components?.alert?.container,
    ...theme.components?.alert?.variants?.[type]?.container,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    ...theme.components?.alert?.content,
  },
  iconContainer: {
    marginRight: theme.spacing.sm,
    ...theme.components?.alert?.iconContainer,
  },
  text: {
    flex: 1,
    color: '#fff',
    fontWeight: theme.fontWeight.medium,
    fontSize: theme.fontSize.body1,
    ...theme.components?.alert?.text,
    ...theme.components?.alert?.variants?.[type]?.text,
  },
  dismissButton: {
    padding: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    ...theme.components?.alert?.dismissButton,
  },
  dismissIcon: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 20,
    ...theme.components?.alert?.dismissIcon,
  },
});
