import classNames from 'classnames';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { editMessageAction, fetchChatMessagesAction } from '../../store/api-action/chat-api-action.js';
import { getDropMenuChatId, getDropMenuChatText, getIsEditingChat } from '../../store/ui-setting/ui-setting.selector.js';
import { resetDropMenuChat, setIsEditingChat } from '../../store/ui-setting/ui-setting.slice.js';
import { messageInputValidationSchema } from '../message-input/message-input-validation-schema.js';

// eslint-disable-next-line import/prefer-default-export
export const MessageEdit = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isEditingChat = useSelector(getIsEditingChat);
  const dropMenuChatId = useSelector(getDropMenuChatId);
  const dropMenuChatText = useSelector(getDropMenuChatText);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingChat]);

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
      await dispatch(editMessageAction({
        id: dropMenuChatId,
        body: values.body,
      }));
      dispatch(resetDropMenuChat());
      dispatch(setIsEditingChat(false));
      dispatch(fetchChatMessagesAction());
    } catch (error) {
      toast.error(t('message.editFail'), {
        position: 'top-right',
      });
      setFieldError('name', t('message.wrongText'));
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
              <div className="modal-title h4">{t('message.editMessage', { dropMenuChatId })}</div>
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
                validationSchema={messageInputValidationSchema(t)}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="">
                    <div>
                      <Field
                        name="body"
                        id="body"
                        innerRef={inputRef}
                        className={classNames('mb-2 form-control', { 'is-invalid': errors.body && touched.body })}
                      />
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label
                        className="visually-hidden"
                        htmlFor="body"
                      >
                        {t('message.text')}
                      </label>
                      <ErrorMessage name="body" component="div" className="invalid-feedback" />
                      <div className="d-flex justify-content-end">
                        <button
                          type="submit"
                          className="me-2 btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {t('message.edit')}
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleCloseClick}
                        >
                          {t('message.cancel')}
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
