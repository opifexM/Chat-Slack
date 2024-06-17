import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChannelCreate } from '../../component/channel-create/channel-create.jsx';
import { ChannelDelete } from '../../component/channel-delete/channel-delete.jsx';
import { ChannelEdit } from '../../component/channel-edit/channel-edit.jsx';
import { ChannelList } from '../../component/channel-list/channel-list.jsx';
import { Header } from '../../component/header/header.jsx';
import { MessageDelete } from '../../component/message-delete/message-delete.jsx';
import { MessageEdit } from '../../component/message-edit/message-edit.jsx';
import { MessageList } from '../../component/message-list/message-list.jsx';
import { APIRoute } from '../../const.js';
import { initializeSocket } from '../../service/socket';
import { fetchChannelAction, fetchChatMessagesAction } from '../../store/api-action/chat-api-action.js';
import { getChannels, getMessages, getUsername } from '../../store/api-communication/api-communcation.selector.js';
import { getActiveChannelId } from '../../store/ui-setting/ui-setting.selector.js';
import {
  addNewMessageActiveChannelMessages,
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
  const username = useSelector(getUsername);
  const socket = useMemo(() => initializeSocket(), []);

  useEffect(() => {
    dispatch(fetchChannelAction());
    dispatch(fetchChatMessagesAction());
  }, [dispatch]);

  useEffect(() => {
    const handleNewMessage = (data) => {
      if (username !== data.username
                && data.channelId === activeChannelId) {
        dispatch(addNewMessageActiveChannelMessages(data));
      }
    };

    const handleFetchMessages = (data) => {
      if (username !== data.username) {
        dispatch(fetchChatMessagesAction());
      }
    };

    socket.on(APIRoute.SubscribeNewMessage, handleNewMessage);
    socket.on(APIRoute.SubscribeRenameMessage, handleFetchMessages);
    socket.on(APIRoute.SubscribeRemoveMessage, handleFetchMessages);

    return () => {
      socket.off(APIRoute.SubscribeNewMessage, handleNewMessage);
      socket.off(APIRoute.SubscribeRenameMessage, handleFetchMessages);
      socket.off(APIRoute.SubscribeRemoveMessage, handleFetchMessages);
    };
  }, [dispatch, activeChannelId, username, socket]);

  useEffect(() => {
    socket.on(APIRoute.SubscribeNewChannel, () => dispatch(fetchChannelAction()));
    socket.on(APIRoute.SubscribeRenameChannel, () => dispatch(fetchChannelAction()));
    socket.on(APIRoute.SubscribeRemoveChannel, () => dispatch(fetchChannelAction()));

    return () => {
      socket.off(APIRoute.SubscribeNewChannel);
      socket.off(APIRoute.SubscribeRenameChannel);
      socket.off(APIRoute.SubscribeRemoveChannel);
    };
  }, [dispatch, socket]);

  useEffect(() => {
    if (channels.length && !activeChannelId) {
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
