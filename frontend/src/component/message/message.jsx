import { useDispatch } from 'react-redux';
import {
  setDropMenuChatId,
  setDropMenuChatText,
  setDropMenuChatUserName,
  setIsDeletingChat,
  setIsEditingChat,
} from '../../store/ui-setting/ui-setting.slice.js';

// eslint-disable-next-line import/prefer-default-export
export const Message = ({ message }) => {
  const dispatch = useDispatch();
  const {
    id, body, username, removable,
  } = message;

  function handleDropMenuClick(messageId, messageBody, messageUsername) {
    dispatch(setDropMenuChatId(messageId));
    dispatch(setDropMenuChatText(messageBody));
    dispatch(setDropMenuChatUserName(messageUsername));
  }

  function handleDeleteClick() {
    dispatch(setIsDeletingChat(true));
  }

  function handleRenameClick() {
    dispatch(setIsEditingChat(true));
  }

  return (
    removable ? (
      <div
        className="text-break mb-2"
        role="group"
      >
        <div className="dropdown">
          <b>{username}</b>
          :
          {body}
          <button
            className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={() => handleDropMenuClick(id, body, username)}
          >
            <span className="visually-hidden">Управление каналом</span>
          </button>
          <ul className="dropdown-menu">
            <li>
              {/* eslint-disable-next-line react/button-has-type */}
              <button
                className="dropdown-item"
                onClick={handleDeleteClick}
              >
                Удалить
              </button>
            </li>
            <li>
              {/* eslint-disable-next-line react/button-has-type */}
              <button
                className="dropdown-item"
                onClick={handleRenameClick}
              >
                Переименовать
              </button>
            </li>
          </ul>
        </div>
      </div>
    ) : (
      <div className="text-break mb-2">
        <b>{username}</b>
        :
        {body}
      </div>
    )
  );
};
