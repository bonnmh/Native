import React, { memo } from 'react';
import isEqual from 'react-fast-compare';

import { DefaultHeaderProps } from './DefaultHeader.props';
import { scale } from '@common/index';
import { Block, Button, Icon } from '@components/index';
import { SpacingDefault } from '@themes/spacing';



const DefaultHeaderComponent = ({ onPress }: DefaultHeaderProps) => {

    //render
    return (
        <Block>
            <Button onPress={onPress} style={{ paddingHorizontal: SpacingDefault.medium, paddingVertical: SpacingDefault.normal }}>
                <Icon icon='left' size={scale(16)} />
            </Button>
        </Block>
    )
}

export const DefaultHeader = memo(DefaultHeaderComponent, isEqual)
