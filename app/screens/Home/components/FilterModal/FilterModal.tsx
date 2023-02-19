import React, { useState, useCallback } from 'react';
import { ScrollView, InteractionManager } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Modal, Paragraph, CTA } from 'ui-lib';
import { Slider } from '@miblanchard/react-native-slider';

type FilterModalRouteProp = {
  FilterModal: {
    minPrice: number;
    maxPrice: number;
  };
}

export const FilterModal = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<FilterModalRouteProp, 'FilterModal'>>();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [budget, setBudget] = useState<number>(route.params?.minPrice ?? 0);

  const onClose = () => {
    setIsVisible(false);
    return new Promise<void>((resolve) => {
      InteractionManager.runAfterInteractions(() => {
        navigation.goBack();
        resolve();
      });
    });
  };

  const onSave = useCallback(() => {
    console.log('xxx');
  }, []);

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
      <CTA onPress={onSave}>SAVE</CTA>
    </Modal>
  );
};
