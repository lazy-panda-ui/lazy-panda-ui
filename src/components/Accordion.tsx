import React, { useEffect, useRef, useState, useMemo, useCallback, useImperativeHandle } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, Animated, LayoutAnimation, Platform, UIManager, TextStyle } from 'react-native';
import type { StyleProp } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export type AccordionVariant = 'default' | 'outlined' | 'contained';
export type AccordionIconPosition = 'start' | 'end';

export interface AccordionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  expanded?: boolean;
  onChange?: (expanded: boolean) => void;
  variant?: AccordionVariant;
  iconPosition?: AccordionIconPosition;
  disabled?: boolean;
  expandIcon?: React.ReactNode;
  collapseIcon?: React.ReactNode;
  headerRight?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface AccordionRef {
  expand: () => void;
  collapse: () => void;
  toggle: () => void;
  isExpanded: () => boolean;
}

const AccordionBase = (
  {
    title,
    subtitle,
    children,
    expanded: controlledExpanded,
    onChange,
    variant = 'default',
    iconPosition = 'end',
    disabled = false,
    expandIcon,
    collapseIcon,
    headerRight,
    containerStyle,
    headerStyle,
    titleStyle,
    subtitleStyle,
    contentStyle,
    testID,
  }: AccordionProps,
  ref: React.Ref<AccordionRef>
) => {
  const theme = useTheme();
  const [internalExpanded, setInternalExpanded] = useState(false);
  const expanded = controlledExpanded ?? internalExpanded;
  const rotationValue = useRef(new Animated.Value(expanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotationValue, {
      toValue: expanded ? 1 : 0,
      duration: theme.accordion?.animation.duration ?? 200,
      useNativeDriver: true,
    }).start();

    if (Platform.OS === 'android') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }, [expanded, rotationValue, theme.accordion?.animation.duration]);

  useImperativeHandle(
    ref,
    () => ({
      expand: () => setInternalExpanded(true),
      collapse: () => setInternalExpanded(false),
      toggle: () => setInternalExpanded(prev => !prev),
      isExpanded: () => !!expanded,
    }),
    [expanded]
  );

  const getVariantStyles = useMemo((): ViewStyle => {
    switch (variant) {
      case 'outlined':
        return {
          borderWidth: theme.accordion?.container.borderWidth ?? 1,
          borderColor: theme.accordion?.container.borderColor ?? theme.colors.outline,
          borderRadius: theme.accordion?.container.borderRadius ?? theme.borderRadius.md,
          backgroundColor: theme.accordion?.container.backgroundColor ?? theme.colors.surface,
        };
      case 'contained':
        return {
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: theme.accordion?.container.borderRadius ?? theme.borderRadius.md,
        };
      default:
        return {
          borderBottomWidth: theme.accordion?.container.borderWidth ?? 1,
          borderBottomColor: theme.accordion?.container.borderColor ?? theme.colors.outline,
          backgroundColor: theme.accordion?.container.backgroundColor ?? theme.colors.surface,
        };
    }
  }, [variant, theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          opacity: disabled ? 0.6 : 1,
          overflow: 'hidden',
          ...getVariantStyles,
        },
        content: {
          backgroundColor: theme.accordion?.content.backgroundColor ?? theme.colors.surface,
          overflow: 'hidden',
          padding: expanded ? (theme.accordion?.content.padding ?? theme.spacing.md) : 0,
        },
        header: {
          alignItems: 'center',
          flexDirection: 'row',
          minHeight: theme.accordion?.header.minHeight ?? 48,
          padding: theme.accordion?.header.padding ?? theme.spacing.md,
          backgroundColor: theme.accordion?.header.backgroundColor ?? undefined,
        },
        headerContent: {
          flex: 1,
          justifyContent: 'center',
        },
        icon: {
          alignItems: 'center',
          height: 24,
          justifyContent: 'center',
          marginHorizontal: theme.spacing.sm,
          width: theme.accordion?.icon.size ?? 24,
        },
        subtitle: {
          color: theme.accordion?.header.subtitleColor ?? theme.colors.onSurfaceVariant,
          fontSize: theme.fontSize.body2,
          marginTop: theme.spacing.xs,
        },
        title: {
          color: theme.accordion?.header.titleColor ?? theme.colors.onSurface,
          fontSize: theme.fontSize.body1,
          fontWeight: theme.fontWeight.medium,
        },
        titleContainer: {
          flex: 1,
        },
      }),
    [disabled, expanded, theme, getVariantStyles]
  );

  const renderIcon = useCallback(() => {
    const rotate = rotationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    if (expandIcon && collapseIcon) {
      return expanded ? expandIcon : collapseIcon;
    }

    return (
      <Animated.Text
        style={[
          { transform: [{ rotate }] },
          { color: theme.accordion?.icon.color ?? theme.colors.onSurfaceVariant },
        ]}
      >
        ▼
      </Animated.Text>
    );
  }, [rotationValue, expandIcon, collapseIcon, expanded, theme]);

  const handlePress = useCallback(() => {
    if (disabled) return;
    const newValue = !expanded;
    if (onChange) onChange(newValue);
    else setInternalExpanded(newValue);
  }, [disabled, expanded, onChange]);

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={disabled ? 1 : 0.7}
        style={[styles.header, headerStyle]}
        accessibilityRole="button"
        accessibilityState={{ expanded, disabled }}
      >
        {iconPosition === 'start' && <View style={styles.icon}>{renderIcon()}</View>}
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
            {subtitle ? (
              <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>
        {headerRight}
        {iconPosition === 'end' && <View style={styles.icon}>{renderIcon()}</View>}
      </TouchableOpacity>
      {expanded ? (
        <View style={[styles.content, contentStyle]} testID="accordion-content">
          {children}
        </View>
      ) : null}
    </View>
  );
};

const Forwarded = React.forwardRef<AccordionRef, AccordionProps>(AccordionBase);
Forwarded.displayName = 'Accordion';
export const Accordion = React.memo(Forwarded);