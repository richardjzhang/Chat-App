// @flow
import styled from '@emotion/styled';
import React from 'react';

import AddMessage from 'src/components/AddMessage';
import MessagesList from 'src/components/MessagesList';

import Header, { HEADER_HEIGHT } from './Header';

const Messages = styled.div<{}>({
  paddingTop: HEADER_HEIGHT,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

function TouchDevice() {
  return (
    <>
      <Header />
      <Messages>
        <MessagesList />
        <AddMessage />
      </Messages>
    </>
  );
}

export default TouchDevice;
