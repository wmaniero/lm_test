import React from 'react';
import { ViewStyle } from 'react-native';
import { LayoutView } from 'components/LayoutView';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  totalStars: number;
  stars: number;
  style?: ViewStyle;
};

export const StarRating = ({ totalStars, stars, style }: Props) => {
  const nodes = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < totalStars; i++) {
    nodes.push(
      <Icon
        key={`star[${i}]`}
        name="star"
        size={15}
        color={(i < stars) ? '#FFA15E' : '#F4F7FA'}
        style={{
          marginLeft: (i === 0) ? 0 : 3,
        }}
      />,
    );
  }
  return (
    <LayoutView
      flexDirection="row"
      style={style}
    >
      {nodes}
    </LayoutView>
  );
};
