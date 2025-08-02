import React from 'react';
import { Text, StyleSheet, ViewStyle, FlatList, TouchableOpacity } from 'react-native';
import { useTheme, Theme } from '../theme/ThemeProvider';

export interface ListItem {
  label: string;
  onPress?: () => void;
}

export interface ListProps {
  items: ListItem[];
  style?: ViewStyle;
}

export const List: React.FC<ListProps> = ({ items, style }) => {
  const theme = useTheme();
  return (
    <FlatList
      data={items}
      keyExtractor={item => item.label}
      style={style}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={item.onPress}
          disabled={!item.onPress}
          style={styles(theme).item}
        >
          <Text style={styles(theme).label}>{item.label}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  item: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.fontSize.body1,
    fontWeight: theme.fontWeight.regular,
  },
});
