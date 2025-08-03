import React from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  Dimensions,
  ViewStyle,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type ModalSize = 'small' | 'medium' | 'large' | 'full';
export type ModalVariant = 'basic' | 'alert' | 'sheet';
export type ModalAnimation = 'slide' | 'fade' | 'scale' | 'none';

export interface ModalProps {
  /**
   * Whether the modal is visible
   */
  visible: boolean;
  /**
   * Callback when modal is closed
   */
  onDismiss: () => void;
  /**
   * Size of the modal
   * @default 'medium'
   */
  size?: ModalSize;
  /**
   * Variant of the modal
   * @default 'basic'
   */
  variant?: ModalVariant;
  /**
   * Animation type
   * @default 'slide'
   */
  animation?: ModalAnimation;
  /**
   * Whether to show backdrop
   * @default true
   */
  backdrop?: boolean;
  /**
   * Whether to dismiss when clicking outside
   * @default true
   */
  dismissable?: boolean;
  /**
   * Whether to close on back button press
   * @default true
   */
  closeOnBack?: boolean;
  /**
   * Whether to avoid keyboard
   * @default true
   */
  avoidKeyboard?: boolean;
  /**
   * Whether to allow scrolling
   * @default true
   */
  scrollable?: boolean;
  /**
   * Custom header component
   */
  header?: React.ReactNode;
  /**
   * Custom footer component
   */
  footer?: React.ReactNode;
  /**
   * Children to render
   */
  children: React.ReactNode;
  /**
   * Additional styles for the container
   */
  containerStyle?: ViewStyle;
  /**
   * Additional styles for the content
   */
  contentStyle?: ViewStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onDismiss,
  children,
  variant = 'basic',
  size = 'medium',
  animation = 'slide',
  backdrop = true,
  dismissable = true,
  closeOnBack = true,
  avoidKeyboard = true,
  scrollable = true,
  header,
  footer,
  containerStyle,
  contentStyle,
  testID,
}) => {
  const theme = useTheme();
  const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
  const [animValue] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.spring(animValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, animValue]);

  const getModalSize = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          width: windowWidth * 0.8,
          maxHeight: windowHeight * 0.3,
        };
      case 'large':
        return {
          width: windowWidth * 0.95,
          maxHeight: windowHeight * 0.8,
        };
      case 'full':
        return {
          width: windowWidth,
          height: windowHeight,
        };
      default: // medium
        return {
          width: windowWidth * 0.9,
          maxHeight: windowHeight * 0.6,
        };
    }
  };

  const getAnimation = () => {
    switch (animation) {
      case 'fade':
        return {
          opacity: animValue,
        };
      case 'scale':
        return {
          opacity: animValue,
          transform: [{
            scale: animValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1],
            }),
          }],
        };
      case 'slide':
        return {
          transform: [{
            translateY: animValue.interpolate({
              inputRange: [0, 1],
              outputRange: [windowHeight, 0],
            }),
          }],
        };
      default:
        return {};
    }
  };

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'alert':
        return {
          backgroundColor: theme.colors.error + '05',
          borderWidth: 1,
          borderColor: theme.colors.error,
        };
      case 'sheet':
        return {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: theme.borderRadius.lg,
          borderTopRightRadius: theme.borderRadius.lg,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          marginTop: 'auto',
        };
      default:
        return {};
    }
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: backdrop ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      ...getModalSize(),
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      elevation: 5,
      shadowColor: theme.colors.onSurface,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      ...getVariantStyles(),
    },
    header: {
      padding: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
    },
    content: {
      padding: theme.spacing.md,
    },
    footer: {
      padding: theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.outline,
    },
    scrollContent: {
      flexGrow: 1,
    },
  });

  const renderContent = () => {
    const Content = scrollable ? ScrollView : View;
    return (
      <Content
        style={styles.scrollContent}
        contentContainerStyle={scrollable ? { flexGrow: 1 } : undefined}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, contentStyle]}>
          {children}
        </View>
      </Content>
    );
  };

  const modalContent = (
    <Animated.View style={[styles.container, containerStyle, getAnimation()]}>
      {header && <View style={styles.header}>{header}</View>}
      {renderContent()}
      {footer && <View style={styles.footer}>{footer}</View>}
    </Animated.View>
  );

  return (
    <RNModal
      visible={visible}
      onRequestClose={closeOnBack ? onDismiss : undefined}
      transparent
      statusBarTranslucent
      animationType="none"
      testID={testID}
    >
      <TouchableWithoutFeedback onPress={dismissable ? onDismiss : undefined}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            {avoidKeyboard ? (
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
                {modalContent}
              </KeyboardAvoidingView>
            ) : (
              modalContent
            )}
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};
