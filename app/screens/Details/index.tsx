import React, {
  useState,
  useMemo,
  useEffect,
} from 'react';
import {
  View,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withTheme } from 'styled-components';
import styled from 'ui-lib/style/styledComponents';
import { SCENE_PADDING } from 'ui-lib/utils/deviceSpecs';
import { ITheme } from 'ui-lib/style/styledType';
import { Hotel } from 'types/Hotel';
import { Paragraph } from 'ui-lib/index';
import { LayoutView } from 'components/LayoutView';
import Carousel from 'react-native-reanimated-carousel';

const Container = styled(View)`
  flex: 1;
  backgroundColor: ${({ theme }) => theme.colors.darkMid};
`;

const Content = styled(View)`
  flex: 1;
`;

type GalleryImageProps = {
  source: string;
}

const GalleryImage = ({ source }: GalleryImageProps) => (
  <LayoutView flex={1} justifyContent="center" alignContent="center">
    <Image source={{ uri: source }} style={{ flex: 1 }} resizeMode="cover" />
  </LayoutView>
);

type Props = {
  theme: ITheme;
}

export const Details = withTheme(({ theme }: Props) => {
  const { width } = useWindowDimensions();
  const route = useRoute<RouteProp<{ Details: { hotel: Hotel } }, 'Details'>>();
  const [hotel, setHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    if (!hotel && route.params?.hotel) {
      setHotel(route.params.hotel);
    }
  }, [hotel, route.params?.hotel]);

  const content = useMemo(() => {
    if (!hotel) {
      return null;
    }

    const galleryImages = hotel?.gallery ?? [];

    return (
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.primary,
        }}
      >
        {galleryImages?.length ? (
          <Carousel
            loop
            autoPlay
            autoPlayInterval={3000}
            width={width}
            height={width / 2}
            data={galleryImages}
            scrollAnimationDuration={600}
            renderItem={({ item }) => <GalleryImage source={item} />}
          />
        ) : null}
        <LayoutView padding={SCENE_PADDING}>
          <Paragraph weight="medium" color={theme.colors.darkMid}>{hotel.name}</Paragraph>
        </LayoutView>
        <LayoutView padding={SCENE_PADDING}>
          <Paragraph weight="medium" color={theme.colors.darkMid}>Contacts</Paragraph>
          <LayoutView
            height={2}
            backgroundColor={theme.colors.grey}
            marginVertical={10}
          />
          <Paragraph color={theme.colors.darkMid}>{`Email: ${hotel.contact.email}`}</Paragraph>
          <Paragraph color={theme.colors.darkMid}>{`Phone number: ${hotel.contact.phoneNumber}`}</Paragraph>
        </LayoutView>
        <LayoutView padding={SCENE_PADDING}>
          <Paragraph weight="medium" color={theme.colors.darkMid}>Check-in / Check-out details</Paragraph>
          <LayoutView
            height={2}
            backgroundColor={theme.colors.grey}
            marginVertical={10}
          />
          <Paragraph color={theme.colors.darkMid}>{`Check-In Hours: ${hotel.checkIn.from} - ${hotel.checkIn.to}`}</Paragraph>
          <Paragraph color={theme.colors.darkMid}>{`Check-Out Hours: ${hotel.checkOut.from} - ${hotel.checkOut.to}`}</Paragraph>
        </LayoutView>
      </ScrollView>
    );
  }, [hotel, theme.colors.darkMid, theme.colors.grey, theme.colors.primary, width]);

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
      }}
    >
      <Container>
        <Content>
          {content}
        </Content>
      </Container>
    </SafeAreaView>
  );
});
