import React, { useCallback } from 'react';
import {
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  FlatList,
  TouchableOpacity,
  View,
  Animated,
  ActivityIndicator,
  StyleProp,
} from 'react-native';
import { useTheme, Theme } from '../theme';

export type ListVariant = 'default' | 'outlined' | 'contained' | 'card';
export type ListSize = 'small' | 'medium' | 'large';
export type ListDensity = 'default' | 'compact';

export interface ListItemAction {
  /**
   * Icon to show for the action
   */
  icon: React.ReactNode;
  /**
   * Label for accessibility
   */
  label: string;
  /**
   * Action to perform
   */
  onPress: () => void;
  /**
   * Background color of the action
   */
  backgroundColor?: string;
  /**
   * Whether the action is destructive
   */
  destructive?: boolean;
}

export interface ListItem {
  /**
   * Unique identifier for the item
   */
  id: string;
  
  /**
   * Text label for the list item
   */
  label: string;
  
  /**
   * Optional secondary text below the label
   */
  subtitle?: string;
  
  /**
   * Called when the item is pressed
   */
  onPress?: () => void;
  
  /**
   * Icon to show at the start of the item
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon to show at the end of the item
   */
  endIcon?: React.ReactNode;
  
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the item is selected
   */
  selected?: boolean;
  
  /**
   * Whether the item shows a loading indicator
   */
  loading?: boolean;
  
  /**
   * Actions available when swiping the item
   */
  swipeActions?: {
    leading?: ListItemAction[];
    trailing?: ListItemAction[];
  };
  
  /**
   * Nested items for expandable lists
   */
  items?: ListItem[];
  
  /**
   * Whether the nested list is expanded
   */
  expanded?: boolean;

  /**
   * Custom styles for this item
   */
  style?: {
    container?: ViewStyle;
    label?: TextStyle;
    subtitle?: TextStyle;
  };
}

export interface ListStyles {
  container?: ViewStyle;
  item?: ViewStyle;
  label?: TextStyle;
  subtitle?: TextStyle;
  selectedItem?: ViewStyle;
  disabledItem?: ViewStyle;
  iconContainer?: ViewStyle;
  textContainer?: ViewStyle;
}

export interface ListProps {
  /**
   * Array of items to display in the list
   */
  items: ListItem[];
  
  /**
   * Visual variant of the list
   * @default 'default'
   */
  variant?: ListVariant;
  
  /**
   * Size variant of the list items
   * @default 'medium'
   */
  size?: ListSize;

  /**
   * Custom styles for the container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Show loading state with shimmer effect
   */
  isLoading?: boolean;

  /**
   * Number of loading placeholder items to show
   * @default 3 
   */
  loadingItems?: number;

  /**
   * Show dividers between items
   * @default false
   */
  showDividers?: boolean;

  /**
   * Density of the list items
   * @default 'default'
   */
  density?: ListDensity;

  /**
   * Callback when an expandable item is expanded/collapsed
   */
  onItemExpand?: (item: ListItem) => void;

  /**
   * Test ID for testing
   */
  testID?: string;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;
  
  /**
   * Whether to animate items on mount
   * @default false
   */

  
  /**
   * Custom component to render when the list is empty
   */
  ListEmptyComponent?: React.ComponentType | React.ReactElement;
  
  /**
   * Component to render at the top of the list
   */
  ListHeaderComponent?: React.ComponentType | React.ReactElement;
  
  /**
   * Component to render at the bottom of the list
   */
  ListFooterComponent?: React.ComponentType | React.ReactElement;
  

}

