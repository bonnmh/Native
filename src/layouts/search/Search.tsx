import React, {FC, useMemo, useState} from 'react';
import {Dimensions, ImageBackground, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {SpacingDefault} from '@themes/spacing';
import {
  Block,
  Screen,
  Text,
  Spacer,
  Button,
  ListView,
  LazyLoadingImage,
} from '@components/index';
import {scale} from '@common/index';
import {images} from '@assets/index';
import {navigate} from '@navigation/navigationService';
import {APP_SCREEN} from '@navigation/screenTypes';
import {Input} from '@layouts/components';
import {useTheme} from '@themes/index';
import {data, Furniture} from '@layouts/discover/Discover.type';
import {SharedElement} from 'react-navigation-shared-element';

const {width} = Dimensions.get('window');

const CARD_WIDTH = (width - SpacingDefault.normal * 4) / 3;

const ListFooter: FC<{onPress: () => void}> = ({onPress}) => {
  const {spacing} = useTheme();

  return (
    <Block paddingVertical={spacing.medium} paddingHorizontal={spacing.normal}>
      <Button
        onPress={onPress}
        preset="thin"
        text="SEE MORE"
        textPreset="linkSmall"
      />
    </Block>
  );
};

const CardItem: FC<{onPress: () => void; item: Furniture}> = ({
  onPress,
  item,
}) => {
  const {spacing} = useTheme();

  return (
    <SharedElement key={item.id} id={item.id}>
      <Button
        onPress={() => navigate(APP_SCREEN.PHOTO, {item})}
        style={{
          width: CARD_WIDTH,
          aspectRatio: 1,
          marginLeft: spacing.normal,
          marginBottom: spacing.normal,
        }}
      >
        <LazyLoadingImage source={item.imgURL} style={{flex: 1}} />
      </Button>
    </SharedElement>
  );
};

const Search = () => {
  const insets = useSafeAreaInsets();
  const {spacing} = useTheme();
  const [search, setSearch] = useState<string>('');
  const [isSeeMore, setIsSeeMore] = useState<boolean>(false);

  const _onItem = (): void => {};

  const _onSeeMore = (): void => {
    setIsSeeMore(prev => !prev);
  };

  const _renderItem = useMemo(
    () =>
      ({item, index}: {item: Furniture; index: number}): React.ReactElement => {
        return <CardItem item={item} onPress={_onItem} />;
      },
    [data],
  );

  const _renderListEmptyComponent = useMemo((): React.ReactElement => {
    if (isSeeMore) return <Block />;
    return <ListFooter onPress={_onSeeMore} />;
  }, []);

  //render
  return (
    <Screen unsafe backgroundColor={'white'}>
      <Block block paddingTop={insets.top}>
        <Block paddingHorizontal={spacing.normal}>
          <Text preset="linkLarge" text={'Search'} />
        </Block>
        <Block block paddingTop={spacing.small}>
          <Block paddingHorizontal={spacing.normal}>
            <Input
              typeInput={'outline'}
              label={'Please enter'}
              onChangeText={setSearch}
              value={search}
            />
          </Block>
          <ListView
            data={isSeeMore ? data : data.slice(0, 9)}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            keyExtractor={(item, index) => item.id}
            ListHeaderComponent={
              <Block paddingLeft={spacing.normal}>
                <Spacer height={spacing.normal} />
                <Text preset="linkSubtitle">ALL RESULTS</Text>
                <Spacer height={spacing.smaller} />
              </Block>
            }
            ListFooterComponent={_renderListEmptyComponent}
            renderItem={_renderItem}
          />
        </Block>
      </Block>
    </Screen>
  );
};

export default Search;
