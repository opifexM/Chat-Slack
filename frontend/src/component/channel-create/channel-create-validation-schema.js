import * as Yup from 'yup';

export const channelCreateValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
});
