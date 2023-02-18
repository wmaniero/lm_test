import React from 'react';
import map from 'lodash/map';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Home, Details } from 'screens';
import { FilterModal } from 'screens/Home/components/FilterModal';
import { SorterModal } from 'screens/Home/components/SorterModal';

const screens = [{
  name: 'Home',
  component: Home,
  options: {},
}, {
  name: 'Details',
  component: Details,
  options: {},
}];

const modals = [{
  name: 'FilterModal',
  component: FilterModal,
  options: {
    cardStyle: {
      backgroundColor: 'transparent',
    },
  },
}, {
  name: 'SorterModal',
  component: SorterModal,
  options: {
    cardStyle: {
      backgroundColor: 'transparent',
    },
  },
}];

const fromElementToScreen = (element, Stack) => <Stack.Screen {...element} key={element.name} />;

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const mainStackScreenOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
};

function MainStackScreen() {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={mainStackScreenOptions}
    >
      {map(screens, element => fromElementToScreen(element, MainStack))}
    </MainStack.Navigator>
  );
}

const rootScreenOptions = {
  headerShown: false,
  cardStyle: {
    opacity: 1,
    cardOverlayEnabled: true,
    backgroundColor: '#ffffff',
  },
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
};

export function RootStackScreen() {
  return (
    <RootStack.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={rootScreenOptions}
    >
      {[
        <RootStack.Screen
          name="MainStack"
          key="MainStack"
          component={MainStackScreen}
        />,
        ...map(modals, element => fromElementToScreen(element, RootStack)),
      ]}
    </RootStack.Navigator>
  );
}