export const List: React.FC<ListProps> = ({
  items,
  variant = 'default',
  size = 'medium',
  density = 'default',
  isLoading,
  loadingItems = 3,
  ListEmptyComponent,
  ListHeaderComponent,
  ListFooterComponent,
  showDividers = false,
  containerStyle,
  onItemExpand,
  accessibilityLabel,
  testID,
}) => {
  const theme = useTheme();
  const [animated] = React.useState(true);
  const [showShimmer] = React.useState(isLoading);
  const styles = React.useMemo(
    () => getListStyles(theme, variant, showDividers, density, size),
    [theme, variant, showDividers, density, size]
  );
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({});
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const loadingAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animated) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [animated, fadeAnim]);

  React.useEffect(() => {
    if (showShimmer) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(loadingAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(loadingAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [showShimmer, loadingAnim]);

  const handleItemPress = useCallback((item: ListItem) => {
    if (item.disabled || !item.onPress) return;

    if (item.items) {
      setExpandedItems(prev => ({
        ...prev,
        [item.id]: !prev[item.id],
      }));
      onItemExpand?.(item);
    }

    item.onPress();
  }, [onItemExpand]);

  const getItemHeight = useCallback(() => {
    const sizeMap = {
      compact: {
        small: 32,
        medium: 40,
        large: 48
      },
      default: {
        small: 48,
        medium: 56,
        large: 72
      }
    };

    return sizeMap[density][size];
  }, [density, size]);

  const renderItem = ({ item, index }: { item: ListItem; index: number }) => {
    const isExpanded = item.items && (expandedItems[item.id] || item.expanded);
    const itemStyles = [
      styles.item,
      {
        height: getItemHeight(),
      },
      item.style?.container,
      item.selected && styles.selectedItem,
      item.disabled && styles.disabledItem,
      index === items.length - 1 && styles.lastItem,
    ];

    if (isLoading) {
      return (
        <Animated.View
          style={[
            itemStyles,
            {
              opacity: loadingAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.7],
              }),
            },
          ]}
        />
      );
    }

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    return (
      <React.Fragment>
        <AnimatedTouchable
          onPress={() => handleItemPress(item)}
          disabled={item.disabled || !item.onPress}
          style={[
            itemStyles,
            animated && {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={item.label}
          accessibilityState={{
            disabled: item.disabled,
            selected: item.selected,
            expanded: isExpanded,
          }}
        >
          {item.startIcon && (
            <View style={styles.iconContainer}>
              {item.startIcon}
            </View>
          )}
          <View style={styles.textContainer}>
            <Text 
              style={[styles.label, item.style?.label]} 
              numberOfLines={1}
            >
              {item.label}
            </Text>
            {item.subtitle && (
              <Text 
                style={[styles.subtitle, item.style?.subtitle]} 
                numberOfLines={2}
              >
                {item.subtitle}
              </Text>
            )}
          </View>
          {item.loading ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : (
            item.endIcon && (
              <View style={styles.iconContainer}>
                {item.endIcon}
              </View>
            )
          )}
          {item.items && (
            <Text style={styles.expandIcon}>
              {isExpanded ? '▼' : '▶'}
            </Text>
          )}
        </AnimatedTouchable>
        {isExpanded && item.items && (
          <View style={styles.nestedList}>
            <List
              {...{
                items: item.items,
                variant,
                size,
                density,
                showDividers,
                isLoading: false
              }}
            />
          </View>
        )}
      </React.Fragment>
    );
  };

  return (
    <FlatList
      data={items}
      keyExtractor={item => item.label}
      style={[styles.container, containerStyle]}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    />
  );
};

const getListStyles = (
  theme: Theme,
  variant: ListVariant,
  showDividers: boolean,
  density: ListDensity,
  size: ListSize
) => StyleSheet.create({
  container: {
    backgroundColor: variant === 'contained' ? theme.colors.surface : theme.colors.background,
    flex: 1,
  },
  disabledItem: {
    opacity: 0.5,
  },
  expandIcon: {
    color: theme.colors.onSurfaceVariant,
    fontSize: size === 'large' ? theme.fontSize.body1 : theme.fontSize.caption,
    marginLeft: theme.spacing.sm,
  },
  iconContainer: {
    justifyContent: 'center',
    marginHorizontal: density === 'compact' ? theme.spacing.xs : theme.spacing.sm,
  },
  item: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: showDividers ? StyleSheet.hairlineWidth : 0,
    flexDirection: 'row',
    padding: density === 'compact' ? theme.spacing.sm : theme.spacing.md,
    ...(variant === 'outlined' && {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.sm,
      marginVertical: theme.spacing.xs,
      marginHorizontal: theme.spacing.sm,
    }),
    ...(variant === 'card' && {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.sm,
      marginVertical: theme.spacing.xs,
      marginHorizontal: theme.spacing.sm,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    }),
  },
  label: {
    color: theme.colors.text,
    fontSize: (() => {
      if (size === 'small') return theme.fontSize.caption;
      if (size === 'large') return theme.fontSize.h6;
      return theme.fontSize.body1;
    })(),
    fontWeight: theme.fontWeight.regular,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  nestedList: {
    marginLeft: theme.spacing.lg,
  },
  selectedItem: {
    backgroundColor: theme.colors.primaryContainer,
  },
  subtitle: {
    color: theme.colors.onSurfaceVariant,
    fontSize: (() => {
      if (size === 'small') return theme.fontSize.overline;
      if (size === 'large') return theme.fontSize.body1;
      return theme.fontSize.caption;
    })(),
    marginTop: density === 'compact' ? 2 : 4,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: density === 'compact' ? theme.spacing.xs : theme.spacing.sm,
  },
});
