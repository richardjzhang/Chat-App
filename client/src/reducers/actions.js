// @flow
import * as types from './constants';
import type {
  MessageAction,
  Message,
  FullUser,
  UserAction,
  UserListAction,
  User,
  Users,
} from './types';

let nextMessageId = 0;

export const addMessage = (
  message: Message,
  author: FullUser,
): MessageAction => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  message,
  author,
});

export const messageReceived = (
  message: Message,
  author: FullUser,
): MessageAction => ({
  type: types.MESSAGE_RECEIVED,
  id: nextMessageId++,
  message,
  author,
});

export const populateUsersList = (users: Users): UserListAction => ({
  type: types.USERS_LIST,
  users,
});

export const addUser = (user: User): UserAction => ({
  type: types.ADD_USER,
  user,
});
