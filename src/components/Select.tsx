import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Animated,
  Keyboard,
  TextInput,
  ListRenderItemInfo,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type SelectVariant = 'outlined' | 'filled' | 'standard';
export type SelectSize = 'small' | 'medium' | 'large';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  /**
   * Array of options to display
   */
  options: SelectOption[];
  /**
   * Currently selected value
   */
  value?: string;
  /**
   * Callback when value changes
   */
  onChange: (value: string) => void;
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
   * Custom render function for option
   */
  renderOption?: ({ item }: { item: SelectOption }) => React.ReactElement;
  /**
   * Start icon
   */
  startIcon?: React.ReactNode;
  /**
   * End icon
   */
  endIcon?: React.ReactNode;
  /**
   * Additional styles for container
   */
  containerStyle?: ViewStyle;
  /**
   * Additional styles for the select button
   */
  style?: ViewStyle;
  /**
   * Additional styles for option items
   */
  optionStyle?: ViewStyle;
  /**
   * Additional styles for selected text
   */
  textStyle?: TextStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
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
  renderOption,
  startIcon,
  endIcon,
  containerStyle,
  style,
  optionStyle,
  textStyle,
  testID,
}) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [animation] = useState(new Animated.Value(0));

  const getSelectedLabel = () => {
    if (!value) return '';
    const option = options.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: error
            ? theme.colors.error + '10'
            : theme.colors.surfaceVariant,
          borderWidth: 0,
          borderBottomWidth: 2,
          borderBottomColor: error
            ? theme.colors.error
            : theme.colors.outline,
        };
      case 'standard':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: error
            ? theme.colors.error
            : theme.colors.outline,
        };
      default: // outlined
        return {
          backgroundColor: error
            ? theme.colors.error + '10'
            : theme.colors.surface,
          borderWidth: 1,
          borderColor: error
            ? theme.colors.error
            : theme.colors.outline,
        };
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
          minHeight: 32,
        };
      case 'large':
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          minHeight: 56,
        };
      default: // medium
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          minHeight: 44,
        };
    }
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: theme.spacing.md,
    },
    label: {
      marginBottom: theme.spacing.xs,
      color: error ? theme.colors.error : theme.colors.onSurface,
      fontSize: theme.fontSize.caption,
      fontWeight: theme.fontWeight.medium,
    },
    select: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.borderRadius.md,
      ...getVariantStyles(),
      ...getSizeStyles(),
    },
    disabled: {
      opacity: 0.6,
    },
    text: {
      flex: 1,
      color: value
        ? theme.colors.onSurface
        : theme.colors.onSurfaceVariant,
      ...getSizeStyles(),
      paddingVertical: 0,
      fontSize: theme.fontSize.body2,
    },
    icon: {
      marginHorizontal: theme.spacing.xs,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
    },
    modal: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      width: '100%',
      maxHeight: '80%',
      elevation: 5,
      shadowColor: theme.colors.onSurface,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    modalHeader: {
      padding: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
    },
    searchInput: {
      padding: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
    },
    optionList: {
      maxHeight: 300,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.outline,
    },
    optionText: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.body2,
    },
    optionDisabled: {
      opacity: 0.5,
    },
    selectedOption: {
      backgroundColor: theme.colors.primaryContainer,
    },
    selectedOptionText: {
      color: theme.colors.onPrimaryContainer,
      fontWeight: theme.fontWeight.medium,
    },
    helperText: {
      marginTop: theme.spacing.xs,
      color: error ? theme.colors.error : theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.caption,
    },
  });

  const renderOptionItem = ({ item }: { item: SelectOption }) => {
    const isSelected = value === item.value;
    
    return (
      <TouchableOpacity
        testID={`select-option-${item.value}`}
        style={[
          styles.option,
          isSelected && styles.selectedOption,
          item.disabled && styles.optionDisabled,
          optionStyle,
        ]}
        onPress={() => {
          if (!item.disabled) {
            onChange(item.value);
            setVisible(false);
          }
        }}
        disabled={item.disabled}
      >
        <Text style={[
          styles.optionText,
          isSelected && styles.selectedOptionText,
        ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        testID="select-trigger"
        style={[
          styles.select,
          disabled && styles.disabled,
          style,
        ]}
        onPress={() => {
          if (!disabled && !loading) {
            setVisible(true);
          }
        }}
        activeOpacity={disabled ? 1 : 0.7}
      >
        {startIcon && <View style={styles.icon}>{startIcon}</View>}
        <Text 
          style={[styles.text, textStyle]}
          numberOfLines={1}
        >
          {getSelectedLabel() || placeholder}
        </Text>
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.primary} style={styles.icon} />
        ) : (
          endIcon && <View style={styles.icon}>{endIcon}</View>
        )}
      </TouchableOpacity>
      {(error || helperText) && (
        <Text style={styles.helperText}>
          {error || helperText}
        </Text>
      )}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity 
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <TouchableOpacity 
            activeOpacity={1}
            style={styles.modal}
          >
            {searchable && (
              <TextInput
                style={styles.searchInput}
                placeholder={searchPlaceholder}
                placeholderTextColor={theme.colors.onSurfaceVariant}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
              />
            )}
            <FlatList
              data={options.filter(opt => 
                !searchQuery || 
                opt.label.toLowerCase().includes(searchQuery.toLowerCase())
              )}
              keyExtractor={item => item.value}
              renderItem={renderOption || renderOptionItem}
              style={styles.optionList}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
