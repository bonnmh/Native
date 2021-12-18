/* eslint-disable no-shadow */

export enum APP_SCREEN {
  //stack
  HOME_STACK = 'HOME_STACK',


  HOME = 'HOME',
  SPLASH = 'SPLASH',
  WELCOME = 'WELCOME',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',

}

export type RootStackParamList = {
  [APP_SCREEN.HOME_STACK]: undefined;
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.SPLASH]: undefined;
  [APP_SCREEN.WELCOME]: undefined;
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.REGISTER]: undefined;
}
