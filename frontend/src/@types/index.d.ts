import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    text: string;
    header: string;
    footer: string;
    title: string;
    login: {
      background: string;
      floating: string;
      button: string;
    };
    buttons: {
      primary: string;
      secondary: string;
      success: string;
      error: string;
      dark: string;
      light: string;
    };
    card: {
      backgroundEvents: string;
      backgroundPrimary: string;
      bgHoverPrimary: string;
      backgroundSecondary: string;
      bgHoverSecondary: string;
    };
    facebook: string;
    twitter: string;
    instagram: string;
    titlePage: string;
  }
}