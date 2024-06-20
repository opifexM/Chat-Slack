import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { APIRoute } from '../../const.js';
import { handleApiError } from '../../service/api-error-handler.js';

export const fetchChannelAction = createAsyncThunk(
  'chat/fetchChannelAction',
  async (_arg, { extra: api, rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.get(APIRoute.GetChannels);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      if (error.response.statusText === 'Unauthorized') {
        dispatch({ type: 'apiCommunication/resetAuthStatus' });
      }
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const addChannelAction = createAsyncThunk(
  'chat/addChannelAction',
  async ({ name }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post(APIRoute.AddChannel, { name });

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const removeChannelAction = createAsyncThunk(
  'chat/removeChannelAction',
  async ({ id }, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.RemoveChannel.replace(':id', id);
      const { data } = await api.delete(url);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const editChannelAction = createAsyncThunk(
  'chat/editChannelAction',
  async ({ id, name }, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.EditChannel.replace(':id', id);
      const { data } = await api.patch(url, { name });

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const fetchChatMessagesAction = createAsyncThunk(
  'chat/fetchChatMessagesAction',
  async (_arg, { extra: api, rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.get(APIRoute.GetMessages);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      if (error.response.statusText === 'Unauthorized') {
        dispatch({ type: 'apiCommunication/resetAuthStatus' });
      }
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const addMessageAction = createAsyncThunk(
  'chat/addMessageAction',
  async ({ body, channelId, username }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post(APIRoute.AddMessage, { body, channelId, username });

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const removeMessageAction = createAsyncThunk(
  'chat/removeMessageAction',
  async ({ id }, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.RemoveMessage.replace(':id', id);
      const { data } = await api.delete(url);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const editMessageAction = createAsyncThunk(
  'chat/editMessageAction',
  async ({ id, body }, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.EditMessage.replace(':id', id);
      const { data } = await api.patch(url, { body });

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);
