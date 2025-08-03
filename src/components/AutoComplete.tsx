import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Theme } from '../theme';

export interface AutoCompleteProps {
  data: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({ data, onSelect, placeholder, style }) => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [showList, setShowList] = useState(false);

  const filtered = (data ?? []).filter(item => item.toLowerCase().includes(query.toLowerCase()));

  return (
    <View style={style}>
      <TextInput
        testID="autocomplete-input"
        style={styles(theme).input}
        value={query}
        onChangeText={text => {
          setQuery(text);
          setShowList(true);
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.border}
        onBlur={() => setTimeout(() => { setShowList(false); }, 100)}
        onFocus={function() { return setShowList(true) }}
      />
      {showList && filtered.length > 0 && (
        <FlatList
          data={filtered}
          keyExtractor={item => item}
          style={styles(theme).list}
          renderItem={({ item }) => (
            <TouchableOpacity
              testID={`autocomplete-option-${item}`}
              style={styles(theme).item}
              onPress={() => {
                setQuery(item);
                setShowList(false);
                onSelect(item);
              }}
            >
              <Text style={styles(theme).text}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  input: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    color: theme.colors.text,
    fontSize: theme.fontSize.body1,
    padding: theme.spacing.sm,
  },
  item: {
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    padding: theme.spacing.sm,
  },
  list: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.xs,
    maxHeight: theme.sizing.xl * 2,
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.fontSize.body1,
    fontWeight: theme.fontWeight.regular,
  },
});
