import React, { memo } from 'react';
import styled from 'ui-lib/style/styledComponents';

type Props = {
  selected: boolean;
  disabled?: boolean;
};

const OuterContainer = styled.View<Props>`
  backgroundColor: ${({ theme, selected, disabled }) => {
    if (disabled) {
      return theme.colors.greyUltraLight;
    }
    return selected ? theme.colors.primary : theme.colors.greyLight;
  }}
  width: 16;
  height: 16;
  borderRadius: 8;
  justifyContent: center;
  alignItems: center;
`;

const InnerContainer = styled.View<Props>`
  width: ${({ selected }) => (selected ? '8' : '12')}
  height: ${({ selected }) => (selected ? '8' : '12')}
  borderRadius: ${({ selected }) => (selected ? '4' : '8')}
  backgroundColor: ${({ theme }) => theme.colors.white}
`;

export const RadioElement = memo(({ selected, disabled }: Props) => (
  <OuterContainer selected={selected} disabled={disabled}>
    {!disabled ? <InnerContainer selected={selected} /> : null}
  </OuterContainer>
));
