// @flow
import React from 'react';

import ChooseName from 'src/components/ChooseName';
import Media from 'src/components/Media';
import { breakpoints } from 'src/styles';
import Desktop from 'src/views/Desktop';
import TouchDevice from 'src/views/TouchDevice';

function App() {
  return (
    <>
      <ChooseName />
      <Media query={`(min-width: ${breakpoints.tablet + 1}px)`}>
        {(isDesktopView) => (isDesktopView ? <Desktop /> : <TouchDevice />)}
      </Media>
    </>
  );
}

export default App;
