// @flow
/** @jsxImportSource @emotion/react */
import 'emoji-mart/css/emoji-mart.css';
import data from 'emoji-mart/data/facebook.json';
import { NimblePicker } from 'emoji-mart/dist/index.js';
import React from 'react';

const EmojiPicker = ({
  isOpen,
  onEmojiSelect,
}: {|
  isOpen: boolean,
  onEmojiSelect: (string) => void,
|}) => {
  if (isOpen)
    return (
      <NimblePicker
        set="facebook"
        data={data}
        title=""
        showPreview={false}
        showSkinTones={false}
        style={{ border: 'none', borderRadius: 0, width: '100%' }}
        onSelect={(emoji) => onEmojiSelect(emoji.native)}
      />
    );
  return null;
};

export default EmojiPicker;
