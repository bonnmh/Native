import {Platform} from 'react-native';

import {FontFamily as FontType} from './type';

export const FontDefault: FontType = {
  primary: Platform.select({
    ios: 'Lato-Regular',
    android: 'Lato-Regular',
  }) as string,
  bold: Platform.select({
    ios: 'Lato-Bold',
    android: 'Lato-Bold',
  }) as string,
  italic: Platform.select({
    ios: 'Lato-Italic',
    android: 'Lato-Italic',
  }) as string,
};
export type FontFamily = keyof typeof FontDefault;
