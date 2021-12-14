import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {APP_SCREEN, RootStackParamList} from './screenTypes';
import Home from '@layouts/Home';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = ({token}: {token?: string}) => {
  // render
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen
        options={{animationTypeForReplace: 'pop', gestureEnabled: false}}
        name={APP_SCREEN.HOME}
        component={Home}
      />
    </RootStack.Navigator>
  );
};
