import * as Yup from 'yup';

export const messageInputValidationSchema = Yup.object({
  body: Yup.string()
    .required('Обязательное поле'),
});
