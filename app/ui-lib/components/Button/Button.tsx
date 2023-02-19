import React, { useMemo } from 'react';
import throttle from 'lodash/throttle';
import styled from '../../style/styledComponents';
import { ParagraphSmall } from '../Typography';

type Kind = 'primary';

type Props = {
  onPress: () => void;
  kind?: Kind;
  children: React.ReactText;
};

const ButtonContainer = styled.TouchableOpacity<{ kind: Kind }>`
  borderRadius: 8;
  alignItems: center;
  justifyContent: center;
  paddingHorizontal: 16;
  maxHeight: 56;
  minHeight: 48;
  backgroundColor: ${({ kind, theme }) => theme.colors.button.background[kind]};
`;

const Label = styled(ParagraphSmall).attrs({ weight: 'bold' })<{ kind: Kind }>`
  textAlign: center;
  marginHorizontal: 12;
  color: ${({ kind, theme }) => theme.colors.button.label[kind]};
`;

export const Button = ({
  onPress,
  kind = 'primary',
  children,
}: Props) => {
  const throttledOnPress = useMemo(
    () => (onPress ? throttle(onPress, 1000, { leading: true, trailing: false }) : null),
    [onPress],
  );

  return (
    <ButtonContainer kind={kind} onPress={throttledOnPress}>
      <Label kind={kind}>
        {children}
      </Label>
    </ButtonContainer>
  );
};
