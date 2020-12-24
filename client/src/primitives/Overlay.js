// @flow
/** @jsxImportSource @emotion/react */
import { keyframes } from '@emotion/react';
import React, { createRef } from 'react';

import { type ReactRefType } from 'src/utils/flow';

type Props = {
  animateClose?: boolean,
  children?: React$Node,
  onClick?: () => void,
};

export const exitAnimationDuration = 300; // milliseconds

const overlayEnterKeyframes = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const overlayExitKeyframes = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const styles = {
  overlay: {
    height: '100vh',
    position: 'fixed',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    animationName: overlayEnterKeyframes,
    animationDuration: '300ms',
    animationFillMode: 'forwards',
    animationTimingFunction: 'ease-out',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  overlayExit: {
    animationName: overlayExitKeyframes,
    animationDuration: `${exitAnimationDuration}ms`,
    animationFillMode: 'forwards',
    animationTimingFunction: 'ease-out',
  },
};

const Overlay = ({ animateClose, children, onClick }: Props) => {
  // ref to node
  const root: ReactRefType<HTMLDivElement> = createRef();
  return (
    <div
      ref={root}
      css={[styles.overlay, Boolean(animateClose) && styles.overlayExit]}
      onClick={(event) => {
        if (event.target === root.current && onClick) onClick();
      }}
    >
      {children}
    </div>
  );
};

export default Overlay;
