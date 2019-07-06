import { createAction } from 'redux-actions';
import { SIDEBAR_TOGGLE } from '../action-types';

// eslint-disable-next-line import/prefer-default-export
export const toggleSidebar = createAction(SIDEBAR_TOGGLE, (e) => {
  e.preventDefault();
});
