import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {AppContainer} from '@navigation/AppNavigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppContainer />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
