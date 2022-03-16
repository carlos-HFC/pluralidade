import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    background: string;
    text: string;
    pageTitle: string;
    header: string;
    footer: string;
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
      backgroundPrimary: string;
      backgroundSecondary: string;
    };
    socials: {
      facebook: string;
      twitter: string;
      instagram: string;
    };
    carousel: {
      dots: string;
    };
  }
}

export interface Courses {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  initDate: string;
  endDate: string;
  pcd: boolean;
  spots: number;
  period: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface Events {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}