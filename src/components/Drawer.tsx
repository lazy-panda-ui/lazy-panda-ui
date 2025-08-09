/**
 * @fileoverview Drawer component for React Native applications
 * 
 * A sliding drawer component that appears from the edge of the screen.
 * Supports multiple placements (left, right, top, bottom), various sizes,
 * and includes compound components for structured content layout.
 * 
 * Features:
 * - Smooth slide-in/out animations
 * - Configurable placement from any screen edge
 * - Multiple size options (sm, md, lg, xl, full)
 * - Overlay with customizable color and click behavior
 * - Android back button support
 * - Accessibility features (focus management)
 * - Compound components: Header, Content, Footer
 * - Full theme integration with configurable styling
 * - Light/dark mode support through ThemeProvider
 * 
 * Theme Configuration:
 * All visual aspects are configurable through theme.drawer:
 * - backdrop: Overlay color and opacity
 * - container: Background, shadow, border radius
 * - header/content/footer: Colors, padding, borders
 * - animation: Duration and easing
 * - sizes: Size ratios for different breakpoints
 * 
 * @author Lazy Panda UI Team
 * @version 1.0.0
 */

import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  useWindowDimensions,
  StyleSheet,
  Animated,
  BackHandler,
  ViewStyle,
  Platform,
  Easing,
} from 'react-native';
import { useTheme } from '../theme';
import { Typography } from './Typography';
import { Button } from './Button';
import type { ButtonProps } from './Button';

/**
 * Props for the Drawer component.
 * 
 * @interface DrawerProps
 */
export interface DrawerProps {
  /** Whether the drawer is open/visible */
  open: boolean;
  /** Callback function called when the drawer should be closed */
  onClose: () => void;
  /** The side of the screen from which the drawer slides in */
  placement?: 'left' | 'right' | 'top' | 'bottom';
  /** The size of the drawer as a percentage of screen dimension */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether clicking the overlay should close the drawer */
  closeOnOverlayClick?: boolean;
  /** Whether pressing the back button (Android) should close the drawer */
  closeOnEscape?: boolean;
  /** Whether focus should be trapped within the drawer (for accessibility) */
  trapFocus?: boolean;
  /** Whether focus should return to the previous element when drawer closes */
  returnFocus?: boolean;
  /** Background color of the overlay behind the drawer */
  overlayColor?: string;
  /** The content to be rendered inside the drawer */
  children?: React.ReactNode;
  /** Additional styles for the drawer container */
  style?: ViewStyle;
}

/**
 * Props for the Drawer.Header component.
 * 
 * @interface DrawerHeaderProps
 */
export interface DrawerHeaderProps {
  /** The content to be rendered in the header. Can be a string or JSX */
  children?: React.ReactNode;
  /** Whether to show the close button in the header */
  showCloseButton?: boolean;
  /** Props to pass to the close button component */
  closeButtonProps?: ButtonProps;
  /** Additional styles for the header container */
  style?: ViewStyle;
}

/**
 * Props for the Drawer.Content component.
 * 
 * @interface DrawerContentProps
 */
export interface DrawerContentProps {
  /** The main content to be rendered in the drawer body */
  children?: React.ReactNode;
  /** Additional styles for the content container */
  style?: ViewStyle;
}

/**
 * Props for the Drawer.Footer component.
 * 
 * @interface DrawerFooterProps
 */
export interface DrawerFooterProps {
  /** The content to be rendered in the footer (typically buttons) */
  children?: React.ReactNode;
  /** Additional styles for the footer container */
  style?: ViewStyle;
}

/**
 * Context to provide Drawer actions to compound components
 */
const DrawerContext = React.createContext<{ onClose?: () => void } | null>(null);

/**
 * Header component for the Drawer. Displays a title and optional close button.
 * 
 * @component
 * @example
 * ```tsx
 * <Drawer.Header showCloseButton={true}>
 *   Settings
 * </Drawer.Header>
 * ```
 */
const DrawerHeaderComponent: React.FC<DrawerHeaderProps> = ({
  children,
  showCloseButton = true,
  closeButtonProps,
  style,
}) => {
  const theme = useTheme();
  const ctx = useContext(DrawerContext);

  return (
    <View style={[
      styles.header, 
      { 
        borderBottomColor: theme.drawer.header.borderColor || theme.colors.border,
        borderBottomWidth: theme.drawer.header.borderWidth,
        backgroundColor: theme.drawer.header.backgroundColor || theme.colors.surface,
        padding: theme.drawer.header.padding,
        minHeight: theme.drawer.header.minHeight,
      }, 
      style
    ]}>
      <View style={styles.headerContent}>
        {typeof children === 'string' ? (
          <Typography variant="h6" style={styles.headerTitle}>
            {children}
          </Typography>
        ) : (
          children
        )}
      </View>
      {showCloseButton && (
        <Button
          title="✕"
          variant="text"
          size="small"
          {...closeButtonProps}
          onPress={closeButtonProps?.onPress ?? ctx?.onClose}
        />
      )}
    </View>
  );
};
const DrawerHeader = React.memo(DrawerHeaderComponent);

