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
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withTheme } from 'styled-components';
import styled from 'ui-lib/style/styledComponents';
import { ActivityIndicator } from 'ui-lib/components/ActivityIndicator';
import { SCENE_PADDING } from 'ui-lib/utils/deviceSpecs';
import { Hotel } from 'types/Hotel';
import { FilterItem } from 'types/FilterItem';
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

const LoaderWrapper = styled(View)`
  flex: 1;
  alignContent: center;
  alignItems: center;
  justifyContent: center;
`;

type Props = {
  theme: ITheme;
}

export const Home = withTheme(({ theme }: Props) => {
  const navigation = useNavigation();
  const selectedSortBy = useSelector((store: StoreState) => store.homeReducer.sortBy);
  const selectedFilters = useSelector((store: StoreState) => store.homeReducer.filters);
  const [loading, setLoading] = useState<boolean>(false);
  const [hotels, setHotels] = useState<Hotel[] | []>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[] | []>([]);
  const minPrice = useRef(null);
  const maxPrice = useRef(null);

  useEffect(() => {
    setLoading(true);
    getHotels()
      .then((response) => {
        setHotels(response);
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert('An error occurred', 'Please try again later! error: ', error?.code);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (hotels?.length) {
      const minPriceItem = minBy(hotels, it => it.price);
      const maxPriceItem = maxBy(hotels, it => it.price);
      minPrice.current = minPriceItem.price;
      maxPrice.current = maxPriceItem.price;
    }
  }, [hotels]);

  const getFilteredHotelData = useCallback((budgetFilters) => {
    let nextData = [];

    budgetFilters.forEach((budgetFilter: FilterItem) => {
      budgetFilter.conditions?.forEach((filterCondition) => {
        nextData = hotels.filter((hotel: Hotel) => {
          if (filterCondition.operator === 'LESS_OR_EQUAL'
            && hotel?.[filterCondition.field] <= filterCondition.value
          ) {
            return true;
          }
          return false;
        });
      });
    });
    return nextData;
  }, [hotels]);

  useEffect(() => {
    if (selectedFilters?.length) {
      const budgetFilters = selectedFilters.filter((it: FilterItem) => it.type === 'budget');
      if (budgetFilters?.length) {
        setFilteredHotels(getFilteredHotelData(budgetFilters));
      }
    }
  }, [getFilteredHotelData, selectedFilters]);

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
    const dataSrc = selectedFilters?.length ? filteredHotels : hotels;

    if (selectedSortBy === SortingMethodValues.STARS_DESC) {
      return dataSrc.sort((a: Hotel, b: Hotel) => {
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
      return dataSrc.sort((a: Hotel, b: Hotel) => {
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
      return dataSrc.sort((a: Hotel, b: Hotel) => {
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
      return dataSrc.sort((a: Hotel, b: Hotel) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price >= b.price) {
          return 1;
        }
        return 0;
      });
    }
    return dataSrc;
  }, [selectedFilters?.length, filteredHotels, hotels, selectedSortBy]);

  const content = useMemo(() => {
    if (loading) {
      return (
        <LoaderWrapper>
          <ActivityIndicator size="large" />
        </LoaderWrapper>
      );
    }

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
  }, [getHotelData, hotels?.length, loading, navigation]);

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
});
