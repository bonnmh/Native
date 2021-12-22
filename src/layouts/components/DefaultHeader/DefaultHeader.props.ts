import {ViewProps} from 'react-native';

export interface DefaultHeaderProps extends ViewProps {
  /**
   * onPress
   * @default undefined
   */
  onPress?: () => void;
}
