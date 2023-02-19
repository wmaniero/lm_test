import React, { isValidElement } from 'react';
import { withTheme } from 'styled-components';
import { ImageSourcePropType } from 'react-native';
import throttle from 'lodash/throttle';
import isFunction from 'lodash/isFunction';
import styled from '../../style/styledComponents';
import { ButtonProp, Variant, IButtonIconProp } from './buttonTypes';
import { ParagraphSmall } from '../Typography';
import { ActivityIndicator } from '../ActivityIndicator';
import { ITheme } from '../../style/styledType';

const borderStyle = (theme: ITheme) => `
    borderWidth: 2;
    borderColor: ${theme.colors.greyUltraLight};
`;

const backgroundCss = ({
  background, disabled, type, theme,
}: ButtonProp) => `
  background: ${background
  || (disabled && theme.colors.button.background.disabled)
  || theme.colors.button.background[type]};
  ${type === 'secondary' && borderStyle(theme)}
`;

const colorCss = ({
  color, disabled, type, theme,
}: ButtonProp) => {
  let themeColor = color;
  if (!themeColor) {
    if (disabled) {
      themeColor = theme.colors.button.label.disabled;
    } else {
      themeColor = theme.colors.button.label[type];
    }
  }
  return `color: ${themeColor}`;
};

const Button = styled.TouchableOpacity<ButtonProp>`
  ${backgroundCss};
  flex-direction: row;
  border-radius: ${props => props.borderRadius};
  align-items: center;
  justify-content: center;
  padding-horizontal: 16;
  flexGrow: 1;
  flexShrink: 1;
  max-height: 56;
  min-height: 48;
`;

const Label = styled(ParagraphSmall) <ButtonProp>`
  text-align: ${props => props.textAlign};
  margin-horizontal: ${props => props.margin};
  flex: 1;
  ${colorCss};
`;

const Icon = styled.Image<IButtonIconProp>`
  width: 24;
  height: 24;
  background: ${props => props.iconBackground};
  border-radius: ${props => props.iconBorderRadius};
  justify-content: center;
  align-items: center;
`;

const defaultVariant: Variant = 'primary';

Button.defaultProps = {
  borderRadius: 8,
  type: defaultVariant,
};

Label.defaultProps = {
  type: defaultVariant,
  textAlign: 'center',
  margin: 0,
};

Icon.defaultProps = {
  iconBackground: 'transparent',
  iconBorderRadius: 0,
};

export type CTAProps = ButtonProp & { theme?: ITheme };

export const CTA = withTheme(({
  children,
  iconLeft,
  iconRight,
  iconRightBackground,
  iconRightBorderRadius,
  iconLeftBackground,
  iconLeftBorderRadius,
  theme,
  ...props
}: CTAProps) => {
  const {
    onPress,
    loading,
    disabled,
    ...labelProps
  } = props;
  const throttledOnPress = isFunction(onPress) ? throttle(onPress, 1000, {
    leading: true, trailing: false,
  }) : null;
  return (
    <Button {...props} onPress={throttledOnPress} disabled={loading || disabled}>
      {
        iconLeft && (
          isValidElement(iconLeft)
            ? iconLeft
            : (
              <Icon
                source={iconLeft as ImageSourcePropType}
                iconBackground={iconLeftBackground}
                iconBorderRadius={iconLeftBorderRadius}
              />
            )
        )
      }
      {!loading ? (
        <Label
          weight="bold"
          textAlign={(iconRight || iconLeft) && 'left'}
          margin={(iconRight || iconLeft) && 12}
          {...labelProps}
          disabled={disabled}
        >
          {children}
        </Label>
      ) : <ActivityIndicator size="small" color={theme.colors.greyMid} />}
      {
        iconRight && (
          isValidElement(iconRight)
            ? iconRight
            : (
              <Icon
                source={iconRight as ImageSourcePropType}
                iconBackground={iconRightBackground}
                iconBorderRadius={iconRightBorderRadius}
              />
            )
        )
      }
    </Button>
  );
});
