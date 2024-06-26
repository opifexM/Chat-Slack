import classNames from 'classnames';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import leoProfanity from '../../service/leo-profanity.js';
import { addMessageAction, fetchChatMessagesAction } from '../../store/api-action/chat-api-action.js';
import { getUsername } from '../../store/api-communication/api-communcation.selector.js';
import { getActiveChannelId } from '../../store/ui-setting/ui-setting.selector.js';
import { messageInputValidationSchema } from './message-input-validation-schema.js';

// eslint-disable-next-line import/prefer-default-export
export const MessageInput = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const activeChannelId = useSelector(getActiveChannelId);
  const username = useSelector(getUsername) ?? 'unknown';

  const initialValues = {
    body: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    try {
      const cleanedText = leoProfanity.clean(values.body);
      await dispatch(addMessageAction({
        username,
        body: cleanedText,
        channelId: activeChannelId,
      }));
      resetForm();
      dispatch(fetchChatMessagesAction());
    } catch (error) {
      toast.error(t('message.sendFail'), {
        position: 'top-right',
      });
      setFieldError('body', t('message.wrongText'));
    }
    setSubmitting(false);
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={messageInputValidationSchema(t)}
      >
        {({
          isSubmitting, isValid, dirty,
        }) => (
          <Form className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <Field
                name="body"
                id="body"
                aria-label={t('message.new')}
                placeholder={t('message.inputText')}
                className={classNames('border-0 p-0 ps-2 form-control')}
              />
              <button
                type="submit"
                className="btn btn-group-vertical"
                disabled={isSubmitting || !isValid || !dirty}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                  />
                </svg>
                <span className="visually-hidden">{t('message.send')}</span>
              </button>
              <ErrorMessage name="body" component="div" className="invalid-feedback" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
