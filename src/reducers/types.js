// @flow
type MessageActionTypes = 'ADD_MESSAGE' | 'MESSAGE_RECEIVED';
type UserActionTypes = 'ADD_USER' | 'USERS_LIST';

type UserId = string;
type UserName = string;
type UserData = {| id: UserId, name: UserName |};
type Users = Array<UserData>;

type MessageId = number;
type Message = string;
type MessageAuthor = string;
type MessageData = {|
  id: MessageId,
  message: Message,
  author: MessageAuthor,
|};
type Messages = Array<MessageData>;

type MessageAction = {|
  type: MessageActionTypes,
  ...MessageData,
|};
type UserAction = { type: UserActionTypes, users: Users };

type ReducerState = {|
  messages: Messages,
  users: Users,
|};

export type {
  MessageActionTypes,
  UserActionTypes,
  UserId,
  UserName,
  UserData,
  MessageId,
  Message,
  MessageAuthor,
  MessageAction,
  MessageData,
  UserAction,
  Users,
  ReducerState,
};
