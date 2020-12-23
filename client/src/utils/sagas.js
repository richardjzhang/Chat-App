// @flow
import { takeEvery } from 'redux-saga/effects';

import * as types from 'src/reducers/constants';
import type { UserName } from 'src/reducers/types';

const handleNewMessage = function* handleNewMessage(params: {
  socket: typeof WebSocket,
  username: UserName,
}): any {
  yield takeEvery(types.ADD_MESSAGE, (action) => {
    action.author = params.username;
    // $FlowFixMe the flow-typed library doesn't know about the methods of sockets
    params.socket.send(JSON.stringify(action));
  });
};

export default handleNewMessage;
