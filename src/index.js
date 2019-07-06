import React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';
import { Route, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import store, { browserHistory as history } from '@/state';
import './index.css';
import App from './App';
import client from './apolloClient';
import registerServiceWorker from './registerServiceWorker';
import Login from '@/pages/login';
import { userIsNotAuthenticated, userIsAuthenticated, userIsAdmin } from '@/utils/auth';

render(
  <LocaleProvider locale={enUS}>
    <ApolloProvider store={store} client={client}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" component={userIsNotAuthenticated(Login)} />
          <Route path="/" component={userIsAuthenticated(userIsAdmin(App))} />
        </Switch>
      </ConnectedRouter>
    </ApolloProvider>
  </LocaleProvider>, document.getElementById('root'));

registerServiceWorker();
