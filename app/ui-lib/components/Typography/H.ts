import { forwardRef } from 'utilities/react';
import { Text } from 'react-native';
import styled, { css } from '../../style/styledComponents';
import { getColor } from '../../utils/styleUtils';
import { baseCss, baseInputCss } from './BaseCss';
import { TextPropTypes } from './typographyTypes';

const colorCss = ({ color, theme }: TextPropTypes) => `
  color: ${getColor(color, theme, theme.colors.text.base)}
`;

export const HCss = css`
  ${baseCss}
  ${colorCss}
`;

export const InputCss = css`
  ${colorCss}
  ${baseInputCss}
`;

const H = styled(Text)<TextPropTypes>`
  ${HCss}
`;

H.defaultProps = {
  weight: 'normal',
  variant: 'h6',
};

export const H1 = forwardRef<TextPropTypes>({ variant: 'h1' })(H);
export const H2 = forwardRef<TextPropTypes>({ variant: 'h2' })(H);
export const H3 = forwardRef<TextPropTypes>({ variant: 'h3' })(H);
export const H4 = forwardRef<TextPropTypes>({ variant: 'h4' })(H);
export const H5 = forwardRef<TextPropTypes>({ variant: 'h5' })(H);
export const H6 = forwardRef<TextPropTypes>({ variant: 'h6' })(H);
