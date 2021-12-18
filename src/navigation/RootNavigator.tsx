import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { APP_SCREEN, RootStackParamList } from './screenTypes';
import Home from '@layouts/Home';
import Splash from '@layouts/Splash';
import { Welcome } from '@layouts/welcome';
import { Login } from '@layouts/login';

const RootStack = createStackNavigator<RootStackParamList>();
const Main = createStackNavigator();

export const MainScreen = () => (
  <Main.Navigator
    initialRouteName={APP_SCREEN.WELCOME}
    screenOptions={{ headerShown: false }}>
    <Main.Screen name={APP_SCREEN.HOME} component={Home} />
    <Main.Screen name={APP_SCREEN.WELCOME} component={Welcome} />
    <Main.Screen name={APP_SCREEN.SPLASH} component={Splash} />
    <Main.Screen name={APP_SCREEN.LOGIN} component={Login} />
  </Main.Navigator>
);


export const RootNavigation = () => {
  // render
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        options={{ animationTypeForReplace: 'pop', gestureEnabled: false }}
        name={APP_SCREEN.HOME_STACK}
        component={MainScreen}
      />
    </RootStack.Navigator>
  );
};
