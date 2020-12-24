// @flow
import * as types from './constants';
import type { UserListAction, Users } from './types';

const users = (state: Users = [], action: UserListAction) => {
  switch (action.type) {
    case types.USERS_LIST:
      return action.users;
    default:
      return state;
  }
};

export default users;
