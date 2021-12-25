import {sharedTiming, useInterpolate, useShareClamp} from '@common/index';
import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {LayoutChangeEvent, StyleSheet} from 'react-native';
import {MotiView} from 'moti';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  Easing,
} from 'react-native-reanimated';

import {styles} from './styles';
import {IndicatorWaveProps} from './type';
import {Block} from '../../../Block/Block';

export const IndicatorWaveComponent = ({}: IndicatorWaveProps) => {
  // render
  return (
    <Block alignItems="center" justifyContent="center" block>
      {[...Array(3).keys()].map((item, index) => {
        return (
          <MotiView
            key={index}
            from={{
              opacity: 0.5,
              scale: 1,
            }}
            animate={{
              opacity: 0,
              scale: 4,
            }}
            transition={{
              type: 'timing',
              duration: 2000,
              easing: Easing.out(Easing.ease),
              loop: true,
              delay: index * 400,
              repeatReverse: false,
            }}
            style={{
              ...StyleSheet.absoluteFillObject,
              flex: 1,
              backgroundColor: 'pink',
              borderRadius: 100,
            }}
          />
        );
      })}
    </Block>
  );
};

export const IndicatorWave = memo(IndicatorWaveComponent, equals);