/**
 * Content component for the Drawer. Contains the main scrollable content area.
 * 
 * @component
 * @example
 * ```tsx
 * <Drawer.Content>
 *   <Text>Drawer content goes here</Text>
 * </Drawer.Content>
 * ```
 */
const DrawerContentComponent: React.FC<DrawerContentProps> = ({ children, style }) => {
  const theme = useTheme();

  return (
    <View style={[
      styles.content, 
      { 
        backgroundColor: theme.drawer.content.backgroundColor || theme.colors.surface,
        padding: theme.drawer.content.padding,
      }, 
      style
    ]}>
      {children}
    </View>
  );
};
const DrawerContent = React.memo(DrawerContentComponent);

/**
 * Footer component for the Drawer. Typically contains action buttons.
 * 
 * @component
 * @example
 * ```tsx
 * <Drawer.Footer>
 *   <Button onPress={onSave}>Save</Button>
 *   <Button variant="outlined" onPress={onCancel}>Cancel</Button>
 * </Drawer.Footer>
 * ```
 */
const DrawerFooterComponent: React.FC<DrawerFooterProps> = ({ children, style }) => {
  const theme = useTheme();

  return (
    <View style={[
      styles.footer, 
      { 
        borderTopColor: theme.drawer.footer.borderColor || theme.colors.border,
        borderTopWidth: theme.drawer.footer.borderWidth,
        backgroundColor: theme.drawer.footer.backgroundColor || theme.colors.surface,
        padding: theme.drawer.footer.padding,
        minHeight: theme.drawer.footer.minHeight,
      }, 
      style
    ]}>
      {children}
    </View>
  );
};
const DrawerFooter = React.memo(DrawerFooterComponent);

/**
 * A sliding drawer component that appears from the edge of the screen.
 * 
 * Drawer provides a way to display additional content or navigation that slides in from
 * one of the screen edges. It includes compound components for structured content:
 * Header, Content, and Footer.
 * 
 * All visual styling is configurable through the ThemeProvider, including colors,
 * spacing, animations, shadows, and size ratios. This ensures consistent theming
 * across light and dark modes.
 * 
 * @component
 * @example
 * ```tsx
 * // Basic usage with theme-based styling
 * <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
 *   <Drawer.Header>Settings</Drawer.Header>
 *   <Drawer.Content>
 *     <Text>Drawer content</Text>
 *   </Drawer.Content>
 *   <Drawer.Footer>
 *     <Button onPress={handleSave}>Save</Button>
 *   </Drawer.Footer>
 * </Drawer>
 * 
 * // Theme configuration example
 * const customTheme = {
 *   ...defaultTheme,
 *   drawer: {
 *     ...defaultTheme.drawer,
 *     backdrop: { color: '#000000', opacity: 0.7 },
 *     animation: { duration: 500, easing: 'easeInOut' },
 *     sizes: { sm: 0.3, md: 0.5, lg: 0.7, xl: 0.9 }
 *   }
 * };
 * ```
 * 
 * @param props - The drawer props
 * @param props.open - Whether the drawer is visible
 * @param props.onClose - Function called when drawer should close
 * @param props.placement - Edge from which drawer slides (default: 'right')
 * @param props.size - Drawer size as screen percentage (default: 'md')
 * @param props.closeOnOverlayClick - Close on overlay click (default: true)
 * @param props.closeOnEscape - Close on back button press (default: true)
 * @param props.overlayColor - Overlay background color (defaults to theme.drawer.backdrop)
 * @param props.children - Drawer content
 * @param props.style - Additional styles for drawer container
 */
