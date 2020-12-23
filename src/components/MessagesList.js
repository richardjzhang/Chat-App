// @flow
import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';

import Separator from 'src/components/Separator';
import type { ReducerState } from 'src/reducers/types';
import { colors } from 'src/styles';

const Root = styled.div<{}>({
  borderBottom: `1px solid ${colors.grayChateau}`,
  padding: 20,
  height: '100%',
  overflow: 'auto',
});

const MessageContainer = styled.div<{}>({
  display: 'flex',
  alignItems: 'flex-start',
});

const User = styled.div<{}>({
  color: colors.cloudBurst,
  fontSize: 16,
  fontWeight: 600,
});

const Message = styled.div<{}>({
  color: colors.cloudBurst,
  fontSize: 16,
});

const MessagesList = ({ messages }) => {
  return (
    <Root>
      {messages.map((message, idx) => (
        <React.Fragment key={message.id}>
          {idx !== 0 && <Separator size={8} />}
          <MessageContainer>
            <User>{message.author}:</User>
            <Separator size={8} />
            <Message>{message.message}</Message>
          </MessageContainer>
        </React.Fragment>
      ))}
    </Root>
  );
};

export const MessagesListContainer = connect(
  (state: ReducerState) => ({
    messages: state.messages,
  }),
  {},
)(MessagesList);

export default MessagesListContainer;
