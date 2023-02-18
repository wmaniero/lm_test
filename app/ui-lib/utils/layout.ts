import { ComponentType } from 'react';
import { ViewStyle } from 'react-native';
import { StyledComponent } from 'styled-components';
import { ITheme } from '../style/styledType';
import styled, { css } from '../style/styledComponents';

function layoutStyle(props: ViewStyle): any {
  return {
    alignSelf: props.alignSelf,
    flex: props.flex,
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    height: props.height,
    minHeight: props.minHeight,
    maxHeight: props.maxHeight,
    minWidth: props.minWidth,
    maxWidth: props.maxWidth,
    width: props.width,
    margin: props.margin,
    marginBottom: props.marginBottom,
    marginHorizontal: props.marginHorizontal,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    marginTop: props.marginTop,
    marginVertical: props.marginVertical,
    padding: props.padding,
    paddingBottom: props.paddingBottom,
    paddingLeft: props.paddingLeft,
    paddingRight: props.paddingRight,
    paddingTop: props.paddingTop,
    paddingHorizontal: props.paddingHorizontal,
    paddingVertical: props.paddingVertical,
  };
}

export type LayoutComponent<T, P extends ComponentType<T> = ComponentType<T>> =
  StyledComponent<P, ITheme, T & ViewStyle, never>;

export function withLayout<T, P extends ComponentType<T>>(Target: P): LayoutComponent<T, P> {
  return styled(Target) <T & ViewStyle>`${layoutStyle}`;
}

export const layoutCss = css`${layoutStyle}`;
