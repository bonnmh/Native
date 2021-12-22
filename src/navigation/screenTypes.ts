/* eslint-disable no-shadow */

import {Furniture} from 'layouts/discover/Discover.type';

export enum APP_SCREEN {
  //stack
  MAIN = 'MAIN',
  CHAT_TAB = 'CHAT_TAB',
  SEARCH_TAB = 'SEARCH_TAB',
  DISCOVER_TAB = 'DISCOVER_TAB',
  PROFILE_TAB = 'PROFILE_TAB',
  SHARED_NAV = 'SHARED_NAV',
  HOME_STACK = 'HOME_STACK',

  //screen
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
  PHOTO = 'PHOTO',
  CAMERA_ROLL = 'CAMERA_ROLL',
}

export type ChatStackParamList = {
  [APP_SCREEN.CHAT]: undefined;
  [APP_SCREEN.CHAT_DETAIL]: undefined;
};

export type DiscoverStackParamList = {
  [APP_SCREEN.DISCOVER]: undefined;
  [APP_SCREEN.PHOTO]: {item: Furniture};
};

export type SearchStackParamList = {
  [APP_SCREEN.SEARCH]: undefined;
  [APP_SCREEN.PHOTO]: {item: Furniture};
};

export type ProfileStackParamList = {
  [APP_SCREEN.PROFILE]: undefined;
  [APP_SCREEN.PHOTO]: {item: Furniture};
};

export type SharedStackParamList = {
  [APP_SCREEN.PHOTO]: {item: Furniture};
};

export type BottomStackParamList = {
  [APP_SCREEN.DISCOVER]: undefined;
  [APP_SCREEN.POST]: undefined;
  [APP_SCREEN.CHAT]: undefined;
  [APP_SCREEN.PROFILE]: undefined;
  [APP_SCREEN.CHAT_TAB]: undefined;
  [APP_SCREEN.SEARCH_TAB]: undefined;
  [APP_SCREEN.PROFILE_TAB]: undefined;
  [APP_SCREEN.DISCOVER_TAB]: undefined;
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
  [APP_SCREEN.SHARED_NAV]: undefined;
  [APP_SCREEN.CHAT_DETAIL]: undefined;
  [APP_SCREEN.SEARCH_TAB]: undefined;
  [APP_SCREEN.CAMERA_ROLL]: undefined;
} & BottomStackParamList &
  ChatStackParamList &
  DiscoverStackParamList &
  SharedStackParamList &
  SearchStackParamList &
  ProfileStackParamList;
