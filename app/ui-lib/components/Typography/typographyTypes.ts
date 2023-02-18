import { TextProps } from 'react-native';
import { Ref } from 'react';
import { ITheme, IFontWeights } from '../../style/styledType';

export type TextScale = 'h1'
| 'h2'
| 'h3'
| 'h4'
| 'h5'
| 'h6'
| 'paragraph'
| 'paragraphSmall'
| 'paragraphUltraSmall'

export type TypographyProp = {
  weight?: keyof IFontWeights;
  fontFamily?: string | IFontWeights;
  fontSize?: number;
  fontScale?: number;
  color?: string;
  variant?: TextScale;
  lineHeight?: number;
  theme?: ITheme;
  children?: string | React.ReactNode;
  numberOfLines?: number;
  ref?: Ref<any>;
  ellipsizeMode?: 'head' | 'clip' | 'middle' | 'tail';
};

export type TextPropTypes = Exclude<TypographyProp & TextProps, 'onPress'>;
