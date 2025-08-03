import React from 'react';
import {
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  FlatList,
  TouchableOpacity,
  View,
  AccessibilityRole,
} from 'react-native';
import { useTheme, Theme } from '../theme/ThemeProvider';

export type ListVariant = 'default' | 'outlined' | 'contained';

export interface ListItem {
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
   * Whether to show dividers between items
   * @default true
   */
  showDividers?: boolean;
  
  /**
   * Additional styles for the container
   */
  containerStyle?: ViewStyle;
  
  /**
   * Additional styles for list items
   */
  itemStyle?: ViewStyle;
  
  /**
   * Additional styles for item labels
   */
  labelStyle?: TextStyle;
  
  /**
   * Additional styles for item subtitles
   */
  subtitleStyle?: TextStyle;
  
  /**
   * Custom component to render when the list is empty
   */
  ListEmptyComponent?: React.ReactNode;
  
  /**
   * Custom header component
   */
  ListHeaderComponent?: React.ReactNode;
  
  /**
   * Custom footer component
   */
  ListFooterComponent?: React.ReactNode;
  
  /**
   * Accessibility label for the list
   */
  accessibilityLabel?: string;
  
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const List: React.FC<ListProps> = ({
  items,
  variant = 'default',
  showDividers = true,
  containerStyle,
  itemStyle,
  labelStyle,
  subtitleStyle,
  ListEmptyComponent,
  ListHeaderComponent,
  ListFooterComponent,
  accessibilityLabel,
  testID,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme, variant, showDividers);

  const renderItem = ({ item, index }: { item: ListItem; index: number }) => {
    const itemStyles = [
      styles.item,
      itemStyle,
      item.selected && styles.selectedItem,
      item.disabled && styles.disabledItem,
      index === items.length - 1 && styles.lastItem,
    ];

    return (
      <TouchableOpacity
        onPress={item.onPress}
        disabled={item.disabled || !item.onPress}
        style={itemStyles}
        accessibilityRole="button"
        accessibilityLabel={item.label}
        accessibilityState={{
          disabled: item.disabled,
          selected: item.selected,
        }}
      >
        {item.startIcon && (
          <View style={styles.iconContainer}>
            {item.startIcon}
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.label, labelStyle]} numberOfLines={1}>
            {item.label}
          </Text>
          {item.subtitle && (
            <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={2}>
              {item.subtitle}
            </Text>
          )}
        </View>
        {item.endIcon && (
          <View style={styles.iconContainer}>
            {item.endIcon}
          </View>
        )}
      </TouchableOpacity>
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

const getStyles = (theme: Theme, variant: ListVariant, showDividers: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: variant === 'contained' ? theme.colors.card : theme.colors.background,
    ...theme.components?.list?.container,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderBottomWidth: showDividers ? 1 : 0,
    borderBottomColor: theme.colors.border,
    ...(variant === 'outlined' && {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.sm,
      marginVertical: theme.spacing.xs,
      marginHorizontal: theme.spacing.sm,
    }),
    ...theme.components?.list?.item,
  },
  selectedItem: {
    backgroundColor: theme.colors.primaryContainer,
    ...theme.components?.list?.selectedItem,
  },
  disabledItem: {
    opacity: 0.5,
    ...theme.components?.list?.disabledItem,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    marginHorizontal: theme.spacing.sm,
    ...theme.components?.list?.iconContainer,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    ...theme.components?.list?.textContainer,
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.fontSize.body1,
    fontWeight: theme.fontWeight.regular,
    ...theme.components?.list?.label,
  },
  subtitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.body2,
    opacity: 0.7,
    marginTop: theme.spacing.xs,
    ...theme.components?.list?.subtitle,
  },
});
