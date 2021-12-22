import React from 'react';
import {isEmpty} from 'lodash';

import {
  Block,
  Button,
  Screen,
  Spacer,
  Text,
  TextField,
} from '@components/index';
import {Logger, scale} from '@common/index';
import {DefaultHeader, Input} from '@layouts/components';
import {SpacingDefault} from '@themes/spacing';
import {useFormik, FormikProps, FormikErrors} from 'formik';
import {goBack} from '@navigation/navigationService';
import {
  signUpFormSchemaStepTwo,
  initialValuesStepTwo,
  valueProps,
} from './Register.Schema';

const RegisterStepTwo = (): JSX.Element => {
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
    validationSchema: signUpFormSchemaStepTwo,
    initialValues: initialValuesStepTwo,
    onSubmit: value => _onSubmit(value),
  });

  const _onSubmit = (value: valueProps) => {};

  //render
  return (
    <Screen>
      <DefaultHeader onPress={goBack} />
      <Block block padding={SpacingDefault.medium}>
        <Text preset="linkLarge" text={'Register'} />
        <Spacer height={SpacingDefault.medium} />

        <Block>
          <Input
            typeInput={'outline'}
            label={'Nickname'}
            onChangeText={handleChange('nickname')}
            onBlur={handleBlur('nickname')}
            nameTrigger="nickname"
            trigger={(value: string) => {
              setTouched({[value]: true});
            }}
            errorField={errors['nickname']}
            touchedField={touched['nickname']}
            value={values['nickname']}
            errorMsg={errors['nickname']}
          />
          <Spacer height={SpacingDefault.medium} />
          <Button
            onPress={handleSubmit}
            preset="thin"
            buttonColorTheme="primary"
            text="SIGN UP"
            textPreset="linkSmall"
            textColor="white"
          />
        </Block>
      </Block>
    </Screen>
  );
};

export default RegisterStepTwo;
