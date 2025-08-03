export const baseTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#FF9500',
    background: '#FFFFFF',
    text: '#222222',
    card: '#F2F2F7',
    border: '#E5E5EA',
    disabled: '#C7C7CC',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5856D6',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: 8,
  fontSizes: {
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    h6: 16,
    subtitle1: 16,
    subtitle2: 14,
    body1: 16,
    body2: 14,
    caption: 12,
    overline: 10,
  },
  sizes: {
    icon: 24,
    avatar: 40,
    buttonHeight: 44,
    inputHeight: 44,
  },
  components: {
    alert: {
      container: {
        borderWidth: 1,
        borderStyle: 'solid',
      },
      text: {
        letterSpacing: 0.15,
      },
      variants: {
        success: {
          container: {
            backgroundColor: 'rgba(52, 199, 89, 0.1)',
            borderColor: 'rgba(52, 199, 89, 0.3)',
          },
          text: {
            color: '#2A7D47',
          },
        },
        info: {
          container: {
            backgroundColor: 'rgba(88, 86, 214, 0.1)',
            borderColor: 'rgba(88, 86, 214, 0.3)',
          },
          text: {
            color: '#3B3A8C',
          },
        },
        warning: {
          container: {
            backgroundColor: 'rgba(255, 149, 0, 0.1)',
            borderColor: 'rgba(255, 149, 0, 0.3)',
          },
          text: {
            color: '#A66100',
          },
        },
        error: {
          container: {
            backgroundColor: 'rgba(255, 59, 48, 0.1)',
            borderColor: 'rgba(255, 59, 48, 0.3)',
          },
          text: {
            color: '#A62A23',
          },
        },
      },
    },
    card: {
      container: {
        borderRadius: 8,
      },
      content: {
        padding: 16,
      },
      loadingOverlay: {
        backgroundColor: 'rgba(242, 242, 247, 0.8)',
      },
    },
    list: {
      container: {
        flex: 1,
      },
      item: {
        minHeight: 48,
      },
      selectedItem: {
        backgroundColor: 'rgba(0, 122, 255, 0.08)',
      },
      disabledItem: {
        opacity: 0.6,
      },
      iconContainer: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
      },
      textContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      label: {
        fontSize: 16,
        letterSpacing: 0.15,
      },
      subtitle: {
        fontSize: 14,
        letterSpacing: 0.1,
        opacity: 0.7,
      },
      variants: {
        elevated: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        },
        outlined: {
          borderWidth: 1,
          borderColor: '#E5E5EA',
        },
        filled: {
          backgroundColor: '#F2F2F7',
        },
        tonal: {
          backgroundColor: 'rgba(0, 122, 255, 0.08)',
        },
      },
    },
    list: {
      container: {
        backgroundColor: '#FFFFFF',
      },
      item: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
      },
      label: {
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.15,
      },
    },
  },
};
