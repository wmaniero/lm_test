import React from 'react';
import {
  ActivityIndicator as NativeActivityIndicator,
  ActivityIndicatorProps,
} from 'react-native';
import { withTheme } from 'styled-components';
import { ITheme } from 'ui-lib/style/styledType';

type Props = ActivityIndicatorProps & { theme?: ITheme }

const ActivityIndicatorWithTheme = ({
  theme,
  color = theme?.colors.primary,
  ...otherProps
}: Props) => <NativeActivityIndicator color={color} {...otherProps} />;

export const ActivityIndicator = withTheme(ActivityIndicatorWithTheme);
