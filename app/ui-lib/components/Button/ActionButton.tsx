import React, { isValidElement } from 'react';
import { ImageSourcePropType } from 'react-native';
import throttle from 'lodash/throttle';
import isFunction from 'lodash/isFunction';
import styled from 'ui-lib/style/styledComponents';
import { IActionProp } from './buttonTypes';

const backgroundCss = ({ background, disabled, theme }: IActionProp) => `
  background: ${background || theme.colors.button.background[disabled ? 'disabled' : 'tertiary']};
`;

const sizeCss = ({ size, shape, theme }: IActionProp) => `
  height: ${theme.sizes.buttons.action.wrapper[size]};
  width: ${theme.sizes.buttons.action.wrapper[size]};
  borderRadius: ${shape === 'square' ? 4 : (theme.sizes.buttons.action.wrapper[size] / 2)};
`;

const sizeIcon = ({ size, theme }: IActionProp) => `
  height: ${theme.sizes.buttons.action.icon[size]};
  width: ${theme.sizes.buttons.action.icon[size]};
`;

const Button = styled.TouchableOpacity<IActionProp>`
  ${sizeCss};
  ${backgroundCss};
  alignItems: center;
  justifyContent: center;
`;

const Icon = styled.Image<IActionProp>`
  ${sizeIcon};
`;

Icon.defaultProps = {
  size: 'medium',
  icon: {},
};

Button.defaultProps = {
  size: 'medium',
  shape: 'round',
};

export const ActionButton = ({
  icon, style, onPress, ...props
}: IActionProp) => {
  const throttledOnPress = isFunction(onPress) ? throttle(onPress, 1000, {
    leading: true, trailing: false,
  }) : null;
  return (
    <Button style={style} onPress={throttledOnPress} {...props}>
      {isValidElement(icon) ? icon : <Icon source={icon as ImageSourcePropType} />}
    </Button>
  );
};
