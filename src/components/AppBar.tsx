import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StatusBar,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import type { StyleProp } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type AppBarVariant = 'primary' | 'secondary' | 'transparent' | 'surface' | 'elevated';
export type AppBarPosition = 'fixed' | 'absolute' | 'relative';
export type AppBarSize = 'small' | 'medium' | 'large';
export type AppBarAlignment = 'start' | 'center';

export interface AppBarAction {
  /**
   * Icon component to display
   */
  icon: React.ReactNode;
  /**
   * Label for accessibility
   */
  label: string;
  /**
   * Callback when action is pressed
   */
  onPress: () => void;
  /**
   * Whether the action is disabled
   */
  disabled?: boolean;
  /**
   * Whether to show a loading indicator
   */
  loading?: boolean;
}

export interface AppBarProps {
  /**
   * Title text to display in the AppBar
   */
  title: string;
  /**
   * Subtitle text (optional)
   */
  subtitle?: string;
  /**
   * Left action component or array of action objects
   */
  left?: React.ReactNode | AppBarAction[];
  /**
   * Right action components or array of action objects
   */
  right?: React.ReactNode | AppBarAction[];
  /**
   * Visual variant of the AppBar
   * @default 'primary'
   */
  variant?: AppBarVariant;
  /**
   * Position of the AppBar
   * @default 'fixed'
   */
  position?: AppBarPosition;
  /**
   * Whether to show elevation shadow
   * @default true
   */
  elevation?: boolean;
  /**
   * Size of the AppBar
   * @default 'medium'
   */
  size?: AppBarSize;
  /**
   * Title alignment
   * @default 'start'
   */
  titleAlignment?: AppBarAlignment;
  /**
   * Whether to hide the AppBar on scroll (only works with position='fixed')
   * @default false
   */
  hideOnScroll?: boolean;
  /**
   * Whether to show a border at the bottom
   * @default false
   */
  showBorder?: boolean;
  /**
   * Whether the AppBar is scrollable (shows horizontal scroll for many actions)
   * @default false
   */
  scrollable?: boolean;
  /**
   * Background color (overrides variant color)
   */
  backgroundColor?: string;
  /**
   * Status bar style
   * @default 'light'
   */
  statusBarStyle?: 'light' | 'dark' | 'auto';
  /**
   * Additional styles for the container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Additional styles for the title text
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Additional styles for the subtitle text
   */
  subtitleStyle?: StyleProp<TextStyle>;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const AppBar: React.FC<AppBarProps> = ({
  title,
  subtitle,
  left,
  right,
  variant = 'primary',
  position = 'fixed',
  elevation = true,
  size = 'medium',
  titleAlignment = 'start',
  hideOnScroll = false,
  showBorder = false,
  scrollable = false,
  backgroundColor,
  statusBarStyle = 'auto',
  style,
  titleStyle,
  subtitleStyle,
  testID,
}) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!hideOnScroll) setIsVisible(true);
  }, [hideOnScroll]);

  const tokens = theme.appBar;
  const s = useMemo(() => styles(theme), [theme]);
  const variantTokens = tokens.variants[variant];
  const bgColor = backgroundColor ?? variantTokens.background;

  const barStyle = useMemo(() => {
    if (statusBarStyle !== 'auto') return statusBarStyle === 'light' ? 'light-content' : 'dark-content';
    return variant === 'surface' || variant === 'elevated' || variant === 'transparent'
      ? 'dark-content'
      : 'light-content';
  }, [statusBarStyle, variant]);

  const height = tokens.heights[size];

  const renderActions = useCallback((actions: AppBarAction[] | React.ReactNode) => {
    if (Array.isArray(actions)) {
      return actions.map((action, index) => (
        <TouchableOpacity
          key={action.label || `action-${index}`}
          onPress={action.onPress}
          disabled={action.disabled || action.loading}
          style={s.actionButton}
        >
          {action.loading ? (
            <ActivityIndicator size="small" color={variantTokens.foreground} />
          ) : (
            <>
              {action.icon}
              <Text style={[s.actionLabel, { color: variantTokens.foreground }]}>{action.label}</Text>
            </>
          )}
        </TouchableOpacity>
      ));
    }
    return actions;
  }, [s.actionButton, s.actionLabel, variantTokens.foreground]);

  const containerStyle = [
    s.container,
    {
      backgroundColor: bgColor,
      position: position === 'fixed' ? 'absolute' : position,
      height,
      borderBottomWidth: showBorder ? StyleSheet.hairlineWidth : 0,
      borderBottomColor: tokens.variants.surface.borderColor,
      transform: [
        { translateY: hideOnScroll && !isVisible ? -height : 0 },
      ],
      ...(elevation && {
        elevation: variantTokens.elevation,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowColor: '#000',
      }),
    },
    style,
  ];

  const Content = (
    <View style={[s.content, scrollable && s.scrollableContent]}>
      <View style={s.side}>
        {left && renderActions(left)}
      </View>
      <View style={[
        s.titleContainer,
        { alignItems: titleAlignment === 'center' ? 'center' : 'flex-start' }
      ]}>
        <Text style={[s.title, { color: variantTokens.foreground, fontSize: tokens.title.fontSize, fontWeight: tokens.title.fontWeight }, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[s.subtitle, { color: variantTokens.foreground, opacity: tokens.subtitle.opacity, fontSize: tokens.subtitle.fontSize }, subtitleStyle]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      <View style={s.side}>
        {right && renderActions(right)}
      </View>
    </View>
  );

  return (
    <>
      <StatusBar
        backgroundColor={variant === 'transparent' ? 'transparent' : bgColor}
        barStyle={barStyle}
        translucent={variant === 'transparent'}
      />
      <SafeAreaView style={containerStyle} testID={testID}>
        {scrollable ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.scrollViewContent}
          >
            {Content}
          </ScrollView>
        ) : (
          Content
        )}
      </SafeAreaView>
    </>
  );
};

const styles = (theme: ReturnType<typeof useTheme>) => StyleSheet.create({
  actionButton: {
    alignItems: 'center',
  borderRadius: theme.appBar.action.borderRadius,
    flexDirection: 'row',
    justifyContent: 'center',
  padding: theme.spacing.sm,
  },
  actionLabel: {
  fontSize: theme.appBar.subtitle.fontSize,
  marginLeft: theme.appBar.action.spacing,
  },
  container: {
    left: 0,
    overflow: 'hidden',
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    top: 0,
    width: '100%',
    zIndex: 1000,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
  paddingHorizontal: theme.appBar.paddingX,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  scrollableContent: {
    flexGrow: 1,
  },
  side: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subtitle: {
  marginTop: 2,
  },
  title: {
  // color, fontSize, weight are applied inline using tokens
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  marginHorizontal: theme.spacing.sm,
  },
});
