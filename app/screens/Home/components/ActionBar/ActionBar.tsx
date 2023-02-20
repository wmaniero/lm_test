import React, { useMemo } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import styled from 'ui-lib/style/styledComponents';
import { Paragraph } from 'ui-lib';
import { LayoutView } from 'components/LayoutView';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  onFiltersPress?: () => void;
  onSortersPress?: () => void;
}

const ActionsWrapper = styled(View)`
  height: 50;
  backgroundColor: ${({ theme }) => theme.colors.primary};
  flexDirection: row;
  shadowColor: black;
  shadowOffset: 0px 10px;
  shadowOpacity: 0.4;
  shadowRadius: 6;
  zIndex: 1;
  elevation: 1;
`;

const ActionButtonWrapper = styled(TouchableOpacity)`
  flex: 1;
  flexDirection: row;
  alignContent: center;
  alignItems: center;
  justifyContent: center;
`;

const ActionText = styled(Paragraph).attrs({
  color: 'darkMid',
})`
  fontWeight: bold;
`;

type ActionButtonProps = {
  icon: string;
  label: string;
  onPress: () => void;
};

const ActionButton = ({ icon, label, onPress }: ActionButtonProps) => (
  <ActionButtonWrapper onPress={onPress}>
    <Icon
      name={icon}
      size={22}
      color="#263D4C"
      style={{
        margin: 6,
      }}
    />
    <ActionText>{label}</ActionText>
  </ActionButtonWrapper>
);

export const ActionBar = ({ onFiltersPress, onSortersPress }: Props) => {
  const renderSeparator = useMemo(() => {
    if (onFiltersPress && onSortersPress) {
      return (
        <LayoutView
          width={1.5}
          height={30}
          backgroundColor="#263D4C"
          alignSelf="center"
        />
      );
    }
    return null;
  }, [onFiltersPress, onSortersPress]);

  return (
    <ActionsWrapper>
      {!onFiltersPress ? null : <ActionButton icon="filter" label="Filter" onPress={onFiltersPress} />}
      {renderSeparator}
      {!onSortersPress ? null : <ActionButton icon="sort" label="Sort By" onPress={onSortersPress} />}
    </ActionsWrapper>
  );
};
