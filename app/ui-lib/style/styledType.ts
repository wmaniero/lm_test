import { ReactChild } from 'react';
import { IDefaultColors } from './defaultColor';

export interface IColors {
  button: IButtonColor;
  text: ITextColor;
  disabled: string;
  background: string;
}

interface IButtonColor {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    danger: string;
    warning: string;
    disabled: string;
    white: string;
    dark: string;
  };
  label: {
    primary: string;
    secondary: string;
    tertiary: string;
    danger: string;
    warning: string;
    disabled: string;
    white: string;
    dark: string;
  };
}

interface ITextColor {
  base: string;
  baseLight: string;
  subtitle: string;
  subtitleLight: string;
  paragraph: string;
  inverse: string;
  disabled: string;
  placeholder: string;
}

export interface IFontWeights {
  normal: string;
  medium: string;
  bold: string;
}

export interface ITextScale {
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
  paragraph: number;
  paragraphSmall: number;
  paragraphUltraSmall: number;
  [key: string ]: number;
}
export interface IFonts {
  baseSize: number;
  fontFamily: string | IFontWeights;
  fontWeights?: IFontWeights;
  fontScale: ITextScale;
}

export interface ISizeAction {
  extraSmall: number;
  small: number;
  medium: number;
  big: number;
  extraLarge: number;
  [key: string ]: number | undefined;
}

export interface IButtons {
  action: {
    wrapper: ISizeAction;
    icon: ISizeAction;
  };
}

export interface ISizes {
  buttons: IButtons;
}

export interface IThemeProvider {
  theme?: ITheme;
  children?: ReactChild;
}

export type AllColors = IColors & IDefaultColors;

export interface ITheme {
  colors: AllColors;
  font: IFonts;
  sizes: ISizes;
}
