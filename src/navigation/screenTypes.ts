/* eslint-disable no-shadow */

export enum APP_SCREEN {
  //stack
  HOME_STACK = 'HOME_STACK',
  HOME = 'HOME',
  SPLASH = 'SPLASH',
  WELCOME = 'WELCOME',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  REGISTER_STEP_TWO = 'REGISTER_STEP_TWO',
  DISCOVER = 'DISCOVER',
  SEARCH = 'SEARCH',
  CHAT = 'CHAT',
  PROFILE = 'PROFILE',
  MAIN = 'MAIN',
  POST = 'POST'

};

export type BottomStackParamList = {
  [APP_SCREEN.DISCOVER]: undefined;
  [APP_SCREEN.SEARCH]: undefined;
  [APP_SCREEN.POST]: undefined;
  [APP_SCREEN.CHAT]: undefined;
  [APP_SCREEN.PROFILE]: undefined;
};

export type RootStackParamList = {
  [APP_SCREEN.HOME_STACK]: undefined;
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.SPLASH]: undefined;
  [APP_SCREEN.WELCOME]: undefined;
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.REGISTER]: undefined;
  [APP_SCREEN.REGISTER_STEP_TWO]: undefined;
  [APP_SCREEN.DISCOVER]: undefined;
  [APP_SCREEN.MAIN]: undefined;
} & BottomStackParamList;



