import { unwrapResult } from '@reduxjs/toolkit';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import leoProfanity from '../../service/leo-profanity.js';
import { addMessageAction, fetchChatMessagesAction } from '../../store/api-action/chat-api-action.js';
import { getUsername } from '../../store/api-communication/api-communcation.selector.js';
import { getActiveChannelId } from '../../store/ui-setting/ui-setting.selector.js';
import { messageInputValidationSchema } from './message-input-validation-schema.js';

export const MessageInput = () => {
  const dispatch = useDispatch();
  const activeChannelId = useSelector(getActiveChannelId);
  const username = useSelector(getUsername) ?? 'unknown';

  const initialValues = {
    body: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    try {
      const cleanedText = leoProfanity.clean(values.body);
      const resultAction = await dispatch(addMessageAction({
        username,
        body: cleanedText,
        channelId: activeChannelId,
      }));
      const data = unwrapResult(resultAction);
      toast.success(`Message with Id '${data.id}' sent`, {
        position: 'top-right',
      });
      resetForm();
      dispatch(fetchChatMessagesAction());
    } catch (error) {
      toast.error('Message send failed. Please try again.', {
        position: 'top-right',
      });
      setFieldError('body', 'Не возможно отправить текст');
    }
    setSubmitting(false);
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={messageInputValidationSchema}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <Field
                name="body"
                id="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2 form-control"
              />
              <ErrorMessage name="body" component="div" className="invalid-feedback" />
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
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
