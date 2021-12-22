import 'react-native-reanimated';
import React, {Suspense} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppContainer} from '@navigation/AppNavigation';
import {I18nextProvider} from 'react-i18next';
import i18n from '@utils/i18n/i18n';

const App = () => {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={null}>
          <AppContainer />
        </Suspense>
      </I18nextProvider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
