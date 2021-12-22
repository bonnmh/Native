import {ImageStyle, StyleProp, ViewStyle} from 'react-native';

/**
 * Lazy loading image props
 * @param
 */
export interface LazyLoadImageProps {
  children?: JSX.Element | null;
  source: string;
  imageResizeMode?: 'center' | 'contain' | 'cover' | 'stretch';
  style: StyleProp<ImageStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  loadingStyle?: StyleProp<ViewStyle>;
  loadingColor?: string;
  loadingSize?: 'large' | 'small';
  loadingBackgroundColor?: string;
}
