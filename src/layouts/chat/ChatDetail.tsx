import React, {FC, useMemo} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {SpacingDefault} from '@themes/spacing';
import {
  Block,
  Screen,
  Text,
  Spacer,
  Button,
  ListView,
  LazyLoadingImage,
  Icon,
} from '@components/index';
import {scale} from '@common/index';
import {images} from '@assets/index';
import {goBack, navigate} from '@navigation/navigationService';
import {APP_SCREEN} from '@navigation/screenTypes';
import {useTheme} from '@themes/index';

const ChatDetail = () => {
  const insets = useSafeAreaInsets();
  const {spacing} = useTheme();

  const _onBack = (): void => {
    goBack();
  };

  //render
  return (
    <Screen unsafe backgroundColor="white">
      <Block block marginTop={insets.top}>
        <Block
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal={spacing.normal}
          borderBottomWidth={StyleSheet.hairlineWidth}
          borderBottomColor="gray"
          paddingBottom={spacing.normal}
        >
          <Icon icon="back" size={spacing.normal} onPress={_onBack} />
          <Text preset="linkLarge" text={'Chats'} />
          <Icon icon="back" color={'white'} />
        </Block>
      </Block>
    </Screen>
  );
};

export default ChatDetail;
