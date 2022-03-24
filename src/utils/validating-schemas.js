import * as yup from 'yup';
import {passwordRule} from './validating-rules';

export const RESET_SCHEMA = yup.object({
  email: yup
    .string()
    .email()
    .required(),
});

export const LOGIN_SCHEMA = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .matches(passwordRule)
    .min(8)
    .max(32)
    .required(),
});

export const REGISTER_SCHEMA = yup.object({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .matches(passwordRule)
    .min(8)
    .max(32)
    .required(),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')]),
});
