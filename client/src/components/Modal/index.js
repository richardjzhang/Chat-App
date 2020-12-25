// @flow
import React, { createRef, Component } from 'react';
import type { Node } from 'react';

import Portal from 'src/components/Portal';
import { type ReactRefType } from 'src/utils/flow';

import Modal, { exitAnimationDuration } from './Modal';

export type Props = {
  isOpen: boolean,
  title?: string,
  onClose: Function,
  animateClose?: boolean,
  width?: number,
  closeOnOverlayTap: boolean, // Close modal if user taps/clicks the overlay?
  children: Node,
  onExitAnimationEnd?: () => void,
};

export type DefaultProps = {
  closeOnOverlayTap: boolean,
};

type State = {
  animateClose: boolean,
  isOpen: boolean,
};

class ModalPortal extends Component<Props, State> {
  static defaultProps: DefaultProps;

  openModal: () => void;
  closeModal: () => void;
  reenablePageScroll: () => void;

  state = {
    isOpen: false,
    animateClose: false,
  };

  componentDidMount() {
    if (this.props.isOpen) {
      this.openModal();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.isOpen && !prevProps.isOpen) this.openModal();
    else if (!this.props.isOpen && prevProps.isOpen) this.closeModal();
  }

  modal: ReactRefType<Modal> = createRef();

  scrollToTop = () => {
    const modal = this.modal.current;
    if (modal != null) {
      modal.scrollToTop();
    }
  };

  openModal = () => {
    this.setState((state) => ({ ...state, isOpen: true }));
  };

  closeModal = () => {
    this.setState((state) => ({ ...state, animateClose: true }));
    window.setTimeout(() => {
      this.setState((state) => ({
        ...state,
        animateClose: false,
        isOpen: false,
      }));

      if (this.props.onExitAnimationEnd) this.props.onExitAnimationEnd();
    }, exitAnimationDuration);
  };

  render() {
    return (
      <Portal isOpen={this.state.isOpen} hasScrollPrevention>
        <Modal
          {...this.props}
          animateClose={this.state.animateClose}
          ref={this.modal}
        />
      </Portal>
    );
  }
}
ModalPortal.defaultProps = {
  closeOnOverlayTap: true,
};

export default ModalPortal;
export { default as ModalContent } from './ModalContent';
export { default as ModalFooter } from './ModalFooter';
