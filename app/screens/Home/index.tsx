import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import styled from 'ui-lib/style/styledComponents';
import { SCENE_PADDING } from 'ui-lib/utils/deviceSpecs';
import { Hotel } from 'types/Hotel';
import { ITheme } from 'ui-lib/style/styledType';
import { minBy, maxBy } from 'lodash';
import { getHotels } from './actions/getHotels';
import { ActionBar } from './components/ActionBar';
import { HotelRow } from './components/HotelRow';
import { SortingMethodValues } from './components/SorterModal';

const Container = styled(View)`
  flex: 1;
  backgroundColor: ${({ theme }) => theme.colors.darkMid};
`;

const Content = styled(View)`
  flex: 1;
`;

type Props = {
  theme: ITheme;
}

const Home = ({ theme }: Props) => {
  const navigation = useNavigation();
  const selectedSortBy = useSelector((store: StoreState) => store.homeReducer.sortBy);
  const [hotels, setHotels] = useState<Hotel[] | []>([]);
  const minPrice = useRef(null);
  const maxPrice = useRef(null);

  useEffect(() => {
    getHotels()
      .then(response => setHotels(response))
      .catch(error => console.error('[getHotels] error', error));
  }, []);

  useEffect(() => {
    if (hotels?.length) {
      const minPriceItem = minBy(hotels, it => it.price);
      const maxPriceItem = maxBy(hotels, it => it.price);
      minPrice.current = minPriceItem.price;
      maxPrice.current = maxPriceItem.price;
    }
  }, [hotels]);

  const onFiltersPress = () => {
    navigation.navigate('FilterModal', {
      minPrice: minPrice.current,
      maxPrice: maxPrice.current,
    });
  };

  const onSortersPress = () => {
    navigation.navigate('SorterModal');
  };

  const getHotelData = useCallback(() => {
    if (selectedSortBy === SortingMethodValues.STARS_DESC) {
      return hotels.sort((a: Hotel, b: Hotel) => {
        if (a.stars < b.stars) {
          return 1;
        }
        if (a.stars >= b.stars) {
          return -1;
        }
        return 0;
      });
    }

    if (selectedSortBy === SortingMethodValues.STARS_ASC) {
      return hotels.sort((a: Hotel, b: Hotel) => {
        if (a.stars < b.stars) {
          return -1;
        }
        if (a.stars >= b.stars) {
          return 1;
        }
        return 0;
      });
    }

    if (selectedSortBy === SortingMethodValues.PRICE_DESC) {
      return hotels.sort((a: Hotel, b: Hotel) => {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price >= b.price) {
          return -1;
        }
        return 0;
      });
    }

    if (selectedSortBy === SortingMethodValues.PRICE_ASC) {
      return hotels.sort((a: Hotel, b: Hotel) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price >= b.price) {
          return 1;
        }
        return 0;
      });
    }
    return hotels;
  }, [selectedSortBy, hotels]);

  const content = useMemo(() => {
    if (!hotels?.length) {
      return null;
    }

    const goToDetails = (hotel) => {
      navigation.navigate('Details', {
        hotel,
      });
    };

    return (
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          padding: SCENE_PADDING,
        }}
      >
        {getHotelData().map((hotel: Hotel) => (
          <HotelRow
            key={hotel.id}
            item={hotel}
            onPress={() => goToDetails(hotel)}
          />
        ))}
      </ScrollView>
    );
  }, [getHotelData, hotels?.length, navigation]);

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
      }}
    >
      <Container>
        <ActionBar
          onFiltersPress={onFiltersPress}
          onSortersPress={onSortersPress}
        />
        <Content>
          {content}
        </Content>
      </Container>
    </SafeAreaView>
  );
};

const ComposedHome: typeof Home = compose(withTheme)(Home);
export { ComposedHome as Home };
