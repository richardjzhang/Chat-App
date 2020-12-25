// @flow
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';

import { colors } from 'src/styles';
import type { ReactRefType } from 'src/utils/flow';

/*
  Inspired by the following approach
  https://medium.com/@lucasalgus/creating-a-custom-auto-resize-textarea-component-for-your-react-web-application-6959c0ad68bc
*/

const MAX_HEIGHT = 90;

const Parent = styled.div<{}>({
  maxHeight: MAX_HEIGHT,
  width: '100%',
  transition: 'height 0.25s ease',
});

const TextArea = styled.textarea<{}>({
  maxHeight: MAX_HEIGHT,
  width: '100%',
  outline: 'none',
  padding: 12,
  display: 'block',
  resize: 'none',
  backgroundColor: colors.athensGray,
  border: 'none',
  borderRadius: 20,
  transition: 'height 0.25s ease',
});

type Props = {|
  textAreaRef: ReactRefType<HTMLTextAreaElement>,
  placeholder: string,
  text: string,
  onChange: (string) => void,
  onKeyPress: (SyntheticKeyboardEvent<EventTarget>) => void,
|};

const AutoTextArea = ({
  textAreaRef,
  placeholder,
  text,
  onChange,
  onKeyPress,
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
        setParentHeight(`${scrollHeight}px`);
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
      />
    </Parent>
  );
};

export default AutoTextArea;
