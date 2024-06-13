import { unwrapResult } from '@reduxjs/toolkit';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { editMessageAction, fetchChatMessagesAction } from '../../store/api-action/chat-api-action.js';
import { getDropMenuChatId, getDropMenuChatText, getIsEditingChat } from '../../store/ui-setting/ui-setting.selector.js';
import { resetDropMenuChat, setIsEditingChat } from '../../store/ui-setting/ui-setting.slice.js';
import { messageInputValidationSchema } from '../message-input/message-input-validation-schema.js';

// eslint-disable-next-line import/prefer-default-export
export const MessageEdit = () => {
  const dispatch = useDispatch();

  const isEditingChat = useSelector(getIsEditingChat);
  const dropMenuChatId = useSelector(getDropMenuChatId);
  const dropMenuChatText = useSelector(getDropMenuChatText);
  if (!isEditingChat || !dropMenuChatId) {
    return null;
  }

  const initialValues = {
    body: dropMenuChatText,
  };

  function handleCloseClick() {
    dispatch(setIsEditingChat(false));
  }

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const resultAction = await dispatch(editMessageAction({
        id: dropMenuChatId,
        body: values.body,
      }));
      const data = unwrapResult(resultAction);
      toast.success(`Message '${dropMenuChatText}' with ID ${data.id} is edited`, {
        position: 'top-right',
      });
      dispatch(resetDropMenuChat());
      dispatch(setIsEditingChat(false));
      dispatch(fetchChatMessagesAction());
    } catch (error) {
      toast.error(`Edit message '${dropMenuChatText}' failed. Please try again.`, {
        position: 'top-right',
      });
      setFieldError('name', 'Ошибка отправки текста');
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div
        role="dialog"
        aria-modal="true"
        style={{ display: 'block' }}
        className="fade modal show"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{`Изменить сообщение ID '${dropMenuChatId}'`}</div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
                onClick={handleCloseClick}
              />
            </div>
            <div className="modal-body">
              <Formik
                initialValues={initialValues}
                validationSchema={messageInputValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="">
                    <div>
                      <Field
                        name="body"
                        id="body"
                        className="mb-2 form-control"
                      />
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label
                        className="visually-hidden"
                        htmlFor="body"
                      >
                        Текст сообщения
                      </label>
                      <ErrorMessage name="body" component="div" className="invalid-feedback" />
                      <div className="d-flex justify-content-end">
                        <button
                          type="submit"
                          className="me-2 btn btn-primary"
                          disabled={isSubmitting}
                        >
                          Изменить
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleCloseClick}
                        >
                          Отменить
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
