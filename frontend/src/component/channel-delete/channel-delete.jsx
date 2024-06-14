import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchChannelAction, removeChannelAction } from '../../store/api-action/chat-api-action.js';
import {
  getActiveChannelId,
  getDropMenuChannelId,
  getDropMenuChannelName,
  getIsDeletingChannel,
} from '../../store/ui-setting/ui-setting.selector.js';
import {
  resetActiveChannel,
  resetDropMenuChannel,
  setIsDeletingChannel,
} from '../../store/ui-setting/ui-setting.slice.js';

// eslint-disable-next-line import/prefer-default-export
export const ChannelDelete = () => {
  const dispatch = useDispatch();

  const isDeletingChannel = useSelector(getIsDeletingChannel);
  const dropMenuChannelId = useSelector(getDropMenuChannelId);
  const dropMenuChannelName = useSelector(getDropMenuChannelName);
  const activeChannelId = useSelector(getActiveChannelId);
  if (!isDeletingChannel || !dropMenuChannelId) {
    return null;
  }

  function handleCloseClick() {
    dispatch(setIsDeletingChannel(false));
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const resultAction = await dispatch(removeChannelAction({
        id: dropMenuChannelId,
      }));
      unwrapResult(resultAction);
      toast.success('Канал удалён', {
        position: 'top-right',
      });
      if (activeChannelId === dropMenuChannelId) {
        dispatch(resetActiveChannel());
      }
      dispatch(resetDropMenuChannel());
      dispatch(setIsDeletingChannel(false));
      dispatch(fetchChannelAction());
    } catch (error) {
      toast.error(`Delete channel '${dropMenuChannelName}' failed. Please try again.`, {
        position: 'top-right',
      });
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
              <div className="modal-title h4">{`Удалить канал '${dropMenuChannelName}'`}</div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
                onClick={handleCloseClick}
              />
            </div>
            <div className="modal-body">
              <p className="lead">Уверены?</p>
              <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="">
                    <div>
                      <div className="d-flex justify-content-end">
                        <button
                          type="submit"
                          className="me-2 btn btn-danger"
                          disabled={isSubmitting}
                        >
                          Удалить
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
