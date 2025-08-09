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
}
