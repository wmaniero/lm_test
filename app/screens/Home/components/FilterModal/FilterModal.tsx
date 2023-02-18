import React, { useState } from 'react';
import { ScrollView, InteractionManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal } from 'ui-lib';
import { Slider } from '@miblanchard/react-native-slider';

export const FilterModal = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const onClose = () => {
    setIsVisible(false);
    return new Promise<void>((resolve) => {
      InteractionManager.runAfterInteractions(() => {
        navigation.goBack();
        resolve();
      });
    });
  };

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
        <Slider
          value={50}
          onValueChange={value => console.log(value)}
        />
      </ScrollView>
    </Modal>
  );
};
