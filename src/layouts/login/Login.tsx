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
    signInFormSchema,
    initialValues,
    valueProps,
    FIELD_LOGIN
} from './Login.Schema';

const Login = (): JSX.Element => {

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
        validationSchema: signInFormSchema,
        initialValues: initialValues,
        onSubmit: value => _onSubmit(value),
    });

    const _onSubmit = (value: valueProps) => { };

    const _setTouched = (key: string): void => {
        setTouched({ ...touched, [key]: true })
    }

    //render
    return (
        <Screen>
            <DefaultHeader onPress={goBack} />
            <Block block padding={SpacingDefault.medium}>
                <Text preset='linkLarge' text={'Log in'} />
                <Spacer height={SpacingDefault.medium} />
                {FIELD_LOGIN.map((e, index) => {
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
                                nameTrigger={e.field}
                                trigger={_setTouched}
                            />
                            <Spacer height={SpacingDefault.medium} />
                        </Block>
                    )
                })}
                <Button
                    onPress={handleSubmit}
                    preset='thin'
                    buttonColorTheme='primary'
                    text='LOG IN'
                    textPreset='linkSmall'
                    textColor='white' />
            </Block>

        </Screen>
    )
}

export default Login;
