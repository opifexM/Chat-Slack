import {NameSpace} from "../../const.js";

export const getIsLoading = (state) => state[NameSpace.ApiCommunication].isLoading;
export const getIsAuthorized = (state) => state[NameSpace.ApiCommunication].isAuthorized;
export const getUsername = (state) => state[NameSpace.ApiCommunication].username;
export const getChannels = (state) => state[NameSpace.ApiCommunication].channels;
export const getMessages = (state) => state[NameSpace.ApiCommunication].messages;
