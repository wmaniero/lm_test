/* eslint-disable import/no-named-as-default */
import React from 'react';
import { ThemeProvider as SThemeProvider } from './styledComponents';
import defaultTheme from './defaultTheme';
import { IThemeProvider } from './styledType';

const ThemeProvider = ({ theme, ...props }: IThemeProvider) => (
  <SThemeProvider
    theme={{ ...defaultTheme, ...theme }}
    {...props}
  />
);

export default ThemeProvider;