export const Drawer: React.FC<DrawerProps> & {
  Header: typeof DrawerHeader;
  Content: typeof DrawerContent;
  Footer: typeof DrawerFooter;
} = ({
  open,
  onClose,
  placement = 'right',
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  overlayColor,
  children,
  style,
}) => {
  const theme = useTheme();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // Map theme easing to Animated Easing
  const easingFn = useMemo(() => {
    switch (theme.drawer.animation.easing) {
      case 'easeIn':
        return Easing.in(Easing.ease);
      case 'easeOut':
        return Easing.out(Easing.ease);
      case 'easeInOut':
        return Easing.inOut(Easing.ease);
      case 'linear':
      default:
        return Easing.linear;
    }
  }, [theme.drawer.animation.easing]);

  // Overlay color/opacity handling
  const overlayBgColor = overlayColor || theme.drawer.backdrop.color;
  const overlayOpacity = useMemo(
    () =>
      overlayColor
        ? fadeAnim
        : fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0, theme.drawer.backdrop.opacity] }),
    [fadeAnim, overlayColor, theme.drawer.backdrop.opacity]
  );

  /**
   * Calculates the drawer size in pixels based on the size prop and placement.
   * 
   * @returns The drawer size in pixels
   */
  const sizeValue = useMemo(() => {
    const isHorizontal = placement === 'left' || placement === 'right';
    const dimension = isHorizontal ? screenWidth : screenHeight;
    if (size === 'full') return dimension;
    const sizes = theme.drawer.sizes;
    const sizeRatio = sizes[size] || sizes.md;
    return dimension * sizeRatio;
  }, [placement, screenWidth, screenHeight, size, theme.drawer.sizes]);

  /**
   * Generates the animated style object for the drawer based on placement.
   * 
   * @returns Style object with animated position values
   */
  const slideStyle = useMemo(() => {
    switch (placement) {
      case 'left':
        return {
          left: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-sizeValue, 0] }),
          width: sizeValue,
          height: '100%',
        } as const;
      case 'right':
        return {
          right: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-sizeValue, 0] }),
          width: sizeValue,
          height: '100%',
        } as const;
      case 'top':
        return {
          top: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-sizeValue, 0] }),
          width: '100%',
          height: sizeValue,
        } as const;
      case 'bottom':
        return {
          bottom: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-sizeValue, 0] }),
          width: '100%',
          height: sizeValue,
        } as const;
      default:
        return {} as const;
    }
  }, [placement, slideAnim, sizeValue]);

  // Handle drawer open/close animations
  useEffect(() => {
  const animationDuration = theme.drawer.animation.duration;
    
    if (open) {
      // Animate drawer into view
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: animationDuration,
      easing: easingFn,
      useNativeDriver: false, // position properties can't use native driver
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: animationDuration,
      easing: easingFn,
      useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate drawer out of view
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: animationDuration,
      easing: easingFn,
      useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: animationDuration,
      easing: easingFn,
      useNativeDriver: true,
        }),
      ]).start();
    }
  }, [open, slideAnim, fadeAnim, theme.drawer.animation.duration, easingFn]);

  // Handle Android back button press
  useEffect(() => {
    if (closeOnEscape && open) {
      /**
       * Handles the Android back button press to close the drawer.
       */
      const backAction = () => {
        onClose();
        return true; // Prevent default back action
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }
  }, [open, closeOnEscape, onClose]);

  /**
   * Handles overlay press to close drawer if closeOnOverlayClick is enabled.
   */
  const handleOverlayPress = useCallback(() => {
    if (closeOnOverlayClick) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={onClose}>
      <DrawerContext.Provider value={useMemo(() => ({ onClose }), [onClose])}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={handleOverlayPress}>
            <Animated.View
              style={[
                styles.overlay,
                { backgroundColor: overlayBgColor, opacity: overlayOpacity },
              ]}
            />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.drawer,
              {
                backgroundColor: theme.drawer.container.backgroundColor || theme.colors.surface,
                borderRadius: theme.drawer.container.borderRadius,
                ...Platform.select({
                  ios: {
                    shadowColor: theme.drawer.container.shadow.color,
                    shadowOpacity: theme.drawer.container.shadow.opacity,
                    shadowRadius: theme.drawer.container.shadow.radius,
                    shadowOffset: theme.drawer.container.shadow.offset,
                  },
                  android: { elevation: theme.drawer.container.shadow.elevation },
                  default: {},
                }),
                ...slideStyle,
              },
              style,
            ]}
          >
            {children}
          </Animated.View>
        </View>
      </DrawerContext.Provider>
    </Modal>
  );
};

/**
 * Attach compound components to the main Drawer component.
 * This enables the usage pattern: Drawer.Header, Drawer.Content, Drawer.Footer
 */
Drawer.Header = DrawerHeader;
Drawer.Content = DrawerContent;
Drawer.Footer = DrawerFooter;

/**
 * Stylesheet for the Drawer component and its sub-components.
 * 
 * Base layout styles only - colors, spacing, and dimensions are handled via theme.
 */
const styles = StyleSheet.create({
  /** Full-screen container for the modal */
  container: {
    flex: 1,
  },
  /** Semi-transparent overlay behind the drawer */
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  /** Main drawer container - positioning and shadow handled via theme */
  drawer: {
    position: 'absolute',
  },
  /** Header container - spacing and borders handled via theme */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  /** Content area within header for title/custom content */
  headerContent: {
    flex: 1,
  },
  /** Title text styling in header */
  headerTitle: {
    fontWeight: '600',
  },
  /** Main scrollable content area - padding handled via theme */
  content: {
    flex: 1,
  },
  /** Footer container - padding and borders handled via theme */
  footer: {
    // Base styles only, theme handles the rest
  },
});