// @flow
import * as types from './constants';
import type { MessageAction, MessageData } from './types';

const messages = (state: Array<MessageData> = [], action: MessageAction) => {
  switch (action.type) {
    case types.ADD_MESSAGE:
    case types.MESSAGE_RECEIVED:
      return [
        ...state,
        { message: action.message, author: action.author, id: action.id },
      ];
    default:
      return state;
  }
};

export default messages;
