// @flow
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';

const Root = styled.div<{}>({
  display: 'flex',
  flexDirection: 'column',
});

export default function ModalContent({
  children,
  isCentered,
}: {|
  children: React$Node,
  isCentered?: boolean,
|}) {
  return (
    <Root css={isCentered ? { alignItems: 'center', textAlign: 'center' } : {}}>
      {children}
    </Root>
  );
}
