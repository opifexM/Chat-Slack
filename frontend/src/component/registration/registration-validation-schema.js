import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const registrationValidationSchema = (t) => Yup.object({
  username: Yup.string()
    .min(3, t('user.validation.length', { min: 3, max: 20 }))
    .max(20, t('user.validation.length', { min: 3, max: 20 }))
    .required(t('user.validation.required')),
  password: Yup.string()
    .min(6, t('user.validation.min', { min: 6 }))
    .required(t('user.validation.required')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], t('user.validation.passwordNotMatch'))
    .required(t('user.validation.required')),
});
