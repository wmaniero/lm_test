import { ITheme } from '../style/styledType';

export function getColor(color: string, theme: ITheme, defaultColor: string): string {
  return theme.colors[color] || color || defaultColor;
}
