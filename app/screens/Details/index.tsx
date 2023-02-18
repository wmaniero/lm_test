import React, {
  useState,
  useMemo,
  useEffect,
} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'ui-lib/style/styledComponents';
import { SCENE_PADDING } from 'ui-lib/utils/deviceSpecs';
import { Hotel } from 'types/Hotel';

const Container = styled(View)`
  flex: 1;
  backgroundColor: #263D4C;
`;

const Content = styled(View)`
  flex: 1;
`;

export const Details = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ Details: { hotel: Hotel } }, 'Details'>>();
  const [hotel, setHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    if (!hotel && route.params?.hotel) {
      setHotel(route.params.hotel);
    }
  }, [hotel, route.params?.hotel]);

  const onGoBack = () => {
    navigation.goBack();
  };

  const content = useMemo(() => {
    if (!hotel) {
      return null;
    }

    return (
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          padding: SCENE_PADDING,
        }}
      >
        <Text>xxx</Text>
      </ScrollView>
    );
  }, [hotel]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
      <Container>
        <Content>
          {content}
        </Content>
      </Container>
    </SafeAreaView>
  );
};
