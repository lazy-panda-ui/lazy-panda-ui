import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  Animated,
  Dimensions,
  TextStyle,
  LayoutChangeEvent,
  LayoutRectangle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /**
   * The content to trigger the tooltip
   */
  children: React.ReactNode;

  /**
   * The text to show in the tooltip
   */
  text: string;

  /**
   * Position of the tooltip relative to the children
   * @default 'top'
   */
  position?: TooltipPosition;

  /**
   * Delay before showing the tooltip (ms)
   * @default 0
   */
  showDelay?: number;

  /**
   * Delay before hiding the tooltip (ms)
   * @default 0
   */
  hideDelay?: number;

  /**
   * Whether to show a small arrow pointing to the children
   * @default true
   */
  showArrow?: boolean;

  /**
   * Background color of the tooltip
   */
  backgroundColor?: string;

  /**
   * Text color of the tooltip
   */
  textColor?: string;

  /**
   * Custom styles for tooltip container
   */
  style?: ViewStyle;

  /**
   * Custom styles for tooltip content
   */
  contentStyle?: TextStyle;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = 'top',
  showDelay = 0,
  hideDelay = 0,
  showArrow = true,
  backgroundColor,
  textColor,
  style,
  contentStyle,
}) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  const [tooltipLayout, setTooltipLayout] = useState<LayoutRectangle | null>(null);
  const opacity = React.useRef(new Animated.Value(0)).current;
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  
  let showTimeout: NodeJS.Timeout;
  let hideTimeout: NodeJS.Timeout;

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    setLayout({ width, height, x, y });
  }, []);

  const handleTooltipLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setTooltipLayout({ width, height, x: 0, y: 0 });
  }, []);

  const showTooltip = () => {
    clearTimeout(hideTimeout);
    showTimeout = setTimeout(() => {
      setVisible(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, showDelay);
  };

  const hideTooltip = () => {
    clearTimeout(showTimeout);
    hideTimeout = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }, hideDelay);
  };

  useEffect(() => {
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  const getTooltipPosition = () => {
    if (!layout || !tooltipLayout) return {};

    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const { width, height, x, y } = layout;

    let tooltipX = x;
    let tooltipY = y;

    switch (position) {
      case 'top':
        tooltipX = x + width / 2 - tooltipLayout.width / 2;
        tooltipY = y - tooltipLayout.height - 8;
        break;
      case 'bottom':
        tooltipX = x + width / 2 - tooltipLayout.width / 2;
        tooltipY = y + height + 8;
        break;
      case 'left':
        tooltipX = x - tooltipLayout.width - 8;
        tooltipY = y + height / 2 - tooltipLayout.height / 2;
        break;
      case 'right':
        tooltipX = x + width + 8;
        tooltipY = y + height / 2 - tooltipLayout.height / 2;
        break;
    }

    tooltipX = Math.max(8, Math.min(tooltipX, screenWidth - tooltipLayout.width - 8));
    tooltipY = Math.max(8, Math.min(tooltipY, screenHeight - tooltipLayout.height - 8));

    return {
      left: tooltipX,
      top: tooltipY,
    };
  };

  // Always render a Text node with testID for the trigger for testability
  let trigger;
  if (typeof children === 'string') {
    trigger = <Text testID="tooltip-trigger">{children}</Text>;
  } else if (React.isValidElement(children)) {
    // Only add testID if the child supports it, otherwise wrap in Text
    if (children.props && typeof children.props === 'object' && 'testID' in children.props) {
      trigger = React.cloneElement(children as React.ReactElement<any>, { testID: 'tooltip-trigger' });
    } else {
      trigger = <Text testID="tooltip-trigger">{children}</Text>;
    }
  } else {
    // fallback
    trigger = <Text testID="tooltip-trigger">Tooltip</Text>;
  }

  return (
    <>
      <View style={style} onLayout={handleLayout}>
        <TouchableOpacity
          onPressIn={showTooltip}
          onPressOut={hideTooltip}
        >
          {trigger}
        </TouchableOpacity>
      </View>
      {visible && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Animated.View
            onLayout={handleTooltipLayout}
            style={[
              styles.tooltip,
              {
                opacity,
                backgroundColor: backgroundColor || theme.colors.surfaceVariant,
                ...getTooltipPosition(),
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  color: textColor || theme.colors.onSurfaceVariant,
                },
                contentStyle,
              ]}
            >
              {text}
            </Text>
          </Animated.View>
        </View>
      )}
    </>
  );
};

const getStyles = (theme: ReturnType<typeof useTheme>) => StyleSheet.create({
  tooltip: {
    position: 'absolute',
    backgroundColor: theme.colors.surfaceVariant,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 100,
  },
  text: {
    color: theme.colors.onSurfaceVariant,
    fontSize: theme.fontSize.body2,
  },
});
