/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Splash from '@layouts/Splash';

it('renders correctly', () => {
  renderer.create(<Splash />);
});
