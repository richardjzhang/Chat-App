// @flow
/** @jsxImportSource @emotion/react */
import React from 'react';

import Separator from 'src/components/Separator';

export function ModalFooter({
  children,
  isCentered = false,
}: {|
  children: React$Node,
  isCentered?: boolean,
|}) {
  return (
    <React.Fragment>
      <Separator size={32} />
      <div
        css={{
          display: 'flex',
          justifyContent: isCentered ? 'center' : 'flex-start',

          '> a, > button': {
            minWidth: 164,
          },
        }}
      >
        {children}
      </div>
    </React.Fragment>
  );
}

export default ModalFooter;
