export const AppRoute = {
  Main: '/',
  Login: '/login',
  Register: '/signup',
};

export const APIRoute = {
  RegisterUser: 'signup',
  LoginUser: 'login',
  GetChannels: 'channels',
  AddChannel: 'channels',
  EditChannel: 'channels/:id',
  RemoveChannel: 'channels/:id',
  GetMessages: 'messages',
  AddMessage: 'messages',
  EditMessage: 'messages/:id',
  RemoveMessage: 'messages/:id',
  SubscribeNewChannel: 'newChannel',
  SubscribeRemoveChannel: 'removeChannel',
  SubscribeRenameChannel: 'renameChannel',
  SubscribeNewMessage: 'newMessage',
  SubscribeRenameMessage: 'renameMessage',
  SubscribeRemoveMessage: 'removeMessage',
};

export const NameSpace = {
  ApiCommunication: 'API_COMMUNICATION',
  UiSetting: 'UI_SETTING',
};

export const BACKEND_URL = 'http://localhost:5001/api/v1';
export const BACKEND_SOCKET_URL = 'ws://localhost:5001';
export const BACKEND_REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN_KEY_NAME = 'chat-slack-token';
