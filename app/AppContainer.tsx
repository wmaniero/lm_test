import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { ContainerContext, container } from 'core/ioc/ContainerContext';
import { store } from 'store';
import './services/api';
import { ThemeProvider } from 'ui-lib';
import { defaultTheme } from 'config/styles/defaultTheme';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackScreen } from './Navigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function AppContainer() {
  return (
    <View style={styles.container}>
      <ContainerContext.Provider value={container}>
        <Provider store={store}>
          <ThemeProvider theme={defaultTheme}>
            <NavigationContainer>
              <RootStackScreen />
            </NavigationContainer>
          </ThemeProvider>
        </Provider>
      </ContainerContext.Provider>
    </View>
  );
}
