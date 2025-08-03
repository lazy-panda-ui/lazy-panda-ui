import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  BackHandler,
  Dimensions,
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type SelectVariant = 'outlined' | 'filled' | 'standard' | 'underlined';
export type SelectSize = 'small' | 'medium' | 'large';
export type SelectPosition = 'top' | 'bottom' | 'auto';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
  color?: string;
}

export interface SelectStyleProps {
  container?: ViewStyle;
  label?: TextStyle;
  dropdown?: ViewStyle;
  option?: ViewStyle;
  text?: TextStyle;
  error?: TextStyle;
  helper?: TextStyle;
  search?: ViewStyle;
}

export interface SelectProps {
  /**
   * Array of options to display
   */
  options: SelectOption[];
  /**
   * Currently selected value(s)
   */
  value?: string | string[];
  /**
   * Callback when value changes
   */
  onChange: (value: string | string[]) => void;
  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string;
  /**
   * Visual variant of the select
   * @default 'outlined'
   */
  variant?: SelectVariant;
  /**
   * Size of the select
   * @default 'medium'
   */
  size?: SelectSize;
  /**
   * Label text
   */
  label?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the select is in loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Whether to enable search functionality
   * @default false
   */
  searchable?: boolean;
  /**
   * Placeholder text for search input
   */
  searchPlaceholder?: string;
  /**
   * Whether to allow multiple selection
   * @default false
   */
  multiple?: boolean;
  /**
   * Maximum number of items that can be selected when multiple is true
   */
  maxSelectedItems?: number;
  /**
   * Custom render function for option
   */
  renderOption?: (option: SelectOption) => React.ReactElement;
  /**
   * Leading icon or component
   */
  startIcon?: React.ReactNode;
  /**
   * Trailing icon or component
   */
  endIcon?: React.ReactNode;
  /**
   * Whether to close the dropdown on selecting an option
   * @default true for single select, false for multiple select
   */
  closeOnSelect?: boolean;
  /**
   * Dropdown position
   * @default 'auto'
   */
  dropdownPosition?: SelectPosition;
  /**
   * Additional styles for components
   */
  style?: SelectStyleProps;
  /**
   * Test ID for testing
   */
  testID?: string;
}

const getInitialValue = (value: string | string[] | undefined, multiple: boolean): string[] => {
  if (!value) return [];
  if (multiple) {
    return Array.isArray(value) ? value : [value];
  }
  return Array.isArray(value) ? [value[0]] : [value];
};

const getDropdownPosition = (
  spaceBelow: number,
  spaceAbove: number,
  position: SelectPosition
): 'top' | 'bottom' => {
  if (position !== 'auto') return position;
  return spaceBelow >= 200 || spaceBelow >= spaceAbove ? 'bottom' : 'top';
};

