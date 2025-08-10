import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
  ActivityIndicator,
  TouchableOpacity,
  ImageErrorEventData,
  NativeSyntheticEvent,
} from 'react-native';
import { useTheme, Theme } from '../theme';

export type ImageListVariant = 'grid' | 'masonry';

export interface ImageItem {
  source: ImageSourcePropType;
  aspectRatio?: number;
  onPress?: () => void;
}

export interface ImageListProps {
  /**
   * Array of image items to display
   */
  images: ImageItem[];
  /**
   * Number of columns in the grid
   * @default 3
   */
  columns?: number;
  /**
   * Space between images
   * @default undefined (uses theme.spacing.sm)
   */
  gap?: number;
  /**
   * Additional styles for the container
   */
  style?: ViewStyle;
  /**
   * Additional styles for each image
   */
  imageStyle?: ImageStyle;
  /**
   * Layout variant of the image list
   * @default 'grid'
   */
  variant?: ImageListVariant;
  /**
   * Whether to show loading indicator while images load
   * @default true
   */
  showLoading?: boolean;
  /**
   * Custom placeholder component when image fails to load
   */
  fallback?: React.ReactNode;
  /**
   * Called when an image fails to load
   */
  onError?: (event: NativeSyntheticEvent<ImageErrorEventData>) => void;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const ImageList: React.FC<ImageListProps> = ({
  images,
  columns = 3,
  gap,
  style,
  imageStyle,
  variant = 'grid',
  showLoading = true,
  fallback,
  onError,
  testID,
}) => {
  const theme = useTheme();
  const spacing = gap ?? theme.imageList.gap.md;

  const [loadingStates, setLoadingStates] = React.useState<{ [key: number]: boolean }>(
    Object.fromEntries(images.map((_, idx) => [idx, true]))
  );
  const [errorStates, setErrorStates] = React.useState<{ [key: number]: boolean }>({});

  const handleLoad = (idx: number) => {
    setLoadingStates(prev => ({ ...prev, [idx]: false }));
  };

  const handleError = (idx: number, event: NativeSyntheticEvent<ImageErrorEventData>) => {
    setErrorStates(prev => ({ ...prev, [idx]: true }));
    setLoadingStates(prev => ({ ...prev, [idx]: false }));
    onError?.(event);
  };

  // Memoized styles
  const imageContainerBaseStyle = React.useMemo(() => ({
    backgroundColor: theme.imageList.background,
    borderRadius: theme.imageList.borderRadius,
    overflow: 'hidden' as ViewStyle['overflow'],
    position: 'relative' as ViewStyle['position'],
  }), [theme]);
  const loadingContainerBaseStyle = React.useMemo(() => ({
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center' as ViewStyle['alignItems'],
    backgroundColor: theme.imageList.loading.background,
    justifyContent: 'center' as ViewStyle['justifyContent'],
  }), [theme]);
  const fallbackContainerBaseStyle = React.useMemo(() => ({
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center' as ViewStyle['alignItems'],
    backgroundColor: theme.imageList.fallback.background,
    justifyContent: 'center' as ViewStyle['justifyContent'],
  }), [theme]);

  const renderImage = (item: ImageItem, idx: number) => {
    let key: string | number = idx;
    if (typeof item.source === 'object' && item.source && 'uri' in item.source && typeof item.source.uri === 'string') {
      key = item.source.uri;
    }

    const imageContainerStyle = imageContainerBaseStyle;
    const imageStyleFinal = [
      {
        width: '100%',
        aspectRatio: item.aspectRatio || 1,
        borderRadius: theme.imageList.borderRadius,
      },
      imageStyle,
    ];
    const loadingContainerStyle = loadingContainerBaseStyle;
    const fallbackContainerStyle = fallbackContainerBaseStyle;
    const itemStyle = {
      width: variant === 'grid' ? `${100 / columns}%` : '100%',
      padding: spacing / 2,
    };

    const imageComponent = (
      <View style={imageContainerStyle}>
        <Image
          key={key}
          source={item.source}
          style={imageStyleFinal}
          resizeMode="cover"
          testID={`${testID}-item-${idx}`}
          onLoad={() => handleLoad(idx)}
          onError={(e) => handleError(idx, e)}
        />
        {showLoading && loadingStates[idx] && (
          <View style={loadingContainerStyle}>
            <ActivityIndicator color={theme.imageList.loading.color} />
          </View>
        )}
        {errorStates[idx] && fallback && (
          <View style={fallbackContainerStyle}>{fallback}</View>
        )}
      </View>
    );

    return item.onPress ? (
      <TouchableOpacity key={key} onPress={item.onPress} style={itemStyle}>
        {imageComponent}
      </TouchableOpacity>
    ) : (
      <View key={key} style={itemStyle}>
        {imageComponent}
      </View>
    );
  };

  return (
    <View
      style={[
        styles(theme).container,
        {
          margin: -spacing / 2, // Compensate for item padding
        },
        style,
      ]}
      testID={testID}
    >
      {variant === 'masonry' ? (
        // Masonry layout: Split images into columns
        <View style={styles(theme).masonryContainer}>
          {Array.from({ length: columns }).map((_, colIdx) => (
            <View key={colIdx} style={{ flex: 1 }}>
              {images
                .filter((_, idx) => idx % columns === colIdx)
                .map((item, idx) => renderImage(item, idx * columns + colIdx))}
            </View>
          ))}
        </View>
      ) : (
        // Grid layout: Simple flex wrap
        images.map((item, idx) => renderImage(item, idx))
      )}
    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  container: {
    width: '100%',
  },
  masonryContainer: {
    flexDirection: 'row',
    width: '100%',
  },
});
