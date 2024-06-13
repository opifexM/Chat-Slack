import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const messageInputValidationSchema = Yup.object({
  body: Yup.string()
    .required('Обязательное поле'),
});
