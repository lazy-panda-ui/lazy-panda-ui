import React, { useMemo, useState, useCallback } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import type { StyleProp } from 'react-native';
import { useTheme, Theme } from '../theme';

export interface AutoCompleteProps {
  data: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  listStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({ data, onSelect, placeholder, style, inputStyle, listStyle, itemStyle, textStyle }) => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [showList, setShowList] = useState(false);

  const filtered = useMemo(() => (data ?? []).filter(item => item.toLowerCase().includes(query.toLowerCase())), [data, query]);
  const tokens = theme.autocomplete;
  const s = useMemo(() => styles(theme), [theme]);
  const onChangeText = useCallback((text: string) => { setQuery(text); setShowList(true); }, []);
  const onBlur = useCallback(() => { setTimeout(() => { setShowList(false); }, 100); }, []);
  const onFocus = useCallback(() => setShowList(true), []);

  return (
    <View style={style}>
      <TextInput
        testID="autocomplete-input"
        style={[s.input, inputStyle]}
        value={query}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tokens.input.placeholderColor}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {showList && filtered.length > 0 && (
        <FlatList
          data={filtered}
          keyExtractor={item => item}
          style={[s.list, listStyle]}
          renderItem={({ item }) => (
            <TouchableOpacity
              testID={`autocomplete-option-${item}`}
              style={[s.item, itemStyle]}
              onPress={() => {
                setQuery(item);
                setShowList(false);
                onSelect(item);
              }}
            >
              <Text style={[s.text, textStyle]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  input: {
    backgroundColor: theme.autocomplete.input.backgroundColor ?? theme.colors.surface,
    borderColor: theme.autocomplete.input.borderColor,
    borderRadius: theme.autocomplete.input.borderRadius,
    borderWidth: theme.autocomplete.input.borderWidth,
    color: theme.autocomplete.input.textColor,
    fontSize: theme.autocomplete.input.fontSize,
    padding: theme.autocomplete.input.padding,
  },
  item: {
    borderBottomColor: theme.autocomplete.item.dividerColor,
    borderBottomWidth: theme.autocomplete.item.dividerWidth,
    padding: theme.autocomplete.item.padding,
  },
  list: {
    backgroundColor: theme.autocomplete.list.backgroundColor ?? theme.colors.card,
    borderRadius: theme.autocomplete.list.borderRadius,
    marginTop: theme.spacing.xs,
    maxHeight: theme.autocomplete.list.maxHeight,
    borderWidth: theme.autocomplete.list.borderWidth,
    borderColor: theme.autocomplete.list.borderColor,
  },
  text: {
    color: theme.autocomplete.item.textColor,
    fontSize: theme.autocomplete.item.fontSize,
    fontWeight: theme.fontWeight.regular,
  },
});
