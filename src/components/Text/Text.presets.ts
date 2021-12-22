import {FontSizeDefault} from '@themes/fontSize';
import {FontDefault} from '@themes/typography';
import {StyleSheet} from 'react-native';
export const textPresets = StyleSheet.create({
  linkTitle: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_30,
    lineHeight: 32,
    fontWeight: '600',
    color: '#000000',
  },
  linkSubtitle: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_20,
    lineHeight: 32,
    fontWeight: '600',
    color: '#000000',
  },
  linkLarge: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_32,
    lineHeight: 34,
    fontWeight: '400',
    color: '#000000',
  },
  linkMedium: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#000000',
  },
  linkSmall: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_16,
    lineHeight: 20,
    fontWeight: '600',
    color: '#000000',
  },
  linkXSmall: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_11,
    lineHeight: 20,
    fontWeight: '600',
    color: '#000000',
  },
  linkXXSmall: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_9,
    lineHeight: 20,
    fontWeight: '600',
    color: '#000000',
  },
  textMedium: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_16,
    lineHeight: 30,
    fontWeight: 'normal',
    color: '#000000',
  },
  textSmall: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_14,
    lineHeight: 20,
    fontWeight: 'normal',
    color: '#000000',
  },
  textXSmall: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_11,
    lineHeight: 20,
    fontWeight: 'normal',
    color: '#000000',
  },
  textXXSmall: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_9,
    lineHeight: 20,
    fontWeight: 'normal',
    color: '#000000',
  },
  default: {},
});

export type TextPresetNames = keyof typeof textPresets;
