import React from 'react';
import { isEmpty } from 'lodash';

import {
    Block,
    Button,
    Screen,
    Spacer,
    Text,
    TextField
} from '@components/index';
import { Logger, scale, } from '@common/index';
import { DefaultHeader, Input } from '@layouts/components';
import { SpacingDefault } from '@themes/spacing';
import { useFormik, FormikProps, FormikErrors } from 'formik';
import { goBack } from '@navigation/navigationService';
import {
    signUpFormSchema,
    initialValues,
    valueProps,
    FIELD_REGISTER
} from './Register.Schema';

const Register = (): JSX.Element => {

    const {
        values,
        errors,
        touched,
        setTouched,
        handleChange,
        handleBlur,
        handleSubmit,
        validateForm,
    }: FormikProps<valueProps> = useFormik<valueProps>({
        validationSchema: signUpFormSchema,
        initialValues: initialValues,
        onSubmit: value => _onSubmit(value),
    });

    const _onSubmit = (value: valueProps) => {
        console.log(value)
    };

    //render
    return (
        <Screen>
            <DefaultHeader onPress={goBack} />
            <Block block padding={SpacingDefault.medium}>
                <Text preset='linkLarge' text={'Register'} />
                <Spacer height={SpacingDefault.medium} />
                {FIELD_REGISTER.map((e, index) => {
                    return (
                        <Block key={index}>
                            <Input
                                typeInput={'outline'}
                                label={e.name}
                                onChangeText={handleChange(e.field)}
                                onBlur={handleBlur(e.field)}
                                errorField={errors[e.field]}
                                touchedField={touched[e.field]}
                                value={values[e.field]}
                                secureTextEntry={e.secure}
                                errorMsg={errors[e.field]}
                            />
                            <Spacer height={SpacingDefault.medium} />
                        </Block>
                    )
                })}
                <Button
                    disabled={!isEmpty(errors) || isEmpty(touched)}
                    preset='thin'
                    buttonColorTheme='primary'
                    text='NEXT'
                    textPreset='linkSmall'
                    textColor='white' />
            </Block>

        </Screen>
    )
}

export default Register;
