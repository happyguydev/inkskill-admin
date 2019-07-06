import axios from 'axios';
import { assign, isArray, get, map } from 'lodash';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
if (localStorage.getItem('token')) {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
}
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const apiRequestMiddleware = selector =>
  store => next => (action) => {
  if (get(action, 'meta.http.done', false)) {
    const requests = selector(store.getState());

    if (requests[action.meta.http.url]) {
      return;
    }
  }

  return next(action); // eslint-disable-line
};

export const createApiActions = types => {
  const [ pendingType, successType, failureType] = types;
  return {
    success: data => ({
      type: successType,
      payload: data,
    }),
    failure: error => ({
      type: failureType,
      error,
    }),
    pending: () => ({
      type: pendingType,
    }),
  }
};

export const apiRequest = (axiosOptions, actions, dispatch) => {
  const pendingAction = assign({}, actions.pending(), {
    meta: {
      http: {
        url: axiosOptions.url,
        done: false,
      },
    },
  });

  if (!dispatch(pendingAction)) {
    return null;
  }

  const meta = { http: { done: true, url: axiosOptions.url } };
  return axios(axiosOptions)
    .then(({ data }) => {
      console.log(data);
      // Even in error cases our API returns a 200, making this next line necessary
      if (data.error) {
        const message = data.error.message || data.error;
        throw new Error(isArray(message) ? map(message, 'message') : message);
      }

      const successAction = assign({}, actions.success(data), { meta });
      return dispatch(successAction);
    })
    .catch((err) => {
      const error = err.response ? err.response : err;
      const failureAction = assign({}, actions.failure(error), { meta });
      return dispatch(failureAction);
    });
};
