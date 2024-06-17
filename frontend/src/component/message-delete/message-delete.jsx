import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchChatMessagesAction, removeMessageAction } from '../../store/api-action/chat-api-action.js';
import { getDropMenuChatId, getDropMenuChatText, getIsDeletingChat } from '../../store/ui-setting/ui-setting.selector.js';
import { resetDropMenuChat, setIsDeletingChat } from '../../store/ui-setting/ui-setting.slice.js';

// eslint-disable-next-line import/prefer-default-export
export const MessageDelete = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isDeletingChat = useSelector(getIsDeletingChat);
  const dropMenuChatId = useSelector(getDropMenuChatId);
  const dropMenuChatText = useSelector(getDropMenuChatText);
  if (!isDeletingChat || !dropMenuChatId) {
    return null;
  }

  function handleCloseClick() {
    dispatch(setIsDeletingChat(false));
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(removeMessageAction({
        id: dropMenuChatId,
      }));
      dispatch(resetDropMenuChat());
      dispatch(setIsDeletingChat(false));
      dispatch(fetchChatMessagesAction());
    } catch (error) {
      toast.error(t('message.deleteFail'), {
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
              <div className="modal-title h4">{t('message.deleteMessage', { dropMenuChatId })}</div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
                onClick={handleCloseClick}
              />
            </div>
            <div className="modal-body">
              <p className="badge text-bg-secondary text-wrap">{dropMenuChatText}</p>
              <p className="lead">{t('message.confirm')}</p>
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
                          {t('message.delete')}
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
