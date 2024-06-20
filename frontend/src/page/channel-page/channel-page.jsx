import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChannelCreate } from '../../component/channel-create/channel-create.jsx';
import { ChannelDelete } from '../../component/channel-delete/channel-delete.jsx';
import { ChannelEdit } from '../../component/channel-edit/channel-edit.jsx';
import { ChannelList } from '../../component/channel-list/channel-list.jsx';
import { Header } from '../../component/header/header.jsx';
import { MessageDelete } from '../../component/message-delete/message-delete.jsx';
import { MessageEdit } from '../../component/message-edit/message-edit.jsx';
import { MessageList } from '../../component/message-list/message-list.jsx';
import { fetchChannelAction, fetchChatMessagesAction } from '../../store/api-action/chat-api-action.js';
import { getChannels, getMessages } from '../../store/api-communication/api-communcation.selector.js';
import { getActiveChannelId } from '../../store/ui-setting/ui-setting.selector.js';
import {
  setActiveChannelId,
  setActiveChannelMessageCount,
  setActiveChannelMessages,
  setActiveChannelName,
} from '../../store/ui-setting/ui-setting.slice.js';

// eslint-disable-next-line import/prefer-default-export
export const ChannelPage = () => {
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const messages = useSelector(getMessages);
  const activeChannelId = useSelector(getActiveChannelId);

  useEffect(() => {
    dispatch(fetchChannelAction());
    dispatch(fetchChatMessagesAction());
  }, [dispatch, activeChannelId]);

  useEffect(() => {
    const activeChannel = channels.find((channel) => channel.id === activeChannelId);
    if (channels.length && !activeChannel) {
      dispatch(setActiveChannelId(channels[0].id));
      dispatch(setActiveChannelName(channels[0].name));
    }
  }, [channels.length, activeChannelId, dispatch, channels]);

  useEffect(() => {
    if (channels.length && activeChannelId) {
      const activeChannelMessages = messages
        .filter((message) => message.channelId === activeChannelId);
      dispatch(setActiveChannelMessageCount(activeChannelMessages.length));
      dispatch(setActiveChannelMessages(activeChannelMessages));
    }
  }, [channels.length, messages.length, activeChannelId, dispatch, messages, channels]);

  if (!channels.length) {
    return null;
  }

  return (
    <div className="container-fluid h-100">
      <Header />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row justify-content-center align-items-center flex-grow-1">
          <ChannelList />
          <MessageList />
          <ChannelCreate />
          <ChannelDelete />
          <ChannelEdit />
          <MessageDelete />
          <MessageEdit />
        </div>
      </div>
    </div>
  );
};
