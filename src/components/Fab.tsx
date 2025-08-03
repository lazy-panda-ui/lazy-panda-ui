import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, Text, View, Animated, TextStyle, ActivityIndicator } from 'react-native';
import { useTheme, Theme } from '../theme';

export type FabSize = 'small' | 'medium' | 'large';
export type FabVariant = 'regular' | 'extended';
export type FabPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

export interface FabProps {
  /**
   * Icon component to display in the FAB
   */
  icon?: React.ReactNode;
  /**
   * Text label to display (only visible in extended variant)
   */
  label?: string;
  /**
   * Function to call when the FAB is pressed
   */
  onPress: () => void;
  /**
   * Size variant of the FAB
   * @default 'medium'
   */
  size?: FabSize;
  /**
   * Visual variant of the FAB
   * @default 'regular'
   */
  variant?: FabVariant;
  /**
   * Position of the FAB on screen
   * @default 'bottom-right'
   */
  position?: FabPosition;
  /**
   * Custom color for the FAB
   */
  color?: string;
  /**
   * Whether to show loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Whether to disable the FAB
   * @default false
   */
  disabled?: boolean;
  /**
   * Additional styles for the FAB
   */
  style?: ViewStyle;
  /**
   * Additional styles for the label
   */
  labelStyle?: TextStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const Fab: React.FC<FabProps> = ({
  icon,
  label,
  onPress,
  size = 'medium',
  variant = 'regular',
  position = 'bottom-right',
  color,
  loading = false,
  disabled = false,
  style,
  labelStyle,
  testID,
}) => {
  const theme = useTheme();
  const [isPressed, setIsPressed] = React.useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getPositionStyle = (): ViewStyle => {
    const margin = theme.spacing.lg;
    switch (position) {
      case 'top-left':
        return { top: margin, left: margin };
      case 'top-right':
        return { top: margin, right: margin };
      case 'bottom-left':
        return { bottom: margin, left: margin };
      case 'center':
        return { 
          alignSelf: 'center',
          bottom: margin
        };
      default:
        return { bottom: margin, right: margin };
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          width: variant === 'extended' ? undefined : 40,
          height: 40,
          borderRadius: 20,
          paddingHorizontal: variant === 'extended' ? theme.spacing.md : 0,
        };
      case 'large':
        return {
          width: variant === 'extended' ? undefined : 64,
          height: 64,
          borderRadius: 32,
          paddingHorizontal: variant === 'extended' ? theme.spacing.xl : 0,
        };
      default:
        return {
          width: variant === 'extended' ? undefined : 56,
          height: 56,
          borderRadius: 28,
          paddingHorizontal: variant === 'extended' ? theme.spacing.lg : 0,
        };
    }
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleAnim }],
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      testID={testID}
    >
      <TouchableOpacity
        style={[
          styles(theme).fab,
          getSizeStyle(),
          getPositionStyle(),
          {
            backgroundColor: color || theme.colors.primary,
          },
          style,
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityState={{ disabled, busy: loading }}
      >
        {loading ? (
          <ActivityIndicator color={theme.colors.onPrimary} size={size === 'small' ? 'small' : 'large'} />
        ) : (
          <>
            {icon && <View style={styles(theme).icon}>{icon}</View>}
            {(variant === 'extended' && label) && (
              <Text style={[styles(theme).label, labelStyle]}>{label}</Text>
            )}
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    position: 'absolute',
    minWidth: 0,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    color: theme.colors.onPrimary,
    fontWeight: theme.fontWeight.medium,
    fontSize: theme.fontSize.body1,
    marginLeft: theme.spacing.xs,
  },
});
