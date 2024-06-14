import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const channelCreateValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .matches(/^\S*$/, 'Название не должно содержать пробелы')
    .required('Обязательное поле'),
});
