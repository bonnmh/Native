import {NavigationContainer} from '@react-navigation/native';

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {navigationRef} from './navigationService';
import {RootNavigation} from './RootNavigator';

export const AppContainer = () => {
  // render
  return (
    <NavigationContainer ref={navigationRef}>
      <>
        <StatusBar translucent backgroundColor={'transparent'} />
        <RootNavigation token={'token'} />
      </>
    </NavigationContainer>
  );
};
