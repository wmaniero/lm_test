import React, { useState } from 'react';
import { ScrollView, Text, InteractionManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal } from 'ui-lib';

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
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text>xxxx</Text>
      </ScrollView>
    </Modal>
  );
};
