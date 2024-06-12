import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const.js';
import { dropToken, saveToken } from '../../service/token.js';
import {
  addChannelAction,
  addMessageAction,
  editChannelAction,
  editMessageAction,
  fetchChannelAction,
  fetchChatMessagesAction,
  removeChannelAction,
  removeMessageAction,
} from '../api-action/chat-api-action.js';
import { loginAction, registerAction } from '../api-action/user-api-action.js';

const initialState = {
  isLoading: false,
  isAuthorized: false,
  username: undefined,
  channels: [],
  messages: [],
};

export const apiCommunicationSlice = createSlice({
  name: NameSpace.ApiCommunication,
  initialState,
  reducers: {
    setIsAuthorizedStatus: (state, action) => {
      state.isAuthorized = action.payload;
    },
    resetAuthStatus: (state) => {
      state.isAuthorized = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAction.rejected, (state) => {
        state.isAuthorized = false;
        state.username = '';
        dropToken();
        state.isLoading = false;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        const { token, username } = action.payload;
        state.isAuthorized = true;
        state.username = username;
        saveToken(token);
        state.isLoading = false;
      })

      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isAuthorized = false;
        state.username = '';
        dropToken();
        state.isLoading = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        const { token, username } = action.payload;
        state.isAuthorized = true;
        state.username = username;
        saveToken(token);
        state.isLoading = false;
      })

      .addCase(fetchChannelAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChannelAction.rejected, (state) => {
        state.channels = [];
        state.isLoading = false;
      })
      .addCase(fetchChannelAction.fulfilled, (state, action) => {
        state.channels = action.payload;
        state.isLoading = false;
      })

      .addCase(addChannelAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addChannelAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addChannelAction.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(removeChannelAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeChannelAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(removeChannelAction.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(editChannelAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editChannelAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editChannelAction.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchChatMessagesAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChatMessagesAction.rejected, (state) => {
        state.messages = [];
        state.isLoading = false;
      })
      .addCase(fetchChatMessagesAction.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isLoading = false;
      })

      .addCase(addMessageAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMessageAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addMessageAction.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(removeMessageAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeMessageAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(removeMessageAction.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(editMessageAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editMessageAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editMessageAction.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  setIsAuthorizedStatus,
  resetAuthStatus,
} = apiCommunicationSlice.actions;
