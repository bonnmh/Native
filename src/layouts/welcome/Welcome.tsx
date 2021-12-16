
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SpacingDefault } from '@themes/spacing'
import { Block, Screen, Text, Spacer, Button, Icon } from '@components/index';
import { scale } from '@common/index';
import { FontDefault } from '@themes/typography';
import { images } from '@assets/index';

const Welcome = () => {
    const insets = useSafeAreaInsets();
    
    //render
    return (
        <Screen unsafe>
            <Block block>
                <ImageBackground
                    source={images.rectangle}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Block direction='row' alignItems='center'>
                        <Icon icon='logo' size={scale(48)} />
                        <Spacer width={scale(12)} />
                        <Text preset='linkTitle' >Photo</Text>
                    </Block>

                </ImageBackground>
                <Block paddingVertical={insets.bottom} direction='row' alignItems='center'>
                    <Block block marginLeft={SpacingDefault.medium} marginRight={SpacingDefault.smaller}>
                        <Button
                            preset='thin'
                            text='LOG IN'
                            textPreset='linkSmall' />
                    </Block>
                    <Block block marginRight={SpacingDefault.medium} marginLeft={SpacingDefault.smaller}>
                        <Button
                            preset='thin'
                            buttonColorTheme='primary'
                            text='REGISTER'
                            textPreset='linkSmall'
                            textColor='white' />
                    </Block>
                </Block>
            </Block>
        </Screen>
    )
}

export default Welcome

const styles = StyleSheet.create({})
