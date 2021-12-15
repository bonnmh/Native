import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Screen } from '@components/index';
import { AppTheme } from '@themes/type';
import { useTheme } from '@react-navigation/native';

const Home = () => {
  const { colors }: AppTheme = useTheme();
  return (
    <Screen>
      <Block block color={'red'}></Block>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({});
