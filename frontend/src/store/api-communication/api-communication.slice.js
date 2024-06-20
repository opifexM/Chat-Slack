/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { COOKIE_TOKEN_KEY_NAME, NameSpace } from '../../const.js';
import { dropCookie, getCookie, saveCookie } from '../../service/cookie';
import { dropToken, saveToken } from '../../service/token.js';
import { fetchChannelAction, fetchChatMessagesAction } from '../api-action/chat-api-action.js';
import { loginAction, registerAction } from '../api-action/user-api-action.js';

const initialState = {
  isLoading: false,
  isAuthorized: false,
  username: getCookie(`${COOKIE_TOKEN_KEY_NAME}-username`),
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
    resetChannels: (state) => {
      state.channels = [];
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
        dropCookie(`${COOKIE_TOKEN_KEY_NAME}-username`);
        dropToken();
        state.isLoading = false;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        const { token, username } = action.payload;
        state.isAuthorized = true;
        state.username = username;
        saveCookie(`${COOKIE_TOKEN_KEY_NAME}-username`, username);
        saveToken(token);
        state.isLoading = false;
      })

      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isAuthorized = false;
        state.username = '';
        dropCookie(`${COOKIE_TOKEN_KEY_NAME}-username`);
        dropToken();
        state.isLoading = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        const { token, username } = action.payload;
        state.isAuthorized = true;
        state.username = username;
        saveCookie(`${COOKIE_TOKEN_KEY_NAME}-username`, username);
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

      .addCase(fetchChatMessagesAction.rejected, (state) => {
        state.messages = [];
      })
      .addCase(fetchChatMessagesAction.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const {
  setIsAuthorizedStatus,
  resetAuthStatus,
  resetChannels,
} = apiCommunicationSlice.actions;
