import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Block, Screen} from '@components/index';
import {AppTheme} from '@themes/type';
import {useTheme} from '@react-navigation/native';

const Splash = () => {
  const {colors}: AppTheme = useTheme();
  return (
    <Screen>
      <Block block></Block>
    </Screen>
  );
};

export default Splash;

const styles = StyleSheet.create({});
