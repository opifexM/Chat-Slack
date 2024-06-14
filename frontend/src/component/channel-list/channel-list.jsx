import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll } from 'react-scroll';
import { getChannels } from '../../store/api-communication/api-communcation.selector.js';
import { getActiveChannelId } from '../../store/ui-setting/ui-setting.selector.js';
import { setIsCreatingChannel } from '../../store/ui-setting/ui-setting.slice.js';
import { Channel } from '../channel/channel.jsx';

// eslint-disable-next-line import/prefer-default-export
export const ChannelList = () => {
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const activeChannelId = useSelector(getActiveChannelId);

  const channelElements = channels.map((channel) => (
    <Channel
      key={channel.id}
      channel={channel}
      activeChannelId={activeChannelId}
    />
  ));

  function handleCreateChannelClick() {
    dispatch(setIsCreatingChannel(true));
  }

  useEffect(() => {
    if (channels.length && activeChannelId === channels[0]?.id) {
      animateScroll.scrollToTop({ containerId: 'channels-box', delay: 0, duration: 0 });
    }
    if (channels.length && activeChannelId === channels[channels.length - 1]?.id) {
      animateScroll.scrollToBottom({ containerId: 'channels-box', delay: 0, duration: 0 });
    }
  }, [channels.length, activeChannelId, channels]);

  return (
    <div className="col-4 col-md-3 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleCreateChannelClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path
              d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
            />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
            />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 h-100 d-block"
        style={{
          overflowY: 'auto',
        }}
      >
        {channelElements}
      </ul>
    </div>
  );
};
