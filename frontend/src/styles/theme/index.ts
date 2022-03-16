import { lighten } from 'polished';

import { COLORS } from "../variables";

export const dark = {
  name: 'dark',
  background: '#333',
  text: COLORS.white,
  header: '#111',
  footer: '#111',
  pageTitle: '#1b1b1b',
  login: {
    background: '#222',
    floating: '#333',
    button: lighten(.22, '#333')
  },
  buttons: {
    primary: '#111',
    secondary: '#111',
    success: '#111',
    error: '#111',
    dark: COLORS.black,
    light: COLORS.white,
  },
  card: {
    backgroundPrimary: '#232323',
    backgroundSecondary: '#333',
  },
  socials: {
    facebook: '#333',
    twitter: '#333',
    instagram: '#333',
  },
  carousel: {
    dots: '#444'
  }
};

export const light = {
  name: 'light',
  background: COLORS.white,
  text: COLORS.black,
  header: lighten(.15, COLORS.purple),
  footer: lighten(.2, COLORS.pinkLight),
  pageTitle: COLORS.purpleLight,
  login: {
    background: lighten(.2, COLORS.purpleLight),
    floating: lighten(.25, COLORS.purpleLight),
    button: lighten(.22, COLORS.purpleLight)
  },
  buttons: {
    primary: COLORS.purpleLight,
    secondary: COLORS.pinkLight,
    success: COLORS.green,
    error: COLORS.red,
    dark: COLORS.black,
    light: lighten(.55, COLORS.gray),
  },
  card: {
    backgroundPrimary: COLORS.white,
    backgroundSecondary: COLORS.white,
  },
  socials: {
    facebook: COLORS.facebook,
    twitter: COLORS.twitter,
    instagram: COLORS.instagram,
  },
  carousel: {
    dots: COLORS.purple
  }
};