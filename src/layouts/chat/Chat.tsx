
import React, { FC, useMemo } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SpacingDefault } from '@themes/spacing'
import { Block, Screen, Text, Spacer, Button, ListView, LazyLoadingImage } from '@components/index';
import { scale } from '@common/index';
import { images } from '@assets/index';
import { navigate } from '@navigation/navigationService';
import { APP_SCREEN } from '@navigation/screenTypes';
import { useTheme } from '@themes/index';

const data = [1, 2, 3, 4];

const MessageItem: FC<{ onPress: () => void, item: number }> = ({ onPress, item }) => {
    const { spacing } = useTheme();

    return (
        <Button onPress={onPress}>
            <Block
                borderBottomWidth={StyleSheet.hairlineWidth}
                borderBottomColor='gray'
                direction='row'
                paddingLeft={spacing.normal}
                paddingVertical={spacing.medium}>
                <LazyLoadingImage
                    source={'https://images.unsplash.com/photo-1639895072747-679cdb1ef1b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2068&q=80'}
                    style={{ width: scale(72), borderRadius: scale(36), aspectRatio: 1 }} />
                <Block block paddingHorizontal={spacing.normal}>
                    <Text preset='linkSubtitle'>James</Text>
                    <Text preset='textSmall' numberOfLines={2}>I’m looking for tips around capturing the milky way. I have a 6D with a 24-100mm</Text>
                </Block>
            </Block>
        </Button>
    )
};

const Chat = () => {
    const insets = useSafeAreaInsets();
    const { spacing } = useTheme();

    const _onItem = (): void => { navigate(APP_SCREEN.CHAT_DETAIL) };

    const _renderItem = useMemo(() => ({ item, index }: { item: number, index: number }): React.ReactElement => {
        return <MessageItem item={item} onPress={_onItem} />
    }, [data]);

    //render
    return (
        <Screen unsafe backgroundColor='white'>
            <Block
                block
                paddingBottom={SpacingDefault.medium}
                marginTop={insets.top}>
                <Block
                    alignItems='center'
                    borderBottomWidth={StyleSheet.hairlineWidth}
                    borderBottomColor='gray'
                    paddingBottom={spacing.normal}>
                    <Text preset='linkLarge' text={'Chats'} />
                </Block>
                <ListView
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={_renderItem} />

            </Block>
        </Screen>
    )
}

export default Chat;
