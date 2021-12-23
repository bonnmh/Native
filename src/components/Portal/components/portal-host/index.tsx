import React, {memo, useEffect} from 'react';

import {usePortal, usePortalState} from '../../hooks';

import type {PortalHostProps} from './types';

const PortalHostComponent = ({name}: PortalHostProps) => {
  // state
  const state = usePortalState(name);
  const {registerHost, deregisterHost} = usePortal(name);

  // effect
  useEffect(() => {
    registerHost();
    return () => {
      deregisterHost();
    };
  }, []);

  // render
  return <>{state.map(item => item.node)}</>;
};

export const PortalHost = memo(PortalHostComponent);
PortalHost.displayName = 'PortalHost';
