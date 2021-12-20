
import React, { FC, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SpacingDefault } from '@themes/spacing';
import { Block, Screen, Text, Spacer, LazyLoadingImage, Button } from '@components/index';
import { Masonry } from '@components/Masonry';
import { useTheme } from '@themes/index';
import { Furniture, data } from './Discover.type';

const { width } = Dimensions.get("window");

const COLUMNS = 2;
const PHOTO_WIDTH = (width - SpacingDefault.normal * 3) / COLUMNS
const PHOTO_TODAY_WIDTH = width - SpacingDefault.normal * 2

const FurnitureCard: FC<{ item: Furniture, index?: number, num?: number }> = ({ item, index, num }) => {
    const { spacing } = useTheme();

    return (
        <Block
            key={item.id}
            block
            height={(PHOTO_WIDTH * item.height) / item.width}
            width={PHOTO_WIDTH}
            marginLeft={!!num ? 8 : 0}>
            <LazyLoadingImage source={item.imgURL} style={{ flex: 1 }} />
            <Spacer height={spacing.normal} />
        </Block>
    );
};

const ListHeader: FC<{}> = ({ }) => {
    const { spacing } = useTheme();

    return (
        <Block width={'100%'} color='white'>
            <Spacer height={spacing.normal} />
            <Text preset='linkSubtitle'>WHAT'S NEW DAY</Text>
            <Spacer height={spacing.smaller} />
            <LazyLoadingImage
                source={'https://images.unsplash.com/photo-1639895072747-679cdb1ef1b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2068&q=80'}
                style={{ width: PHOTO_TODAY_WIDTH, aspectRatio: 1 }} />
            <Block marginTop={spacing.small} marginBottom={spacing.medium} direction='row' alignItems='center' >
                <LazyLoadingImage
                    source={'https://images.unsplash.com/photo-1639895072747-679cdb1ef1b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2068&q=80'}
                    style={{ width: 48, aspectRatio: 1, borderRadius: 36 }} />
                <Block marginLeft={spacing.small}>
                    <Text preset='linkMedium'>{"Nguyễn Minh Hiếu Bốn"}</Text>
                    <Text>{"@bonnmh"}</Text>
                </Block>
            </Block>

            <Text preset='linkSubtitle'>BROWSE ALL</Text>
            <Spacer height={spacing.tiny} />

        </Block>
    )
};

const ListFooter: FC<{ onPress: () => void }> = ({ onPress }) => {
    const { spacing } = useTheme();

    return (
        <Block paddingVertical={spacing.small}>
            <Button
                onPress={onPress}
                preset='thin'
                text='SEE MORE'
                textPreset='linkSmall'/>
        </Block>
    )
};

const Discover = () => {
    const insets = useSafeAreaInsets();
    const { spacing } = useTheme();

    const _renderListHeaderComponent = useMemo((): React.ReactElement => {
        return <ListHeader />
    }, [data]);

    const _onSeeMore = (): void => {

    };

    const _renderListEmptyComponent = useMemo((): React.ReactElement => {
        return (
            <ListFooter onPress={_onSeeMore} />
        )
    }, [])

    const _renderItem = useMemo(() => ({ item, index, num }: {
        item: Furniture;
        index?: number;
        num?: number
    }): React.ReactElement => {
        return <FurnitureCard item={item} key={item.id} num={num} />;
    }, [data])

    //render
    return (
        <Screen unsafe backgroundColor='white'>
            <Block block paddingHorizontal={spacing.normal} paddingTop={insets.top}>
                <Text preset='linkLarge' text={'Discover'} />
                <Block block color={'white'}>
                    <Masonry
                        data={data}
                        keyPrefix='key'
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
    )
}

export default Discover;
