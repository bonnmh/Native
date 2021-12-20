/* eslint-disable no-shadow */

export enum APP_SCREEN {
  MAIN = 'MAIN',
  CHAT_TAB = 'CHAT_TAB',

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
  POST = 'POST',
  CHAT_DETAIL = 'CHAT_DETAIL',

};

export type ChatStackParamList = {
  [APP_SCREEN.CHAT]: undefined;
  [APP_SCREEN.CHAT_DETAIL]: undefined;
};

export type BottomStackParamList = {
  [APP_SCREEN.DISCOVER]: undefined;
  [APP_SCREEN.SEARCH]: undefined;
  [APP_SCREEN.POST]: undefined;
  [APP_SCREEN.CHAT]: undefined;
  [APP_SCREEN.CHAT_TAB]: undefined;
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
  [APP_SCREEN.CHAT_DETAIL]: undefined
} & BottomStackParamList & ChatStackParamList;



