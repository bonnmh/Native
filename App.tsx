import React, {Suspense} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppContainer} from '@navigation/AppNavigation';
import {I18nextProvider} from 'react-i18next';
import i18n from '@utils/i18n/i18n';
import {PortalProvider} from '@components/index';
import {SocketProvider} from '@common/socketIo';

const App = () => {
  return (
    <SocketProvider value={undefined}>
      <SafeAreaProvider>
        <I18nextProvider i18n={i18n}>
          <Suspense fallback={null}>
            <PortalProvider>
              <AppContainer />
            </PortalProvider>
          </Suspense>
        </I18nextProvider>
      </SafeAreaProvider>
    </SocketProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
