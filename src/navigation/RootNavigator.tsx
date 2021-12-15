import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { APP_SCREEN, RootStackParamList } from './screenTypes';
import Home from '@layouts/Home';
import Splash from '@layouts/Splash';

const RootStack = createStackNavigator<RootStackParamList>();
const Main = createStackNavigator();

export const MainScreen = () => (
  <Main.Navigator
    initialRouteName={APP_SCREEN.SPLASH}
    screenOptions={{ headerShown: false }}>
    <Main.Screen name={APP_SCREEN.HOME} component={Home} />
    <Main.Screen name={APP_SCREEN.SPLASH} component={Splash} />
  </Main.Navigator>
);


export const RootNavigation = ({ token }: { token?: string }) => {
  // render
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        options={{ animationTypeForReplace: 'pop', gestureEnabled: false }}
        name={APP_SCREEN.HOME}
        component={MainScreen}
      />
    </RootStack.Navigator>
  );
};
