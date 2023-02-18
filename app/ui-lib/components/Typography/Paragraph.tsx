import { forwardRef } from 'utilities/react';
import { withLayout } from '../../utils/layout';
import { getColor } from '../../utils/styleUtils';
import styled, { css } from '../../style/styledComponents';
import { baseCss } from './BaseCss';
import { TextPropTypes } from './typographyTypes';

const colorCss = ({ color, theme }: TextPropTypes) => `
  color: ${getColor(color, theme, theme.colors.text.paragraph)};
`;

export const ParagraphCss = css`
  ${baseCss}
  ${colorCss}
`;

export const DefaultParagraph = styled.Text<TextPropTypes>`
  ${ParagraphCss}
`;

DefaultParagraph.defaultProps = {
  variant: 'paragraph',
  weight: 'normal',
};

// @ts-ignore
const StyledSmall = styled(DefaultParagraph)<TextPropTypes>`
  line-height: ${props => props.theme.font.baseSize * 2};
`;

const StyledUltraSmall = styled(DefaultParagraph)<TextPropTypes>`
  line-height: ${props => (props.theme.font.baseSize * props.theme.font.fontScale.paragraphUltraSmall)
    + ((props.theme.font.baseSize * props.theme.font.fontScale.paragraphUltraSmall) / 2)}
`;

export const Paragraph = withLayout(forwardRef<TextPropTypes>({ variant: 'paragraph' })(DefaultParagraph));

export const ParagraphSmall = withLayout(forwardRef<TextPropTypes>({ variant: 'paragraphSmall' })(StyledSmall));

export const ParagraphUltraSmall = withLayout(forwardRef<TextPropTypes>({ variant: 'paragraphUltraSmall' })(StyledUltraSmall));
