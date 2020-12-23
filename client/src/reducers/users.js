// @flow
import * as types from './constants';
import type { UserAction, UserData } from './types';

const users = (state: Array<UserData> = [], action: UserAction) => {
  switch (action.type) {
    case types.USERS_LIST:
      return action.users;
    default:
      return state;
  }
};

export default users;
