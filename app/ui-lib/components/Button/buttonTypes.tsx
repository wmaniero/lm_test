import { ImageSourcePropType } from 'react-native';
import { ITheme } from 'ui-lib/style/styledType';
import { TypographyProp } from 'ui-lib/components/Typography/typographyTypes';
import { ReactElement } from 'react';
import { ViewStyle } from 'types/react';

export type Size = 'extraSmall'
| 'small'
| 'medium'
| 'big'
| 'extraLarge'
| 'extraExtraLarge';

export type Shape = 'square'
| 'round'

export type Variant = 'primary'
| 'secondary'
| 'tertiary'
| 'warning'
| 'danger'
| 'white'
| 'dark'

export type ButtonProp = TypographyProp & {
  background?: string;
  borderRadius?: number;
  width?: number;
  height?: number;
  textAlign?: string;
  margin?: number;
  disabled?: boolean;
  textColor?: string;
  fullWidth?: boolean;
  type?: Variant;
  iconLeft?: ImageSourcePropType | React.ReactElement;
  iconRight?: ImageSourcePropType | React.ReactElement;
  iconRightBackground?: string;
  iconRightBorderRadius?: number;
  iconLeftBackground?: string;
  iconLeftBorderRadius?: number;
  onPress?: (ev: any) => void;
  loading?: boolean;
  style?: ViewStyle;
}

export interface IButtonIconProp {
  iconBackground?: string;
  iconBorderRadius?: number;
}

export interface IActionProp {
  background?: string;
  size?: Size;
  shape?: Shape;
  icon?: ImageSourcePropType | ReactElement;
  theme?: ITheme;
  disabled?: boolean;
  onPress?: (ev: any) => void;
  style?: ViewStyle;
}
