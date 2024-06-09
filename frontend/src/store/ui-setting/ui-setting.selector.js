import {NameSpace} from "../../const.js";

export const getIsCreatingChannel = (state) => state[NameSpace.UiSetting].isCreatingChannel;
export const getIsEditingChannel = (state) => state[NameSpace.UiSetting].isEditingChannel;
export const getIsDeletingChannel = (state) => state[NameSpace.UiSetting].isDeletingChannel;
export const getActiveChannelId = (state) => state[NameSpace.UiSetting].activeChannelId;
export const getActiveChannelName = (state) => state[NameSpace.UiSetting].activeChannelName;
export const getActiveChannelMessageCount = (state) => state[NameSpace.UiSetting].activeChannelMessageCount;
export const getActiveChannelMessages = (state) => state[NameSpace.UiSetting].activeChannelMessages;
export const getDropMenuChannelId = (state) => state[NameSpace.UiSetting].dropMenuChannelId;
export const getDropMenuChannelName = (state) => state[NameSpace.UiSetting].dropMenuChannelName;
export const getIsDeletingChat = (state) => state[NameSpace.UiSetting].isDeletingChat;
export const getIsEditingChat = (state) => state[NameSpace.UiSetting].isEditingChat;
export const getDropMenuChatId = (state) => state[NameSpace.UiSetting].dropMenuChatId;
export const getDropMenuChatText = (state) => state[NameSpace.UiSetting].dropMenuChatText;
