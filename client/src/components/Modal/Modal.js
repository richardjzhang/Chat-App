// @flow
/** @jsxImportSource @emotion/react */
import { keyframes } from '@emotion/react';
import React, { createRef, Component } from 'react';

import type { DefaultProps, Props } from 'src/components/Modal';
import Overlay, { exitAnimationDuration } from 'src/primitives/Overlay';
import { colors } from 'src/styles';
import { type ReactRefType } from 'src/utils/flow';

export { exitAnimationDuration };

const isScrollingDown = (startY, curY) => curY < startY;
const isScrollingUp = (startY, curY) => !isScrollingDown(startY, curY);

const MODAL_MAX_WIDTH = 600;
const MODAL_BORDER_RADIUS = 16;

const boxEnterKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: scale(1);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const boxExitKeyframes = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(0.8);
  }
`;

const styles = {
  box: {
    // https://codepen.io/amonks/pen/GjjdoA
    // to fix Safari it is also necessary to unset `will-change` rule
    ':-webkit-full-screen-ancestor': {
      animation: 'none',
      animationFillMode: 'none',
      willChange: 'unset',
    },
    backgroundColor: colors.white,
    borderRadius: MODAL_BORDER_RADIUS,
    boxShadow: '0 0 24px rgba(0, 0, 0, 0.18)',
    margin: 'auto',
    animationName: boxEnterKeyframes,
    animationDuration: '300ms',
    animationFillMode: 'forwards',
    animationTimingFunction: 'ease-out',
    padding: 40,
    overflow: 'hidden',
    // Promote to own compositor layer. Allows boxShadow to extend outside its
    // parent clipping rect. Without this the boxShadow will appear clipped
    // during the rubber-band scroll effect in iOS Safari.
    willChange: 'transform',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  },
  boxExit: {
    animationName: boxExitKeyframes,
    animationDuration: `${exitAnimationDuration}ms`,
    animationFillMode: 'forwards',
    animationTimingFunction: 'ease-out',
  },
  scrollingContainer: {
    overflowY: 'auto',
    padding: 32,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    WebkitOverflowScrolling: 'touch', // momentum scrolling for iOS Safari
    display: 'flex',
    alignItems: 'flex-start',
    ':focus': {
      outline: 'none',
    },
  },
};

class Modal extends Component<Props, void> {
  static defaultProps: DefaultProps;

  handleCloseButtonClick: () => void;
  handleOverlayClick: () => void;
  handleKeyDown: (event: KeyboardEvent) => void;
  handleTouchStartOnScrollingContainer: () => void;
  handleTouchStart: (event: SyntheticTouchEvent<>) => void;
  handleTouchMove: (event: SyntheticTouchEvent<>) => void;

  startY: ?number;

  componentDidMount() {
    if (this.scrollingContainer.current != null) {
      this.scrollingContainer.current.focus();
    }
  }

  scrollingContainer: ReactRefType<HTMLDivElement> = createRef();

  handleCloseButtonClick = () => {
    this.props.onClose();
  };

  handleOverlayClick = () => {
    if (this.props.closeOnOverlayTap) {
      this.props.onClose();
    }
  };

  handleKeyDown = (event: KeyboardEvent) => {
    // Try to make sure the keydown events are not propagated to elements up on the tree when a modal is open, because we should treat the modal as an indipendent layer of the application and keydown events should not interact with the underlying content.
    // This is achieved giving programmatically focus to the scrolling container in cDM
    // If other elements steal focus this intent would fail, but it's the safest approach we could keep at the moment
    event.stopPropagation();
    if (event.keyCode === 27) {
      // Esc
      event.preventDefault();
      this.props.onClose();
    }
  };

  handleTouchStart = (event: SyntheticTouchEvent<>) => {
    this.startY = event.touches[0].clientY;
  };

  handleTouchMove = (event: SyntheticTouchEvent<>) => {
    if (this.scrollingContainer.current == null) return;

    const curY = event.touches[0].clientY;

    // Disable scroll propagation when container isn't scrollable
    if (
      this.scrollingContainer.current.scrollHeight ===
      this.scrollingContainer.current.clientHeight
    ) {
      event.preventDefault();
      return;
    }

    // Disable scroll propagation when we are scrolled to the top of the container
    // and we are trying to scroll up further.
    if (
      this.scrollingContainer.current.scrollTop === 0 &&
      isScrollingUp(this.startY, curY)
    ) {
      event.preventDefault();
      return;
    }

    // FlowIssue — This second check is only required because Flow is
    // pessimistic about side effects.
    if (this.scrollingContainer.current == null) return;

    // Disable scroll propagation when we are scrolled to the bottom of the container
    // and we are trying to scroll down further.
    if (
      this.scrollingContainer.current.scrollTop +
        this.scrollingContainer.current.clientHeight >=
        this.scrollingContainer.current.scrollHeight &&
      isScrollingDown(this.startY, curY)
    ) {
      event.preventDefault();
      return;
    }
  };

  scrollToTop = () => {
    const scrollableElement = this.scrollingContainer.current;
    if (scrollableElement != null) {
      // $FlowIssue flow is unaware of the scrollTo method on elements
      scrollableElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  render() {
    return (
      <Overlay animateClose={this.props.animateClose}>
        <div
          css={styles.scrollingContainer}
          ref={this.scrollingContainer}
          onClick={this.handleOverlayClick}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          tabIndex="0"
          onKeyDown={this.handleKeyDown}
        >
          <div
            id="modal"
            css={[
              styles.box,
              Boolean(this.props.animateClose) && styles.boxExit,
              {
                width: this.props.width || MODAL_MAX_WIDTH,
                maxWidth: this.props.width || MODAL_MAX_WIDTH,
              },
            ]}
            onClick={(event) => event.stopPropagation()}
          >
            {this.props.children}
          </div>
        </div>
      </Overlay>
    );
  }
}

Modal.defaultProps = {
  closeOnOverlayTap: false,
};

export default Modal;
