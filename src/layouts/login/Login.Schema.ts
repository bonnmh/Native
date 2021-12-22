import * as yup from 'yup';

export const signInFormSchema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
  password: yup
    .string()
    .min(8, 'Password must be long than 8 characters')
    .required('Password is required'),
});

export interface valueProps {
  [key: string]: string;
}

export const initialValues: valueProps = {
  email: '',
  password: '',
};

export interface FIELD_LOGIN_TYPE {
  name: string;
  field: string;
  isRequired: boolean;
  secure: boolean;
  placeholder: string;
}

export const FIELD_LOGIN: FIELD_LOGIN_TYPE[] = [
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
];
