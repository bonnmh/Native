
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Dimensions, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CameraRoll, { PhotoIdentifier } from '@react-native-community/cameraroll';
import { get } from 'lodash';

import { SpacingDefault } from '@themes/spacing';
import { onShowErrorBase } from '@common/index';
import { Block, Screen, Text, ListView, Button, Img } from '@components/index';
import { useTheme } from '@themes/index';

const { width } = Dimensions.get('window');

const CARD_WIDTH = (width - SpacingDefault.normal * 4) / 3;

const CardItem: FC<{ onPress?: () => void, item: PhotoIdentifier }> = ({ item }) => {
    const { spacing, colors } = useTheme();
    const uri = get(item, 'node.image.uri', '')
    const source = { uri };

    return (
        <Button
            style={{
                width: CARD_WIDTH,
                aspectRatio: 1,
                marginLeft: spacing.normal,
                marginBottom: spacing.normal,
                backgroundColor: colors.notification
            }}>
            <Img sourceRemote={source} style={{ flex: 1 }} />
        </Button>
    )
};


const CameraRollScreen = () => {
    const insets = useSafeAreaInsets();
    const { spacing } = useTheme();
    const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);

    useEffect(() => {
        (async () => {
            fetchPhotos();
        })();
    }, []);

    const fetchPhotos = async () => {
        if (Platform.OS === 'android') {
            const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
            if (result !== 'granted') {
                onShowErrorBase('Permission denied')
                return
            }
        }

        const fetchParams = { first: 100, }
        const data = await CameraRoll.getPhotos(fetchParams);
        setPhotos(data.edges);
    }

    const _renderItem = useMemo(() => ({ item, index }: { item: PhotoIdentifier, index: number }): React.ReactElement => {
        return <CardItem item={item} />
    }, [photos]);

    //render
    return (
        <Screen unsafe backgroundColor='white'>
            <Block block paddingTop={insets.top}>
                <Block padding={spacing.normal}>
                    <Text preset='linkSubtitle' text={'All Photos'} />
                </Block>
                <Block block>
                    <ListView
                        data={photos}
                        showsVerticalScrollIndicator={false}
                        numColumns={3}
                        keyExtractor={(item, _) => get(item, 'node.image.uri', '')}
                        renderItem={_renderItem} />
                </Block>
            </Block>
        </Screen>
    )
}

export default CameraRollScreen;
