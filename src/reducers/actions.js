// @flow
import * as types from './constants';
import type {
  MessageAction,
  Message,
  MessageAuthor,
  UserAction,
  Users,
} from './types';

let nextMessageId = 0;

export const addMessage = (
  message: Message,
  author: MessageAuthor,
): MessageAction => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  message,
  author,
});

export const messageReceived = (
  message: Message,
  author: MessageAuthor,
): MessageAction => ({
  type: types.MESSAGE_RECEIVED,
  id: nextMessageId++,
  message,
  author,
});

export const populateUserDataList = (users: Users): UserAction => ({
  type: types.USERS_LIST,
  users,
});
