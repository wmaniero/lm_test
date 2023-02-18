import { ITheme } from './styledType';
import colors from './defaultColor';

const defaultTheme: ITheme = {
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
      baseLight: colors.greyMid,
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
    fontFamily: 'oswald',
    fontWeights: {
      normal: '400',
      medium: '500',
      bold: '700',
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
        },
      },
    },
  },
};

export default defaultTheme;
