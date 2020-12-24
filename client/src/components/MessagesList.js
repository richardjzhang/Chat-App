// @flow
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';

import Separator from 'src/primitives/Separator';
import type { ReducerState } from 'src/reducers/types';
import { colors } from 'src/styles';

const Root = styled.div<{}>({
  borderBottom: `1px solid ${colors.grayChateau}`,
  padding: 20,
  height: '100%',
  overflow: 'auto',
});

const MessageContainer = styled.div<{}>({
  padding: 12,
  borderRadius: 16,
  width: 'fit-content',
  maxWidth: 400,
});

const User = styled.div<{}>({
  fontSize: 16,
  fontWeight: 600,
});

const Message = styled.div<{}>({
  fontSize: 16,
});

const MessagesList = ({ messages }) => {
  return (
    <Root>
      {messages.map((message, idx) => {
        const isAuthor = message.author === 'Me';
        return (
          <React.Fragment key={message.id}>
            {idx !== 0 && <Separator size={isAuthor ? 4 : 16} />}
            <div css={{ display: 'flex' }}>
              {isAuthor && <Separator grow size={16} />}
              <MessageContainer
                css={{
                  backgroundColor: isAuthor
                    ? colors.dodgerBlue
                    : colors.athensGray,
                  color: isAuthor ? colors.white : colors.cloudBurst,
                }}
              >
                {!isAuthor && (
                  <>
                    <User>{message.author}</User>
                    <Separator size={8} />
                  </>
                )}
                <Message>{message.message}</Message>
              </MessageContainer>
            </div>
          </React.Fragment>
        );
      })}
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
