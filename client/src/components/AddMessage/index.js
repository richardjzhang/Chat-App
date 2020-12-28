// @flow
import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';

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

const MessageInput = React.lazy(() => import('./MessageInput'));
const EmojiPicker = React.lazy(() => import('./EmojiPicker'));

const Root = styled.div<{}>({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 12px 0 12px',
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
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

  function handleSendMessage() {
    // Only focus on text input if emoji keyboard is not already open
    if (!showEmojiPicker) textAreaRef.current?.focus();
    // Trim message when sending
    const trimmedMessage = message.trim();
    if (trimmedMessage !== '')
      props.dispatch(message, { id: props.user.id, name: 'Me' });
    setMessage('');
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div>
        <Root>
          <MessageInput
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
            onShowEmojiPicker={() => setShowEmojiPicker((e) => !e)}
            closeEmojiPicker={() => setShowEmojiPicker(false)}
          />
          <Separator size={12} />
          <SendIcon src={sendIcon} alt="Send" onClick={handleSendMessage} />
        </Root>
        <Separator size={8} />
        <EmojiPicker
          isOpen={showEmojiPicker}
          onEmojiSelect={(emoji) =>
            setMessage((m) =>
              m.length > 0 ? `${m.trim()} ${emoji} ` : `${emoji} `,
            )
          }
        />
        <Separator size={12} />
      </div>
    </React.Suspense>
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
