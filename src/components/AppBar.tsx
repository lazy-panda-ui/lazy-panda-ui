import React from 'react';
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
  Animated,
} from 'react-native';
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
  style?: ViewStyle;
  /**
   * Additional styles for the title text
   */
  titleStyle?: TextStyle;
  /**
   * Additional styles for the subtitle text
   */
  subtitleStyle?: TextStyle;
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
  const [scrollOffset, setScrollOffset] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollOffset = React.useRef(0);

  React.useEffect(() => {
    if (!hideOnScroll) setIsVisible(true);
  }, [hideOnScroll]);

  const handleScroll = React.useCallback((event: { nativeEvent: { contentOffset: { y: number; }; }; }) => {
    if (hideOnScroll && position === 'fixed') {
      const currentOffset = event.nativeEvent.contentOffset.y;
      const diff = currentOffset - lastScrollOffset.current;
      lastScrollOffset.current = currentOffset;

      if (diff > 0 && currentOffset > 60) {
        setIsVisible(false);
      } else if (diff < 0) {
        setIsVisible(true);
      }
      setScrollOffset(currentOffset);
    }
  }, [hideOnScroll, position]);

  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    
    switch (variant) {
      case 'secondary':
        return theme.colors.secondary;
      case 'surface':
        return theme.colors.surface;
      case 'elevated':
        return theme.colors.surfaceVariant;
      case 'transparent':
        return 'transparent';
      default:
        return theme.colors.primary;
    }
  };

  const getStatusBarStyle = () => {
    if (statusBarStyle !== 'auto') return statusBarStyle === 'light' ? 'light-content' : 'dark-content';
    
    switch (variant) {
      case 'surface':
      case 'elevated':
      case 'transparent':
        return 'dark-content';
      default:
        return 'light-content';
    }
  };

  const getHeight = () => {
    switch (size) {
      case 'small':
        return 48;
      case 'large':
        return 64;
      default:
        return 56;
    }
  };

  const renderActions = (actions: AppBarAction[] | React.ReactNode) => {
    if (Array.isArray(actions)) {
      return actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          onPress={action.onPress}
          disabled={action.disabled || action.loading}
          style={styles(theme).actionButton}
        >
          {action.loading ? (
            <ActivityIndicator size="small" color={theme.colors.onPrimary} />
          ) : (
            <>
              {action.icon}
              <Text style={styles(theme).actionLabel}>{action.label}</Text>
            </>
          )}
        </TouchableOpacity>
      ));
    }
    return actions;
  };

  const containerStyle = [
    styles(theme).container,
    {
      backgroundColor: getBackgroundColor(),
      position: position === 'fixed' ? 'absolute' : position,
      height: getHeight(),
      borderBottomWidth: showBorder ? StyleSheet.hairlineWidth : 0,
      borderBottomColor: theme.colors.outline,
      transform: [
        {
          translateY: hideOnScroll && !isVisible ? -getHeight() : 0,
        },
      ],
      ...(elevation && {
        elevation: 4,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowColor: '#000',
      }),
    },
    style,
  ];

  const Content = (
    <View style={[styles(theme).content, scrollable && styles(theme).scrollableContent]}>
      <View style={styles(theme).side}>
        {left && renderActions(left)}
      </View>
      <View style={[
        styles(theme).titleContainer,
        { alignItems: titleAlignment === 'center' ? 'center' : 'flex-start' }
      ]}>
        <Text style={[styles(theme).title, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles(theme).subtitle, subtitleStyle]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      <View style={styles(theme).side}>
        {right && renderActions(right)}
      </View>
    </View>
  );

  return (
    <>
      <StatusBar
        backgroundColor={variant === 'transparent' ? 'transparent' : getBackgroundColor()}
        barStyle={getStatusBarStyle()}
        translucent={variant === 'transparent'}
      />
      <SafeAreaView style={containerStyle} testID={testID}>
        {scrollable ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles(theme).scrollViewContent}
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

const styles = (theme: any) => StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollableContent: {
    flexGrow: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: theme.spacing.sm,
  },
  title: {
    color: theme.colors.onPrimary,
    fontSize: theme.fontSize.h6,
    fontWeight: theme.fontWeight.medium,
  },
  subtitle: {
    color: theme.colors.onPrimary,
    fontSize: theme.fontSize.caption,
    opacity: 0.8,
    marginTop: 2,
  },
  side: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    gap: theme.spacing.xs,
  },
  actionLabel: {
    color: theme.colors.onPrimary,
    fontSize: theme.fontSize.caption,
    marginLeft: theme.spacing.xs,
  },
});
