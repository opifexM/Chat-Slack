export const AppRoute = {
  Main: '/',
  Login: '/login',
  Register: '/signup',
};

export const APIRoute = {
  RegisterUser: 'api/v1/signup',
  LoginUser: 'api/v1/login',
  GetChannels: 'api/v1/channels',
  AddChannel: 'api/v1/channels',
  EditChannel: 'api/v1/channels/:id',
  RemoveChannel: 'api/v1/channels/:id',
  GetMessages: 'api/v1/messages',
  AddMessage: 'api/v1/messages',
  EditMessage: 'api/v1/messages/:id',
  RemoveMessage: 'api/v1/messages/:id',
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

export const BACKEND_REQUEST_TIMEOUT = 5000;
export const COOKIE_TOKEN_KEY_NAME = 'chat-slack-token';