const createStyles = (
  theme: ReturnType<typeof useTheme>,
  variant: SelectVariant,
  size: SelectSize,
  error?: string
) => {
  const getFontSize = (baseSize: number): number => {
    switch (size) {
      case 'small': return baseSize - 2;
      case 'large': return baseSize + 2;
      default: return baseSize;
    }
  };

  const getPadding = (): number => {
    switch (size) {
      case 'small': return theme.spacing.sm;
      case 'large': return theme.spacing.lg;
      default: return theme.spacing.md;
    }
  };

  return StyleSheet.create({
    checkmark: {
      color: theme.colors.primary,
      fontSize: getFontSize(18),
      marginLeft: theme.spacing.sm,
    },
    container: {
      position: 'relative',
      width: '100%',
    },
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      minHeight: size === 'small' ? 40 : size === 'large' ? 56 : 48,
      padding: getPadding(),
    },
    dropdown: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.sm,
      elevation: 8,
      maxHeight: 300,
      position: 'absolute',
      shadowColor: theme.colors.outline,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    endIcon: {
      marginLeft: theme.spacing.sm,
    },
    error: {
      color: theme.colors.error,
      fontSize: getFontSize(12),
      marginTop: theme.spacing.xs,
    },
    helper: {
      color: theme.colors.onSurfaceVariant,
      fontSize: getFontSize(12),
      marginTop: theme.spacing.xs,
    },
    inputContainer: {
      backgroundColor: variant === 'filled' ? theme.colors.surfaceVariant : 'transparent',
      borderBottomWidth: variant === 'standard' ? 0 : 1,
      borderColor: error ? theme.colors.error : theme.colors.outline,
      borderRadius: (variant === 'standard' || variant === 'underlined') ? 0 : theme.borderRadius.sm,
      borderWidth: variant === 'standard' ? 0 : 1,
      opacity: 1,
      overflow: 'hidden',
    },
    label: {
      backgroundColor: variant === 'standard' ? 'transparent' : theme.colors.background,
      color: error ? theme.colors.error : theme.colors.onSurface,
      fontSize: getFontSize(14),
      left: variant === 'standard' ? 0 : 8,
      paddingHorizontal: theme.spacing.xs,
      position: variant === 'standard' ? 'relative' : 'absolute',
      top: variant === 'standard' ? 0 : -8,
    },
    option: {
      alignItems: 'center',
      flexDirection: 'row',
      minHeight: 48,
      padding: theme.spacing.md,
    },
    optionContent: {
      flex: 1,
    },
    optionDescription: {
      color: theme.colors.onSurfaceVariant,
      fontSize: getFontSize(14),
      marginTop: theme.spacing.xs,
    },
    optionDisabled: {
      opacity: 0.5,
    },
    optionIcon: {
      marginRight: theme.spacing.sm,
    },
    optionLabel: {
      color: theme.colors.onSurface,
      fontSize: getFontSize(16),
    },
    optionSelected: {
      backgroundColor: theme.colors.primaryContainer,
    },
    placeholder: {
      color: theme.colors.onSurfaceVariant,
    },
    searchContainer: {
      borderBottomColor: theme.colors.outline,
      borderBottomWidth: 1,
      padding: theme.spacing.sm,
    },
    searchInput: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.sm,
      color: theme.colors.onSurface,
      padding: theme.spacing.sm,
    },
    startIcon: {
      marginRight: theme.spacing.sm,
    },
    value: {
      color: theme.colors.onSurface,
      flex: 1,
      fontSize: getFontSize(16),
    },
  });
};

