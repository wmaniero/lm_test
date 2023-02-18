import 'reflect-metadata';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { AppRegistry } from 'react-native';
import AppContainer from './app/AppContainer';
import { name as appName } from './app.json';

enableScreens();
AppRegistry.registerComponent(appName, () => AppContainer);
