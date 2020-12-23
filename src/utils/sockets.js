// @flow
import { messageReceived, populateUsersList } from 'src/reducers/actions';
import * as types from 'src/reducers/constants';
import type { MessageAction, UserAction, UserName } from 'src/reducers/types';

const setupSocket = (
  dispatch: (MessageAction | UserAction) => void,
  username: UserName,
) => {
  const socket = new WebSocket('ws://localhost:8989');

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: types.ADD_USER,
        name: username,
      }),
    );
  };
  socket.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(String(event.data));
    switch (data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.author));
        break;
      case types.USERS_LIST:
        dispatch(populateUsersList(data.users));
        break;
      default:
        break;
    }
  };

  return socket;
};

export default setupSocket;