export const Select: React.FC<SelectProps> = React.memo(({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  variant = 'outlined',
  size = 'medium',
  label,
  error,
  helperText,
  disabled = false,
  loading = false,
  searchable = false,
  searchPlaceholder = 'Search...',
  multiple = false,
  maxSelectedItems,
  renderOption,
  startIcon,
  endIcon,
  closeOnSelect,
  dropdownPosition = 'auto',
  style,
  testID,
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>(() => 
    getInitialValue(value, multiple)
  );
  const [dropdownLayout, setDropdownLayout] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);

  const containerRef = useRef<View>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const styles = React.useMemo(
    () => createStyles(theme, variant, size, error),
    [theme, variant, size, error]
  );

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isOpen) {
          closeDropdown();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [isOpen]);

  const openDropdown = useCallback(() => {
    Keyboard.dismiss();
    containerRef.current?.measureInWindow((x, y, width, height) => {
      const screenHeight = Dimensions.get('window').height;
      const spaceBelow = screenHeight - y - height;
      const spaceAbove = y;
      const position = getDropdownPosition(spaceBelow, spaceAbove, dropdownPosition);

      setDropdownLayout({
        width,
        height,
        x,
        y: position === 'bottom' ? y + height : y - Math.min(300, spaceAbove),
      });
    });

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, dropdownPosition]);

  const closeDropdown = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsOpen(false);
      setDropdownLayout(null);
      setSearchQuery('');
    });
  }, [fadeAnim, slideAnim]);

  const toggleDropdown = useCallback(() => {
    if (disabled || loading) return;
    
    if (isOpen) {
      closeDropdown();
    } else {
      setIsOpen(true);
      openDropdown();
    }
  }, [disabled, loading, isOpen, openDropdown, closeDropdown]);

  const handleOptionPress = useCallback((option: SelectOption) => {
    if (option.disabled) return;

    if (multiple) {
      setSelectedValues(prev => {
        if (prev.includes(option.value)) {
          const newValues = prev.filter(v => v !== option.value);
          onChange(newValues);
          return newValues;
        }
        
        if (maxSelectedItems && prev.length >= maxSelectedItems) {
          return prev;
        }

        const newValues = [...prev, option.value];
        onChange(newValues);
        return newValues;
      });

      if (closeOnSelect) {
        closeDropdown();
      }
    } else {
      setSelectedValues([option.value]);
      onChange(option.value);
      closeDropdown();
    }
  }, [multiple, maxSelectedItems, onChange, closeOnSelect, closeDropdown]);

  const filteredOptions = React.useMemo(() => 
    options.filter(option =>
      searchQuery
        ? option.label.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    ),
    [options, searchQuery]
  );

  const renderOptionItem = useCallback(({ item }: ListRenderItemInfo<SelectOption>) => {
    if (renderOption) return renderOption(item);

    const isSelected = selectedValues.includes(item.value);

    return (
      <Pressable
        onPress={() => handleOptionPress(item)}
        disabled={item.disabled}
        style={[
          styles.option,
          isSelected && styles.optionSelected,
          item.disabled && styles.optionDisabled,
          style?.option,
        ]}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected, disabled: item.disabled }}
      >
        {item.icon && (
          <View style={styles.optionIcon}>
            {item.icon}
          </View>
        )}
        <View style={styles.optionContent}>
          <Text
            style={[
              styles.optionLabel,
              { color: item.color || theme.colors.onSurface },
              style?.text,
            ]}
            numberOfLines={1}
          >
            {item.label}
          </Text>
          {item.description && (
            <Text style={[styles.optionDescription, style?.text]}>
              {item.description}
            </Text>
          )}
        </View>
        {multiple && isSelected && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </Pressable>
    );
  }, [
    renderOption,
    selectedValues,
    handleOptionPress,
    styles,
    style,
    multiple,
    theme.colors,
  ]);

  const selectedLabels = React.useMemo(() => {
    if (!selectedValues.length) return placeholder;
    if (multiple) return `${selectedValues.length} selected`;
    const selectedOption = options.find(o => o.value === selectedValues[0]);
    return selectedOption?.label || placeholder;
  }, [selectedValues, options, multiple, placeholder]);

  return (
    <View style={[styles.container, style?.container]} testID={testID} ref={containerRef}>
      {label && (
        <Text style={[styles.label, style?.label]}>
          {label}
        </Text>
      )}
      <View style={[styles.inputContainer, disabled && { opacity: 0.5 }]}>
        <Pressable
          onPress={toggleDropdown}
          style={styles.content}
          disabled={disabled || loading}
        >
          {startIcon && <View style={styles.startIcon}>{startIcon}</View>}
          <Text
            style={[
              styles.value,
              !selectedValues.length && styles.placeholder,
              style?.text,
            ]}
            numberOfLines={1}
          >
            {selectedLabels}
          </Text>
          {endIcon || (
            <View style={styles.endIcon}>
              {loading ? (
                <ActivityIndicator size="small" color={theme.colors.primary} />
              ) : (
                <Text style={{ color: theme.colors.onSurfaceVariant }}>▼</Text>
              )}
            </View>
          )}
        </Pressable>
      </View>
      {(error || helperText) && (
        <Text style={[error ? styles.error : styles.helper, error ? style?.error : style?.helper]}>
          {error || helperText}
        </Text>
      )}
      <Modal
        visible={isOpen}
        transparent
        onRequestClose={closeDropdown}
        animationType="none"
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={closeDropdown}>
          {dropdownLayout && (
            <Animated.View
              style={[
                styles.dropdown,
                {
                  top: dropdownLayout.y,
                  width: dropdownLayout.width,
                  left: dropdownLayout.x,
                  opacity: fadeAnim,
                  transform: [{
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [dropdownPosition === 'top' ? 20 : -20, 0],
                    }),
                  }],
                },
                style?.dropdown,
              ]}
            >
              {searchable && (
                <View style={styles.searchContainer}>
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder={searchPlaceholder}
                    placeholderTextColor={theme.colors.onSurfaceVariant}
                    style={[styles.searchInput, style?.search]}
                    autoFocus
                  />
                </View>
              )}
              <FlatList
                data={filteredOptions}
                renderItem={renderOptionItem}
                keyExtractor={item => item.value}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              />
            </Animated.View>
          )}
        </Pressable>
      </Modal>
    </View>
  );
});
