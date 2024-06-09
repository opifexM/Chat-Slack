import classNames from "classnames";
import {useDispatch} from "react-redux";
import {
  setActiveChannelId,
  setActiveChannelName,
  setDropMenuChannelId,
  setDropMenuChannelName,
  setIsDeletingChannel,
  setIsEditingChannel
} from "../../store/ui-setting/ui-setting.slice.js";

export function Channel({channel, activeChannelId}) {
  const {id, name, removable} = channel;
  const dispatch = useDispatch();

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
          <div role="group"
               className="d-flex dropdown btn-group">
            <button type="button"
                    className={classNames('w-100 rounded-0 text-start btn', {'btn-secondary': id === activeChannelId})}
                    onClick={handleChannelClick}
            >
              <span className="me-1">#</span>{name}
            </button>
            <div className="dropdown">
              <button
                className={classNames('flex-grow-0 dropdown-toggle dropdown-toggle-split btn', {'btn-secondary': id === activeChannelId})}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleChannelDropMenuClick}
              >
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleDeleteClick}
                  >Удалить</button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleRenameClick}
                  >Переименовать</button>
                </li>
              </ul>
            </div>
          </div>
        </li>
      ) : (
        <li className="nav-item w-100">
          <button type="button"
                  className={classNames('w-100 rounded-0 text-start btn', {'btn-secondary': id === activeChannelId})}
                  onClick={handleChannelClick}
          >
            <span className="me-1">#</span>{name}
          </button>
        </li>
      )
  );
}
