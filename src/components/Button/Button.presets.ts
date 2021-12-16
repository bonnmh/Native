import { ColorDefault } from '@themes/color';
import { scale } from '@common/index';
import { StyleSheet } from 'react-native';

export const stylesView = StyleSheet.create({
  primary: {
    borderRadius: 4,
    paddingVertical: 5,
    backgroundColor: ColorDefault.primary,
    alignItems: 'center',
  },
  none: {
    alignItems: 'center',
    width: '100%',
  },
  outline: {
    borderRadius: 4,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  thin: {
    width: '100%',
    borderWidth: 1,
    borderColor: ColorDefault.primary,
    borderRadius: scale(6),
    paddingVertical: scale(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {},
});

export type ButtonPresetNames = keyof typeof stylesView;
