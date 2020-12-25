// @flow
import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';

import AutoTextArea from 'src/components/AutoTextArea';
import Separator from 'src/components/Separator';
import { addMessage } from 'src/reducers/actions';
import type {
  MessageAction,
  Message,
  FullUser,
  ReducerState,
} from 'src/reducers/types';
import sendIcon from 'src/static/assets/send.svg';
import { tappable } from 'src/styles';

const Root = styled.div<{}>({
  display: 'flex',
  alignItems: 'center',
  padding: 20,
});

const SendIcon = styled.img<{}>({
  height: 24,
  width: 24,
  ...tappable,
});

type Props = {|
  user: FullUser,
  dispatch: (message: Message, author: FullUser) => void,
|};

const AddMessage = (props: Props) => {
  const textAreaRef = React.useRef(null);
  const [message, setMessage] = React.useState('');

  function handleSendMessage() {
    if (textAreaRef != null) {
      textAreaRef.current?.focus();
    }
    const trimmedMessage = message.trim();
    if (trimmedMessage !== '')
      props.dispatch(message, { id: props.user.id, name: 'Me' });
    setMessage('');
  }

  return (
    <Root>
      <AutoTextArea
        textAreaRef={textAreaRef}
        placeholder="Aa"
        text={message}
        onChange={(text) => setMessage(text)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <Separator size={12} />
      <SendIcon src={sendIcon} alt="Send" onClick={handleSendMessage} />
    </Root>
  );
};

const mapDispatchToProps = (dispatch: (MessageAction) => void) => ({
  dispatch: (message: Message, author: FullUser) => {
    dispatch(addMessage(message, author));
  },
});

const AddMessageContainer = connect(
  () => (state: ReducerState) => ({
    user: state.user,
  }),
  mapDispatchToProps,
)(AddMessage);

export default AddMessageContainer;
