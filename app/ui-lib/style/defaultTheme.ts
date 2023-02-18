import { Platform } from 'react-native';
import { IDefaultColors } from 'ui-lib/style/defaultColor';
import { ITheme } from 'ui-lib/style/styledType';

const colors: IDefaultColors = {
  white: '#FFFFFF',
  primary: '#FEDF78',
  danger: '#F26D63',
  warning: '#FFA15E',
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
        secondary: colors.greyMid,
        tertiary: colors.greyUltraLight,
        danger: colors.danger,
        warning: colors.warning,
        disabled: colors.greyLight,
        white: colors.white,
        dark: colors.darkMid,
      },
      label: {
        primary: colors.white,
        secondary: colors.white,
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
    disabled: colors.greyLight,
    background: colors.greyExtraLight,
    ...colors,
  },
  font: {
    baseSize: 8,
    fontFamily: {
      normal: Platform.OS === 'android' ? 'oswald' : 'Oswald',
      medium: Platform.OS === 'android' ? 'oswald_medium' : 'Oswald-Medium',
      bold: Platform.OS === 'android' ? 'oswald_bold' : 'Oswald-Bold',
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

export default defaultTheme;
