import { handleActions } from 'redux-actions';
import { get } from 'lodash';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
} from '../action-types';

// fetch saved user from localStorage
const authData = () => {
  const user = localStorage.getItem(process.env.REACT_APP_AUTH_KEY);

  return {
    user: user ? JSON.parse(user) : null,
    loading: false,
    error: null
  };
};

const auth = handleActions({
  [AUTH_LOGOUT]: () => {
    localStorage.removeItem(process.env.REACT_APP_AUTH_KEY);
    return { user: null, loading: false, error: null };
  },
  [AUTH_LOGIN_REQUEST]: (state, { payload }) => {
    return { ...state, user: null, loading: true, error: null };
  },
  [AUTH_LOGIN_SUCCESS]: (state, { payload }) => {
    localStorage.setItem(process.env.REACT_APP_AUTH_KEY, JSON.stringify(payload.user));
    return { ...state, user: payload.user, error: null, loading: false };
  },
  [AUTH_LOGIN_FAILURE]: (state, { error }) => {
    const message = get(error, 'data.error');
    return { ...state, user: null, loading: false, error: message }
  }
}, authData());

export default auth;
