import React, {memo} from 'react';
import equals from 'react-fast-compare';

import {IndicatorWave} from './components/wave/index';

import {IndicatorProps} from './type';

const IndicatorComponent = (props: IndicatorProps) => {
  const {type = 'wave'} = props;

  if (type === 'wave') return <IndicatorWave {...props} />;
  else return <IndicatorWave {...props} />;
};
export const Indicator = memo(IndicatorComponent, equals);
