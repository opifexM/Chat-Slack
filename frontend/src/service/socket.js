import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { APIRoute } from '../const';
import { store } from '../store';
import { fetchChannelAction, fetchChatMessagesAction } from '../store/api-action/chat-api-action';
import { addNewMessageActiveChannelMessages } from '../store/ui-setting/ui-setting.slice';

// eslint-disable-next-line import/prefer-default-export
export const initializeSocket = () => {
  const socket = io();

  socket.on('connect_error', (error) => {
    toast.error(`Connection error '${error}'`, {
      position: 'top-right',
    });
  });

  const handleNewMessage = (data) => {
    const state = store.getState();
    const { username } = state.API_COMMUNICATION;
    const { activeChannelId } = state.UI_SETTING;

    if (username !== data.username && data.channelId === activeChannelId) {
      store.dispatch(addNewMessageActiveChannelMessages(data));
    }
  };

  const handleFetchMessages = (data) => {
    const state = store.getState();
    const { username } = state.API_COMMUNICATION;

    if (username !== data.username) {
      store.dispatch(fetchChatMessagesAction());
    }
  };

  socket.on(APIRoute.SubscribeNewMessage, handleNewMessage);
  socket.on(APIRoute.SubscribeRenameMessage, handleFetchMessages);
  socket.on(APIRoute.SubscribeRemoveMessage, handleFetchMessages);

  socket.on(APIRoute.SubscribeNewChannel, () => store.dispatch(fetchChannelAction()));
  socket.on(APIRoute.SubscribeRenameChannel, () => store.dispatch(fetchChannelAction()));
  socket.on(APIRoute.SubscribeRemoveChannel, () => store.dispatch(fetchChannelAction()));

  return socket;
};
