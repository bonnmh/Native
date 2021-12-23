import React, {FC, useMemo, useState} from 'react';
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
  DropDown,
  Modal,
} from '@components/index';
import {Masonry} from '@components/Masonry';
import {useTheme} from '@themes/index';
import {Furniture, data} from './Discover.type';
import {APP_SCREEN} from '@navigation/screenTypes';
import {navigate} from '@navigation/navigationService';

const {width} = Dimensions.get('window');

const COLUMNS = 2;
const PHOTO_WIDTH = (width - SpacingDefault.normal * 3) / COLUMNS;
const PHOTO_TODAY_WIDTH = width - SpacingDefault.normal * 2;

const FurnitureCard: FC<{item: Furniture; index?: number; num?: number}> = ({
  item,
  index,
  num,
}) => {
  const {spacing} = useTheme();

  return (
    <SharedElement key={item.id} id={item.id}>
      <Button
        onPress={(): void => {
          navigate(APP_SCREEN.PHOTO, {item});
        }}
        style={{
          flex: 1,
          height: (PHOTO_WIDTH * item.height) / item.width,
          width: PHOTO_WIDTH,
          marginLeft: !!num ? 8 : 0,
        }}>
        <LazyLoadingImage source={item.imgURL} style={{flex: 1}} />
        <Spacer height={spacing.normal} />
      </Button>
    </SharedElement>
  );
};

const ListHeader: FC<{}> = ({}) => {
  const {spacing} = useTheme();

  return (
    <Block width={'100%'} color="white">
      <Spacer height={spacing.normal} />
      <Text preset="linkSubtitle">WHAT'S NEW DAY</Text>
      <Spacer height={spacing.smaller} />
      <SharedElement id={data[0].id}>
        <Button
          onPress={(): void => {
            navigate(APP_SCREEN.PHOTO, {item: data[0]});
          }}>
          <LazyLoadingImage
            source={data[0].imgURL}
            style={{width: PHOTO_TODAY_WIDTH, aspectRatio: 1}}
          />
        </Button>
      </SharedElement>
      <Block
        marginTop={spacing.small}
        marginBottom={spacing.medium}
        direction="row"
        alignItems="center">
        <LazyLoadingImage
          source={
            'https://images.unsplash.com/photo-1639895072747-679cdb1ef1b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2068&q=80'
          }
          style={{width: 48, aspectRatio: 1, borderRadius: 36}}
        />
        <Block marginLeft={spacing.small}>
          <Text preset="linkMedium">{'Nguyễn Minh Hiếu Bốn'}</Text>
          <Text>{'@bonnmh'}</Text>
        </Block>
      </Block>

      <Text preset="linkSubtitle">BROWSE ALL</Text>
      <Spacer height={spacing.tiny} />
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

const Discover = () => {
  const insets = useSafeAreaInsets();
  const {spacing} = useTheme();

  const [isSeeMore, setIsSeeMore] = useState<boolean>(false);

  const _renderListHeaderComponent = useMemo((): React.ReactElement => {
    return <ListHeader />;
  }, [data]);

  const _onSeeMore = (): void => {
    setIsSeeMore(prev => !prev);
  };

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
        <Text preset="linkLarge" text={'Discover'} />
        <Block block>
          <Masonry
            data={isSeeMore ? data : data.slice(0, 5)}
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

export default Discover;
