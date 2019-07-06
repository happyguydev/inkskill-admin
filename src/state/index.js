import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import authReducer from './auth/reducer';
import sidebarReducer from './sidebar/reducer';
import client from '../apolloClient';

export const browserHistory = createBrowserHistory();

const logger = createLogger({
  timestamp: false,
  duration: false,
  collapsed: true,
  diff: true,
});

const middleware = [
  routerMiddleware(browserHistory),
  thunkMiddleware,
  client.middleware(),
  logger,
];

const reducers = combineReducers({
  auth: authReducer,
  router: routerReducer,
  apollo: client.reducer(),
  sidebar: sidebarReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

export default createStore(reducers, {}, composeEnhancers(
  applyMiddleware(...middleware)
));
