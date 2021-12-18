import * as yup from 'yup';

export const signUpFormSchema = yup.object().shape({
    email: yup.string().email().required().label('Email'),
    password: yup
        .string()
        .min(8, 'Password must be long than 8 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password'), null], 'Re-entering the password is a required item.'),
});

export const signUpFormSchemaStepTwo = yup.object().shape({
    nickname: yup
        .string()
        .min(6, 'Nickname must be long than 8 characters')
        .required('Nickname is required'),
});


export interface valueProps {
    [key: string]: string
}

export const initialValues: valueProps = {
    email: '',
    password: '',
    confirmPassword: ''
}

export const initialValuesStepTwo: valueProps = {
    nickname: '',
}

export interface FIELD_REGISTER_TYPE {
    name: string;
    field: string;
    isRequired: boolean;
    secure: boolean;
    placeholder?: string;
}

export const FIELD_REGISTER: FIELD_REGISTER_TYPE[] = [
    {
        name: 'Email',
        field: 'email',
        isRequired: true,
        secure: false,
        placeholder: 'auth.sign_email_placeholder',
    },
    {
        name: 'Password',
        field: 'password',
        secure: true,
        isRequired: true,
        placeholder: 'auth.sign_password_placeholder',
    },
    {
        name: 'Confirm password',
        field: 'confirmPassword',
        secure: true,
        isRequired: true,
    },
];