// @flow
import { combineReducers } from 'redux';

import messages from './messages';
import user from './user';
import users from './users';

const chat = combineReducers({
  messages,
  users,
  user,
});

export default chat;
