/* eslint-disable no-shadow */

export enum APP_SCREEN {
  HOME = 'HOME',
  SPLASH = 'SPLASH'
}

export type RootStackParamList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.SPLASH]: undefined;
}
