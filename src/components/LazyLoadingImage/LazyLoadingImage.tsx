import React from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import {LazyLoadImageProps} from './LazyLoadingImage.props';
// Animated FastImage component
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const LazyLoadingImage = ({
  children,
  source,
  imageResizeMode,
  style,
  contentContainerStyle,
  loadingStyle,
  loadingColor,
  loadingSize,
  loadingBackgroundColor,
}: LazyLoadImageProps): JSX.Element => {
  const [imageLoading, setImageLoading] = React.useState(true);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fade = (): void => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => setImageLoading(false));
  };
  const opacityShow = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const opacityHide = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  let imageStyle = {};
  let contentStyle = {};
  const loadingImageStyle = loadingStyle ? loadingStyle : {};
  if (typeof style === 'object' && style != null) imageStyle = style;
  if (
    typeof contentContainerStyle === 'object' &&
    contentContainerStyle != null
  ) {
    contentStyle = contentContainerStyle;
  }
  return (
    <View
      accessibilityIgnoresInvertColors={true}
      style={StyleSheet.flatten([styles.container, imageStyle])}
    >
      <AnimatedFastImage
        fallback={true}
        onLoadStart={(): void => {
          setImageLoading(true);
        }}
        onLoadEnd={(): void => {
          fade();
        }}
        resizeMode={
          imageResizeMode ? imageResizeMode : FastImage.resizeMode.cover
        }
        style={{
          ...StyleSheet.flatten(imageStyle),
          opacity: opacityShow,
        }}
        source={{
          uri: source,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
      />
      {imageLoading ? (
        <Animated.View
          style={StyleSheet.flatten([
            styles.placeholderContainer,
            loadingImageStyle,
            {
              backgroundColor: loadingBackgroundColor
                ? loadingBackgroundColor
                : '#f2f2f2',
              opacity: opacityHide,
            },
          ])}
        >
          <ActivityIndicator
            size={loadingSize ? loadingSize : 'small'}
            color={loadingColor ? loadingColor : '#BDBDBD'}
          />
        </Animated.View>
      ) : null}
      <View style={StyleSheet.flatten([styles.contentStyle, contentStyle])}>
        {children}
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  contentStyle: {
    position: 'absolute',
  },
};

export default LazyLoadingImage;
