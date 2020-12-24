// @flow
import * as types from './constants';
import type { UserAction, FullUser } from './types';

const user = (state: ?FullUser = null, action: UserAction) => {
  switch (action.type) {
    case types.ADD_USER:
      return action.user;
    default:
      return state;
  }
};

export default user;
