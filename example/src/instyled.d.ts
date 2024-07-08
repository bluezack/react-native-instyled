import 'react-native-instyled';

declare module 'react-native-instyled' {
  export interface Theme extends DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      placeholderText: string;
    };
    spacing: {
      small: number;
      medium: number;
      large: number;
    };
    typography: {
      fontSize: {
        small: number;
        medium: number;
        large: number;
      };
    };
  }
}
