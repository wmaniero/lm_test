import React, {
  useState, useCallback, memo, useEffect, ReactElement,
} from 'react';
import { Platform, Keyboard, AppState } from 'react-native';
import { ActionButton } from 'ui-lib/components/Button';
import isUndefined from 'lodash/isUndefined';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import isNil from 'lodash/isNil';
import styled from '../../style/styledComponents';
import { H4 } from '../Typography';
import {
  isIphoneX, BOTTOM_BAR_HEIGHT, WINDOW_HEIGHT, SCENE_PADDING,
} from '../../utils/deviceSpecs';

const CustomModal = styled(Modal).attrs(({ theme }) => ({
  backdropColor: theme.colors.darkMid,
  backdropOpacity: 0.9,
  backdropTransitionOutTiming: 0,
}))`
  justifyContent: flex-end;
  margin: 0;
`;

const MAX_HEIGHT_GAP = 56;
const MAX_HEIGHT_GAP_FOOTER = MAX_HEIGHT_GAP + 64;

type ContainerProps = {
  paddingHorizontal?: number;
  removeBottomPadding?: boolean;
  removeContentPadding?: boolean;
  backgroundColor?: string;
  hasFooter?: boolean;
}

const getCorrectPaddingBottom = (removePadding = false) => {
  if (isIphoneX) {
    return removePadding ? 0 : BOTTOM_BAR_HEIGHT;
  }
  return removePadding ? 0 : 32;
};

const getCorrectMaxHeight = (hasFooter, keyboardSpace) => Platform.select({
  ios: hasFooter ? '80%' : '90%',
  android: String(
    WINDOW_HEIGHT - (hasFooter ? MAX_HEIGHT_GAP_FOOTER : MAX_HEIGHT_GAP) - keyboardSpace,
  ),
});

const Container = styled.View<ContainerProps & { keyboardSpace: number }>`
  backgroundColor: ${({ theme, backgroundColor }) => (isNil(backgroundColor) ? theme.colors.white : backgroundColor)};
  paddingBottom: ${({ removeBottomPadding }) => getCorrectPaddingBottom(removeBottomPadding)};
  paddingHorizontal: ${({ paddingHorizontal }) => (isNil(paddingHorizontal) ? SCENE_PADDING : paddingHorizontal)};
  borderTopLeftRadius: 24;
  borderTopRightRadius: 24;
  overflow: hidden;
  maxHeight: ${({ hasFooter, keyboardSpace }) => getCorrectMaxHeight(hasFooter, keyboardSpace)};
`;

const ContentContainer = styled.View<ContainerProps>`
  marginHorizontal: ${({ removeContentPadding }) => (removeContentPadding ? -SCENE_PADDING : 0)}
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

const TopBar = styled.View<ContainerProps>`
  flexDirection: row;
  justifyContent: space-between;
  marginBottom: 16;
`;

const TopBarTitle = styled(H4).attrs({
  weight: 'bold',
})`
  flex: 1;
  paddingRight: 8;
`;

export type ModalScrollListenerParams = {
  x?: number;
  y?: number;
  animated: boolean;
}

export type ModalProps = {
  children: React.ReactNode;
  Footer?: React.ReactNode;
  title?: string | JSX.Element;
  isVisible: boolean;
  onClose: () => void;
  onBackPressed?: () => void;
  customNotchBar?: ReactElement;
  backgroundColor?: string;
  swipeDirection?: 'up' | 'down' | null;
  propagateSwipe?: boolean;
  hideCloseButton?: boolean;
  hideTitle?: boolean;
  onModalHide?: () => void;
}

export type ModalWithContainerProps = ModalProps & ContainerProps;

const handleAppStateChange = (nextAppState: string, onClose?: () => void) => {
  if (nextAppState.match(/inactive|background/) && onClose) {
    onClose();
  }
};

export const ModalComponent = memo(({
  children,
  Footer,
  title,
  isVisible,
  hideTitle,
  onClose,
  onBackPressed,
  customNotchBar,
  paddingHorizontal,
  removeBottomPadding,
  backgroundColor,
  removeContentPadding,
  propagateSwipe,
  swipeDirection,
  hideCloseButton,
  onModalHide,
}: ModalWithContainerProps) => {
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
      handleKeyboardHidingCallback.remove();

      if (appStateListener) {
        appStateListener.remove();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleAppStateChangeCallback]);


  return (
    <CustomModal
      avoidKeyboard
      isVisible={isVisible}
      onModalHide={onModalHide}
      onBackdropPress={onClose}
      onBackButtonPress={onBackPressed}
      onSwipeComplete={onClose}
      propagateSwipe={propagateSwipe}
      swipeDirection={isUndefined(swipeDirection) ? 'down' : swipeDirection}
    >
      <Container
        paddingHorizontal={paddingHorizontal}
        removeBottomPadding={removeBottomPadding}
        backgroundColor={backgroundColor}
        keyboardSpace={keyboardSpace}
        hasFooter={Boolean(Footer)}
      >
        {isNil(customNotchBar)
          ? (
            <NotchContainer>
              <NotchBar />
            </NotchContainer>
          ) : customNotchBar
        }
        {(!hideTitle && (title || propagateSwipe)) && (
          <TopBar>
            { React.isValidElement(title)
              ? title
              : <TopBarTitle>{title}</TopBarTitle>}
            {propagateSwipe && !hideCloseButton && (
              <ActionButton
                onPress={onClose}
                icon={<Icon name="times" color="black" size={20} />}
              />
            )}
          </TopBar>
        )}
        <ContentContainer removeContentPadding={removeContentPadding}>
          {children}
        </ContentContainer>
      </Container>
      {Footer}
    </CustomModal>
  );
});

ModalComponent.displayName = 'memo(ModalComponent)';
