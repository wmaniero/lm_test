import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { ScrollView, InteractionManager } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Modal, Paragraph, CTA } from 'ui-lib';
import { Slider } from '@miblanchard/react-native-slider';
import { setFilters } from 'actions/home';
import { FilterItem } from 'types/FilterItem';
import { StoreState } from 'store/index';
import { LayoutView } from 'components/LayoutView';
import { SCENE_PADDING } from 'ui-lib/utils/deviceSpecs';

type FilterModalRouteProp = {
  FilterModal: {
    minPrice: number;
    maxPrice: number;
  };
}

export const FilterModal = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<FilterModalRouteProp, 'FilterModal'>>();
  const selectedFilters = useSelector((store: StoreState) => store.homeReducer.filters);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [budget, setBudget] = useState<number>(route.params?.minPrice ?? 0);

  const onClose = useCallback(() => {
    setIsVisible(false);
    return new Promise<void>((resolve) => {
      InteractionManager.runAfterInteractions(() => {
        navigation.goBack();
        resolve();
      });
    });
  }, [navigation]);

  const onSave = useCallback(() => {
    dispatch(setFilters([{
      type: 'budget',
      conditions: [{
        field: 'price',
        operator: 'LESS_OR_EQUAL',
        value: budget,
      }],
    }]));
    setTimeout(() => onClose());
  }, [dispatch, budget, onClose]);

  const onReset = useCallback(() => {
    dispatch(setFilters([]));
    setTimeout(() => onClose());
  }, [dispatch, onClose]);

  const getBudgetFilters = useMemo<FilterItem[]>(() => {
    if (selectedFilters?.length) {
      return selectedFilters.filter((it: FilterItem) => it.type === 'budget');
    }
    return [];
  }, [selectedFilters]);

  useEffect(() => {
    if (getBudgetFilters?.length) {
      setBudget(getBudgetFilters[0].conditions[0].value);
    }
  }, [getBudgetFilters]);

  return (
    <Modal
      title="Set filters"
      isVisible={isVisible}
      onClose={onClose}
      propagateSwipe
      hideCloseButton={false}
      swipeDirection="down"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={400}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Paragraph>Your budget (price per night)</Paragraph>
        <Paragraph>{`${budget} €`}</Paragraph>
        <Slider
          minimumValue={route.params?.minPrice}
          maximumValue={route.params?.maxPrice}
          value={budget}
          step={10}
          onValueChange={value => setBudget(value[0])}
        />
      </ScrollView>
      <LayoutView flexDirection="row">
        <CTA onPress={onSave}>SAVE</CTA>
        {selectedFilters?.length ? (
          <>
            <LayoutView width={SCENE_PADDING} backgroundColor="transparent" />
            <CTA type="danger" onPress={onReset}>RESET</CTA>
          </>
        ) : null}
      </LayoutView>
    </Modal>
  );
};
