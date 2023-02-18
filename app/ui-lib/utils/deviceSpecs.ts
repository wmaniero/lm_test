import DeviceInfo from 'react-native-device-info';
import { Platform, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const isIphoneX: boolean = DeviceInfo.hasNotch() && Platform.OS === 'ios';
export const hasDynamicIsland: boolean = DeviceInfo.hasDynamicIsland() && Platform.OS === 'ios';
export const BOTTOM_BAR_HEIGHT: number = isIphoneX ? 34 : 0;
export const WINDOW_WIDTH: number = Dimensions.get('window').width;
export const WINDOW_HEIGHT: number = Dimensions.get('window').height;
export const IS_SMALL_DEVICE = WINDOW_WIDTH <= 320;
export const STATUS_BAR_HEIGHT: number = getStatusBarHeight();
export const SCENE_PADDING: number = IS_SMALL_DEVICE ? 10 : 20;
