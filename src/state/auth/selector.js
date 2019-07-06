import { createSelector } from 'reselect';

// eslint-disable-next-line import/prefer-default-export
export const error = createSelector(
  state => state.auth.error,
  value => ({ error: value })
);
