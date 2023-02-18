import React, { memo, useCallback, ReactNode } from 'react';
import { RadioElement } from 'components/RadioElement';
import { H6, ParagraphSmall } from 'ui-lib';
import styled from 'ui-lib/style/styledComponents';
import { ViewStyle } from 'types/react';

type Props = {
  selected: boolean;
  label: string | ReactNode;
  value?: any;
  description?: string;
  onPress: (value?: any) => void;
  hideStatus?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
};

const Container = styled.TouchableOpacity<{ selected: boolean; disabled?: boolean }>`
  border: ${({ theme, selected, disabled }) => (`${disabled ? '0' : '2'}px solid ${selected
    ? theme.colors.primary
    : theme.colors.greyLight
  }`)}}
  backgroundColor: ${({ theme, disabled }) => (disabled ? theme.colors.greyUltraLight : theme.colors.white)};
  borderRadius: 8;
  flexGrow: 1;
  paddingHorizontal: 16;
  paddingVertical: 16;
  justifyContent: center;
`;

const Title = styled(H6)<{ disabled?: boolean }>`
  flex: 1;
  color: ${({ theme, disabled }) => (disabled ? theme.colors.greyMid : theme.colors.text.base)};
`;

const Header = styled.View<{ disabled?: boolean }>`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Content = styled.View<{ disabled?: boolean }>`
  marginTop: 8;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const RadioButton = memo(({
  selected,
  label,
  value,
  onPress,
  description,
  hideStatus,
  style,
  disabled,
}: Props) => {
  const returnValue = useCallback(() => {
    onPress(value);
  }, [onPress, value]);

  const isSelected = selected && !disabled;

  return (
    <Container
      style={style}
      onPress={disabled ? null : returnValue}
      selected={isSelected}
      disabled={disabled}
    >
      <Header>
        {
          React.isValidElement(label)
            ? label
            : (
              <Title
                weight={isSelected ? 'bold' : 'normal'}
                disabled={disabled}
              >
                {label}
              </Title>
            )
        }
        {!hideStatus && <RadioElement selected={isSelected} />}
      </Header>
      {description && (
        <Content>
          <ParagraphSmall>{description}</ParagraphSmall>
        </Content>
      )}
    </Container>
  );
});
