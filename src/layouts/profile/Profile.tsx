
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SpacingDefault } from '@themes/spacing'
import { Block, Screen, Text, Spacer, Button, Icon } from '@components/index';
import { scale } from '@common/index';
import { images } from '@assets/index';
import { navigate } from '@navigation/navigationService';
import { APP_SCREEN } from '@navigation/screenTypes';

const Profile = () => {
    const insets = useSafeAreaInsets();

    //render
    return (
        <Screen>
            <Block block padding={SpacingDefault.medium}>
                <Text preset='linkLarge' text={'Profile'} />

            </Block>
        </Screen>
    )
}

export default Profile;
