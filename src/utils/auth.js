import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'react-router-redux';

export const userIsAuthenticated = connectedReduxRedirect({
  redirectPath: '/login', // The url to redirect user to if they fail
  authenticatedSelector: state => state.auth.user !== null, // Determine if the user is authenticated or not
  wrapperDisplayName: 'UserIsAuthenticated', // A nice display name for this check
  redirectAction: routerActions.replace,
});

export const userIsAdmin = connectedReduxRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => state.auth.user && state.auth.user.isAdmin,
  wrapperDisplayName: 'UserIsAdmin',
  redirectAction: routerActions.replace,
});

export const userIsNotAuthenticated = connectedReduxRedirect({
  redirectPath: '/', // Send user to dashboard page if already logged in
  allowRedirectBack: false, // This prevents us from adding the query parameter when we send the user away from the login page
  authenticatedSelector: state => state.auth.user === null, // Determine if the user is authenticated or not
  wrapperDisplayName: 'UserIsNotAuthenticated', // A nice display name for this check
  redirectAction: routerActions.replace,
})
