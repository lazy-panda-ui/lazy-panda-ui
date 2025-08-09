export interface Theme {
  colors: {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    outline: string;
    card: string;
    text: string;
    border: string;
    error: string;
    onError: string;
    success: string;
    onSuccess: string;
    warning: string;
    onWarning: string;
    info: string;
    onInfo: string;
    disabled: string;
    onDisabled: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontSize: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
    subtitle1: number;
    subtitle2: number;
    body1: number;
    body2: number;
    caption: number;
    overline: number;
  };
  borderRadius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  sizing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  iconSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontWeight: {
    light: "300";
    regular: "400";
    medium: "500";
    semibold: "600";
    bold: "700";
  };
  drawer: {
    backdrop: {
      color: string;
      opacity: number;
    };
    container: {
      backgroundColor: string;
      borderRadius: number;
      shadow: {
        color: string;
        offset: {
          width: number;
          height: number;
        };
        opacity: number;
        radius: number;
        elevation: number;
      };
    };
    header: {
      backgroundColor?: string;
      borderColor: string;
      borderWidth: number;
      padding: number;
      minHeight: number;
    };
    content: {
      backgroundColor?: string;
      padding: number;
    };
    footer: {
      backgroundColor?: string;
      borderColor: string;
      borderWidth: number;
      padding: number;
      minHeight: number;
    };
    animation: {
      duration: number;
      easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
    };
    sizes: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  };
  accordion: {
    container: {
      backgroundColor?: string;
      borderRadius: number;
      borderColor: string;
      borderWidth: number;
    };
    header: {
      backgroundColor?: string;
      borderColor: string;
      borderWidth: number;
      padding: number;
      minHeight: number;
      titleColor?: string;
      subtitleColor?: string;
    };
    content: {
      backgroundColor?: string;
      padding: number;
    };
    icon: {
      size: number;
      color: string;
    };
    animation: {
      duration: number;
      easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
    };
  };
  alert: {
    padding: number;
    borderRadius: number;
    borderWidth: number;
    iconSize: number;
    type: {
      info: { bg: string; fg: string; border: string };
      success: { bg: string; fg: string; border: string };
      warning: { bg: string; fg: string; border: string };
      error: { bg: string; fg: string; border: string };
    };
  };
  appBar: {
    heights: { small: number; medium: number; large: number };
    paddingX: number;
    action: {
      borderRadius: number;
      spacing: number;
    };
    title: {
      fontSize: number;
      fontWeight: Theme['fontWeight'][keyof Theme['fontWeight']];
    };
    subtitle: {
      fontSize: number;
      opacity: number;
    };
    variants: {
      primary: { background: string; foreground: string; borderColor: string; elevation: number };
      secondary: { background: string; foreground: string; borderColor: string; elevation: number };
      surface: { background: string; foreground: string; borderColor: string; elevation: number };
      elevated: { background: string; foreground: string; borderColor: string; elevation: number };
      transparent: { background: 'transparent'; foreground: string; borderColor: string; elevation: number };
    };
  };
  autocomplete: {
    input: {
      backgroundColor?: string;
      borderColor: string;
      borderWidth: number;
      borderRadius: number;
      padding: number;
      placeholderColor: string;
      textColor: string;
      fontSize: number;
    };
    list: {
      backgroundColor?: string;
      borderRadius: number;
      maxHeight: number;
      borderColor: string;
      borderWidth: number;
    };
    item: {
      padding: number;
      dividerColor: string;
      dividerWidth: number;
      textColor: string;
      fontSize: number;
    };
  };
  avatar: {
    sizes: { xs: number; sm: number; md: number; lg: number; xl: number };
    fontSizes: { xs: number; sm: number; md: number; lg: number; xl: number };
    background: string;
    foreground: string;
    borderWidth: number;
    borderColor: string;
    roundedFactor: number; // divisor used to compute rounded radius
  };
  badge: {
    sizes: {
      small: { height: number; minWidth: number; dot: number; paddingX: number };
      medium: { height: number; minWidth: number; dot: number; paddingX: number };
      large: { height: number; minWidth: number; dot: number; paddingX: number };
    };
    fontSizes: { small: number; medium: number; large: number };
    borderWidth: number;
  };
  button: {
    sizes: {
      small: { minHeight: number; paddingX: number; fontSize: number };
      medium: { minHeight: number; paddingX: number; fontSize: number };
      large: { minHeight: number; paddingX: number; fontSize: number };
    };
    borderRadius: number;
    iconSpacing: number;
    outlinedBorderWidth: number;
    elevated: {
      elevation: number;
      pressedElevation: number;
      shadowColor: string;
      shadowOpacity: number;
      shadowRadius: { default: number; pressed: number };
    };
    tonalOpacity: number; // alpha used for tonal backgrounds when not using container colors
  };
  box: {
    defaults: {
      radius: number; // default radius when radius prop is not provided
      gap: number; // default gap between children
    };
    variants: {
      filled: { backgroundColor: string };
      outlined: { backgroundColor: string; borderColor: string; borderWidth: number };
      tonal: { backgroundColor: string };
      elevated: {
        backgroundColor: string;
        shadow: {
          color: string;
          opacity: number;
          radius: number;
          offsetY: number;
          elevation: number; // Android elevation
        };
      };
    };
    ripple: {
      color: string; // Android ripple color
    };
  };
  buttonGroup: {
    sizes: {
      small: { height: number };
      medium: { height: number };
      large: { height: number };
    };
    item: {
      borderRadius: number;
      flex: number; // flex value for each button
    };
    overlap: {
      horizontal: number; // negative value to overlap borders in horizontal layout
      vertical: number; // negative value to overlap borders in vertical layout
    };
    variants: {
      outlined: {
        background: string;
        selectedBackground: string;
        borderWidth: number;
        borderColor: string;
        selectedBorderColor: string;
      };
      contained: {
        background: string;
        selectedBackground: string;
      };
      text: {
        background: string;
        selectedBackground: string;
      };
    };
  };
  card: {
    sizes: {
      small: { padding: number };
      medium: { padding: number };
      large: { padding: number };
    };
    borderRadius: number;
    disabledOpacity: number;
    variants: {
      elevated: {
        backgroundColor: string;
        shadow: {
          color: string;
          opacity: number;
          radius: number;
          offsetY: number;
          elevation: number;
        };
      };
      outlined: { backgroundColor: string; borderWidth: number; borderColor: string };
      filled: { backgroundColor: string };
      tonal: { backgroundColor: string };
    };
    loadingOverlay: { opacity: number; backgroundColor: string };
    ripple: { color: string };
  };
  checkbox: {
    sizes: {
      small: number;
      medium: number;
      large: number;
    };
    borderRadius: number;
    borderWidth: number;
    disabledOpacity: number;
    variants: {
      filled: {
        backgroundChecked: string;
        backgroundUnchecked: string;
        borderColor: string;
        indicatorColor: string; // typically onPrimary
      };
      outlined: {
        background: string;
        borderColor: string;
        selectedBorderColor: string;
        indicatorColor: string;
      };
      minimal: {
        background: string;
        indicatorColor: string;
      };
    };
    ripple: { color: string };
    animation: { duration: number; easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' };
  };
  chip: {
    sizes: {
      small: { minHeight: number; paddingX: number; fontSize: number; iconSpacing: number };
      medium: { minHeight: number; paddingX: number; fontSize: number; iconSpacing: number };
      large: { minHeight: number; paddingX: number; fontSize: number; iconSpacing: number };
    };
    borderRadius: number;
    borderWidth: number;
    disabledOpacity: number;
    variants: {
      filled: {
        background: string;
        selectedBackground: string;
        text: string;
        selectedText: string;
        borderColor: string;
        selectedBorderColor: string;
      };
      outlined: {
        background: string;
        selectedBackground: string;
        text: string;
        selectedText: string;
        borderColor: string;
        selectedBorderColor: string;
      };
      tonal: {
        background: string;
        selectedBackground: string;
        text: string;
        selectedText: string;
        borderColor: string;
        selectedBorderColor: string;
      };
    };
    ripple: { color: string };
    animation: { pressScale: number };
    close: { hitSlop: number };
  };
  container: {
    breakpoints: { sm: number; md: number; lg: number; xl: number };
    maxWidths: { sm: number; md: number; lg: number; xl: number };
    paddingX: { sm: number; md: number; lg: number };
  };
  dialog: {
    sizes: { small: number; medium: number; large: number };
    minWidth: number;
    overlay: { color: string; opacity: number };
    container: {
      backgroundColor: string;
      borderRadius: number;
      padding: number;
      shadow: { color: string; opacity: number; radius: number; offsetY: number; elevation: number };
    };
    title: { color: string; fontSize: number; fontWeight: Theme['fontWeight'][keyof Theme['fontWeight']]; marginBottom: number };
    animation: { type: 'none' | 'slide' | 'fade' };
  };
  divider: {
    colors: { line: string; text: string; textBackground: string };
    thickness: { hairline: number; thin: number; regular: number; thick: number };
    spacing: { horizontal: number; vertical: number };
    inset: { xs: number; sm: number; md: number; lg: number; xl: number };
    variants: { gradient: { overlayOpacity: number } };
    text: { fontSize: number; fontWeight: Theme['fontWeight'][keyof Theme['fontWeight']]; paddingX: number };
    arrow: { size: number; padding: number };
    animation: { duration: number };
  };
}
