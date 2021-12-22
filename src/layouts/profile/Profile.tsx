import React, {FC, useMemo} from 'react';
import {Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';

import {SpacingDefault} from '@themes/spacing';
import {
  Block,
  Screen,
  Text,
  Spacer,
  LazyLoadingImage,
  Button,
} from '@components/index';
import {Masonry} from '@components/Masonry';
import {useTheme} from '@themes/index';
import {Furniture, data} from '@layouts/discover/Discover.type';
import {navigate} from '@navigation/navigationService';
import {APP_SCREEN} from '@navigation/screenTypes';

const {width} = Dimensions.get('window');

const COLUMNS = 2;
const PHOTO_WIDTH = (width - SpacingDefault.normal * 3) / COLUMNS;
const AVATAR = width / 3;

const FurnitureCard: FC<{item: Furniture; index?: number; num?: number}> = ({
  item,
  index,
  num,
}) => {
  const {spacing} = useTheme();

  return (
    <SharedElement key={item.id} id={item.id}>
      <Button
        onPress={() => navigate(APP_SCREEN.PHOTO, {item})}
        style={{
          flex: 1,
          height: (PHOTO_WIDTH * item.height) / item.width,
          width: PHOTO_WIDTH,
          marginLeft: !!num ? 8 : 0,
        }}
      >
        <LazyLoadingImage source={item.imgURL} style={{flex: 1}} />
        <Spacer height={spacing.normal} />
      </Button>
    </SharedElement>
  );
};

const ListHeader: FC<{}> = ({}) => {
  const {spacing} = useTheme();

  return (
    <Block width={'100%'} alignItems="center" marginBottom={spacing.medium}>
      <LazyLoadingImage
        source={
          'https://images.unsplash.com/photo-1639895072747-679cdb1ef1b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2068&q=80'
        }
        style={{width: AVATAR, aspectRatio: 1, borderRadius: AVATAR}}
      />

      <Spacer height={spacing.medium} />
      <Text preset="linkLarge">Hubert</Text>
      <Spacer height={spacing.tiny} />
      <Text preset="textMedium">TP.HO CHI MINH</Text>
      <Spacer height={spacing.tiny} />
      <Button
        preset="thin"
        text="FOLLOW HUBERT"
        buttonColor="black"
        textColor="white"
        textPreset="linkSmall"
      />
      <Spacer height={spacing.normal} />
      <Button preset="thin" text="MESSAGE" textPreset="linkSmall" />
    </Block>
  );
};

const ListFooter: FC<{onPress: () => void}> = ({onPress}) => {
  const {spacing} = useTheme();

  return (
    <Block paddingVertical={spacing.small}>
      <Button
        onPress={onPress}
        preset="thin"
        text="SEE MORE"
        textPreset="linkSmall"
      />
    </Block>
  );
};

const Profile = () => {
  const insets = useSafeAreaInsets();
  const {spacing} = useTheme();

  const _renderListHeaderComponent = useMemo((): React.ReactElement => {
    return <ListHeader />;
  }, [data]);

  const _onSeeMore = (): void => {};

  const _renderListEmptyComponent = useMemo((): React.ReactElement => {
    return <ListFooter onPress={_onSeeMore} />;
  }, []);

  const _renderItem = useMemo(
    () =>
      ({
        item,
        index,
        num,
      }: {
        item: Furniture;
        index?: number;
        num?: number;
      }): React.ReactElement => {
        return <FurnitureCard item={item} key={item.id} num={num} />;
      },
    [data],
  );

  //render
  return (
    <Screen unsafe backgroundColor="white">
      <Block block paddingHorizontal={spacing.normal} paddingTop={insets.top}>
        <Text preset="linkLarge" text={'Profile'} />
        <Block block color={'white'}>
          <Masonry
            data={data}
            keyPrefix="key"
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={_renderListHeaderComponent}
            ListFooterComponent={_renderListEmptyComponent}
            numColumns={2}
            scrollEventThrottle={16}
            renderItem={_renderItem}
          />
        </Block>
      </Block>
    </Screen>
  );
};

export default Profile;
