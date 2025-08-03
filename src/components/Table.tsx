import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type TableVariant = 'outlined' | 'contained' | 'minimal';
export type TableSize = 'small' | 'medium' | 'large';

export interface Column<T> {
  /**
   * Unique key for the column
   */
  key: string;
  /**
   * Title of the column
   */
  title: string;
  /**
   * Function to render the cell content
   */
  render?: (item: T) => React.ReactNode;
  /**
   * Width of the column
   */
  width?: number;
  /**
   * Whether the column is sortable
   */
  sortable?: boolean;
  /**
   * Additional styles for the column header
   */
  headerStyle?: ViewStyle;
  /**
   * Additional styles for the column cells
   */
  cellStyle?: ViewStyle;
}

export interface TableProps<T> {
  /**
   * Array of column configurations
   */
  columns: Column<T>[];
  /**
   * Array of data items
   */
  data: T[];
  /**
   * Visual variant of the table
   * @default 'outlined'
   */
  variant?: TableVariant;
  /**
   * Size of the table cells
   * @default 'medium'
   */
  size?: TableSize;
  /**
   * Whether the table is scrollable horizontally
   * @default true
   */
  scrollable?: boolean;
  /**
   * Whether to show alternating row colors
   * @default false
   */
  striped?: boolean;
  /**
   * Whether to highlight rows on hover
   * @default true
   */
  hoverable?: boolean;
  /**
   * Function to handle row selection
   */
  onRowPress?: (item: T) => void;
  /**
   * Additional styles for the container
   */
  style?: ViewStyle;
  /**
   * Additional styles for the header row
   */
  headerStyle?: ViewStyle;
  /**
   * Additional styles for the row
   */
  rowStyle?: ViewStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export function Table<T>({
  columns,
  data,
  variant = 'outlined',
  size = 'medium',
  scrollable = true,
  striped = false,
  hoverable = true,
  onRowPress,
  style,
  headerStyle,
  rowStyle,
  testID,
}: Readonly<TableProps<T>>) {
  const theme = useTheme();

  const getCellPadding = () => {
    switch (size) {
      case 'small':
        return theme.spacing.xs;
      case 'large':
        return theme.spacing.lg;
      default:
        return theme.spacing.md;
    }
  };

  const styles = React.useMemo(() => getStyles(theme), [theme]);

  const renderHeader = () => (
    <View style={[styles.header, headerStyle]}>
      {columns.map((column) => (
        <View
          key={column.key}
          style={[
            styles.headerCell,
            { padding: getCellPadding() },
            column.width ? { width: column.width } : undefined,
            column.headerStyle,
          ].filter(Boolean)}
        >
          <Text style={styles.headerText}>{column.title}</Text>
        </View>
      ))}
    </View>
  );

  const renderRow = (item: T, index: number) => {
    const rowContent = (
      <View
        style={[
          styles.row,
          striped && index % 2 === 1 && styles.striped,
          variant === 'outlined' && styles.outlinedRow,
          rowStyle,
        ].filter(Boolean)}
      >
        {columns.map((column) => (
          <View
            key={column.key}
            style={[
              styles.cell,
              { padding: getCellPadding() },
              column.width ? { width: column.width } : undefined,
              column.cellStyle,
            ].filter(Boolean)}
          >
            {column.render ? (
              column.render(item)
            ) : (
              <Text style={styles.cellText}>
                {String((item as any)[column.key])}
              </Text>
            )}
          </View>
        ))}
      </View>
    );

    return onRowPress ? (
      <TouchableOpacity
        key={index}
        onPress={() => onRowPress(item)}
        activeOpacity={0.7}
      >
        {rowContent}
      </TouchableOpacity>
    ) : (
      <View key={index}>{rowContent}</View>
    );
  };

  const Container = scrollable ? ScrollView : View;

  return (
    <View style={[styles.container, style]} testID={testID}>
      <Container horizontal={scrollable}>
        {renderHeader()}
        {data.map((item, index) => renderRow(item, index))}
      </Container>
    </View>
  );
}

const getStyles = (theme: ReturnType<typeof useTheme>) => StyleSheet.create({
  cell: {
    justifyContent: 'center',
    minWidth: 80,
  },
  cellText: {
    color: theme.colors.onSurface,
    fontSize: theme.fontSize.body2,
  },
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: theme.colors.surfaceVariant,
    borderBottomColor: theme.colors.outline,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  headerCell: {
    justifyContent: 'center',
  },
  headerText: {
    color: theme.colors.onSurfaceVariant,
    fontSize: theme.fontSize.body2,
    fontWeight: theme.fontWeight.medium,
  },
  outlinedRow: {
    borderColor: theme.colors.outline,
    borderWidth: 1,
  },
  row: {
    borderBottomColor: theme.colors.outline,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  striped: {
    backgroundColor: theme.colors.surfaceVariant,
  },
});
