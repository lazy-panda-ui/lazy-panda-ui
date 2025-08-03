import React from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface SkeletonProps {
  /**
   * Width of the skeleton
   * @default '100%'
   */
  width?: number | string;
  
  /**
   * Height of the skeleton
   * @default 20
   */
  height?: number | string;
  
  /**
   * Custom styles for the skeleton
   */
  style?: ViewStyle;
  
  /**
   * Border radius of the skeleton
   */
  borderRadius?: number;

  /**
   * Whether to show shimmer effect
   * @default true
   */
  shimmer?: boolean;

  /**
   * Duration of shimmer animation in ms
   * @default 1000
   */
  shimmerDuration?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  style,
  borderRadius,
  shimmer = true,
  shimmerDuration = 1000,
}) => {
  const theme = useTheme();
  const shimmerAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (shimmer) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: shimmerDuration,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

      animation.start();

      return () => {
        animation.stop();
      };
    }
  }, [shimmer, shimmerDuration, shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [typeof width === 'number' ? -width : -100, typeof width === 'number' ? width : 100],
  });

  return (
    <View
      style={[
        styles(theme).skeleton,
        {
          width,
          height,
          borderRadius: borderRadius ?? theme.borderRadius,
          overflow: 'hidden',
        } as ViewStyle,
        style,
      ]}
    >
      {shimmer && (
        <Animated.View
          style={[
            styles(theme).shimmer,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = (theme: any) => StyleSheet.create({
  shimmer: {
    backgroundColor: theme.colors.surface,
    height: '100%',
    opacity: 0.5,
    position: 'absolute',
    width: '100%',
  },
  skeleton: {
    backgroundColor: theme.colors.surfaceVariant,
  },
});
