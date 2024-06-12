import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const.js';
import { apiCommunicationSlice } from './api-communication/api-communication.slice.js';
import { uiSettingSlice } from './ui-setting/ui-setting.slice.js';

export const rootReducer = combineReducers({
  [NameSpace.ApiCommunication]: apiCommunicationSlice.reducer,
  [NameSpace.UiSetting]: uiSettingSlice.reducer,
});
