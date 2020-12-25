// @flow
import styled from '@emotion/styled';
import React from 'react';

import Button from 'src/components/Button';
import Modal, { ModalContent, ModalFooter } from 'src/components/Modal';
import Separator from 'src/components/Separator';
import { colors } from 'src/styles';
import handleNewMessage from 'src/utils/sagas';
import { sagaMiddleware, setupSocket, store } from 'src/utils/sockets';

const Title = styled.div<{}>({
  color: colors.cloudBurst,
  fontSize: 32,
  fontWeight: 600,
});

const Subtitle = styled.div<{}>({
  color: colors.cloudBurst,
  fontSize: 20,
});

const Input = styled.input<{}>({
  width: '100%',
  height: '100%',
  outline: 'none',
  padding: 12,
  backgroundColor: colors.athensGray,
  border: 'none',
  borderRadius: 8,
  textAlign: 'center',
});

const ChooseName = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [username, setUsername] = React.useState('');

  const handleSubmit = () => {
    if (username !== '') {
      setIsOpen(false);
      const socket = setupSocket(store.dispatch, username);
      sagaMiddleware.run(handleNewMessage, { socket, username });
    }
  };

  return (
    // The only way to close this modal is to submit a name
    <Modal isOpen={isOpen} onClose={() => {}} closeOnOverlayTap={false}>
      <ModalContent isCentered>
        <Title>Welcome!</Title>
        <Separator size={24} />
        <Subtitle>What&apos;s your name?</Subtitle>
        <Separator size={20} />
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name here"
        />
      </ModalContent>
      <ModalFooter isCentered>
        <Button onClick={handleSubmit}>Submit</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ChooseName;
