import React, {
  useState, useCallback, memo, useEffect, ReactElement,
} from 'react';
import {
  Platform, Keyboard, AppState,
} from 'react-native';
import isUndefined from 'lodash/isUndefined';
import Modal from 'react-native-modal';
import isNil from 'lodash/isNil';
import { ViewStyle } from 'types/react';
import styled from '../../style/styledComponents';
import {
  BOTTOM_BAR_HEIGHT, WINDOW_HEIGHT, SCENE_PADDING,
} from '../../utils/deviceSpecs';

const CustomModal = styled(Modal).attrs(({ theme }) => ({
  backdropColor: theme.colors.darkMid,
  backdropOpacity: 0.9,
}))`
  justifyContent: flex-end;
  margin: 0;
`;

const MAX_HEIGHT_GAP = 56;

const getCorrectMaxHeight = (keyboardSpace: number) => Platform.select({
  ios: '90%',
  android: String(WINDOW_HEIGHT - MAX_HEIGHT_GAP - keyboardSpace),
});

const Container = styled.View<{ keyboardSpace: number }>`
  backgroundColor: ${({ theme }) => theme.colors.white};
  paddingBottom: ${BOTTOM_BAR_HEIGHT};
  paddingHorizontal: ${SCENE_PADDING};
  borderTopLeftRadius: 24;
  borderTopRightRadius: 24;
  overflow: hidden;
  maxHeight: ${({ keyboardSpace }) => getCorrectMaxHeight(keyboardSpace)};
`;

const NotchContainer = styled.View`
  width: 100%;
  height: 32;
`;

const NotchBar = styled.View`
  width: 48;
  height: 4;
  top: 8;
  alignSelf: center;
  position: absolute;
  borderRadius: 2;
  backgroundColor: ${({ theme }) => theme.colors.disabled};
`;

export type ModalScrollListenerParams = {
  x?: number;
  y?: number;
  animated: boolean;
}

type ModalProps = {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  onBackPressed?: () => void;
  customNotchBar?: ReactElement;
  swipeDirection?: 'up' | 'down';
  propagateSwipe?: boolean;
  customContainerStyle?: ViewStyle;
  hideNotchBar?: boolean;
}

const handleAppStateChange = (nextAppState: string, onClose?: () => void) => {
  if (nextAppState.match(/inactive|background/) && onClose) {
    onClose();
  }
};

const renderNotchBar = (customNotchBar: ReactElement, hideNotchBar: boolean) => {
  if (hideNotchBar) {
    return isNil(customNotchBar) ? null : customNotchBar;
  }

  return isNil(customNotchBar) ? (
    <NotchContainer>
      <NotchBar />
    </NotchContainer>
  ) : customNotchBar;
};

export const BaseModal = memo(({
  children,
  isVisible,
  onClose,
  hideNotchBar,
  onBackPressed,
  customNotchBar,
  propagateSwipe,
  swipeDirection,
  customContainerStyle,
}: ModalProps) => {
  const [keyboardSpace, setKeyboardSpace] = useState(0);
  const handleAppStateChangeCallback = useCallback((nextAppState) => {
    handleAppStateChange(nextAppState, onClose);
  }, [onClose]);
  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', handleAppStateChangeCallback);
    Keyboard.addListener('keyboardDidShow', (frames) => {
      if (!frames.endCoordinates) {
        return;
      }

      setKeyboardSpace(frames.endCoordinates.height);
    });

    const handleKeyboardHidingCallback = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardSpace(0);
      },
    );

    return () => {
      if (appStateListener) {
        appStateListener.remove();
      }
      handleKeyboardHidingCallback.remove();
    };
  }, [handleAppStateChangeCallback]);


  return (
    <CustomModal
      avoidKeyboard
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onBackPressed}
      onSwipeComplete={onClose}
      propagateSwipe={propagateSwipe}
      swipeDirection={isUndefined(swipeDirection) ? 'down' : swipeDirection}
      hideModalContentWhileAnimating
    >
      <Container
        keyboardSpace={keyboardSpace}
        style={customContainerStyle}
      >
        {renderNotchBar(customNotchBar, hideNotchBar)}
        {children}
      </Container>
    </CustomModal>
  );
});

BaseModal.displayName = 'memo(SimpleModal)';
