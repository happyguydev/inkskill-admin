import { createSelector } from 'reselect';

// eslint-disable-next-line import/prefer-default-export
export const isToggled = createSelector(
  state => state.sidebar,
  value => ({ toggled: value })
);
