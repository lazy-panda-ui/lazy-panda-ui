import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Animated,
  TouchableOpacity,
  TextStyle,
  Easing,
  Platform,
  AccessibilityInfo,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type SnackbarVariant = 'default' | 'info' | 'success' | 'warning' | 'error';
export type SnackbarPosition = 'top' | 'bottom';
export type SnackbarAction = {
  label: string;
  onPress: () => void;
  color?: string;
};

export interface SnackbarProps {
  /**
   * Message to display
   */
  message: string;
  /**
   * Whether the snackbar is visible
   */
  open: boolean;
  /**
   * Called when the snackbar is dismissed
   */
  onDismiss?: () => void;
  /**
   * Visual variant of the snackbar
   * @default 'default'
   */
  variant?: SnackbarVariant;
  /**
   * Position of the snackbar
   * @default 'bottom'
   */
  position?: SnackbarPosition;
  /**
   * Duration in milliseconds to show the snackbar
   * @default 4000
   */
  duration?: number;
  /**
   * Action button configuration
   */
  action?: SnackbarAction;
  /**
   * Icon to show before the message
   */
  icon?: React.ReactNode;
  /**
   * Whether to show close button
   * @default false
   */
  dismissible?: boolean;
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
   * Additional styles for the action button
   */
  actionStyle?: TextStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  open,
  onDismiss,
  variant = 'default',
  position = 'bottom',
  duration = 4000,
  action,
  icon,
  dismissible = false,
  containerStyle,
  contentStyle,
  messageStyle,
  actionStyle,
  testID,
}) => {
  const theme = useTheme();
  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      // Announce for screen readers
      AccessibilityInfo.announceForAccessibility(message);
      
      // Show animation
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto dismiss
      if (duration > 0) {
        const id = setTimeout(() => {
          onDismiss?.();
        }, duration);
        timeoutRef.current = id;
      }
    } else {
      // Hide animation
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 100,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Clear timeout
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [open, duration, message, onDismiss, translateY, opacity]);

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'info':
        return {
          backgroundColor: theme.colors.info,
        };
      case 'success':
        return {
          backgroundColor: theme.colors.success,
        };
      case 'warning':
        return {
          backgroundColor: theme.colors.warning,
        };
      case 'error':
        return {
          backgroundColor: theme.colors.error,
        };
      default:
        return {
          backgroundColor: theme.colors.onSurface,
        };
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'info':
        return theme.colors.onInfo;
      case 'success':
        return theme.colors.onSuccess;
      case 'warning':
        return theme.colors.onWarning;
      case 'error':
        return theme.colors.onError;
      default:
        return theme.colors.surface;
    }
  };

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: theme.spacing.md,
      right: theme.spacing.md,
      ...(position === 'bottom' ? {
        bottom: Platform.select({ ios: 48, android: 32 }),
      } : {
        top: Platform.select({ ios: 48, android: 32 }),
      }),
      minHeight: 48,
      borderRadius: theme.borderRadius.lg,
      ...getVariantStyles(),
      elevation: 6,
      shadowColor: theme.colors.onSurface,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      zIndex: 1000,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing.md,
    },
    messageContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: theme.spacing.sm,
    },
    message: {
      color: getTextColor(),
      fontSize: theme.fontSize.body2,
      flexShrink: 1,
    },
    actionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: theme.spacing.md,
    },
    action: {
      marginLeft: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
    },
    actionText: {
      color: action?.color || getTextColor(),
      fontSize: theme.fontSize.body2,
      fontWeight: theme.fontWeight.medium,
    },
    dismissButton: {
      padding: theme.spacing.xs,
      marginLeft: theme.spacing.sm,
    },
  });

  if (!open) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: position === 'bottom' ? translateY : translateY.interpolate({
            inputRange: [0, 100],
            outputRange: [-100, 0],
          }) }],
          opacity,
        },
        containerStyle,
      ]}
      testID={testID}
      accessibilityRole="alert"
    >
      <View style={[styles.content, contentStyle]}>
        <View style={styles.messageContainer}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[styles.message, messageStyle]} numberOfLines={2}>
            {message}
          </Text>
        </View>
        <View style={styles.actionContainer}>
          {action && (
            <TouchableOpacity
              onPress={() => {
                action.onPress();
                onDismiss?.();
              }}
              style={styles.action}
            >
              <Text style={[styles.actionText, actionStyle]}>
                {action.label}
              </Text>
            </TouchableOpacity>
          )}
          {dismissible && (
            <TouchableOpacity
              onPress={onDismiss}
              style={styles.dismissButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={[styles.actionText, { fontSize: 18 }]}>×</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
};
