import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const channelCreateValidationSchema = (t) => Yup.object({
  name: Yup.string()
    .min(3, t('channel.validation.length', { min: 3, max: 20 }))
    .max(20, t('channel.validation.length', { min: 3, max: 20 }))
    .matches(/^\S.*\S$/, t('channel.validation.noSpaces'))
    .required(t('channel.validation.required')),
});
