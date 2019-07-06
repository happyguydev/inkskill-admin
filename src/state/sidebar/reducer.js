import { handleActions } from 'redux-actions';
import { SIDEBAR_TOGGLE } from '../action-types';

const sidebar = handleActions({
  [SIDEBAR_TOGGLE]: state => !state,
}, false);

export default sidebar;
