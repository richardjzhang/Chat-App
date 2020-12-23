// @flow
import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';

import { addMessage } from 'src/reducers/actions';
import type { MessageAction, Message, MessageAuthor } from 'src/reducers/types';
import { colors } from 'src/styles';

const Root = styled.div<{}>({
  padding: 20,
  height: 200,
});

const Input = styled.textarea<{}>({
  width: '100%',
  height: '100%',
  outline: 'none',
  padding: 8,
  resize: 'none',
  backgroundColor: colors.athensGray,
  border: 'none',
  borderRadius: 8,
});

type Props = {|
  dispatch: (message: Message, author: MessageAuthor) => void,
|};

const AddMessage = (props: Props) => {
  const [message, setMessage] = React.useState('');
  return (
    <Root>
      <Input
        placeholder="Aa"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            props.dispatch(message, 'Me');
            setMessage('');
          }
        }}
      />
    </Root>
  );
};

const mapDispatchToProps = (dispatch: (MessageAction) => void) => ({
  dispatch: (message: Message, author: MessageAuthor) => {
    dispatch(addMessage(message, author));
  },
});

const AddMessageContainer = connect(() => ({}), mapDispatchToProps)(AddMessage);

export default AddMessageContainer;
