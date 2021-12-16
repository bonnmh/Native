/* eslint-disable no-shadow */

export enum APP_SCREEN {
  //stack
  HOME_STACK = 'HOME_STACK',


  HOME = 'HOME',
  SPLASH = 'SPLASH',
  WELCOME = 'WELCOME',
  LOGIN = 'LOGIN',

}

export type RootStackParamList = {
  [APP_SCREEN.HOME_STACK]: undefined;
}

export type MainStackParamList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.SPLASH]: undefined;
  [APP_SCREEN.WELCOME]: undefined;
  [APP_SCREEN.LOGIN]: undefined;
}