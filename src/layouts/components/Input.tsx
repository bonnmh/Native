import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { TextInputProps } from 'react-native';

import { scale } from '@common/index';
import { TextField, HelperText } from '@components/index';
import { TextFieldProps } from '@components/TextField/TextField.props'

interface InputProps extends TextFieldProps {
    touchedField?: boolean | string;
    errorField?: string;
    errorMsg?: string
}

const InputComponent = ({
    errorField,
    touchedField,
    errorMsg,
    ...rest
}: InputProps) => {
    return (
        <>
            <TextField
                label={'Password'}
                secureTextEntry={true}
                error={!!touchedField && !!errorField}
                {...rest}
            />
            <HelperText visible={!!touchedField && !!errorField} msg={errorMsg || ''} type={'error'} />
        </>
    );
};

export const Input = memo(InputComponent, isEqual);