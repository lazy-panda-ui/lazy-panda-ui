import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  TextStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export type AccordionVariant = 'default' | 'outlined' | 'contained';
export type AccordionIconPosition = 'start' | 'end';

export interface AccordionProps {
  /**
   * Title of the accordion
   */
  title: string;
  /**
   * Subtitle text (optional)
   */
  subtitle?: string;
  /**
   * Content of the accordion
   */
  children: React.ReactNode;
  /**
   * Whether the accordion is expanded
   */
  expanded?: boolean;
  /**
   * Called when the accordion is toggled
   */
  onChange?: (expanded: boolean) => void;
  /**
   * Visual variant of the accordion
   * @default 'default'
   */
  variant?: AccordionVariant;
  /**
   * Position of the expand/collapse icon
   * @default 'end'
   */
  iconPosition?: AccordionIconPosition;
  /**
   * Whether to disable the accordion
   * @default false
   */
  disabled?: boolean;
  /**
   * Custom icon when expanded
   */
  expandIcon?: React.ReactNode;
  /**
   * Custom icon when collapsed
   */
  collapseIcon?: React.ReactNode;
  /**
   * Additional content in the header
   */
  headerRight?: React.ReactNode;
  /**
   * Additional styles for the container
   */
  containerStyle?: ViewStyle;
  /**
   * Additional styles for the header
   */
  headerStyle?: ViewStyle;
  /**
   * Additional styles for the title
   */
  titleStyle?: TextStyle;
  /**
   * Additional styles for the subtitle
   */
  subtitleStyle?: TextStyle;
  /**
   * Additional styles for the content
   */
  contentStyle?: ViewStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
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
}) => {
  const theme = useTheme();
  const [internalExpanded, setInternalExpanded] = useState(false);
  const expanded = controlledExpanded ?? internalExpanded;
  const rotationValue = useRef(new Animated.Value(expanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotationValue, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if (Platform.OS === 'android') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }, [expanded, rotationValue]);

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'outlined':
        return {
          borderWidth: 1,
          borderColor: theme.colors.outline,
          borderRadius: theme.borderRadius.md,
          backgroundColor: theme.colors.surface,
        };
      case 'contained':
        return {
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: theme.borderRadius.md,
        };
      default:
        return {
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.outline,
          backgroundColor: theme.colors.surface,
        };
    }
  };

  const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
      opacity: disabled ? 0.6 : 1,
      ...getVariantStyles(),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.md,
      minHeight: 48,
    },
    headerContent: {
      flex: 1,
      justifyContent: 'center',
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.body1,
      fontWeight: theme.fontWeight.medium,
    },
    subtitle: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body2,
      marginTop: theme.spacing.xs,
    },
    icon: {
      marginHorizontal: theme.spacing.sm,
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      backgroundColor: theme.colors.surface,
      padding: expanded ? theme.spacing.md : 0,
      overflow: 'hidden',
    },
  });

  const renderIcon = () => {
    const rotation = rotationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    if (expandIcon && collapseIcon) {
      return expanded ? expandIcon : collapseIcon;
    }

    return (
      <Animated.Text
        style={[
          { transform: [{ rotate: rotation }] },
          { color: theme.colors.onSurfaceVariant },
        ]}
      >
        ▼
      </Animated.Text>
    );
  };

  const handlePress = () => {
    if (!disabled) {
      const newValue = !expanded;
      if (onChange) {
        onChange(newValue);
      } else {
        setInternalExpanded(newValue);
      }
    }
  };

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
        {iconPosition === 'start' && (
          <View style={styles.icon}>{renderIcon()}</View>
        )}
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        {headerRight}
        {iconPosition === 'end' && (
          <View style={styles.icon}>{renderIcon()}</View>
        )}
      </TouchableOpacity>
      {expanded && (
        <View style={[styles.content, contentStyle]} testID="accordion-content">
          {children}
        </View>
      )}
    </View>
  );
};