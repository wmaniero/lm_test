import React from 'react';
import {
  Image as RNImage,
  TouchableOpacity,
} from 'react-native';
import styled from 'ui-lib/style/styledComponents';
import { withTheme } from 'styled-components';
import { ITheme } from 'ui-lib/style/styledType';
import { Paragraph } from 'ui-lib';
import { Hotel } from 'types/Hotel';
import { LayoutView } from 'components/LayoutView';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StarRating } from '../StarRating';

type Props = {
  item: Hotel;
  onPress: () => void;
};

const Image = styled(RNImage)`
  width: 120;
  height: 100%;
`;

const Location = styled(Paragraph)`
  flex: 1;
`;

const Price = styled(Paragraph)`
  fontSize: 18;
`;

export const HotelRow = withTheme(({
  theme,
  item,
  onPress,
}: Props & { theme?: ITheme }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      minHeight: 150,
      backgroundColor: 'white',
      borderRadius: 10,
      marginBottom: 10,
      flexDirection: 'row',
      overflow: 'hidden',
      elevation: 1,
    }}
  >
    <Image source={{ uri: item.gallery?.[0] }} />
    <LayoutView
      flex={1}
      flexDirection="column"
    >
      <LayoutView
        flex={1}
        borderTopRightRadius={10}
        paddingTop={10}
        paddingHorizontal={6}
      >
        <Paragraph weight="bold" color={theme.colors.darkMid}>{item.name}</Paragraph>
        <StarRating
          totalStars={5}
          stars={item.stars}
          style={{
            paddingTop: 6,
          }}
        />
        <LayoutView
          flexDirection="row"
          alignItems="center"
          paddingTop={6}
        >
          <Icon
            name="map-marker"
            size={22}
            color="#485F72"
            style={{
              paddingHorizontal: 6,
            }}
          />
          <Location color={theme.colors.darkMid}>{`${item.location.city} • ${item.location.address}`}</Location>
        </LayoutView>
      </LayoutView>
      <LayoutView
        alignItems="flex-end"
        justifyContent="flex-end"
        paddingRight={10}
        paddingBottom={10}
      >
        <Price weight="bold" color={theme.colors.darkMid}>{`${item.price} ${item.currency}`}</Price>
      </LayoutView>
    </LayoutView>
  </TouchableOpacity>
));
