import { unwrapResult } from '@reduxjs/toolkit';
import classNames from 'classnames';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import leoProfanity from '../../service/leo-profanity.js';
import { addChannelAction, fetchChannelAction } from '../../store/api-action/chat-api-action.js';
import { resetChannels } from '../../store/api-communication/api-communication.slice';
import { getIsCreatingChannel } from '../../store/ui-setting/ui-setting.selector.js';
import {
  resetDropMenuChannel,
  setActiveChannelId,
  setActiveChannelName,
  setIsCreatingChannel,
} from '../../store/ui-setting/ui-setting.slice.js';
import { channelCreateValidationSchema } from './channel-create-validation-schema.js';

// eslint-disable-next-line import/prefer-default-export
export const ChannelCreate = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const isCreatingChannel = useSelector(getIsCreatingChannel);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreatingChannel]);

  if (!isCreatingChannel) {
    return null;
  }

  const initialValues = {
    name: '',
  };

  function handleCloseClick() {
    dispatch(setIsCreatingChannel(false));
  }

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const cleanedName = leoProfanity.clean(values.name);
      const resultAction = await dispatch(addChannelAction({
        name: cleanedName,
      }));
      const data = unwrapResult(resultAction);
      toast.success(t('channel.createSuccess'), {
        position: 'top-right',
      });
      dispatch(resetChannels());
      dispatch(resetDropMenuChannel());
      dispatch(setActiveChannelId(data.id));
      dispatch(setActiveChannelName(data.name));
      dispatch(setIsCreatingChannel(false));
      dispatch(fetchChannelAction());
    } catch (error) {
      toast.error(t('channel.createFail'), {
        position: 'top-right',
      });
      setFieldError('name', t('channel.wrongName'));
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
              <div className="modal-title h4">{t('channel.addChannel')}</div>
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
                validationSchema={channelCreateValidationSchema(t)}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="">
                    <div>
                      <Field
                        name="name"
                        id="name"
                        innerRef={inputRef}
                        className={classNames('mb-2 form-control', { 'is-invalid': errors.name && touched.name })}
                      />
                      <label
                        className="visually-hidden"
                        htmlFor="name"
                      >
                        {t('channel.nameChannel')}
                      </label>
                      <ErrorMessage name="name" component="div" className="invalid-feedback" />
                      <div className="d-flex justify-content-end">
                        <button
                          type="submit"
                          className="me-2 btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {t('channel.create')}
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleCloseClick}
                        >
                          {t('channel.cancel')}
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
