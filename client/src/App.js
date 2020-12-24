// @flow
import styled from '@emotion/styled';
import React from 'react';

import AddMessage from 'src/components/AddMessage';
import ChooseName from 'src/components/ChooseName';
import MessagesList from 'src/components/MessagesList';
import Sidebar from 'src/components/Sidebar';

const Root = styled.div<{}>({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Messages = styled.div<{}>({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
});

function App() {
  return (
    <Root>
      <ChooseName />
      <Sidebar />
      <Messages>
        <MessagesList />
        <AddMessage />
      </Messages>
    </Root>
  );
}

export default App;
