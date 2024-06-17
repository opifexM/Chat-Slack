import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  setActiveChannelId,
  setActiveChannelName,
  setDropMenuChannelId,
  setDropMenuChannelName,
  setIsDeletingChannel,
  setIsEditingChannel,
} from '../../store/ui-setting/ui-setting.slice.js';

// eslint-disable-next-line import/prefer-default-export
export const Channel = ({ channel, activeChannelId }) => {
  const { id, name, removable } = channel;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function handleChannelClick() {
    dispatch(setActiveChannelId(id));
    dispatch(setActiveChannelName(name));
  }

  function handleChannelDropMenuClick() {
    dispatch(setDropMenuChannelId(id));
    dispatch(setDropMenuChannelName(name));
  }

  function handleDeleteClick() {
    dispatch(setIsDeletingChannel(true));
  }

  function handleRenameClick() {
    dispatch(setIsEditingChannel(true));
  }

  return (
    removable
      ? (
        <li className="nav-item w-100">
          <div
            role="group"
            className="d-flex dropdown btn-group"
          >
            <button
              type="button"
              className={classNames('w-100 rounded-0 text-start text-truncate btn', { 'btn-secondary': id === activeChannelId })}
              name={name}
              onClick={handleChannelClick}
            >
              <span className="me-1">#</span>
              {name}
            </button>
            <div className="dropdown">
              <button
                className={classNames('flex-grow-0 dropdown-toggle dropdown-toggle-split btn', { 'btn-secondary': id === activeChannelId })}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleChannelDropMenuClick}
              >
                <span className="visually-hidden">{t('channel.control')}</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  {/* eslint-disable-next-line react/button-has-type */}
                  <button
                    className="dropdown-item"
                    onClick={handleDeleteClick}
                  >
                    {t('channel.delete')}
                  </button>
                </li>
                <li>
                  {/* eslint-disable-next-line react/button-has-type */}
                  <button
                    className="dropdown-item"
                    onClick={handleRenameClick}
                  >
                    {t('channel.rename')}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </li>
      ) : (
        <li className="nav-item w-100">
          <button
            type="button"
            className={classNames('w-100 rounded-0 text-start btn', { 'btn-secondary': id === activeChannelId })}
            name={name}
            onClick={handleChannelClick}
          >
            <span className="me-1">#</span>
            {name}
          </button>
        </li>
      )
  );
};
