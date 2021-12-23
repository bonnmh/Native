import {NavigationContainer} from '@react-navigation/native';

import React, {useEffect} from 'react';
import {ActivityIndicator, StatusBar} from 'react-native';
import {MyAppTheme} from '@themes/index';

import {navigationRef} from './navigationService';
import {RootNavigation} from './RootNavigator';
import {PortalHost, ProgressDialog} from '@components/index';

export const AppContainer = () => {
  // render
  return (
    <NavigationContainer ref={navigationRef} theme={MyAppTheme['default']}>
      <>
        <StatusBar translucent backgroundColor={'transparent'} />
        <PortalHost name={'AppModal'} />
        <ProgressDialog />

        <RootNavigation />
      </>
    </NavigationContainer>
  );
};
