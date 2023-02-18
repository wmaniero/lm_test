import { TypographyProp } from './typographyTypes';
import { isFamilyObject } from './util';
import { css } from '../../style/styledComponents';

const fontFamilyCss = ({ theme, weight, fontFamily = theme.font.fontFamily }: TypographyProp) => `
    font-family: ${isFamilyObject(fontFamily) ? fontFamily[weight] : fontFamily};
`;

const fontWeightCss = ({ weight, theme: { font: { fontWeights } } }: TypographyProp) => (
  !fontWeights || !fontWeights[weight] ? null : `font-weight: ${fontWeights[weight]};`
);

const fontSizeCss = ({ variant, theme }: TypographyProp) => `
  font-size: ${theme.font.baseSize * theme.font.fontScale[variant]};
`;

const lineHeightCss = ({ lineHeight, variant, theme }: TypographyProp) => `
  line-height: ${lineHeight || ((theme.font.baseSize * theme.font.fontScale[variant]) + theme.font.baseSize)};
`;

export const baseCss = css`
  ${fontFamilyCss};
  ${fontWeightCss};
  ${lineHeightCss};
  ${fontSizeCss};
`;

export const baseInputCss = css`
  ${fontFamilyCss};
  ${fontSizeCss};
  ${fontWeightCss};
`;
