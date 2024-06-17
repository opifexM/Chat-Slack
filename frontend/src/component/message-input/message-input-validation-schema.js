import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const messageInputValidationSchema = (t) => Yup.object({
  body: Yup.string()
    .required(t('message.validation.required')),
});
