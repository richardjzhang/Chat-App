// @flow
import styled from '@emotion/styled';
import React from 'react';

import { colors, tappable } from 'src/styles';

const ButtonStyle = styled.button<{}>({
  alignItems: 'center',
  backgroundColor: colors.dodgerBlue,
  border: 'none',
  borderRadius: 8,
  color: colors.white,
  display: 'flex',
  flexShrink: 0,
  fontSize: 16,
  fontWeight: 600,
  justifyContent: 'center',
  margin: 0,
  outline: 'none',
  padding: 16,
  ...tappable,
  textDecoration: 'none',
  webkitAppearance: 'none',
  mozAppearance: 'none',
});

type Props = {|
  children: React$Node,
  onClick: () => void,
|};

const Button = ({ children, onClick }: Props) => {
  return <ButtonStyle onClick={onClick}>{children}</ButtonStyle>;
};

export default Button;
