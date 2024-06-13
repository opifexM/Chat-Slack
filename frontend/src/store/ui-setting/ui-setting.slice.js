/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const.js';

const initialState = {
  isCreatingChannel: false,
  isDeletingChannel: false,
  isEditingChannel: false,
  activeChannelId: undefined,
  activeChannelName: undefined,
  activeChannelMessages: [],
  activeChannelMessageCount: undefined,
  dropMenuChannelId: undefined,
  dropMenuChannelName: undefined,
  dropMenuChatId: undefined,
  dropMenuChatText: undefined,
  dropMenuChatUserName: undefined,
  isDeletingChat: false,
  isEditingChat: false,
};

export const uiSettingSlice = createSlice({
  name: NameSpace.UiSetting,
  initialState,
  reducers: {
    setIsCreatingChannel: (state, action) => {
      state.isCreatingChannel = action.payload;
    },
    setIsDeletingChannel: (state, action) => {
      state.isDeletingChannel = action.payload;
    },
    setIsEditingChannel: (state, action) => {
      state.isEditingChannel = action.payload;
    },
    setActiveChannelId: (state, action) => {
      state.activeChannelId = action.payload;
    },
    setActiveChannelName: (state, action) => {
      state.activeChannelName = action.payload;
    },
    setActiveChannelMessages: (state, action) => {
      state.activeChannelMessages = action.payload;
    },
    addNewMessageActiveChannelMessages: (state, action) => {
      const data = action.payload;
      if (!state.activeChannelMessages.find((message) => message.id === data.id)) {
        state.activeChannelMessages.push(data);
      }
    },
    setActiveChannelMessageCount: (state, action) => {
      state.activeChannelMessageCount = action.payload;
    },
    resetActiveChannel: (state) => {
      state.activeChannelId = undefined;
      state.activeChannelName = undefined;
      state.activeChannelMessageCount = undefined;
    },
    setDropMenuChannelId: (state, action) => {
      state.dropMenuChannelId = action.payload;
    },
    setDropMenuChannelName: (state, action) => {
      state.dropMenuChannelName = action.payload;
    },
    resetDropMenuChannel: (state) => {
      state.dropMenuChannelId = undefined;
      state.dropMenuChannelName = undefined;
    },
    setDropMenuChatId: (state, action) => {
      state.dropMenuChatId = action.payload;
    },
    setDropMenuChatText: (state, action) => {
      state.dropMenuChatText = action.payload;
    },
    setDropMenuChatUserName: (state, action) => {
      state.dropMenuChatUserName = action.payload;
    },
    resetDropMenuChat: (state) => {
      state.dropMenuChatId = undefined;
      state.dropMenuChatText = undefined;
      state.dropMenuChatUserName = undefined;
    },
    setIsDeletingChat: (state, action) => {
      state.isDeletingChat = action.payload;
    },
    setIsEditingChat: (state, action) => {
      state.isEditingChat = action.payload;
    },
  },
});

export const {
  setActiveChannelId,
  setIsCreatingChannel,
  setDropMenuChannelId,
  setIsDeletingChannel,
  setIsEditingChannel,
  setActiveChannelMessageCount,
  setActiveChannelName,
  setDropMenuChannelName,
  resetActiveChannel,
  resetDropMenuChannel,
  resetDropMenuChat,
  setDropMenuChatId,
  setDropMenuChatText,
  setIsDeletingChat,
  setIsEditingChat,
  setDropMenuChatUserName,
  setActiveChannelMessages,
  addNewMessageActiveChannelMessages,
} = uiSettingSlice.actions;
