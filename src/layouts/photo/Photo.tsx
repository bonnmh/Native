import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useVector, snapPoint} from 'react-native-redash';

import {SpacingDefault} from '@themes/spacing';
import {
  Block,
  Screen,
  Text,
  Spacer,
  Button,
  LazyLoadingImage,
} from '@components/index';
import {scale} from '@common/index';
import {images} from '@assets/index';
import {goBack, navigate} from '@navigation/navigationService';
import {APP_SCREEN, SharedStackParamList} from '@navigation/screenTypes';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {PanGestureHandler} from 'react-native-gesture-handler';

const {height} = Dimensions.get('window');

interface PhotoProps {
  navigation: NavigationProp<SharedStackParamList, APP_SCREEN.PHOTO>;
  route: RouteProp<SharedStackParamList, APP_SCREEN.PHOTO>;
}

const Photo = ({route}: PhotoProps) => {
  const insets = useSafeAreaInsets();
  const {item} = route.params;

  const isGestureActive = useSharedValue(false);
  const translation = useVector();

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => (isGestureActive.value = true),
    onActive: ({translationX, translationY}) => {
      translation.x.value = translationX;
      translation.y.value = translationY;
    },
    onEnd: ({translationY, velocityY}) => {
      const snapBack =
        snapPoint(translationY, velocityY, [0, height]) === height;

      if (snapBack) {
        runOnJS(goBack)();
      } else {
        isGestureActive.value = false;
        translation.x.value = withSpring(0);
        translation.y.value = withSpring(0);
      }
    },
  });

  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      translation.y.value,
      [0, height],
      [1, 0.5],
      Extrapolate.CLAMP,
    );
    return {
      flex: 1,
      transform: [
        {translateX: translation.x.value * scale},
        {translateY: translation.y.value * scale},
        {scale},
      ],
    };
  });
  const borderStyle = useAnimatedStyle(() => {
    return {
      borderRadius: withTiming(isGestureActive.value ? 24 : 0),
    };
  });

  //render
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>
        <SharedElement id={item.id} style={{flex: 1}}>
          <Animated.Image
            source={{uri: item.imgURL}}
            style={[
              {
                ...StyleSheet.absoluteFillObject,
                width: undefined,
                height: undefined,
                resizeMode: 'cover',
              },
              borderStyle,
            ]}
          />
        </SharedElement>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Photo;
