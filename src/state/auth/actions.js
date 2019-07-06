import { createAction } from 'redux-actions';
import { apiRequest, createApiActions } from '@/utils/api';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
} from '@/state/action-types';

const loginActions = createApiActions([AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE]);
export const login = data => dispatch =>
  apiRequest({
    method: 'post',
    url: '/auth/login',
    data,
  },
  loginActions,
  dispatch);

export const logout = createAction(AUTH_LOGOUT, (e) => {
  e.preventDefault();
});
