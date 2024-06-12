import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { APIRoute } from '../../const.js';
import { handleApiError } from '../../service/api-error-handler.js';

export const loginAction = createAsyncThunk(
  'user/loginAction',
  async ({ username, password }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post(APIRoute.LoginUser, { username, password });

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const registerAction = createAsyncThunk(
  'user/registerAction',
  async ({ username, password }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post(APIRoute.RegisterUser, { username, password });

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);
