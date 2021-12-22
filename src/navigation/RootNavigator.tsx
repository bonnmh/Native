import React from 'react';
import {Animated} from 'react-native';
import {
  createStackNavigator,
  StackCardStyleInterpolator,
  TransitionSpecs,
} from '@react-navigation/stack';

import {APP_SCREEN, RootStackParamList} from './screenTypes';
import Home from '@layouts/Home';
import Splash from '@layouts/Splash';
import {Welcome} from '@layouts/welcome';
import {Login} from '@layouts/login';
import {Register, RegisterStepTwo} from '@layouts/register';
import {Discover} from '@layouts/discover';
import {
  BottomNavigation,
  DiscoverNavigation,
  SharedNavigation,
} from './BottomNaivgation';
import {CameraRoll} from '@layouts/camera-roll';
// import { forFade } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/HeaderStyleInterpolators';
import {forFade} from './Interpolator';

const RootStack = createStackNavigator<RootStackParamList>();
const Main = createStackNavigator();

export const MainScreen = () => (
  <Main.Navigator
    initialRouteName={APP_SCREEN.MAIN}
    screenOptions={{headerShown: false}}
  >
    <Main.Screen name={APP_SCREEN.HOME} component={Home} />
    <Main.Screen name={APP_SCREEN.WELCOME} component={Welcome} />
    <Main.Screen name={APP_SCREEN.SPLASH} component={Splash} />
    <Main.Screen name={APP_SCREEN.LOGIN} component={Login} />
    <Main.Screen
      name={APP_SCREEN.CAMERA_ROLL}
      component={CameraRoll}
      options={{cardStyleInterpolator: forFade}}
    />
    <Main.Screen name={APP_SCREEN.REGISTER} component={Register} />
    <Main.Screen
      name={APP_SCREEN.REGISTER_STEP_TWO}
      component={RegisterStepTwo}
    />
    <Main.Screen name={APP_SCREEN.MAIN} component={BottomNavigation} />
    <Main.Screen name={APP_SCREEN.SHARED_NAV} component={SharedNavigation} />
  </Main.Navigator>
);

export const RootNavigation = () => {
  // render
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen
        options={{animationTypeForReplace: 'pop', gestureEnabled: false}}
        name={APP_SCREEN.HOME_STACK}
        component={MainScreen}
      />
    </RootStack.Navigator>
  );
};
