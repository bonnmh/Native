import { NavigationContainer } from '@react-navigation/native';

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { MyAppTheme } from '@themes/index';

import { navigationRef } from './navigationService';
import { RootNavigation } from './RootNavigator';

export const AppContainer = () => {
  // render
  return (
    <NavigationContainer ref={navigationRef} theme={MyAppTheme['default']}>
      <>
        <StatusBar translucent backgroundColor={'transparent'} />
        <RootNavigation />
      </>
    </NavigationContainer>
  );
};
