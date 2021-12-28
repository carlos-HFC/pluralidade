import { lighten } from 'polished';

import { COLORS } from "../variables";

export const dark = {
  background: '#333',
  text: COLORS.white,
  title: 'dark',
  header: '#111',
  footer: '#111',
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
    bgHoverPrimary: '#121212',
    backgroundSecondary: '#232323',
    bgHoverSecondary: '#121212',
    backgroundEvents: '#333',
  },
  facebook: '#333',
  twitter: '#333',
  instagram: '#333',
  titlePage: '#1b1b1b'
};

export const light = {
  background: COLORS.white,
  text: COLORS.black,
  title: 'light',
  header: lighten(.15, COLORS.purple),
  footer: lighten(.2, COLORS.pinkLight),
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
    bgHoverPrimary: COLORS.purpleLight,
    backgroundSecondary: COLORS.white,
    bgHoverSecondary: COLORS.pinkLight,
    backgroundEvents: COLORS.white,
  },
  facebook: COLORS.facebook,
  twitter: COLORS.twitter,
  instagram: COLORS.instagram,
  titlePage: COLORS.purpleLight
};