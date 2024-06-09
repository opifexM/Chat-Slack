import * as Yup from "yup";

export const channelCreateValidationSchema = Yup.object({
  name: Yup.string()
    .required('Обязательное поле')
});
