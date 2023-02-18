import { IDefaultColors } from 'ui-lib/style/defaultColor';
import { ITheme } from 'ui-lib/style/styledType';

const colors: IDefaultColors = {
  white: '#FFFFFF',
  primary: '#21D086',
  primaryMid: '#8AE7A7',
  primaryLight: '#C4F3D3',
  accent: '#FEDF78',
  accentLight: '#FEEDB3',
  danger: '#F26D63',
  dangerLight: '#FFF3F2',
  warning: '#FFA15E',
  warningLight: '#FDE2CF',
  cyano: '#59E1EB',
  cyanoLight: '#CFF6F9',
  violet: '#7A72E1',
  violetLight: '#D8D5F6',
  pink: '#FFBFC5',
  pinkLight: '#FFE5E8',
  dark: '#152129',
  darkMid: '#263D4C',
  grey: '#485F72',
  greyMid: '#7C91A2',
  greyLight: '#CFDBE6',
  greyUltraLight: '#E9EFF5',
  greyExtraLight: '#F4F7FA',
  transparent: 'transparent',
};

export const defaultTheme: ITheme = {
  colors: {
    button: {
      background: {
        primary: colors.primary,
        secondary: colors.white,
        tertiary: colors.greyUltraLight,
        danger: colors.danger,
        warning: colors.warning,
        disabled: colors.greyLight,
        white: colors.white,
        dark: colors.darkMid,
      },
      label: {
        primary: colors.white,
        secondary: colors.greyMid,
        tertiary: colors.greyMid,
        danger: colors.white,
        warning: colors.white,
        disabled: colors.greyMid,
        white: colors.darkMid,
        dark: colors.white,
      },
    },
    text: {
      base: colors.darkMid,
      baseLight: colors.grey,
      subtitle: colors.greyMid,
      subtitleLight: colors.white,
      paragraph: colors.greyMid,
      inverse: colors.white,
      disabled: colors.greyMid,
      placeholder: colors.greyMid,
    },
    progress: {
      background: colors.greyExtraLight,
      foreground: colors.primary,
    },
    disabled: colors.greyLight,
    background: colors.greyExtraLight,
    ...colors,
  },
  font: {
    baseSize: 8,
    fontFamily: {
      normal: 'oswald_regular',
      medium: 'oswald_medium',
      bold: 'oswald_bold',
    },
    fontScale: {
      h1: 6,
      h2: 5,
      h3: 4,
      h4: 3,
      h5: 2.5,
      h6: 2,
      paragraph: 2,
      paragraphSmall: 1.5,
      paragraphUltraSmall: 1.25,
    },
  },
  sizes: {
    buttons: {
      action: {
        wrapper: {
          extraSmall: 24,
          small: 32,
          medium: 40,
          big: 48,
          extraLarge: 56,
          extraExtraLarge: 80,
        },
        icon: {
          extraSmall: 16,
          small: 16,
          medium: 16,
          big: 16,
          extraLarge: 16,
          extraExtraLarge: 16,
        },
      },
    },
  },
};
