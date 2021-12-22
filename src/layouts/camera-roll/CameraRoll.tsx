import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  Image,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CameraRoll, {PhotoIdentifier} from '@react-native-community/cameraroll';
import {get} from 'lodash';

import {SpacingDefault} from '@themes/spacing';
import {onShowErrorBase} from '@common/index';
import {
  Block,
  Screen,
  Text,
  ListView,
  Button,
  Img,
  Icon,
} from '@components/index';
import {useTheme} from '@themes/index';
import {PhotoNodeProps, usePagingCameraRoll} from '@utils/hooks';
import {goBack} from '@navigation/navigationService';

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
      }}>
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
        <Block
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal={spacing.normal}
          borderBottomWidth={StyleSheet.hairlineWidth}
          borderBottomColor="gray"
          paddingBottom={spacing.normal}>
          <Icon icon="back" size={spacing.normal} onPress={() => goBack()} />
          <Text preset="linkLarge" text={'New'} />
          <Icon icon="back" color={'white'} />
        </Block>
        <Block block>
          <Block paddingHorizontal={spacing.normal} paddingTop={spacing.normal}>
            {!!medias.length && currentPhotoIndex !== null && (
              <Image
                style={{width: '30%', aspectRatio: 1}}
                source={{uri: medias[currentPhotoIndex].image.uri}}
              />
            )}
          </Block>
          <Block padding={spacing.normal}>
            <Text preset="linkSubtitle" text={'All Photos'} />
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
