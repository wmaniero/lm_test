import React, { useState, useCallback } from 'react';
import { ScrollView, InteractionManager, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'store';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'components/RadioButton';
import { Modal } from 'ui-lib';
import { setSortBy } from 'actions/index';

const styles = StyleSheet.create({
  radioButton: {
    flexGrow: 0,
    minHeight: 56,
    marginBottom: 16,
  },
});

export enum SortingMethodValues {
  STARS_DESC = 'STARS_DESC',
  STARS_ASC = 'STARS_ASC',
  PRICE_DESC = 'PRICE_DESC',
  PRICE_ASC = 'PRICE_ASC',
}

const SortingMethods = [{
  label: 'Stars: High to low',
  value: SortingMethodValues.STARS_DESC,
}, {
  label: 'Stars: Low to high',
  value: SortingMethodValues.STARS_ASC,
}, {
  label: 'Price: High to low',
  value: SortingMethodValues.PRICE_DESC,
}, {
  label: 'Price: Low to high',
  value: SortingMethodValues.PRICE_ASC,
}];

export const SorterModal = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedSortBy = useSelector((store: StoreState) => store.homeReducer.sortBy);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const onClose = useCallback(() => {
    setIsVisible(false);
    return new Promise<void>((resolve) => {
      InteractionManager.runAfterInteractions(() => {
        navigation.goBack();
        resolve();
      });
    });
  }, [navigation]);

  const onChange = useCallback((value) => {
    dispatch(setSortBy(value));
    setTimeout(() => onClose());
  }, [dispatch, onClose]);

  return (
    <Modal
      title="Sort By"
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
        {SortingMethods.map(sortingMethod => (
          <RadioButton
            key={sortingMethod.value}
            label={sortingMethod.label}
            style={styles.radioButton}
            onPress={onChange}
            value={sortingMethod.value}
            selected={sortingMethod.value === selectedSortBy}
          />
        ))}
      </ScrollView>
    </Modal>
  );
};
