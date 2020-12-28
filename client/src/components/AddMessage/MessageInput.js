// @flow
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';
import { isMobile } from 'react-device-detect';

import Separator from 'src/components/Separator';
import emojiIcon from 'src/static/assets/emoji.svg';
import { colors, tappable } from 'src/styles';
import type { ReactRefType } from 'src/utils/flow';

/*
  Inspired by the following approach
  https://medium.com/@lucasalgus/creating-a-custom-auto-resize-textarea-component-for-your-react-web-application-6959c0ad68bc
*/

const MAX_HEIGHT = 90;
const VERTICAL_PADDING = 4;
const HORIZONTAL_PADDING = 12;

const Parent = styled.div<{}>({
  padding: `${VERTICAL_PADDING}px ${HORIZONTAL_PADDING}px`,
  minHeight: 36,
  maxHeight: MAX_HEIGHT,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  transition: 'height 0.25s ease',
  backgroundColor: colors.athensGray,
  borderRadius: 20,
});

const TextArea = styled.textarea<{}>({
  maxHeight: '100%',
  width: '100%',
  outline: 'none',
  padding: 0,
  display: 'block',
  resize: 'none',
  border: 'none',
  backgroundColor: colors.athensGray,
  transition: 'height 0.25s ease',
});

const EmojiIcon = styled.img<{}>({
  height: 20,
  width: 20,
  ...tappable,
});

type Props = {|
  textAreaRef: ReactRefType<HTMLTextAreaElement>,
  placeholder: string,
  text: string,
  onChange: (string) => void,
  onKeyPress: (SyntheticKeyboardEvent<EventTarget>) => void,
  onShowEmojiPicker: () => void,
  closeEmojiPicker: () => void,
|};

const MessageInput = ({
  textAreaRef,
  placeholder,
  text,
  onChange,
  onKeyPress,
  onShowEmojiPicker,
  closeEmojiPicker,
}: Props) => {
  const [textAreaHeight, setTextAreaHeight] = React.useState('auto');
  const [parentHeight, setParentHeight] = React.useState('auto');

  React.useEffect(() => {
    if (textAreaRef.current != null) {
      const { scrollHeight } = textAreaRef.current;
      if (text === '') {
        setParentHeight('auto');
        setTextAreaHeight('auto');
      } else {
        setParentHeight(`${scrollHeight + 2 * VERTICAL_PADDING}px`);
        setTextAreaHeight(`${scrollHeight}px`);
      }
    }
  }, [textAreaRef, text]);

  const onChangeHandler = (event: SyntheticInputEvent<EventTarget>) => {
    if (textAreaRef.current != null) {
      setParentHeight(`${textAreaRef.current.scrollHeight}px`);
      setTextAreaHeight('auto');
      onChange(event.target.value);
    }
  };

  return (
    <Parent
      css={{
        height: parentHeight,
      }}
    >
      <TextArea
        ref={textAreaRef}
        placeholder={placeholder}
        value={text}
        rows={1}
        style={{
          height: textAreaHeight,
        }}
        onChange={onChangeHandler}
        onKeyPress={onKeyPress}
        {...(isMobile ? { onFocus: closeEmojiPicker } : {})}
      />
      <Separator size={16} />
      <EmojiIcon
        src={emojiIcon}
        alt="Emoji Icons"
        onClick={onShowEmojiPicker}
      />
    </Parent>
  );
};

export default MessageInput;
