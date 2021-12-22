import React, {FC, useEffect, useMemo, useState} from 'react';
import {Dimensions, PermissionsAndroid, Platform, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CameraRoll, {PhotoIdentifier} from '@react-native-community/cameraroll';
import {get} from 'lodash';
import FImage from 'react-native-fast-image';

import {SpacingDefault} from '@themes/spacing';
import {onShowErrorBase} from '@common/index';
import {Block, Screen, Text, ListView, Button, Img} from '@components/index';
import {useTheme} from '@themes/index';
import {PhotoNodeProps, usePagingCameraRoll} from '@utils/hooks';

const {width} = Dimensions.get('window');

const CARD_WIDTH = (width - SpacingDefault.normal * 4) / 3;

const CardItem: FC<{
  onPress?: () => void;
  item: PhotoNodeProps;
  selected: boolean;
}> = ({item, selected, onPress}) => {
  const {spacing, colors} = useTheme();
  const uri = get(item, 'image.uri', '');
  const source = {uri};

  return (
    <Button
      onPress={onPress}
      style={{
        width: CARD_WIDTH,
        aspectRatio: 1,
        marginLeft: spacing.normal,
        marginBottom: spacing.normal,
        borderWidth: selected ? 2 : 0,
        borderColor: 'cyan',
      }}
    >
      <Image style={{flex: 1}} source={source} />
    </Button>
  );
};

const CameraRollScreen = () => {
  const insets = useSafeAreaInsets();
  const {spacing} = useTheme();
  const [{medias, loading}] = usePagingCameraRoll();
  // const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      fetchPhotos();
    })();
  }, []);

  const fetchPhotos = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (result !== 'granted') {
        onShowErrorBase('Permission denied');
        return;
      }
    }

    // const fetchParams = {first: 100};
    // const data = await CameraRoll.getPhotos(fetchParams);
    // setPhotos(data.edges);
  };

  const _renderItem = useMemo(
    () =>
      ({
        item,
        index,
      }: {
        item: PhotoNodeProps;
        index: number;
      }): React.ReactElement => {
        console.log('__currentPhotoIndex_', currentPhotoIndex, index, item);
        return (
          <CardItem
            item={item}
            selected={currentPhotoIndex === index}
            onPress={() => setCurrentPhotoIndex(index)}
          />
        );
      },
    [medias, currentPhotoIndex],
  );

  //render
  return (
    <Screen unsafe backgroundColor="white">
      <Block block paddingTop={insets.top}>
        <Block padding={spacing.normal}>
          <Text preset="linkSubtitle" text={'All Photos'} />
        </Block>
        <Block block>
          <Block
            paddingHorizontal={spacing.normal}
            paddingBottom={spacing.normal}
          >
            {!!medias.length && !!currentPhotoIndex && (
              <Image
                style={{width: '100%', aspectRatio: 1}}
                source={{uri: medias[currentPhotoIndex].image.uri}}
              />
            )}
          </Block>
          <ListView
            data={medias}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            keyExtractor={(item, _) => get(item, 'image.uri', '')}
            renderItem={_renderItem}
          />
        </Block>
      </Block>
    </Screen>
  );
};

export default CameraRollScreen;
