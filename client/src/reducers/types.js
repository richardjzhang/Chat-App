// @flow
type MessageActionTypes = 'ADD_MESSAGE' | 'MESSAGE_RECEIVED';

type UserId = string;
type UserName = string;
type User = {| name: UserName |};
type FullUser = {| id: UserId, name: UserName |};
type Users = Array<FullUser>;

type MessageId = number;
type Message = string;
type MessageData = {|
  id: MessageId,
  message: Message,
  author: FullUser,
|};
type Messages = Array<MessageData>;

type MessageAction = {|
  type: MessageActionTypes,
  ...MessageData,
|};
type UserListAction = { type: 'USERS_LIST', users: Users };
type UserAction = { type: 'ADD_USER', user: User };

type ReducerState = {|
  messages: Messages,
  users: Users,
  user: User,
|};

export type {
  MessageActionTypes,
  UserId,
  UserName,
  User,
  FullUser,
  Users,
  MessageId,
  Message,
  MessageAction,
  MessageData,
  UserListAction,
  UserAction,
  ReducerState,
};
