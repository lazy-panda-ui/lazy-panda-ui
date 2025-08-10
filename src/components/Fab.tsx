import React from 'react';
import { Pressable, StyleSheet, ViewStyle, Text, View, Animated, TextStyle, ActivityIndicator, Platform } from 'react-native';
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
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = React.useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: theme.fab.animation.pressScale,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim, theme.fab.animation.pressScale]);

  const handlePressOut = React.useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const positionStyle = React.useMemo((): ViewStyle => {
    const margin = theme.fab.offset;
    switch (position) {
      case 'top-left':
        return { top: margin, left: margin };
      case 'top-right':
        return { top: margin, right: margin };
      case 'bottom-left':
        return { bottom: margin, left: margin };
      case 'center':
        return { alignSelf: 'center', bottom: margin };
      default:
        return { bottom: margin, right: margin };
    }
  }, [position, theme.fab.offset]);

  const sizeStyle = React.useMemo((): ViewStyle => {
    const sz = theme.fab.sizes[size];
    const diameter = sz.diameter;
    const isExtended = variant === 'extended';
    return {
      width: isExtended ? undefined : diameter,
      height: diameter,
      borderRadius: diameter / 2,
      paddingHorizontal: isExtended ? sz.paddingX : 0,
    };
  }, [size, variant, theme.fab.sizes]);

  const backgroundColor = color || theme.fab.colors.background;
  const foregroundColor = theme.fab.colors.foreground;

  const shadowStyle = React.useMemo(() => ({
    shadowColor: theme.fab.shadow.color,
    shadowOpacity: theme.fab.shadow.opacity,
    shadowRadius: theme.fab.shadow.radius,
    shadowOffset: { width: 0, height: theme.fab.shadow.offsetY },
    ...(Platform.OS === 'android' ? { elevation: theme.fab.shadow.elevation } : {}),
  }), [theme.fab.shadow]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: disabled ? theme.fab.disabledOpacity : 1 }} testID={testID}>
      <Pressable
        onPress={disabled || loading ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityState={{ disabled, busy: loading }}
        style={[
          styles(theme).fab,
          sizeStyle,
          positionStyle,
          { backgroundColor },
          shadowStyle,
          style,
        ]}
        {...(Platform.OS === 'android' ? { android_ripple: { color: theme.fab.ripple.color } } : {})}
      >
        {loading ? (
          <ActivityIndicator color={foregroundColor} size={size === 'small' ? 'small' : 'large'} />
        ) : (
          <>
            {icon && <View style={[styles(theme).icon, variant === 'extended' ? { marginRight: theme.fab.iconSpacing } : null]}>{icon}</View>}
            {variant === 'extended' && !!label && (
              <Text style={[styles(theme).label, { color: foregroundColor, fontSize: theme.fab.sizes[size].labelFontSize }, labelStyle]}>{label}</Text>
            )}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  fab: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minWidth: 0,
    position: 'absolute',
  },
  icon: {
    marginRight: 0,
  },
  label: {
    fontWeight: theme.fontWeight.medium,
    marginLeft: theme.spacing.xs,
  },
});
